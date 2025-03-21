Ext.define('module.custom.sjflv.eis.sjdashboard.view.SjdashBoardLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sjdashboard-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-sjdashboard-search' } ) ;
		me.items =  [
			{	layout : 'border',
				flex	: 1,
				region : 'center',
				items : [
					{	region	: 'center',
						layout	: 'border',
						border	: 0,
						items	: [
							{	layout	: 'border',
								flex	: 1,
								region	: 'north',
								split	: true,
								items	: [
									{	title	: '주문 오더 현황',
										layout	: 'border',
										flex	: 1,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right ,//Const.borderLine.left +
										items	: [
											{	xtype	: 'tab-panel',
												itemId	: 'order_tab',
												items:[
													{	title	: '주문현황',
														xtype	: 'module-sjdashboard-order-lister1',
														flex	: 1,
													},{	xtype	: 'module-sjdashboard-order-lister2',
														flex	: 1,
														title	: '신규 주문 현황',
													},{	xtype	: 'module-sjdashboard-order-lister3',
														flex	: 1,
														title	: '납기지연 현황',
													}
												]
											}
										]
									},{	title	: '제품 재고 현황',
										layout	: 'border',
										flex	: 1,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.right ,//Const.borderLine.left +
										items	: [
											{	xtype	: 'tab-panel',
												items:[
													{	xtype	: 'module-sjdashboard-prod-lister1', /*  상단  */
														title	: '안전재고',
														flex	: 1,
													},{	xtype	: 'module-sjdashboard-prod-lister2', /*  상단  */
														title	: '유통기한 임박',
														flex	: 1,
													}
												]
											}
										]
									}
								]
							},{	layout	: 'border',
								flex	: 1,
								region	: 'center',
								split	: true,
								items	: [
									{	title	: '원자재현황',
										layout	: 'border',
										flex	: 1,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right ,//Const.borderLine.left +
										items	: [
											{	xtype	: 'tab-panel',
												itemId	: 'mtrl_tab',
												items:[
													{	xtype	: 'module-sjdashboard-mtrl-lister1', /*  상단  */
														title	: '안전재고',
														flex	: 1,
													},{	xtype	: 'module-sjdashboard-mtrl-lister2', /*  상단  */
														flex	: 1,
														title	: '유통기한 임박',
													},{	xtype	: 'module-sjdashboard-mtrl-lister3', /*  상단  */
														flex	: 1,
														title	: '입고대기',
													},{	xtype	: 'module-sjdashboard-mtrl-lister4', /*  상단  */
														flex	: 1,
														title	: '당일입고접수',
													}
												]
											}
										]
									},{	layout	: 'border',
										flex	: 1,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.right ,//Const.borderLine.left +
										items	: [
											{	xtype	: 'module-sjdashboard-editor', /*  상단  */
												flex	: 1,
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
	}
});


