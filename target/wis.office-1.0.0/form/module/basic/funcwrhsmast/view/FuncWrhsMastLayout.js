Ext.define('module.basic.funcwrhsmast.view.FuncWrhsMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-funcwrhsmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-funcwrhsmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','기능창고 목록'), xtype : 'module-funcwrhsmast-lister' }
				]
			},{	xtype : 'module-funcwrhsmast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});