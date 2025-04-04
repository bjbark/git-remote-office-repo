 Ext.define('module.basic.wrhszone.WrhsZone', { extend:'Axt.app.Controller',

	requires: [ 'lookup.popup.view.WrhsPopup'],
	models	: ['module.basic.wrhszone.model.WrhsZone'],
	stores	: ['module.basic.wrhszone.store.WrhsZone'],
	views	: [
		'module.basic.wrhszone.view.WrhsZoneLayout',
		'module.basic.wrhszone.view.WrhsZoneSearch',
		'module.basic.wrhszone.view.WrhsZoneLister',
		'module.basic.wrhszone.view.WrhsZoneEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wrhszone-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-wrhszone-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-wrhszone-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-wrhszone-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-wrhszone-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-wrhszone-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-wrhszone-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-wrhszone-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-wrhszone-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-wrhszone-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-wrhszone-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-wrhszone-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.wrhs_idcd == '' || param.wrhs_idcd == null){
			Ext.Msg.alert("알림","창고를 선택하여 주시기 바랍니다.");
			return;
		}
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
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	//수정
	modifyAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
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
			search = me.pocket.search()
			param = search.getValues()
		;
		if(param.wrhs_idcd == '' || param.wrhs_idcd == null){
			Ext.Msg.alert("알림","창고를 선택하여 주시기 바랍니다.");
			return;
		}
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'wrhs_zone'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							zone_idcd : keygen.records[0].seq,
							wrhs_idcd : param.wrhs_idcd
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results) {
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
			zone_idcd = me.pocket.editor().down('[name=zone_idcd]').getValue(),
			zone_name = editor.down('[name=zone_name]').getValue()
		;
		if(zone_name == '' || zone_name == null ){
			Ext.Msg.alert("알림","구역을 확인하여 주시기 바랍니다.");
			return;
		}
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('zone_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'wrhs_zone'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('zone_idcd' , keygen.records[0].seq );
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
					console.log(store);
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
					me.pocket.search().setDisabled(false)
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
				me.pocket.search().setDisabled(false)
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