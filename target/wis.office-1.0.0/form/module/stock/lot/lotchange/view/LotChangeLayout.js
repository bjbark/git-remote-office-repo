Ext.define('module.stock.lot.lotchange.view.LotChangeLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-lotchange-layout',
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
			dockedItems : [ {xtype: 'module-lotchange-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수불내역',
							layout	: 'border',
							border	: 0,
							items	: [
									/*  상단  */
									{	xtype	: 'module-lotchange-lister-master',
										flex	:  2 ,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{ /*  하단  */
										xtype	: 'module-lotchange-lister-detail',
										flex	: 1 ,
										region	: 'center',
										style	: Const.borderLine.top
									}
								]
							}
						]
				},{	title	: '조정등록',
					xtype	: 'module-lotchange-editor',
					region	: 'south',
					hidden	: false
				}
			]
		};
		return card;
	}
});

