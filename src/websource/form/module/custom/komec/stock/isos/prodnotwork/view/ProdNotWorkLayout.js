Ext.define('module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodnotwork-layout',

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
			dockedItems : [ {xtype: 'module-prodnotwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산 및 입고내역'	, xtype : 'module-prodnotwork-lister'
						},{	title	: '불량내역'			, xtype : 'module-prodnotwork-lister2'
						}
					]
				}
			]
		}
		return card;
	}
});