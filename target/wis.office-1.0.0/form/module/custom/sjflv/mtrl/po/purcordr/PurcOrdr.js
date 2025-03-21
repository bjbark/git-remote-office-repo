
Ext.define('module.custom.sjflv.mtrl.po.purcordr.PurcOrdr', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.HntopItemPopup2'
	],

	models:[
		'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrInvoice',
		'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrMaster',
		'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrDetail',
		'module.custom.sjflv.mtrl.po.purcordr.model.PurcOrdrFile',
	],
	stores:[
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrInvoice',
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrMaster',
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail',
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail2',
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail3',
		'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail4',
	],
	views : [
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrLayout',
		/* 현황 */
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrSearch',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerMaster',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerDetail',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerDetail2',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerDetail3',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerDetail4',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrIsttPopup',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrPaymentPopup',
		/* 작업 */
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrWorkerEditor',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrWorkerSearch',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrWorkerLister',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrDeliPopup',
		'module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrDeliPopup2'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-purcordr-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordr-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-purcordr-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-purcordr-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-purcordr-lister-master menuitem[action=okAction]'			: { click : me.okAction           }, /* 승인(삼정) */
			'module-purcordr-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소(삼정) */

			'module-purcordr-lister-master button[action=writeAction]'			: { click : me.PrintAction        }, /* 발주서발행*/
			'module-purcordr-lister-master button[action=imptAction]'			: { click : me.imptAction         }, /* 수입order등록*/
			'module-purcordr-lister-master button[action=paymentAction]'		: { click : me.paymentAction      }, /* 수입대금등록*/
			'module-purcordr-lister-master button[action=deliAction]'			: { click : me.deliAction         }, /* 납기일자 변경 */

			'module-purcordr-lister-master button[action=insertAction]'			: { click : _global.hq_id.toUpperCase()!='N1000SJUNG' ? me.insertAction : me.insertAction2 }, /* 등록 */
			'module-purcordr-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-purcordr-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-purcordr-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */

			'module-purcordr-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-purcordr-lister-detail3 button[action=fileAction]'			: { click : me.fileAction         }, /* 발주서류업로드 */
			'module-purcordr-lister-detail3 button[action=deleteAction]'		: { click : me.filedeleteAction   }, /* 발주서류업로드삭제 */

			// 선적서류 등록, 삭제
			'module-purcordr-lister-detail4 button[action=fileAction2]'			: { click : me.fileAction2        }, /* 선적서류업로드 */
			'module-purcordr-lister-detail4 button[action=deleteAction]'		: { click : me.filedeleteAction2        }, /* 선적서류삭제 */
			//입고서류 등록, 삭제
			'module-purcordr-lister-detail2 button[action=fileAction3]'			: { click : me.fileAction3        }, /* 입고서류업로드 */
			'module-purcordr-lister-detail2 button[action=deleteAction]'		: { click : me.filedeleteAction3        }, /* 입고서류삭제 */

			'module-purcordr-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2      }, /*디테일삭제*/
			'module-purcordr-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-purcordr-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-purcordr-worker-lister button[action=deliAction]'			: { click : me.deliAction2   }, /* 납기일자 일괄등록 */

			'module-purcordr-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordr-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordr-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcordr-worker-search')[0] },
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-purcordr-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail2')[0] },
			detail3 : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail3')[0] },
			detail4 : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail4')[0] }
		}
	},

	// 마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
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

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") == "0") {
					err_msg = "승인완료되지않은 발주는 마감이 불가능합니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 발주를 선택하여 주시기 바랍니다.");
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
										table			: 'purc_ordr_mast'
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

	// 마감해지
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
										table			: 'purc_ordr_mast'
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

	// 승인
	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master(),
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 발주를 선택하여 주시기 바랍니다.");
			return;
		}

		Ext.each(select, function(record) {
			if (record.get("line_clos") == "1") {
				err_msg = "마감된 발주입니다.";
			}
		});

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:예&아니오
							record.set('apvl_yorn', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/mtrl/po/purcordr/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										apvl_yorn		: '1',
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

	// 승인취소
	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") != "1") {
					err_msg = "승인해지할 수 없는 상태입니다.";
				}
			});

			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 발주입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인여부 해지할 발주를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordr/chk/cancel.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: record.get('invc_numb'),
							mes_system_type	: _global.options.mes_system_type
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {

						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
//						mask.hide();
					}
				});
			})
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주를 승인해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:예&아니오
							record.set('apvl_yorn'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/mtrl/po/purcordr/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										apvl_yorn		: '0',
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
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp,mes_system_type:_global.options.mes_system_type }));
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail(),
			lister = me.pocket.worker.lister()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		lister.getStore().clearData();
		lister.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
			detail2 = me.pocket.lister.detail2()
			detail3 = me.pocket.lister.detail3()
			detail4 = me.pocket.lister.detail4()
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

			if(record.get('impt_invc_numb') != null && record.get('impt_invc_numb')!='' ) {
				detail2.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('impt_invc_numb'), line_seqn : record.get('line_seqn'), orgn_dvcd : 'impt_istt_file' });
				detail3.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('impt_invc_numb'), line_seqn : record.get('line_seqn'), orgn_dvcd : 'impt_colt_file' });
				detail4.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('impt_invc_numb'), line_seqn : record.get('line_seqn'), orgn_dvcd : 'impt_ordr_item' });
			}
		}
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 발주서는 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
			if (select){
				if (select.get("apvl_yorn") == "1") {
					err_msg = "승인된 발주서는 수정할 수 없습니다.";
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
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
							if (select.get("supl_dvcd") == "6000") {
								editor.down('[name=crny_dvcd]').show();
								editor.down('[name=trde_trnt_dvcd]').show();
								editor.down('[name=won_pric]').show();
								editor.down('[name=supl_dvcd]').setReadOnly(true);
								editor.setHeight(320);
							}else{
								editor.down('[name=crny_dvcd]').hide();
								editor.down('[name=crny_dvcd]').setValue('');
								editor.down('[name=trde_trnt_dvcd]').hide();
								editor.down('[name=trde_trnt_dvcd]').setValue('');
								editor.down('[name=won_pric]').hide();
								editor.down('[name=won_pric]').setValue('');
								editor.down('[name=supl_dvcd]').setReadOnly(false);
								editor.setHeight(240);
							}
						}

						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},

	insertAction2:function() {
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

		editor.insertRecord({
			action	: 'invoice',
			caller	: me,
			record	: Ext.create( me.models[0] ,{
				invc_numb	: '',
				drtr_name	: _global.hq_id != 'N1000SJUNG' ? _global.login_nm : '',
				drtr_idcd	: _global.hq_id != 'N1000SJUNG' ? _global.login_pk : '',
				acpt_dvcd	: (_global.options.mes_system_type.toUpperCase() == "SJFLV"?'1000':'')
			}),
			lister		: me.pocket.worker.lister(),
			callback	: function (results){
				if  (results.success){
					me.pocket.worker.search().show();
					me.pocket.layout().getLayout().setActiveItem(1);
					results.feedback({success : true , visible : true });
				}
			}
		});
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

		var invc_numb;

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/custom/sjflv/prod/workbook/get/invoiceNumber.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
						editor.down('[name=supl_dvcd]').setReadOnly(false);
					}

					var keygenRecord = keygen.records.seq;
					if(!keygenRecord){
						Ext.Ajax.request({
							url			: _global.location.http() + '/listener/seq/maxid.do',
							method		: "POST",
							params		: {
							 	token	: _global.token_id,
							 	param	: JSON.stringify({
									stor_id	: _global.stor_id,
									table_nm: 'purc_ordr_mast'
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									invc_numb = result.records[0].seq;

									editor.insertRecord({
										action	: 'invoice',
										caller	: me,
										record	: Ext.create( me.models[0] ,{
											invc_numb	: invc_numb,
										}),
										lister		: me.pocket.worker.lister(),
										callback	: function (results){
											if  (results.success){
												if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
													editor.down('[name=crny_dvcd]').hide();
													editor.down('[name=trde_trnt_dvcd]').hide();
													editor.down('[name=won_pric]').hide();
													editor.setHeight(240);
												}
												me.pocket.layout().getLayout().setActiveItem(1);
												results.feedback({success : true , visible : true });
											}
										}
									});

								} else {
									Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
								}
							},
							failure : function(response, request) {
								resource.httpError(response);
							},
							callback : function() {
								me.selectAction();
								me.pocket.lister.detail().getStore().loadData([],false);
							}
						});
					}else{
						// 끝 두 자리를 추출
						var prefix = keygenRecord.substring(0, keygenRecord.length - 2); // "PO241121"
						var suffix = keygenRecord.substring(keygenRecord.length - 2);   // "08"

						// 숫자로 변환 후 +1
						var number = parseInt(suffix, 10) + 1;

						// 두 자리 형식 유지 (ex: 09, 10, 11)
						var newSuffix = number.toString().padStart(2, '0');

						// 결과를 결합
						invc_numb = prefix + newSuffix;

						editor.insertRecord({
							action	: 'invoice',
							caller	: me,
							record	: Ext.create( me.models[0] ,{
								invc_numb	: invc_numb,
							}),
							lister		: me.pocket.worker.lister(),
							callback	: function (results){
								if  (results.success){
									if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
										editor.down('[name=crny_dvcd]').hide();
										editor.down('[name=trde_trnt_dvcd]').hide();
										editor.down('[name=won_pric]').hide();
										editor.setHeight(240);
									}
									me.pocket.layout().getLayout().setActiveItem(1);
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			}
		});
	},

	getFormatDate : function(date){
		var year = date.getFullYear();              //yyyy
		var month = (1 + date.getMonth());          //M
		month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
		var day = date.getDate();                   //d
		day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
		return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	},


	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			resId = _global.options.mes_system_type
		;

		if(resId == 'SJFLV'){
			if(editor.down('[name=supl_dvcd]').getValue()=="6000"){
				if (editor.down('[name=crny_dvcd]').getValue() == null || editor.down('[name=crny_dvcd]').getValue() == '') {
					Ext.Msg.alert("알림", "화폐단위값을 넣어주세요.");
					return;
				}
				if (editor.down('[name=trde_trnt_dvcd]').getValue() == null || editor.down('[name=trde_trnt_dvcd]').getValue() == '') {
					Ext.Msg.alert("알림", "운송수단값을 넣어주세요.");
					return;
				}
			}
		}
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if(resId != 'SJFLV'){
					for(var i=0;i<record.productStore.data.items.length;i++){
						var deli2 = record.productStore.data.items[i].data.deli_date2;
						if(deli2 == '' || deli2 == null){
							Ext.Msg.alert("알림","납기일자를 입력하여 주시기 바랍니다.");
							return;
						}
					}
				}

				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
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
								me.selectAction();
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
//							detail.getStore().loadData(record.product().data.items, false);
//						 	master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							master.getStore().reload();
							master.getSelectionModel().select(ms);

							results.feedback({success : true  });

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){

						}
					});
				}
			Ext.ComponentQuery.query('module-purcordr-worker-search')[0].getForm().reset();
			}
		});
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
				Ext.ComponentQuery.query('module-purcordr-worker-search')[0].getForm().reset();
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

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (_global.hq_id.toUpperCase()=='N1000SJUNG' && record.get("supl_dvcd") == "6000") {
					err_msg = "외자매입은 삭제할 수 없습니다.";
				}

				if (record.get("apvl_yorn") == "1") {
					err_msg = "승인되어 삭제할 수 없습니다.";
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordr/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							qty			: records[0].get('offr_qntt'),
							upt_usr_nm	: _global.login_pk,
							mes_system_type	: _global.options.mes_system_type
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
						me.selectAction();
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
	},

	deleteAction2:function(){
		var me = this,
			master = me.pocket.lister.master(),
			workerlister = me.pocket.worker.lister(),
			store  = workerlister.getStore(),
			editor = me.pocket.worker.editor(),
			record = editor.getRecord(),
			store2 = editor.getStore(),
			store3 = me.pocket.worker.search()
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

	fileAction:function(){
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail3(),
			select = master.getSelectionModel().getSelection()
		;
		if(select[0].get('supl_dvcd') != '6000'){
			Ext.Msg.alert('알림','외자매입 발주서만 업로드 할 수 있습니다.');
			return;
		}

		if(Ext.isEmpty(select[0].get('impt_invc_numb'))){
			Ext.Msg.alert('알림','수입Order 등록이후 업로드 할 수 있습니다.');
			return;
		}


		if(select){
			resource.loadPopup({
				widget : 'lookup-board-upload',
				params:{
					invc_numb : select[0].get('impt_invc_numb'),
					line_seqn : '1',
					orgn_dvcd : 'impt_colt_file',
				},
				result : function(records, nameField, pairField) {
					detail.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert('알림','발주서류를 등록할 발주를 선택해주세요.');
		}
	},

	// 선적서류 등록
	fileAction2:function(){
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail4(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(select){
			var invc_numb = select.get('impt_invc_numb');
			/*if(invc_numb != null || invc_nubm != '') {
				Ext.Msg.alert('알림','수입항목');
				return;
			}*/

			resource.loadPopup({
				widget : 'lookup-board-upload',
				params:{
					invc_numb : invc_numb,
					line_seqn : select.get('line_seqn'),
					orgn_dvcd : 'impt_ordr_item',
				},
				result : function(records, nameField, pairField) {
					detail.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert('알림','선적서류를 등록할 항목을 선택해주세요.');
		}

	},

	fileAction3:function(){
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail2(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(select){
			resource.loadPopup({
				widget : 'lookup-board-upload',
				params:{
					invc_numb : select.get('impt_invc_numb'),
					line_seqn : select.get('line_seqn'),
					orgn_dvcd : 'impt_istt_file',
				},
				result : function(records, nameField, pairField) {
					detail.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert('알림','입고서류를 등록할 항목을 선택해주세요.');
		}

	},

	filedeleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail3(),
			select = detail.getSelectionModel().getSelection(),
			store  = detail.getStore()
		;
		if(select.length > 0){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < select.length; i++) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/upload/get/fileDelete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									file_name		: select[i].get('file_name'),
									orgn_dvcd		: "impt_colt_file",
									invc_numb		: select[i].get('invc_numb'),
									line_seqn		: select[i].get('line_seqn'),
									assi_seqn		: select[i].get('assi_seqn')
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
								Ext.Msg.error(result.mesage);
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
					store.reload();
					mask.hide();
				}
			});
		}
	},

	filedeleteAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail4(),
			select = detail.getSelectionModel().getSelection(),
			store  = detail.getStore()
		;
		if(select.length > 0){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < select.length; i++) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/upload/get/fileDelete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									file_name		: select[i].get('file_name'),
									orgn_dvcd		: "impt_ordr_item",
									invc_numb		: select[i].get('invc_numb'),
									line_seqn		: select[i].get('line_seqn'),
									assi_seqn		: select[i].get('assi_seqn')
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
								Ext.Msg.error(result.mesage);
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
					store.reload();
					mask.hide();
				}
			});
		}
	},

	filedeleteAction3:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail2(),
			select = detail.getSelectionModel().getSelection(),
			store  = detail.getStore()
		;
		if(select.length > 0){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < select.length; i++) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/upload/get/fileDelete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									file_name		: select[i].get('file_name'),
									orgn_dvcd		: "impt_istt_file",
									invc_numb		: select[i].get('invc_numb'),
									line_seqn		: select[i].get('line_seqn'),
									assi_seqn		: select[i].get('assi_seqn')
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
								Ext.Msg.error(result.mesage);
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
					store.reload();
					mask.hide();
				}
			});
		}
	},

	paymentAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			paym_memo = "";
		;

		if(select.get('supl_dvcd') != '6000'){
			Ext.Msg.alert('알림','외자매입 발주서만 등록 할 수 있습니다.');
			return;
		}

		if(Ext.isEmpty(select.get('impt_invc_numb'))){
			Ext.Msg.alert('알림','수입Order 등록 이후 할 수 있습니다.');
			return;
		}

		if(select){
			paym_memo = select.get('paym_memo');
//			if (paym_memo == null || paym_memo == "") {
//				Ext.Ajax.request({
//					url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/get/paymMemo.do',
//					params	: {
//						token : _global.token_id,
//						param : JSON.stringify({
//							cstm_idcd	: select.get('cstm_idcd'),
//						})
//					},
//					async	: false,
//					method	: 'POST',
//					success	: function(response, request) {
//						var object = response,
//							result = Ext.decode(object.responseText)
//						;
//						if	(result.success){
//							paym_memo = result.records[0].paym_memo;
//						} else {
//						};
//					},
//					failure : function(result, request) {
//					},
//					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//					}
//				});
//			}
			resource.loadPopup({
				widget : 'module-purcordr-payment-popup',
				params : {"paym_numb" : select.get('paym_numb'),
						"paym_date" : select.get('paym_date'),
						"ordr_numb" : select.get('impt_invc_numb'),
						"amnd_degr" : select.get('impt_amnd_degr')
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	// 발주서 발행
	PrintAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport.jrf',
			resId = _global.hq_id.toUpperCase(),
			chk = 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if(resId == 'N1000SJUNG'){
			if (!records || records.length == 0) {
				Ext.Msg.alert("알림", "발주 현황 목록을 선택해주십시오.");
				return;
			}
		}else{
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "발주 현황 목록을 선택해주십시오.");
				return;
			}
		}

		if(resId == 'N1000SJUNG' && records.length > 0 ){
			for(var i =0; i< select.length ; i++){
				if (select[0].get('cstm_idcd') != select[i].get('cstm_idcd')) {
					Ext.Msg.alert("알림", "같은 거래처를 선택해주세요.");
					return false;
				}
			};
		}

		if (resId == 'N1000SJUNG') {
			if (select[0].get('supl_dvcd') == '6000') {
				Ext.Msg.alert("알림", "수입Order관리에서 발행하세요.");
				return;
			}else{
				var report_name = ("N1000SJFLV" == _global.hq_id.toUpperCase()) ? 'PurcOrderReport_sjflv2.jrf' : 'PurcOrderReport_sjung.jrf';
				var invc_numb = select[0].get('invc_numb');
				var arg = 'invc_numb~'+invc_numb+'~';

				var a = "";
				for(var i =0; i< select.length ; i++){
					if(i==0){
						a+= "[";
					}
						a+= '{\'invc_numb\':\''+select[i].get('invc_numb')+'\',\'line_seqn\':\''+select[i].get('line_seqn')+'\'}';
					if(i != select.length -1){
						a+=",";
					}else{
						a+="]";
					}
				}

				var _param = '_param~{\'records\':'+a+'}~';
				var arg2 = _param;

				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+report_name+'\",\"arg\" : \"'+arg+arg2+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
				Ext.Ajax.request({
					url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
				});
			}
		}

		if (resId == 'N1000SJFLV') {
			if (select[0].get('supl_dvcd') == '6000') {
				var invc_numb = select[0].get('invc_numb');
				var arg = 'invc_numb~'+invc_numb+'~';
				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'PurcOrderReport_sjflv.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
				Ext.Ajax.request({
					url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
				});
			}else{
				var report_name = ("N1000SJFLV" == _global.hq_id.toUpperCase()) ? 'PurcOrderReport_sjflv2.jrf' : 'PurcOrderReport_sjung.jrf';
				var invc_numb = select[0].get('invc_numb');
				var arg = 'invc_numb~'+invc_numb+'~';
				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+report_name+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
				Ext.Ajax.request({
					url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
				});
			}
		}

//		if (select) {
//			var invc_numb = select[0].get('invc_numb');
//			var arg = 'invc_numb~'+invc_numb+'~';
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//			Ext.Ajax.request({
//				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
//			});
//		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
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
			url		: _global.api_host_info + '/system/mtrl/po/purcordr/get/report.do',
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
	},

	// 수입오더등록
	imptAction:function(){
		var	me		= this,
			lister	= me.pocket.lister.master(),
			select	= lister.getSelectionModel().getSelection()[0],
			records = lister.getSelectionModel().getSelection(),
			cnt = 0
		;

		if(records[0].get('line_clos')=='1'){
			Ext.Msg.alert("알림"," 마감되어 수입 Order 등록이 안됩니다.");
			return;
		}

		if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
			if(records[0].get('apvl_yorn')=='1'){
				Ext.Msg.alert('알림',' 승인되어 수입 Order 등록이 안됩니다.');
				return;
			}
		}

		if(select.get('supl_dvcd')!='6000'){
			Ext.Msg.alert('알림','외자매입만 수입 Order 등록 가능합니다.');
			return;
		}

		if(!Ext.isEmpty(select.get('impt_invc_numb'))){
			Ext.Msg.alert('알림','수입Order가 이미 등록 되어있습니다.');
			return;
		}

		if(select){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordr/get/impt.do',
				method		: "POST",
				async	: false,
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: select.get('invc_numb'),
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						console.log(result.records[0])
						cnt = result.records[0].cnt;
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});

			Ext.Msg.confirm("확인", "수입 Order 등록하시겠습니까?", function(button) {
				if (button == 'yes') {
					if(select.get('supl_dvcd')=='6000' && cnt == 0){
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordr/set/impt.do',
							method		: "POST",
							async	: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: select.get('invc_numb'),
									stor_id		: _global.stor_id,
									hqof_idcd	: _global.hqof_idcd,
									crte_idcd	: _global.login_pk
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									lister.getStore().reload();
								} else {
									Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
								}
								Ext.Msg.alert("알림", "수입 Order 등록이 완료 되었습니다.");
							},
							failure : function(response, request) {
								resource.httpError(response);
							},
							callback : function() {
							}
						});
					}else if(cnt > 0){
						Ext.Msg.alert('알림','이미 등록된 발주입니다.');
						return;
					}
				}
			});
		}
	},

	// 납기일자 일괄변경
	deliAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		var err_msg = "";

		if (!select || select.length > 1) {
			err_msg = "한 개의 목록만 선택해주세요.";

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		resource.loadPopup({
			widget : 'module-purcordr-deli-popup',
			param	: {
				select		: select,
			}
		});
	},

	// 납기일자 일괄변경
	deliAction2 :function() {
		var me = this,
			master = me.pocket.worker.lister(),
			select = master.getSelectionModel().getSelection()
		;
		var err_msg = "";

		if (master.getStore().data.items != 0) {
			resource.loadPopup({
				widget : 'module-purcordr-deli-popup2',
			});
		}
	},
});
