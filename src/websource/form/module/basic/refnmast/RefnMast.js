Ext.define('module.basic.refnmast.RefnMast', { extend : 'Axt.app.Controller',
	requires: [
		 'module.common.view.SearchBar'
		,'module.common.view.SearchRowStatus'
		,'Axt.popup.view.ZipcodeSearch'
		,'Axt.popup.view.FileUpload'
		,'lookup.popup.view.RefnPopup'
	],
	models:[
		'module.basic.refnmast.model.RefnMast'
	],
	stores:
	[
	 	'module.basic.refnmast.store.RefnMast'
	],
	views:[
		'module.basic.refnmast.view.RefnMastSearch',
		'module.basic.refnmast.view.RefnMastLayout',
		'module.basic.refnmast.view.RefnMastLister',
		'module.basic.refnmast.view.RefnMastEditor'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.selectAction();
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({
			'module-refnmast-layout button[action=selectAction]' : { click : me.selectAction } ,
			'module-refnmast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-refnmast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-refnmast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-refnmast-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-refnmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-refnmast-editor button[action=cancelAction]' : { click : me.cancelAction },	

			'module-refnmast-lister' : { selectionchange: me.attachRecord },
			'module-refnmast-search combobox[name=prnt_idcd]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},

	/**
	 *
	 */
	pocket : {
		search  : function () { return Ext.ComponentQuery.query('module-refnmast-search')[0] },
		layout  : function () { return Ext.ComponentQuery.query('module-refnmast-layout')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-refnmast-editor')[0] },
		lister  : function () { return Ext.ComponentQuery.query('module-refnmast-lister')[0] }
	},

	/**
	 * 상위메뉴조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search()
		;
		if (!Ext.isEmpty(search.getValues().refn_dvcd )) {
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success && records.length > 0) {
						lister.getSelectionModel().select(0);
					} else {
						me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( search.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
		}
	},

	selectLookup:function() {
		this.selectAction();
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


	/**
	 * 수정
	 */
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
		}editor.modifyRecord({
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

	/**
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param	= search.getValues()
		;

		if(param.refn_dvcd == '' || param.refn_dvcd == null){
			Ext.Msg.alert("알림","코드구분을 선택해 추가해주세요.");
			return;
		}

		if (!Ext.isEmpty(search.getValues().refn_dvcd )) {
			editor.insertRecord({
				action : Const.EDITOR.DEFAULT,
				record : Ext.create( lister.getStore().model.modelName,{
					refn_dvcd	: search.getValues().refn_dvcd,
				}),
				disables : [ me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
				callback: function (results){
					if (results.success) {
						setTimeout(function(){
							editor.down('[name=refn_code]').focus(true , 10);
						},200);
						results.feedback({success : true });
					}
				},
				finished : function(results, record){
					if (results.success){
						editor.expand(false);
					}
				}
			})
		}
	},

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
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
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}

					store.reload();
				}
			}
		});
	},

	/**
	* 취소
	*/
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller   : me,

			action   : Const.EDITOR.DEFAULT ,
			callback : function(results, record){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					results.feedback( {success : true , reload : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.collapse(false);
				}
			}
		});
	},

	/**
	 * 삭제
	 */
	deleteAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.deleteRecord({
			lister   : me.pocket.lister(),
			callback : function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},
});

