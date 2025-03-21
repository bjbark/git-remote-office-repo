
Ext.define('module.qc.basic.insptypeitem.InspTypeItem', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.InspTypePopup'
	],

	models:[
		'module.qc.basic.insptypeitem.model.InspTypeItemInvoice',
		'module.qc.basic.insptypeitem.model.InspTypeItemMaster',
		'module.qc.basic.insptypeitem.model.InspTypeItemDetail'
	],
	stores:[
		'module.qc.basic.insptypeitem.store.InspTypeItemInvoice',
		'module.qc.basic.insptypeitem.store.InspTypeItemMaster',
		'module.qc.basic.insptypeitem.store.InspTypeItemDetail'
	],
	views : [
		'module.qc.basic.insptypeitem.view.InspTypeItemLayout',
		/* 현황 */
		'module.qc.basic.insptypeitem.view.InspTypeItemSearch',
		'module.qc.basic.insptypeitem.view.InspTypeItemListerMaster',
		'module.qc.basic.insptypeitem.view.InspTypeItemListerDetail',
		/* 작업 */
		'module.qc.basic.insptypeitem.view.InspTypeItemWorkerEditor',
		'module.qc.basic.insptypeitem.view.InspTypeItemWorkerSearch',
		'module.qc.basic.insptypeitem.view.InspTypeItemWorkerLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-insptypeitem-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-insptypeitem-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
	},
	init: function() {
		var me = this;
		me.control({
			'module-insptypeitem-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-insptypeitem-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction        }, /* 마감 */
			'module-insptypeitem-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeAction        }, /* 마감취소 */

			'module-insptypeitem-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-insptypeitem-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-insptypeitem-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-insptypeitem-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-insptypeitem-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-insptypeitem-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-insptypeitem-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-insptypeitem-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-insptypeitem-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-insptypeitem-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-insptypeitem-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-insptypeitem-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-insptypeitem-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-insptypeitem-lister-detail')[0] }
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
		}
	},

	//조회
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
				} else { editor.getForm().reset(true); }
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
			}, { insp_type_idcd : record.get('insp_type_idcd') });
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;
		var records = me.pocket.lister.master().getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "검사유형 코드  1건을 선택 후 진행하십시오!");
			return;
		}

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 자료는 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		me.selectDetail;
		if (select){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ insp_type_idcd : select.get('insp_type_idcd') })},
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

	//신규
	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0] //인보이스 값 불러오기
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
	},

	//저장
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
					info.product().data.each( function( item ) {
						item.set('insp_type_idcd', info.get('insp_type_idcd'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					if (dirty) {
						info.setDirty();
					}
					results.feedback({success : true  });
				}
			},callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {
								ms = master.getStore().findRecord('insp_type_idcd', record.get('insp_type_idcd'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}

							detail.getStore().loadData(record.product().data.items, false);
							master.getStore().reload();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-insptypeitem-worker-search')[0].getForm().reset();
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
				Ext.ComponentQuery.query('module-insptypeitem-worker-search')[0].getForm().reset()      ;
			}
		});
	},

	//삭제
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
					url			: _global.api_host_info + '/' + _global.app_site + '/qc/basic/insptypeitem/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							insp_type_idcd	: records[0].get('insp_type_idcd'),
							upt_usr_nm		: _global.login_pk
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
	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});

