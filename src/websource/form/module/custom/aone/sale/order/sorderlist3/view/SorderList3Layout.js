Ext.define('module.custom.aone.sale.order.sorderlist3.view.SorderList3Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sorderlist3-layout',


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
			dockedItems : [ {xtype: 'module-sorderlist3-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId  : 'mainpanel',
//					region	: 'north',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '주문 리스트',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype  : 'module-sorderlist3-lister-master',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
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