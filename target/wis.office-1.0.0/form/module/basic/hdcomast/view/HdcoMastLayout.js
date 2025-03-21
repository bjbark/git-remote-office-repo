Ext.define('module.basic.hdcomast.view.HdcoMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-hdcomast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-hdcomast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','택배사코드 목록'), xtype : 'module-hdcomast-lister' }
					]
			},{	xtype : 'module-hdcomast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});