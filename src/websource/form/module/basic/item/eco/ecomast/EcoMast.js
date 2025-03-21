Ext.define('module.basic.item.eco.ecomast.EcoMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemPopupKortc',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.UnitPopup'
	],

	models:[
		'module.basic.item.eco.ecomast.model.EcoMastInvoice',
		'module.basic.item.eco.ecomast.model.EcoMastMaster',
		'module.basic.item.eco.ecomast.model.EcoMastDetail2',
		'module.basic.item.eco.ecomast.model.EcoMastDetail'
	],
	stores:[
		'module.basic.item.eco.ecomast.store.EcoMastInvoice',
		'module.basic.item.eco.ecomast.store.EcoMastMaster',
		'module.basic.item.eco.ecomast.store.EcoMastPopup',
		'module.basic.item.eco.ecomast.store.EcoMastDetail',
		'module.basic.item.eco.ecomast.store.EcoMastDetail2'
	],
	views : [
		'module.basic.item.eco.ecomast.view.EcoMastLayout',
		/* 현황 */
		'module.basic.item.eco.ecomast.view.EcoMastSearch',
		'module.basic.item.eco.ecomast.view.EcoMastListerMaster',
		'module.basic.item.eco.ecomast.view.EcoMastListerDetail',
		'module.basic.item.eco.ecomast.view.EcoMastListerDetail2',
		/* 작업 */
		'module.basic.item.eco.ecomast.view.EcoMastWorkerEditor',
		'module.basic.item.eco.ecomast.view.EcoMastWorkerSearch',
		'module.basic.item.eco.ecomast.view.EcoMastWorkerLister',
		'module.basic.item.eco.ecomast.view.EcoMastPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-ecomast-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-ecomast-lister-master menuitem[action=okAction]'			: { click : me.okAction           }, /* 승인 */
			'module-ecomast-lister-master menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소 */
			'module-ecomast-lister-master button[action=CopyAction]'			: { click : me.CopyAction    	  }, /* 복사 */
			'module-ecomast-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-ecomast-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-ecomast-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-ecomast-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-ecomast-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-ecomast-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-ecomast-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2 }, /* 디테일삭제 */
			'module-ecomast-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-ecomast-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-ecomast-lister-detail2' : {
				selectionchange: me.selectRecord2												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-ecomast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-ecomast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-ecomast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-ecomast-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-ecomast-worker-search')[0] }
			},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-ecomast-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-ecomast-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-ecomast-lister-detail2')[0] }
			},
		popup : function () { return Ext.ComponentQuery.query('module-ecomast-popup')[0] },
	},

	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 ECO를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '변경하신 사항을 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '1'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/basic/item/eco/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										ecod_idcd		: record.get('ecod_idcd'),
										cofm_yorn		: '1',
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
									master.getStore().reload();
								}
							}   );
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
				if (record.get("cofm_yorn") != "1") {
					err_msg = "승인 해지할 수 없는 상태입니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 해지할 ECO를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '변경사항을 승인 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('cofm_yorn', '0'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/basic/item/eco/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										ecod_idcd		: record.get('ecod_idcd'),
										cofm_yorn		: '0',
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
									master.getStore().reload();
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
			editor = me.pocket.worker.editor()
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.worker.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	selectRecord:function( grid, records ){
		var me = this,

			popup = me.pocket.popup(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0];
		;
//		var form
//
//		if(popup){
//			form = popup.down('form');
//			form.loadRecord(select);
//		}
//		detail.getStore().clearData();
//		detail.getStore().loadData([],false);
	},

	selectRecord2:function( grid, records ){
		var me = this,

			popup = me.pocket.popup(),
			select = me.pocket.lister.detail2().getSelectionModel().getSelection()[0];
		;
		var form

		if(popup){
			form = popup.down('form');
			form.loadRecord(select);
		}
//		detail.getStore().clearData();
//		detail.getStore().loadData([],false);
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
			}, { ecod_idcd : record.get('ecod_idcd') });
		}
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		if (select && select.get("cofm_yorn")==0){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ /*prnt_item_idcd : select.get('prnt_item_idcd'),*/ecod_idcd : select.get('ecod_idcd') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}else{
			if(select){
				Ext.Msg.alert("알림", "승인된 내용은 수정할 수 없습니다.");
			}else{
				Ext.Msg.alert("알림", "수정할 ECO를 선택해주세요.");
			}
			return;
		}
	},

	CopyAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup(),
			select = master.getSelectionModel().getSelection()[0],
			detail2 = ""
		;
		var me = this
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'eco_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				ecod_idcd2 = result.records[0].seq;
				},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		if(select){
			var popup = resource.loadPopup({
				widget : 'module-ecomast-popup',
				params : {
					ecod_idcd  : select.get('ecod_idcd'),
				},
			});
			var form = popup.down('[itemId=plan]');
			form.loadRecord(select);

			setTimeout(function(){
				detail2	= me.pocket.lister.detail2();
				detail2.select({
					callback:function(records, operation, success) {
						if (success) {
//							detail2.getSelectionModel().select(0);
							Ext.ComponentQuery.query('#ecod_idcd2')[0].setValue(ecod_idcd2);
						} else { }
					}, scope:me
				}, Ext.merge( { ecod_idcd : select.get('ecod_idcd')}) );
			}, 100);
		}else{
			Ext.Msg.alert('알림','BOM을 선택해주세요.');
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
						table_nm: 'eco_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							ecod_idcd	: keygen.records[0].seq
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
			editor  = me.pocket.worker.editor(),
			lister  = me.pocket.worker.lister(),
			master  = me.pocket.lister.master(),
			detail  = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
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
					var items	= info.product().data.items;

					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('ecod_idcd', info.get('ecod_idcd'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.esti_qntt == 0){
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
								ms = master.getStore().findRecord('ecod_idcd', record.get('ecod_idcd'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-ecomast-worker-search')[0].getForm().reset();
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
				Ext.ComponentQuery.query('module-ecomast-worker-search')[0].getForm().reset();
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
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/basic/item/eco/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							ecod_idcd	: records[0].get('ecod_idcd'),
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
						me.pocket.lister.detail().getStore().loadData([],false);
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

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});
