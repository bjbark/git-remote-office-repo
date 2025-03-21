Ext.define('module.eis.report.eisreport13.view.EisReport13Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport13-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-eisreport13-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','제품 분량율 현황'),
					xtype : 'module-eisreport13-lister'
				}
			]
		}
	];
	me.callParent(arguments);
	}
});