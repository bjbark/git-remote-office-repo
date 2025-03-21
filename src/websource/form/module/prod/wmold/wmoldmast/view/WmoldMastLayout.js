Ext.define('module.prod.wmold.wmoldmast.view.WmoldMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wmoldmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-wmoldmast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','목형 관리'), xtype : 'module-wmoldmast-lister' }
			]
		},{ xtype : 'module-wmoldmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});