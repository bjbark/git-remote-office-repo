Ext.define('module.prod.basic.wkctmast.WkctMast', { extend:'Axt.app.Controller',

	requires : ['Axt.popup.view.ZipcodeSearch',
				'lookup.popup.view.DeptPopup',
				'lookup.popup.view.LaboRatePopup',
				'lookup.popup.view.CstmPopup'
	],
	models	: [
		'module.prod.basic.wkctmast.model.WkctMast',
		'module.prod.basic.wkctmast.model.WkctMastOtod',
		'module.prod.basic.wkctmast.model.WkctMastOtod2'
	],
	stores	: [
		'module.prod.basic.wkctmast.store.WkctMast',
		'module.prod.basic.wkctmast.store.WkctMastOtod',
		'module.prod.basic.wkctmast.store.WkctMastOtod2'
	],
	views	: [
		'module.prod.basic.wkctmast.view.WkctMastLayout',
		'module.prod.basic.wkctmast.view.WkctMastSearch',
		'module.prod.basic.wkctmast.view.WkctMastLister',
		'module.prod.basic.wkctmast.view.WkctMastEditor',
		'module.prod.basic.wkctmast.view.WkctMastOtodLister',
		'module.prod.basic.wkctmast.view.WkctMastOtodLister2'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wkctmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-wkctmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-wkctmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-wkctmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-wkctmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-wkctmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-wkctmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-wkctmast-lister' : { selectionchange: me.attachRecord },
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-wkctmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-wkctmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-wkctmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-wkctmast-lister')[0] }
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
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
	},

	/**
	 * 선택
	 */
	attachRecord : function( smodel, record ){
		var me		= this,
			editor	= me.pocket.editor(),
			lister	= smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me,
			lister : lister,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},

	//선택
	selectRecord : function( grid, record ) {
		var me = this,
		editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller	: me,
			action	: Const.EDITOR.DEFAULT ,
			callback: function( results ) {
				console.log('Call Back routine');
				if (results.success){
					console.log('Call Back success routine');
					results.feedback({success : true});
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			},
			finished : function(results, record) {
				console.log('Finish routine');
				if (results.success){
					console.log('Finish success routine');
					editor.expand(false);
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
		var line_ordr = 1;

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lineordr.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					_set			: 'delete'
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
					if(result.records.length > 0){
						line_ordr = result.records[0].line_ordr;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		console.log(line_ordr);
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'wkct_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							wkct_idcd : keygen.records[0].seq,
							line_ordr : line_ordr
						}),
						lister	: lister,
						disables:[me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
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
	updateAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
//
//		var a = Ext.ComponentQuery.query('#otod_yorn')[0].getValue(); //외주
//		var b = Ext.ComponentQuery.query('#cstm_idcd')[0].getValue(); //외주업체
//
//		if	(a>0 && b==''){
//			Ext.Msg.show({ title: '알림', msg: '외주업체를 등록해야합니다', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
//			return;
//		}
//		else if	(a==0 && b!= ''){
//				Ext.Msg.show({ title: '알림', msg: '외주가 없을시에 외주업체를 등록못합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
//				return;
//		}

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('wkct_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'wkct_mast'
								})
							},
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('wkct_idcd' , keygen.records[0].seq );
									record.dirtyValue('wkct_name' , keygen.records[0].seq );
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
			finished : function(results, record, operation) {
				if (results.success) {
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
						break;
					}
				}
			}
		});
	},

	//취소
	cancelAction : function() {
		var me = this,
		editor = me.pocket.editor();
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
	deleteAction : function() {
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

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});