Ext.define('module.custom.iypkg.prod.dailyworklist.view.DailyWorkListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dailyworklist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dailyworklist-search'}),
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
								flex	: 80,
								items	: [
									{	layout	: 'border',
										border	: 0,
										region	: 'center',
										items	: [
											{	title	: '생산일보',
												xtype	: 'module-dailyworklist-lister',
												region	: 'center',
												style	: Const.borderLine.bottom
											}
										]
									}
								]
							},{	xtype	: 'panel',
								region	: 'south',
								layout	: 'border',
								split	: true,
								collapsed: false,
								collapsible : true,
								border	: 0,
								flex	: 40,
								style	: Const.borderLine.top,
								items	: [
									{	title	: '불량내역',
										xtype	: 'module-dailyworklist-detail1', /*  상단  */
										flex	: 50,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	title	: '유실내역',
										xtype	: 'module-dailyworklist-detail2', /*  상단  */
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left
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
