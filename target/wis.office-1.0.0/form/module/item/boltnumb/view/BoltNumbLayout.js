Ext.define('module.item.boltnumb.view.BoltNumbLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-boltnumb-layout',

	initComponent : function(config){
		var me = this; me.dockedItems.push({xtype: 'module-boltnumb-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','볼트호칭 목록'), xtype : 'module-boltnumb-lister' }
				]
			},{	xtype	: 'module-boltnumb-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});
