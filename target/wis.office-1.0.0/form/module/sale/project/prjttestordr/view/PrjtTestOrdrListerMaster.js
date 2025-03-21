Ext.define('module.sale.project.prjttestordr.view.PrjtTestOrdrMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-prjttestordr-lister-master',
	store		: 'module.sale.project.prjttestordr.store.PrjtTestOrdrMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' } ],
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
					'->',
					{text : '<span class="write-button">작업지시</span>'	, action : 'workAction'			, cls: 'button1-style'	},
					'-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' } ,
					'-',
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
					{	dataIndex: 'line_clos'	, text : Language.get('line_clos'	,'마감'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('line_clos'), align : 'center'
					},{	dataIndex: 'line_seqn'	, text : Language.get('line_seqn'	,'순번'		) , width :  50 , align : 'center'
					},{ dataIndex: 'pjod_idcd'	, text : Language.get('pjod_idcd'	,'금형번호'		) , width :  80 , align : 'center'
					},{ dataIndex: 'amnd_degr'	, text : Language.get('amnd_degr'	,'AMD'		) , width :  40 , align : 'center'
					},{ dataIndex: 'expt_dvcd'	, text : Language.get('expt_dvcd'	,'내수/수출'	) , width :  90 , xtype : 'lookupcolumn', lookupValue : resource.lookup('expt_dvcd'), align : 'center'
					},{ dataIndex: 'cstm_name'	, text : Language.get('cstm_name'	,'거래처명'		) , width : 170 , align : 'left'
					},{ dataIndex: 'item_name'	, text : Language.get('acpt_case_name','금형명'	) , width : 170 , align : 'left'
					},{ dataIndex: 'item_spec'	, text : Language.get('mold_spec'	,'금형규격'		) , width : 170 , align : 'left'
					},{ dataIndex: 'modl_name'	, text : Language.get('modl_name'	,'모델명'		) , width : 120 , align : 'left'
					},{ dataIndex: 'regi_date2'	, text : Language.get('regi_date2'	,'등록일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'deli_date'	, text : Language.get('deli_date'	,'납기일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'strt_date'	, text : Language.get('strt_date'	,'착수일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'endd_date'	, text : Language.get('endd_date'	,'완료일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'cofm_yorn'	, text : Language.get('cofm_yorn'	,'확정'		) , width :  50 , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'cofm_date'	, text : Language.get('cofm_date'	,'확정일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'drtr_name'	, text : Language.get('drtr_name'	,'영업담당'		) , width :  80 , align : 'left'
					},{ dataIndex: 'cvic_name'	, text : Language.get('cvic_name'	,'설비명'		) , width : 150 , align : 'left'
					},{ dataIndex: 'indn_qntt'	, text : Language.get('indn_qntt'	,'지시수량'		) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum'
					},{ dataIndex: 'poor_qntt'	, text : Language.get('poor_qntt'	,'불량수량'		) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'pass_qntt'	, text : Language.get('pass_qntt'	,'합격수량'		) , width :  80 , align : 'right', xtype : 'numericcolumn', summaryType: 'sum', hidden : true
					},{ dataIndex: 'regi_date'	, text : Language.get('regi_date'	,'지시일자'		) , width :  80 , align : 'center'
					},{ dataIndex: 'sttm'		, text : Language.get('sttm'		,'시작시간'		) , width : 130 , align : 'center'
					},{ dataIndex: 'edtm'		, text : Language.get('edtm'		,'종료시간'		) , width : 130 , align : 'center'
					},{ dataIndex: 'user_memo'	, text : Language.get('user_memo'	,'비고'		) , flex  : 100 , align : 'left'
					}
				]
			}
		;
		return item;
	}
});