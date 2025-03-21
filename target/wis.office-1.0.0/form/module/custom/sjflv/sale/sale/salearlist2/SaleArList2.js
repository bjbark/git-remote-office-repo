Ext.define('module.custom.sjflv.sale.sale.salearlist2.SaleArList2', { extend:'Axt.app.Controller',

	requires:[
			'lookup.popup.view.BzplPopup',
			'lookup.popup.view.ItemPopup',
			'lookup.popup.view.UserPopup',
			'lookup.popup.view.CstmPopup',
		],

	models	: [
		'module.custom.sjflv.sale.sale.salearlist2.model.SaleArList2',
		'module.custom.sjflv.sale.sale.salearlist2.model.SaleArListLister2'
	],
	stores	: [
		'module.custom.sjflv.sale.sale.salearlist2.store.SaleArList2',
		'module.custom.sjflv.sale.sale.salearlist2.store.SaleArListLister2'
	],
	views	: [
		'module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Layout',
		'module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Search',
		'module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Lister',
		'module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2Lister2',
		'module.custom.sjflv.sale.sale.salearlist2.view.SaleArList2WorkerSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-salearlist2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-salearlist2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

			'module-salearlist2-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-salearlist2-worker-search button[action=selectAction2]' 	: { click : me.selectAction2 },	// 조회
			'module-salearlist2-lister2 button[action=exportAction]' 		: { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-salearlist2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-salearlist2-search')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-salearlist2-worker-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-salearlist2-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-salearlist2-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-salearlist2-lister2')[0] }
	},

	// 조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues()
		;

		if (Ext.isEmpty(param.invc_date1) || Ext.isEmpty(param.invc_date2) ) {
			Ext.Msg.alert(Const.NOTICE, "기준일자를 입력 후 조회하세요.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					//lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
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

	selectRecord:function( grid, records ){
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
			Ext.Msg.alert(Const.NOTICE, "미수현황에서 거래처를 선택 후 조회하세요.");
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

	// 엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});
	}
});