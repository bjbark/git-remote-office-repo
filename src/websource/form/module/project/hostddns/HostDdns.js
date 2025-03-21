
Ext.define('module.project.hostddns.HostDdns', { extend:'Axt.app.Controller',

	requires:
	[
	 	'lookup.popup.project.BonsaPopup',
	 	'lookup.popup.project.HostInfoPopup'
	],

	models:['module.project.hostddns.model.HostDdns'],
	stores:['module.project.hostddns.store.HostDdns'],
	views:[
	       'module.project.hostddns.view.HostDdnsLayout',
	       'module.project.hostddns.view.HostDdnsSearch',
	       'module.project.hostddns.view.HostDdnsLister',
	       'module.project.hostddns.view.HostDdnsEditor'
	],
    initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		// 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용
		me.control({
			// layout event
			'module-hostddns-layout button[action=selectAction]' : { click : me.selectAction }, // 조회
			// editer event
			'module-hostddns-editor button[action=updateAction]' : { click : me.updateAction }, // 저장
			'module-hostddns-editor button[action=cancelAction]' : { click : me.cancelAction }, // 취소
			// lister event
			'module-hostddns-lister button[action=insertAction]' : { click : me.insertAction }, // 저장
			'module-hostddns-lister button[action=modifyAction]' : { click : me.modifyAction }, // 수정
			'module-hostddns-lister button[action=exportAction]' : { click : me.exportAction }, // 엑셀
			// lister event
			'module-hostddns-lister' : {
				selectionchange: me.attachRecord  // 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-hostddns-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-hostddns-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-hostddns-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-hostddns-lister')[0] }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			param = me.pocket.search().getValues(),
			store = lister.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		store.load({
			params:{ param : JSON.stringify(param) }, scope:me,
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}

				mask.hide();
			}
		});
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
			lister = me.pocket.lister()
		;
		editor.insertBefore({
			caller   : me,
			keygen : {
				url    : _global.location.http() + '/listener/seq/default.do',
				object : resource.keygen,
				params : {
					token : _global.token_id ,
					param : JSON.stringify({})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					console.debug('server_id :' , keygen.records);
					editor.insertRecord({
						caller   : me,
						record   : Ext.create( lister.getStore().model.modelName, {
							system_id : keygen.records
						}),
						lister   : lister ,
						disables :[me.pocket.layout().down('#mainpanel')],
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

	/**
	 * 저장
	 */
	updateAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.updateRecord({
			lister : me.pocket.lister(),
			callback : function(results, record, store ) {
				if (results.success) {
					//if(Ext.isEmpty(invoiceType)) {
//					if (record.get('system_gb') && record.get('system_gb') ) {
//						record.set('system_cd' , record.get('system_ow') );
//					} else {
//						record.set('system_cd' , record.get('system_ow') + '.' + record.get('system_gb') );
//					}
					//record.set('system_cd' , Ext.isEmpty(record.get('system_gb')) ? record.get('system_ow') : record.get('system_ow') + '.' + record.get('system_gb') );

//					Ext.isEmpty(invoiceType)

					store.sync({
						success : function(operation){
							editor.collapse(false);
							results.feedback({success : true , visible : true  });
						}, // 저장 성공시
						failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
						callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
					});
				}
			}
		}, me);
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
	}

});


