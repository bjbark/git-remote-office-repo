Ext.define('module.custom.iypkg.sale.order.slorlist1.view.SlorList1Layout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-slorlist1-layout',

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
			dockedItems : [ {xtype: 'module-slorlist1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수발대장'	, xtype : 'module-slorlist1-lister'}
					]
				}
			]
		}
		return card;
	}
});