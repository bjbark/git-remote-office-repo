Ext.define('module.custom.sjflv.mtrl.isttcalc.purccstmlist1.PurcCstmList1', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],
	models	: [
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.model.PurcCstmList1',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.model.PurcCstmList2',
	],
	stores	: [
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.store.PurcCstmList1',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.store.PurcCstmList2',
	],
	views	: [
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Layout',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Search',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Lister2',
		'module.custom.sjflv.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1WorkerSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purccstmlist1-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-purccstmlist1-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			
			'module-purccstmlist1-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			
			'module-purccstmlist1-worker-search button[action=selectAction2]' 	: { click : me.selectAction2 },	// 조회
			'module-purccstmlist1-lister2 button[action=exportAction]' 			: { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-lister2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-purccstmlist1-worker-search')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			workersearch = me.pocket.workersearch()
		;

		if (Ext.isEmpty(param.invc_date1) || Ext.isEmpty(param.invc_date2)) {
			Ext.Msg.alert("알림","조회기간을 입력해주십시오.");
			return;
		}
		if (param.invc_date1>param.invc_date2) {
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
		
		workersearch.down('[name=cstm_name]').setValue(null);
		workersearch.down('[name=buss_numb]').setValue(null);
		workersearch.down('[name=boss_name]').setValue(null);
		workersearch.down('[name=tele_numb]').setValue(null);
		workersearch.down('[name=mail_addr]').setValue(null);
		workersearch.down('[name=cstm_addr]').setValue(null);
	},
	
	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues()
		;
		workersearch.down('[name=cstm_name]').setValue(record.get('cstm_name'));
		workersearch.down('[name=buss_numb]').setValue(record.get('buss_numb'));
		workersearch.down('[name=boss_name]').setValue(record.get('boss_name'));
		workersearch.down('[name=tele_numb]').setValue(record.get('tele_numb'));
		workersearch.down('[name=mail_addr]').setValue(record.get('mail_addr'));
		workersearch.down('[name=cstm_addr]').setValue(record.get('cstm_addr'));

		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { cstm_idcd : record.get('cstm_idcd') , invc_date1 : param.invc_date1 , invc_date2 : param.invc_date2 });
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			lister2 = me.pocket.lister2()
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([], false);
	},
	
	// 거래명세서 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues()
		;

		select	= lister.getSelectionModel().getSelection();
		if (select.length != 1) {
			Ext.Msg.alert(Const.NOTICE, "매입처 원장에서 거래처를 선택 후 조회하세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister2.select({
			 callback : function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope : me
		}, { cstm_idcd : select[0].get('cstm_idcd') , invc_date1 : param.invc_date1 , invc_date2 : param.invc_date2 });
	},

	//엑셀
	exportAction : function(button){
		this.pocket.lister().writer({enableLoadMask:true});
	},
	
	// 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});

