Ext.define('module.custom.symct.sale.prjtlist.view.PrjtListListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjtlist-lister-master',
	store		: 'module.custom.symct.sale.prjtlist.store.PrjtListMaster',
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
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [

					'-', '->', '-',
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
					{	dataIndex: 'line_clos'		, text : Language.get('line_clos'		,'상태'		) , width :  40  , align : 'center', xtype : 'lookupcolumn' , lookupValue : resource.lookup('line_clos'), hidden:true
					},{	dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'승인'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'수주번호'		) , width :  80 , align : 'center'
					},{ dataIndex: 'amnd_degr'		, text : Language.get('amnd_degr'		,'AMD'		) , width :  60 , align : 'center'
					},{ dataIndex: 'expt_dvcd'		, text : Language.get('expt_dvcd'		,'내수/수출'	) , width :  90 , xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd'), align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_code'		, text : Language.get('cstm_code'		,'거래처코드'	) , width :  80 , align : 'center', hidden:true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'cstm_item_code'	, text : Language.get('cstm_item_code'	,'고객품목코드'	) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'금형규격'		) , width : 170 , align : 'left'  , hidden:true
					},{ dataIndex: 'modl_name'		, text : Language.get('modl_name'		,'차종명'		) , width : 120 , align : 'left'  , hidden:true
					},{ dataIndex: 'esti_amnt'		, text : Language.get('esti_amnt'		,'견적금액'		) , width :  80 , align : 'right' , xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'regi_date'		, text : Language.get('regi_date'		,'등록일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'strt_date'		, text : Language.get('strt_date'		,'착수일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'endd_date'		, text : Language.get('endd_date'		,'완료일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'cofm_yorn'		, text : Language.get('cofm_yorn'		,'확정'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center', hidden:true
					},{ dataIndex: 'cofm_date'		, text : Language.get('cofm_date'		,'확정일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'drtr_name'		, text : Language.get('drtr_name'		,'영업담당'		) , width :  80 , align : 'left'
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'비고'		) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});