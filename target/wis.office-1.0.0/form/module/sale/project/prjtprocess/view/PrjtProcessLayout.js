Ext.define('module.sale.project.prjtprocess.view.PrjtProcessLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtprocess-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtprocess-search'}),
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
									{	xtype	: 'module-prjtprocess-lister-master', /*  상단  */
										flex	: 40,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										split	: true,
										itemId	: 'detail',
										region	: 'center',
										flex	: 60,
										items	: [
											{	title	: '설계일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '설계변경',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '작업일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '자재투입내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: true,
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail4',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: 'AMEND 현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail5',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '시사출 현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden  : _global.hqof_idcd.toUpperCase() == 'N1000WONTC',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail6',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '육성작업 현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden  : _global.hqof_idcd.toUpperCase() == 'N1000WONTC',
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail7',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '수금 현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: (_global.cost_drtr_yorn == 0),
												items	: [
													{	xtype	: 'module-prjtprocess-lister-detail8',
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