Ext.define('module.prod.order.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-workbook-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workbook-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산일보',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-workbook-lister', /*  상단  */
										flex	: 70,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'center',
										flex	: 30,
										items	: [
											{	title	: '작업자',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-workbook-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '불량현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-workbook-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '유실공수',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-workbook-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '자재투입',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-workbook-lister-detail4',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '검사이력',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: _global.hq_id.toUpperCase() == 'N1000KOMEC' ? false : true,
												items	: [
													{	xtype	: 'module-workbook-lister-detail5',
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