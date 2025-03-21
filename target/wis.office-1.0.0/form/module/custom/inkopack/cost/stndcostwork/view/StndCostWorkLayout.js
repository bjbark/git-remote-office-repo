Ext.define('module.custom.inkopack.cost.stndcostwork.view.StndCostWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-stndcostwork-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-stndcostwork-search' } ) ;
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('','표준원가 목록' ) , xtype : 'module-stndcostwork-lister' }
				]
			},{	xtype	: 'module-stndcostwork-editor' ,width : 240 , region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});


