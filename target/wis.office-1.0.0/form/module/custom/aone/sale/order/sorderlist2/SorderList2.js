Ext.define('module.custom.aone.sale.order.sorderlist2.SorderList2', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.custom.aone.sale.order.sorderlist2.model.SorderList2Master0',
		'module.custom.aone.sale.order.sorderlist2.model.SorderList2Master',
		'module.custom.aone.sale.order.sorderlist2.model.SorderList2Detail'
	],
	stores	: [
		'module.custom.aone.sale.order.sorderlist2.store.SorderList2Master0',
		'module.custom.aone.sale.order.sorderlist2.store.SorderList2Master1',
		'module.custom.aone.sale.order.sorderlist2.store.SorderList2Master2',
		'module.custom.aone.sale.order.sorderlist2.store.SorderList2Master3',
		'module.custom.aone.sale.order.sorderlist2.store.SorderList2Detail'
	],
	views	: [
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2Layout',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerMaster0',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerMaster1',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerMaster2',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerMaster3',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2ListerDetail',
		'module.custom.aone.sale.order.sorderlist2.view.SorderList2Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-sorderlist2-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-sorderlist2-layout #mainpanel'							: { tabchange : me.selectAction },
			'module-sorderlist2-layout #subpanel'							: { tabchange : me.selectAction },
			// master0 event
			'module-sorderlist2-lister-master0 button[action=exportAction]'	: { click : me.exportAction0 },	// 엑셀
			// lister1 event
			'module-sorderlist2-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-sorderlist2-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			// lister3 event
			'module-sorderlist2-lister-master3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀

			'module-sorderlist2-lister-master1' : {
				itemdblclick : me.selectDetail1 ,
				selectionchange : me.attachRecord
			},
			'module-sorderlist2-lister-master2' : {
				itemdblclick : me.selectDetail2 ,
				selectionchange : me.attachRecord
			},
			'module-sorderlist2-lister-master3' : {
				itemdblclick : me.selectDetail3 ,
				selectionchange : me.attachRecord
			},
			//detail event
			'module-sorderlist2-lister-detail button[action=exportAction]' : { click : me.exportAction4 },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-sorderlist2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-sorderlist2-search') [0] },
		master0		: function () { return Ext.ComponentQuery.query('module-sorderlist2-lister-master0')[0] },
		master1		: function () { return Ext.ComponentQuery.query('module-sorderlist2-lister-master1')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-sorderlist2-lister-master2')[0] },
		master3		: function () { return Ext.ComponentQuery.query('module-sorderlist2-lister-master3')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-sorderlist2-lister-detail')[0] }
	},

	selectAction:function() {
		var me = this,
		search = me.pocket.search(),
		param = search.getValues(),
		mainPanel = me.pocket.layout().down('#mainpanel'),
		subPanel  = me.pocket.layout().down('#subpanel'),
		mainIndex = mainPanel.items.indexOf(mainPanel.getActiveTab()),
		detail = me.pocket.detail(),
		lister = undefined
	;
//	if(param.invc1_date==''||param.invc2_date==''){
//		Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
//	}else if(param.invc1_date > param.invc2_date){
//		Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
//	}else{

		if ( mainIndex == 0 ) {
			lister = me.pocket.master0();
		} else if ( mainIndex == 1 ) {
			detail.getStore().clearData();
			detail.getStore().loadData([],false);
			var subIndex = subPanel.items.indexOf(subPanel.getActiveTab());

			if ( subIndex == 0 ) {
				lister = me.pocket.master1();
			} else if ( subIndex == 1 ) {
				lister = me.pocket.master2();
			} else if ( subIndex == 2) {
				lister = me.pocket.master3();
			}
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
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},


	attachRecord:function( smodel, record ){
		var me	= this,
		master0= smodel ? smodel.view.ownerCt : me.pocket.master0(),
		master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		master2= smodel ? smodel.view.ownerCt : me.pocket.master2(),
		master3= smodel ? smodel.view.ownerCt : me.pocket.master3(),
		record= record ? record[0] : master0.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master2.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master3.getSelectionModel().getSelection()[0]
		;
		me.pocket.detail().eraser() ;
		if (record) {
		}
	},

	//선택
	selectDetail1 : function(grid, record) {
		alert("A");
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
			cstm_idcd  = param.cstm_idcd;
			item_idcd  = param.item_idcd;
			drtr_idcd  = param.drtr_idcd;
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
				}, { invc_date : (record.get('invc_date')).replace(/-/g,""), cstm_idcd : cstm_idcd, item_idcd : item_idcd, drtr_idcd : drtr_idcd, acpt_stat_dvcd : acpt_stat_dvcd, find_name : find_name });
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
			acpt_stat_dvcd = param.acpt_stat_dvcd;
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
				}, { invc_date1 : invc_date1, invc_date2 : invc_date2, cstm_idcd : record.get('cstm_idcd'),  item_idcd : item_idcd, drtr_idcd : drtr_idcd, acpt_stat_dvcd : acpt_stat_dvcd, find_name : find_name });
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
				}, { invc_date1 : invc_date1, invc_date2 : invc_date2, cstm_idcd : cstm_idcd, item_idcd : record.get('item_idcd'), drtr_idcd : drtr_idcd, acpt_stat_dvcd : acpt_stat_dvcd, find_name : find_name });
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