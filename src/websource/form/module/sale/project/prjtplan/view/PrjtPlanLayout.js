Ext.define('module.sale.project.prjtplan.view.PrjtPlanLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtplan-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtplan-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '프로젝트 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prjtplan-lister-master', /*  상단  */
										flex	: 40,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
//										itemId	: 'mainpanel',
										split	: true,
										region	: 'center',
										flex	: 60,
										items	: [
											{	title	: '설계일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtplan-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '작업계획',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtplan-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: 'BOM',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtplan-lister-detail4',
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
					},
				]
			}
		];
		me.callParent(arguments);
	}
});