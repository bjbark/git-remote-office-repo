Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.MtrlStockList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemClassPopup'
	],
	models	: [
		'module.custom.sjflv.stock.close.mtrlstocklist.model.MtrlStockList'
	],
	stores	: [
		'module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockList',
		'module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail',
		'module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail2'
	],
	views	: [
		'module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListLayout',
		'module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListLister',
		'module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListDetail',
		'module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListDetail2',
		'module.custom.sjflv.stock.close.mtrlstocklist.view.MtrlStockListSearch'
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
			// detail event
			'module-mtrlstocklist-lister-detail button[action=exportAction]' : { click : me.exportAction2 },		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister-detail')[0] },
		detail2		: function () { return Ext.ComponentQuery.query('module-mtrlstocklist-lister-detail2')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			detail	= me.pocket.detail(),
			detail2	= me.pocket.detail2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.invc1_date == ''|| param.invc2_date == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
		}else if(param.invc1_date>param.invc2_date) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
		}else if(param.wrhs_name == '') {
			Ext.Msg.alert("알림","창고를 선택해주십시오.");
		} else {
			if(tindex==0){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hqof_idcd, mes_system_type:_global.options.mes_system_type}) );
			}else if(tindex ==1){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hqof_idcd, mes_system_type:_global.options.mes_system_type}) );
			}else if(tindex ==2){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
							detail2.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hqof_idcd, mes_system_type:_global.options.mes_system_type}) );
				console.log(param);
			}
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	}
});