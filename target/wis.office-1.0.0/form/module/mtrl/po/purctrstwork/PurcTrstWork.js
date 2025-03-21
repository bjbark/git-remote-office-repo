
Ext.define('module.mtrl.po.purctrstwork.PurcTrstWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
	],

	models:[
		'module.mtrl.po.purctrstwork.model.PurcTrstWorkInvoice',
		'module.mtrl.po.purctrstwork.model.PurcTrstWorkMaster',
		'module.mtrl.po.purctrstwork.model.PurcTrstWorkDetail',
		'module.mtrl.po.purctrstwork.model.PurcTrstWorkInsertPopup'

	],
	stores:[
		'module.mtrl.po.purctrstwork.store.PurcTrstWorkInvoice',
		'module.mtrl.po.purctrstwork.store.PurcTrstWorkMaster',
		'module.mtrl.po.purctrstwork.store.PurcTrstWorkDetail',
		'module.mtrl.po.purctrstwork.store.PurcTrstWorkInsertPopup'

	],
	views : [
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkLayout',
		/* 현황 */
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkSearch',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkListerMaster',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkListerDetail',
		/* 작업 */
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkWorkerEditor',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkWorkerSearch',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkWorkerLister',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkPopup',
		'module.mtrl.po.purctrstwork.view.PurcTrstWorkInsertPopup'


	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-mtrl-po-purctrstwork-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purctrstwork-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-purctrstwork-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-purctrstwork-lister-master menuitem[action=closecancleAction]'	: { click : me.closecancleAction  }, /* 마감해지 */

			'module-purctrstwork-lister-detail button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-purctrstwork-lister-detail button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-purctrstwork-lister-detail button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-purctrstwork-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-purctrstwork-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-purctrstwork-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-purctrstwork-worker-lister button[action=itemAction]'			: { click : me.itemAction }, /* 품목추가 */
			'module-purctrstwork-worker-lister button[action=itemupdateAction]'		: { click : me.itemupdateAction }, /* 품목지정 */
			'module-purctrstwork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purctrstwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purctrstwork-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purctrstwork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purctrstwork-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-purctrstwork-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-purctrstwork-lister-detail')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-purctrstwork-popup')[0] }
	},


	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor()
		;

		var me = this,
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
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},
	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
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

	itemAction:function() {
		var me = this,
			store	= Ext.ComponentQuery.query('module-purctrstwork-worker-lister')[0].getStore()
			;

		resource.loadPopup({
			widget : 'module-purctrstwork-popup',
			params : {
			},
			result : function(records) {
				var record = Ext.create( store.model.modelName, {
					item_name	: records.item_name,
					item_spec	: records.item_spec,
					line_seqn   : store.data.length + 1,
					reqt_qntt   : 1
				});
				store.add(record);
				record.commit();
			}
		});
	},


	itemupdateAction:function() {
		var me = this,
			store = Ext.ComponentQuery.query('module-purctrstwork-worker-lister')[0].getStore(),
			line_seqn = 0
		;

		resource.loadPopup({
			widget : 'lookup-item-popup',
			params : {
				acct_bacd	: _global.options.mes_system_type=='SJFLV'?'삼정(구매발주)':'',
			},
			result	: function(records) {
				store.each(function(record){
					line_seqn = record.get('line_seqn');
				});

				Ext.each(records, function(record, index) {
					line_seqn = line_seqn + 1;
					var rec = Ext.create( store.model.modelName , {
						item_idcd	: record.data.item_idcd,
						item_code	: record.data.item_code,
						item_name	: record.data.item_name,
						item_spec	: record.data.item_spec,
						line_seqn   : line_seqn,
						reqt_qntt   : 1
					});
					store.add(rec);
					record.commit();
				});
			}
		});
	},


	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		var err_msg = "";
		if (select){
			if (select.get("offr_proc_dvcd") == "Y") {
				err_msg = "발주 등록되어 수정할 수 없습니다.";
			}
			if (select.get("line_clos") == "1") {
				err_msg = "마감되어 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
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
						table_nm: 'purc_trst_mast'
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
			store	= master.getStore(),
			store3	= lister.getStore(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			param  = editor.getValues()
		;

		if (param.bzpl_idcd==''){
			Ext.Msg.alert("알림","사업장을 반드시 입력해주십시오.");
			return;
		}
		if (param.invc_date==''){
			Ext.Msg.alert("알림","요청일자 반드시 입력해주십시오.");
			return;
		}
		if (param.drtr_idcd==''){
			Ext.Msg.alert("알림","담당자를 반드시 입력해주십시오.");
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
							store3.remove(item);
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
							}
							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
				master.getStore().load();
				Ext.ComponentQuery.query('module-purctrstwork-worker-search')[0].getForm().reset();
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
				Ext.ComponentQuery.query('module-purctrstwork-worker-search')[0].getForm().reset();
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

		if (!records || records.length != 1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("offr_proc_dvcd") == "Y") {
					err_msg = "발주 등록되어 삭제할 수 없습니다.";
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
					url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purctrstwork/set/del_yn.do',
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
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
	},

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.lister.master().getSelectionModel().getSelection(),
			listermaster = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '1') {
					err_msg = "마감할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 입고 목록을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '1');
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/stock/etcisttwork/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1'
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

	//마감해지
	closecancleAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.lister.master().getSelectionModel().getSelection(),
			listermaster = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') != '1') {
					err_msg = "마감 해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 입고내역을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '0');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/stock/etcisttwork/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0'
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

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},


});
