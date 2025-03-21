Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodorder2-layout',
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
			layout	: 'border',
			border	: 0 ,
			dockedItems : [ { xtype: 'module-prodorder2-search' } ],
			items	:[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '컷팅 계획',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	layout	: 'border' ,
									border	: 0,
									region	: 'north',
									flex	: 1,
									items	: [
										{	xtype	: 'module-prodorder2-lister-master',
											flex	: 1,
											split	: true,
											region	: 'west',
											style	: Const.borderLine.bottom,
										},{	xtype	: 'module-prodorder2-lister-detail',
											split	: true,
											region	: 'center',
											flex	: 1
										}
									]
								},{	layout	: 'border' ,
									border	: 0,
									region	: 'center',
									flex	: 1,
									items	: [
										{	xtype	: 'module-prodorder2-detail3-search',
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											region	: 'center',
											itemId	: 'detailpanel',
											flex	: 2,
											items	: [
												{	title	: 'BF',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_bf',
												},{	title	: 'SF',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_sf',
												},{	title	: 'MF',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_mf',
												},{	title	: 'MC',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_mc',
												},{	title	: 'GB',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_gb',
												},{	title	: '유리',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_gl',
												},{	title	: '보강재',
													layout	: 'border' ,
													border	: 0,
													xtype	: 'module-prodorder2-lister-detail3_rn',
												}
											]
										}
									]
								}
							]
						},{	title		: '컷팅계획 추가',
							layout		: 'border',
							border		: 0,
							dockedItems	: [ {xtype: 'module-prodorder2-worker-search'} ],
							items		: [
								{	xtype	: 'module-prodorder2-lister-detail3',
									flex	: 2,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
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
								},{	xtype	: 'module-prodorder2-lister-detail4',
									flex	: 2,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
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

