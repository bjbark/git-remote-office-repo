Ext.define('module.prod.mold.moldmast.view.MoldMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-moldmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-moldmast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','금형 관리'), xtype : 'module-moldmast-lister' }
			]
		},{ xtype : 'module-moldmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});