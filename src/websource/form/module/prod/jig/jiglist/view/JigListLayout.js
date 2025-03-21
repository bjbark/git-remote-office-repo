Ext.define('module.prod.jig.jiglist.view.JigListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-jiglist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-jiglist-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('jig_list','지그 목록'), xtype : 'module-jiglist-lister' }
			]
		},{	xtype : 'module-jiglist-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});