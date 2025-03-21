Ext.define('module.custom.kortc.prod.rsvdorder.RsvdOrder', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.upload.FileUpload',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.CvicPopup',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderProdPopup',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderCopyPopup'
	],

	models:[
		'module.custom.kortc.prod.rsvdorder.model.RsvdOrderInvoice',
		'module.custom.kortc.prod.rsvdorder.model.RsvdOrderMaster',
		'module.custom.kortc.prod.rsvdorder.model.RsvdOrderDetail'
	],
	stores:[
		'module.custom.kortc.prod.rsvdorder.store.RsvdOrderInvoice',
		'module.custom.kortc.prod.rsvdorder.store.RsvdOrderMaster',
		'module.custom.kortc.prod.rsvdorder.store.RsvdOrderDetail'
	],
	views : [
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderLayout',
		/* 현황 */
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderSearch',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderListerMaster',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderListerMaster2',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderListerDetail',
		/* 작업 */
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderWorkerEditor',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderWorkerSearch',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderWorkerLister',
		'module.custom.kortc.prod.rsvdorder.view.RsvdOrderCopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-rsvdorder-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-rsvdorder-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-rsvdorder-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-rsvdorder-layout button[action=selectAction]'					: { click : me.selectAction		}, /* 조회		*/

			'module-rsvdorder-lister-master menuitem[action=okAction]'				: { click : me.okAction			}, /* 승인		*/
			'module-rsvdorder-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction	}, /* 해지		*/

			'module-rsvdorder-lister-master menuitem[action=closeAction]'			: { click : me.closeAction		}, /* 마감		*/
			'module-rsvdorder-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction}, /* 마감해지	*/
			'module-rsvdorder-lister-master button[action=copyAction]'				: { click : me.copyAction		}, /* 수주복사	*/
			'module-rsvdorder-lister-detail button[action=insertAction]'			: { click : me.insertAction		}, /* 등록		*/
			'module-rsvdorder-lister-detail button[action=modifyAction]'			: { click : me.modifyAction		}, /* 수정		*/
			'module-rsvdorder-lister-detail button[action=exportAction]'			: { click : me.exportAction		}, /* 엑셀		*/
			'module-rsvdorder-lister-detail button[action=deleteAction]'			: { click : me.deleteAction		}, /* 삭제		*/

			'module-rsvdorder-worker-lister button[action=updateAction]'			: { click : me.updateAction		}, /* 저장		*/
			'module-rsvdorder-worker-lister button[action=cancelAction]'			: { click : me.cancelAction		}, /* 취소		*/
			'module-rsvdorder-lister-master' : {
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-rsvdorder-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-rsvdorder-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-rsvdorder-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-rsvdorder-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-rsvdorder-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-rsvdorder-lister-detail')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-rsvdorder-copy-popup')[0] },
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
								url		: _global.location.http() + '/prod/plan/rsvdorder/set/ok.do',
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
				console.log(record.get('cnt'));
				if (record.get("acpt_stat_dvcd") != "0011" || record.get('cnt')>0) {
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
								url		: _global.location.http() + '/prod/plan/rsvdorder/set/ok.do',
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
		if (records[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : records[0].get('invc_numb') });
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
					err_msg = "승인 또는 진행중인 오더는 수정할 수 없습니다.";
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
							editor.down('[name=chk]').setValue('Y');
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
							deli_date	: Ext.Date.format(new Date(), 'Y-m-d')
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
						items	= info.product().data.items
					;
					for(var i=0;i<items.length;i++){
						if(items[i].data.deli_date == null || items[i].data.deli_date == '' ){
							Ext.Msg.alert("알림","각 품목의 납기일자를 입력하여 주시기 바랍니다.");
							return;
						}
					}
					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						item.set('wrhs_idcd', info.data.wrhs_idcd);
					});
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
			Ext.ComponentQuery.query('module-rsvdorder-worker-search')[0].getForm().reset();
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
			widget : 'module-rsvdorder-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
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
				Ext.ComponentQuery.query('module-rsvdorder-worker-search')[0].getForm().reset();
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
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
				if(record.get("acpt_stat_dvcd") == "0011"){
					err_msg = "승인완료되어 삭제할 수 없습니다.";
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
					url			: _global.api_host_info + '/' + _global.app_site + '/prod/plan/rsvdorder/set/del_yn.do',
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
	prorAction:function(){																	//TODO pror
		var me				= this,
			select = me.pocket.lister.detail().getSelectionModel().getSelection()[0],
			record = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			detail = me.pocket.lister.detail()
		;

		if(!select){
			Ext.Msg.alert('알림','생산지시할 수주내역을 반드시 선택하여 주십시오.');
		}else if(select.get('pdsd_yorn')!='0'){
			Ext.Msg.alert('알림','생산지시 할 수 없는 상태입니다.(이미 지시된 상태)');
		}else if(record.data.acpt_stat_dvcd!='0011'){
			Ext.Msg.alert('알림','생산지시 할 수 없는 상태입니다.(미승인 오더)');
		}else{
			resource.loadPopup({
				widget : 'module-rsvdorder-prod-popup',
			});
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});

	}
});
