Ext.define('module.custom.iypkg.stock.close.mtrlstocklist.MtrlStockList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.FabcPopup'
	],
	models	: [
		'module.custom.iypkg.stock.close.mtrlstocklist.model.MtrlStockListLister1',
		'module.custom.iypkg.stock.close.mtrlstocklist.model.MtrlStockListLister2',
	],
	stores	: [
		'module.custom.iypkg.stock.close.mtrlstocklist.store.MtrlStockListLister1',
		'module.custom.iypkg.stock.close.mtrlstocklist.store.MtrlStockListLister2',
	],
	views	: [
		'module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLayout',
		'module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListSearch',
		'module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLister1',
		'module.custom.iypkg.stock.close.mtrlstocklist.view.MtrlStockListLister2',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-mtrlstocklist-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-search') [0] },
		lister1			: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister1')[0] },
		lister2			: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister2')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister1  = me.pocket.lister1(),
			lister2  = me.pocket.lister2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if ( tindex == 0 ) {
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 1){
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},


	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},

});