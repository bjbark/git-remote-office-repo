Ext.define('module.stock.isos.mtrlmonthlist.view.MtrlMonthListLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-mtrlmonthlist-layout',

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
			dockedItems : [ {xtype: 'module-mtrlmonthlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월별 수불현황'	, xtype : 'module-mtrlmonthlist-lister'}
					]
				}
			]
		}
		return card;
	}
});