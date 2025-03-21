Ext.define('module.custom.sjflv.prod.prodplan.view.ProdPlanLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjflv-prodplan-layout',
	layout:'card',
	activeItem: 0,
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);

	},
	createListCard:function(){
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [{xtype: 'module-sjflv-prodplan-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					split  : true ,
					items	: [
						{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							title	: '생산계획 수립',
							name	: 'firstTab',
							flex	: 1,
							items	: [
								{	xtype	: 'module-sjflv-prodplan-lister1',
									flex	: 1,
									style	: Const.borderLine.right ,
									region	: 'center'
								},{	xtype	: 'tabpanel',
									flex	: 1,
									split	:true,
									region	: 'south',
									items	: [
										{	xtype	: 'panel',
											layout	: 'fit',
											title	: '원재료재고현황',
											items	: [
												{	xtype	: 'module-sjflv-prodplan-lister-item1',
												}
											]
										}
									]
								}
							]
						},{	xtype	: 'panel',
							layout	: 'fit',
							title	: '생산계획 현황',
							name	: 'secondTab',
							items	: [
								{	xtype	: 'module-sjflv-prodplan-lister2'
								}
							]
						}
					]
				}
			]
		}
		return card;
	}
});
