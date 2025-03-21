Ext.define('module.prod.project.prjtworkentry.view.PrjtWorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtworkentry-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-prjtworkentry-search'}),
	me.items = [
//		{	xtype	: 'panel',
//			itemId	: 'mainpanel',
//			region : 'center',
//			flex	: 1,
//			items	: [
//				{xtype : 'module-prjtworkentry-lister',layout:'fit', }
//			]
//		}
		{	xtype	: 'tab-panel',
			flex	: 1,
			itemId	: 'mainpanel',
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">대기중인 작업</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-prjtworkentry-lister',
							flex	: 1,
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
										{	xtype : 'module-prjtworkentry-detail',
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">금일 작업실적</span>', xtype : 'module-prjtworkentry-detail2' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업지시찾기 </span>', xtype : 'module-prjtworkentry-detail3' }
			]
		}
	];
	me.callParent(arguments);
	}
});