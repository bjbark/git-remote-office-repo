Ext.define('module.qc.project.losswork.LossWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.DeptPopup'
	],

	models	: [
		'module.qc.project.losswork.model.LossWorkMaster',
		'module.qc.project.losswork.model.LossWorkDetail',
		'module.qc.project.losswork.model.LossWorkImage'
	],
	stores	: [
		'module.qc.project.losswork.store.LossWorkMaster',
		'module.qc.project.losswork.store.LossWorkDetail',
		'module.qc.project.losswork.store.LossWorkImage'
	],
	views	: [
		'module.qc.project.losswork.view.LossWorkLayout',
		'module.qc.project.losswork.view.LossWorkSearch',
		'module.qc.project.losswork.view.LossWorkListerMaster',
		'module.qc.project.losswork.view.LossWorkListerDetail',
		'module.qc.project.losswork.view.LossWorkListerImage',
		'module.qc.project.losswork.view.LossWorkEditor',
		'module.qc.project.losswork.view.LossWorkImagePopup',
		'module.qc.project.losswork.view.LossWorkEditor2'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-losswork-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// layout event
			'module-losswork-lister-master button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-losswork-lister-master button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-losswork-lister-master button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			'module-losswork-lister-master button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			'module-losswork-lister-master button[action=report]      '		: { click : me.ReportUpdateAction },	//손실보고서 발행
			// lister detail event
			'module-losswork-lister-detail button[action=modifyAction]'		: { click : me.modifyAction2 },	// 수정
			'module-losswork-lister-detail button[action=insertAction]'		: { click : me.insertAction2 },	// 신규
			'module-losswork-lister-detail button[action=exportAction]'		: { click : me.exportAction1},	// 엑셀
			'module-losswork-lister-detail button[action=deleteAction]'		: { click : me.deleteAction2 },	// 삭제
			// lister image event
			'module-losswork-lister-image button[action=insertAction]'		: { click : me.insertImage },	// 신규
			'module-losswork-lister-image button[action=deleteAction]'		: { click : me.deleteImage },	// 삭제

			// editer event
			'module-losswork-editor button[action=updateAction]'			: { click : me.updateAction },	// 저장
			'module-losswork-editor button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			'module-losswork-editor2 button[action=updateAction]'			: { click : me.updateAction2 },	// 저장
			'module-losswork-editor2 button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			// lister master event
			'module-losswork-lister-master' : {
				itemdblclick : me.selectMaster ,
				selectionchange : me.attachRecord
			},
			'module-losswork-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-losswork-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-losswork-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-losswork-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-losswork-lister-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-losswork-lister-detail')[0] },
		listerimage		: function () { return Ext.ComponentQuery.query('module-losswork-lister-image ')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-losswork-editor')[0] },
		editor2			: function () { return Ext.ComponentQuery.query('module-losswork-editor2')[0] },
	},

	//TODO 조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//TODO 선택
	selectMaster : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster(),
			listerimage  = me.pocket.listerimage()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record.get('invc_numb')});
			listerimage.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record.get('invc_numb')});
			mask.hide();
		}
	},

	attachRecord:function( smodel, record ){
		var me = this,
			editor       = me.pocket.editor(),
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster(),
			select       = listermaster.getSelectionModel().getSelection()[0]
		;
		editor.attachRecord({
			caller : me ,
			lister : listermaster ,
			record : select ? select : listermaster.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	attachRecord2:function( smodel, record ){
		var me      = this,
			editor  = me.pocket.editor2(),
			lister  = me.pocket.listerdetail(),
			mrecord = lister.getSelectionModel().getSelection(),
			record  = me.pocket.listerdetail().getSelectionModel().getSelection()
		;
		if(record[0]){
			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : mrecord ? mrecord : lister.getSelectionModel().getSelection(),
				callback : function (results , record ) {
					if (results.success) {
					}
				}
			});
		}
	},
	//TODO master 신규
	insertAction:function() {
		var me = this,
			editor			= me.pocket.editor(),
			lister			= me.pocket.listermaster()
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
						table_nm	: 'pjod_loss_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb : keygen.records[0].seq
						}),
						lister	: lister,
						disables:[me.pocket.layout().down('#master'),me.pocket.layout().down('#detail'), me.pocket.search().setDisabled(true)],
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

	//TODO master 수정
	modifyAction:function() {
		var me     = this,
			editor = me.pocket.editor(),
			select = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			listermaster = me.pocket.listermaster()
		;
		if(select){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					console.log(results);
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#master').setDisabled(true);
						me.pocket.layout().down('#detail').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","수정 할 손실공수를 선택하여 주십시오.");
		}
	},

	//TODO master 삭제
	deleteAction : function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster()
		;
		editor.deleteRecord({
			lister : me.pocket.listermaster(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//TODO master 저장
	updateAction:function() {
		var me				= this,
			listermaster	= me.pocket.listermaster(),
			editor			= me.pocket.editor(),
			store			= listermaster.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
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
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
				listermaster.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				});
				if (results.success){
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : listermaster.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},
	//TODO DETAIL 신규
	insertAction2:function() {
		var me = this,
			editor			= me.pocket.editor2(),
			lister			= me.pocket.listerdetail(),
			select			= me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		if(select){
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/qc/project/losswork/get/seqn.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							invc_numb	: select.get('invc_numb')
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								invc_numb : select.get('invc_numb'),
								line_seqn : keygen.records[0].seq ,
								pjod_idcd : select.get('pjod_idcd')
							}),
							lister	: lister,
							disables:[me.pocket.layout().down('#master'),me.pocket.layout().down('#detail'), me.pocket.search().setDisabled(true)],
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
			Ext.Msg.alert("알림","손실공수를 선택하여 주십시오.");
		}
	},

	//TODO DETAIL 수정
	modifyAction2:function() {
		var me     = this,
			editor = me.pocket.editor2(),
			select = me.pocket.listerdetail().getSelectionModel().getSelection()[0],
			listerdetail = me.pocket.listerdetail()
		;
		if(select){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						item_name1.setValue(item_name);
					}
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			});
		}else{
			Ext.Msg.alert("알림","수정 할 손실공수내역을 선택하여 주십시오.");
		}
	},

	//TODO DETAIL삭제
	deleteAction2 : function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listerdetail	= me.pocket.listerdetail()
		;
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

	//TODO DETAIL저장
	updateAction2:function() {
		var me				= this,
			listerdetail	= me.pocket.listerdetail(),
			editor			= me.pocket.editor2(),
			store			= listerdetail.getStore(),
			select			= me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
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
					callback:function(records, operation, success) {
					if (success) {
						listerdetail.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
						mask.hide();
					}, scope:me
				}, Ext.merge( {invc_numb : select.get('invc_numb')}) );
				if (results.success){
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},

	//TODO 취소
	cancelAction:function(i) {
		var me	= this,
		editor,
		lister
		;
		if(i.itemId=='editor'){
			editor	= me.pocket.editor();
			lister	= me.pocket.listermaster();
		}else if(i.itemId=='editor2'){
			editor	= me.pocket.editor2();
			lister	= me.pocket.listerdetail();
		}
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectDetail : true });
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},
	//TODO 이미지저장
	insertImage:function(){
		var	me = this,
			lister = me.pocket.listermaster(),
			listerimage = me.pocket.listerimage(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget  : 'module-losswork-popup',
				params  : { invc_numb : select.get('invc_numb') },
				listeners: {
					close:function(){
						listerimage.getStore().reload();
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","손실공수를 선택하여 주십시오.");
		}
	},
	//TODO 이미지삭제
	deleteImage:function(){
		var	me = this,
			lister = me.pocket.listerimage(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		console.log(select);
		if(select){
			Ext.Ajax.request({
				url			: _global.location.http() + '/qc/project/losswork/set/deletImage.do',			// seqn을 불러온다.
				params		: {
					token	: _global.token_id,
					param	: JSON.stringify({
						stor_id			: _global.stor_id,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: select.get('line_seqn')
					})
				},
				async		: false,
				method		: 'POST',
				success		: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					lister.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert("알림","삭제할 이미지를 선택하여 주십시오.");
		}
	},
	//TODO 손실보고서 발행
	ReportUpdateAction:function() {
		var me = this,
			lister = me.pocket.listermaster(),
			select = lister.getSelectionModel().getSelection()[0],
			jrf = 'lossReport.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		if(select){
			var arg = 'invc_numb~'+select.get('invc_numb')+'~';
			var win = window.open(_global.location.http()+'/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}','test','width=1000,height=950');
			return win;
		}else{
			Ext.Msg.alert("알림","손실공수를 선택하여 주십시오.");
		}
	},


	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});