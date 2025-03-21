Ext.define('module.workshop.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workentry-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workentry-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('esti_list','생산지시 목록'), xtype : 'module-workentry-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
