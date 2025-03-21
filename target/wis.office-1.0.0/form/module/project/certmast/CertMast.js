Ext.define('module.project.certmast.CertMast', { extend:'Axt.app.Controller',
	requires: [
		'lookup.popup.view.UserPopup',
	],
	models: [
	 	'module.project.certmast.model.CertMast'
	],
	stores: [
	 	'module.project.certmast.store.CertMast'
	],
	views: [
		'module.project.certmast.view.CertMastLayout' ,
		'module.project.certmast.view.CertMastSearch' ,
		'module.project.certmast.view.CertMastLister' ,
		'module.project.certmast.view.CertMastEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		// 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용
		me.control({
			// layout event
			'module-certmast-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-certmast-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-certmast-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소

			// lister event
			'module-certmast-lister button[action=insertAction]' : { click : me.insertAction }, // 저장
			'module-certmast-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-certmast-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			// lister event
			'module-certmast-lister' : {
				selectionchange: me.attachRecord  // 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-certmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-certmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-certmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-certmast-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			param = me.pocket.search().getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge( param ));

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
		editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		search = me.pocket.search()
		param = search.getValues()
	;
	console.debug('insert routine')
	editor.insertBefore({
		caller	: me,
		keygen	: {
			url		: _global.location.http() + '/listener/seq/maxid.do',
			object	: resource.keygen,
			params	: {
				token : _global.token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'cert_mast'
				})
			}
		},
		callback : function (keygen) {
			if (keygen.success) {
				editor.insertRecord({
					caller	: me,
					record	: Ext.create( lister.getStore().model.modelName,{
						cert_idcd	: keygen.records[0].seq,
						hqof_idcd	: _global.hqof_idcd,
						cert_pswd	: Math.floor(Math.random()*9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString() + Math.floor(Math.random() * 9).toString()
					}),
					lister	: lister,
					disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
					callback: function (results) {
						if (results.success) {
							results.feedback({success : true , visible : true });
						}
					}
				});
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

			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cert_idcd'))) {
						resource.keygen({
							url    : _global.location.http() + '/listener/seq/default.do',
							params : {
								token : _global.token_id ,
								param : JSON.stringify({})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cert_idcd' , keygen.records );
									record.dirtyValue('cert_code' , keygen.records );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
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
					if (record.phantom && Ext.isEmpty(record.get('cert_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cert_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cert_idcd' , keygen.records[0].seq );
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
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						}
				}
			}
		});
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


	/**
	 *
	 */
	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}

});


