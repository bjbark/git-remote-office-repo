Ext.define('module.project.domainmanager.DomainManager', { extend:'Axt.app.Controller',
	requires: [
//	 	'system.Utility',
	 	'lookup.popup.project.RndWordPopup',
	 	'lookup.popup.project.DomainPopup',
        'lookup.upload.ItemUpload'
	],

	models:[
		'module.project.domainmanager.model.Domain',
		'module.project.domainmanager.model.Word',
		'module.project.domainmanager.model.TableMaster',
		'module.project.domainmanager.model.TableDetail',
		'module.project.domainmanager.model.Relation'
	],
	stores:[
		'module.project.domainmanager.store.Domain',
		'module.project.domainmanager.store.Word',
		'module.project.domainmanager.store.TableMaster',
		'module.project.domainmanager.store.TableDetail',
		'module.project.domainmanager.store.Relation'
    ],
	views	: [
	 	'module.project.domainmanager.view.DomainManagerLayout',
	 	'module.project.domainmanager.view.DomainManagerSearch',
	 	'module.project.domainmanager.view.DomainManagerLister',
	 	'module.project.domainmanager.view.DomainManagerListerW',
	 	'module.project.domainmanager.view.DomainManagerListerT',
	 	'module.project.domainmanager.view.DomainManagerListerTL',
	 	'module.project.domainmanager.view.DomainManagerListerTM',
	 	'module.project.domainmanager.view.DomainManagerListerRelation',
	 	'module.project.domainmanager.view.DomainManagerRelation',
	 	'module.project.domainmanager.view.DomainManagerEditor',
	 	'module.project.domainmanager.view.DomainManagerTableEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	/**
	 *
	 */
	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-domainmanager-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-domainmanager-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-domainmanager-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			'module-domainmanager-table-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-domainmanager-table-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-domainmanager-lister button[action=modifyAction]'    : { click : me.modifyAction }, // 수정
			'module-domainmanager-lister button[action=insertAction]'    : { click : me.insertAction }, // 신규
			'module-domainmanager-lister button[action=exportAction]'    : { click : me.exportAction }, // 엑셀
			'module-domainmanager-lister button[action=deleteAction]'    : { click : me.deleteAction }, // 삭제
			'module-domainmanager-lister-t button[action=modifyAction]'  : { click : me.modifyAction }, // 수정
			'module-domainmanager-lister-t button[action=insertAction]'  : { click : me.insertAction }, // 신규
			'module-domainmanager-lister-t button[action=exportAction]'  : { click : me.exportAction }, // 엑셀
			'module-domainmanager-lister-t button[action=deleteAction]'  : { click : me.deleteAction }, // 삭제
			'module-domainmanager-lister-tl button[action=updateAction]' : { click : me.updateTableListAction }, // 저장
			'module-domainmanager-lister-tl button[action=cancelAction]' : { click : me.cancelTableListAction }, // 취소
			'module-domainmanager-lister-w button[action=updateAction]'  : { click : me.updateDetailAction }, // 저장
			'module-domainmanager-lister-w button[action=cancelAction]'  : { click : me.cancelDetailAction }, // 취소
			'module-domainmanager-lister-relation button[action=relationAdd]'  : { click : me.relationAction },
			'module-domainmanager-lister-relation button[action=deleteAction]' : { click : me.relationDeleteAction },
			// lister event
			'module-domainmanager-lister-tm' : {
				selectionchange: me.selectTableRecord
			},

			'module-domainmanager-lister' : {
				selectionchange: me.selectRecord
			},
			'module-domainmanager-lister' : {
				selectionchange: me.attachRecord
			},
			'module-domainmanager-lister-t' : {
				selectionchange: me.attachRecord
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout    : function () { return Ext.ComponentQuery.query('module-domainmanager-layout')[0] },
		search    : function () { return Ext.ComponentQuery.query('module-domainmanager-search')[0] },
		editor    : function () { return Ext.ComponentQuery.query('module-domainmanager-editor')[0] },
		editor_t  : function () { return Ext.ComponentQuery.query('module-domainmanager-table-editor')[0] },
		lister    : function () { return Ext.ComponentQuery.query('module-domainmanager-lister')[0] },
		lister_w  : function () { return Ext.ComponentQuery.query('module-domainmanager-lister-w')[0] },
		lister_t  : function () { return Ext.ComponentQuery.query('module-domainmanager-lister-t')[0] },
		lister_tl : function () { return Ext.ComponentQuery.query('module-domainmanager-lister-tl')[0] },
		lister_tm : function () { return Ext.ComponentQuery.query('module-domainmanager-lister-tm')[0] },
		relation  : function () { return Ext.ComponentQuery.query('module-domainmanager-lister-relation')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if  (tindex == 0) {
			lister = me.pocket.lister_tm();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {}) );
		}else if (tindex==1){
			lister = me.pocket.lister();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {}) );
		}else if (tindex==2){
			lister = me.pocket.lister_w();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {}) );
		}else if (tindex==3){
			lister = me.pocket.lister_tl();
			console.debug(lister)
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {}) );
		}
	},

	/**
	 * 레코드 선택
	 */
	selectTableRecord:function( grid, records ){
		var me = this,
			lister = undefined,
			relation = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			record = records[0]
		;
		lister = me.pocket.lister_t();
		if (record) {
			var no = record.get('tabl_idcd');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { tabl_name : no }));
		};
		relation = me.pocket.relation();
		if (record) {
			var no = record.get('tabl_idcd');
			relation.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { mast_tabl : no }));
		};

	},
	/**
	 * 레코드 선택
	 */
	selectRecord:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			record = records[0]
		;
        if (tindex==0){
        	lister = me.pocket.lister_t();
			if (record) {
				var no = record.get('tabl_idcd');
				lister.select({
					callback : function(records, operation, success) {
						if (success) {
						} else { }
					}, scope    : me
				}, Ext.merge( param , { tabl_name : no }));
			}
        }else if(tindex==1){
        	lister = me.pocket.lister();
			if (record) {
				var no = record.get('tabl_idcd');
				lister.select({
					callback : function(records, operation, success) {
						if (success) {
						} else { }
					}, scope    : me
				}, Ext.merge( param , { tabl_name : no }));
			}
        }
	},
	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = undefined,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if (tindex==0) {
			editor = me.pocket.editor_t(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister_t()
		}else if(tindex==1){
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		};
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},



	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this,
			editor = undefined,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex==0) {
			editor = me.pocket.editor_t()
		}else if(tindex==1){
			editor = me.pocket.editor()
		};
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true , visible : true });
					me.pocket.layout().down('#tablemaster').setDisabled(true);
					me.pocket.layout().down('#domainlister').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(true);
				}
			}
		});
	},


	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = undefined,
			lister = undefined,
			select = undefined,
			search = me.pocket.search(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex == 0) {
			var  lister_m = me.pocket.lister_tm();
			editor	= me.pocket.editor_t();
			lister  = me.pocket.lister_t();
			select = lister_m.getSelectionModel().getSelection()[0];
			editor.insertRecord({
				action : Const.EDITOR.DEFAULT,
				record : Ext.create( lister.getStore().model.modelName,{
				tabl_idcd : select.get('id'),
				tabl_name : select.get('tabl_idcd'),
				prjt_dvsn : select.get('prjt_dvsn')
				}),
				disables : [ me.pocket.layout().down('#tablemaster') ],
				callback: function (results){
					if (results.success) {
						results.feedback({success : true });
					}
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
					}
				}
			});

		} else if (tindex == 1) {
			editor	= me.pocket.editor();
			lister  = me.pocket.lister();
			select = lister.getSelectionModel().getSelection()[0];
			editor.insertRecord({
				action : Const.EDITOR.DEFAULT,
				record : Ext.create( lister.getStore().model.modelName,{
	//				tabl_name : select.get('tabl_idcd')
				}),
				disables : [ me.pocket.layout().down('#domainlister') ],
				callback: function (results){
					if (results.success) {
						results.feedback({success : true });
					}
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
					}
				}
			});
		};
	},


	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = undefined,
			lister = undefined,
			store  = undefined,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex == 0) {
			editor = me.pocket.editor_t();
			lister = me.pocket.lister_t();
		} else if (tindex==1){
			editor = me.pocket.editor();
			lister = me.pocket.lister();
		};
		store  = lister.getStore();
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#tablemaster').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});
	},

	/**
	 * 저장
	 */
	updateDetailAction:function() {
		var me = this,
			detail = me.pocket.lister_w()
		;

		var dirty = 0;
		detail.getStore().each(function(record) {
			if (record.dirty) {
				dirty = true;
				record.data._flag = '1';
			}
		});

		if (!dirty) {
			Ext.Msg.alert("알림", "수정한 내용이 없습니다.");
			return;
		}

 		Ext.Msg.show({ title: '확인', msg: '저장하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
 			fn: function (button) {
 				if (button=='yes') {

 					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
 					mask.show();

 					detail.getStore().sync({
 						success : function(batch, operation){  /* 저장 성공시 */
 						},
 						failure : function(operation){  /* 저장 실패시 호출 */
 							detail.getStore().rejectChanges();
 						},
 						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
 							mask.hide();
 						}
 					});
 				}
 			}
 		});
	},
	/**
	 * 저장
	 */
	updateTableListAction:function() {
		var me = this,
			detail = me.pocket.lister_tl()
		;

		var dirty = 0;
		detail.getStore().each(function(record) {
			if (record.dirty) {
				dirty = true;
				record.data._flag = '1';
			}
		});

 		Ext.Msg.show({ title: '확인', msg: '저장하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
 			fn: function (button) {
 				if (button=='yes') {
 					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
 					mask.show();
 					detail.getStore().sync({
 						success : function(batch, operation){  /* 저장 성공시 */
 						},
 						failure : function(operation){  /* 저장 실패시 호출 */
 							detail.getStore().rejectChanges();
 						},
 						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
 							mask.hide();
 						}
 					});
 				}
 			}
 		});
	},


	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			editor = undefined,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex == 0) {
			editor = me.pocket.editor_t();
		} else if (tindex==1){
			editor = me.pocket.editor();
		}
		editor.cancelRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					results.feedback( {success : true , reload : true });
					me.pocket.layout().down('#tablemaster').setDisabled(false);
					me.pocket.layout().down('#domainlister').setDisabled(false);
					me.pocket.search().setDisabled(false);
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
	},

	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this,
			editor = undefined,
			lister = undefined,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if (tindex==0) {
			editor = me.pocket.editor_t();
			lister = me.pocket.lister_t();
		}else if(tindex==1){
			editor = me.pocket.editor(),
			lister = me.pocket.lister();
		};

		editor.deleteRecord({
			lister   : lister,
			callback : function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},
	/**
	 * 관계도 추가
	 */
	relationAction : function(){
		var me = this,
			lister = me.pocket.lister_tm(),
			record = lister.getSelectionModel().getSelection()[0],
			select = lister.getSelectionModel().getSelection()
	;
		if (select.length === 0  ){
			Ext.Msg.error('관계도를 추가할 테이블 1건을 선택 후 진행하십시오!');
			return;
		}

		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-domainmanager-relation',
			values : {	mast_tabl_nm	: record.get('tabl_name'),
						mast_tabl		: record.get('tabl_idcd')
				},
			params : { stor_grp : _global.stor_grp, stor_id : _global.stor_id, row_sts : '0',mast_tabl_nm : 'hq'  },
			result : function(records) {
				var search = records[0];
			}
		});
	},
	/**
	 * 관계도 삭제
	 */
	relationDeleteAction : function(){
		var me = this,
			lister = me.pocket.relation(),
			record = lister.getSelectionModel().getSelection()[0],
			select = lister.getSelectionModel().getSelection()
		;
		if (select.length === 0  ){
			Ext.Msg.error('삭제할 관계도를 선택한 후 진행하십시오!');
			return;
		}
		Ext.Ajax.request({
			url		: _global. location.http () + "/project/domain/delete/relation.do",
			method	: "POST",
			params	: {
				token: _global.token_id,
				param: JSON.stringify({
					relt_idcd			: record.get('relt_idcd')	/* 관계ID		*/
				})
			},
			success: function (response, request) {
				var result = Ext.decode(response.responseText);
				if (result.success){
				}else{
				}
			},
			failure: function (response, request) {},
			callback : function() {
			}
		})
	}
})

