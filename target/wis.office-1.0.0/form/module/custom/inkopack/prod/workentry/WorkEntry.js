Ext.define('module.custom.inkopack.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

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
		'module.custom.inkopack.prod.workentry.model.WorkEntry',
		'module.custom.inkopack.prod.workentry.model.WorkEntryDetail',
		'module.custom.inkopack.prod.workentry.model.WorkEntryDetail2',
		'module.custom.inkopack.prod.workentry.model.WorkEntryDetail3',
		'module.custom.inkopack.prod.workentry.model.WorkEntryDetail4',
		'module.custom.inkopack.prod.workentry.model.WorkEntryUserPopup',
		'module.custom.inkopack.prod.workentry.model.WorkEntryCvicPopup',
		'module.custom.inkopack.prod.workentry.model.WorkEntryProrPopup'
	],
	stores : [
		'module.custom.inkopack.prod.workentry.store.WorkEntry',
		'module.custom.inkopack.prod.workentry.store.WorkEntryDetail',
		'module.custom.inkopack.prod.workentry.store.WorkEntryDetail2',
		'module.custom.inkopack.prod.workentry.store.WorkEntryDetail3',
		'module.custom.inkopack.prod.workentry.store.WorkEntryDetail4',
		'module.custom.inkopack.prod.workentry.store.WorkEntryUserPopup',
		'module.custom.inkopack.prod.workentry.store.WorkEntryProrPopup',
		'module.custom.inkopack.prod.workentry.store.WorkEntryCvicPopup',
		'module.custom.inkopack.prod.workentry.store.WorkEntryPoorLister',
		'module.custom.inkopack.prod.workentry.store.WorkEntryFailLister'
	],
	views : [
		'module.custom.inkopack.prod.workentry.view.WorkEntryLayout',
		'module.custom.inkopack.prod.workentry.view.WorkEntrySearch',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerMaster',
		'module.custom.inkopack.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.inkopack.prod.workentry.view.WorkEntryFailLister',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetail',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetail2',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetail3',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetail4',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetailSearch',
		'module.custom.inkopack.prod.workentry.view.WorkEntryListerDetailSearch2',
		'module.custom.inkopack.prod.workentry.view.WorkEntryUserPopup',
		'module.custom.inkopack.prod.workentry.view.WorkEntryCvicPopup',
		'module.custom.inkopack.prod.workentry.view.WorkEntryProrPopup',
		'module.custom.inkopack.prod.workentry.view.WorkEntryEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-workentry-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-workentry-lister'				: { selectionchange	: me.selectLister	},
			'module-workentry-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-workentry-detailSearch2 button[action=selectAction]'	: { click : me.selectAction2		},
			'module-workentry-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-workentry-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-workentry-lister-master'								: { itemdblclick : me.selectDetail },
			'module-workentry-detail'										: { itemdblclick : me.doubleAction },
//			'module-workentry-detail button[action=shiftWork]'				: { click : me.shiftWork },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-workentry-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-workentry-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-workentry-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-workentry-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-workentry-detail2')[0] },
		detail3  : function () { return Ext.ComponentQuery.query('module-workentry-detail3')[0] },
		detail4  : function () { return Ext.ComponentQuery.query('module-workentry-detail4')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-workentry-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-workentry-detailSearch')[0] },
		detailSearch2 : function () { return Ext.ComponentQuery.query('module-workentry-detailSearch2')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-workentry-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-workentry-fail')[0] }
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
		if(value.wkct_name){
			if(tindex == 0){
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({	cvic_idcd : value.cvic_name,
								wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
								}));
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({	cvic_idcd : value.cvic_name,
								wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
								work_date:value.work_date }));
			}else if(tindex == 1){
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge({	cvic_idcd : value.cvic_name,
								wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
				}) );
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
			cvic_idcd      : params.cvic_idcd,
			invc_numb      : params.invc_numb,
		}));
	},
	selectAction2:function(){
		var me = this,
			detailSearch2 = me.pocket.detailSearch2(),
			params = detailSearch2.getValues(),
			detail4 = me.pocket.detail4()
		;
		detail4.select({
			callback:function(records, operation, success) {
				if (success) {

				} else { }
			}, scope:me
		}, Ext.merge({	work_date      : params.work_date,
						work_date2     : params.work_date2,
						cvic_idcd      : params.cvic_idcd,
						invc_numb      : params.invc_numb,
						wkct_idcd      : params.wkct_idcd,
						mngt_dept_idcd : params.dept_idcd
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/incopack/prod/workentry/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/incopack/prod/workentry/set/faildelete.do',
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
