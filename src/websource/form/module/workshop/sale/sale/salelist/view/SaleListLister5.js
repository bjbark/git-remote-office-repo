Ext.define('module.workshop.sale.sale.salelist.view.SaleListLister5', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salelist-lister5',
	store		: 'module.workshop.sale.sale.salelist.store.SaleListLister5',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],

	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action, button : 'part2detail' ,cls: 'button-style'},
				],
				pagingButton : false
			}
		;
		return item;
	},

	columnItem : function () {
		var me = this,
			item = {
			defaults: {style: 'text-align:center'},
			items : [
					{	dataIndex: 'ranking'	, text : Language.get(''	,'순위'		) , width : 45 , align : 'center'
					},{	dataIndex: 'dept_name'	, text : Language.get('dept_name'	,'부서'		) , width : 80 , align : 'left'
					},{	dataIndex: 'user_code'	, text : Language.get('item_name'	,'사원번호'		) , width : 70 , align : 'center'
					},{	dataIndex: 'user_name'	, text : Language.get('item_spec'	,'성명'		) , width : 100 , align : 'left'
					},{	dataIndex: 'sale_qntt'	, text : Language.get('sale_qntt'	,'수량'		) , width :  120 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'매출액'		) , width :  150 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'rate'		, text : Language.get(''	,'점유율'		) , width :  100 , xtype : 'numericcolumn'
				}
			]
		};
		return item;
	}
});
