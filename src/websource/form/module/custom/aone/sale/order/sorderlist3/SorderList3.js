Ext.define('module.custom.aone.sale.order.sorderlist3.SorderList3', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.custom.aone.sale.order.sorderlist3.model.SorderList3Master',
	],
	stores	: [
		'module.custom.aone.sale.order.sorderlist3.store.SorderList3Master',
	],
	views	: [
		'module.custom.aone.sale.order.sorderlist3.view.SorderList3Layout',
		'module.custom.aone.sale.order.sorderlist3.view.SorderList3ListerMaster',
		'module.custom.aone.sale.order.sorderlist3.view.SorderList3Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sorderlist3-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-sorderlist3-layout #mainpanel'							: { tabchange : me.selectAction },
			'module-sorderlist3-layout #subpanel'								: { tabchange : me.selectAction },
			// master0 event
			'module-sorderlist3-lister-master button[action=exportAction]'	: { click : me.exportAction0 },	// 엑셀
			// lister1 event
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-sorderlist3-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-sorderlist3-search') [0] },
		master		: function () { return Ext.ComponentQuery.query('module-sorderlist3-lister-master')[0] },
	},

	//조회

//	selectAction_old:function() {
//		var me = this,
//			master1 = me.pocket.master1(),
//			master2 = me.pocket.master2(),
//			master3 = me.pocket.master3(),
//			search = me.pocket.search(),
//			param = search.getValues()
//		;
//		if(param.invc1_date==''||param.invc2_date==''){
//			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
//		}else if(param.invc1_date > param.invc2_date){
//			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
//		}else{
//			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//				mask.show();
//				master1.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							master1.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id}) );
//
//				master2.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							master2.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id}) );
//
//				master3.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							master3.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id}) );
//		}
//	},

	//조회
//	selectAction:function() {
//		var me = this,
//			master1 = me.pocket.master1(),
//			master2 = me.pocket.master2(),
//			master3 = me.pocket.master3(),
//			search = me.pocket.search(),
//			param = search.getValues(),
//			mainPanel = me.pocket.layout().down('#mainpanel'),
//			subPanel = me.pocket.layout().down('#subpanel'),
//			lister = undefined,
//			mainIndex = mainPanel.items.indexOf(mainPanel.getActiveTab()),
//			subIndex,
//			detail = me.pocket.detail()
//		;
//		if(param.invc1_date==''||param.invc2_date==''){
//			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
//		}else if(param.invc1_date > param.invc2_date){
//			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
//		}else{
//			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
//			mask.show();
//			if ( mainIndex == 0 ) {
//				lister = me.pocket.master0();
//				lister.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							lister.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id}) );
//			} else if ( mainIndex == 1 ) {
//				detail.getStore().clearData();
//				detail.getStore().loadData([],false);
//				subIndex  = subPanel.items.indexOf(subPanel.getActiveTab())
//				if ( subIndex == 0 ) {
//					lister = me.pocket.master1();
//				} else if ( subIndex == 1 ) {
//					lister = me.pocket.master2();
//				} else if ( subIndex == 2 ) {
//					lister = me.pocket.master3();
//				}
//				lister.select({
//					callback:function(records, operation, success) {
//						if (success) {
//							lister.getSelectionModel().select(0);
//						} else { }
//						mask.hide();
//					}, scope:me
//				}, Ext.merge( param, {stor_id : _global.stor_id}) );
//			}
//
//		}
//	},


	attachRecord:function( smodel, record ){
		var me	= this,
		master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		master2= smodel ? smodel.view.ownerCt : me.pocket.master2(),
		master3= smodel ? smodel.view.ownerCt : me.pocket.master3(),
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master2.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master3.getSelectionModel().getSelection()[0]
		;
		me.pocket.detail().eraser() ;
		if (record) {
		}
	},

	//선택
//	selectDetail1 : function(grid, record) {
//		var me = this,
//			detail = me.pocket.detail()
//		;
//		if (record) {
//			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
//			mask.show();
//			detail.select({
//				callback : function(records, operation, success) {
//					if (success) {
//					} else {}
//					mask.hide();
//				}, scope : me
//			}, { invc_date : (record.get('invc_date')).replace(/-/g,"")});
//		}
//	},
	selectDetail1 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc_date1, invc_date2, cstm_idcd, item_idcd, drtr_idcd, cstm_lott_numb, acpt_stat_dvcd, find_name
		;

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc_date1 = param.invc1_date;
			invc_date2 = param.invc2_date;
			cstm_idcd  = param.cstm_idcd;
			item_idcd  = param.item_idcd;
			drtr_idcd  = param.drtr_idcd;
			cstm_lott_numb = param.cstm_lott_numb;
			acpt_stat_dvcd = param.acpt_stat_dvcd;
			find_name  = param.find_name;
			if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_date : (record.get('invc_date')).replace(/-/g,""), cstm_idcd : cstm_idcd, item_idcd : item_idcd, drtr_idcd : drtr_idcd, cstm_lott_numb : cstm_lott_numb, acpt_stat_dvcd : acpt_stat_dvcd, find_name : find_name });
			}
		}
	},

	selectDetail2 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc_date1, invc_date2, item_idcd, drtr_idcd, cstm_lott_numb, acpt_stat_dvcd, find_name
		;
		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc_date1 = param.invc1_date;
			invc_date2 = param.invc2_date;
			item_idcd  = param.item_idcd;
			drtr_idcd  = param.drtr_idcd;
			find_name  = param.find_name
			if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { cstm_idcd : record.get('cstm_idcd'), invc_date1 : invc_date1, invc_date : invc_date2, item_idcd : item_idcd, drtr_idcd : drtr_idcd, find_name : find_name });
			}
		}
	},

	selectDetail3 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc_date1, invc_date2, cstm_idcd, drtr_idcd, cstm_lott_numb, acpt_stat_dvcd, find_name
		;

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc_date1 = param.invc1_date;
			invc_date2 = param.invc2_date;
			cstm_idcd  = param.cstm_idcd;
			drtr_idcd  = param.drtr_idcd;
			find_name  = param.find_name;
			if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { item_idcd : record.get('item_idcd'), invc_date1 : invc_date1, invc_date2 : invc_date2, cstm_idcd : cstm_idcd , drtr_idcd : drtr_idcd, find_name : find_name });
			}
		}
	},


	// 엑셀
	exportAction0 : function() {
		this.pocket.master0().writer({enableLoadMask:true});
	},
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	}
});