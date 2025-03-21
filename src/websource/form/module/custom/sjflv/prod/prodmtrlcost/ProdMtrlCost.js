Ext.define('module.custom.sjflv.prod.prodmtrlcost.ProdMtrlCost', { extend:'Axt.app.Controller',

	requires:[
			'lookup.popup.view.BzplPopup',
			'lookup.popup.view.ItemPopup',
			'lookup.popup.view.UserPopup',
			'lookup.popup.view.CstmPopup',
		],

	models	: [
		'module.custom.sjflv.prod.prodmtrlcost.model.ProdMtrlCost',
		'module.custom.sjflv.prod.prodmtrlcost.model.ProdMtrlCostLister2'
	],
	stores	: [
		'module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCost',
		'module.custom.sjflv.prod.prodmtrlcost.store.ProdMtrlCostLister2'
	],
	views	: [
		'module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLayout',
		'module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostSearch',
		'module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLister',
		'module.custom.sjflv.prod.prodmtrlcost.view.ProdMtrlCostLister2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodmtrlcost-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// lister event
			'module-prodmtrlcost-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

			'module-prodmtrlcost-lister' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-prodmtrlcost-lister2 button[action=exportAction]' 		: { click : me.exportAction2 },	// 엑셀
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prodmtrlcost-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prodmtrlcost-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-prodmtrlcost-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-prodmtrlcost-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-prodmtrlcost-lister2')[0] }
	},

	// 조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues()
		;

//		if (Ext.isEmpty(param.invc_date)) {
//			Ext.Msg.alert(Const.NOTICE, "기준일자를 입력 후 조회하세요.");
//			return;
//		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					//lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/item/bommast/set/log.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					lgin_idcd	: _global.login_id,
					menu_idcd	: '285015',
					log_dvcd	: '14',
					log_name	: '조회',
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
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	selectDetail : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues()
		;

		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { job_order_no : record.get('job_order_no') });
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/item/bommast/set/log.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					lgin_idcd	: _global.login_id,
					menu_idcd	: '285015',
					log_dvcd	: '14',
					log_name	: '상세조회',
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
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	selectRecord:function( grid, records ){
		var me = this,
			lister2 = me.pocket.lister2()
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);
	},


	// 엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/item/bommast/set/log.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					lgin_idcd	: _global.login_id,
					menu_idcd	: '285015',
					log_dvcd	: '99',
					log_name	: '엑셀 다운로드',
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
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},



	// 엑셀
	exportAction2 : function(){
		this.pocket.lister2().writer({enableLoadMask:true});

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/item/bommast/set/log.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					lgin_idcd	: _global.login_id,
					menu_idcd	: '285015',
					log_dvcd	: '99',
					log_name	: '상세내역 엑셀 다운로드',
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
					me.setResponse( {success : true , values :  values });
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});