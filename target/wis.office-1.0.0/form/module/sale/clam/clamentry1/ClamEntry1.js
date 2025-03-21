Ext.define('module.sale.clam.clamentry1.ClamEntry1', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.sale.clam.clamentry1.model.ClamEntry1Lister',
		'module.sale.clam.clamentry1.model.ClamEntry1File'
	],
	stores	: [
		'module.sale.clam.clamentry1.store.ClamEntry1Lister',
		'module.sale.clam.clamentry1.store.ClamEntry1File'
	],
	views	: [
		'module.sale.clam.clamentry1.view.ClamEntry1Layout',
		'module.sale.clam.clamentry1.view.ClamEntry1Search',
		'module.sale.clam.clamentry1.view.ClamEntry1Lister',
		'module.sale.clam.clamentry1.view.ClamEntry1EditorLister',
		'module.sale.clam.clamentry1.view.ClamEntry1Editor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-clamentry1-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-clamentry1-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-clamentry1-lister menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-clamentry1-lister menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감취소 */

			'module-clamentry1-lister button[action=modifyAction]'			: { click : me.modifyAction },
			'module-clamentry1-lister button[action=insertAction]'			: { click : me.insertAction },
			'module-clamentry1-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-clamentry1-lister button[action=deleteAction]'			: { click : me.deleteAction },
			'module-clamentry1-lister button[action=printAction]'			: { click : me.printAction },	// 실험의뢰서 출력
			'module-clamentry1-lister'										: { selectionchange: me.attachRecord },

			'module-clamentry1-editor button[action=updateAction]'			: { click : me.updateAction },
			'module-clamentry1-editor button[action=cancelAction]'			: { click : me.cancelAction },

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-clamentry1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-clamentry1-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-clamentry1-lister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-clamentry1-editor')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-clamentry1-editorlister')[0] }
	},

	//조회
	selectAction:function(grid, record) {
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
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );

		mask.hide();

	},

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			editorlister = me.pocket.editorlister(),
			lister	= me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : record ? record : lister.getSelectionModel().getSelection()
			});

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : editor.getRecord().data.invc_numb,orgn_dvcd : 'clam_mast', line_seqn : 1 });
			editorlister.down('[name=file]').popup.params.invc_numb = editor.getRecord().data.invc_numb;
		}
	},

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
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
			Ext.Msg.alert("알림", "마감할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'clam_mast'
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
					}
				}
			});
		}
	},

	//마감해지
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
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
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'clam_mast'
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
					}
				}
			});
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			editorlister	= me.pocket.editorlister()
		;

		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);

		editor.down('[itemId=update]').show();
		editor.down('[itemId=cancel]').show();

		editor.down('[name=ostt_date]').setReadOnly(true);
		editor.down('[name=ostt_qntt]').setReadOnly(true);
		editor.down('[name=istt_date]').setReadOnly(true);
		editor.down('[name=istt_qntt]').setReadOnly(true);
		editor.down('[name=make_cmpy_name]').setReadOnly(true);
		editor.down('[name=mker_lott_numb]').setReadOnly(true);
		editor.down('[name=labr_memo]').setReadOnly(true);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'clam_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb : keygen.records[0].seq,
							line_clos : '0',
							drtr_idcd : _global.login_pk,
							drtr_name : _global.login_nm
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
	},


	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search()


		editor.down('[name=labr_memo]').setReadOnly(false);

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
	},


	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		master		= me.pocket.lister(),
		editor		= me.pocket.editor(),
		values		= editor.getValues()

		editor.down('[name=labr_memo]').setReadOnly(false);

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false)
			}
		}, me);
		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();

	},


	//저장
	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore()
		;

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
									table_nm	: 'clam_mast',
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

	},

	deleteAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			select	= lister.getSelectionModel().getSelection()


		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}

			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select[0]) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						record.dirtyValue('line_stat', '2');
						record.store.commitChanges();
					});
				Ext.each(select, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/clam/clamentry1/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
								line_stat	: '2',
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								lister.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
	},

	// 실험 의뢰서 출력
	printAction : function() {
		var me = this,
		lister = me.pocket.lister(),
		select = me.pocket.lister().getSelectionModel().getSelection(),
		jrf ,
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			var values = select[0].get('acct_bacd');

			switch (values) {
			case '1001': jrf='sjflv_clam_material.jrf'; arg ;
				break;
			case '3000': jrf='sjflv_clam_product.jrf';arg;
				break;
			break;
		}

			console.log(values);

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

