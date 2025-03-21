Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-purccstmlist1-layout',
	layout	:'card',
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
			dockedItems : [ {xtype: 'module-purccstmlist1-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title : '매입처 원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-purccstmlist1-lister',
									flex	: 3,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-purccstmlist1-lister2',
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