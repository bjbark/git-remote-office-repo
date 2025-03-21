Ext.define('module.custom.iypkg.sale.order.saleorder.view.SaleOrderLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-saleorder-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-saleorder-search' } ],
			items :[
				{	xtype	: 'module-saleorder-editor-iypkg',
					region	: 'center',
					flex	: 1,
					style	: Const.borderLine.right ,
					hidden	: _global.hq_id.toUpperCase()=='N1000IYPKG'? false : true,
				},{	xtype	: 'module-saleorder-editor',
					region	: 'west',
					width	: 800,
					split	: true ,
					style	: Const.borderLine.right ,
					hidden	: _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false,
				},{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					region	: 'center',
					flex	: 1,
					hidden	: _global.hq_id.toUpperCase()=='N1000IYPKG'? true : false,
					items	: [
						{	title	: '수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-saleorder-lister',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				},
			]
		};
		return card;
	}
});

