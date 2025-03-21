Ext.define('module.prod.order.workmonitering.view.WorkMoniteringLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-workmonitering-layout',
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
			dockedItems : [ {xtype: 'module-workmonitering-search'} ],
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
								{	xtype	: 'module-workmonitering-lister-master',
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