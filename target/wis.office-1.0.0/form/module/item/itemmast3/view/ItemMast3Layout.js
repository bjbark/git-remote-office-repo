Ext.define('module.item.itemmast3.view.ItemMast3Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemmast3-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-itemmast3-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','품목코드 목록'), xtype : 'module-itemmast3-lister' }
			]
		},{ xtype : 'module-itemmast3-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});