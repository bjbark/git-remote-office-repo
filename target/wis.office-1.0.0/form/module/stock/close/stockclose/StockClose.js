Ext.define('module.stock.close.stockclose.StockClose', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup',
	],
	models	: [
		'module.stock.close.stockclose.model.StockClose'
	],
	stores	: [
		'module.stock.close.stockclose.store.StockClose'
	],
	views	: [
		'module.stock.close.stockclose.view.StockCloseLayout',
		'module.stock.close.stockclose.view.StockCloseLister',
		'module.stock.close.stockclose.view.StockCloseSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-stockclose-layout button[action=selectAction]' : { click : me.selectAction	},		// 조회
			// lister event
			'module-stockclose-lister button[action=closeAction]'  : { click : me.closeAction	},		// 수불마감
			'module-stockclose-lister button[action=exportAction]' : { click : me.exportAction	},		// 엑셀
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-stockclose-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-stockclose-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-stockclose-lister')[0] }
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
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//수불마감
	closeAction : function() {
		var me = this,
			lister	= me.pocket.lister(),
			select	= me.pocket.lister().getSelectionModel().getSelection()[0],
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(!select || select.length == 0) {
			Ext.Msg.alert("알림","수불마감 할 데이터를 선택하여 주시기 바랍니다.")
		} else {
			Ext.Msg.confirm("확인", "수불마감을 하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/stock/close/stockclose/set/close.do',
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								stor_id		: _global.stor_id,
								clos_yymm	: param.invc_date
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							mask.hide();
							Ext.Msg.alert("알림","마감 되었습니다.")
							me.pocket.lister().getStore().reload();
						}
					});
				}
			});
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});