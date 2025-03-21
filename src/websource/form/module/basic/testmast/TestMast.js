Ext.define('module.basic.testmast.TestMast', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.DeptPopup'],
	models	: ['module.basic.testmast.model.TestMast'],
	stores	: ['module.basic.testmast.store.TestMast'],
	views	: [
		'module.basic.testmast.view.TestMastLayout',
		'module.basic.testmast.view.TestMastSearch',
		'module.basic.testmast.view.TestMastLister',
		'module.basic.testmast.view.TestMastEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-testmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-testmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-testmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-testmast-lister button[action=code_ini]'	 : { click : me.copyAction },	// 수정
			'module-testmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-testmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-testmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-testmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-testmast-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-testmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-testmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-testmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-testmast-lister')[0] }
	},

	//조회
	selectAction:function() {
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
							table_nm	: 'dept_mast'
						})
					}
				},
				callback : function (keygen) {
					if (keygen.success) {
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								dept_idcd : keygen.records[0].seq,
							}),
							lister	: lister,
							disables: [me.pocket.layout().down('#mainpanel')],
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

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
			dept_idcd = me.pocket.editor().down('[name=dept_idcd]').getValue(),
			prnt_idcd = me.pocket.editor().down('[name=prnt_idcd]').getValue()
		;
		if	(dept_idcd == prnt_idcd) {
			Ext.Msg.show({ title: '알림', msg: '부서코드와 상위 부서코드는 동일할 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		};

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('dept_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'dept_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('dept_idcd' , keygen.records[0].seq );
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
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
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
			}
		}, me);
	},

	//삭제
	deleteAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});