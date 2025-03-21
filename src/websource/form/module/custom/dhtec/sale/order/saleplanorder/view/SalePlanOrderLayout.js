Ext.define('module.custom.dhtec.sale.order.saleplanorder.view.SalePlanOrderLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-saleplanorder-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-saleplanorder-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','년간 영업목표 목록'), xtype : 'module-saleplanorder-lister' }
					]
			},{	xtype : 'module-saleplanorder-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});