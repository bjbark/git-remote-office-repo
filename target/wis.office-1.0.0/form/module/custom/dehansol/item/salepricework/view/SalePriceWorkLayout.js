Ext.define('module.custom.dehansol.item.salepricework.view.SalePriceWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salepricework-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-salepricework-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('','판매단가 내역'), xtype : 'module-salepricework-lister' }
				]
			},{	xtype : 'module-salepricework-editor', region : 'south',  hidden : false
			}
		];
		me.callParent(arguments);
	}
});