Ext.define('module.custom.aone.sale.order.sordercofm.view.SorderCofmLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sordercofm-layout',
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
			dockedItems : [ { xtype: 'module-sordercofm-search' } ],
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
									{	xtype	: 'module-sordercofm-lister-master', /*  상단  */
										itemId	: 'master1',
										flex	: 50,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-sordercofm-lister-master2', /*  상단  */
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
										{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sordercofm-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '변경이력',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sordercofm-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '이미지',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sordercofm-lister-detail3',
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
												{	xtype	: 'module-sordercofm-lister-detail4',
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

