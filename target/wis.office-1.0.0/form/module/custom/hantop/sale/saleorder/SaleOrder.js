Ext.define('module.custom.hantop.sale.saleorder.SaleOrder', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.upload.DXFconvert',
	],

	models:[
		'module.custom.hantop.sale.saleorder.model.SaleOrderInvoice',
		'module.custom.hantop.sale.saleorder.model.SaleOrderMaster',
		'module.custom.hantop.sale.saleorder.model.SaleOrderDetail2',
		'module.custom.hantop.sale.saleorder.model.SaleOrderDetail',
		'module.custom.hantop.sale.saleorder.model.SaleOrderFile'
	],
	stores:[
		'module.custom.hantop.sale.saleorder.store.SaleOrderInvoice',
		'module.custom.hantop.sale.saleorder.store.SaleOrderMaster',
		'module.custom.hantop.sale.saleorder.store.SaleOrderDetail2',
		'module.custom.hantop.sale.saleorder.store.SaleOrderDetail',
		'module.custom.hantop.sale.saleorder.store.SaleOrderFile'
	],
	views : [
		'module.custom.hantop.sale.saleorder.view.SaleOrderLayout',
		/* 현황 */
		'module.custom.hantop.sale.saleorder.view.SaleOrderSearch',
		'module.custom.hantop.sale.saleorder.view.SaleOrderListerMaster',
		'module.custom.hantop.sale.saleorder.view.SaleOrderListerDetail2',
		'module.custom.hantop.sale.saleorder.view.SaleOrderListerDetail',
		/* 작업 */
		'module.custom.hantop.sale.saleorder.view.SaleOrderWorkerEditor',
		'module.custom.hantop.sale.saleorder.view.SaleOrderWorkerSearch',
		'module.custom.hantop.sale.saleorder.view.SaleOrderWorkerLister',
		'module.custom.hantop.sale.saleorder.view.SaleOrderCopyPopup',
		'module.custom.hantop.sale.saleorder.view.SaleOrderFile',
		'module.custom.hantop.sale.saleorder.view.SaleOrderConsultingPopup',
		'module.custom.hantop.sale.saleorder.view.SaleOrderResultPopup'
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
			'module-saleorder-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 출고지시 */
			'module-saleorder-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-saleorder-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-saleorder-lister-master button[action=uploadAction]'			: { click : me.excelUploadAction },
			'module-saleorder-lister-master button[action=pasteUploadAction]'		: { click : me.pasteUploadAction }, /* 엑셀 붙여 넣기 액션 */

			'module-saleorder-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
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
						lister.getSelectionModel().select(0);
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
					if(_global.hq_id.toUpperCase() == "N1000HNTOP"){
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
								sale_amnt : select[i].data.invc_amnt,
								ttsm_amnt : select[i].data.totl_cost,
								pcod_numb : select[i].data.pcod_numb,
								updt_idcd : select[i].data.updt_idcd,
								crte_idcd : select[i].data.crte_idcd,
								dlvy_cstm_idcd : select[i].data.dlvy_cstm_idcd
							})
							x++;
						}
					}else{
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
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/hantop/sale/order/saleorder/set/stps.do',
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
			store  = master.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		console.log(records);
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/hantop/sale/order/saleorder/set/del_yn.do',
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
	}
});
