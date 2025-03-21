Ext.define('module.custom.sjflv.eis.userloglist.view.UserLogListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-userloglist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-userloglist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','사용자별 로그 현황'), xtype : 'module-userloglist-lister' }
				]
			}
		];
		me.callParent(arguments);
	}
});
