Ext.define('module.stock.close.isoslist.view.IsosListLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-isoslist-layout',

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
			dockedItems : [ {xtype: 'module-isoslist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수불대장'	, xtype : 'module-isoslist-lister'},
					]
				}
			]
		}
		return card;
	}
});