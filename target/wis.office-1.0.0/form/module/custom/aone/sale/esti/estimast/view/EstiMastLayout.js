Ext.define('module.custom.aone.sale.esti.estimast.view.EstiMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estimast-layout',
	layout:'card',
	activeItem: 0,

	// 초기화 콤포넌트
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border : 0 ,
			dockedItems : [ { xtype : 'module-estimast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 리스트',
							layout	: 'border',
							border	: 0,
							items	: [
							/*  상단  */
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-estimast-lister-master', /* 상단 좌측  */
										itemId	: 'master1',
										flex	: 62,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-estimast-lister-master2', /* 상단 우측 */
										itemId	: 'master2',
										flex	: 38,
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
										{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '변경이력',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '상담내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast-lister-detail3',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '가공비',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast-lister-detail4',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '제품 이미지',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											itemId  : 'imgTab',
											items	: [
												{	xtype	: 'module-estimast-lister-detail5',
													flex	: 1,
													split	: false,
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											itemId  : 'mtrlTab',
											items	: [
												{	xtype	: 'module-estimast-lister-detail6',
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

	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype :'module-estimast-worker-editor', region:'north'
				},{	xtype :'module-estimast-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

