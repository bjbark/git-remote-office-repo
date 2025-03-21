Ext.define('module.project.querymaker.view.QueryMakerLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-querymaker-layout',

initComponent: function(config) {
	var me = this,
		buttons = {
			items: [
				{   xtype	: 'tbfill' },
				{   xtype	: 'button',
					text	: Const.SELECT.text ,
					iconCls	: Const.SELECT.icon ,
					action	: Const.SELECT.action,
					cls		: 'button-style'
				}
			]
		};
		me.dockedItems.push({xtype: 'module-querymaker-search'}), // 검색조건
		me.items = [
			{	xtype   : 'tab-panel',
				itemId  : 'mainpanel',
				region  : 'center',
				flex    : 1,
				tabBar  : buttons,
				items: [
					{	title: '쿼리 관리자',
						layout : 'border',
						border : 0,
						items  : [
							{   region : 'west',
								layout : 'border',
								border : 0,
								width	: 400,
								items  : [
									/*  좌측 상단  */
									{   xtype	: 'module-querymaker-lister-module',
										split	: true,
										flex	: 2,
										region	: 'center',
										style	: Const.borderLine.left + Const.borderLine.bottom
									}
								]
							},{ region : 'center',
//					            xtype   : 'tab-panel',
								layout : 'border',
								border : 0,
								items  : [
									{	layout : 'border',
										border : 0,
										region : 'center',
										items  : [
											{   region : 'center',
												layout : 'border',
												border : 0,
												items  : [
													{   xtype	: 'module-querymaker-lister',
														flex	: 1,
														region	: 'center',
														style	: Const.borderLine.left + Const.borderLine.top
													},
													{	xtype	: 'module-querymaker-editor',
														region	: 'south',
														style	: Const.borderLine.right ,
														width	: 420,
														split	: true ,
													},
												]
											},
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