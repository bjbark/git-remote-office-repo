Ext.define('module.custom.symct.sale.prjtmast.PrjtMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup'
	],

	models	: [
		'module.custom.symct.sale.prjtmast.model.PrjtMastMaster'
	],
	stores	: [
		'module.custom.symct.sale.prjtmast.store.PrjtMastMaster'
	],
	views	: [
		'module.custom.symct.sale.prjtmast.view.PrjtMastLayout',
		'module.custom.symct.sale.prjtmast.view.PrjtMastSearch',
		'module.custom.symct.sale.prjtmast.view.PrjtMastListerMaster',
		'module.custom.symct.sale.prjtmast.view.PrjtMastEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtmast-layout button[action=selectAction]': { click : me.selectAction },	// 조회
			// lister detail event
			'module-prjtmast-lister-master button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-prjtmast-lister-master button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-prjtmast-lister-master button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-prjtmast-lister-master button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// editer event
			'module-prjtmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-prjtmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			'module-prjtmast-lister-master' : { selectionchange: me.attachRecord },	//수정

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-prjtmast-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-prjtmast-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-prjtmast-lister-master')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-prjtmast-editor')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.listermaster(),
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
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
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

	//수정
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
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
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
							table_nm	: 'prjt_mast',
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listermaster.getStore().model.modelName,{
								prjt_idcd : keygen.records[0].seq
							}),
							listermaster: listermaster,
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
			lister = me.pocket.listermaster(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('prjt_code'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'prjt_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('prjt_code' , keygen.records[0].seq );
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

	//선택
	selectRecord : function(grid, record) {
		var me = this,
			master = me.pocket.listermaster()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			master.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { prjt_idcd : record.get('prjt_idcd') });
		}
	},

	//삭제
	deleteAction : function() {
		var me = this, editor = me.pocket.editor();
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

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.listermaster(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	}
});