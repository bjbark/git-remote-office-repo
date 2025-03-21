Ext.define('module.custom.iypkg.prod.workbookv2.WorkBookV2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup',
		'lookup.popup.view.WkctPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkCvicPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2CvicPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.KeypadPopup',
		'lookup.workbookv2.cvic.popup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2',
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2Detail',
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2UserPopup',
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2CvicPopup',
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2FabcLister',
		'module.custom.iypkg.prod.workbookv2.model.WorkBookV2ProrPopup'
	],
	stores : [
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2UserPopup',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2ProrPopup',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2CvicPopup',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2PoorLister',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2FabcLister',
		'module.custom.iypkg.prod.workbookv2.store.WorkBookV2FailLister'
	],
	views : [
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2Layout',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2Search',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2ListerMaster',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2FabcLister',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2PoorLister',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2FailLister',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2UserPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2CvicPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2ProrPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2PoorPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2FailPopup',
		'module.custom.iypkg.prod.workbookv2.view.WorkBookV2Editor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-workbookv2-layout #mainpanel'	: { tabchange		: me.changeAction	},
			// lister event
			'module-workbookv2-detail'				: { selectionchange	: me.selectDetail	},
			'module-workbookv2-detail2'				: { selectionchange	: me.selectDetail	},
			'module-workbookv2-detailSearch button[action=selectAction]'	: { click : me.selectAction		},
			'module-workbookv2-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-workbookv2-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
//			'module-workbookv2-lister-master'								: { itemdblclick : me.selectDetail },
//			'module-workbookv2-detail'										: { itemdblclick : me.doubleAction },
//			'module-workbookv5-detail button[action=shiftWork]'				: { click : me.shiftWork },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-workbookv2-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-workbookv2-search')[0] },
		lister   : function () { return Ext.ComponentQuery.query('module-workbookv2-lister')[0] },
		editor   : function () { return Ext.ComponentQuery.query('module-workbookv2-editor')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-workbookv2-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-workbookv2-fail')[0] },
		detailSearch : function () { return Ext.ComponentQuery.query('module-workbookv2-detailSearch')[0] }
	},

	//탭바꿈
	changeAction:function(){
		var me = this,
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			search  = me.pocket.search(),
			value   = search.getValues(),
			lister  = me.pocket.lister()
		;

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {}
			}, scope:me
		}, Ext.merge({ wkct_idcd : value.wkct_name,
						stor_id  : _global.stor_id,
						invc_date1:value.invc_date1,
						invc_date2: value.invc_date2
					}));
	},


	//선택
	selectDetail:function( grid, record ){

		if(record[0] == null){
			return;
		}else{
			var me		= this,
				search	= me.pocket.search(),
				shot	= search.down('[name=shot]')
			;

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
