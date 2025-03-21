Ext.define('module.eis.report.eisreport15.view.EisReport15Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport15-layout',

	initComponent: function(config){
	var me = this;
	me.items = [
		{	layout : 'fit',
			flex	: 1,
			region : 'center',
			items	: [
				{	xtype : 'module-eisreport15-lister'
				}
			]
		}
	];
	me.callParent(arguments);
	}
});