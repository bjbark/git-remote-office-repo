Ext.define('module.custom.komec.stock.isos.prodnotwork.ProdNotWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.custom.komec.stock.isos.prodnotwork.model.ProdNotWork'
	],
	stores	: [
		'module.custom.komec.stock.isos.prodnotwork.store.ProdNotWork',
		'module.custom.komec.stock.isos.prodnotwork.store.ProdNotWorkLister2'
	],
	views	: [
		'module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkLayout',
		'module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkLister',
		'module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkLister2',
		'module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkPoorPopup',
		'module.custom.komec.stock.isos.prodnotwork.view.ProdNotWorkSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodnotwork-layout button[action=selectAction]' : { click : me.selectAction	},				// 조회
			// lister event
			'module-prodnotwork-lister button[action=errorAction]': { click : me.errorAction	},				// 불량처리
			'module-prodnotwork-lister button[action=exportAction]': { click : me.exportAction	},				// 엑셀
			'module-prodnotwork-lister button[action=writeAction]' : { click : me.writeAction	},				// 생산지시서
			'module-prodnotwork-lister2 button[action=poordeleteAction]' : { click : me.poordeleteAction	},	// 불량폐기
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodnotwork-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodnotwork-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-prodnotwork-lister')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-prodnotwork-lister2')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister()
			lister2 = me.pocket.lister2()
			search  = me.pocket.search(),
			param   = search.getValues()
		;
//		if(param.pdod_date1>param.pdod_date2) {
//			Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
//		}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
//			Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
//		}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
//			Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
//		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
//		}
	},

	errorAction:function() {
		var me = this,
			master = me.pocket.lister()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "불량처리하시려는 목록 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-prodnotwork-poor-popup',
			params : {
				invc_numb : records[0].get('invc_numb'),
			},
		});
	},

	poordeleteAction:function() {
		var me = this,
			master = me.pocket.lister2()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "불량폐기하시려는 목록 1건을 선택 후 진행하십시오.");
			return;
		}


		Ext.Msg.confirm("확인", "불량폐기 하시겠습니까?", function(button) {
			if (button == 'yes') {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/komec/stock/isos/prodnotwork/set/deletepoor.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn : records[0].get('line_seqn')
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.Msg.alert("알림", "불량폐기가 완료 되었습니다.");
						master.getStore().reload();
						if	(!result.success ){
							Ext.Msg.error(result.message );
							return;
						} else {
							me.setResponse( {success : true , values :  values });
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
					}
				});
			}
		})
	},
	// 엑셀
	exportAction : function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});