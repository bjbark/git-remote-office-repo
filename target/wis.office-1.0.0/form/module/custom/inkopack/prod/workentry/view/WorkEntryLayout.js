Ext.define('module.custom.inkopack.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workentry-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-workentry-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업일지작성</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-workentry-lister',
							flex	: 1,
							region	: 'north',
						},{	xtype	: 'panel',
							layout	: 'border',
							region	: 'center',
							flex	: 1,
							items	: [
								{	xtype : 'module-workentry-detail',
									region	: 'center',
									flex	: 1,
								}
							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">일일생산실적</span>', xtype : 'module-workentry-detail2' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">지시현황조회</span>'    , xtype : 'module-workentry-detail4' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">생산이력조회</span>', xtype : 'module-workentry-detail3' },

			]
		}
	];
	me.callParent(arguments);
	}
});