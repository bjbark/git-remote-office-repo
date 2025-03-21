Ext.define('module.custom.iypkg.basic.boxtype.BoxType', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.BoltNumbPopup',
		'lookup.upload.BoardUpload'
	],

	models:
	[
	 	'module.custom.iypkg.basic.boxtype.model.BoxType',
	 	'module.custom.iypkg.basic.boxtype.model.BoxTypeMemo',
	 	'module.custom.iypkg.basic.boxtype.model.BoxTypeFile'
	],
	stores:
	[
	 	'module.custom.iypkg.basic.boxtype.store.BoxType',
	 	'module.custom.iypkg.basic.boxtype.store.BoxTypeMemo',
	 	'module.custom.iypkg.basic.boxtype.store.BoxTypeFile'
	],
	views:
	[
		'module.custom.iypkg.basic.boxtype.view.BoxTypeLayout',
		'module.custom.iypkg.basic.boxtype.view.BoxTypeSearch',
		'module.custom.iypkg.basic.boxtype.view.BoxTypeLister',
		'module.custom.iypkg.basic.boxtype.view.BoxTypeEditor',
		'module.custom.iypkg.basic.boxtype.view.BoxTypeEditorLister',
		'module.custom.iypkg.basic.boxtype.view.BoxTypeMemoLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-boxtype-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
//			'module-boxtype-editor button[action=showImg]'      : { click : me.showImg      },	// 저장
			'module-boxtype-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-boxtype-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-boxtype-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-boxtype-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-boxtype-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-boxtype-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-boxtype-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-boxtype-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-boxtype-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-boxtype-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-boxtype-editor')[0] },
	},


	//조회
	selectAction : function() {
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
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues()

		;
		editor.down('[name=image]').setSrc('');

		if(record.length > 0){
			idcd = record[0].data.bxty_idcd;
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/iypkg/basic/boxtype/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						bxty_idcd		: idcd,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var bxty_imge = result.records[0].bxty_imge;
						var bxty_imge_name = result.records[0].bxty_imge_name;
						if(bxty_imge != undefined){
							var x = bxty_imge.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[name=image]').setSrc(url);
							editor.down('[name=bxty_imge_name]').setValue(bxty_imge_name);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
//					{ invc_numb : record[0].get('item_idcd'),orgn_dvcd : 'item_mast',line_seqn: '0' });
//			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('item_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
		if(record!=''){
			editor.selectRecord({ record : record }, me);
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			record = lister.getSelectionModel().getSelection()[0]
		;
		if(record){
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/iypkg/basic/boxtype/get/image.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							bxty_idcd		: record.data.bxty_idcd,
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
						} else {
							var bxty_imge = result.records[0].bxty_imge;
							if(bxty_imge != undefined){
								var x = bxty_imge.toString();
								var img = new Uint8Array(x.split(",")),
								blob = new Blob([img],{type:'image/png'}),
								url = URL.createObjectURL(blob);
								editor.down('[name=image]').setSrc(url);
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});

			editor.modifyRecord({
				caller	: me,
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
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
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		editor.down('[name=image]').setSrc('');
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm   	: 'boxtype_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							bxty_idcd : keygen.records[0].seq,
							line_stat : '0'
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

	updateAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor(),
			search	= me.pocket.search(),
			store	= lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('bxty_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'boxtype_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('bxty_idcd' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else {  results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							var	uploadForm = editor.down('[name=uploadForm]'),
								select     = lister.getSelectionModel().getSelection()[0],
								item_idcd  = '',
								item_imge  = editor.down('[name=image]').src,
								chek1	   = editor.down('[name=imge_chek1]').getValue(),
								param={},
								chk1=0, chk2=0
							;
							 bxty_idcd  = editor.down('[name=bxty_idcd]').getValue();

							 if(item_imge){
								if(chek1 == "" || chek1 == undefined){
									chk1 = 3;
								}
								else{
									chk1 = 1;
								}
							}

							param.stor_grp  = _global.stor_grp;
							param.stor_id = _global.stor_id;
							param.bxty_idcd = bxty_idcd;
							param.chk1		= chk1;
							Ext.merge(param, this.params);
							uploadForm.getForm().setValues({
								param : JSON.stringify(param)
							});
							if(chk1 != '0'){
								//submit
								uploadForm.getForm().submit({
									waitMsg:this.waitMsg, // progressbar 띄우기
									success:function(form, action){
										editor.down('[name=image]').setSrc('');
										editor.down('[name=files]').fileInputEl.dom.value = '';
										store.reload();
									},
									failure: function(form, action) {
										Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
									}
								});
							}

							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );

				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
				}
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},
	//삭제
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister		: me.pocket.lister(),
			callback	: function(results, record, store) {
				store.sync({
					success : function(operation){

						results.feedback({success : true , visible : false });
					}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

//	showImg : function () {
//		var me = this,
//			editor = me.pocket.editor(),
//			lister = me.pocket.lister(),
//			record = lister.getSelectionModel().getSelection()[0],
//			idcd = ''
//		;
//		if (record.data.bxty_idcd != ''){
//			idcd = record.data.bxty_idcd;
//		}
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/custom/iypkg/basic/boxtype/get/image.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					stor_id			: _global.stor_id,
//					hqof_idcd		: _global.hqof_idcd,
//					bxty_idcd		: idcd,
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//				} else {
//					if(result.records[0].bxty_imge.length > 0){
//					var bxty_imge = result.records[0].bxty_imge;
//					console.log(bxty_imge,'bxty_imge');
//					if(bxty_imge != undefined){
//							var x = bxty_imge.toString();
//							var img = new Uint8Array(x.split(",")),
//							blob = new Blob([img],{type:'image/png'}),
//							url = URL.createObjectURL(blob);
//
//							editor.down('[name=bxty_imge]').setSrc(url);
//						}
//					}else{
//						Ext.Msg.alert("알림", "도면을 등록해주세요.");
//					}
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});
//	}
});
