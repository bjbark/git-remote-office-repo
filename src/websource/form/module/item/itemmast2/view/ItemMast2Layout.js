Ext.define('module.item.itemmast2.view.ItemMast2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemmast2-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-itemmast2-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','품목코드 목록'), xtype : 'module-itemmast2-lister' },
			]
		},{ xtype : 'module-itemmast2-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});