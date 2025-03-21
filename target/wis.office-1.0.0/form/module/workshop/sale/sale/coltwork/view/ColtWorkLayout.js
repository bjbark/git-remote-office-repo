Ext.define('module.workshop.sale.sale.coltwork.view.ColtWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-coltwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-coltwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('esti_list','주문 목록'), xtype : 'module-coltwork-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
