Ext.define('module.project.projsite.ProjSite', { extend:'Axt.app.Controller',
	requires: [
	 	'lookup.popup.project.BonsaPopup',
	 	'lookup.upload.FileUpload' ,
	 	'lookup.popup.project.HostInfoPopup',
	 	'lookup.popup.project.ProjInfoPopup'
	 ],
	models:['module.project.projsite.model.ProjSite'],
	stores:['module.project.projsite.store.ProjSite'],
	views: [
	 	'module.project.projsite.view.ProjSiteLayout',
	 	'module.project.projsite.view.ProjSiteSearch',
	 	'module.project.projsite.view.ProjSiteLister',
	 	'module.project.projsite.view.ProjSiteEditor',
	 	'module.project.projsite.view.ProjSiteInsert'

	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	/**
	 *
	 */
	init: function() {
		var me = this;
		me.control({

			'module-projsite-layout button[action=selectAction]' : { click : me.selectAction }, // 조회

			'module-projsite-editor button[action=synchronizer]' : { click : me.synchronizer }, // 싱크
			'module-projsite-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-projsite-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소

			'module-projsite-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-projsite-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-projsite-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-projsite-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제

			'module-projsite-lister' : {
				selectionchange: me.attachRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-projsite-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-projsite-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-projsite-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-projsite-lister')[0] }
	},

	/**
	 *
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister()
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
		}, Ext.merge( me.pocket.search().getValues(), {}) );
	},

	/**
	 *
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
	 *
	 */
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
				}
			}
		});
	},

	/**
	*  
	*/
	insertKeygen:function(config) {
		var me = this
		;
		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-projsite-insert',
			params : { },
			result : function(records) {
				config.callback({
					success     : true,
					selects     : records
				});
			}
		});
	},


	/**
	*
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor()
			lister = me.pocket.lister()
		;
		editor.insertBefore({
			caller : me,
			keygen : {
				object : me.insertKeygen,
				params : {},
				masked : false
			},
			callback : function (keygen){

				console.debug( 'keygen' , keygen );
				if (keygen.success){
					editor.insertRecord({
						action : Const.EDITOR.DEFAULT,
						record : Ext.create( lister.getStore().model.modelName,{
							pjt_id  : keygen.selects.pjt_id  ,
							pjt_nm  : keygen.selects.pjt_nm  ,
							hq_grp	: keygen.selects.hq_grp ,
							hq_id	: keygen.selects.hq_id ,
							stor_grp: keygen.selects.hq_id + '1000',
							stor_id  : keygen.selects.hq_id + '1000',
							ctrl_id	 : keygen.selects.hq_id + '1000',
							login_id : keygen.selects.hq_id + '1000',

							corp_id : keygen.selects.hq_id
						}),
						disables : [ me.pocket.layout().down('#mainpanel') ],
						callback: function (results){
							if (results.success) {
								results.feedback({success : true });
							}
						},
						finished : function(results, record){
							if (results.success){
								editor.expand(false);
							}
						}
					});
				}
			}
		}, me);
	},

	/**
	 *
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
			before : function(results, record ) {
//				if (results.success) {
//					if (record.phantom && Ext.isEmpty(record.get('pjt_id'))) {
//				    	resource.keygen({
//				    		url    : _global.location.http() + '/listener/seq/default.do',
//				    		params : {
//				    			token : _global.token_id ,
//								param : JSON.stringify({})
//				    		},
//				    		async  : false,
//				    		callback : function( keygen ) {
//				    			if (keygen.success) {
//				    				record.dirtyValue('pjt_id' , keygen.records );
//				    				results.feedback({success : true  });
//				    			} else {
//				    				Ext.Msg.alert("error", keygen.message  );
//				    				return;
//				    			}
//				    		}
//				    	});
//					} else { results.feedback({success : true  }); }
//				}
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('pjt_id'))) {
						resource.keygen({
							url     : _global. location.http () + '/listener/seq/maxid.do',
							params	: {
								token	: _global.token_id ,
								param	: JSON. stringify({
									hq_id   : _global.hq_id,
									stor_id : _global.stor_id,
									table_nm: 'pjt_id',
									dt      : new Date ()
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('pjt_id' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							record.set('reinitial', '0');
							store.commitChanges();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});
	},

	/**
	*
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

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	/**
	 *
	 */
	synchronizer :function() {
		var me = this, editor = me.pocket.editor();
		var record = editor.getRecord();
		if (record){
			Ext.Msg.show({
				msg: record.get('hq_nm') + "서버와 동기화를 진행 하시겠습니까?" , buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button === 'yes'){
						record.set('reinitial', '1');
						me.updateAction();
					}
				}
			});
		} else {
			Ext.Msg.show({ msg: '동기화를 할수 없습니다.', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
		}
	}

});


