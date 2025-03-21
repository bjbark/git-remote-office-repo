Ext.define('module.basic.delylcalmast.view.DelyLcalMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-delylcalmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-delylcalmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('unit_list','운송지역 목록'), xtype : 'module-delylcalmast-lister' }
				]
			},{	xtype : 'module-delylcalmast-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});