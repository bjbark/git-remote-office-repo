Ext.define('module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prodmtrlcost-layout',
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
			dockedItems : [ {xtype: 'module-prodmtrlcost-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title : '자재 원가 구성 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodmtrlcost-lister',
									flex	: 1.5,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-prodmtrlcost-lister2',
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