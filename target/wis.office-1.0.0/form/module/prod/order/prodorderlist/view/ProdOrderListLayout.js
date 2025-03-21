Ext.define('module.prod.order.prodorderlist.view.ProdOrderListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodorderlist-layout',

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
			dockedItems : [ {xtype: 'module-prodorderlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산지시현황'	, xtype : 'module-prodorderlist-lister'
						}
					]
				}
			]
		}
		return card;
	}
});