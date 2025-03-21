Ext.define('module.custom.kitec.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryCvicPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryCastPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryBasePopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.kitec.prod.workentry.model.WorkEntry',
		'module.custom.kitec.prod.workentry.model.WorkEntryDetail',
		'module.custom.kitec.prod.workentry.model.WorkEntryDetail2',
		'module.custom.kitec.prod.workentry.model.WorkEntryDetail3',
		'module.custom.kitec.prod.workentry.model.WorkEntryUserPopup',
		'module.custom.kitec.prod.workentry.model.WorkEntryWkctPopup',
		'module.custom.kitec.prod.workentry.model.WorkEntryProrPopup',
		'module.custom.kitec.prod.workentry.model.WorkEntryCastPopup',
		'module.custom.kitec.prod.workentry.model.WorkEntryMtrlPopup',
		'module.custom.kitec.prod.workentry.model.WorkEntryTapPopup'
	],
	stores : [
		'module.custom.kitec.prod.workentry.store.WorkEntry',
		'module.custom.kitec.prod.workentry.store.WorkEntryDetail',
		'module.custom.kitec.prod.workentry.store.WorkEntryDetail2',
		'module.custom.kitec.prod.workentry.store.WorkEntryDetail3',
		'module.custom.kitec.prod.workentry.store.WorkEntryUserPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryProrPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryWkctPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryPoorLister',
		'module.custom.kitec.prod.workentry.store.WorkEntryCastPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryMtrlPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryTapPopup',
		'module.custom.kitec.prod.workentry.store.WorkEntryFailLister'
	],
	views : [
		'module.custom.kitec.prod.workentry.view.WorkEntryLayout',
		'module.custom.kitec.prod.workentry.view.WorkEntrySearch',
		'module.custom.kitec.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.kitec.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.kitec.prod.workentry.view.WorkEntryFailLister',
		'module.custom.kitec.prod.workentry.view.WorkEntryListerDetail',
		'module.custom.kitec.prod.workentry.view.WorkEntryListerDetail2',
		'module.custom.kitec.prod.workentry.view.WorkEntryListerDetail3',
		'module.custom.kitec.prod.workentry.view.WorkEntryListerDetailSearch',
		'module.custom.kitec.prod.workentry.view.WorkEntryUserPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryWkctPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryProrPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryCastPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryMtrlPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryTapPopup',
		'module.custom.kitec.prod.workentry.view.WorkEntryEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-kitec-workenty-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-kitec-workenty-lister'				: { selectionchange	: me.selectLister	},
			'module-kitec-workenty-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-kitec-workenty-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-kitec-workenty-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-kitec-workenty-lister-master'								: { itemdblclick : me.selectDetail },
			'module-kitec-workenty-detail'										: { itemdblclick : me.doubleAction },
			'module-kitec-workenty-detail button[action=castcond]'				: { click : me.castCond },
			'module-kitec-workenty-detail button[action=castcond2]'				: { click : me.castCond2 },
			'module-kitec-workenty-detail button[action=workmtrl]'				: { click : me.workmtrl },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-kitec-workenty-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-kitec-workenty-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-kitec-workenty-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-kitec-workenty-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-kitec-workenty-detail2')[0] },
		detail3  : function () { return Ext.ComponentQuery.query('module-kitec-workenty-detail3')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-kitec-workenty-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-kitec-workenty-detailSearch')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-kitec-workenty-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-kitec-workenty-fail')[0] },
		cast     : function () { return Ext.ComponentQuery.query('module-kitec-workenty-cast-popup')[0] },
		tap      : function () { return Ext.ComponentQuery.query('module-kitec-workenty-tap-popup')[0] }
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
				search.down("[name=printBtn]").setVisible(false);
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/kitec/prod/workentry/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/kitec/prod/workentry/set/faildelete.do',
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

		if(select.get('cvic_idcd')){
			var a = resource.loadPopup({
				widget : 'module-kitec-workenty-cast-popup',
			});
			a.tools.close.hide ();
		}else{
			Ext.Msg.alert("알림","설비를 선택해주세요.");
		}
	},
	castCond2:function(){
		var	me = this,
			detail     = me.pocket.detail(),
			select     = detail.getSelectionModel().getSelection()[0]
		;
		if(select){
			var a = resource.loadPopup({
				widget : 'module-kitec-workenty-tap-popup',
			});
			a.tools.close.hide ();
		}else{
			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
		}
	},
	workmtrl:function(){
		var me = this,
			detail     = me.pocket.detail(),
			select     = detail.getSelectionModel().getSelection()[0]
		;
		if(select){
			var a = resource.loadPopup({
				widget : 'module-kitec-workenty-mtrl-popup',
			});
			a.tools.close.hide ();
		}else{
			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
		}
	},
	//엑셀
	exportAction : function(record){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
