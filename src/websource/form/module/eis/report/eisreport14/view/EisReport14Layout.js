Ext.define('module.eis.report.eisreport14.view.EisReport14Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport14-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-eisreport14-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','투입공수 현황'),
					xtype : 'module-eisreport14-lister'
				}
			]
		}
	];
	me.callParent(arguments);
	}
});