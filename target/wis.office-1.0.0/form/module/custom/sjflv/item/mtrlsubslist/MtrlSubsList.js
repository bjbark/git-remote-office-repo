Ext.define('module.custom.sjflv.item.mtrlsubslist.MtrlSubsList', { extend:'Axt.app.Controller',

	requires : [
				'lookup.popup.view.BasePopup',
				'lookup.popup.view.UserPopup',
				'lookup.popup.view.BzplPopup',
				'lookup.popup.view.ItemPopupV4',
				'lookup.popup.view.ItemPopupSjflv',
				'lookup.popup.view.CstmClassPopup',
				'Axt.popup.view.ZipcodeSearch'
		],
	models	: ['module.custom.sjflv.item.mtrlsubslist.model.MtrlSubsList'],
	stores	: ['module.custom.sjflv.item.mtrlsubslist.store.MtrlSubsList'],
	views	: [
		'module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListLayout',
		'module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListSearch',
		'module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListLister',
		'module.custom.sjflv.item.mtrlsubslist.view.MtrlSubsListEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-mtrlsubslist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-mtrlsubslist-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-mtrlsubslist-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-mtrlsubslist-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-mtrlsubslist-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-mtrlsubslist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-mtrlsubslist-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-mtrlsubslist-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			},
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-mtrlsubslist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-mtrlsubslist-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-mtrlsubslist-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-mtrlsubslist-lister')[0] }
	},

	//조회
	selectAction:function() {
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
		editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//수정
	modifyAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.modifyRecord({
			caller   : me,
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url			: _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm   	: 'mtrl_subs_mast'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								invc_numb : keygen.records[0].seq,
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
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'mtrl_subs_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
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
						callback: function(operation){ results.callback({});}
					});
				}
			},

			finished : function(results, record, operation){
				if (results.success) {
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

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
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
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({																					// 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},		// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },						// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }										// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});