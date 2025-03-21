Ext.define('module.prod.order.prodrealtime.view.ProdRealTimeLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prodrealtime-layout',

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
			dockedItems : [ {xtype: 'module-prodrealtime-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산현황',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-prodrealtime-chart1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-prodrealtime-chart2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-prodrealtime-chart3',
									flex	: 1,
									split	: true,
									region	: 'east',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title	: '거래처별'	, xtype : 'module-prodrealtime-lister1'
						},{	title	: '품목별'	,xtype : 'module-prodrealtime-lister2'
						}
					]
				}
			]
		}
	return card;
	}
});