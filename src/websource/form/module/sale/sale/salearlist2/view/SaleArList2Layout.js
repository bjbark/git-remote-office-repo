Ext.define('module.sale.sale.salearlist2.view.SaleArList2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salearlist2-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-salearlist2-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','거래처별 집계'), xtype : 'module-salearlist2-lister' },
					{	title: Language.get('','미수금 현황'), xtype : 'module-salearlist2-lister2' }
				]
			}
		];
		me.callParent(arguments);
	}
});