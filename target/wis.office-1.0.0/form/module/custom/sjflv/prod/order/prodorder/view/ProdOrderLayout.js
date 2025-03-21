Ext.define('module.custom.sjflv.prod.order.prodorder.view.ProdOrderLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-sjflv-prodorder-layout',

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
			dockedItems : [ {xtype: 'module-sjflv-prodorder-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산지시 작성',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
//										{	xtype	: 'module-sjflv-prodorder-lister-search',
//											height	: 40,
//											split	: false,
//											region	: 'north',
//											style	: Const.borderLine.bottom //Const.borderLine.left +
//										},
										{	xtype	: 'module-sjflv-prodorder-lister1',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top //Const.borderLine.left +
										}
									]
								}
							]
						},{	title	: '생산지시리스트'	, xtype : 'module-sjflv-prodorder-lister2'
						},
					]
				}
			]
		}
		return card;
	}
});