Ext.define('module.prod.mold.moldcheck.MoldCheck', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.UserPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.prod.mold.moldcheck.model.MoldCheckMaster',
		'module.prod.mold.moldcheck.model.MoldCheckDetail1',
		'module.prod.mold.moldcheck.model.MoldCheckDetail2',
		'module.prod.mold.moldcheck.model.MoldCheckFile1',
		'module.prod.mold.moldcheck.model.MoldCheckFile2'
	],
	stores	: [
		'module.prod.mold.moldcheck.store.MoldCheckMaster',
		'module.prod.mold.moldcheck.store.MoldCheckDetail1',
		'module.prod.mold.moldcheck.store.MoldCheckDetail2',
		'module.prod.mold.moldcheck.store.MoldCheckFile1',
		'module.prod.mold.moldcheck.store.MoldCheckFile2'
	],
	views	: [
		'module.prod.mold.moldcheck.view.MoldCheckLayout',
		'module.prod.mold.moldcheck.view.MoldCheckSearch',
		'module.prod.mold.moldcheck.view.MoldCheckListerMaster',
		'module.prod.mold.moldcheck.view.MoldCheckListerDetail1',
		'module.prod.mold.moldcheck.view.MoldCheckListerDetail2',
		'module.prod.mold.moldcheck.view.MoldCheckEditor1',
		'module.prod.mold.moldcheck.view.MoldCheckEditor2',
		'module.prod.mold.moldcheck.view.MoldCheckAppendFiles1',
		'module.prod.mold.moldcheck.view.MoldCheckAppendFiles2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-moldcheck-layout button[action=selectAction]'          : { click : me.selectAction },	// 조회
			'module-moldcheck-layout #detail'                              : { tabchange : me.selectDetail },
			// lister detail1 event
			'module-moldcheck-lister-detail1 button[action=modifyAction]'  : { click : me.modifyAction },	// 수정
			'module-moldcheck-lister-detail1 button[action=insertAction]'  : { click : me.insertAction },	// 신규
			'module-moldcheck-lister-detail1 button[action=exportAction]'  : { click : me.exportAction },	// 엑셀
			'module-moldcheck-lister-detail1 button[action=deleteAction]'  : { click : me.deleteAction },	// 삭제

			// lister2 detail event
			'module-moldcheck-lister-detail2 button[action=modifyAction]'  : { click : me.modifyAction1 },	// 수정
			'module-moldcheck-lister-detail2 button[action=insertAction]'  : { click : me.insertAction1 },	// 신규
			'module-moldcheck-lister-detail2 button[action=exportAction]'  : { click : me.exportAction1 },	// 엑셀
			'module-moldcheck-lister-detail2 button[action=deleteAction]'  : { click : me.deleteAction1 },	// 삭제

			// editer event
			'module-moldcheck-editor1 button[action=updateAction]'         : { click : me.updateAction },	// 저장
			'module-moldcheck-editor1 button[action=cancelAction]'         : { click : me.cancelAction },	// 취소

			// editer event
			'module-moldcheck-editor2 button[action=updateAction]'         : { click : me.updateAction1 },	// 저장
			'module-moldcheck-editor2 button[action=cancelAction]'         : { click : me.cancelAction1 },	// 취소
			// lister master event
			'module-moldcheck-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-moldcheck-lister-detail1' : {
				selectionchange : me.attachRecord2
			},
			'module-moldcheck-lister-detail2' : {
				selectionchange : me.attachRecord3
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-moldcheck-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-moldcheck-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-moldcheck-lister-master')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-moldcheck-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-moldcheck-lister-detail2')[0] },
		editor1			: function () { return Ext.ComponentQuery.query('module-moldcheck-editor1')[0] },
		editor2			: function () { return Ext.ComponentQuery.query('module-moldcheck-editor2')[0] },
		file1			: function () { return Ext.ComponentQuery.query('module-moldcheck-file1')[0] },
		file2			: function () { return Ext.ComponentQuery.query('module-moldcheck-file2')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail1(),
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
					listerdetail1.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//detail1 신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail1(),
			editor = me.pocket.editor1(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			old_line_seqn = 0
		;

		if(!mrecord){
			Ext.Msg.alert('알림', '코드를 선택해주세요.');
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/mold/moldcheck/get/seqn1.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					mold_idcd : select.get('mold_idcd')
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
						table_nm	: 'mold_repa',
						invc_numb	: mrecord.get('mold_idcd')
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( listerdetail.getStore().model.modelName,{
							mold_idcd :  mrecord.get('mold_idcd'),
							mold_name : mrecord.get('mold_name'),
							line_seqn : old_line_seqn
						}),
						listerdetail: listerdetail,
						disables	: [me.pocket.layout().down('#mainpanel')],
						callback: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true },me.pocket.search().setDisabled(true));
								me.pocket.editor2().hide(true);
							}
						}
					});
				}
			}
		});
	},

	//detail2 신규
	insertAction1:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail2(),
			editor = me.pocket.editor2(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			old_line_seqn = 0
		;

		if(!mrecord){
			Ext.Msg.alert('알림', '코드를 선택해주세요.');
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/mold/moldcheck/get/seqn2.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					mold_idcd : select.get('mold_idcd')
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
						table_nm	: 'mold_chck',
						invc_numb	: mrecord.get('mold_idcd')
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( listerdetail.getStore().model.modelName,{
							mold_idcd :  mrecord.get('mold_idcd'),
							mold_name : mrecord.get('mold_name'),
							line_seqn : old_line_seqn,
							chek_time : Ext.Date.format(new Date(), 'h:i')
						}),
						listerdetail: listerdetail,
						disables	: [me.pocket.layout().down('#mainpanel')],
						callback: function (results){
							if (results.success) {
								me.pocket.editor1().hide(true);
								results.feedback({success : true , visible : true },me.pocket.search().setDisabled(true));
							}
						}
					});
				}
			}
		});
	},

	//detail1 수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor1(),
			listerdetail = me.pocket.listerdetail1(),
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
					me.pocket.editor2().hide(true);
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

	//detail2 수정
	modifyAction1:function() {
		var me = this,
			editor = me.pocket.editor2(),
			listerdetail = me.pocket.listerdetail2(),
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
					me.pocket.editor1().hide(true);
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

	//detail1 저장
	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail1(),
			editor = me.pocket.editor1(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mold_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'mold_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('mold_idcd' , keygen.records[0].seq );
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
				me.pocket.editor2().show(true);
				listerdetail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { mold_idcd : record.get('mold_idcd') });
				if (results.success){
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
						}
				}
			}
		});
	},

	//detail2 저장
	updateAction1:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail2(),
			editor = me.pocket.editor2(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('mold_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'mold_chck'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('mold_idcd' , keygen.records[0].seq );
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
				me.pocket.editor1().show(true);
				listerdetail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { mold_idcd : record.get('mold_idcd') });
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
		me.pocket.file1().eraser() ;
		me.pocket.file2().eraser() ;
		me.pocket.listerdetail1().eraser() ;
		me.pocket.listerdetail2().eraser() ;
		if (record) {
		}
	},

	attachRecord2:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor1(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.listerdetail1(),
			detail1 = me.pocket.listerdetail1(),
			select1        = detail1.getSelectionModel().getSelection()[0],
			file1 = me.pocket.file1(),
			master = me.pocket.listermaster(),
			record        = master.getSelectionModel().getSelection()[0]
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
		if(select1){
			file1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor1().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('mold_idcd'),orgn_dvcd : 'moldcheck1', line_seqn : select1.get('line_seqn') });
			file1.down('[name=file]').popup.params.invc_numb = record.get('mold_idcd');
			file1.down('[name=file]').popup.params.line_seqn = select1.get('line_seqn');
		}
	},

	attachRecord3:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor2(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.listerdetail2(),
			detail2 = me.pocket.listerdetail2(),
			select2        = detail2.getSelectionModel().getSelection()[0],
			file2 = me.pocket.file2(),
			master = me.pocket.listermaster(),
			record        = master.getSelectionModel().getSelection()[0]
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
		if(select2){
			file2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor1().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('mold_idcd'),orgn_dvcd : 'moldcheck2' ,line_seqn : select2.get('line_seqn')});
			file2.down('[name=file]').popup.params.invc_numb = record.get('mold_idcd');
			file2.down('[name=file]').popup.params.line_seqn = select2.get('line_seqn');
		}
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			master = me.pocket.listermaster(),
			detail1 = me.pocket.listerdetail1(),
			detail2 = me.pocket.listerdetail2(),
			file1 = me.pocket.file1(),
			file2 = me.pocket.file2(),
			tpanel = me.pocket.layout().down('#detail'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			detail = undefined,
			record        = master.getSelectionModel().getSelection()[0],
			select1        = detail1.getSelectionModel().getSelection()[0],
			select2        = detail2.getSelectionModel().getSelection()[0]
		;
		if (record==null) {
		}else{
			if(tindex == 0){
				detail = detail1;
			}else{
				detail = detail2;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { mold_idcd : record.get('mold_idcd') });

		}
	},

	//detail1 삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor1();
		listerdetail = me.pocket.listerdetail1();
		editor.deleteRecord({
			lister : me.pocket.listerdetail1(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//detail2 삭제
	deleteAction1 : function() {
		var me = this,
		editor = me.pocket.editor2();
		listerdetail = me.pocket.listerdetail2();
		editor.deleteRecord({
			lister : me.pocket.listerdetail2(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//editor1 취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor1(),
			lister = me.pocket.listerdetail1()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				me.pocket.editor2().show(true);
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

	//editor2 취소
	cancelAction1:function() {
		var me = this,
			editor = me.pocket.editor2(),
			lister = me.pocket.listerdetail2()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				me.pocket.editor1().show(true);
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
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	// 엑셀
	exportAction1 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	}
});