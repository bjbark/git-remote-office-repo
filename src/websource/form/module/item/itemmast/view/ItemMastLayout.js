Ext.define('module.item.itemmast.view.ItemMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-itemmast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','품목코드 목록'), xtype : 'module-itemmast-lister' }
			]
		},{ xtype : 'module-itemmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});