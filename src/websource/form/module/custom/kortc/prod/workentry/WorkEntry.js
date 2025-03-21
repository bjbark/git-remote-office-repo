Ext.define('module.custom.kortc.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.kortc.prod.workentry.model.WorkEntry',
		'module.custom.kortc.prod.workentry.model.WorkEntryDetail',
		'module.custom.kortc.prod.workentry.model.WorkEntryDetail2',
		'module.custom.kortc.prod.workentry.model.WorkEntryUserPopup',
		'module.custom.kortc.prod.workentry.model.WorkEntryCvicPopup',
		'module.custom.kortc.prod.workentry.model.WorkEntryProrPopup'
	],
	stores : [
		'module.custom.kortc.prod.workentry.store.WorkEntry',
		'module.custom.kortc.prod.workentry.store.WorkEntryDetail',
		'module.custom.kortc.prod.workentry.store.WorkEntryDetail2',
		'module.custom.kortc.prod.workentry.store.WorkEntryUserPopup',
		'module.custom.kortc.prod.workentry.store.WorkEntryProrPopup',
		'module.custom.kortc.prod.workentry.store.WorkEntryCvicPopup',
		'module.custom.kortc.prod.workentry.store.WorkEntryPoorLister',
		'module.custom.kortc.prod.workentry.store.WorkEntryFailLister'
	],
	views : [
		'module.custom.kortc.prod.workentry.view.WorkEntryLayout',
		'module.custom.kortc.prod.workentry.view.WorkEntrySearch',
		'module.custom.kortc.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.kortc.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.kortc.prod.workentry.view.WorkEntryFailLister',
		'module.custom.kortc.prod.workentry.view.WorkEntryListerDetail',
		'module.custom.kortc.prod.workentry.view.WorkEntryListerDetail2',
		'module.custom.kortc.prod.workentry.view.WorkEntryListerDetailSearch',
		'module.custom.kortc.prod.workentry.view.WorkEntryUserPopup',
		'module.custom.kortc.prod.workentry.view.WorkEntryCvicPopup',
		'module.custom.kortc.prod.workentry.view.WorkEntryProrPopup',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-kortc-workentry-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-kortc-workentry-lister'				: { selectionchange	: me.selectLister	},
			'module-kortc-workentry-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-kortc-workentry-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-kortc-workentry-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-kortc-workentry-lister-master'								: { itemdblclick : me.selectDetail },
			'module-kortc-workentry-detail'										: { itemdblclick : me.doubleAction },
//			'module-kortc-workentry-detail button[action=shiftWork]'				: { click : me.shiftWork },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-kortc-workentry-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-kortc-workentry-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-kortc-workentry-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-kortc-workentry-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-kortc-workentry-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-kortc-workentry-fail')[0] }
	},

	//탭바꿈
	changeAction:function(){
		var me = this,
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			search  = me.pocket.search(),
			value   = search.getValues(),
			lister  = me.pocket.lister(),
			detail  = me.pocket.detail(),
			detail2 = me.pocket.detail2()
		;
		if(value.wkct_idcd){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			if(tindex == 0){
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_idcd,
								stor_id  : _global.stor_id,
								}));
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_idcd,
								stor_id  : _global.stor_id,
								work_date:value.work_date }));
			}else if(tindex == 1){
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_idcd,
								stor_id  : _global.stor_id,
				}) );
			}else{
				mask.hide();
			}
		}
		if(tindex == 2 || tindex == 3){
			search.hide();
		}else{
			search.show();
		}
	},

	//선택
	selectLister:function( grid, record ){
		var	me		= this,
			search	= me.pocket.search()
		;

		if(record[0] == null){
			return;
		}else{
			var param	= record[0];
		}
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/faildelete.do',
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


	//엑셀
	exportAction : function(record){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
