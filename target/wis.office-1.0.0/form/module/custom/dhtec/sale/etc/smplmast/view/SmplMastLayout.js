Ext.define('module.custom.dhtec.sale.etc.smplmast.view.SmplMastLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-smplmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-smplmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('insptype_list','Sample List'),
						xtype : 'module-smplmast-lister'
					}
				]
			},{	xtype  : 'module-smplmast-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
