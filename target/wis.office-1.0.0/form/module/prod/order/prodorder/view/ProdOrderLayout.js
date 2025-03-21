Ext.define('module.prod.order.prodorder.view.ProdOrderLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodorder-layout',

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
			dockedItems : [ {xtype: 'module-prodorder-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산지시리스트'	, xtype : 'module-prodorder-lister1'
						},{	title	: '생산지시 작성',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodorder-lister-search',
											height	: 40,
											split	: false,
											region	: 'north',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										},{	xtype : 'module-prodorder-lister2',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top //Const.borderLine.left +
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