Ext.define('module.basic.bzplmast.BzplMast', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.DeptPopup',
		'Axt.popup.view.ZipcodeSearch',
	],

	models	: ['module.basic.bzplmast.model.BzplMast'],
	stores	: ['module.basic.bzplmast.store.BzplMast'],
	views	: [
		'module.basic.bzplmast.view.BzplMastLayout',
		'module.basic.bzplmast.view.BzplMastSearch',
		'module.basic.bzplmast.view.BzplMastLister',
		'module.basic.bzplmast.view.BzplMastEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-bzplmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-bzplmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-bzplmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-bzplmast-lister button[action=code_ini]'	 : { click : me.copyAction },	// 수정
			'module-bzplmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-bzplmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-bzplmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-bzplmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-bzplmast-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			},
			'module-bzplmast-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-bzplmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-bzplmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-bzplmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-bzplmast-lister')[0] }
		},

//	//콤보박스 조회
//	selectLookup:function() {
//		this.pocket.lister().eraser();
//	},

	//조회
	selectAction:function()
		{
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//수정
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true)
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues()
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'bzpl_mast'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								bzpl_idcd : keygen.records[0].seq,
							}),
							lister	: lister,
							disables:[me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
							callback: function (results){
								if	(results.success) {
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
									table_nm	: "bzpl_mast",
									column_nm1	: "bzpl_code",
									notin_column: "bzpl_idcd",
									code1		: record.get('bzpl_code'),
									notin		: record.get('bzpl_idcd'),
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
					if (record.phantom && Ext.isEmpty(record.get('bzpl_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'bzpl_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('bzpl_idcd' , keygen.records[0].seq );
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
					me.pocket.search().setDisabled(false)
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
//							case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
						}
				}
			}
		});
	},


	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false)
			}
		}, me);
	},


	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },				// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }									// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

