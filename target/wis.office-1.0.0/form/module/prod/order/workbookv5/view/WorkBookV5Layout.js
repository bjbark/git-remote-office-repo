Ext.define('module.prod.order.workbookv5.view.WorkBookV5Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workbookv5-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-workbookv5-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">대기중인 작업</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-workbookv5-lister',
							flex	: 1.5,
							region	: 'north',
							style	: Const.borderLine.bottom
						},{	xtype	: 'tab-panel',
							region	: 'center',
							flex	: 1,
							items	: [
								{	title:'<span class= "btnTemp"style="font-size:15px; color:#15498b;">진행중인 작업</span>',
									layout	: 'border',
									region	: 'center',
									items	: [
										{	xtype : 'module-workbookv5-detail',
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">금일 작업실적</span>', xtype : 'module-workbookv5-detail2' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업지시찾기 </span>', xtype : 'module-workbookv5-detail3' }
			]
		}
	];
	me.callParent(arguments);
	}
});