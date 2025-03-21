Ext.define('module.custom.sjflv.sale.etc.smplostt.SmplOstt', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup'
		],

	models	: [
		'module.custom.sjflv.sale.etc.smplostt.model.SmplOstt'
		],
	stores	: [
		'module.custom.sjflv.sale.etc.smplostt.store.SmplOstt'
	 	],
	views	: [
		'module.custom.sjflv.sale.etc.smplostt.view.SmplOsttLayout',
		'module.custom.sjflv.sale.etc.smplostt.view.SmplOsttSearch',
		'module.custom.sjflv.sale.etc.smplostt.view.SmplOsttLister',
		'module.custom.sjflv.sale.etc.smplostt.view.SmplOsttEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-smplostt-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event

			'module-smplostt-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-smplostt-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-smplostt-lister menuitem[action=closeAction]'		: { click : me.closeAction}, 		/* 마감 */
			'module-smplostt-lister menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction}, /* 마감취소 */
			'module-smplostt-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-smplostt-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-smplostt-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-smplostt-lister'										: { selectionchange: me.attachRecord },

		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-smplostt-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-smplostt-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-smplostt-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-smplostt-lister')[0] },
	},


	//콤보박스 조회
	selectLookup:function() {
		this.pocket.lister().eraser();
	},

	//조회
	selectAction:function(){
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
				} else {
					me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : record ? record : lister.getSelectionModel().getSelection()
			});
		}
	},

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 자료를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 자료를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/sale/etc/smplostt/set/close_yn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_clos		: '1',
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
										lister.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//마감해지
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") != "1") {
					err_msg = "마감해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 자료를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 자료를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/sale/etc/smplostt/set/close_yn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_clos		: '0',
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
										lister.getStore().reload();
									}
								},
								failure : function(result, request) {
									resource.httpError(response);
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},


	//수정
	modifyAction:function() {
		var me = this,
		select = me.pocket.lister().getSelectionModel().getSelection(),
		lister = me.pocket.lister(),
		editor = me.pocket.editor();

//		if(editor.down('[name=ostt_drtr_idcd]') == null || editor.down('[name=ostt_drtr_idcd]') == ''){
//			editor.down('[name=ostt_drtr_idcd]').setValue(_global.login_id);
//			editor.down('[name=ostt_drtr_name]').setValue(_global.login_nm);
//		}

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


		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();

		if (select[0].get('line_clos') == '1') {
			editor.down('[itemId=update]').hide();
		}
	},

	updateAction:function() {
		var me = this,
		editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		store  = lister.getStore()

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'smpl_mast',
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
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
				}
			}
		});
		lister.getStore().reload();
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
				me.pocket.search().setDisabled(false);
			}
		}, me);

		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();
	},


	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

