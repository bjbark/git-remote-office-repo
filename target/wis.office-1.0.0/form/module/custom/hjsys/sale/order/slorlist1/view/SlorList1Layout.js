Ext.define('module.custom.hjsys.sale.order.slorlist1.view.SlorList1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-hjsys-slorlist1-layout',


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
			dockedItems	: [ {xtype: 'module-hjsys-slorlist1-search'} ],
			items	: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '수주현황',
							xtype	: 'module-hjsys-slorlist1-lister-master',
						},{	title	: '품목별현황',
							region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-hjsys-slorlist1-lister-detail',
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
		return card;
	},
});