Ext.define('module.prod.basic.prodlinemast.view.ProdLineMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prodlinemast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-prodlinemast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','생산라인목록'),xtype : 'module-prodlinemast-lister' }
			]
		},{ xtype : 'module-prodlinemast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});