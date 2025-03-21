Ext.define('module.stock.close.dailystockwork.view.DailyStockWorkLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-dailystockwork-layout',

//	layout		:'card',
//	activeItem	: 0,

	initComponent : function(config) {
		var me = this;
		me.dockedItems.push({
			xtype : 'module-dailystockwork-search'
		}), me.items = [ {
			xtype : 'tab-panel',
			itemId : 'mainpanel',
			items : {
				title : '<span class= "btnTemp"style="font-size:15px; color:#15498b;">재고현황</span>',
				xtype : 'module-dailystockwork-lister'
			}
		} ];
		me.callParent(arguments);
	}
});