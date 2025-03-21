Ext.define('module.prod.jig.jigcheck.JigCheck', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.prod.jig.jigcheck.model.JigCheckMaster',
		'module.prod.jig.jigcheck.model.JigCheckDetail',
		'module.prod.jig.jigcheck.model.JigCheckFile',
	],
	stores	: [
		'module.prod.jig.jigcheck.store.JigCheckMaster',
		'module.prod.jig.jigcheck.store.JigCheckDetail',
		'module.prod.jig.jigcheck.store.JigCheckFile'
	],
	views	: [
		'module.prod.jig.jigcheck.view.JigCheckLayout',
		'module.prod.jig.jigcheck.view.JigCheckSearch',
		'module.prod.jig.jigcheck.view.JigCheckListerMaster',
		'module.prod.jig.jigcheck.view.JigCheckListerDetail',
		'module.prod.jig.jigcheck.view.JigCheckEditor',
		'module.prod.jig.jigcheck.view.JigCheckEditorLister'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-jigcheck-layout button[action=selectAction]': { click : me.selectAction },	// 조회
			// lister detail event
			'module-jigcheck-lister-detail button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-jigcheck-lister-detail button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-jigcheck-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-jigcheck-lister-detail button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// editer event
			'module-jigcheck-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-jigcheck-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-jigcheck-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-jigcheck-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-jigcheck-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-jigcheck-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-jigcheck-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-jigcheck-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-jigcheck-lister-detail')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-jigcheck-editor')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-jigcheck-editorlister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listerdetail.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			listerdetail = me.pocket.listerdetail(),
			record = listerdetail.getSelectionModel().getSelection()[0]
		;
		if(record){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ){
					if (results.success){
						results.feedback( {success : true, visible : true } );
					}else{
					}
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림', '수정할 항목을 선택해주세요.');
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
			sub = listerdetail.down('#sub').grid.store.data.length;
		;
		if(!mrecord){
			Ext.Msg.alert('알림', '코드를 선택해주세요.');
			return;
		}
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'jigg_chck',
							invc_numb	: mrecord.get('jigg_idcd')
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listerdetail.getStore().model.modelName,{
								jigg_idcd :  mrecord.get('jigg_idcd'),
								jigg_name : mrecord.get('jigg_name'),
								line_seqn : sub+1
							}),
							listerdetail: listerdetail,
							disables	: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
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
	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('jigg_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'jigg_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('jigg_idcd' , keygen.records[0].seq );
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
						callback: function(operation){ results.callback({}); },
					} );
				}
			},
			finished : function(results, record, operation){
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				if (results.success){
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
						}
				}
			}
		});
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	attachRecord2:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.listerdetail()
		;

		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.listerdetail(),
			editorlister = me.pocket.editorlister()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { jigg_idcd : record.get('jigg_idcd') });

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('jigg_idcd'),orgn_dvcd : 'jigg_chck' });
			editorlister.down('[name=file]').popup.params.invc_numb = record.get('jigg_idcd');
		}
	},

	//삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		listerdetail = me.pocket.listerdetail();
		editor.deleteRecord({
			lister : me.pocket.listerdetail(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		lister = me.pocket.listerdetail();
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});