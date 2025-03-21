Ext.define('module.prod.mold.moldlist.view.MoldListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-moldlist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-moldlist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','금형 현황'), xtype : 'module-moldlist-lister' }
			]
		},{ xtype : 'module-moldlist-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});