Ext.define('module.project.tablemanagerv2.TableManagerV2', { extend:'Axt.app.Controller',
	requires:
		[
			'system.Utility',
			'lookup.popup.project.WordPopup',
			'lookup.popup.project.DomainPopup',
			'lookup.popup.project.BonsaPopup'
		],

	models:['module.project.tablemanagerv2.model.TableManagerV2',
			'module.project.tablemanagerv2.model.TableManagerV2Master',
			'module.project.tablemanagerv2.model.TableManagerV2Domain',
			'module.project.tablemanagerv2.model.TableManagerV2DomainUse'
	],
	stores:['module.project.tablemanagerv2.store.TableManagerV2',
			'module.project.tablemanagerv2.store.TableManagerV2Master',
			'module.project.tablemanagerv2.store.TableManagerV2Domain',
			'module.project.tablemanagerv2.store.TableManagerV2DomainUse'
	],
	views:
	[
		'module.project.tablemanagerv2.view.TableManagerV2Layout',
		'module.project.tablemanagerv2.view.TableManagerV2Search',
		'module.project.tablemanagerv2.view.TableManagerV2Lister',
		'module.project.tablemanagerv2.view.TableManagerV2ListerDomain',
		'module.project.tablemanagerv2.view.TableManagerV2ListerDomainUse',
		'module.project.tablemanagerv2.view.TableManagerV2ListerMaster',
		'module.project.tablemanagerv2.view.TableManagerV2Editor'
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
			'module-tablemanagerv2-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-tablemanagerv2-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-tablemanagerv2-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-tablemanagerv2-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-tablemanagerv2-lister button[action=insertAction]' : { click : me.insertAction }, // 신규
			'module-tablemanagerv2-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			'module-tablemanagerv2-lister button[action=deleteAction]' : { click : me.deleteAction }, // 삭제
			'module-tablemanagerv2-lister-master button[action=tableCreate]' : { click : me.createAction }, // 테이블 작성
			// lister event
			'module-tablemanagerv2-lister-master' : {
				selectionchange: me.selectRecord
			},
			'module-tablemanagerv2-lister-domain' : {
				selectionchange: me.selectDomain
			},
			'module-tablemanagerv2-lister' : {
				selectionchange: me.attachRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-lister')[0] },
		master : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-lister-master')[0] },
		domain : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-lister-domain')[0] },
		domainuse : function () { return Ext.ComponentQuery.query('module-tablemanagerv2-lister-domain-use')[0] }
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
			var no = record.get('table_name');
			lister.select({
				callback : function(records, operation, success) {
					if (success) {
					} else { }
				}, scope    : me
			}, Ext.merge( param , { table_name : no }));
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
	createAction:function(callbackFn) {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			master = me.pocket.master(),
			cnt = 0
		;
		if (select.length == 0) {
			Ext.Msg.alert("알림", "작성할 테이블을 선택하여 주시기 바랍니다.");
			return;
		}
		if (master.down('[name=hqof_idcd]').getValue() == "") {
			Ext.Msg.alert("알림", "작성할 회사를 선택하여 주시기 바랍니다.");
			return;
		}
		Ext.each(select, function(record) {
			Ext.Ajax.request({
				url		: _global.location.http() + '/project/tablemanagerv2/get/tablecount.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						hqof_idcd	: master.down('[name=hqof_idcd]').getValue(),
						table_name	: record.get('table_name'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(result.success ){
//						console.log(result.records[0]);
						if(result.records[0]){
							cnt = result.records[0].table_rows;
						}
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		});
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 테이블을 신규 작성하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button!='yes') {
						return
					} else {
						if(cnt != 0 ){
							Ext.Msg.show({ title: '확인', msg: '등록된 자료('+cnt+'건)가 있습니다... 계속진행하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button !='yes') {
										return
									}
								}
							});
						}
					}
				}
			})
		};
		Ext.each(select, function(record) {
			Ext.Ajax.request({
				url		: _global.location.http() + '/project/tablemanagerv2/set/create.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb		: record.get('invc_numb'),
						line_clos		: '1',
						stor_id			: _global.stor_id,
						hqof_idcd		: master.down('[name=hqof_idcd]').getValue(),
						table_name		: record.get('table_name'),
						table_schema	: master.down('[name=table_schema]').getValue()
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
		})
	},
	exportAction :function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});


