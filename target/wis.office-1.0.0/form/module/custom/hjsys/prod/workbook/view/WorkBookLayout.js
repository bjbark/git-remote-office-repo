Ext.define('module.custom.hjsys.prod.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-hjsys-workbook-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-hjsys-workbook-search'}),
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
									{	xtype	: 'module-hjsys-workbook-lister', /*  상단  */
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
											{	title	: '불량현황',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-hjsys-workbook-lister-detail',
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