Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-mtrlstocklist-layout',

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
			dockedItems : [ {xtype: 'module-mtrlstocklist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '거래처별자재수불현황'	, xtype : 'module-mtrlstocklist-lister'},
						{	title	: '자재수불현황검색'	, xtype : 'module-mtrlstocklist-lister-detail'},
						{	title	: '안전재고리스트'	, xtype : 'module-mtrlstocklist-lister-detail2'}
					]
				}
			]
		}
		return card;
	}
});