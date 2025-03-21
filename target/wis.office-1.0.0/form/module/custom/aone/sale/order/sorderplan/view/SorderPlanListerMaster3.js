Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster3', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-aone-sorderplan-lister-master3',

	store: 'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster3',

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
					{	dataIndex:	'user_name'		, width: 126 , align : 'center'	, text: Language.get('sale_drtr_name'	, '엔지니어명'		),
						pair		: 'prod_drtr_idcd',
					}
				]
			};
		return item;
	}
});
