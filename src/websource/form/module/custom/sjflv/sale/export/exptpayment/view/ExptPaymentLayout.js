Ext.define('module.custom.sjflv.sale.export.exptpayment.view.ExptPaymentLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-sjflv-exptpayment-layout',

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
			dockedItems : [ {xtype: 'module-sjflv-exptpayment-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: 'Payment List',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-sjflv-exptpayment-lister-master1',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											items	: [
												{	title	: 'Payment Detail',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-sjflv-exptpayment-lister-detail1',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
								},
							]
						},{	title	: 'Payment 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-sjflv-exptpayment-worker-editor',
									height	: 95,
									region	: 'north',
								},{	xtype : 'module-sjflv-exptpayment-worker-lister',
									split	: false,
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.top
								},{	xtype : 'module-sjflv-exptpayment-worker-detail',
									split	: false,
									flex	: 1,
									region	: 'south',
									style	: Const.borderLine.top
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