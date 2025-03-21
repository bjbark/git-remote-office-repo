Ext.define('module.custom.dehansol.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dehansol-workentry-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-dehansol-workentry-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업일지보고</span>',
					xtype	: 'module-dehansol-workentry-lister',
				},{title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">작업일지찾기 </span>', xtype : 'module-dehansol-workentry-detail1' }
			]
		}
	];
	me.callParent(arguments);
	}
});