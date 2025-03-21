Ext.define('module.basic.systemoption.view.SystemOptionLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-systemoption-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-systemoption-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','옵션 목록'), xtype : 'module-systemoption-lister' }
				]
			},{	xtype : 'module-systemoption-editor', region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});
