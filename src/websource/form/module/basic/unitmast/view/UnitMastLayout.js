Ext.define('module.basic.unitmast.view.UnitMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-unitmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-unitmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','단위코드 목록'), xtype : 'module-unitmast-lister' }
				]
			},{	xtype : 'module-unitmast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});