Ext.define('module.notice.dailyreport.view.DailyReportLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dailyreport-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-dailyreport-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			items	: [
				{	title: '업무일지',
					xtype : 'module-dailyreport-lister'
				}
			]
		}
		,{	xtype : 'module-dailyreport-editor', region : 'south', hidden : true}
	];
	me.callParent(arguments);
	}
});