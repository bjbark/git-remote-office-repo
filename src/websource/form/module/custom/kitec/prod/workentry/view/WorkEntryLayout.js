Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-kitec-workenty-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-kitec-workenty-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('ready_work', '대기중인 작업')+'</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	: 'module-kitec-workenty-lister',
							flex	: 1.5,
							region	: 'north',
							style	: Const.borderLine.bottom
						},{	xtype	: 'tab-panel',
							region	: 'center',
							flex	: 1,
							items	: [
								{	title:'<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('work_in', '진행중인 작업')+'</span>',
									layout	: 'border',
									region	: 'center',
									items	: [
										{	xtype : 'module-kitec-workenty-detail',
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						}
					]
				},
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('daily_worked', '금일 작업실적')+'</span>', xtype : 'module-kitec-workenty-detail2' },
				{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('find_order', '작업지시찾기')+'</span>', xtype : 'module-kitec-workenty-detail3' }
			]
		}
	];
	me.callParent(arguments);
	}
});