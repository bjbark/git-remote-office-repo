Ext.define('module.qc.basic.insptype.view.InspTypeLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-insptype-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-insptype-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('insptype_list','검사유형리스트'),
						xtype : 'module-insptype-lister'
					}
				]
			},{	xtype : 'module-insptype-editor',
				region : 'south',
				hidden : false,
			}
		];
		me.callParent(arguments);
	}
});
