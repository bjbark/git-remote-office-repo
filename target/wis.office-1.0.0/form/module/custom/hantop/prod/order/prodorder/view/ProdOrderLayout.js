Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodorder-layout',
	layout:'card',
	activeItem: 0,


	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-prodorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodorder-lister-master',
									flex	: 1,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-prodorder-lister-detail',
									split	: true,
									region	: 'center',
									flex	: 2
								}
							]
						},{	title	: '확정대기내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodorder-lister-cofm',
									flex	: 1,
									split	: true,
									floatable : false,
									collapsible: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									region	: 'center',
									itemId	: 'cofmpanel',
									flex	: 2,
									items	:[
										{	title	: '상세내역',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-cofmdetail',
										},{	title	: '집계내역',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-cofmdetail2',
										},{	title	: '수동 최적화',
											layout	: 'border' ,
											border	: 0,
											items	: [
												{	layout	: 'border' ,
													border	: 0,
													region	: 'west',
													width	: 650,
													items	: [
														{	xtype	: 'module-prodorder-lister-cofmsearch',
															split	: true,
															height	: 70,
															region	: 'north',
														},{	xtype	: 'module-prodorder-lister-cofmdetail3_1_1',
															split	: true,
															witdh	: 200,
															region	: 'center',
															style	: Const.borderLine.left + Const.borderLine.bottom
														},{	xtype	: 'module-prodorder-lister-cofmdetail3_1_2',
															split	: true,
															itemId	: 'detail3_1_2',
															hidden	: true,
															flex	: 1,
															region	: 'east',
															style	: Const.borderLine.left + Const.borderLine.bottom
														},
													]
												},{	xtype	: 'panel',
													region	: 'west',
													width	: 100,
													border	: 1,
													layout	: {
														type	: 'vbox',
														align	: 'center',
														pack	: 'center'
													},
													items	: [
														{	xtype	: 'button',
															action	: 'addManual',
															text	: '<span class="btnTemp"><</span>',
															cls		: 'button-style',
															margin	: '50 0 0 0',
															width	: 100,
															height	: 50,
															width	: 80,
														},{	xtype	: 'button',
															action	: 'removeManual',
															text	: '<span class="btnTemp">></span>',
															cls		: 'button-style',
															margin	: '20 0 0 0',
															width	: 100,
															height	: 50,
															width	: 80
														}
													]
												},{	xtype	: 'module-prodorder-lister-cofmdetail3_2',
													flex   : 2,
													region : 'center',
													style  : Const.borderLine.left + Const.borderLine.top
												}
											]
										}
									]
								}
							]
						},{	title	: '작업지시내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodorder-detail3-search',
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									region	: 'center',
									itemId	: 'detailpanel',
									flex	: 2,
									items	:[
										{	title	: '상세내역',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3',
											hidden	: true
										},{	title	: 'BF',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_bf',
										},{	title	: 'SF',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_sf',
										},{	title	: 'MF',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_mf',
										},{	title	: 'MC',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_mc',
										},{	title	: 'GB',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_gb',
										},{	title	: '유리',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_gl',
										},{	title	: '보강재',
											layout	: 'border' ,
											border	: 0,
											xtype	: 'module-prodorder-lister-detail3_rn',
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
});

