Ext.define('module.stock.ddil.ddilmake.view.DdilMakeLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-ddilmake-layout',

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
			dockedItems : [ {xtype: 'module-ddilmake-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '재고현황'	, xtype : 'module-ddilmake-lister1'
						},{	title	: '재고실사'	, xtype : 'module-ddilmake-lister2'
						}
					]
				}
			]
		}
		return card;
	}
});