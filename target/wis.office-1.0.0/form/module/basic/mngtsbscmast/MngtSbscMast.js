Ext.define('module.basic.mngtsbscmast.MngtSbscMast', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload',
	],
	models:[
		'module.basic.mngtsbscmast.model.MngtSbscMast'
	],
	stores:
	[
	 	'module.basic.mngtsbscmast.store.MngtSbscMast'
	],
	views:[
		'module.basic.mngtsbscmast.view.MngtSbscMastSearch',
		'module.basic.mngtsbscmast.view.MngtSbscMastLayout',
		'module.basic.mngtsbscmast.view.MngtSbscMastLister',
		'module.basic.mngtsbscmast.view.MngtSbscMastEditor'
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
			'module-mngtsbscmast-layout button[action=selectAction]' : { click : me.selectAction } ,
			'module-mngtsbscmast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-mngtsbscmast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-mngtsbscmast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-mngtsbscmast-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-mngtsbscmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-mngtsbscmast-editor button[action=cancelAction]' : { click : me.cancelAction },

			'module-mngtsbscmast-lister' : { selectionchange: me.attachRecord },
			'module-mngtsbscmast-search combobox[name=mngt_sbsc_dvcd]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-mngtsbscmast-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-mngtsbscmast-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-mngtsbscmast-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-mngtsbscmast-lister')[0] }
	},

	/**
	 * 상위메뉴조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		if (!Ext.isEmpty(search.getValues().mngt_sbsc_dvcd )) {
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
							table_nm	: 'mngt_sbsc_idcd'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								mngt_sbsc_dvcd	: search.getValues().mngt_sbsc_dvcd,
								mngt_sbsc_idcd	: keygen.records[0].seq,
							}),
							lister	: lister,
							disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
							callback: function (results){
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
			store  = lister.getStore(),
			search = me.pocket.search()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mngt_sbsc_idcd'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id			: _global.stor_id,
									table_nm		: 'mngt_sbsc_mast',
									dt				: new Date ()
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('mngt_sbsc_idcd' , keygen.records[0].seq );
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
});

