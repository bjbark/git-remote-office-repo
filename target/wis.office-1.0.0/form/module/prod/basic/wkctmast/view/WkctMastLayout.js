Ext.define('module.prod.basic.wkctmast.view.WkctMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wkctmast-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-wkctmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','공정코드 관리'), xtype : 'module-wkctmast-lister' }
				]
			},{	xtype : 'module-wkctmast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});