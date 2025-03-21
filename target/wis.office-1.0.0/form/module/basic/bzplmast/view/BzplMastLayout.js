Ext.define('module.basic.bzplmast.view.BzplMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bzplmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-bzplmast-search'}),
	me.items = [
		{ xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{ title: Language.get('dept_list','사업장 코드 목록'), xtype : 'module-bzplmast-lister' }
			]
		},{	xtype : 'module-bzplmast-editor', region : 'south', hidden : false
		}
	];
	me.callParent(arguments);
}
});
