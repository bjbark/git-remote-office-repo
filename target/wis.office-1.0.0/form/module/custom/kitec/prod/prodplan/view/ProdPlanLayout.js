Ext.define('module.custom.kitec.prod.prodplan.view.ProdPlanLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodplan-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-prodplan-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '주조생산계획',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodplan-lister',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								},
							]
						},{	title	: '주조생산계획 현황',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodplan-lister2',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								},
							]
						}
					]
				}
			]
		}
		return card;
	}
});