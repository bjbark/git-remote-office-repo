Ext.define('module.sale.project.salework.view.SaleWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salework-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-salework-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '계산서 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-salework-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: false,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '발행내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-salework-lister-detail',
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
			}
		];
		me.callParent(arguments);
	}
});