Ext.define('module.stock.close.mtrlstocklist.MtrlStockList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup',
	],
	models	: [
		'module.stock.close.mtrlstocklist.model.MtrlStockList',
		'module.stock.close.mtrlstocklist.model.MtrlStockListWrhs'
	],
	stores	: [
		'module.stock.close.mtrlstocklist.store.MtrlStockList',
		'module.stock.close.mtrlstocklist.store.MtrlStockListWrhs',
		'module.stock.close.mtrlstocklist.store.MtrlStockListWrhsStock'
	],
	views	: [
		'module.stock.close.mtrlstocklist.view.MtrlStockListLayout',
		'module.stock.close.mtrlstocklist.view.MtrlStockListLister',
		'module.stock.close.mtrlstocklist.view.MtrlStockListSearch',
		'module.stock.close.mtrlstocklist.view.MtrlStockListWrhs',
		'module.stock.close.mtrlstocklist.view.MtrlStockListWrhsStock'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-mtrlstocklist-layout button[action=selectAction]' : { click : me.selectAction },		// 조회
			// lister event
			'module-mtrlstocklist-lister button[action=exportAction]' : { click : me.exportAction },		// 엑셀

			'module-mtrlstocklist-wrhs' : {
				itemdblclick    : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-layout') [0]	},
		search		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-search') [0] 	},
		lister		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister')[0] 	},
		lister2		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-wrhs')[0] 	},
		wrhsStock	: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-wrhs-stock')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister1	= me.pocket.lister(),
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var lister;

		if(param.invc1_date == ''|| param.invc2_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}else if(param.invc1_date>param.invc2_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}else if(param.wrhs_name == '') {
			Ext.Msg.alert("알림","창고를 선택해주십시오.");
		} else {
			if(tindex==0){
				lister = lister1;
			}else if(tindex==1){
				lister = lister2;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id,mes_system_type:_global.options.mes_system_type}) );
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2(),
			wrhsStock = me.pocket.wrhsStock(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;

		console.log(record.data);

		if (record.data.zone_idcd) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			wrhsStock.select({
				 callback : function(records, operation, success) {
					if (success) {
						wrhsStock.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, Ext.merge( param, {stor_id : _global.stor_id,mes_system_type:_global.options.mes_system_type, zone_idcd : record.data.zone_idcd, wrhs_idcd : record.data.wrhs_idcd}) );
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});