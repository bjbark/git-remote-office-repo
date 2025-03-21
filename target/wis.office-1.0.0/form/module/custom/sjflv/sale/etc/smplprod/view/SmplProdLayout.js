Ext.define('module.custom.sjflv.sale.etc.smplprod.view.SmplProdLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-smplprod-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-smplprod-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('insptype_list','Sample List'),
						xtype : 'module-smplprod-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});
