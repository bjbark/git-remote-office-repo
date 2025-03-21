Ext.define('module.project.codeinfo.CodeInfo', { extend:'Axt.app.Controller',

	models:['module.project.codeinfo.model.CodeInfo'],
	stores:['module.project.codeinfo.store.CodeInfo'],
	views:
	[
	 	'module.project.codeinfo.view.CodeInfoLayout',
	 	'module.project.codeinfo.view.CodeInfoSearch',
	 	'module.project.codeinfo.view.CodeInfoLister',
	 	'module.project.codeinfo.view.CodeInfoEditor'
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
			'module-codeinfo-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-codeinfo-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-codeinfo-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-codeinfo-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-codeinfo-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-codeinfo-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-codeinfo-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			// lister event
			'module-codeinfo-lister' : {
				selectionchange: me.selectRecord  // 메뉴 선택시 이벤트
			},
			'module-codeinfo-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-codeinfo-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-codeinfo-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-codeinfo-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-codeinfo-lister')[0] }
	},

	/*
	 * 콤보 박스가 정리 될때
	 */
	selectLookup:function() {
		 this.pocket.lister().eraser();
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if (! Ext.isEmpty(search.getValues().site_id )) {
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
		}
	},

	/**
	 * 선택
	 */
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller   : me,
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
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
		if (! Ext.isEmpty(search.getValues().site_id )) {
			editor.insertBefore({
				caller   : me,
				keygen : {
					url    : _global.location.http() + '/listener/seq/maxid.do',
					object : resource.keygen,
					params : {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm   	: 'code_mst'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller   : me,
							record   : Ext.create( lister.getStore().model.modelName  ,{

								site_id : search.getValues().site_id  , //'system',
								code_id : keygen.records[0].seq,
								//code_cd : keygen.records ,
								code_gb : 'gb'
							}),
							lister   : lister ,
							disables :[me.pocket.layout().down('#mainpanel')],
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
		}
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor  = me.pocket.editor(),
			itm_val = editor.getForm().findField("itm_val"),
			lookup_val = editor.getForm().findField("lookup_val"),
			editAry = [],
			lineAry = [],
			lineSub = [],
			dataAry = [],
			deflt_val = []
		;
		editAry = itm_val.getValue().split('\n');
		Ext.each(editAry, function( linevalue ) {
			var lineAry = linevalue.split(':');
			if (lineAry.length >= 2) {
				if (lineAry[0].charAt(0) === '/' && lineAry[0].charAt(1) === '/') {
					// 해당 항목은 주석으로 간주한다.
				} else {
					deflt_val.push( Ext.String.trim( lineAry[0] ) ); /* code */
					lineSub = lineAry[1].split('#');
					if (lineSub.length > 1){
						var name = Ext.String.trim( lineSub[0]) ;
						deflt_val.push( (name.length == 0) ? '　' : name ); /* name  Ext.String.trim( lineSub[0])  */
						deflt_val.push( Ext.String.trim( lineSub[1]) ); /* color */
					} else {
						var name = Ext.String.trim( lineAry[1]) ;
						deflt_val.push( (name.length == 0) ? '　' : name ); /* '　' name  Ext.String.trim( lineSub[0])  */
					}
					dataAry.push(deflt_val);
					deflt_val = [];
				}
			}
		});
		lookup_val.setValue( JSON.stringify( dataAry ) );

		/* 필드의 값을 선 조사 하여 경고를 띄우고자 해당 필드를 검하여 조건을 검사한다. */
		editor.updateRecord({
			caller   : me,
			lister   : me.pocket.lister(),
			before   : function(results, record, store ) {
				if (results.success) {
					results.feedback({success : true });
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
						failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
						callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
					});
				}
			}
		});
	},

	/**
	* 취소
	*/
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
	exportAction :function() {
		var me = this,
			lister = me.pocket.lister()
		;
		lister.writer();
	}
});


