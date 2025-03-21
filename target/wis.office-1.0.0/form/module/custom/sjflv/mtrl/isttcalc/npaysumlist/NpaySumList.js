Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.NpaySumList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
	],
	models	: [
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.model.NpaySumList',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.model.NpaySumListLister2',
	],
	stores	: [
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.store.NpaySumList',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.store.NpaySumListLister2',
	],
	views	: [
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLayout',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLister',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLister2',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListSearch',
		'module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListWorkerSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-npaysumlist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-npaysumlist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			
			'module-npaysumlist-lister'	: { 
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-npaysumlist-worker-search button[action=selectAction2]': { click : me.selectAction2 },	// 조회
			'module-npaysumlist-lister2 button[action=exportAction]': { click : me.exportAction2 },	// 엑셀


			
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-npaysumlist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-npaysumlist-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-npaysumlist-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-npaysumlist-lister2')[0]},
		workersearch : function () { return Ext.ComponentQuery.query('module-npaysumlist-worker-search')[0] },
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
		}else if(param.invc_date1 > param.invc_date2) {
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
	
	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues()
		;
		workersearch.down('[name=cstm_name]').setValue(record.get('cstm_name'));

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

	selectRecord:function( grid, records ) {
		var me = this,
			lister2 = me.pocket.lister2()
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);
	},
	
	// 미수현황조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			workersearch = me.pocket.workersearch(),
			param = workersearch.getValues()
		;

		select	= lister.getSelectionModel().getSelection();	
		if (select.length != 1) {
			Ext.Msg.alert(Const.NOTICE, "미지급 집계표에서 거래처 선택 후 조회하세요.");
			return;
		}

		workersearch.down('[name=cstm_name]').setValue(select[0].get('cstm_name'));

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister2.select({
			 callback : function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope : me
		}, { cstm_idcd : select[0].get('cstm_idcd') , invc_date1 : param.invc_date1 , invc_date2 : param.invc_date2 , item_idcd : param.item_idcd });
	},

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	},
	
	// 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});

