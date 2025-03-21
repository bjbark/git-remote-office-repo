Ext.define('module.custom.hantop.item.itemgroup.view.ItemGroupLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemgroup-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-itemgroup-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','코드 목록'), xtype : 'module-itemgroup-lister' }
				]
			},{	xtype : 'module-itemgroup-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});