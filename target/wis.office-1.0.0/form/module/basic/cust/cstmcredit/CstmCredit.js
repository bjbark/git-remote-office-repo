
Ext.define('module.basic.cust.cstmcredit.CstmCredit', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.basic.cust.cstmcredit.model.CstmCreditMaster',
	],
	stores:[
		'module.basic.cust.cstmcredit.store.CstmCreditMaster',
	],
	views : [
		'module.basic.cust.cstmcredit.view.CstmCreditLayout',
		/* 현황 */
		'module.basic.cust.cstmcredit.view.CstmCreditSearch',
		'module.basic.cust.cstmcredit.view.CstmCreditListerMaster',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-cstmcredit-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-cstmcredit-layout button[action=selectAction]'					: { click : me.selectAction         }, /* 조회 */

			'module-cstmcredit-lister-master button[action=trnsStopInitAction]'		: { click : me.trnsStopInitAction   }, /* 거래정지초기화 */
			'module-cstmcredit-lister-master button[action=trnsStopAction]'			: { click : me.trnsStopAction       }, /* 거래정지 */
			'module-cstmcredit-lister-master button[action=trnsStopCancelAction]'	: { click : me.trnsStopCancelAction }, /* 거래정지취소 */

			'module-cstmcredit-lister-master button[action=exportAction]'			: { click : me.exportAction      }, /* 엑셀 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-cstmcredit-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cstmcredit-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-cstmcredit-lister-master')[0] }
	},

	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

//	selectAction:function(callbackFn) {
//		var me = this,
//			lister = me.pocket.lister()
//		;
//		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
//		mask.show();
//
//		lister.select({
//			 callback:function(records, operation, success) {
//				mask.hide();
//			}, scope:me
//		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
//	},

	// 거래정지 초기화
	trnsStopInitAction : function() {
		var me = this,
			lister = me.pocket.lister()
		;

		if (lister.getStore().data.length == 0) {
			Ext.Msg.alert("알림", "조회된 거래처가 없숩니다!");
			return;
		}

		Ext.Msg.confirm("확인", "거래처의 거래정지를 초기화 하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url		: _global.location.http() + '/basic/cust/cstmcredit/set/setTrnsStopInit.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							trns_stop_yorn	: '0'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							mask.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			lister.getStore().reload();
		})
	},

	// 거래정지
	trnsStopAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			cstm_idcd = ""
		;

		if (select && select.length == 0) {
			Ext.Msg.alert("알림", "거래처를 선택하여 주세요.");
			return;
		}

		Ext.Msg.confirm("확인", "거래처의 거래정지를 하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.each(select, function(record) {
					cstm_idcd +=  record.get("cstm_idcd") + ",";
				});

				Ext.Ajax.request({
					url		: _global.location.http() + '/basic/cust/cstmcredit/set/setTrnsStopAction.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							cstm_idcd		: cstm_idcd,
							trns_stop_yorn	: '1'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							mask.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			lister.getStore().reload();
		})
	},

	// 거래정치 취소
	trnsStopCancelAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			cstm_idcd = ""
		;

		if (select && select.length == 0) {
			Ext.Msg.alert("알림", "거래처를 선택하여 주세요.");
			return;
		}

		Ext.Msg.confirm("확인", "거래처의 거래정지를 취소 하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.each(select, function(record) {
					cstm_idcd +=  record.get("cstm_idcd") + ",";
				});

				Ext.Ajax.request({
					url		: _global.location.http() + '/basic/cust/cstmcredit/set/setTrnsStopAction.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							cstm_idcd		: cstm_idcd,
							trns_stop_yorn	: '0'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							mask.hide();
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			lister.getStore().reload();
		})
	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});