Ext.define('module.custom.iypkg.stock.close.goodsstocklist.GoodsStockList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.iypkg.stock.close.goodsstocklist.model.GoodsStockList',
	],
	stores	: [
		'module.custom.iypkg.stock.close.goodsstocklist.store.GoodsStockList',
		'module.custom.iypkg.stock.close.goodsstocklist.store.GoodsStockList2'
	],
	views	: [
		'module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLayout',
		'module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLister',
		'module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLister2',
		'module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-goodsstocklist-layout button[action=selectAction]' : { click : me.selectAction },
			'module-goodsstocklist-lister button[action=exportAction]' : { click : me.exportAction },
			'module-goodsstocklist-lister2 button[action=exportAction]' : { click : me.exportAction2 },

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-goodsstocklist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-goodsstocklist-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-goodsstocklist-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-goodsstocklist-lister2')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if ( tindex == 0 ) {
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if ( tindex == 1) {
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	exportAction : function(button){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(button){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});

