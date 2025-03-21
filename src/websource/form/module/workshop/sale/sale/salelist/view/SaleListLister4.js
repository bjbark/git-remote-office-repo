Ext.define('module.workshop.sale.sale.salelist.view.SaleListLister4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-salelist-lister4',
	store		: 'module.workshop.sale.sale.salelist.store.SaleListLister4',
	border		: 0 ,
	columnLines : true ,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype  : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig 	: { markDirty: false , loadMask : false, enableTextSelection: true },

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
					},{ dataIndex: 'ttle'		, text : Language.get('ttle'		,'제목'			) , width : 260
					},{ dataIndex: 'clss_name'	, text : Language.get('clss_name'	,'품목종류'		) , width : 150
					},{	dataIndex: 'sale_qntt'	, text : Language.get('sale_qntt'	,'수량'		) , width :  120 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'ttsm_amnt'	, text : Language.get('ttsm_amnt'	,'매출액'		) , width :  130 , xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'rate'	, text : Language.get(''	,'점유율'		) , width :  100 , xtype : 'numericcolumn'
				}
			]
		};
		return item;
	}
});
