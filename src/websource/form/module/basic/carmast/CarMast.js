Ext.define('module.basic.carmast.CarMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
	],
	models	: [
		'module.basic.carmast.model.CarMast',
	],
	stores	: [
		'module.basic.carmast.store.CarMast',
	],
	views	: [
		'module.basic.carmast.view.CarMastLayout',
		'module.basic.carmast.view.CarMastLister',
		'module.basic.carmast.view.CarMastSearch',
		'module.basic.carmast.view.CarMastEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-carmast-layout button[action=selectAction]' : { click : me.selectAction },
			'module-carmast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-carmast-lister button[action=exportAction]' : { click : me.exportAction },

			'module-carmast-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-carmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-carmast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-carmast-lister button[action=deleteAction]' : { click : me.deleteAction },

			'module-carmast-lister'	: { selectionchange: me.selectRecord },
//
//
//


		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-carmast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-carmast-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-carmast-lister')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-carmast-editor')[0] },
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
	selectRecord:function( smodel, record ){
		var me		= this,
			editor	= me.pocket.editor(),
			lister	= smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection()
		});
	},


	//추가
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
						table_nm	: 'car_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							car_idcd : keygen.records[0].seq,
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


	//저장
	updateAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			records = editor.getValues()
		;

		if(records.cars_code == ''){
			Ext.Msg.alert("알림","차량코드를 입력해주세요.");
			return;
//		}else if(records.cars_numb == ''){
//			Ext.Msg.alert("알림","차량번호를 입력해주세요.");
//			return;
		}

		if(records.cars_alis == ''){
			Ext.Msg.alert("알림","차량명을 입력해주세요.");
			return;
		}

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cars_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cars_mast'
								})
							},
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cars_idcd' , keygen.records[0].seq );
									results.feedback({success : true});
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

			finished : function(results, record, operation){
				if (results.success) {
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false)
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
						break;
					}
				}
			}
		});
	},


	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller		: me,
			action		: Const.EDITOR.DEFAULT ,
			callback	: function( results ) {
				if (results.success){
					results.feedback({success : true});
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	//삭제
	deleteAction:function() {
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


	//취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true}); //selectRecord : true
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},


	//엑셀
	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}







});

