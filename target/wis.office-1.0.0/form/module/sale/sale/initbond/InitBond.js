Ext.define('module.sale.sale.initbond.InitBond', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmPopup2',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload'
	],
	models	: [
		'module.sale.sale.initbond.model.InitBond',
	],
	stores	: [
		'module.sale.sale.initbond.store.InitBond',
	],
	views	: [
		'module.sale.sale.initbond.view.InitBondLayout',
		'module.sale.sale.initbond.view.InitBondLister',
		'module.sale.sale.initbond.view.InitBondSearch',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-initbond-layout button[action=selectAction]' : { click : me.selectAction },
			'module-initbond-lister button[action=exportAction]' : { click : me.exportAction },
			'module-initbond-lister button[action=updateAction]' : { click : me.updateAction },
			'module-initbond-lister button[action=closeAction]'  : { click : me.closeAction },
		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-initbond-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-initbond-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-initbond-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			trns_yymm= me.pocket.search().getValues().trns_yymm,
			store = lister.getStore(),
			selection = lister.getSelectionModel().getSelection()[0],
			index = store.indexOf(selection)
		;

		if(index == -1){
			index = 0;
		}
		if(trns_yymm == '' || trns_yymm == null){
			Ext.Msg.alert("알림","년월을 반드시 입력해주십시오.");
			return;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(index);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//저장
	updateAction:function() {
		var me   = this,
		lister   = me.pocket.lister(),
		store   = lister.getStore(),
		changes  = lister.getStore().getUpdatedRecords().length,
		change   = lister.getStore().data.items,
		length   = lister.getStore().data.items.length,
		remove   = lister.getStore().removed.length	//삭제유무,
		trns_yymm= me.pocket.search().getValues().trns_yymm,
		check = '0'
	;
		if(length == 0){
			var modify = 'Y';
				cstm_idcd = ' ';
		}else {
			var modify   = change[length-1].get('modify'),		//수정유무
			cstm_idcd    = change[length-1].get('cstm_idcd');	//거래처유무
		}
		if(modify == 'Y' && cstm_idcd== ''){
			Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
		}else{

			if(changes == 0){
				if (modify != 'Y'&& remove == 0) {
					Ext.Msg.alert("알림","변경된 사항이 없습니다.");
				}else{
					if(trns_yymm == null || trns_yymm == ''){
						Ext.Msg.alert("알림","년월을 반드시 입력해주십시오.");
						return;
					}

					for (var a = 0; a < changes; a++) {
						var trns_bill_amnt = lister.getStore().getUpdatedRecords()[a].data.trns_bill_amnt;
						var rqbl_amnt = lister.getStore().getUpdatedRecords()[a].data.rqbl_amnt;
						var txbl_amnt = lister.getStore().getUpdatedRecords()[a].data.txbl_amnt;

						lister.getStore().getUpdatedRecords()[a].data.trns_yymm = trns_yymm;

						if(trns_bill_amnt == 0 && rqbl_amnt == 0 && rqbl_amnt == 0){
							check = '1';
						}
					}

					if(check == '1'){
						Ext.Msg.confirm("확인", "입력한 값들이 모두 0인 경우 해당 내역은 저장되지 않습니다. 계속 진행하시겠습니까?", function(button) {
							if (button == 'yes') {
								var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
								mask.show();
								var store = lister.getStore();
								lister.getStore().sync({
									success : function(operation){ me.selectAction();},
									failure : function(operation){ },
									callback: function(operation){
										mask.hide();
									}
								});
							}
						});
					}else{
						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
						mask.show();
						var store = lister.getStore();
						lister.getStore().sync({
							success : function(operation){ me.selectAction();},
							failure : function(operation){ },
							callback: function(operation){
								mask.hide();
							}
						});
					}
				}
			}else {
				if(trns_yymm == null || trns_yymm == ''){
					Ext.Msg.alert("알림","년월을 반드시 입력해주십시오.");
					return;
				}

				for (var a = 0; a < changes; a++) {
					var trns_bill_amnt = lister.getStore().getUpdatedRecords()[a].data.trns_bill_amnt;
					var rqbl_amnt = lister.getStore().getUpdatedRecords()[a].data.rqbl_amnt;
					var txbl_amnt = lister.getStore().getUpdatedRecords()[a].data.txbl_amnt;

					lister.getStore().getUpdatedRecords()[a].data.trns_yymm = trns_yymm;

					if(trns_bill_amnt == 0 && rqbl_amnt == 0 && rqbl_amnt == 0){
						check = '1';
					}
				}

				if(check == '1'){
					Ext.Msg.confirm("확인", "입력한 값들이 모두 0인 경우 해당 내역은 저장되지 않습니다. 계속 진행하시겠습니까?", function(button) {
						if (button == 'yes') {
							var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
							mask.show();
							var store = lister.getStore();
							lister.getStore().sync({
								success : function(operation){ me.selectAction();},
								failure : function(operation){ },
								callback: function(operation){
									mask.hide();
								}
							});
						}
					});
				}else{
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					var store = lister.getStore();
					lister.getStore().sync({
						success : function(operation){ me.selectAction();},
						failure : function(operation){ },
						callback: function(operation){
							mask.hide();
						}
					});
				}
			}
		}
	},

	closeAction : function(){
		Ext.Msg.show({ title: '확인', msg: '이미 마감된 자료를 삭제하고 거래처별 채권/채무 이월금액을 다시 등록합니다. 진행하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
					url		: _global.location.http() + '/sale/sale/initBond/set/close.do',
							params	: {
						token : _global.token_id,
							param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
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
								Ext.Msg.alert('알림','다운로드 완료');
							}
							mask.hide();
						},
						failure : function(result, request) {
								mask.hide();
						Ext.Msg.error(result.mesage);
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

