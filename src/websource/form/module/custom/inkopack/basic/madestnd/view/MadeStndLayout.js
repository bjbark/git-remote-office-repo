Ext.define('module.custom.inkopack.basic.madestnd.view.MadeStndLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-madestnd-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-madestnd-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','품목 리스트'), xtype : 'module-madestnd-lister' }
			]
		},{	xtype : 'module-madestnd-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});