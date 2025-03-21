Ext.define('module.qc.project.testprod.view.TestProdLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-testprod-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-testprod-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '시험생산 의뢰 내역',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-testprod-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '시험 생산 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-testprod-lister-detail',
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
			},{	xtype : 'module-testprod-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});