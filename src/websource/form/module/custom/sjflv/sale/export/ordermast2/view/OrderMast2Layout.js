Ext.define('module.custom.sjflv.sale.export.ordermast2.view.OrderMast2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sjflv-export-ordermast2-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-sjflv-export-ordermast2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: Language.get('OrderList', 'Order List'),
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-sjflv-export-ordermast2-lister-master',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
					 	}
					]
				},{	xtype  : 'module-sjflv-export-ordermast2-editor', region : 'south'
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-sjflv-export-ordermast2-worker-editor', region:'north'
				},{	xtype:'module-sjflv-export-ordermast2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

