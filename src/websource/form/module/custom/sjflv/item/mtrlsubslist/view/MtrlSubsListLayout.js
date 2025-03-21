Ext.define('module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-mtrlsubslist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-mtrlsubslist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','원료대치현황'), xtype : 'module-mtrlsubslist-lister' }
				]
			},{	xtype : 'module-mtrlsubslist-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});