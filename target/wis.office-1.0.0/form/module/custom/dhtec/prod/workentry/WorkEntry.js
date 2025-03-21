Ext.define('module.custom.dhtec.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryCvicPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryCastPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryBasePopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.dhtec.prod.workentry.model.WorkEntry',
		'module.custom.dhtec.prod.workentry.model.WorkEntryDetail',
		'module.custom.dhtec.prod.workentry.model.WorkEntryDetail2',
		'module.custom.dhtec.prod.workentry.model.WorkEntryDetail3',
		'module.custom.dhtec.prod.workentry.model.WorkEntryUserPopup',
		'module.custom.dhtec.prod.workentry.model.WorkEntryWkctPopup',
		'module.custom.dhtec.prod.workentry.model.WorkEntryProrPopup',
		'module.custom.dhtec.prod.workentry.model.WorkEntryCastPopup',
		'module.custom.dhtec.prod.workentry.model.WorkEntryMtrlPopup',
		'module.custom.dhtec.prod.workentry.model.WorkEntryTapPopup'
	],
	stores : [
		'module.custom.dhtec.prod.workentry.store.WorkEntry',
		'module.custom.dhtec.prod.workentry.store.WorkEntryDetail',
		'module.custom.dhtec.prod.workentry.store.WorkEntryDetail2',
		'module.custom.dhtec.prod.workentry.store.WorkEntryDetail3',
		'module.custom.dhtec.prod.workentry.store.WorkEntryUserPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryProrPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryWkctPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryPoorLister',
		'module.custom.dhtec.prod.workentry.store.WorkEntryCastPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryMtrlPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryTapPopup',
		'module.custom.dhtec.prod.workentry.store.WorkEntryFailLister'
	],
	views : [
		'module.custom.dhtec.prod.workentry.view.WorkEntryLayout',
		'module.custom.dhtec.prod.workentry.view.WorkEntrySearch',
		'module.custom.dhtec.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.dhtec.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.dhtec.prod.workentry.view.WorkEntryFailLister',
		'module.custom.dhtec.prod.workentry.view.WorkEntryListerDetail',
		'module.custom.dhtec.prod.workentry.view.WorkEntryListerDetail2',
		'module.custom.dhtec.prod.workentry.view.WorkEntryListerDetail3',
		'module.custom.dhtec.prod.workentry.view.WorkEntryListerDetailSearch',
		'module.custom.dhtec.prod.workentry.view.WorkEntryUserPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryWkctPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryProrPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryCastPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryMtrlPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryTapPopup',
		'module.custom.dhtec.prod.workentry.view.WorkEntryEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-dhtec-workenty-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-dhtec-workenty-lister'				: { selectionchange	: me.selectLister	},
			'module-dhtec-workenty-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-dhtec-workenty-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-dhtec-workenty-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-dhtec-workenty-lister-master'								: { itemdblclick : me.selectDetail },
			'module-dhtec-workenty-detail'										: { itemdblclick : me.doubleAction },
			'module-dhtec-workenty-detail button[action=castcond]'				: { click : me.castCond },
			'module-dhtec-workenty-detail button[action=castcond2]'				: { click : me.castCond2 },
			'module-dhtec-workenty-detail button[action=workmtrl]'				: { click : me.workmtrl },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0] },
		detail3  : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-detail3')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-detailSearch')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-fail')[0] },
		cast     : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-cast-popup')[0] },
		tap      : function () { return Ext.ComponentQuery.query('module-dhtec-workenty-tap-popup')[0] }
	},

	//탭바꿈
	changeAction:function(){
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			value   = search.getValues(),
			lister  = me.pocket.lister(),
			detail  = me.pocket.detail(),
			detail2 = me.pocket.detail2()
		;
		if(tindex == 2){
			search.hide();
		}else{
			search.show();
		}
		if(value.wkct_name){
			if(tindex == 0){
//				search.down("[name=printBtn]").setVisible(false);
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({  wkct_idcd : value.wkct_name,
								cvic_idcd : value.cvic_name,
								stor_id  : _global.stor_id,
								work_date: value.work_date
								}));
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({	wkct_idcd : value.wkct_name,
								cvic_idcd : value.cvic_name,
								stor_id  : _global.stor_id,
							}));
			}else if(tindex == 1){
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({	wkct_idcd : value.wkct_name,
								cvic_idcd : value.cvic_name,
								stor_id  : _global.stor_id,
				}) );
				if(value.wkct_name == 'WT003'){
					search.down("[name=printBtn]").setVisible(true);
				}
			}
		}
	},

	//선택
	selectLister:function( grid, record ){
		if(record[0] == null){
			return;
		}else{
			var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			record = lister.getSelectionModel().getSelection()[0]
			;
		}
	},



	selectAction:function(){
		var me = this,
			detailSearch = me.pocket.detailSearch(),
			params = detailSearch.getValues(),
			detail3 = me.pocket.detail3()
		;
		detail3.select({
			callback:function(records, operation, success) {
				if (success) {

				} else { }
			}, scope:me
		}, Ext.merge({	work_date      : params.work_date,
						work_date2     : params.work_date2,
						prog_stat_dvcd : params.prog_stat_dvcd,
						wkct_idcd      : params.wkct_idcd,
						invc_numb      : params.invc_numb,
						lott_numb      : params.lott_numb
		}));
	},

	doubleAction:function(){
		var me = this,
			detail     = me.pocket.detail(),
			select     = detail.getSelectionModel().getSelection()[0]
		;
		if(!select){
			return;
		}else{
			detail.iteminfo(select);
		}
	},

	//불량 삭제
	deletepoorAction : function() {
		var me = this,
			poor    = me.pocket.poor(),
			select  = poor.getSelectionModel().getSelection()[0],
			records = poor.getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","삭제할 불량내역을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/dhtec/prod/workentry/set/poordelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb	: record.raw.invc_numb,
										line_seqn	: record.raw.line_seqn
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									me.pocket.poor().getStore().reload();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						});
					}
				});
			});
		}
	},

	//유실 삭제
	deletefailAction : function() {
		var me = this,
			fail    = me.pocket.fail(),
			select  = fail.getSelectionModel().getSelection()[0],
			records = fail.getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","삭제할 유실내역을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/dhtec/prod/workentry/set/faildelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb	: record.raw.invc_numb,
										line_seqn	: record.raw.line_seqn
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									me.pocket.fail().getStore().reload();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						});
					}
				});
			});
		}
	},
	castCond:function(){
		var me = this,
			search = me.pocket.search(),
			value   = search.getValues(),
			detail     = me.pocket.detail(),
			select     = detail.getSelectionModel().getSelection()[0]
		;

		if(select){
			var a = resource.loadPopup({
				widget : 'module-dhtec-workenty-cast-popup',
			});
			a.tools.close.hide ();
		}else{
			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
		}
	},
//	castCond2:function(){
//		var	me = this,
//			detail     = me.pocket.detail(),
//			select     = detail.getSelectionModel().getSelection()[0]
//		;
//		if(select){
//			var a = resource.loadPopup({
//				widget : 'module-dhtec-workenty-tap-popup',
//			});
//			a.tools.close.hide ();
//		}else{
//			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
//		}
//	},
//	workmtrl:function(){
//		var me = this,
//			detail     = me.pocket.detail(),
//			select     = detail.getSelectionModel().getSelection()[0]
//		;
//		if(select){
//			var a = resource.loadPopup({
//				widget : 'module-dhtec-workenty-mtrl-popup',
//			});
//			a.tools.close.hide ();
//		}else{
//			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
//		}
//	},
	//엑셀
	exportAction : function(record){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
