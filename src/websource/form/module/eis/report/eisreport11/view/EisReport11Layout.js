Ext.define('module.eis.report.eisreport11.view.EisReport11Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport11-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-eisreport11-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','제조리드타임 현황'),
					xtype : 'module-eisreport11-lister'
				}
			]
		}
	];
	me.callParent(arguments);
	}
});