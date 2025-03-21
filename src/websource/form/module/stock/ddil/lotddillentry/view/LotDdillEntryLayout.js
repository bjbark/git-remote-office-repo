Ext.define('module.stock.ddil.lotddillentry.view.LotDdillEntryLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-lotddillentry-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent : function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems	: [ {xtype: 'module-lotddillentry-search'} ],
			items		: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: 'LOT재고현황' , xtype : 'module-lotddillentry-lister1'
						},{	title	: 'LOT재고실사' , xtype : 'module-lotddillentry-lister2'
						}
					]
				}
			]
		}
		return card;
	}
});