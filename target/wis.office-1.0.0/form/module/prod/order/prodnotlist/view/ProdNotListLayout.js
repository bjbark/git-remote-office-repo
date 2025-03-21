Ext.define('module.prod.order.prodnotlist.view.ProdNotListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodnotlist-layout',

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
			dockedItems : [ {xtype: 'module-prodnotlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산불량현황'	, xtype : 'module-prodnotlist-lister'
						}
					]
				}
			]
		}
		return card;
	}
});