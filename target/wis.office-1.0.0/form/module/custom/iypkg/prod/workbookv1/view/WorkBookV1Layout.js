Ext.define('module.custom.iypkg.prod.workbookv1.view.WorkBookV1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workbookv1-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-workbookv1-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">대기중인 작업</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	:  'module-workbookv1-lister',
							flex	: 1,
							region	: 'center',
							style	: Const.borderLine.bottom
						}
//						,{	xtype	: 'tab-panel',
//							region	: 'center',
//							flex	: 1,
//							items	: [
//								{	title:'<span class= "btnTemp"style="font-size:15px; color:#15498b;">진행중인 작업</span>',
//									layout	: 'border',
//									region	: 'center',
//									items	: [
//										{	xtype	: 'module-workbookv1-detail',
//											region	: 'center',
//											style	: Const.borderLine.top
//										}
//									]
//								}
//							]
//						}
					]
				}
//				,{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">금일작업실적</span>', xtype : 'module-workbookv1-detail2' },
			]
		}
	];
	me.callParent(arguments);
	}
});