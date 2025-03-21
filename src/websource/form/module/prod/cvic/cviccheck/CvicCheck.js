Ext.define('module.prod.cvic.cviccheck.CvicCheck', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.prod.cvic.cviccheck.model.CvicCheckMaster',
		'module.prod.cvic.cviccheck.model.CvicCheckDetail',
		'module.prod.cvic.cviccheck.model.CvicCheckFile'
	],
	stores	: [
		'module.prod.cvic.cviccheck.store.CvicCheckMaster',
		'module.prod.cvic.cviccheck.store.CvicCheckDetail',
		'module.prod.cvic.cviccheck.store.CvicCheckFile'
	],
	views	: [
		'module.prod.cvic.cviccheck.view.CvicCheckLayout',
		'module.prod.cvic.cviccheck.view.CvicCheckSearch',
		'module.prod.cvic.cviccheck.view.CvicCheckListerMaster',
		'module.prod.cvic.cviccheck.view.CvicCheckListerDetail',
		'module.prod.cvic.cviccheck.view.CvicCheckEditor',
		'module.prod.cvic.cviccheck.view.CvicCheckEditorLister'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cviccheck-layout button[action=selectAction]': { click : me.selectAction },	// 조회
			// lister detail event
			'module-cviccheck-lister-detail button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-cviccheck-lister-detail button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-cviccheck-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-cviccheck-lister-detail button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// editer event
			'module-cviccheck-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-cviccheck-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-cviccheck-lister-master button[action=printAction]' : { click : me.printAction },	// 설비이력카드 출력
			'module-cviccheck-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-cviccheck-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-cviccheck-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-cviccheck-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-cviccheck-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-cviccheck-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-cviccheck-lister-detail')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-cviccheck-editor')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-cviccheck-editorlister')[0] }
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
			listerdetail = me.pocket.listerdetail()
		;

		var records = listerdetail.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "점검내역  1건을 선택 후 진행하십시오.");
			return;
		}

		editor.modifyRecord({
			caller	: me,
			callback: function( results ){
				if (results.success){
					results.feedback( {success : true, visible : true } );
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
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			old_line_seqn = 0
		;
		if(select){
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/cvic/cviccheck/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						cvic_idcd : select.get('cvic_idcd')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);

					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						old_line_seqn = result.records[0].line_seqn;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			old_line_seqn = old_line_seqn+1;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'cvic_chck',
							cvic_idcd	: mrecord.get('cvic_idcd')
						})
					}
				},

				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listerdetail.getStore().model.modelName,{
								cvic_idcd :  mrecord.get('cvic_idcd'),
								cvic_name :  mrecord.get('cvic_name'),
								line_seqn : old_line_seqn
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
		}else{
			Ext.Msg.alert("알림", "설비코드를 선택하여주십시오.");
			return;
		}
	},

	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore(),
			select = me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cvic_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cvic_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cvic_idcd' , keygen.records[0].seq );
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
				listerdetail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { cvic_idcd : select.get('cvic_idcd'), });
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
		if (record){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { cvic_idcd : record.get('cvic_idcd') });

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('cvic_idcd'),orgn_dvcd : 'cviccheck' });
			editorlister.down('[name=file]').popup.params.invc_numb = record.get('cvic_idcd');
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
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},

	// 설비이력카드 출력
	printAction : function() {
		var me = this,
		listermaster = me.pocket.listermaster(),
		select = me.pocket.listermaster().getSelectionModel().getSelection(),
		jrf = 'CardRecord.jrf',
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			var cvic_idcd = select[0].get('cvic_idcd');
			var arg =	'cvic_idcd~'+cvic_idcd+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	}
});