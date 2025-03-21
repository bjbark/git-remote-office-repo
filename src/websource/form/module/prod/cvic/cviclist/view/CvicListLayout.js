Ext.define('module.prod.cvic.cviclist.view.CvicListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cviclist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-cviclist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('unit_list'	,'설비코드 목록'), xtype : 'module-cviclist-lister' },
				{	title: Language.get(''			,'설비 CAPA'), xtype : 'module-cviclist-lister2'}
			]
		},{ xtype : 'module-cviclist-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});