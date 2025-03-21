Ext.define('module.basic.testmast.view.TestMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-deptmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-testmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('dept_list','부서 목록'), xtype : 'module-testmast-lister' }
				]
			},{	xtype : 'module-testmast-editor', region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});
