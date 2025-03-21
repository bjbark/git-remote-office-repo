Ext.define('module.custom.sjflv.sale.etc.smplostt.view.SmplOsttLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-smplostt-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-smplostt-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('insptype_list','Sample List'),
						xtype : 'module-smplostt-lister'
					}
				]
			},{	xtype  : 'module-smplostt-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
