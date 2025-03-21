Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster3_1', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-aone-sorderplan-lister-master3_1',

	store: 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},



	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [

				]
			};
		return item;
	}
});
