Ext.define('module.custom.inkopack.sale.dlvylist.view.DlvyListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-inkopack-dlvylist-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), /* me.createWordCard()*/ ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-inkopack-dlvylist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '배송 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-inkopack-dlvylist-master',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
//						,{	title	: '첨부 파일',
//							layout	: 'border' ,
//							border	: 0,
//							items	: [
//							     	   /*  상단  */
//							     	   {	xtype	: 'module-inkopack-saleorder-file',
//							     		   flex	:  2 ,
//							     		   split	: true,
//							     		   region	: 'center',
//							     		   style	: Const.borderLine.bottom
//							     	   }
//							     	   ]
//						},{	title	: '상담내역',
//							layout	: 'border' ,
//							border	: 0,
//							items	: [
//								/*  상단  */
//								{	xtype	: 'module-inkopack-saleorder-lister-detail2',
//									flex	:  2 ,
//									split	: true,
//									region	: 'center',
//									style	: Const.borderLine.bottom
//								}
//							]
//					 	}
					]
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
//	createWordCard : function () {
//		var	card = {
//			layout	: 'border',
//			border	: 0 ,
//			items	: [
//				{	xtype:'module-inkopack-saleorder-worker-editor', region:'north'
//				},{	xtype:'module-inkopack-saleorder-worker-lister', region:'center' , style : Const.borderLine.top
//				}
//			]
//		};
//	return card;
//	}
});

