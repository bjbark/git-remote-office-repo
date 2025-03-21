Ext.define('module.sale.order.saleorder.SaleOrder', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.upload.DXFconvert',
	],

	models:[
		'module.sale.order.saleorder.model.SaleOrderInvoice',
		'module.sale.order.saleorder.model.SaleOrderMaster',
		'module.sale.order.saleorder.model.SaleOrderDetail2',
		'module.sale.order.saleorder.model.SaleOrderDetail',
		'module.sale.order.saleorder.model.SaleOrderFile'
	],
	stores:[
		'module.sale.order.saleorder.store.SaleOrderInvoice',
		'module.sale.order.saleorder.store.SaleOrderMaster',
		'module.sale.order.saleorder.store.SaleOrderDetail2',
		'module.sale.order.saleorder.store.SaleOrderDetail',
		'module.sale.order.saleorder.store.SaleOrderFile'
	],
	views : [
		'module.sale.order.saleorder.view.SaleOrderLayout',
		/* 현황 */
		'module.sale.order.saleorder.view.SaleOrderSearch',
		'module.sale.order.saleorder.view.SaleOrderListerMaster',
		'module.sale.order.saleorder.view.SaleOrderListerDetail2',
		'module.sale.order.saleorder.view.SaleOrderListerDetail',
		/* 작업 */
		'module.sale.order.saleorder.view.SaleOrderWorkerEditor',
		'module.sale.order.saleorder.view.SaleOrderWorkerSearch',
		'module.sale.order.saleorder.view.SaleOrderWorkerLister',
		'module.sale.order.saleorder.view.SaleOrderCopyPopup',
		'module.sale.order.saleorder.view.SaleOrderFile',
		'module.sale.order.saleorder.view.SaleOrderConsultingPopup',
		'module.sale.order.saleorder.view.SaleOrderResultPopup',
		'module.sale.order.saleorder.view.SaleOrderAmendPopup',
		'module.sale.order.saleorder.view.SaleOrderDeliPopup',
		'module.sale.order.saleorder.view.SaleOrderProrPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-saleorder-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-saleorder-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-saleorder-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleorder-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-saleorder-layout #mainpanel'									: { tabchange : me.selectAction  },

			'module-saleorder-lister-master menuitem[action=closeActiveAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-saleorder-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeAction        }, /* 마감취소 */
			'module-saleorder-lister-master menuitem[action=okAction]'				: { click : me.okAction           }, /* 승인 */
			'module-saleorder-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소 */

			'module-saleorder-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-saleorder-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-saleorder-lister-master button[action=amendAction]'				: { click : me.amendAction        }, /* Amend */
			'module-saleorder-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 수주복사 */
			'module-saleorder-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 출고지시 */
			'module-saleorder-lister-master button[action=etcPrintAction]'			: { click : me.invReportAction    }, /* 명세서 발행 */
			'module-saleorder-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-saleorder-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-saleorder-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-saleorder-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-saleorder-lister-master button[action=ganttAction]'				: { click : me.ganttAction        }, /* 일정보기 */
			'module-saleorder-lister-master button[action=uploadAction]'			: { click : me.excelUploadAction },
			'module-saleorder-lister-master button[action=pasteUploadAction]'		: { click : me.pasteUploadAction }, /* 엑셀 붙여 넣기 액션 */
			'module-saleorder-lister-master button[action=printAction]'				: { click : me.printAction       }, /* 인수증발행 */
			'module-saleorder-lister-master button[action=printAction2]'			: { click : me.printAction2       }, /* 거래명세서발행 */

			'module-saleorder-lister-master button[action=prorAction]'				: { click : me.prorAction	},	/* 작업지시*/

			'module-saleorder-lister-detail2 button[action=consultingAction]'		: { click : me.consultingAction},	// 상담입력
			'module-saleorder-lister-detail2 button[action=resultAction]'			: { click : me.resultAction},		// 결과입력

			'module-saleorder-lister-detail2 button[action=test]'					: { click : me.test},		// test

			'module-saleorder-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-saleorder-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2 }, /* 디테일삭제 */
			'module-saleorder-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-saleorder-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-saleorder-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-saleorder-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-saleorder-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-saleorder-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-saleorder-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-saleorder-lister-detail2')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-saleorder-copy-popup')[0] },
		file  : function () { return Ext.ComponentQuery.query('module-saleorder-file')[0] },
		consultingpopup	: function () { return Ext.ComponentQuery.query('module-saleorder-consulting-popup')[0] },
		prorpopup : function () { return Ext.ComponentQuery.query('module-saleorder-pror-popup')[0] },
	},


	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되었습니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 오더를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
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
										table			: 'acpt_mast'
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

	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
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
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
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
										table			: 'acpt_mast'
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
	// 작업지시 버튼 (DHTEC)
	prorAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			pror = "" , prod = "",
			result = ""
		;
		var err_msg = "";
		if (!select) {
			Ext.Msg.alert("알림", "지시할 작업을 선택 후 진행하십시오.");
			return;
		}

		if(_global.hq_id.toUpperCase()!='N1000DHTEC'){
			if(select.get('wkfw_idcd')==''){
				Ext.Msg.alert("알림", "작업공정을 추가 후 진행하십시오.");
				return;
			}
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/order/saleorder/set/duplicatecheck.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: select.get('invc_numb'),
					line_seqn		: select.get('line_seqn'),
					amnd_degr		: select.get('amnd_degr'),
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				result = Ext.decode(response.responseText);
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

		var param = {};

		if(result.records[0].prod!=""||result.records[0].pror!=""){
			param = { prod_numb : result.records[0].prod , pror_numb : result.records[0].pror }
			Ext.Msg.confirm("확인", "지시가 완료 된 작업입니다. <br><br>작업 지시를 수정하시겠습니까?", function(button){
				if (button == 'yes') {
					var me = this
					var popup = resource.loadPopup({
						widget : 'module-saleorder-pror-popup',
						params:param,
					});
					popup.down('form').getForm().setValues(select.data);
				}
			});
			return;
		}else{
			var me = this
			var popup = resource.loadPopup({
				widget : 'module-saleorder-pror-popup',
				params:param,
			});
			popup.down('form').getForm().setValues(select.data);
		}

	},

	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-copy-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
		Ext.ComponentQuery.query('#amnd_degr')[0].setValue(records[0].data.amnd_degr);
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			lister = me.pocket.lister.master(),
			store = lister.getStore(),
			record = []
		;
		if(select.length == '0'){
			Ext.Msg.alert("알림","출고 할 수주를 선택해주십시오.");
		}else{
			for (var i = 0; i < select.length; i++) {
				if(select[0].data.cstm_idcd != select[i].data.cstm_idcd){
					Ext.Msg.alert("알림","동일한 거래처의 수주를 선택해주십시오.");
					return;
				}
				if (select[i].data.acpt_stat_dvcd == '0010') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(미승인 오더)");
					return;
				}
				if (select[i].data.acpt_stat_dvcd == '0200') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(출고지시 완료)");
					return;
				}
				if (select[i].data.acpt_stat_dvcd !== '0011') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.");
					return;
				}
				if (select[i].data.line_clos !== '0') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(마감된 오더)");
					return;
				}

			}
			Ext.Msg.confirm("확인", "출고 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
						}
					});
					var x = 1;
						for (var i = 0; i < select.length; i++) {
							record.push({
								new_line_seqn : x,
								invc_numb : select[i].data.invc_numb,
								line_seqn : select[i].data.line_seqn,
								invc_date : Ext.util.Format.date(new Date(),'Ymd'),
								bzpl_idcd : select[i].data.bzpl_idcd,
								cstm_idcd : select[i].data.cstm_idcd,
								drtr_idcd : select[i].data.drtr_idcd,
								dept_idcd : select[i].data.dept_idcd,
								deli_date : Ext.util.Format.date(select[i].data.deli_date,'Ymd'),
								item_idcd : select[i].data.item_idcd,
								sale_pric : select[i].data.sale_pric,
								ostt_qntt : select[i].data.invc_qntt,
								sale_amnt : select[i].data.invc_pric,
								ttsm_amnt : select[i].data.invc_amnt,
								pcod_numb : select[i].data.pcod_numb,
								updt_idcd : select[i].data.updt_idcd,
								crte_idcd : select[i].data.crte_idcd,
								dlvy_cstm_idcd : select[i].data.dlvy_cstm_idcd
							})
							x++;
						}
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder/set/stps.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								new_invc_numb	: new_invc_numb,
								records			: record
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							Ext.Msg.alert("알림", "출고가 완료 되었습니다.");
							me.pocket.lister.master().getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
						}
					});
				}
			});
		}
	},




	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("acpt_stat_dvcd") == "0011") {
					err_msg = "이미 승인되었습니다.";
				}
				if (record.get("acpt_stat_dvcd") != "0010") {
					err_msg = "승인할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('acpt_stat_dvcd', '0011'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/order/saleorder/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										acpt_stat_dvcd	: '0011',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
										master.getStore().reload();
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
	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("acpt_stat_dvcd") != "0011" || record.get("cnt") > 0 || record.get("pdsd_yorn") == 1 || record.get("pdsd_yorn") == 'Y') {
					err_msg = "승인 해지할 수 없는 상태입니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 해지할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('acpt_stat_dvcd', '0010'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/order/saleorder/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										acpt_stat_dvcd	: '0010',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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

	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor(),
			lister = me.pocket.lister.master(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			file = me.pocket.file(),
			detail2 = me.pocket.lister.detail2(),
			record = lister.getSelectionModel().getSelection()[0]
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						if (_global.options.mes_system_type.toUpperCase() != 'SJFLV') {
							lister.getSelectionModel().select(0);
						}
					} else {  }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_id : _global.stor_id }));
		}else{
			if(record){
				if(tindex==1){
					mask.show();
					file.select({
						callback:function(records, operation, success) {
							if (success) {
							} else { }
							mask.hide();
							}, scope:me
					}, { invc_numb : record.get('invc_numb'),orgn_dvcd : 'saleorder'});
					file.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');
				}else if(tindex==2){
					mask.show();
					detail2.select({
						 callback : function(records, operation, success) {
							if (success) {
							} else {}
							mask.hide();
						}, scope : me
					}, { invc_numb : record.get('invc_numb') });
				}
			}else{
				tpanel.setActiveTab(0);
				Ext.Msg.alert("알림", "수주현황을 선택하여 주십시오.");
				return;
			}
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			file = me.pocket.file(),
			detail2 = me.pocket.lister.detail2()
		;

		file.getStore().clearData();
		file.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);
	},


	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;


			var err_msg = "";
			if (select){
				if (select.get("line_clos") == "1") {
					err_msg = "마감된 오더입니다.";
				}
				if (select.get("acpt_stat_dvcd") !== "0010" || select.get("pdsd_yorn") == 1 || select.get("pdsd_yorn") == 'Y') {
					if (_global.options.acpt_fix_yorn==1) {
						err_msg = "승인 또는 진행중인 오더는 수정할 수 없습니다.";
					}
				}
				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

			if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
				if (select){
					if (select.get("expt_dvcd") == "1") {
						err_msg = "수출구분이 직수출인 수주는 수정이 불가능합니다.";
					}
					if (err_msg != "") {
						Ext.Msg.alert("알림", err_msg);
						return;
					}
				}
			}

			if (select){
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb'), stor_id : _global.stor_id })},
					lister	: lister,
					callback: function( results ) {
						if (results.success){
							me.pocket.layout().getLayout().setActiveItem(1);
							results.feedback( {success : true } );
						}
					}
				}, me);
			}
	},

	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'acpt_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: keygen.records[0].seq,
							drtr_name	: _global.login_nm,
							drtr_idcd	: _global.login_id,
							acpt_dvcd	: (_global.options.mes_system_type.toUpperCase() == "SJFLV"?'1000':'')
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});

	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			store	= master.getStore(),
			store2	= lister.getStore(),
			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;
		for(i=0;i<store2.data.length;i++){
			if(store2.data.items[i].get('deli_date2')=='' ||store2.data.items[i].get('deli_date2')==null ){
				Ext.Msg.alert(Const.NOTICE,"납기 일자를 입력하여 주시기 바랍니다.");
				return;
			}
		}

		console.log(editor.down('[name=dlvy_cstm_idcd]').getValue());
		console.log(editor.down('[name=cstm_name2]').getValue());

		if(resId == 'SJFLV' && (editor.down('[name=cstm_name2]').getValue() == null || editor.down('[name=cstm_name2]').getValue() == '')){
			Ext.Msg.alert("알림","배송지를 반드시 입력하여 주시기 바랍니다.");
			return;
		}
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.invc_qntt == 0){
							store2.remove(item);
						}
					});
					if (dirty) {
						info.setDirty();
					}
					results.feedback({success : true  });
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							me.selectAction();
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-saleorder-worker-search')[0].getForm().reset();
			}
		});
	},

	amendAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]
		;
		var err_msg = "";

		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 오더입니다.";
			}

			if (select.get("acpt_stat_dvcd") == "0600") {
				err_msg = "amend 등록 할 수 없는 수주입니다.(출고완료).";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "amend 등록할 수주  1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-amend-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
	},

	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-copy-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
		Ext.ComponentQuery.query('#amnd_degr')[0].setValue(records[0].data.amnd_degr);
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			lister = me.pocket.lister.master(),
			store = lister.getStore(),
			record = []
		;
		if(select.length == '0'){
			Ext.Msg.alert("알림","출고 할 수주를 선택해주십시오.");
		}else{
			for (var i = 0; i < select.length; i++) {
				if(select[0].data.cstm_idcd != select[i].data.cstm_idcd){
					Ext.Msg.alert("알림","동일한 거래처의 수주를 선택해주십시오.");
					return;
				}
				if (select[i].data.acpt_stat_dvcd == '0010') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(미승인 오더)");
					return;
				}
				if (select[i].data.acpt_stat_dvcd == '0200') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(출고지시 완료)");
					return;
				}
				if (select[i].data.acpt_stat_dvcd !== '0011') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.");
					return;
				}
				if (select[i].data.line_clos !== '0') {
					Ext.Msg.alert("알림", "출고할 수 없는 수주입니다.(마감된 오더)");
					return;
				}

			}
			Ext.Msg.confirm("확인", "출고 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
						}
					});
					var x = 1;
						for (var i = 0; i < select.length; i++) {
							record.push({
								new_line_seqn : x,
								invc_numb : select[i].data.invc_numb,
								line_seqn : select[i].data.line_seqn,
								invc_date : Ext.util.Format.date(new Date(),'Ymd'),
								bzpl_idcd : select[i].data.bzpl_idcd,
								cstm_idcd : select[i].data.cstm_idcd,
								drtr_idcd : select[i].data.drtr_idcd,
								dept_idcd : select[i].data.dept_idcd,
								deli_date : Ext.util.Format.date(select[i].data.deli_date,'Ymd'),
								item_idcd : select[i].data.item_idcd,
								sale_pric : select[i].data.sale_pric,
								ostt_qntt : select[i].data.invc_qntt,
								sale_amnt : select[i].data.invc_pric,
								ttsm_amnt : select[i].data.invc_amnt,
								pcod_numb : select[i].data.pcod_numb,
								updt_idcd : select[i].data.updt_idcd,
								crte_idcd : select[i].data.crte_idcd,
								dlvy_cstm_idcd : select[i].data.dlvy_cstm_idcd
							})
							x++;
						}
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder/set/stps.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								new_invc_numb	: new_invc_numb,
								records			: record
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							Ext.Msg.alert("알림", "출고가 완료 되었습니다.");
							me.pocket.lister.master().getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
						}
					});
				}
			});
		}
	},

	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
				Ext.ComponentQuery.query('module-saleorder-worker-search')[0].getForm().reset();
			}
		});
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore(),
			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}


		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("acpt_stat_dvcd") != "0010" || record.get("pdsd_yorn") == 1 || record.get("pdsd_yorn") == 'Y') {
					if (_global.options.acpt_fix_yorn==1) {
						err_msg = "승인 또는 진행중인 오더는 삭제할 수 없습니다.";
					}
				}
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}

				if(resId == 'SJFLV' && record.get("expt_dvcd") == "1" ){
					err_msg ="수출구분이 직수출인 수주는 삭제할 수 없습니다.";
					return;
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});
	},

	deleteAction2:function(){
		var me = this,
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;

		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					for (var i = 0; i < records.length; i++) {
						store.remove(records[i]);
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
				}
			}
		});

	},

	/**
	 * 엑셀 업로드 액션
	 */
	pasteUploadAction : function () {
		var me = this ,
			layout = me.pocket.layout()
		;
		layout.getLayout().setActiveItem(1);
	},
	/**
	 * 엑셀 업로드
	 */
	excelUploadAction : function () {
		var me = this,
			param  = me.pocket.search().getValues()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'file-upload-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/수주업로드양식_광일테크.xlsx'
			},
			apiurl : {
				upload : _global.location.href + '/system/sale/order/saleorder/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast'
			},
			title			: '고객 수주내역 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			}
		});
	},

	//상담입력
	consultingAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail2 = me.pocket.lister.detail2(),
			consultingpopup  = me.pocket.consultingpopup(),
			sub = detail2.down('#sub').grid.store.data.length;
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "수주내역을 선택해주십시오.");
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/order/saleorder/get/seqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb : records[0].data.invc_numb
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
					old_line_seqn = result.records[0].line_seqn;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		old_line_seqn = old_line_seqn+1;
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-consulting-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(old_line_seqn);
		var numb3 = Ext.ComponentQuery.query('#drtr_idcd')[0].setValue(_global.login_id);
		var numb4 = Ext.ComponentQuery.query('#drtr_name')[0].setValue(_global.login_nm);
		var numb5 = Ext.ComponentQuery.query('#cnsl_dttm1')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb6 = Ext.ComponentQuery.query('#cnsl_dttm2')[0].setValue(Ext.Date.format(new Date(), 'h:i'));
	},


	//결과입력
	resultAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail2 = me.pocket.lister.detail2(),
			consultingpopup  = me.pocket.consultingpopup(),
			sub = detail2.down('#sub').grid.store.data.length;
		;
		var err_msg = "";
		var records = detail2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "상담내역을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-saleorder-result-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.line_seqn);
		var numb3 = Ext.ComponentQuery.query('#rply_drtr_idcd')[0].setValue(_global.login_id);
		var numb4 = Ext.ComponentQuery.query('#rply_drtr_name')[0].setValue(_global.login_nm);
		var numb5 = Ext.ComponentQuery.query('#rply_dttm1')[0].setValue(Ext.Date.format(new Date(), 'Y-m-d'));
		var numb6 = Ext.ComponentQuery.query('#rply_dttm2')[0].setValue(Ext.Date.format(new Date(), 'h:i'));
	},


	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	reportAction : function(button) {
		var me = this, lister = me.pocket.lister.master(),
			param = me.pocket.search().getValues(), store = lister.getStore()
		;
		var selModel = lister.getSelectionModel();
		var selected = selModel.getSelection();

		if(!selected[0]){
			return
		}

		Ext.widget('popup-report',{
			title	: '마감리포트',
			url		: _global.api_host_info + '/system/sale/order/saleorder/get/report.do',
			params	: { param :
				JSON.stringify({
					stor_grp	: _global.stor_grp,
					token		: _global.token_id,
					invc_numb	: selected[0].get('invc_numb')
				})
			}
		}, this);
	},

	reportDetail : function (button) {

		Ext.each(button.ownerCt.items.items, function( menu ) {
			if (menu.action === 'fax' && menu.checked === true ) {
				console.debug( 'fax' );
			}
			if (menu.action === 'sms' && menu.checked === true) {
				console.debug( 'sms' );
			}
			if (menu.action === 'email' && menu.checked === true ) {
				console.debug( 'email' );
			}
			if (menu.action === 'print' && menu.checked === true ) {
				console.debug( 'print' );
			}
		});
	} ,










	/**
	* 명세서 발행
	*/
	invReportAction:function(button) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(select.length === 0) {
			Ext.Msg.show({ title: '알림', msg: '입고번호를 선택해 주시기 바랍니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		} else
		if(select.length === 1) {
			// type1. 미리보기후 출력
			resource.loadPrint({
				preview			: true,                                 // 미리보기
				enableLoadMask	: true,                                 // mask 띄우기
				paperType		: Const.PaperType.A4_NORMAL,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
				invoiceType 	: Const.InvoiceType.MOVE,               // 명세서 (필수)
				params			: { invc_numb : select[0].get('invc_numb'), use_fax : '0'  },
				previewParams	: { email : select[0].get('reve_email'), fax : select[0].get('reve_fax_no') },
				requrl 			: {
					search		: _global.api_host_info + '/' + _global.app_site +'/sale/order/saleorder/get/printing.do',
				},

				callback		: function (success) {
					if(success) {
					}
				}
			});

		} else {
			var batch = Axt.util.Batch.getInstance();

			select.forEach( function(data) {
				batch.add(function(){
					// 출력 호출
					resource.loadPrint({
						preview		: false,
						invoiceType	: Const.InvoiceType.ESTI,  // 견적서 (필수)
						params		: { invc_numb : data.get('invc_numb') },
						requrl		: {
							search	: _global.api_host_info + '/' + _global.app_site +'/sale/order/saleorder/get/printing.do',
						},
						callback	: function (success, msg) {
							/* next()를 실행해줘야 순차적으로 실행된다. */
							batch.next();
						}
					});
				});
				console.debug(' length > 1 종료');


			});


			/* 여기서 출력 시작! */
			batch.run({
				enableLoadMask : true,
				maskMsg		: '출력중입니다... ($count/$total)',
				callback	: function () {
					Ext.Msg.alert('', '출력이 완료 되었습니다.');
				}
			});
		}
	},

	ganttAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.deli1_date == '' || param.deli2_date == ''){
			Ext.Msg.alert('알림','납기일자를 선택해주세요.')
		}else{
			var hq_id		= _global.hq_id.toUpperCase();
				chk			= Ext.dom.Query.select('.x-css-shadow'),
				a			= _global.api_host_info,
				search_url	= '/system/ganttchart/gantt_query_1.do',
				update_url	= '',
				title		= '수주내역',
				source		= '수주내역',
				levels		= '2',
				fr_dt		= param.deli1_date,
				to_dt		= param.deli2_date,
				url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',title:\''+title+'\',source:\''+source+'\',levels:\''+levels+'\',hq_id:\''+hq_id+'\',to_dt:\''+to_dt+'\',fr_dt:\''+fr_dt+'\'}'
			;
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '납기분석',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%">iframe</iframe>',
						listeners : {
							show : function (win) {
								win.maximize ();
							},
							minimize: function(data) {
								win.setVisible(false);
								var a;
								var button = Ext.create('Ext.Button', {
									text: data.title,
									style: 'z-index: 9999!important',
									draggable :true,
									renderTo: Ext.getBody(),
									listeners : {
										move : function (e) {// dropped
											a = 1;
										},
										click : function(e) {
											if(a==1){
												x = button.getX();
												y = button.getY();
												temp = 1;
												a = 0;
												return;
											}else{
												win.setVisible(true);
												this.destroy();
											}
										}
									}
								});
								if(temp == 0){
									button.setX(200);
									button.setY(850);
								}else{
									button.setX(x);
									button.setY(y);
								}
							}
						}
				}); win.show();
			}
		}
	},

	test:function(){
		var me = this;
		resource.loadPopup({
			widget : 'lookup-board-dxfconvert',
		});
	},

	//인수증 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			jrf = 'sjung_receipt_saleorder.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 거래명세서 발행
	printAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			jrf = 'Invoice_Sjung_acpt.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

});
