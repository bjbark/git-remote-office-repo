Ext.define('module.sale.order.saleorder2.view.SaleOrder2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-saleorder2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-saleorder2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-saleorder2-lister-master',
//									flex	:  2 ,
									split	: true,
									region	: 'center',
//									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '첨부 파일',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-saleorder2-file',
//									flex	:  2 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
//								},{	title	: '첨부파일',
//									layout	: 'border',
//									border	: 0,
//									region	: 'center',
//									items	: [
//										{	xtype	: 'module-saleorder2-lister2',
//											region	: 'center',
//											style	: Const.borderLine.top
//										}
//									]
//								}
//								},{	xtype	: 'tab-panel',
//									itemId	: 'detail',
//									split	: true,
//									region	: 'center',
//									flex	: 1,
//									items	: [
//										{	title	: '수주내역',
//											layout	: 'border',
//											border	: 0,
//											region	: 'center',
//											hidden	: true,
//											items	: [
//												{	xtype	: 'module-saleorder2-lister-detail',
//													region	: 'center',
//													style	: Const.borderLine.top
//												}
//											]
//										},{	title	: '첨부파일',
//											layout	: 'border',
//											border	: 0,
//											region	: 'center',
//											items	: [
//												{	xtype	: 'module-saleorder2-lister2',
//													region	: 'center',
//													style	: Const.borderLine.top
//												}
//											]
//										}
//									]
//								}
//							]
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
				{	xtype:'module-saleorder2-worker-editor', region:'north'
				},{	xtype:'module-saleorder2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

