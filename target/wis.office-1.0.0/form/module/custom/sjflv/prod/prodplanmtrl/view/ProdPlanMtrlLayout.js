Ext.define('module.custom.sjflv.prod.prodplanmtrl.view.ProdPlanMtrlLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-prodplanmtrl-layout',
	layout:'card',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);

	},

	createListCard:function(){
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [{xtype: 'module-sjflv-prodplanmtrl-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					split  : true ,
					items	: [
						{	xtype	: 'panel',
							name	: 'tab1',
							layout	: 'fit',
							region	: 'center',
							title	: '원재료 발주대상',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-prodplanmtrl-lister1',
									style	: Const.borderLine.right ,
								}
							]
						}
					]
				}
			]
		}
		return card;
	},
});
