Ext.define('module.stock.isos.goodsrettwork.view.GoodsRettWorkLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-goodsrettwork-layout',

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
			dockedItems : [ {xtype: 'module-goodsrettwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '반품 목록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-goodsrettwork-lister-master',
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
												{	title	: '반품 내역',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-goodsrettwork-lister-detail',
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
						},{	title	: '반품등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-goodsrettwork-worker-editor',
									height	: 44,
									region	: 'north',
								},{	xtype : 'module-goodsrettwork-worker-lister',
									split	: false,
									region	: 'center',
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