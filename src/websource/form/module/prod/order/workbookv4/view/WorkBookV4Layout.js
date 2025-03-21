Ext.define('module.prod.order.workbookv4.view.WorkBookV4Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workbookv4-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-workbookv4-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">사출대기</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-workbookv4-lister',
							flex	: 4,
							region	: 'north',
						},{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							flex	: 5,
							items	: [
								{ xtype	: 'module-workbookv4-middlesearch',
									region	: 'north',
								},{	xtype	: 'tab-panel',
									items	: [
										{	title:'<span class= "btnTemp"style="font-size:15px; color:#15498b;">사출생산</span>',
											xtype : 'module-workbookv4-detail',
											region	: 'center',
											flex	: 2,
										}
									]
								},

							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">일일생산실적</span>', xtype : 'module-workbookv4-detail2' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">지시현황조회</span>'    , xtype : 'module-workbookv4-detail4' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">생산이력조회</span>', xtype : 'module-workbookv4-detail3' },
			],
			listeners:{
				render:function(){
					this.setActiveTab(2);
				}
			}
		}
	];
	me.callParent(arguments);
	}
});