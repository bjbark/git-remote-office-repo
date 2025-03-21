Ext.define('module.basic.wrhsmast.view.WrhsMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wrhsmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-wrhsmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','창고코드 목록'), xtype : 'module-wrhsmast-lister' }
					]
			},{	xtype : 'module-wrhsmast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});