Ext.define('module.mtrl.po.purcordrlist.view.PurcOrdrListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-purcordrlist-layout',

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
			dockedItems : [ {xtype: 'module-purcordrlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '품목별'   , xtype : 'module-purcordrlist-lister1'
						},{	title	: '거래처별'  , xtype : 'module-purcordrlist-lister2'	, hidden : true
						},{	title	: '납기일자순' , xtype : 'module-purcordrlist-lister3'	, hidden : (_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false),
						},{	title	: '담당자별'  , xtype : 'module-purcordrlist-lister4'	, hidden : true
						}
					]
				}
			]
		}
		return card;
	}
});