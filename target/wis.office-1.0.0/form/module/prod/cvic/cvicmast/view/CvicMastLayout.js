Ext.define('module.prod.cvic.cvicmast.view.CvicMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cvicmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-cvicmast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{title: Language.get('unit_list','설비코드 목록'), xtype : 'module-cvicmast-lister' }
			]
		},{ xtype : 'module-cvicmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});