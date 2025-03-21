Ext.define('module.stock.lot.lotlstocklist.LotlStockList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.stock.lot.lotlstocklist.model.LotlStockListDetail',
		'module.stock.lot.lotlstocklist.model.LotlStockListMast'
	],
	stores:[
		'module.stock.lot.lotlstocklist.store.LotlStockListDetail',
		'module.stock.lot.lotlstocklist.store.LotlStockListMast'
	],
	views: [
		'module.stock.lot.lotlstocklist.view.LotlStockListLayout',
		'module.stock.lot.lotlstocklist.view.LotlStockListSearch',
		'module.stock.lot.lotlstocklist.view.LotlStockListListerDetail',
		'module.stock.lot.lotlstocklist.view.LotlStockListListerMaster'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-lotlstocklist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-lotlstocklist-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-lotlstocklist-lister-master button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-lotlstocklist-lister-master' : {
				selectionchange: me.selectDetail	// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout 		 : function () { return Ext.ComponentQuery.query('module-lotlstocklist-layout')[0] },
		search 		 : function () { return Ext.ComponentQuery.query('module-lotlstocklist-search')[0] },
		listermaster : function () { return Ext.ComponentQuery.query('module-lotlstocklist-lister-master')[0] },
		listerdetail : function () { return Ext.ComponentQuery.query('module-lotlstocklist-lister-detail')[0] }
	},


	//조회
		selectAction:function() {
			var me = this,
				listermaster = me.pocket.listermaster(),
				listerdetail = me.pocket.listerdetail(),
				search = me.pocket.search(),
				param = search.getValues(),
				tpanel = me.pocket.layout().down('#mainpanel')
			;
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listerdetail.getStore().clearData();
			listerdetail.getStore().loadData([],false);
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id,mes_system_type	: _global.options.mes_system_type}) );
		},

	//선택
	selectDetail : function(grid, record) {

		var me = this,
			detail	= me.pocket.listerdetail(),
			param	= me.pocket.search().getValues()
		;
		if (record.length>0) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge( param, record[0].data,{mes_system_type	: _global.options.mes_system_type}) );
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.listermaster().writer({enableLoadMask:true});
	}
});
