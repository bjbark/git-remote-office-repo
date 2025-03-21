Ext.define('module.custom.iypkg.basic.boxtype.view.BoxTypeLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-boxtype-layout',

	initComponent: function(config){
	var me = this;  me.dockedItems.push({xtype: 'module-boxtype-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','상자형식 목록'), xtype : 'module-boxtype-lister' }
			]
		},{ xtype : 'module-boxtype-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});