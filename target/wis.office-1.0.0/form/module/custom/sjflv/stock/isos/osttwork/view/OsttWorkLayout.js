Ext.define('module.custom.sjflv.stock.isos.osttwork.view.OsttWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-osttwork-layout',
	//d
	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-osttwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('ostt_list','제품출고작업  목록'), xtype : 'module-osttwork-lister' },
					{	title: Language.get('ostt_list','제품라벨작업 목록'), xtype : 'module-osttwork-lister2', hidden	: _global.hqof_idcd.toUpperCase() != 'N1000SJFLV', }
				]
			},{	xtype : 'module-osttwork-editor', region : 'south',  itemId	: 'editor', hidden : false
			}
		];
		me.callParent(arguments);
	}
});