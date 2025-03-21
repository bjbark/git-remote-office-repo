Ext.define('module.prod.jig.jigmast.view.JigMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-jigmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-jigmast-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('jig_list','지그 목록'), xtype : 'module-jigmast-lister' }
			]
		},{	xtype : 'module-jigmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});