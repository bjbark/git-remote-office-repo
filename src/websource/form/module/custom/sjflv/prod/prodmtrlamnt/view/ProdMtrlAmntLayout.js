Ext.define('module.custom.sjflv.prod.prodmtrlamnt.view.ProdMtrlAmntLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prodmtrlamnt-layout',
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
			dockedItems : [ {xtype: 'module-prodmtrlamnt-search'} ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title : '생산원료수불',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodmtrlamnt-lister',
									flex	: 1,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.bottom
								}
							]
						},{	title	: '생산원료금액',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prodmtrlamnt-lister2',
									flex	:  1 ,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
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