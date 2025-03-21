Ext.define('module.custom.iypkg.sale.order.sptsmast.view.SptsMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sptsmast-layout',
	layout:'card',
	activeItem: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), ]; //me.createWordCard()
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-sptsmast-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출하계획 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-sptsmast-worker-search',
									region	: 'north',
								},{	xtype	: 'module-sptsmast-worker-lister',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						},{	title	: '출하계획 현황',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-sptsmast-lister',
											flex	: 2,
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
			]
		};
		return card;
	},

});

