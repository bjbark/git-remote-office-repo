Ext.define('module.prod.mold.moldmast.MoldMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.ZonePopup',
		'lookup.popup.view.MakePopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.prod.mold.moldmast.model.MoldMast',
		'module.prod.mold.moldmast.model.MoldMastFile',
		'module.prod.mold.moldmast.model.MoldMastMove',
		'module.prod.mold.moldmast.model.MoldMastInvoice',
	],
	stores:[
		'module.prod.mold.moldmast.store.MoldMast',
		'module.prod.mold.moldmast.store.MoldMastFile',
		'module.prod.mold.moldmast.store.MoldMastMove',
		'module.prod.mold.moldmast.store.MoldMastInvoice',
	],
	views:
	[
		'module.prod.mold.moldmast.view.MoldMastLayout',
		'module.prod.mold.moldmast.view.MoldMastSearch',
		'module.prod.mold.moldmast.view.MoldMastLister',
		'module.prod.mold.moldmast.view.MoldMastEditor',
		'module.prod.mold.moldmast.view.MoldMastEditorLister',
		'module.prod.mold.moldmast.view.MoldMastMoveLister',
		'module.prod.mold.moldmast.view.MoldMastMoveSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-moldmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-moldmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-moldmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-moldmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-moldmast-lister button[action=test]' : { click : me.test },	// 수정
			'module-moldmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-moldmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-moldmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-moldmast-lister button[action=historyAction]': { click : me.historyAction },	// 이력카드
			// lister event
			'module-moldmast-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-moldmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-moldmast-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-moldmast-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-moldmast-editor')[0] },
		filelister : function () { return Ext.ComponentQuery.query('module-moldmast-editorlister')[0] },
		upload : function () { return Ext.ComponentQuery.query('module-moldmast-upload')[0] },
		movelister : function () { return Ext.ComponentQuery.query('module-moldmast-movelister')[0] },
		},


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
	test:function(){
		Ext.Ajax.request({
			url		: _global.location.http() + '/project/batchwork/set/setImages.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
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
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

	},
	//선택
	selectRecord:function( grid, record ){

		if(record[0] == null){
			return;
		}else{
			var me = this,
			editor = me.pocket.editor(),
			filelister = me.pocket.filelister(),
			movelister = me.pocket.movelister();
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ mold_idcd : record[0].get('mold_idcd') })},
				lister	: movelister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
					}
				},
			}, me);
			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
//						filelister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('mold_idcd'),orgn_dvcd : 'mold_mast' });
			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('mold_idcd');
//			$('head').append('<link />'); // jquery로 link추가

		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			mrecord		= mrecord ? record[0] : lister.getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			movelister = me.pocket.movelister()
		;

		if(mrecord){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ mold_idcd : mrecord.get('mold_idcd') })},
				lister	: movelister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
						editor.expand(false);
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				},
			}, me);
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			movelister = me.pocket.movelister(),
			filelister = me.pocket.filelister()
		;
		filelister.getStore().clearData();
		filelister.getStore().loadData([],false);
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		movelister.getStore().clearData();
		movelister.getStore().loadData([],false);
		filelister.down('[name=file]').popup.params.invc_numb = "";

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'mold_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller		: me,
						action		: 'invoice',
						record		: Ext.create( 'module.prod.mold.moldmast.model.MoldMastInvoice',{
							mold_idcd : keygen.records[0].seq
						}),
						lister		: movelister,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback	: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true });
								editor.expand(false);
								me.pocket.layout().down('#mainpanel').setDisabled(true);
							}
						}
					});
				}
			 }
			});
	},
	updateAction:function() {
		var me = this,
			lister		= me.pocket.lister(),
			editor		= me.pocket.editor(),
			store		= editor.getStore(),
			movelister	= me.pocket.movelister()
			getMove		= movelister.getSelectionModel().view.store.data.items,
			mrecord		=  lister.getSelectionModel().getSelection()[0]
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record) {
				record.data.product = getMove;
				if (results.success) {
					var info	= record,
						dirty	= false
				;
				var a = 0;
				info.product().data.each( function( item ) {
					item.set('mold_idcd', info.get('mold_idcd'));
					item.set('line_seqn', a++);
					item.set('_set', 'insert');
					if (item.dirty || item.phantom) {
						dirty = true;
					}
				});
				if (dirty) {
					info.setDirty();
				}
				results.feedback({success : true  });
			}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( lister.getStore().model.modelName , record.data );
								lister.getStore().insert(0, ms);
							} else {
								me.pocket.layout().down('#mainpanel').setDisabled(false);
								me.pocket.search().setDisabled(false);
								ms = lister.getStore().findRecord('mold_idcd', record.get('mold_idcd'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							movelister.getStore().loadData(record.product().data.items, false);
							lister.getSelectionModel().select(ms);
							lister.getStore().commitChanges();
							results.feedback({success : true });
							me.pocket.layout().down('#mainpanel').setDisabled(false);
							me.pocket.search().setDisabled(false);
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
				Ext.ComponentQuery.query('module-moldmast-movesearch')[0].getForm().reset();
				editor.collapse(false);
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
		var	uploadForm = editor.down('[name=uploadForm]'),
			mold_idcd  = editor.down('[name=mold_idcd]').getValue(),
			item_imge  = editor.down('[name=image]').src,
			item_imge2 = editor.down('[name=image2]').src,
			item_imge3 = editor.down('[name=image3]').src,
			item_imge4 = editor.down('[name=image4]').src,
			item_imge5 = editor.down('[name=image5]').src,
			chek1	   = editor.down('[name=imge_chek1]').getValue(),
			chek2	   = editor.down('[name=imge_chek2]').getValue(),
			chek3	   = editor.down('[name=imge_chek3]').getValue(),
			chek4	   = editor.down('[name=imge_chek4]').getValue(),
			chek5	   = editor.down('[name=imge_chek5]').getValue(),
			param={},
			chk1=0, chk2=0, chk3=0, chk4=0, chk5=0
		;
			if(item_imge){
				if(chek1 == "" || chek1 == undefined){
					chk1 = 3;
				}else{
					chk1 = 1;
				}
			}
			if(item_imge2){
				if(chek2 == "" || chek2 == undefined){
					chk2=3;
				}else{
					chk2=1;
				}
			}
			if(item_imge3){
				if(chek3 == "" || chek3 == undefined){
					chk3=3;
				}else{
					chk3=1;
				}
			}
			if(item_imge4){
				if(chek4 == "" || chek4 == undefined){
					chk4=3;
				}else{
					chk4=1;
				}
			}
			if(item_imge5){
				if(chek5 == "" || chek5 == undefined){
					chk5=3;
				}else{
					chk5=1;
				}
			}
			param.stor_grp  = _global.stor_grp;
			param.stor_id = _global.stor_id;
			param.mold_idcd = mold_idcd;
			param.chk1		= chk1;
			param.chk2		= chk2;
			param.chk3		= chk3;
			param.chk4		= chk4;
			param.chk5		= chk5;
			Ext.merge(param, this.params);
			uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
		// submit
		uploadForm.getForm().submit({
			waitMsg:this.waitMsg, // progressbar 띄우기
			success:function(form, action){
				lister.getStore().reload();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
			}
		});

	},

	//취소
	cancelAction:function() {
		var me		= this,
			editor	= me.pocket.editor(),
			lister	= me.pocket.lister()
		;
		editor.down('[title=이미지]').down('[name=image]').setSrc('')
		editor.down('[title=이미지]').down('[name=image2]').setSrc('')
		editor.down('[title=이미지]').down('[name=image3]').setSrc('')
		editor.down('[title=이미지]').down('[name=image4]').setSrc('')
		editor.down('[title=이미지]').down('[name=image5]').setSrc('')
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			listermaster : lister ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	// 이력카드
	historyAction:function() {
		var me = this,
			lister		= me.pocket.lister(),
			jrf			= 'DooinMoldHistory2.jrf',
			resId		= _global.hq_id,
			records		= lister.getSelectionModel().getSelection(),
			record		= lister.getSelectionModel().getSelection()[0],
			mold_idcd	= records[0].get('mold_idcd'),
			arg			= 'mold_idcd~'+mold_idcd,
			url			= '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
		;
		Ext.Ajax.request({
			url :  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
		});
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
