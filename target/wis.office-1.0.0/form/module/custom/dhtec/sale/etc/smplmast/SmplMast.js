Ext.define('module.custom.dhtec.sale.etc.smplmast.SmplMast', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload',
		],

	models	: [
		'module.custom.dhtec.sale.etc.smplmast.model.SmplMast'
		],
	stores	: [
		'module.custom.dhtec.sale.etc.smplmast.store.SmplMast'
	 	],
	views	: [
		'module.custom.dhtec.sale.etc.smplmast.view.SmplMastLayout',
		'module.custom.dhtec.sale.etc.smplmast.view.SmplMastSearch',
		'module.custom.dhtec.sale.etc.smplmast.view.SmplMastLister',
		'module.custom.dhtec.sale.etc.smplmast.view.SmplMastEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-smplmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-smplmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-smplmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-smplmast-lister button[action=printAction]' : { click : me.printAction }, // 견적서발행
			'module-smplmast-lister button[action=amendAction]' : { click : me.amendAction },	// amend
			'module-smplmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-smplmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-smplmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-smplmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-smplmast-lister'							 : { selectionchange: me.attachRecord },
			'module-smplmast-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-smplmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-smplmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-smplmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-smplmast-lister')[0] },
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

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			lister	= me.pocket.lister()
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

	//amend
	amendAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어  Amend 처리가 불가능합니다.";
				}
				if (err_msg == "") {
					if (record.get("smpl_stat_dvcd") == "4000") {
						err_msg = "출고완료되어  Amend 처리가 불가능합니다.";
					}
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				//return;
			}
		} else {
			Ext.Msg.alert("알림", "자료를 선택하여 주시기 바랍니다.");
			return;
		}

		if(select){
			Ext.Msg.confirm("확인", " Amend 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/dhtec/sale/etc/smplmast/set/amend.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select[0].get('invc_numb'),
								amnd_degr	: select[0].get('amnd_degr'),
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								Ext.Msg.alert("알림","Amend 처리가 되었습니다.");
								lister.getStore().reload();
							} else {
								Ext.Msg.alert("알림", result.message);
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}
			});
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			editor = me.pocket.editor(),
			search = me.pocket.search()
		;

		editor.down('[name=ttsm_amnt]').setReadOnly(true);

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

		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();

		if (select[0].get('line_clos') == '1') {
			editor.down('[itemId=update]').hide();
		}
	},

	//신규
	insertAction:function() {
		var me = this
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;

		editor.down('[name=ttsm_amnt]').setReadOnly(true);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'smpl_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb : keygen.records[0].seq,
							amnd_degr : '1',
							line_clos : '0',
							drtr_idcd : _global.login_pk,
							drtr_name : _global.login_nm,
							smpl_stat_dvcd : '1000'
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function (results) {
							if (results.success) {
								results.feedback({success : true , visible : true });
							}
						}
					});

				}
			}
		});

		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();
	},

	updateAction:function() {
		var me = this,
		editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		store  = lister.getStore()
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) { //유효성검사
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'smpl_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
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
				me.pocket.search().setDisabled(false);
			}
		}, me);

		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();
	},

	//삭제
	deleteAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister()

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
				if (err_msg == "") {
					if (record.get("smpl_stat_dvcd") == "4000") {
						err_msg = "출고완료되어  삭제할 수 없습니다.";
					}
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
			Ext.Msg.show({ title: '확인', msg: '선택하신 자료를 삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/dhtec/sale/etc/smplmast/set/del_yn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
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
									me.pocket.lister().getStore().loadData([],true);
								}
							});
						})
					}
				}
			});
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	// 견적서 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'EstiReport_Dhtec_Smpl.jrf'
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		var invc_numb = select[0].get('invc_numb');
		var arg =	'invc_numb~'+invc_numb+'~';


		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';


		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

});

