Ext.define('module.basic.deptmast.view.DeptMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-deptmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-deptmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('dept_list','부서 목록'), xtype : 'module-deptmast-lister' }
				]
			},{	xtype : 'module-deptmast-editor', region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});
