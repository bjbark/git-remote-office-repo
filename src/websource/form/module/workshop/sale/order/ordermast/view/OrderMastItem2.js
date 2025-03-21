Ext.define('module.workshop.sale.order.ordermast.view.OrderMastItem2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-ordermast-lister-item2',
	store		: 'module.workshop.sale.order.ordermast.store.OrderMastItem2',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
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
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
			layout:'border',
			defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드')		, width :  70,align :'center'
					},{	dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명')		, width : 120
					}
				]
			}
		;
		return item;
	}
});