Ext.define('module.custom.iypkg.stock.close.stocklist1.view.StockList1Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-stocklist1-layout',

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
			dockedItems : [ {xtype: 'module-stocklist1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '원단과부족 현황',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-stocklist1-lister',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								},
							]
						}
					]
				}
			]
		}
		return card;
	}
});