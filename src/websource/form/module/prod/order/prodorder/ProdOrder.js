Ext.define('module.prod.order.prodorder.ProdOrder', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.prod.order.prodorder.model.ProdOrder1',
		'module.prod.order.prodorder.model.ProdOrder2'
	],
	stores	: [
		'module.prod.order.prodorder.store.ProdOrder1',
		'module.prod.order.prodorder.store.ProdOrder2'
	],
	views	: [
		'module.prod.order.prodorder.view.ProdOrderLayout',
		'module.prod.order.prodorder.view.ProdOrderLister1',
		'module.prod.order.prodorder.view.ProdOrderLister2',
		'module.prod.order.prodorder.view.ProdOrderSearch',
		'module.prod.order.prodorder.view.ProdOrderListerSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodorder-layout button[action=selectAction]' : { click : me.selectAction	},		// 조회
			// lister1 event
			'module-prodorder-lister1 button[action=exportAction]': { click : me.exportAction1	},		// 엑셀
			'module-prodorder-lister1 button[action=writeAction]' : { click : me.writeAction	},		// 생산지시서
			'module-prodorder-lister1 menuitem[action=closeAction]' : { click : me.closeAction	},		// 마감
			'module-prodorder-lister1 menuitem[action=closeCancelAction]' : { click : me.closeCancelAction	},		// 해지
			// lister2 event
			'module-prodorder-lister2 button[action=updateAction]': { click : me.updateAction	},		// 저장
			'module-prodorder-lister2 button[action=cancelAction]': { click : me.cancelAction	},		// 취소
			//lister serch
			'module-prodorder-lister-search button[action=selectAction2]': { click : me.selectAction2}	// 조회
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodorder-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodorder-search') [0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-prodorder-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-prodorder-lister2')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-prodorder-lister-search')[0] }
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
		if(tindex==0){
			if(param.pdod_date1>param.pdod_date2) {
				Ext.Msg.alert("알림", "지시일자를 다시 입력해주십시오.");
			}else if(param.work_strt_dttm1>param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "착수예정일자를 다시 입력해주십시오.");
			}else if(param.work_endd_dttm1>param.work_endd_dttm2) {
				Ext.Msg.alert("알림", "종료예정일자를 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister1.select({
					callback:function(records, operation, success) {
						if (success) {
							lister1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}else{
			Ext.Msg.alert("알림","생산지시작성의 조회를 클릭 해 주십시오.");
		}
	},

	selectAction2 : function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			search  = me.pocket.listersearch(),
			param   = search.getValues()
		;
		if(param.plan1_sttm>param.plan2_sttm){
			Ext.Msg.alert("알림", "착수일자를 다시 입력해주십시오");
		}else{
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	updateAction : function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			changes = lister2.getStore().getUpdatedRecords().length,
			new_invc_numb
		;
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			for(var i=0;i<changes;i++){
				Ext.Ajax.request({
					url : _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'pror'
						})
					},
					async	: false,
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				lister2.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister2.getStore();
			lister2.getStore().sync({
				success : function(operation){ },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},
	// 생산지시등록
	writeAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			jrf = 'DooinMeterial.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister1.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "생산지시리스트에서 선택하여주십시오.");
			return;
		}
		var win = window.open(_global.location.http()+'/testcall/ubitest.do?param={\"jrf\" : \"'+jrf+'\",\"resId\" : \"'+resId+'\"}','test','width=1000,height=600');
		return win;
	},

	cancelAction : function() {
		var me	= this,
			lister2	= me.pocket.lister2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			changes = lister2.getStore().getUpdatedRecords().length
		;
		if(changes == 0){
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
			mask.show();
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},
	//TODO 마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister1().getSelectionModel().getSelection(),
			master = me.pocket.lister1()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되어 요청하신 작업을 진행할 수 없습니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 발주서를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주서를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'pror_mast'
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
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},
	//TODO 해지
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister1().getSelectionModel().getSelection(),
			master = me.pocket.lister1()
		;
		console.log('asdas');
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") != "1") {
					err_msg = "마감해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 발주서를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주서를 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1');     // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'pror_mast'
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
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},
	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	}
});