Ext.define('module.prod.mold.moldshot.MoldShot', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.CvicPopup'
	],

	models	: [
		'module.prod.mold.moldshot.model.MoldShotMaster',
		'module.prod.mold.moldshot.model.MoldShotDetail'
	],
	stores	: [
		'module.prod.mold.moldshot.store.MoldShotMaster',
		'module.prod.mold.moldshot.store.MoldShotDetail'
	],
	views	: [
		'module.prod.mold.moldshot.view.MoldShotLayout',
		'module.prod.mold.moldshot.view.MoldShotSearch',
		'module.prod.mold.moldshot.view.MoldShotListerMaster',
		'module.prod.mold.moldshot.view.MoldShotListerDetail',
		'module.prod.mold.moldshot.view.MoldShotEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-moldshot-layout button[action=selectAction]': { click : me.selectAction },	// 조회
			//lister master event

			'module-moldshot-lister-master button[action=exportAction]' : { click : me.exportAction },	// 엑셀

			// lister detail event
			'module-moldshot-lister-detail button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-moldshot-lister-detail button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-moldshot-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-moldshot-lister-detail button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// editer event
			'module-moldshot-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-moldshot-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-moldshot-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-moldshot-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-moldshot-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-moldshot-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-moldshot-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-moldshot-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-moldshot-lister-detail')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-moldshot-editor')[0] }
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
		console.log(param);
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
			fields = editor.down('form').getForm()
		;
		if(record){
			fields.managedListeners[2].item.readOnly = true;														//readOnly 적용
			fields.managedListeners[2].item.setFieldStyle('background-color:#F2F2F2;background-image:none;')		// 색상 변경
			editor.modifyRecord({
				caller	: me,
				callback: function( results ){
					if (results.success){
						results.feedback( {success : true, visible : true } );
					}else{
						console.log('else');
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
			Ext.Msg.alert('알림', '수정할 점검내역을 선택해주세요.');
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
			mrecord = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			fields = editor.down('form').getForm(),
			record = listerdetail.getStore(),
			old_line_seqn,
			select = me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		if(!mrecord){
			Ext.Msg.alert('알림', Language.get('acpt_numb', '금형코드')+' 목록에서' + Language.get('acpt_numb', '금형코드') + '를 선택해주세요.');
			return;
		}

		fields.managedListeners[2].item.readOnly = false;							//readOnly적용
		fields.managedListeners[2].item.setFieldStyle('background-color:white;');	// 색상 되돌리기
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/mold/moldshot/get/seqn.do',
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
						table_nm	: 'mold_shot',
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
	//저장
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
						callback: function(operation){ results.callback({});},
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
			store  = detail.getStore()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
						 mask.hide();
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { mold_idcd : record.get('mold_idcd') });

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
					callback: function(operation){ results.callback({}); store.reload()} // 성공 실패 관계 없이 호출된다.
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
	exportAction : function(record) {
		var value = record.itemId;
		if(value == 'master'){
			this.pocket.listermaster().writer({enableLoadMask:true});
		}else{
			this.pocket.listerdetail().writer({enableLoadMask:true});
		}
	}
});