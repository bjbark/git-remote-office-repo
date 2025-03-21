Ext.define('module.item.colormix.view.ColorMixLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-colormix-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-colormix-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '품목 및 원료',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-colormix-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '품목별 안료 및 첨가 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-colormix-lister-detail',
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
			},{	xtype : 'module-colormix-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});