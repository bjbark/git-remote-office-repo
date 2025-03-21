Ext.define('module.cost.stndcost.view.StndCostLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-stndcost-layout',

	initComponent : function(config){
		var me = this; me.dockedItems.push({xtype: 'module-stndcost-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','표준원가 목록'), xtype : 'module-stndcost-lister' }
				]
			},{	xtype : 'module-stndcost-editor', region : 'south',  hidden : false}
		];
		me.callParent(arguments);
	}
});
