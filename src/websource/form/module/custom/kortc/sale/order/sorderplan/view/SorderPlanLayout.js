Ext.define('module.custom.kortc.sale.order.sorderplan.view.SorderPlanLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sorderplan-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-sorderplan-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '주문 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-sorderplan-lister-master', /*  상단  */
										itemId	: 'master1',
										flex	: 100,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.top
									}
//									,{	xtype	: 'module-sorderplan-lister-master2', /*  상단  */
//										itemId	: 'master2',
//										flex	: 50,
//										split	: true,
//										region	: 'center',
//										style	: Const.borderLine.left
//									}
								]
							},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 40,
									items	: [
										{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sorderplan-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '이미지',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sorderplan-lister-detail2',
													flex	: 1,
													split	: false,
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요량',
											layout	: 'border',
											border	: 0,
											itemId  : 'need1',
											region	: 'center',
											items	: [
												{	xtype	: 'module-sorderplan-lister-detail3',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요량',
											layout	: 'border',
											border	: 0,
											itemId  : 'need2',
											hidden	: true,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sorderplan-lister-detail5',
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
});

