Ext.define('module.prod.cvic.cvicchecktypeitem.CvicCheckTypeItem', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.BasePopup'
	],

	models:[
		'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemInvoice',
		'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemMaster',
		'module.prod.cvic.cvicchecktypeitem.model.CvicCheckTypeItemDetail'
	],
	stores:[
		'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemInvoice',
		'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemMaster',
		'module.prod.cvic.cvicchecktypeitem.store.CvicCheckTypeItemDetail'
	],
	views : [
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemLayout',
		/* 현황 */
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemSearch',
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemListerMaster',
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemListerDetail',
		/* 작업 */
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerEditor',
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerSearch',
		'module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemWorkerLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.joinPermission(workspace.down('module-cvicchecktypeitem-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-cvicchecktypeitem-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
	},
	init: function() {
		var me = this;
		me.control({
			'module-cvicchecktypeitem-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-cvicchecktypeitem-lister-master button[action=modifyAction]'		: { click : me.modifyAction       }, /* 수정 */
			'module-cvicchecktypeitem-lister-master button[action=exportAction]'		: { click : me.exportAction       }, /* 엑셀 */
			'module-cvicchecktypeitem-lister-master button[action=deleteAction]'		: { click : me.deleteAction       }, /* 삭제 */
			'module-cvicchecktypeitem-lister-detail button[action=exportAction]'		: { click : me.exportDetailAction }, /* 엑셀 */

			'module-cvicchecktypeitem-worker-lister button[action=updateAction]'		: { click : me.updateAction }, /* 저장 */
			'module-cvicchecktypeitem-worker-lister button[action=cancelAction]'		: { click : me.cancelAction }, /* 취소 */
			'module-cvicchecktypeitem-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-worker-lister')[0] }
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-cvicchecktypeitem-lister-detail')[0] }
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
			}, { chek_type_idcd : record.get('chek_type_idcd') });
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
			Ext.Msg.alert("알림", "점검유형 코드  1건을 선택 후 진행하십시오!");
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
				params	: {param:JSON.stringify({chek_type_idcd : select.get('chek_type_idcd') })},
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
				console.log(record);
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('chek_type_idcd', info.get('chek_type_idcd'));
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
								ms = master.getStore().findRecord('chek_type_idcd', record.get('chek_type_idcd'));
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
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-cvicchecktypeitem-worker-search')[0].getForm().reset();
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
				Ext.ComponentQuery.query('module-cvicchecktypeitem-worker-search')[0].getForm().reset();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/prod/cvic/cvicchecktypeitem/set/del_yn.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							chek_type_idcd	: records[0].get('chek_type_idcd'),
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