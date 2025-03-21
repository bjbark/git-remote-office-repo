Ext.define('module.project.domainmanager.view.DomainManagerLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-domainmanager-layout',

initComponent: function(config) {
	var me = this,
		buttons = {
			items: [
			]
		};
		me.dockedItems.push({xtype: 'module-domainmanager-search'}), // 검색조건
		me.items = [
            {	xtype   : 'tab-panel',
				itemId  : 'mainpanel',
				region  : 'center',
				flex    : 1,
				tabBar  : buttons,
				items: [
					{	title	: 'Table',
						layout	: 'border',
						border	: 0,
						items	: [
							{	layout	: 'border',
								region	: 'center',
								itemId : 'tablemaster',
								border	: 0,
								flex	: 1,
						     	items	: [
									{	layout	: 'border',
										itemId  : 'tablemaster',
										region  : 'west'   ,
										width	: 420,
										border	: 0,
								     	items	: [
											{	xtype  : 'module-domainmanager-lister-tm' ,
												region : 'center'   ,
												style  : Const.borderLine.right ,
												split  : true ,
												flex   : 2
											},
											{	xtype  : 'module-domainmanager-lister-relation' ,
												region : 'south'   ,
												style  : Const.borderLine.right ,
												flex   : 1,
												split  : true ,
											},
										]
									},
									{	xtype  : 'module-domainmanager-lister-t' ,
										region : 'center'   ,
										style  : Const.borderLine.right ,
										split  : true ,
									},
								]
							},
							{	xtype  : 'module-domainmanager-table-editor',
								region : 'south'   ,
								style  : Const.borderLine.right ,
								width  : 420,
								split  : true ,
							},
						]
					},{	title	: 'Domain',
						layout	: 'border',
						border	: 0,
						items	: [
							{	layout	: 'border',
								region	: 'center',
								border	: 0,
								flex	: 1,
						     	items	: [
									{	xtype  : 'module-domainmanager-lister' ,
										region : 'center'   ,
										itemId : 'domainlister',
										style  : Const.borderLine.right ,
										width  : 420,
										split  : true ,
									},
									{	xtype  : 'module-domainmanager-editor',
										region : 'south'   ,
										style  : Const.borderLine.right ,
										width  : 420,
										split  : true ,
									},
								]
							}
						]
					},{	title	: 'Word',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype  : 'module-domainmanager-lister-w' ,
								region : 'center',
								itemId : 'domain',
								style  : Const.borderLine.right ,
							}
						]
					},{	title	: 'Table List',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype  : 'module-domainmanager-lister-tl' ,
								region : 'center',
								itemId : 'domain',
								style  : Const.borderLine.right ,
							}
						]
					},
				]
			}
		];
		me.callParent(arguments);
	}
});