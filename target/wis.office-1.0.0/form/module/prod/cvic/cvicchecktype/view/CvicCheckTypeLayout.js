Ext.define('module.prod.cvic.cvicchecktype.view.CvicCheckTypeLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cvicchecktype-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-cvicchecktype-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('cvicchecktype_list','점검유형리스트'),
						xtype : 'module-cvicchecktype-lister'
					}
				]
			},{	xtype : 'module-cvicchecktype-editor',
				region : 'south',
				hidden : false,
			}
		];
		me.callParent(arguments);
	}
});
