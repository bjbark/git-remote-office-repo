Ext.define('module.custom.sjflv.mtrl.imp.estimast.EstiMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastInvoice',
		'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastMaster',
		'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastDetail',
		'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastFile',
		'module.custom.sjflv.mtrl.imp.estimast.model.EstiMastLister3'
	],
	stores:[
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastInvoice',
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastMaster',
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastDetail',
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastFile',
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister4',
		'module.custom.sjflv.mtrl.imp.estimast.store.EstiMastWorkerLister3'
	],
	views : [
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastLayout',
		/* 현황 */
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastSearch',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastListerMaster',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastListerDetail',
		/* 작업 */
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerEditor',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerEditor2',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerEditor3',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerSearch',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister2',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastWorkerLister3',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastLister2',
		'module.custom.sjflv.mtrl.imp.estimast.view.EstiMastCopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-estimast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-estimast-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-estimast-lister-master menuitem[action=closeActiveAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-estimast-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeAction        }, /* 마감취소 */
			'module-estimast-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-estimast-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-estimast-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 견적복사 */
			'module-estimast-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 견적등록 */
			'module-estimast-lister-master button[action=insertAction]'				: { click : me.insertAction       }, /* 등록 */
			'module-estimast-lister-master button[action=insAction	 ]'				: { click : me.insAction          }, /* 등록 */
			'module-estimast-lister-master button[action=modifyAction]'				: { click : me.modifyAction       }, /* 수정 */
			'module-estimast-lister-master button[action=exportAction]'				: { click : me.exportAction       }, /* 엑셀 */
			'module-estimast-lister-master button[action=deleteAction]'				: { click : me.deleteAction       }, /* 삭제 */
			'module-estimast-lister-detail button[action=exportAction]'				: { click : me.exportDetailAction }, /* 엑셀 */
			'module-estimast-lister-master button[action=printAction]'				: { click : me.printAction        }, /* 견적서발행 */

			'module-estimast-worker-lister button[action=deleteAction]	'			: { click : me.deleteAction2       }, /* 디테일삭제 */

			'module-estimast-worker-editor button[action=updateAction]'				: { click : me.updateAction }, /* 저장 */
			'module-estimast-worker-editor button[action=cancelAction]'				: { click : me.cancelAction }, /* 저장 */

			'module-estimast-worker-lister button[action=updateAction]'				: { click : me.updateAction2 }, /* 저장 */
			'module-estimast-worker-lister button[action=cancelAction]'				: { click : me.cancelAction2 }, /* 취소 */

			'module-estimast-worker-lister2 button[action=updateAction]'				: { click : me.updateAction3 }, /* 저장 */
			'module-estimast-worker-lister2 button[action=cancelAction]'				: { click : me.cancelAction3 }, /* 취소 */
			'module-estimast-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-estimast-worker-lister3' : {
				itemdblclick    : me.selectDetail2,
				selectionchange : me.selectRecord2
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estimast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estimast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor2')[0] },
			editor3 : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor3')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estimast-worker-lister')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-estimast-worker-lister2')[0] },
			lister3 : function () { return Ext.ComponentQuery.query('module-estimast-worker-lister3')[0] },
			search : function () { return Ext.ComponentQuery.query('module-estimast-worker-search')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-estimast-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-estimast-copy-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-estimast-lister2')[0] }
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
			Ext.Msg.alert("알림", "마감할 견적을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
//							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/order/estimast/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'esti_mast'
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
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/order/estimast/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'esti_mast'
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
			editor2	= this.pocket.worker.editor2(),
			editor	= this.pocket.worker.editor(),
			lister	= me.pocket.lister.master(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true) , me.pocket.editor2().getForm().reset(true) ; }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail(),
			lister2 = me.pocket.lister2(),
			workerlister = me.pocket.worker.lister()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

		workerlister.getStore().clearData();
		workerlister.getStore().loadData([],false);
	},

	selectRecord2:function( grid, records ){
		var me = this
			workerlister = me.pocket.worker.lister2()
		;

		workerlister.getStore().clearData();
		workerlister.getStore().loadData([],false);
	},


	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail(),
			lister2 = me.pocket.lister2()
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
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true) , me.pocket.editor2().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'),orgn_dvcd : 'esti_mast' });
			lister2.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},

	selectDetail2 : function(grid, record) {
		var me = this,
			lister = me.pocket.worker.lister2()
//			lister2 = me.pocket.lister2()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		console.log(record.get('invc_numb'));
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/mtrl/imp/estimast/get/bom.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					invc_numb		: record.get('invc_numb'),
					line_seqn		: record.get('line_seqn'),
					item_idcd		: record.get('item_idcd'),
					assi_seqn		: record.get('assi_seqn'),
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

					Ext.each(result.records,function(record){
						data = Ext.create(lister.getStore().model.modelName,record);
						lister.getStore().add(data);
					})
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			listermaster = me.pocket.lister.master(),
			mrecord      = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			lister = me.pocket.lister.detail()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 견적입니다.";
			}
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (select){
			editor.selectRecord({ lister : listermaster, record : mrecord }, me);
			editor.modifyRecord({
				caller   : me,
				action   : Const.EDITOR.DEFAULT ,
				callback : function( results ) {
					if (results.success){
						lister.getStore().clearData();
						lister.getStore().loadData([],false);
						results.feedback({success : true});
					}
				},
				finished : function(results, record){
					if (results.success){
						me.pocket.layout().down('#master').setDisabled(true);
						me.pocket.layout().down('#detail').setDisabled(true);
						me.pocket.search().setDisabled(true);
						editor.expand(false);
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search        = me.pocket.search(),
			lister        = me.pocket.lister.master(),
//			paylister     = me.pocket.worker.lister(),
			editor        = me.pocket.worker.editor(),
			param         = search.getValues()
//			mrecord       = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();
//		lister.getStore().clearData();
//		lister.getStore().loadData([],false);
//
//		editor.down('[name=cstm_name]').setReadOnly(false);
//		editor.down('[name=invc_date]').setReadOnly(false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'esti_mast'
					})
				}
			},

			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
					action : Const.EDITOR.DEFAULT,
					record : Ext.create( lister.getStore().model.modelName,{
						invc_numb		: keygen.records[0].seq,
						esti_vald_term	: '발행일 기준 6개월',
						emp_id			: _global.emp_id,
						emp_nm			: _global.emp_nm
					}),
					callback: function (results){
						if (results.success) {
							me.pocket.layout().down('#master').setDisabled(true);
							me.pocket.layout().down('#detail').setDisabled(true);
							me.pocket.search().setDisabled(true);
							editor.expand(false);
							setTimeout(function(){
//								editor.down('[name=dlvy_cstm_name]').focus(true , 10);
							},200);
							results.feedback({success : true});
						}
					},
					finished : function(results, record){
					}
				})
				}
			}
		});
	},

	updateAction:function() {
		var me = this,
			editor	= me.pocket.worker.editor(),
			master	= me.pocket.lister.master(),
			store	= master.getStore(),
			lister	= me.pocket.lister.detail(),
			records	= editor.getRecord(),
			invc_numb, line_seqn, line_ordr,
			select	= master.getSelectionModel().getSelection()[0],
			values	= editor.getForm().getValues(),
			row = store.indexOf(select)
		;

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			callback : function(results, record ) {
				if (results.success) {
					store.each(function(findrecord){
//						findrecord.set('mtrl_seqn',line_seqn);
					});
					store.sync({
						success : function(operation){
							lister.getStore().clearData();
							lister.getStore().loadData([],false);
							me.selectAction();
							me.pocket.layout().down('#mainpanel').setDisabled(false);
							me.pocket.layout().down('#master').setDisabled(false);
							me.pocket.layout().down('#detail').setDisabled(false);
							me.pocket.search().setDisabled(false);
							editor.getForm().reset();
							editor.collapse(false);
								switch (operation) {
								}

							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });
						},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
				}
			}
		});
	},

	updateAction2:function() {
		var me = this,
			lister  = me.pocket.worker.lister(),
			editor  = me.pocket.worker.editor2(),
			master  = me.pocket.lister.master(),
			detail  = me.pocket.lister.detail(),
			store   = lister.getStore(),
			field   = editor.getForm().getValues(),
			changes = store.getNewRecords().length,
			removes = store.getRemovedRecords().length,
			check=1
		;

		if(check==1){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.INSERT.mask });
			mask.show();
			lister.getStore().sync({
				success : function(operation){
					detail.getStore().clearData();
					detail.getStore().loadData([],false);
					master.getStore().reload();
					me.pocket.layout().getLayout().setActiveItem(0);
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
		}
	},

//	updateAction3:function() {
//		var me = this,
//			editor3 = me.pocket.worker.editor3(),
//			lister2 = me.pocket.worker.lister2(),
//			lister3 = me.pocket.worker.lister3(),
//			search = me.pocket.search(),
//			master = me.pocket.lister.master(),
//			record = lister3.getSelectionModel().getSelection(),
//			store	= master.getStore(),
//			store3	= lister3.getStore(),
//			param	= search.getValues()
//		;
//
//		lister2.getStore().sync({
//			success : function(operation){
//				Ext.Msg.alert("알림", "저장이 완료되었습니다.");
//			},
//			failure : function(operation){ },
//			callback: function(operation){
////				mask.hide();
//			}
//		});
//	},

	updateAction3:function() {
		var me = this,
			editor = me.pocket.worker.editor3(),
			lister2 = me.pocket.worker.lister2(),
			lister3 = me.pocket.worker.lister3(),
//			search = me.pocket.worker.search(),
			master = me.pocket.lister.master(),
			record = lister3.getSelectionModel().getSelection(),
			record2 = lister2.getSelectionModel().getSelection(),
			store	= master.getStore(),
			store3	= lister3.getStore(),
//			param	= search.getValues()
			detail  = me.pocket.lister.detail(),
			check=1
		;

//		console.log(record[0].get('invc_numb'));
//		console.log(record[0].get('line_seqn'));

		lister2.getStore().sync({
			success : function(operation){
				Ext.Msg.alert("알림", "저장이 완료되었습니다.");
			},
			failure : function(operation){ },
			callback: function(operation){
			}
		});

//		if(check==1){
//			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.INSERT.mask });
//			mask.show();
//			lister2.getStore().sync({
//				success : function(operation){
//					detail.getStore().clearData();
//					detail.getStore().loadData([],false);
////					master.getStore().reload();
//					me.pocket.layout().getLayout().setActiveItem(0);
//				},
//				failure : function(operation){ },
//				callback: function(operation){
//					mask.hide();
//				}
//			});
//		}

//		console.log(record2[0].get('line_seqn'));
//		Ext.Ajax.request({
//			url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/imp/estimast/set/item.do',
//			method		: "POST",
//			params		: {
//				token	: _global.token_id,
//				param	: Ext.encode({
//					invc_numb	: record[0].get('invc_numb'),
//					line_seqn	: record2[0].get('line_seqn'),
//					item_idcd	: record[0].get('item_idcd'),
//					amnd_degr	: record[0].get('amnd_degr'),
//					assi_seqn	: record2[0].get('assi_seqn'),
//				})
//			},
//			success : function(response, request) {
//				var object = response,
//					result = Ext.decode(object.responseText)
//				;
//				Ext.Msg.alert("알림", "저장이 완료되었습니다.");
//			},
//			failure : function(response, request) {
//				resource.httpError(response);
//			},
//			callback : function() {
//
//			}
//		});
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
			widget : 'module-estimast-copy-popup',
			params : {
				invc_numb : records[0].get('invc_numb'),
				cstm_name : records[0].get('cstm_name'),
				cstm_idcd : records[0].get('cstm_idcd'),
			},
		});
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master()
		;
		if(select){
			console.log(select);
			if  (select.get('acpt_cofm_yorn') !== '0') {
				Ext.Msg.alert("알림", "이미 수주등록이 완료된 견적입니다.");
				return;
			}

			Ext.Msg.confirm("확인", "수주등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select.get('invc_numb'),
								deli_date	: select.get('deli_date'),
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								master.getStore().reload();
								Ext.Msg.alert("알림","등록이 완료 되었습니다.");
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
							me.pocket.lister.detail().getStore().loadData([],false);
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","등록할 견적을 선택해주십시오.");
		}
	},

	// worker 취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
//			listermaster = me.pocket.lister.master()
		;
		editor.cancelRecord({
			caller : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				editor.getForm().reset(true);
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
				results.feedback( {success : true, visible : true, selectDetail : false });
			},
			finished : function(results){
				if (results.success){
					editor.collapse(false);
				}
			}
		}, me);
	},

//	cancelAction2:function() {
//		var	me		= this,
//		editor	= me.pocket.worker.editor()
//		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		me.pocket.layout().getLayout().setActiveItem(window.tabActive);
//	},

	cancelAction2:function() {
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
				Ext.ComponentQuery.query('module-estimast-search')[0].getForm().reset();
			}
		});
	},

	cancelAction3:function( grid, records ){
		var me = this,
		master = me.pocket.lister.master(),
		detail = me.pocket.lister.detail()
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		me.pocket.layout().getLayout().setActiveItem(0);
		master.getStore().reload();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/del_yn.do',
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

	// 견적서 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			select = master.getSelectionModel().getSelection(),
			select2 = detail.getSelectionModel().getSelection(),
			jrf = 'sjung_print_sheet2.jrf',
			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		var invc_numb = select[0].get('invc_numb');
//		var line_stat = select[0].get('line_stat');
		var arg =	'invc_numb~'+invc_numb+'~';
//		var arg = 'invc_nummb~'+param.invc_nummb+'~line_stat~'+param.line_stat+'~cstm_idcd~'+param.cstm_idcd+'~drtr_idcd~'+param.drtr_idcd+'~item_idcd~'+param.item_idcd;


		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';


		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	deleteAction2:function(){
		var me = this,
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;
		console.log(record);
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





	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});
