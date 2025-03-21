Ext.define('module.stock.close.goodsstocklist.GoodsStockList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.stock.close.goodsstocklist.model.GoodsStockList'
	],
	stores	: [
		'module.stock.close.goodsstocklist.store.GoodsStockList'
	],
	views	: [
		'module.stock.close.goodsstocklist.view.GoodsStockListLayout',
		'module.stock.close.goodsstocklist.view.GoodsStockListLister',
		'module.stock.close.goodsstocklist.view.GoodsStockListSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsstocklist-layout button[action=selectAction]' : { click : me.selectAction },		// 조회
			// lister event
			'module-goodsstocklist-lister button[action=exportAction]' : { click : me.exportAction },		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-goodsstocklist-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-goodsstocklist-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-goodsstocklist-lister')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date == ''|| param.invc2_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}else if(param.invc1_date>param.invc2_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}else if(param.wrhs_name == '') {
			Ext.Msg.alert("알림","창고를 선택해주십시오.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id,hq_id : _global.hqof_idcd,mes_system_type:_global.options.mes_system_type}) );
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});