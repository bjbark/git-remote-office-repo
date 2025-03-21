Ext.define('module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-salearlist2-layout',
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
			dockedItems : [ {xtype: 'module-salearlist2-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title : '미수현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-salearlist2-lister',
									flex	: 1.3,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-salearlist2-lister2',
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