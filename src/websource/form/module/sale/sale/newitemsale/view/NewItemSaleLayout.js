Ext.define('module.sale.sale.newitemsale.view.NewItemSaleLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-newitemsale-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-newitemsale-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','매출현황'), xtype : 'module-newitemsale-lister' },
					{	title: Language.get('','품목별 매출현황'), xtype : 'module-newitemsale-lister2' }
				]
			}
		];
		me.callParent(arguments);
	}
});