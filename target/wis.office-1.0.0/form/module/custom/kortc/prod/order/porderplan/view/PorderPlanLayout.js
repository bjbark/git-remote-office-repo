Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-porderplan-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-porderplan-search' } ],
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
									{	xtype	: 'module-porderplan-lister-master', /*  상단  */
										itemId	: 'master1',
										width	: 800,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-porderplan-lister-master2', /*  상단  */
										itemId	: 'master2',
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 40,
									items	: [
										{	title	: '지시내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-porderplan-lister-pror',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-porderplan-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '변경이력',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-porderplan-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '이미지',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-porderplan-lister-detail3',
													flex	: 1,
													split	: false,
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '상담내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-porderplan-lister-detail4',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										}
									]
								}
							]
					 	},{	title		: '생산지시 리스트',
							layout		: 'border',
							border		: 0,
							items		: [
								{	region	: 'north',
									layout	: 'border',
									border	: 0,
									flex : 60,
									items	: [
										{	xtype	: 'module-porderplan-lister-master3', /*  상단  */
											itemId	: 'master3',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-porderplan-lister-pror-detail', /*  상단  */
											itemId	: 'master4',
											flex	: 1,
											split	: true,
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
		};
		return card;
	},

});

