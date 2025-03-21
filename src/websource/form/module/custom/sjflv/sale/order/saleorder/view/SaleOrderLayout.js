Ext.define('module.custom.sjflv.sale.order.saleorder.view.SaleOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sjflv-saleorder-layout',
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
			dockedItems : [ { xtype: 'module-sjflv-saleorder-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-sjflv-saleorder-lister-master',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '신규주문현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-sjflv-saleorder-lister-master2',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									hidden	: _global.hq_id.toUpperCase() == 'N1000SJUNG' ? false : true,
									style	: Const.borderLine.bottom
								}
							]
						},{	title	: '첨부 파일',
							layout	: 'border' ,
							border	: 0,
							items	: [
							     	   /*  상단  */
							     	   {	xtype	: 'module-sjflv-saleorder-file',
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
								{	xtype	: 'module-sjflv-saleorder-lister-detail2',
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
				{	xtype:'module-sjflv-saleorder-worker-editor', region:'north'
				},{	xtype:'module-sjflv-saleorder-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

