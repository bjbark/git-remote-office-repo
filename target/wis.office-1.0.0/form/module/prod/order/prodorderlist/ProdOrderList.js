Ext.define('module.prod.order.prodorderlist.ProdOrderList', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.prod.order.prodorderlist.model.ProdOrderList'
	],
	stores	: [
		'module.prod.order.prodorderlist.store.ProdOrderList'
	],
	views	: [
		'module.prod.order.prodorderlist.view.ProdOrderListLayout',
		'module.prod.order.prodorderlist.view.ProdOrderListLister',
		'module.prod.order.prodorderlist.view.ProdOrderListSearch',
		'module.prod.order.prodorderlist.view.ProdOrderListLabelPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodorderlist-layout button[action=selectAction]' : { click : me.selectAction	},		// 조회
			// lister event
			'module-prodorderlist-lister button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-prodorderlist-lister button[action=writeAction]' : { click : me.writeAction		},		// 생산지시서
			'module-prodorderlist-lister button[action=labelAction]' : { click : me.labelAction        }, /* 코멕라벨 */
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodorderlist-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodorderlist-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-prodorderlist-lister')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister()
			search  = me.pocket.search(),
			param   = search.getValues()
		;
		if(param.pdod_date1>param.pdod_date2) {
			Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
		}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
			Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
		}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
			Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

//	labelAction : function() {
//		var me = this,
//		lister = me.pocket.lister(),
//		select = me.pocket.lister().getSelectionModel().getSelection(),
//		record = lister.getSelectionModel().getSelection(),
//		jrf = 'komec_etc_label.jrf',
//		resId = _global.hq_id.toUpperCase()
//		;
//		var err_msg = "";
//		var records = lister.getSelectionModel().getSelection();
//		if(!records || records.length<1) {
//			Ext.Msg.alert("알림", "입고리스트 목록중 1건이상을 선택하여주십시오.");
//			return;
//		}
//		var a = "";
//		for(var i =0; i< record.length ; i++){
//			if(i==0){
//				a += "[";
//			}
//				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
//			if(i != record.length -1){
//				a+=",";
//			}else{
//				a+="]";
//			}
//		}
//		var _param = '_param~{\'records\':'+a+'}~';
//		var arg = _param;
//		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
//		return win;
//	},

	labelAction:function() {
		var me = this,
			master = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if(!records || records.length<1){
			Ext.Msg.alert("알림","라벨발행할 수주목록을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-prodorderlist-label-popup'
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//		var numb = Ext.ComponentQuery.query('#cstm_idcd')[0].setValue(records[0].data.cstm_idcd);
	},

	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});