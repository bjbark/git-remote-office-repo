/**
 * 직급 정보 Controller
 *
 *
 */
Ext.define('module.user.wkrnmast.WkrnMast', { extend : 'Axt.app.Controller',

	models:[
		'module.user.wkrnmast.model.WkrnMast'
	],
	stores:[
		'module.user.wkrnmast.store.WkrnMast'
	],
	views:[
		'module.user.wkrnmast.view.WkrnMastLayout',
		'module.user.wkrnmast.view.WkrnMastLister',
		'module.user.wkrnmast.view.WkrnMastSearch',
		'module.user.wkrnmast.view.WkrnMastEditor'
	],

	/**
	 *
	 */
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-wkrnmast-layout button[action=selectAction]' : { click : me.selectAction },
			'module-wkrnmast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-wkrnmast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-wkrnmast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-wkrnmast-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-wkrnmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-wkrnmast-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-wkrnmast-lister' : { selectionchange: me.attachRecord }
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-wkrnmast-layout')[0] },
		search  : function () { return Ext.ComponentQuery.query('module-wkrnmast-search')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-wkrnmast-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-wkrnmast-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success && records.length > 0) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), { stor_grp : _global.stor_grp } ));
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
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
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
			action		: Const.EDITOR.DEFAULT,
			record		: Ext.create( lister.getStore().model.modelName,{}),
			disables	: [ me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
			callback	: function (results){
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
			store  = lister.getStore(),
			msg    = ""
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if(_global.options.code_check){
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/listener/seq/checkCode.do',
							method		: "POST",
							async		: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									table_nm	: "wkrn_mast",
									column_nm1	: "wkrn_code",
									notin_column: "wkrn_idcd",
									code1		: record.get('wkrn_code'),
									notin		: record.get('wkrn_idcd'),
									hqof_idcd	: _global.hqof_idcd
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									if(result.records[0].seq>0){
										msg = '중복된 코드입니다.';
										return;
									}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
								} else {
									Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
								}
							},
							failure : function(response, request) {
								resource.httpError(response);
							}
						});
					}
					if(msg != ""){
						Ext.Msg.alert('알림',msg);
						return;
					}
					if (record.phantom && Ext.isEmpty(record.get('wkrn_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'wkrn_mast'
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('wkrn_idcd' , keygen.records[0].seq );
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
					me.pocket.layout().down('#mainpanel').setDisabled(false);
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
					me.pocket.layout().down('#mainpanel').setDisabled(false);
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
		var  me = this,
		editor = me.pocket.editor()
		;
		editor.deleteRecord({
			caller   : me,
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				if (results.success){
					store.sync({ // 저장 성공시
						success : function(operation){ results.feedback({success : true , visible : false });},
						failure : function(operation){ results.feedback({success : false }); },
						callback: function(operation){ results.callback({}); }
					});
				}
			}
		});
	},

	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});