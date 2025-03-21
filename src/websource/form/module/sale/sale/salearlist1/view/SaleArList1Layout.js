Ext.define('module.sale.sale.salearlist1.view.SaleArList1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salearlist1-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-salearlist1-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','거래처 원장'), xtype : 'module-salearlist1-lister' },
				]
			}
		];
		me.callParent(arguments);
	}
});