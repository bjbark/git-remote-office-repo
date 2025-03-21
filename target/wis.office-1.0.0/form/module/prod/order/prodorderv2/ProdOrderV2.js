Ext.define('module.prod.order.prodorderv2.ProdOrderV2', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WorkCvicPopup'
	],
	models	: [
		'module.prod.order.prodorderv2.model.ProdOrderV21',
		'module.prod.order.prodorderv2.model.ProdOrderV22',
		'module.prod.order.prodorderv2.model.ProdOrderV2Detail'
	],
	stores	: [
		'module.prod.order.prodorderv2.store.ProdOrderV21',
		'module.prod.order.prodorderv2.store.ProdOrderV22',
		'module.prod.order.prodorderv2.store.ProdOrderV2Detail'
	],
	views	: [
		'module.prod.order.prodorderv2.view.ProdOrderV2Layout',
		'module.prod.order.prodorderv2.view.ProdOrderV2Lister1',
		'module.prod.order.prodorderv2.view.ProdOrderV2Lister2',
		'module.prod.order.prodorderv2.view.ProdOrderV2Detail',
		'module.prod.order.prodorderv2.view.ProdOrderV2Editor',
		'module.prod.order.prodorderv2.view.ProdOrderV2Search',
		'module.prod.order.prodorderv2.view.ProdOrderV2OutPopup',
		'module.prod.order.prodorderv2.view.ProdOrderV2ListerSearch'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prodorderv2-layout button[action=selectAction]'			: { click : me.selectAction	},			// 조회
			// lister1 event
			'module-prodorderv2-lister1 button[action=exportAction]'		: { click : me.exportAction1},			// 엑셀
			'module-prodorderv2-lister1 button[action=writeAction]'			: { click : me.writeAction	},			// 생산지시서
			'module-prodorderv2-lister1 button[action=writeAction3]'		: { click : me.writeAction3	},			// 뉴볼텍 외주발주서
			'module-prodorderv2-lister1 button[action=prodIstt]'			: { click : me.prodIstt		},			// 입고등록
			'module-prodorderv2-lister1' : {
				// 2021.12.16 - 이강훈 - 조회 시 Detail 내역이 삭제되지 않아 이벤트 변경 (click -> selectionchange)
				selectionchange : me.selectRecord ,
				itemdblclick: me.selectDetail
			},
			'module-prodorderv2-lister1 menuitem[action=closeAction]'		: { click : me.closeAction	},			// 마감
			'module-prodorderv2-lister1 menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction},		// 해지
			// lister2 event
			'module-prodorderv2-lister2 button[action=updateAction]'		: { click : me.updateAction	},			// 저장
			'module-prodorderv2-lister2 button[action=cancelAction]'		: { click : me.cancelAction	},			// 취소
			//detail
			'module-prodorderv2-detail button[action=modifyAction]'			: { click : me.modifyAction },			// 수정
			'module-prodorderv2-detail'										: { selectionchange: me.attachRecord },	// 수정
			'module-prodorderv2-detail button[action=writeAction2]'			: { click : me.writeAction2			},	// 인코팩 작업지시서

			//editor
			'module-prodorderv2-editor button[action=updateAction]'			: { click : me.updateAction2},		// 저장
			'module-prodorderv2-editor button[action=cancelAction]'			: { click : me.cancelAction2},		// 취소
			//lister serch
			'module-prodorderv2-lister-search button[action=selectAction2]'	: { click : me.selectAction2}	// 조회
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-prodorderv2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-prodorderv2-search') [0] },
		lister1		: function () { return Ext.ComponentQuery.query('module-prodorderv2-lister1')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-prodorderv2-lister2')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-prodorderv2-detail')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-prodorderv2-editor')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-prodorderv2-lister-search')[0] }
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
				}, Ext.merge( me.pocket.search().getValues(),param, {stor_id : _global.stor_id}));
			}
		}
		else{
			Ext.Msg.alert("알림","생산지시 작성의 조회를 클릭 해 주십시오.");
		}
	},
	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
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
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.detail()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},
	modifyAction:function() {
		var me = this,
			detail = me.pocket.detail(),
			select = detail.getSelectionModel().getSelection()[0],
			editor = me.pocket.editor()
		;
		if(select){
			editor.modifyRecord({
				caller   : me,
				action   : Const.EDITOR.DEFAULT ,
				callback : function( results ) {
					if (results.success){
						results.feedback({success : true});
					}
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
						me.pocket.layout().down('#lister1').setDisabled(true);
						me.pocket.layout().down('#detail').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","수정하려는 지시를 선택해주세요.");
		}
	},
	cancelAction2:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller   : me,

			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					me.pocket.layout().down('#lister1').setDisabled(false);
					me.pocket.layout().down('#detail').setDisabled(false);
					me.pocket.search().setDisabled(false);
					results.feedback( {success : true , reload : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
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
	updateAction2:function() {
		var me = this,
			editor = me.pocket.editor(),
			detail = me.pocket.detail(),
			store  = detail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						Ext.Msg.alert("알림","선택된 생산지시를 확인해주세요.");
					} else { results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#lister1').setDisabled(false);
					me.pocket.layout().down('#detail').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : detail.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(detail, record );           break;
					}
				}
			}
		});
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
			Ext.Msg.alert("알림", "마감할 생산지시를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 생산지시를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
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
			Ext.Msg.alert("알림", "마감 해지할 생산지시를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 생산지시를 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
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
	//TODO 작업지시서
	writeAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			select = me.pocket.lister1().getSelectionModel().getSelection(),
			jrf = _global.options.work_order_sheet
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister1.getSelectionModel().getSelection();
		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/prodorderv2/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "7000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var a = "";
		for(var i =0; i< records.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\'}';
			if(i != records.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = 'param~{\'records\':'+a+'}~';
		var arg = _param;

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;

	},

	// 인코팩 작업지시서
	writeAction2:function() {
		var me = this,
			detail = me.pocket.detail(),
			select = me.pocket.detail().getSelectionModel().getSelection(),
			jrf = _global.options.work_order_sheet
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = detail.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("wkct_idcd") == "WT016") {
					err_msg = "인쇄공정은 작업지시서가 없습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (records[0].get("wkct_idcd") == 'A01') {
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/prodorderv2/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "8000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		var invc_numb = select[0].get('invc_numb')
		var arg = 'invc_numb~'+invc_numb+'~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/prodorderv2/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "7000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		var invc_numb = select[0].get('invc_numb')
		var arg = 'invc_numb~'+invc_numb+'~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;

	},


	// 뉴볼텍 외주발주서
	prodIstt:function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			select = me.pocket.lister1().getSelectionModel().getSelection()[0]
		;
		if(!select){
			Ext.Msg.alert("알림", "입고등록하려는 생산지시서를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('prog_stat_dvcd')=="9"){
			Ext.Msg.alert("알림", "이미 입고등록된 생산지시서입니다.");
			return;
		}
		Ext.Msg.show({ title: '확인', msg: '입고등록 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/prod/order/prodorderv2/set/prodIstt.do',
						params	: {
						token	: _global.token_id,
						param	: JSON.stringify({
								invc_numb		: select.get('invc_numb'),
								wrhs_idcd		: select.get('wrhs_idcd'),
								bzpl_idcd		: select.get('bzpl_idcd'),
								invc_date		: select.get('pdod_date').replace(/-/gi,"")
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else{
								lister1.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});

	},

	// 뉴볼텍 외주발주서
	writeAction3:function() {
		var me = this
		resource.loadPopup({
		widget : 'module-prodorderv2-out-popup',
		});
	},


	// 엑셀
	exportAction1 : function() {
		this.pocket.lister1().writer({enableLoadMask:true});
	}
});