Ext.define('module.project.projword.ProjWord', { extend:'Axt.app.Controller',
	requires: [
		'lookup.popup.project.BonsaPopup'
	],

	models:['module.project.projword.model.ProjWord'],
	stores:['module.project.projword.store.ProjWord'],
	views: [
	 	'module.project.projword.view.ProjWordLayout',
	 	'module.project.projword.view.ProjWordSearch',
	 	'module.project.projword.view.ProjWordLister',
	 	'module.project.projword.view.ProjWordEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-projword-layout button[action=selectAction]' : { click : me.selectAction }, // 조회

			'module-projword-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-projword-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소

			'module-projword-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-projword-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-projword-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-projword-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			'module-projword-lister button[action=copyAction]'   : { click : me.copyAction },   // 단어 이관
			'module-projword-lister button[action=copyAllAction]': { click : me.copyAllAction },   // 단어 배포
			'module-projword-lister button[action=createAction]' : { click : me.createAction },   // 단어 이관
			'module-projword-lister button[action=makeAction]'   : { click : me.makeAction },   // 단어 이관
			'module-projword-lister' : {
				selectionchange: me.attachRecord
			},
			'module-projword-search combobox[name=pjt_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-projword-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-projword-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-projword-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-projword-lister')[0] }
	},

	/*
	 *
	 */
	selectLookup:function() {
		 this.pocket.lister().eraser();
	},

	/**
	 *
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		console.debug(_global.solution);
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), {}) );
	},

	/**
	 *
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},


	/**
	 *
	 */
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true});
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},


	/**
	*
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
				pjt_id : search.getValues().pjt_id
			}),
			disables : [ me.pocket.layout().down('#mainpanel') ],
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
	},

	/**
	 *
	 */
	updateAction:function() {
		var me = this,
			editor  = me.pocket.editor(),
			lister  = me.pocket.lister(),
			search  = me.pocket.search(),
			store   = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					record.dirtyValue('hqof_idcd' , search.down('[name=hqof_idcd]').getValue())
					if (record.phantom && Ext.isEmpty(record.get('word_idcd'))) {
						resource.keygen({
							url    : _global. location.http () + '/listener/seq/maxid.do',
							object : resource. keygen,
							params : {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'word_mast'
								 })
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('word_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},
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
	*
	*/
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					results.feedback( {success : true , reload : true });
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
	 *
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });},
					failure : function(operation){ results.feedback({success : false }); },
					callback: function(operation){ results.callback({}); }
				});
			}
		}, me);
	},

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	copyAllAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			cnt = 0
		;
		Ext.Msg.show({ title: '확인', msg: '관제용 표준단어를 각 고객사 단어로 일괄 배포하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/project/projword/set/wordallcopy.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								hqof_idcd	: search.down('[name=hqof_idcd]').getValue(),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(result.success ){
								if(result.records[0]){
									cnt = result.records[0].table_rows;
								}
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});
	},
	copyAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			cnt = 0
		;
		if (search.down('[name=hqof_idcd]').getValue() == "") {
			Ext.Msg.alert("알림", "이관할 회사를 선택하여 주시기 바랍니다.");
			return;
		}
		Ext.Msg.show({ title: '확인', msg: '선택하신 고객사의 단어를 이관하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/project/projword/set/wordcopy.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								hqof_idcd	: search.down('[name=hqof_idcd]').getValue(),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(result.success ){
								if(result.records[0]){
									cnt = result.records[0].table_rows;
								}
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});
	},
	makeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			cnt = 0
		;
		if (search.down('[name=hqof_idcd]').getValue() == "") {
			Ext.Msg.alert("알림", "적용할 회사를 선택하여 주시기 바랍니다.");
			return;
		}
		if (search.down('[name=hqof_idcd]').getValue() == "common") {
			Ext.Msg.alert("알림", "관제 시스템으로 이관은 불가능합니다.(다른 고객사를 선택하세요.)");
			return;
		}
		Ext.Msg.show({ title: '확인', msg: '선택하신 고객사의 단어를 작성하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/project/projword/set/wordmake.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								hqof_idcd	: search.down('[name=hqof_idcd]').getValue(),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(result.success ){
								if(result.records[0]){
									cnt = result.records[0].table_rows;
								}
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});
	},
	createAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			cnt = 0
		;
		Ext.Msg.show({ title: '확인', msg: 'DB구조를 분석하여 신규 단어를 수집하시겠습니까(누락된 단어 추가)?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/project/projword/set/wordcreate.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								hqof_idcd	: search.down('[name=hqof_idcd]').getValue(),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(result.success ){
								if(result.records[0]){
									cnt = result.records[0].table_rows;
								}
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			}
		});
	}

});


