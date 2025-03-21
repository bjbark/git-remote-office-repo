Ext.define('module.custom.komec.sale.order.saleorder.view.SaleOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-komec-saleorder-layout',
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
			dockedItems : [ { xtype: 'module-komec-saleorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-komec-saleorder-lister-master',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '첨부 파일',
							layout	: 'border' ,
							border	: 0,
							items	: [
							     	   /*  상단  */
							     	   {	xtype	: 'module-komec-saleorder-file',
							     		   flex	:  2 ,
							     		   split	: true,
							     		   region	: 'center',
							     		   style	: Const.borderLine.bottom
							     	   }
							     	   ]
						},{	title	: '상담내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-komec-saleorder-lister-detail2',
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
				{	xtype:'module-komec-saleorder-worker-editor', region:'north'
				},{	xtype:'module-komec-saleorder-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

