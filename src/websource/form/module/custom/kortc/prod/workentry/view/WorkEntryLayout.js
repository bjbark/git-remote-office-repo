Ext.define('module.custom.kortc.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-kortc-workentry-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-kortc-workentry-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">대기중인 작업</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-kortc-workentry-lister',
							flex	: 4,
							region	: 'north',
							split	: true
						},{	xtype	: 'tab-panel',
							layout	: 'border',
							region	: 'center',
							flex	: 5,
							items	: [
								{	title:'<span class= "btnTemp"style="font-size:15px; color:#15498b;">진행중인 작업</span>',
									xtype : 'module-kortc-workentry-detail',
									region	: 'center',
									flex	: 2,
								}
							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">금일 작업실적</span>', xtype : 'module-kortc-workentry-detail2' },
			]
		}
	];
	me.callParent(arguments);
	}
});