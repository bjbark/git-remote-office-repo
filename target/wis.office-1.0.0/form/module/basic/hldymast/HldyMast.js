Ext.define('module.basic.hldymast.HldyMast', { extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BzplPopup'
	],
	models	: [
		'module.basic.hldymast.model.HldyMast'
	],
	stores	: [
		'module.basic.hldymast.store.HldyMast'
	],
	views	: [
		'module.basic.hldymast.view.HldyMastLayout',
		'module.basic.hldymast.view.HldyMastLister',
		'module.basic.hldymast.view.HldyMastEditor',
		'module.basic.hldymast.view.HldyMastSearch',
		'module.basic.hldymast.view.HldyMastPopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-hldymast-search button[action=selectAction]' : { click : me.selectAction },
			'module-hldymast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-hldymast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-hldymast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-hldymast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-hldymast-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-hldymast-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-hldymast-lister button[action=hldyAction]' : { click : me.hldyAction   },		//법정공휴일등록

			'module-hldymast-lister' : { selectionchange: me.attachRecord }
		});
		me.callParent(arguments);

	},
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-hldymast-search')[0]; },
		layout  : function () { return Ext.ComponentQuery.query('module-hldymast-layout')[0]; },
		editor  : function () { return Ext.ComponentQuery.query('module-hldymast-editor')[0]; },
		lister  : function () { return Ext.ComponentQuery.query('module-hldymast-lister')[0]; },
		popup   : function () { return Ext.ComponentQuery.query('module-hldymast-popup')[0]; }
	},

	/**
	 * 조회
	 */
	selectAction:function(config){
		var	me	= this,
			lister = me.pocket.lister(),
			values = me.pocket.search().getValues(),
			store  = lister.getStore()
		;
		if(values.fr_dt>values.to_dt){
			Ext.Msg.alert("알림","검색일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( me.pocket.search().getValues(), {hq_id :_global.hq_id, stor_grp:_global.stor_grp} ) );
		}
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
							table_nm	: 'hldy_mast'
						})
					}
				},
				callback : function (keygen) {
					if (keygen.success) {
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								hldy_idcd : keygen.records[0].seq,
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
					if (record.phantom && Ext.isEmpty(record.get('hldy_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'hldy_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('hldy_idcd' , keygen.records[0].seq );
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

	//법정공휴일등록
	hldyAction:function() {
		var me = this,
			popup  = me.pocket.popup()
		;
		resource.loadPopup({
			widget : 'module-hldymast-popup',
		});
		var numb = Ext.ComponentQuery.query('#year')[0].setValue(Ext.Date.format(new Date(), 'Y'));
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
	* 엑셀
	*/
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}

});