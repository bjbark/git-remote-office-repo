Ext.define('module.stock.close.mtrlstocklist.view.MtrlStockListLayout', { extend: 'Axt.form.Layout',

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
						{	title	: '재고현황'	, xtype : 'module-mtrlstocklist-lister'
						},{	title	: '창고별 현황',
							layout	: 'border' ,
							border	: 0,
							hidden	: true,
							items	: [
								/*  상단  */
								{	xtype	: 'module-mtrlstocklist-wrhs',
									flex	:  1 ,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.bottom
								},
								{	xtype	: 'module-mtrlstocklist-wrhs-stock',
									flex	:  3,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						},
					]
				}
			]
		}
		return card;
	}
});