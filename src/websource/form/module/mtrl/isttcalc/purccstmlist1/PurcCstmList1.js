Ext.define('module.mtrl.isttcalc.purccstmlist1.PurcCstmList1', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.mtrl.isttcalc.purccstmlist1.model.PurcCstmList1',
	],
	stores	: [
		'module.mtrl.isttcalc.purccstmlist1.store.PurcCstmList1',
	],
	views	: [
		'module.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Layout',
		'module.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister',
		'module.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purccstmlist1-layout button[action=selectAction]' : { click : me.selectAction },

			'module-purccstmlist1-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-purccstmlist1-lister button[action=insertAction]' : { click : me.insertAction },
			'module-purccstmlist1-lister button[action=exportAction]' : { click : me.exportAction },
			'module-purccstmlist1-lister button[action=deleteAction]' : { click : me.deleteAction },

			'module-purccstmlist1-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;

		if(param.invc_date1 == ''|| param.invc_date2 == '') {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
			return;
		}else if(param.invc_date1>param.invc_date2) {
			Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
//				lister.getSelectionModel().select(0);
			} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

