Ext.define('module.sale.order.saleorder2.SaleOrder2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.sale.order.saleorder2.model.SaleOrder2Invoice',
		'module.sale.order.saleorder2.model.SaleOrder2Master',
		'module.sale.order.saleorder2.model.SaleOrder2Detail',
		'module.sale.order.saleorder2.model.SaleOrder2File'
	],
	stores:[
		'module.sale.order.saleorder2.store.SaleOrder2Invoice',
		'module.sale.order.saleorder2.store.SaleOrder2Master',
		'module.sale.order.saleorder2.store.SaleOrder2Detail',
		'module.sale.order.saleorder2.store.SaleOrder2File'
	],
	views : [
		'module.sale.order.saleorder2.view.SaleOrder2Layout',
		/* 현황 */
		'module.sale.order.saleorder2.view.SaleOrder2Search',
		'module.sale.order.saleorder2.view.SaleOrder2ListerMaster',
		'module.sale.order.saleorder2.view.SaleOrder2ListerDetail',
		/* 작업 */
		'module.sale.order.saleorder2.view.SaleOrder2WorkerEditor',
		'module.sale.order.saleorder2.view.SaleOrder2WorkerSearch',
		'module.sale.order.saleorder2.view.SaleOrder2WorkerLister',
		'module.sale.order.saleorder2.view.SaleOrderCopyPopup',
		'module.sale.order.saleorder2.view.SaleOrder2File'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-saleorder2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-saleorder2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-saleorder2-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleorder2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-saleorder2-layout #mainpanel'									: { tabchange : me.mainTabChange  },

			'module-saleorder2-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction        }, /* 마감 */
			'module-saleorder2-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeAction        }, /* 마감취소 */
			'module-saleorder2-lister-master menuitem[action=okAction]'				: { click : me.okAction           }, /* 승인 */
			'module-saleorder2-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소 */

			'module-saleorder2-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-saleorder2-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-saleorder2-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 수주복사 */
			'module-saleorder2-lister-master button[action=orderAction]'			: { click : me.orderAction        }, /* 출고지시 */
			'module-saleorder2-lister-master button[action=etcPrintAction]'			: { click : me.invReportAction    }, /* 명세서 발행 */
			'module-saleorder2-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-saleorder2-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-saleorder2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-saleorder2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-saleorder2-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-saleorder2-lister-master button[action=uploadAction]'			: { click : me.excelUploadAction },
			'module-saleorder2-lister-master button[action=pasteUploadAction]'		: { click : me.pasteUploadAction }, /* 엑셀 붙여 넣기 액션 */

			'module-saleorder2-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-saleorder2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-saleorder2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-saleorder2-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-saleorder2-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-saleorder2-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-saleorder2-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-saleorder2-lister-detail')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-saleorder2-copy-popup')[0] },
		file  : function () { return Ext.ComponentQuery.query('module-saleorder2-file')[0] }
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
								url		: _global.location.http() + '/sale/order/saleorder2/set/ok.do',
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
				if (record.get("acpt_stat_dvcd") != "0011") {
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
								url		: _global.location.http() + '/sale/order/saleorder2/set/ok.do',
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
			values = me.pocket.search().getValues()
		;

		if(tindex==1){
			Ext.Msg.alert("알림","수주현황에서 조회해주십시오.");
		}else if(values.cstm_offr_date1>values.cstm_offr_date2){
			Ext.Msg.alert("알림","발주일자을 다시 입력해주십시오.");
		}else if(values.cstm_deli_date1>values.cstm_deli_date2){
			Ext.Msg.alert("알림","납기일자을 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master = me.pocket.lister.master(),
			tindex		= tabPanel.items.indexOf(newCard),
			record		= master.getSelectionModel().getSelection(),
			file = me.pocket.file()
		;
		if (tindex == 1) {
			if (!record || record.length!=1) {
				Ext.Msg.alert("알림", "수주현황을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'saleorder2' });
			file.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
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
				if (select.get("acpt_stat_dvcd") !== "0010") {
					if (_global.options.acpt_fix_yorn==1) {
						err_msg = "승인 또는 진행중인 오더는 수정할 수 없습니다.";
					}
				}
				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}
			editor.down('[name=invc_numb]').setReadOnly(true);
			if (select){
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
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
		editor.down('[name=invc_numb]').setReadOnly(false);
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
							invc_numb		: keygen.records[0].seq,
							cstm_deli_date	: Ext.Date.format(new Date(), 'Y-m-d')
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
			detail = me.pocket.lister.detail(),
			store	= master.getStore()
		;
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
							master.getSelectionModel().select(ms);
							master.getStore().reload();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-saleorder2-worker-search')[0].getForm().reset();
			}
		});
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
			widget : 'module-saleorder2-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			records = me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","출고지시 할 수주를 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("acpt_stat_dvcd") == '0010') {
					Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(미승인 오더)");
					return;
				}
				if (record.get('acpt_stat_dvcd') == '0200') {
					Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(출고지시 완료)");
					return;
				}
				if (record.get('acpt_stat_dvcd') !== '0011') {
					Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.");
					return;
				}
				if (record.get('line_clos') !== '0') {
					Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(마감된 오더)");
					return;
				}else{
					Ext.Msg.confirm("확인", "출고지시 하시겠습니까?", function(button) {
						if (button == 'yes') {
							Ext.each(records, function(record) {
								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder2/set/stps.do',
									method		: "POST",
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											invc_numb	: record.get('invc_numb'),
											stor_id		: _global.stor_id,
											hqof_idcd	: _global.hqof_idcd
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										Ext.Msg.alert("알림", "출고지시가 완료 되었습니다.");
										me.pocket.lister.master().getStore().reload();
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
										me.pocket.lister.master().getStore().loadData([],true);
										me.pocket.lister.detail().getStore().loadData([],false);
									}
								});
							});
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
				Ext.ComponentQuery.query('module-saleorder2-worker-search')[0].getForm().reset();
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
		if(records[0].get('acpt_stat_dvcd')=='0011'){
			Ext.Msg.alert("알림", "승인된 수주는 삭제할 수 없습니다.");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
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
					url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/saleorder2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn	: records[0].get('line_seqn')
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
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
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
			param  = me.pocket.search().getValues(),
			master = me.pocket.lister.master()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'file-upload-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/' + Const.UPLOAD.SAMPLE.ITEM
			},
			apiurl : {
				upload : _global.location.href + '/system/sale/order/saleorder2/excel.do', // url (필수)
			},
			params : {
				token	: _global.token_id,
				hq_id		: _global.hq_id,
				stor_id		: _global.stor_id,
				updt_idcd	: _global.login_pk,
				crte_idcd	: _global.login_pk
			},
			title			: '고객 수주내역 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
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
			url		: _global.api_host_info + '/system/sale/order/saleorder2/get/report.do',
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
					search		: _global.api_host_info + '/' + _global.app_site +'/sale/order/saleorder2/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/sale/order/saleorder2/get/printing.do',
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
	}

});
