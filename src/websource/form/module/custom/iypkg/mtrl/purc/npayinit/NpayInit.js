Ext.define('module.custom.iypkg.mtrl.purc.npayinit.NpayInit', {  extend   : 'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmPopup2'
	],
	models	: [
		'module.custom.iypkg.mtrl.purc.npayinit.model.NpayInit',
	],
	stores	: [
		'module.custom.iypkg.mtrl.purc.npayinit.store.NpayInit',
	],
	views	: [
		'module.custom.iypkg.mtrl.purc.npayinit.view.NpayInitLayout',
		'module.custom.iypkg.mtrl.purc.npayinit.view.NpayInitLister',
		'module.custom.iypkg.mtrl.purc.npayinit.view.NpayInitSearch',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-npayinit-layout button[action=selectAction]' : { click : me.selectAction },
			'module-npayinit-lister button[action=updateAction]' : { click : me.updateAction },
			'module-npayinit-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-npayinit-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-npayinit-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-npayinit-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
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
				} else {}
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
					lister.getStore().each(function (findrecord){
						findrecord.set('trns_yymm',trns_yymm);
					});
					lister.getStore().each(function (findrecord){
						findrecord.set('trns_yymm',trns_yymm);
						if(findrecord.get('trns_bill_amnt') == 0 && findrecord.get('rqbl_amnt') == 0 && findrecord.get('txbl_amnt') == 0){
							check = '1';
						}
					});

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
				lister.getStore().each(function (findrecord){
					findrecord.set('trns_yymm',trns_yymm);
				});

				lister.getStore().each(function (findrecord){
					findrecord.set('trns_yymm',trns_yymm);
					if(findrecord.get('trns_bill_amnt') == 0 && findrecord.get('rqbl_amnt') == 0 && findrecord.get('txbl_amnt') == 0){
						check = '1';
					}
				});

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

	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

