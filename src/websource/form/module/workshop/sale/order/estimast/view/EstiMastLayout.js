Ext.define('module.workshop.sale.order.estimast.view.EstiMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estimast-layout',
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
			dockedItems : [ { xtype: 'module-estimast-search' } ],
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
								{	title	: '견적 현황',
									layout	: 'border' ,
									border	: 0,
									items	: [
										/*  상단  */
										{	xtype	: 'module-estimast-lister-master',
											flex	:  1 ,
											itemId	: 'master',
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-estimast-editor',
											height	: 280,
											region	: 'south',
											hidden	: false
										},{	xtype	: 'tab-panel',
											itemId	: 'detail',
											region	: 'center',
											split	: true,
											collapsed: true,
											collapsible : false,
											hidden	: true,
											flex	:  1 ,
											items	: [
												{	title	: '수주 품목',
													layout	: 'border' ,
													border	: 0,
													items	: [
														{	xtype	: 'module-estimast-lister-detail',
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
									hidden	: true,
									items	: [
										/*  상단  */
										{	xtype	: 'module-estimast-bomlistmaster',
											flex	:  1 ,
											split	: true,
											region	: 'west',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-estimast-bomlistdetail',
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
										{	xtype	: 'module-estimast-lister-excel',
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
				{	xtype:'module-estimast-worker-editor', region:'north',
					style	: Const.borderLine.bottom,
				},{	region	: 'center',
					layout	: 'border',
					border	: 0,
					flex : 1,
					items	: [
						{	xtype	: 'module-estimast-tree',
							region	: 'center',
							width	: 1035,
							style	: Const.borderLine.right,
							split	: true,
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
				{	xtype:'module-estimast-worker-editor2', region:'north',height	: 215,
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	xtype	: 'module-estimast-lister-shetItem',
							region	: 'center',
							flex	: 1,
							style	: Const.borderLine.right,
							split	: true,
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
				{	xtype:'module-estimast-worker-editor4', region:'north',height	: 215,
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	xtype	: 'module-estimast-lister-subItem',
							region	: 'center',
							flex	: 1,
							style	: Const.borderLine.right,
							split	: true,
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
				{	xtype:'module-estimast-worker-editor3', region:'north',height	: 215,
				},{	layout	: 'border',
					border	: 0,
					flex	: 2,
					region	: 'center',
					items:[
						{	xtype	: 'module-estimast-lister-mainItem',
							region	: 'center',
							flex	: 1,
							style	: Const.borderLine.right,
							split	: true,
						}
					]
				}
			]
		};
	return card;
	}
});

