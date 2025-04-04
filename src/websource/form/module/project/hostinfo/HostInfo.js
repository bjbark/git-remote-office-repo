
Ext.define('module.project.hostinfo.HostInfo', { extend:'Axt.app.Controller',
	requires:[
//	 	'lookup.popup.view.UserInfoPopup'
	],
	models:[
	 	'module.project.hostinfo.model.HostInfo'
	],
	stores:[
	 	'module.project.hostinfo.store.HostInfo'
	 ],
	views :[
	 	'module.project.hostinfo.view.HostInfoLayout',
	 	'module.project.hostinfo.view.HostInfoSearch',
	 	'module.project.hostinfo.view.HostInfoLister',
	 	'module.project.hostinfo.view.HostInfoEditor'
	],

    initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-hostinfo-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-hostinfo-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-hostinfo-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-hostinfo-lister button[action=insertAction]' : { click : me.insertAction }, // 저장
			'module-hostinfo-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-hostinfo-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-hostinfo-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			'module-hostinfo-lister' : {
				selectionchange: me.attachRecord  // 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-hostinfo-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-hostinfo-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-hostinfo-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-hostinfo-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			param = me.pocket.search().getValues(),
			store = lister.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		store.load({
			params:{ param : JSON.stringify(param) }, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}
		});
	},

	/**
	 * 선택
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
	 * 수정
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
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor()
			lister = me.pocket.lister()
		;
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{}),
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
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('host_id'))) {
						resource.keygen({
							url    : _global. location.http () + '/listener/seq/maxid.do',
							object : resource. keygen,
							params : {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'host_mst'
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('host_id' , keygen.records[0].seq );
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
	 * 삭제
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	/**
	* 취소
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

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}

});


