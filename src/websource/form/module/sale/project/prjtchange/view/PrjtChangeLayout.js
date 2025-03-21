Ext.define('module.sale.project.prjtchange.view.PrjtChangeLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtchange-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtchange-search'}),
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
									{	xtype	: 'module-prjtchange-lister-master', /*  상단  */
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
											{	title	: '설계 변경 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtchange-lister-detail5',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: 'amend내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtchange-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '설계 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false,
												items	: [
													{	xtype	: 'module-prjtchange-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '생산 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false,
												items	: [
													{	xtype	: 'module-prjtchange-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '상담내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtchange-lister-detail4',
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
			},{	xtype : 'module-prjtchange-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});