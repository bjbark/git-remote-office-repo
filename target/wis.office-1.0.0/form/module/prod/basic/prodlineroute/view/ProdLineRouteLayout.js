Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prodlineroute-layout',

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
			dockedItems : [ {xtype: 'module-prodlineroute-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '공정순서목록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodlineroute-lister-master', /*  상단  */
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										},{	xtype	: 'tab-panel',/*  하단  */
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											items	: [
												{	title	: '공정순서',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-prodlineroute-lister-detail',
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
						},{	title		: '공정순서',
							layout		: 'border',
							border		: 0,
//							dockedItems	: [ {xtype: 'module-prodlineroute-lister-item'} ],
							items		: [
								{	layout	: 'border',
									border	: 0,
									flex	: 2,
									split	: true,
									region	: 'west',
									items:[
										{	xtype	: 'module-prodlineroute-lister-item1',
											region	: 'center',
										}
									]
								},{	xtype	: 'panel',
									region	: 'west',
									width	: 100,
									border	: 0,
									layout	: {
										type	: 'vbox',
										align	: 'center',
										pack	: 'center'
									},
									items	: [
										{	xtype	: 'button',
											action	: 'enrollment',
											text	: '<span class="btnTemp"><</span>',
											cls		: 'button-style',
											margin	: '50 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80,
										},{	xtype	: 'button',
											action	: 'remove',
											text	: '<span class="btnTemp">></span>',
											cls		: 'button-style',
											margin	: '20 0 0 0',
											width	: 100,
											height	: 50,
											width	: 80
										}
									]
								},{	xtype	: 'module-prodlineroute-lister-item2',
									flex	: 2,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
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