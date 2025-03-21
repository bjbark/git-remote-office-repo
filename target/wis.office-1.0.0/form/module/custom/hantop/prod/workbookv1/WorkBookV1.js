Ext.define('module.custom.hantop.prod.workbookv1.WorkBookV1', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail2',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail3',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1UserPopup',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1CvicPopup',
		'module.custom.hantop.prod.workbookv1.model.WorkBookV1ProrPopup'
	],
	stores : [
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1Detail',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1Detail2',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1Detail3',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1UserPopup',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1ProrPopup',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1CvicPopup',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1PoorLister',
		'module.custom.hantop.prod.workbookv1.store.WorkBookV1FailLister'
	],
	views : [
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1Layout',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1Search',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ListerMaster',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1PoorLister',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1FailLister',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ListerDetail',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ListerDetail2',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ListerDetail3',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ListerDetailSearch',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1UserPopup',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1CvicPopup',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1ProrPopup',
		'module.custom.hantop.prod.workbookv1.view.WorkBookV1Editor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-workbookv1-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-workbookv1-lister'				: { selectionchange	: me.selectLister	},
			'module-workbookv1-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-workbookv1-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-workbookv1-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-workbookv1-lister-master'								: { itemdblclick : me.selectDetail },
			'module-workbookv1-detail'										: { itemdblclick : me.doubleAction },
			'module-workbookv1-detail button[action=shiftWork]'				: { click : me.shiftWork },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-workbookv1-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-workbookv1-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-workbookv1-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-workbookv1-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-workbookv1-detail2')[0] },
		detail3  : function () { return Ext.ComponentQuery.query('module-workbookv1-detail3')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-workbookv1-editor')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-workbookv1-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-workbookv1-fail')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-workbookv1-detailSearch')[0] }
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
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
								}));
				detail.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
								work_date:value.work_date }));
			}else if(tindex == 1){
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge({ wkct_idcd : value.wkct_name,
								stor_id  : _global.stor_id,
				}) );
			}
		}
		if(tindex == 2){
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
					console.log(records);
				} else { }
			}, scope:me
		}, Ext.merge({	work_date      : params.work_date,
						work_date2     : params.work_date2,
						prog_stat_dvcd : params.prog_stat_dvcd,
						cvic_idcd      : params.cvic_idcd,
						invc_numb      : params.invc_numb
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
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv5/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv5/set/faildelete.do',
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
