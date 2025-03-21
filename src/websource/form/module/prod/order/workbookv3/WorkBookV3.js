Ext.define('module.prod.order.workbookv3.WorkBookV3', { extend:'Axt.app.Controller',

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
		'module.prod.order.workbookv3.model.WorkBookV3',
		'module.prod.order.workbookv3.model.WorkBookV3Detail',
		'module.prod.order.workbookv3.model.WorkBookV3Detail2',
		'module.prod.order.workbookv3.model.WorkBookV3Detail3',
		'module.prod.order.workbookv3.model.WorkBookV3UserPopup',
		'module.prod.order.workbookv3.model.WorkBookV3WkctPopup',
		'module.prod.order.workbookv3.model.WorkBookV3ProrPopup'
	],
	stores : [
		'module.prod.order.workbookv3.store.WorkBookV3',
		'module.prod.order.workbookv3.store.WorkBookV3Detail',
		'module.prod.order.workbookv3.store.WorkBookV3Detail2',
		'module.prod.order.workbookv3.store.WorkBookV3Detail3',
		'module.prod.order.workbookv3.store.WorkBookV3UserPopup',
		'module.prod.order.workbookv3.store.WorkBookV3ProrPopup',
		'module.prod.order.workbookv3.store.WorkBookV3WkctPopup',
		'module.prod.order.workbookv3.store.WorkBookV3PoorLister',
		'module.prod.order.workbookv3.store.WorkBookV3FailLister'
	],
	views : [
		'module.prod.order.workbookv3.view.WorkBookV3Layout',
		'module.prod.order.workbookv3.view.WorkBookV3Search',
		'module.prod.order.workbookv3.view.WorkBookV3ListerMaster',
		'module.prod.order.workbookv3.view.WorkBookV3PoorLister',
		'module.prod.order.workbookv3.view.WorkBookV3FailLister',
		'module.prod.order.workbookv3.view.WorkBookV3ListerDetail',
		'module.prod.order.workbookv3.view.WorkBookV3ListerDetail2',
		'module.prod.order.workbookv3.view.WorkBookV3ListerDetail3',
		'module.prod.order.workbookv3.view.WorkBookV3ListerDetailSearch',
		'module.prod.order.workbookv3.view.WorkBookV3UserPopup',
		'module.prod.order.workbookv3.view.WorkBookV3WkctPopup',
		'module.prod.order.workbookv3.view.WorkBookV3ProrPopup',
		'module.prod.order.workbookv3.view.WorkBookV3Editor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-workbookv3-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-workbookv3-lister'										: { selectionchange	: me.selectLister	},
			'module-workbookv3-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-workbookv3-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-workbookv3-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
			'module-workbookv3-lister-master'								: { itemdblclick : me.selectDetail },
			'module-workbookv3-detail'										: { itemdblclick : me.doubleAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-workbookv3-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-workbookv3-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-workbookv3-lister')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-workbookv3-detail')[0] },
		detail2  : function () { return Ext.ComponentQuery.query('module-workbookv3-detail2')[0] },
		detail3  : function () { return Ext.ComponentQuery.query('module-workbookv3-detail3')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-workbookv3-editor')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-workbookv3-detailSearch')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-workbookv3-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-workbookv3-fail')[0] }
	},

	//탭바꿈.
	changeAction:function(callbackFn){
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = Ext.ComponentQuery.query('module-workbookv3-search')[0],
			lister = me.pocket.lister(),
			detail = me.pocket.detail(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detailSearch = me.pocket.detailSearch(),
			params = detailSearch.getValues(),
			work_date = Ext.util.Format.date(search.down('[name=work_date]').getValue(), "Ymd"),
			wkct_idcd = search.down('[name=wkct_name]').getValue()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex == 0){
			search.show();
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge({ wkct_idcd : wkct_idcd,
				stor_id  : _global.stor_id,
				work_date:work_date }));

//			detail.select({
//				 callback:function(records, operation, success) {
//					if (success) {
//					} else { }
//					mask.hide();
//				}, scope:me
//			}, Ext.merge({wkct_idcd : wkct_idcd, stor_grp : _global.stor_grp }));

		}else if(tindex == 1){
			search.show();
			detail2.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else if(tindex == 2){
			search.hide();
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
		console.log(params.lott_numb);
		console.log(params.wkod_numb);
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
						wkod_numb      : params.wkod_numb
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
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv3/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv3/set/faildelete.do',
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
