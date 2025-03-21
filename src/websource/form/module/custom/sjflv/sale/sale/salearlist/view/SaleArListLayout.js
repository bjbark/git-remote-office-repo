Ext.define('module.custom.sjflv.sale.sale.salearlist.view.SaleArListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salearlist-layout',
	 layout:'card',
		activeItem: 0,
	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()]; //, me.createWordCard()
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ {xtype: 'module-salearlist-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title : '매출처 원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-salearlist-lister',
									flex	: 3,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-salearlist-lister2',
									flex	: 2,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						}
					]
				}
			]
		};
		return card;
	},
});