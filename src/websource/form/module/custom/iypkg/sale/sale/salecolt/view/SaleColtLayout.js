Ext.define('module.custom.iypkg.sale.sale.salecolt.view.SaleColtLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-iypkg-salecolt-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-iypkg-salecolt-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '수금내역',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-iypkg-salecolt-detail', /*  상단  */
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
											{	title	: '수금 상세내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-iypkg-salecolt-detail2',
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
					},{	title	: '계산서 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-iypkg-salecolt-lister-master', /*  상단  */
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