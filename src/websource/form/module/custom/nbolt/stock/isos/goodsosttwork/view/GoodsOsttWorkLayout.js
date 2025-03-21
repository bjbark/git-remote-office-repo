Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',{ extend: 'Axt.form.Layout',
	alias 		: 'widget.module-nbolt-goodsosttwork-layout',
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
			dockedItems : [ {xtype: 'module-nbolt-goodsosttwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출고리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-nbolt-goodsosttwork-lister-master1',
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
												{	title	: '출고내역',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-nbolt-goodsosttwork-lister-detail1',
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
						},{	title	: '출고등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-nbolt-goodsosttwork-worker-editor',
									height	: 44,
									region	: 'north',
								},{ xtype	: 'module-nbolt-goodsosttwork-worker-search',
									region	: 'north',
								},{	xtype	: 'module-nbolt-goodsosttwork-worker-lister1',
									width	: 750,
									maxWidth: 750,
									region	: 'west',
									dockedItems:[
										{	xtype	: 'panel',
											maxWidth: 50,
											dock	: 'right',
											split	: true,
											collapsed: false,
											collapsible : false,
											width	: 50,
											border	: 0,
											layout	: {
												type	: 'vbox',
												align	: 'center',
												pack	: 'center',
											},
											items	: [
												{	xtype	: 'button',
													action	: 'enrollment',
													text	: '<span class="btnTemp">></span>',
													cls		: 'button-style',
													margin	: '50 0 0 0',
													height	: 80,
													width	: 30
												},{	xtype	: 'button',
													action	: 'remove',
													text	: '<span class="btnTemp"><</span>',
													cls		: 'button-style',
													margin	: '20 0 0 0',
													height	: 80,
													width	: 30,
												}
											]
										}
									]

								},{	xtype 	: 'module-nbolt-goodsosttwork-worker-lister2',
									split	: true,
									collapsed: false,
									collapsible : false,
									flex	: 8,
									region	: 'center',
									style	: Const.borderLine.left
								}
							]
						},{	title	: '출고대기',
							layout	: 'border',
							border	: 0,
							hidden	: true,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-nbolt-goodsosttwork-lister-master2',
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
												{	title	: '출고대기내역',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-nbolt-goodsosttwork-lister-detail2',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
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