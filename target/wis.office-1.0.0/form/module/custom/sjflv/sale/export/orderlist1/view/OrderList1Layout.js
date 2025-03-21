Ext.define('module.custom.sjflv.sale.export.orderlist1.view.OrderList1Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sjflv-orderlist1-layout',

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-sjflv-orderlist1-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('OrderList', 'Order List'),
						layout	: 'border' ,
						border	: 0,
						items	: [
							/*  상단  */
							{	xtype	: 'module-sjflv-orderlist1-lister-master',
								flex	:  2 ,
								split	: true,
								region	: 'north',
								style	: Const.borderLine.bottom
							},{	xtype	: 'tab-panel',
								itemId	: 'detail',
								split	: true,
								region	: 'center',
								flex	: 1,
								items	: [
									{	title	: Language.get('Order Details', 'Order Details'),
										layout	: 'border',
										border	: 0,
										region	: 'center',
										items	: [
											{	xtype	: 'module-sjflv-orderlist1-lister-detail',
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
		];
		me.callParent(arguments);
	},
});

