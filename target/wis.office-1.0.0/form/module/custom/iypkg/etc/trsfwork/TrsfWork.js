Ext.define('module.custom.iypkg.etc.trsfwork.TrsfWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CarPopup',
	],
	models	: [
		'module.custom.iypkg.etc.trsfwork.model.TrsfWorkLister1',
		'module.custom.iypkg.etc.trsfwork.model.TrsfWorkWorkerLister',
	],
	stores	: [
		'module.custom.iypkg.etc.trsfwork.store.TrsfWorkLister1',
		'module.custom.iypkg.etc.trsfwork.store.TrsfWorkLister2',
		'module.custom.iypkg.etc.trsfwork.store.TrsfWorkWorkerLister1',
		'module.custom.iypkg.etc.trsfwork.store.TrsfWorkWorkerLister2',
	],
	views	: [
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkLayout',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkSearch',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkLister1',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkLister2',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerSearch',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerEditor',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerLister1',
		'module.custom.iypkg.etc.trsfwork.view.TrsfWorkWorkerLister2',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-trsfwork-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-trsfwork-layout button[action=selectAction]'		: { click : me.selectAction			},		// 조회
			'module-trsfwork-worker-search button[action=selectAction2]': { click : me.selectAction2		},		// 조회2

			'module-trsfwork-worker-lister1' : {
				itemdblclick : me.selectRecord ,
			},

			'module-trsfwork-worker-lister2 button[action=cancelAction]': { click : me.cancelAction			},		// 취소
			'module-trsfwork-worker-lister2 button[action=updateAction]': { click : me.updateAction			},		// 저장



//			'module-goodsosttwork-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
//			//lister serch
//			'module-goodsosttwork-lister-detail1 button[action=exportAction]' : { click : me.exportDetailAction	},	// 엑셀
//			'module-goodsosttwork-lister-master2 button[action=exportAction]' : { click : me.exportAction1	},		// 엑셀
//			'module-goodsosttwork-lister-detail2 button[action=exportAction]' : { click : me.exportDetailAction1},	// 엑셀
//			'module-goodsosttwork-lister-master2' : {
//				itemdblclick : me.selectLister2 ,
//				selectionchange : me.attachRecord
//			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-trsfwork-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-trsfwork-search') [0] },
		lister1			: function () { return Ext.ComponentQuery.query('module-trsfwork-lister1') [0] },
		lister2			: function () { return Ext.ComponentQuery.query('module-trsfwork-lister2') [0] },
		workerlister1	: function () { return Ext.ComponentQuery.query('module-trsfwork-worker-lister1')[0] },
		workerlister2	: function () { return Ext.ComponentQuery.query('module-trsfwork-worker-lister2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-trsfwork-worker-search')[0] },
		workereditor	: function () { return Ext.ComponentQuery.query('module-trsfwork-worker-editor')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(param.invc_date1 > param.invc_date12) {
			Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
		}else{
			if ( tindex == 0 ) {
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							lister1.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}else if(tindex == 1){
				lister2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}else if(tindex == 2){
			}
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.workerlister1(),
			editor = me.pocket.workereditor(),
			search = me.pocket.workersearch(),
			param  = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}));
	},

	selectRecord:function( grid, record ){
		var me = this,
			lister = me.pocket.workerlister1(),
			detail = me.pocket.workerlister2(),
			editor = me.pocket.workereditor(),
			record = lister.getSelectionModel().getSelection()[0]
		;
		if(record){
			editor.loadRecord(record);
			editor.down('[name=qntt]').setValue(record.data.sum_qntt);
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.workereditor(),
			lister = me.pocket.workerlister1(),
			detail = me.pocket.workerlister2(),
			param  = editor.getValues(),
			store  = detail.getStore(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			new_invc_numb, new_line_seqn,
			record = []
			records = lister.getSelectionModel().getSelection()
		;

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "등록할 출고 내역을 선택하여 주십시오.");
			return;
		}

		if(param.invc_date == ''){
			Ext.Msg.alert("알림","운송일자를 반드시 입력해주십시오.");
			return;
		}
		if(param.cars_idcd == ''){
			Ext.Msg.alert("알림","운송차량를 반드시 선택해주십시오.");
			return;
		}

		record.push({
			invc_numb : records[0].data.invc_numb,
			drtr_idcd : param.drtr_idcd,
			cars_idcd : param.cars_idcd,
			crrr_name : param.nwek_name,
			sum_m2    : param.sum_m2,
			sum_qntt  : param.sum_qntt,
			trnt_exps : param.trnt_exps,
			need_time : param.need_time,
			runn_dist : param.retn_time,
			trsf_date : param.invc_date
		})

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/etc/trsfwork/set/record.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					records			: record
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
				tpanel.setActiveTab(0);
				lister.getStore().reload();
				mask.hide();
			}
		});
	},

	cancelAction : function() {
		var me = this,
			lister1 = me.pocket.workerlister1(),
			lister2 = me.pocket.workerlister2(),
			editor = me.pocket.workereditor(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		editor.getForm().reset();

		lister1.getStore().clearData();
		lister1.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

		tpanel.items.indexOf(tpanel.setActiveTab(0));

	},



//	deleteAction : function() {
//		var me = this,
//			lister = me.pocket.listermaster1(),
//			store = lister.getStore(),
//			records = lister.getSelectionModel().getSelection()
//		;
//		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
//			if (button == 'yes') {
//
//				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
//				mask.show();
//
//				Ext.Ajax.request({
//					url			: _global.api_host_info + '/' + _global.app_site + '/stock/goodsosttwork/set/deleteMaster.do',
//					method		: "POST",
//					params		: {
//					 	token	: _global.token_id,
//						param	: Ext.encode({
//							invc_numb	: records[0].get('invc_numb')
//						})
//					},
//					success : function(response, request) {
//						var object = response,
//							result = Ext.decode(object.responseText)
//						;
//						if (result.success) {
//							store.remove(records[0]);
//							store.commitChanges();
//						} else {
//							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
//						}
//					},
//					failure : function(response, request) {
//						resource.httpError(response);
//					},
//					callback : function() {
//						mask.hide();
//						me.pocket.listerdetail1().getStore().loadData([],false);
//					}
//				});
//			}
//		});
//	},


	// 엑셀
//	exportAction : function(self) {
//		this.pocket.listermaster1().writer({enableLoadMask:true});
//	},
//	exportDetailAction : function(self) {
//		this.pocket.listerdetail1().writer({enableLoadMask:true});
//	},
});