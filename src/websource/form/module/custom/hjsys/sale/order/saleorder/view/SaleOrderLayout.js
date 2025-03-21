Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-saleorder-layout',
	layout:'card',
	activeItem: 0,
	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard(), me.createWordCard2(), me.createWordCard3(),me.createWordCard4() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-saleorder-search' } ],
			items :[
				{	layout	: 'border',
					border	: 0 ,
					region	: 'center',
					flex	: 1,
					items	: [
						{	xtype	: 'tab-panel',
							itemId	: 'mainpanel',
							flex	: 1,
							items	: [
								{	title	: '수주 현황',
									layout	: 'border' ,
									border	: 0,
									items	: [
										/*  상단  */
										{	xtype	: 'module-saleorder-lister-master',
											flex	:  1 ,
											itemId	: 'master',
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-saleorder-editor',
											height	: 260,
											region	: 'north',
											hidden	: false
										},{	xtype	: 'tab-panel',
											itemId	: 'detail',
											region	: 'center',
											split	: true,
											collapsed: true,
											collapsible : false,
											flex	:  1 ,
											items	: [
												{	title	: '수주 품목',
													layout	: 'border' ,
													border	: 0,
													items	: [
														{	xtype	: 'module-saleorder-lister-detail',
															flex	:  2 ,
															split	: true,
															region	: 'center',
															style	: Const.borderLine.bottom
														}
													]
												}
											]
										}
									]
								},{	title	: 'BOM List',
									layout	: 'border' ,
									border	: 0,
									items	: [
										/*  상단  */
										{	xtype	: 'module-saleorder-bomlistmaster',
											flex	:  1 ,
											split	: true,
											region	: 'west',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-saleorder-bomlistdetail',
											flex	:  1 ,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								},{	title	: 'excel',
									layout	: 'border' ,
									hidden	: true,
									border	: 0,
									items	: [
										/*  상단  */
										{	xtype	: 'module-saleorder-lister-excel',
											flex	:  1 ,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-saleorder-worker-editor', region:'north',
					style	: Const.borderLine.bottom,
				},{	region	: 'center',
					layout	: 'border',
					border	: 0,
					flex : 1,
					items	: [
						{	xtype	: 'module-saleorder-tree',
							region	: 'west',
							width	: 1035,
							style	: Const.borderLine.right,
							split	: true,
						},{	flex	: 1,
							region	: 'center',
							xtype	: 'module-saleorder-image',
							style	: Const.borderLine.left
						}
					]
				}
			]
		};
	return card;
	},

	/**
	 *
	 */
	createWordCard2 : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items		: [
				{	xtype:'module-saleorder-worker-editor2', region:'north'
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	layout	: 'border',
							border	: 0,
							flex	: 2,
							split	: true,
							region	: 'west',
							items:[
								{	xtype	: 'module-saleorder-lister-item1',
									region	: 'center',
									style	: 'border: 1px solid #99bce8;'
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
						},{	xtype	: 'module-saleorder-lister-item2',
							flex	: 2,
							region	: 'center',
							style	: Const.borderLine.left + Const.borderLine.top
						}
					]
				}
			]
		};
	return card;
	},

	createWordCard3 : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items		: [
				{	xtype:'module-saleorder-worker-editor4', region:'north'
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	xtype	: 'module-saleorder-lister-subItem',
							region	: 'west',
							width	: 1085,
							style	: Const.borderLine.right,
							split	: true,
						},{	flex	: 1,
							region	: 'center',
							xtype	: 'module-saleorder-image',
							style	: Const.borderLine.left
						}
					]
				}
			]
		};
	return card;
	},

	createWordCard4 : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items		: [
				{	xtype:'module-saleorder-worker-editor3', region:'north'
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	xtype	: 'module-saleorder-lister-mainItem',
							region	: 'west',
							width	: 1085,
							style	: Const.borderLine.right,
							split	: true,
						},{	flex	: 1,
							region	: 'center',
							xtype	: 'module-saleorder-image2',
							style	: Const.borderLine.left
						}
					]
				}
			]
		};
	return card;
	}
});

