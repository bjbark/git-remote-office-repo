Ext.define('module.custom.dhtec.sale.order.saleplanorder2.view.SalePlanOrder2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-saleplanorder-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-saleplanorder2-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','월간 영업목표 목록'), xtype : 'module-saleplanorder2-lister' }
					]
			},{	xtype : 'module-saleplanorder2-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});