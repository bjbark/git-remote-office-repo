Ext.define('module.user.meslog.view.MesLogLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-meslog-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-meslog-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('dept_list','MES 활용 현황'), xtype : 'module-meslog-lister' }
				]
			},{	xtype : 'module-meslog-editor', region : 'south', hidden : false
			}
		];
		me.callParent(arguments);
	}
});
