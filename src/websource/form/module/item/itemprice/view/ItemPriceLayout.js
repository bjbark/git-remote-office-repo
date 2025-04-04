Ext.define('module.item.itemprice.view.ItemPriceLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemprice-layout',

	layout		: 'card',
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
			dockedItems : [ {xtype: 'module-itemprice-search'} ],
			items		: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: Language.get('item_list','품목 리스트'),
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-itemprice-lister', /*  상단  */
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
												{	title	: '구매단가 목록',
													layout	: 'border',
													itemId	: 'buy',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-itemprice-lister-detail1',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												},{	title	: '판매단가 목록',
													layout	: 'border',
													border	: 0,
													itemId	: 'sale',
													region	: 'center',
													items	: [
														{	xtype	: 'module-itemprice-lister-detail2',
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
						}
					]
				}
			]
		}
		return card;
	},
});