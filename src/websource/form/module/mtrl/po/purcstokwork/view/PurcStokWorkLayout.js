Ext.define('module.mtrl.po.purcstokwork.view.PurcStokWorkLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-purcstokwork-layout',

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
			dockedItems : [ {xtype: 'module-purcstokwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '적정재고량 분석'	, xtype : 'module-purcstokwork-lister'}
					]
				}
			]
		}
		return card;
	}
});