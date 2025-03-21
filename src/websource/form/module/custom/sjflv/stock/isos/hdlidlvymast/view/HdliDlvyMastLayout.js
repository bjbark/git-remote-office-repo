Ext.define('module.custom.sjflv.stock.isos.hdlidlvymast.view.HdliDlvyMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-hdlidlvymast-layout',
	//d
	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-hdlidlvymast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('ostt_list','제품출고송장번호  목록'), xtype : 'module-hdlidlvymast-lister' },
				]
			}
		];
		me.callParent(arguments);
	}
});