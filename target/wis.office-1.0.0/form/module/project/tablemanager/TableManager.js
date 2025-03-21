Ext.define('module.project.tablemanager.TableManager', { extend:'Axt.app.Controller',
	requires:
		[
			'system.Utility',
			'lookup.popup.project.WordPopup',
			'lookup.popup.project.DomainPopup'
		],

	models:['module.project.tablemanager.model.TableManager',
			'module.project.tablemanager.model.TableManagerMaster',
			'module.project.tablemanager.model.TableManagerDomain',
			'module.project.tablemanager.model.TableManagerDomainUse'
	],
	stores:['module.project.tablemanager.store.TableManager',
			'module.project.tablemanager.store.TableManagerMaster',
			'module.project.tablemanager.store.TableManagerDomain',
			'module.project.tablemanager.store.TableManagerDomainUse'
	],
	views:
	[
		'module.project.tablemanager.view.TableManagerLayout',
		'module.project.tablemanager.view.TableManagerSearch',
		'module.project.tablemanager.view.TableManagerLister',
		'module.project.tablemanager.view.TableManagerListerDomain',
		'module.project.tablemanager.view.TableManagerListerDomainUse',
		'module.project.tablemanager.view.TableManagerListerMaster',
		'module.project.tablemanager.view.TableManagerEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	/**
	 *
	 */
	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-tablemanager-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-tablemanager-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-tablemanager-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-tablemanager-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-tablemanager-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-tablemanager-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-tablemanager-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			// lister event
			'module-tablemanager-lister-master' : {
				selectionchange: me.selectRecord
			},
			'module-tablemanager-lister-domain' : {
				selectionchange: me.selectDomain
			},
			'module-tablemanager-lister' : {
				selectionchange: me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-tablemanager-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-tablemanager-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-tablemanager-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-tablemanager-lister')[0] },
		master : function () { return Ext.ComponentQuery.query('module-tablemanager-lister-master')[0] },
		domain : function () { return Ext.ComponentQuery.query('module-tablemanager-lister-domain')[0] },
		domainuse : function () { return Ext.ComponentQuery.query('module-tablemanager-lister-domain-use')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = undefined,
			search = me.pocket.search()
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if  (tindex == 0) {
			lister = me.pocket.master();
		}else if (tindex==1){
			lister = me.pocket.domain();
		}
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
	 * 레코드 선택
	 */
	selectRecord:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			record = records[0]
		;
		lister = me.pocket.lister();
		if (record) {
			var no = record.get('tabl_idcd');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { tabl_name : no }));
		}
	},
	/**
	 * 레코드 선택
	 */
	selectDomain:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			record = records[0]
		;
		lister = me.pocket.domainuse();
		if (record) {
			var engl_fied_name = record.get('engl_fied_name');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { engl_fied_name : engl_fied_name }));
		}
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
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					results.feedback({success : true});
					me.pocket.layout().down('#mainpanel').setDisabled(true);
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
	* 신규
	*/
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			master = me.pocket.master(),
			search = me.pocket.search()
		;
		var select = master.getSelectionModel().getSelection()[0];
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
				tabl_name : select.get('tabl_idcd')
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
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
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
					results.feedback( {success : true , reload : true });
					me.pocket.layout().down('#mainpanel').setDisabled(false);
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

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});


