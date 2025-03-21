Ext.define('module.prod.order.workmonitering.view.WorkMoniteringListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workmonitering-lister-master',
	store		: 'module.prod.order.workmonitering.store.WorkMoniteringMaster',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,stripeRows : true },
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

					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style'} , '-' , //엑셀버튼.
				]
			}
		;
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ 	dataIndex: 'wkct_name'		, width :  200, align : 'center'		, text : Language.get(''		,'공정명'	)
					},{ dataIndex: 'cvic_name'		, width :  180, align : 'center'		, text : Language.get(''		,'설비명'		)
					},{ dataIndex: 'runn_stat'		, width :  120 , align : 'center'		, text : Language.get(''		,'상태'	), xtype: 'lookupcolumn'  ,  lookupValue : [['비가동','비가동','black' ], ['생산중', '생산중', 'blue'],['일시정지','일시정지','red']], align:'center'
					},{ dataIndex: 'drtr_name'		, width :  180 , align : 'center'		, text : Language.get(''		,'작업자'	)
					},{ dataIndex: 'item_name'		, width :  200 , align : 'center'		, text : Language.get(''		,'생산품목명'	)
					},{ dataIndex: 'work_strt_dttm'	, width : 180, align : 'center'			, text : Language.get(''	,'시작시간'	),
					}
				]
			}
		;
		return item;
	 }

});
