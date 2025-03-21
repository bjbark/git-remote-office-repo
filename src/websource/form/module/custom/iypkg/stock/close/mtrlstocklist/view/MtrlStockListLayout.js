Ext.define('module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-mtrlstocklist-layout',

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
			dockedItems : [ {xtype: 'module-mtrlstocklist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '규격별 재고',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-mtrlstocklist-lister1',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								},
							]
						},{	title	: '규격별 수불부',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-mtrlstocklist-lister2',
											flex	: 1,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										}
									]
								}
							]
						}
					]
				}
			]
		}
		return card;
	}
});