Ext.define('module.custom.iypkg.sale.sale.dailysalelist.view.DailySaleListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dailysalelist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dailysalelist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('daily_sale_list','매출일보'), xtype : 'module-dailysalelist-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
