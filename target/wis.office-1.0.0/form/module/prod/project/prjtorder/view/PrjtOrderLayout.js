Ext.define('module.prod.project.prjtorder.view.PrjtOrderLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtorder-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtorder-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '수주 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prjtorder-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
//												itemId	: 'mainpanel',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '설계 작업',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtorder-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '생산작업',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtorder-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '자재투입',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtorder-lister-detail4',
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
		]
		me.callParent(arguments);
	}
});