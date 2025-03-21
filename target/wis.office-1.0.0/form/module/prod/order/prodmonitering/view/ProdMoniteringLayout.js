Ext.define('module.prod.order.prodmonitering.view.ProdMoniteringLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-prodmonitering-layout',
	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'fit',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-prodmonitering-search'} ],
			items : [
				{	xtype	: 'tab-panel',/*  하단  */
					itemId	: 'itempanels',
					split	: true,
					flex	: 1 ,//
					items	: [
						{	title	: '실시간 현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-prodmonitering-lister-master',
									itemId	: 'itempanel',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.right //Const.borderLine.left +
								}
							]
						}
					]
				}
			]
		}
	return card;
	},
});