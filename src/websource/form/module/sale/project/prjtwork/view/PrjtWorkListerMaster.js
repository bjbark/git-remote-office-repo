Ext.define('module.sale.project.prjtwork.view.PrjtWorkListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtwork-lister-master',
	store		: 'module.sale.project.prjtwork.store.PrjtWorkMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var	me = this,
			copytext = '유사금형 복사'
		;

		if(_global.hqof_idcd.toUpperCase()!='N1000DOWON'){
			copytext = '수주 복사'
		}
		var	item = {
				xtype	: 'grid-paging',
				items	: [
					{	text : '승인/취소',
						hidden	: !_global.auth.auth_sale_1001,
						menu : [
							{	text : '승인'	, action : 'okAction'
							},{	text : '취소'	, action : 'okCancelAction'
							}
						]
					},
					'-',
					{	text : '마감/취소',
						hidden	: !_global.auth.auth_sale_1001,
							menu : [
								{	text : '마감', action : 'closeAction'		},
								{	text : '취소', action : 'closeCancelAction'	}
							]
						},
					'-', '->', '-',
					{	text : '<span class="write-button">Amend</span>',    action : 'amendAction', cls: 'button1-style'	},
					'-', '->', '-',
					{	text : '<span class="write-button">'+copytext+'</span>', action : 'copyAction' , cls: 'button1-style'	},
					'-', '->', '-',
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } , '-',
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items	: [
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'상태'			) , width :  40  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'), hidden:true
					},{	dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'승인'			) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center', hidden : _global.hq_id.toUpperCase()=='N1000WONTC'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호'			) , width : 120 , align : 'center'
					},{ dataIndex: 'amnd_degr'		, text : Language.get('amnd_degr'		,'AMD'			) , width :  60 , align : 'center', hidden : _global.hq_id.toUpperCase()=='N1000WONTC'
					},{ dataIndex: 'expt_dvcd'		, text : Language.get('expt_dvcd'		,'내수/수출'		) , width :  90 , xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd'), align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'			) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'		) , width :  80 , align : 'center', hidden:true
					},{ dataIndex: 'item_name'		, text : Language.get('acpt_case_name'	,'금형명'			) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_item_code'	, text : Language.get('cstm_item_code'	,'고객품목코드'		) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'금형규격'			) , width : 170 , align : 'left'  , hidden:true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'차종명'			) , width : 120 , align : 'left'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY'		) , width :  70 , align : 'left'
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'			) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'등록일자'			) , width :  80 , align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'			) , width :  80 , align : 'center'
					},{ dataIndex: 'strt_date'		, text : Language.get('strt_date'		,'착수일자'			) , width :  80 , align : 'center'
					},{ dataIndex: 'endd_date'		, text : Language.get('endd_date'		,'완료일자'			) , width :  80 , align : 'center'
					},{ dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'확정'			) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center', hidden:true
					},{ dataIndex: 'cofm_date'		, text : Language.get('cofm_date'		,'확정일자'			) , width :  80 , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'영업담당'			) , width :  80 , align : 'left'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'			) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});