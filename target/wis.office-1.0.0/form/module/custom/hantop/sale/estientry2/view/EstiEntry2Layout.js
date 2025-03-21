Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estientry2-layout',
	layout:'card',
	activeItem: 0,


	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() , me.createWordCard() ];
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
			dockedItems : [ { xtype: 'module-estientry2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-estientry2-lister-master',
									flex	: 1,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									itemId	: 'detailtab',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: '견적품목',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry2-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '기타비용',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry2-lister-detail3',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry2-detail4-search',
													split	: true,
													region	: 'north',
													style	: Const.borderLine.bottom
												},{	xtype	: 'module-estientry2-lister-detail4',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요내역집계',
											layout	: 'border',
											border	: 0,
											hidden	: true,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry2-detail2-search',
													split	: true,
													region	: 'north',
													style	: Const.borderLine.bottom
												},{	xtype	: 'module-estientry2-lister-detail2',
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
				{	xtype:'module-estientry2-worker-editor',
					region	: 'north',
					height	: 183,
					style	: Const.borderLine.bottom
				},{	xtype	: 'tab-panel',
					itemId	: 'detailtab2',
					split	: true,
					region	: 'center',
					flex	: 1,
					items	: [
						{	title	: '견적품목',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-estientry2-worker-lister',
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '기타비용',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-estientry2-worker-lister2',
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '브랜드별 자재소요내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-estientry2-detail3-search',
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	region	: 'center',
									border	: 0,
									xtype	: 'module-estientry2-worker-lister3',
								}
							]
						}
					]
				}
			]
		};
	return card;
	}
});

