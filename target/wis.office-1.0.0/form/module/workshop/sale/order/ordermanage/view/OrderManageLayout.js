Ext.define('module.workshop.sale.order.ordermanage.view.OrderManageLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-ordermanage-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-ordermanage-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('esti_list','주문 목록'), xtype : 'module-ordermanage-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
