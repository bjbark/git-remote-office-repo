Ext.define('module.stock.close.goodsstocklist.view.GoodsStockListLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-goodsstocklist-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-goodsstocklist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '재고현황'	, xtype : 'module-goodsstocklist-lister'}
					]
				}
			]
		}
		return card;
	}
});