
Ext.define('module.custom.hantop.mtrl.po.purcordr.PurcOrdr', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.HntopItemPopup2'
	],

	models:[
		'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrInvoice',
		'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrMaster',
		'module.custom.hantop.mtrl.po.purcordr.model.PurcOrdrDetail',
	],
	stores:[
		'module.custom.hantop.mtrl.po.purcordr.store.PurcOrdrInvoice',
		'module.custom.hantop.mtrl.po.purcordr.store.PurcOrdrMaster',
		'module.custom.hantop.mtrl.po.purcordr.store.PurcOrdrDetail',
	],
	views : [
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrLayout',
		/* 현황 */
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrSearch',
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrListerMaster',
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrListerDetail',
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrIsttPopup',
		/* 작업 */
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrWorkerEditor',
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrWorkerSearch',
		'module.custom.hantop.mtrl.po.purcordr.view.PurcOrdrWorkerLister',

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
			'module-purcordr-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-purcordr-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-purcordr-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-purcordr-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-purcordr-lister-master button[action=writeAction]'			: { click : me.PrintAction        }, /* 발주서발행*/
			'module-purcordr-lister-master button[action=isttAction2]'			: { click : me.isttAction2        }, /* 입고접수 */
			'module-purcordr-lister-master menuitem[action=okAction]'			: { click : me.okAction           }, /* 승인 */
			'module-purcordr-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소 */

			'module-purcordr-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-purcordr-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2      }, /*디테일삭제*/

			'module-purcordr-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-purcordr-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */

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
			detail : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail')[0] }
		}
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

	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("purc_stat_dvcd") == "0011") {
					err_msg = "이미 승인되었습니다.";
				}
				if (record.get("purc_stat_dvcd") != "0010") {
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
								url		: _global.location.http() + '/custom/hantop/mtrl/po/purcordr/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										purc_stat_dvcd	: '0011',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										mngt_bzpl_idcd	: record.get('mngt_bzpl_idcd'),
										wrhs_idcd		: record.get('wrhs_idcd'),
										lgin_idcd		: _global.login_pk
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
				if (record.get("purc_stat_dvcd") != "0011" || record.get("cnt") > 0 || record.get("pdsd_yorn") == 1 || record.get("pdsd_yorn") == 'Y') {
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
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hantop/mtrl/po/purcordr/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										purc_stat_dvcd	: '0010',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										lgin_idcd		: _global.login_pk
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
										if(result.records){
											Ext.Msg.alert("알림", "승인해지 권한이 없습니다.");
											return;
										}else{
											Ext.each(select, function(record) {
												record.dirtyValue('purc_stat_dvcd', '0010'); // 0010:승인대기 / 0011:승인완료
												record.store.commitChanges();
											});
										}
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
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			master = me.pocket.lister.master(),
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
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

		if(select.data.purc_stat_dvcd == "0011"){
			Ext.Msg.alert("알림","승인완료된 발주서는 수정 할 수 없습니다.");
			return;
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
						table_nm: 'purc_ordr_mast'
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
							user_name	: _global.login_nm,
							drtr_idcd	: _global.login_id
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
			store	= master.getStore()
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				for(var i=0;i<record.productStore.data.items.length;i++){
					var deli2 = record.productStore.data.items[i].data.deli_date2;
					if(deli2 == '' || deli2 == null){
						Ext.Msg.alert("알림","납기일자를 입력하여 주시기 바랍니다.");
						return;
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
							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
//							lister.select({
//								callback:function(records, operation, success) {
//									if (success) {
////										lister.getStore().load();
////										lister.getSelectionModel().select(0);
//									} else { me.pocket.editor().getForm().reset(true); }
//								}, scope:me
//							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
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
			store  = master.getStore(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]
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

		if(select.data.purc_stat_dvcd == "0011"){
			Ext.Msg.alert("알림","승인완료된 발주서는 삭제 할 수 없습니다.");
			return;
		}


		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/hantop/mtrl/po/purcordr/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							qty			: records[0].get('offr_qntt'),
							upt_usr_nm	: _global.login_pk
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
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/custom/hantop/mtrl/po/purcordr/set/del_yn2.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: records[i].get('invc_numb'),
									line_seqn	: records[i].get('line_seqn')
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									store.remove(records[0]);
									store.reload();
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
//					if(record.data.modi_yorn=='n'){
//						record.set('modi_yorn','y');
//						record.store.commitChanges();
//					}
				}
			}
		});
	},


	// 발주서 발행
	PrintAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if(resId == 'N1000HNTOP'){
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'hntop_purcordr_report.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}

		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}
	},
	// 입고접수
	isttAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]

		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		var me = this
		if(!select){
			Ext.Msg.alert("알림","입고접수할 목록을 선택해주십시오.");
		}else if(select.data.line_clos != 0){
			Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
		}else if(select.data.purc_stat_dvcd == "0010"){
			Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.(미승인 오더).");
		}else{
			resource.loadPopup({
				widget : 'module-purcordr-istt-popup'
			});
			var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		}
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
			url		: _global.api_host_info + '/system/custom/hantop/mtrl/po/purcordr/get/report.do',
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
});
