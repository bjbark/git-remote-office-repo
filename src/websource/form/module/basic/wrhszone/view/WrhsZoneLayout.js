Ext.define('module.basic.wrhszone.view.WrhsZoneLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wrhszone-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-wrhszone-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','보관위치'), xtype : 'module-wrhszone-lister' }
				]
			},{	xtype : 'module-wrhszone-editor', region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});
