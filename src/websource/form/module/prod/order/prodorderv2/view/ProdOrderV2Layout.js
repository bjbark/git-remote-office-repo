Ext.define('module.prod.order.prodorderv2.view.ProdOrderV2Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodorderv2-layout',

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
			dockedItems : [ {xtype: 'module-prodorderv2-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산지시서',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodorderv2-lister1', /*  상단  */
											flex	: 2,
											itemId	: 'lister1',
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										},{	xtype	: 'module-prodorderv2-detail',
											itemId	: 'detail',
											region	: 'center',
											split	: true,
											style	: Const.borderLine.top
										},{	xtype	: 'module-prodorderv2-editor' ,
											region	: 'south'
										}
									]
								},
							]
						},{	title	: '생산지시 작성',
							layout	: 'border',
							border	: 0,
							hidden	: !(_global.options.prod_order_type == '생산계획 후 생산지시'),
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-prodorderv2-lister-search',
											height	: 40,
											split	: false,
											region	: 'north',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										},{	xtype : 'module-prodorderv2-lister2',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top, //Const.borderLine.left +
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