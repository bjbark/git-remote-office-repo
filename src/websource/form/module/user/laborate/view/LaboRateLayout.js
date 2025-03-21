Ext.define('module.user.laborate.view.LaboRateLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-laborate-layout',

	initComponent : function(config){
		var me = this; me.dockedItems.push({xtype: 'module-laborate-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('user_list','임율정보 목록'), xtype : 'module-laborate-lister' }
				]
			},{	xtype	: 'module-laborate-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});
