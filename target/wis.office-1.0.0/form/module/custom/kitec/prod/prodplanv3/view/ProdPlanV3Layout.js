Ext.define('module.custom.kitec.prod.prodplanv3.view.ProdPlanV3Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prodplanv3-layout',

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
			dockedItems : [ {xtype: 'module-prodplanv3-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월간생산계획'	, xtype : 'module-prodplanv3-lister'
						}
					]
				}
			]
		}
		return card;
	}
});