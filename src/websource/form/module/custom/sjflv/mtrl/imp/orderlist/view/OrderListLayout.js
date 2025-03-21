Ext.define('module.custom.sjflv.mtrl.imp.orderlist.view.OrderListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-orderlist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-orderlist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'Order List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-orderlist-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-orderlist-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
					},{	title	: '픔목별 Order List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-orderlist-master2', /*  상단  */
										itemId	: 'tab2_master',
										flex	: 60,
										split	: false,
										region	: 'north',
										style	: Const.borderLine.bottom
									}
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});