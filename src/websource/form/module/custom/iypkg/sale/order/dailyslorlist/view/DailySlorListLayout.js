Ext.define('module.custom.iypkg.sale.order.dailyslorlist.view.DailySlorListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dailyslorlist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dailyslorlist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('daily_slor_list','수주일보'), xtype : 'module-dailyslorlist-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
