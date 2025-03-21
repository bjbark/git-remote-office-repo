Ext.define('module.eis.report.eisreport12.view.EisReport12Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport12-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-eisreport12-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','제품 납기일자 분석 현황'),
					xtype : 'module-eisreport12-lister'
				}
			]
		}
	];
	me.callParent(arguments);
	}
});