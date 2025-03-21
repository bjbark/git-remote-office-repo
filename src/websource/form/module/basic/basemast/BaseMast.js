Ext.define('module.basic.basemast.BaseMast', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload',
	],
	models:[
		'module.basic.basemast.model.BaseMast'
	],
	stores:
	[
	 	'module.basic.basemast.store.BaseMast'
	],
	views:[
		'module.basic.basemast.view.BaseMastSearch',
		'module.basic.basemast.view.BaseMastLayout',
		'module.basic.basemast.view.BaseMastLister',
		'module.basic.basemast.view.BaseMastEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.selectAction();
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-basemast-layout button[action=selectAction]' : { click : me.selectAction } ,
			'module-basemast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-basemast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-basemast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-basemast-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-basemast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-basemast-editor button[action=cancelAction]' : { click : me.cancelAction },

			'module-basemast-lister button[action=testUploadAction]' : { click : me.testUploadAction },

			'module-basemast-lister' : { selectionchange: me.attachRecord },
			'module-basemast-search combobox[name=prnt_idcd]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-basemast-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-basemast-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-basemast-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-basemast-lister')[0] }
	},

	/**
	 * 상위메뉴조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		if (!Ext.isEmpty(search.getValues().prnt_idcd )) {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success && records.length > 0) {
						lister.getSelectionModel().select(0);
					} else {
						me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( search.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
		}
	},

	selectLookup:function() {
		this.selectAction();
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
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			prnt_idcd = search.down('[name=prnt_idcd]').getValue()
		;
		editor.down('[name=refn_valu_1fst]').show();

		if(prnt_idcd != '3101'){
			editor.down('[name=refn_valu_1fst]').hide();
		}

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
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
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
			search = me.pocket.search(),
			prnt_idcd = search.down('[name=prnt_idcd]').getValue()
		;

		editor.down('[name=refn_valu_1fst]').show();

		if(prnt_idcd != '3101'){
			editor.down('[name=refn_valu_1fst]').hide();
		}

		if (!Ext.isEmpty(search.getValues().prnt_idcd )) {
			editor.insertRecord({
				action : Const.EDITOR.DEFAULT,
				record : Ext.create( lister.getStore().model.modelName,{
					prnt_idcd	: search.getValues().prnt_idcd,
					emp_id		: _global.emp_id,
					emp_nm		: _global.emp_nm
				}),
				disables : [ me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
				callback: function (results){
					if (results.success) {
						setTimeout(function(){
							editor.down('[name=base_code]').focus(true , 10);
						},200);
						results.feedback({success : true });
					}
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
					}
				}
			})
		}
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor    = me.pocket.editor(),
			lister    = me.pocket.lister(),
			search    = me.pocket.search(),
			store     = lister.getStore(),
			prnt_idcd = search.down('[name=prnt_idcd]').getValue(),
			values    = editor.getValues(),
			msg       = ""
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if(_global.options.code_check){
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/listener/seq/checkCode.do',
							method		: "POST",
							async		: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									table_nm	: "base_mast",
									column_nm1	: "base_code",
									column_nm2	: "prnt_idcd",
									notin_column: "base_idcd",
									code1		: record.get('base_code'),
									code2		: prnt_idcd,
									notin		: record.get('base_idcd'),
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
					if (record.phantom && Ext.isEmpty(record.get('base_idcd'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'base_mast',
									dt			: new Date ()
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('base_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					}else { results.feedback({success : true  }); }
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
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
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

	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	testUploadAction: function() {
		var me = this;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget		: 'file-upload-popup',
			apiurl		: {
				master : _global.api_host_info + "/system/basic/basemast/set/upload.do"
			},
			params	: {
				abc	: '1'
			},
			title		: '파일 업로드',
			waitMsg		: '업로드중...',
			fileFieldConfig : {
			fieldLabel	:'파일',
			buttonText	:'선택'
		},
		uploadBtnConfig : {
				text	:'파일 업로드'
			}
		});
	}
});

