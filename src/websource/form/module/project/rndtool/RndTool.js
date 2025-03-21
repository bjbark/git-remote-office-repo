Ext.define('module.project.rndtool.RndTool', { extend:'Axt.app.Controller',
	requires:
		[
		 	'system.Utility',
		 	'lookup.popup.project.WordPopup',
		 	'lookup.popup.project.GridFieldPopup',
		 	'lookup.popup.project.TablePopup'
		],

	models:['module.project.rndtool.model.RndTool',
	        'module.project.rndtool.model.RndToolModule',
	        'module.project.rndtool.model.RndToolView',
	        'module.project.rndtool.model.RndToolScript'
	],
	stores:['module.project.rndtool.store.RndTool',
	        'module.project.rndtool.store.RndToolModule',
	        'module.project.rndtool.store.RndToolView',
	        'module.project.rndtool.store.RndToolScript'
    ],
	views:
	[
	 	'module.project.rndtool.view.RndToolLayout',
	 	'module.project.rndtool.view.RndToolSearch',
	 	'module.project.rndtool.view.RndToolLister',
	 	'module.project.rndtool.view.RndToolListerScript',
	 	'module.project.rndtool.view.RndToolListerModule',
	 	'module.project.rndtool.view.RndToolListerView',
	 	'module.project.rndtool.view.RndToolEditor',
	 	'module.project.rndtool.view.RndToolInsertPopup'
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
			'module-rndtool-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-rndtool-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-rndtool-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-rndtool-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-rndtool-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-rndtool-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-rndtool-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			'module-rndtool-lister-view button[action=insertAction]' : { click : me.makeAction }, // 신규
			'module-rndtool-lister-view button[action=exportAction]' : { click : me.scriptAction }, // 신규
			// lister event
			'module-rndtool-lister-module' : {
				selectionchange: me.selectRecord
			},
			'module-rndtool-lister-view' : {
				selectionchange: me.selectView
			},
			'module-rndtool-lister' : {
				selectionchange: me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-rndtool-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-rndtool-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-rndtool-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-rndtool-lister')[0] },
		module : function () { return Ext.ComponentQuery.query('module-rndtool-lister-module')[0] },
		view   : function () { return Ext.ComponentQuery.query('module-rndtool-lister-view')[0] },
		script : function () { return Ext.ComponentQuery.query('module-rndtool-lister-script')[0] }
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
			lister = me.pocket.module();
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
	 *
	 */
	selectRecord:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			record = records[0]
		;
		lister = me.pocket.view();
		if (record) {
			var no = record.get('modl_id');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { modl_id : no }));
		}
	},
	/**
	 *
	 */
	selectView:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			record = records[0]
		;
		lister = me.pocket.lister();
		if (record) {
			var no = record.get('modl_id');
			var v  = record.get('view_id');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { modl_id : no , view_id : v}));
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
			master = me.pocket.view(),
			search = me.pocket.search()
		;
		var select = master.getSelectionModel().getSelection()[0];
		editor.insertRecord({
			action : Const.EDITOR.DEFAULT,
			record : Ext.create( lister.getStore().model.modelName,{
				modl_id : select.get('modl_id'),
				modl_nm : select.get('modl_nm'),
				view_id : select.get('view_id'),
				view_nm : select.get('view_nm')
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
				me.pocket.layout().down('#mainpanel').setDisabled(false);
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

	makeAction:function() {
		var me = this
		resource.loadPopup({
			widget : 'module-rndtool-insert-popup',
		})
	},
	scriptAction:function( grid, records ){
		var me = this,
			lister = undefined,
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			record = records[0]
		;
		var select = me.pocket.view().getSelectionModel().getSelection()[0];
		console.debug('xxxxxxxxxxxxxxxxxx',select.get('modl_id'));
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister = me.pocket.script();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
			}, Ext.merge( param, { modl_id : select.get('modl_id'), view_id : select.get('view_id') })
		);

	},

	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});


