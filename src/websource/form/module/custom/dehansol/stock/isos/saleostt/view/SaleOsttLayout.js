Ext.define('module.custom.dehansol.stock.isos.saleostt.view.SaleOsttLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-saleostt-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-saleostt-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-saleostt-lister-search',
									height	:  (_global.options.mes_system_type !='Frame'? 70:40),
									split	: false,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-saleostt-lister-master',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						}
					]
				}
			],
		};
		return card;
	},
});

