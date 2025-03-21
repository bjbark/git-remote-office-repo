Ext.define('module.custom.komec.prod.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.LottPopupV2',
		'lookup.popup.view.WkctMansPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.WkctCvicPopup',
		'module.custom.komec.prod.workbook.view.WorkBookCastPopup',
		'module.custom.komec.prod.workbook.view.WorkBookInptPopup',
		'lookup.popup.view.KeypadPopup',
		'Ext.util.Cookies'

	],

	models : [
		'module.custom.komec.prod.workbook.model.WorkBookMainPopup',
		'module.custom.komec.prod.workbook.model.WorkBookDetail',
		'module.custom.komec.prod.workbook.model.WorkBookUserPopup',
		'module.custom.komec.prod.workbook.model.WorkBookWkctPopup',
		'module.custom.komec.prod.workbook.model.WorkBookProrPopup',
		'module.custom.komec.prod.workbook.model.WorkBookCastPopup',
		'module.custom.komec.prod.workbook.model.WorkBookBomPopup',
		'module.custom.komec.prod.workbook.model.WorkBookMtrlPopup',
		'module.custom.komec.prod.workbook.model.WorkBookInptPopup',
		'module.custom.komec.prod.workbook.model.WorkBookLastEndPopup',
		'module.custom.komec.prod.workbook.model.WorkBookCommonPopup',
		'module.custom.komec.prod.workbook.model.WorkBookPoorLister',
		'module.custom.komec.prod.workbook.model.WorkBookFailLister',
	],
	stores : [
		'module.custom.komec.prod.workbook.store.WorkBookDetail',
		'module.custom.komec.prod.workbook.store.WorkBookUserPopup',
		'module.custom.komec.prod.workbook.store.WorkBookBomPopup',
		'module.custom.komec.prod.workbook.store.WorkBookProrPopup',
		'module.custom.komec.prod.workbook.store.WorkBookWkctPopup',
		'module.custom.komec.prod.workbook.store.WorkBookPoorLister',
		'module.custom.komec.prod.workbook.store.WorkBookCastPopup',
		'module.custom.komec.prod.workbook.store.WorkBookMtrlPopup',
		'module.custom.komec.prod.workbook.store.WorkBookFailLister',
		'module.custom.komec.prod.workbook.store.WorkBookInptPopup',
		'module.custom.komec.prod.workbook.store.WorkBookLastEndPopup',
		'module.custom.komec.prod.workbook.store.WorkBookMainPopup',
		'module.custom.komec.prod.workbook.store.WorkBookCommonPopup',
	],
	views : [
		'module.custom.komec.prod.workbook.view.WorkBookLayout',
		'module.custom.komec.prod.workbook.view.WorkBookSearch',
		'module.custom.komec.prod.workbook.view.WorkBookPoorLister',
		'module.custom.komec.prod.workbook.view.WorkBookFailLister',
		'module.custom.komec.prod.workbook.view.WorkBookListerDetail',
		'module.custom.komec.prod.workbook.view.WorkBookUserPopup',
		'module.custom.komec.prod.workbook.view.WorkBookWkctPopup',
		'module.custom.komec.prod.workbook.view.WorkBookProrPopup',
		'module.custom.komec.prod.workbook.view.WorkBookCastPopup',
		'module.custom.komec.prod.workbook.view.WorkBookMtrlPopup',
		'module.custom.komec.prod.workbook.view.WorkBookStartPopup',
		'module.custom.komec.prod.workbook.view.WorkBookStopPopup',
		'module.custom.komec.prod.workbook.view.WorkBookEndPopup',
		'module.custom.komec.prod.workbook.view.WorkBookInptPopup',
		'module.custom.komec.prod.workbook.view.WorkBookLastEndPopup',
		'module.custom.komec.prod.workbook.view.WorkBookBomPopup',
		'module.custom.komec.prod.workbook.view.WorkBookMainPopup',
		'module.custom.komec.prod.workbook.view.WorkBookFailPopup',
		'module.custom.komec.prod.workbook.view.WorkBookPoorPopup',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			// layout event
			'module-komec-workbook-layout #mainpanel'	: { tabchange		: me.changeAction	},
			'module-komec-workbook-search button[action=refreshAction]'			: { click : me.refreshAction	},
			// lister event
			'module-komec-workbook-poor button[action=deleteAction]'			: { click : me.deletepoorAction	},	// 불량삭제
			'module-komec-workbook-fail button[action=deleteAction]'			: { click : me.deletefailAction	},	// 유실삭제
//			'module-komec-workbook-detail'										: { itemdblclick : me.doubleAction },
			'module-komec-workbook-detail button[action=iteminput]'				: { click : me.iteminput },
			'module-komec-workbook-detail button[action=castcond]'				: { click : me.castCond  },
			'module-komec-workbook-detail button[action=castcond2]'				: { click : me.castCond2 },
			'module-komec-workbook-detail button[action=bommodify]'				: { click : me.bommodify },
			'module-komec-workbook-detail button[action=workmtrl]'				: { click : me.workmtrl  },
			'lookup-komec-workbook-main-popup button[action=mainStart]'			: { click : me.mainStart },
			'lookup-komec-workbook-main-popup button[action=mainStop]'			: { click : me.mainStop  },
			'lookup-komec-workbook-main-popup button[action=mainEnd]'			: { click : me.mainEnd   },
			'lookup-komec-workbook-main-popup button[action=iteminput]'			: { click : me.iteminput },
			'lookup-komec-workbook-main-popup button[action=castCond]'			: { click : me.castCond  },
			'lookup-komec-workbook-main-popup button[action=mainFail]'			: { click : me.mainFail },
			'lookup-komec-workbook-main-popup button[action=mainPoor]'			: { click : me.mainPoor },
			'lookup-komec-workbook-main-popup button[action=mtrlinput]'			: { click : me.mtrlInput },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout   : function () { return Ext.ComponentQuery.query('module-komec-workbook-layout')[0] },
		search   : function () { return Ext.ComponentQuery.query('module-komec-workbook-search')[0] },
		detail   : function () { return Ext.ComponentQuery.query('module-komec-workbook-detail')[0] },
		poor     : function () { return Ext.ComponentQuery.query('module-komec-workbook-poor')[0] },
		fail     : function () { return Ext.ComponentQuery.query('module-komec-workbook-fail')[0] },
		item     : function () { return Ext.ComponentQuery.query('module-komec-workbook-inpt-popup')[0] },
		cast     : function () { return Ext.ComponentQuery.query('module-komec-workbook-cast-popup')[0] },
		mainpopup: function () { return Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0] }
	},
	refreshAction:function(){
		var me = this,
			lister = me.pocket.detail(),
			search = me.pocket.search(),
			values = search.getValues()
		;
		lister.select({
			callback:function(){

			}
		},values);

	},
	mainPoor:function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'lookup-komec-workbook-poor-popup',
				param  : {
					invc_numb	: select.get('invc_numb')
				}
			});
		}else{
			var message = '선택된 공정이 없습니다.';
			me.showMessage(message);
		}

	},
	mainFail:function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'lookup-komec-workbook-fail-popup',
				param  : {
					invc_numb	: select.get('invc_numb')
				}
			});
		}else{
			var message = '선택된 공정이 없습니다.';
			me.showMessage(message);
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
			var message = "삭제할 불량내역을 선택해주십시오.";
			me.showMessage(message);
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/set/poordelete.do',
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/set/faildelete.do',
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
	iteminput:function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			var a = resource.loadPopup({
				widget : 'module-komec-workbook-inpt-popup',
				param  : {
					invc_numb	: select.get('invc_numb')
				}
			});
			a.tools.close.hide ();
		}else{
			var message = '선택된 공정이 없습니다.';
			me.showMessage(message);
		}
	},

	castCond:function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			var a = resource.loadPopup({
				widget : 'module-komec-workbook-cast-popup',
				params:{
					item_idcd : select.get('item_idcd'),
					invc_numb : select.get('invc_numb'),
					wkct_idcd : select.get('wkct_idcd')
				},
			});
			a.tools.close.hide ();
		}else{
			var message = '선택된 공정이 없습니다.';
			me.showMessage(message);
		}
	},

	bommodify:function(){
		var me = this,
			search   = me.pocket.search(),
			value    = search.getValues(),
			detail   = me.pocket.detail(),
			select   = detail.getSelectionModel().getSelection()[0]
		;
		if(select){
			var a = resource.loadPopup({
				widget : 'module-komec-workbook-bom-popup',
				params:{
					invc_numb : select.get('wkod_numb'),
				},
			});
			a.tools.close.hide ();
		}else{
			Ext.Msg.alert("알림","진행중인 작업을 선택해주세요.");
		}
	},

	mainStart : function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0],
			store  = lister.getStore()
		;
		var idx = store.findExact('line_seqn',select.get('line_seqn'));
		var message = "";
		if(idx > 0){
			var bfSelect = store.getAt(idx-1);
			if(bfSelect.get('prog_stat_dvcd')!="3"){
				message = "이전 공정이 종료된 후 시작가능합니다.";
			}
		}
		switch (select.get('prog_stat_dvcd')) {
		case "3":
			message = "종료된 작업은 시작할 수 없습니다.";
			break;
		case "1":
			message = "이미 시작된 작업입니다.";
			break;
		default:
			break;
		}
		if(message == ""){
			resource.loadPopup({
				widget : 'module-komec-workbook-start-popup',
				param  : {
					invc_numb	: select.get('invc_numb'),
					line_seqn	: select.get('line_seqn'),
					work_numb	: select.get('work_numb'),
					wkct_idcd	: select.get('wkct_idcd'),
				}
			});
		}else{
			me.showMessage(message);
		}
	},
	mainStop : function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		var message = "진행중인 작업만 중단할 수 있습니다.";

		if(select.get('prog_stat_dvcd')==1){
			resource.loadPopup({
				widget : 'module-komec-workbook-stop-popup',
				param  : {
					invc_numb	: select.get('invc_numb'),
					line_seqn	: select.get('line_seqn'),
					work_numb	: select.get('work_numb'),
					wkct_idcd	: select.get('wkct_idcd'),
					indn_qntt	: select.get('indn_qntt')
				}
			});
		}else{
			me.showMessage(message);
		}
	},
	mainEnd : function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;

		//TODO select의 last_wkct_yorn이 1이면 다른 팝업으로 처리.
		var message = "종료할 수 없는 상태입니다.";
		var message2 = "투입자재 공정을 확인해주세요.";

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/komec/prod/workbook/get/bomCheck.do',
			method	: "POST",
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.data['invc_numb'],
					line_seqn		: select.data['line_seqn'],

				})
			},
			success : function(response, request) {
				var object = response,
				result = Ext.decode(object.responseText)
				;
				if (result.success) {
					//console.log(result.records[0]['total']);
					console.log(result.records[0]['cnt'])

					var wkct_idcd = select.get('wkct_idcd');
					//var total = result.records[0]['total'];
					var cnt = result.records[0]['cnt'];

					if(select.get('prog_stat_dvcd')==1 || select.get('prog_stat_dvcd')==2 ){

						if(wkct_idcd == '000060')  {
							if(cnt < 5) {
								me.showMessage(message2);
								return;
							}
						}

						if(wkct_idcd == '000065')  {
							if(cnt < 6) {
								me.showMessage(message2);
								return;
							}
						}

						if(wkct_idcd == '000086')  {
							if(cnt < 7) {
								me.showMessage(message2);
								return;
							}
						}

						if(select.get('last_wkct_yorn')=="1"){
							resource.loadPopup({
								widget : 'module-komec-workbook-lastend-popup',
								param  : {
									wkod_numb	: select.get('invc_numb'),
									wkod_seqn	: select.get('line_seqn'),
								}
							});
						}else{
							resource.loadPopup({
								widget : 'module-komec-workbook-end-popup',
								param  : {
									invc_numb	: select.get('invc_numb'),
									line_seqn	: select.get('line_seqn'),
									work_numb	: select.get('work_numb'),
									wkct_idcd	: select.get('wkct_idcd'),
									dvcd		: '0'
								}
							});
						}
					}else{
						me.showMessage(message);
					}

				} else {
					Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});

	},
	mtrlInput : function(){
		var me = this,
			mainpopup = me.pocket.mainpopup(),
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		var message = "작업 공정을 선택해주세요.";
		if(select){
			if(select.get('prog_stat_dvcd')=="1"){
				var a = resource.loadPopup({
					widget : 'module-komec-workbook-mtrl-popup',
					param  : {
						invc_numb	: select.get('invc_numb'),
						line_seqn	: select.get('line_seqn'),
						work_numb	: select.get('work_numb')
					}
				});
				a.tools.close.hide ();
			}else{
				message = "생산중인 작업만 가능합니다.";
				me.showMessage(message);
				return;
			}
		}else{
			me.showMessage(message);
			return;
		}
	},
	showMessage : function(message){
		var msg = Ext.MessageBox.show({        
			title: '<span style="font-size:2em !important;line-height: 20px;">Error</span>',
			msg: '<span style="font-size:3em !important;line-height: 25px;">'+message+'</span>',
			icon: Ext.MessageBox.ERROR,
			closable: false
		});
		setTimeout(function(){
			msg.close();
		}, 1000);
	},
	//엑셀
	exportAction : function(record){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
