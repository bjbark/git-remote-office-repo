Ext.define('module.prod.wmold.wmoldlist.view.WmoldListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wmoldlist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-wmoldlist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','목형 현황'), xtype : 'module-wmoldlist-lister' }
			]
		},{ xtype : 'module-wmoldlist-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});