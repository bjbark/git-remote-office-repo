Ext.define('module.sale.clam.clamentry2.ClamEntry2', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.sale.clam.clamentry2.model.ClamEntry2Lister',
		'module.sale.clam.clamentry2.model.ClamEntry2File'
	],
	stores	: [
		'module.sale.clam.clamentry2.store.ClamEntry2Lister',
		'module.sale.clam.clamentry2.store.ClamEntry2File'
	],
	views	: [
		'module.sale.clam.clamentry2.view.ClamEntry2Layout',
		'module.sale.clam.clamentry2.view.ClamEntry2Search',
		'module.sale.clam.clamentry2.view.ClamEntry2Lister',
		'module.sale.clam.clamentry2.view.ClamEntry2Editor',
		'module.sale.clam.clamentry2.view.ClamEntry2EditorLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-clamentry2-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-clamentry2-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-clamentry2-lister menuitem[action=closeAction]'			: { click : me.closeAction}, 		/* 마감 */
			'module-clamentry2-lister menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction}, /* 마감취소 */
			'module-clamentry2-lister button[action=modifyAction]'			: { click : me.modifyAction },
			'module-clamentry2-lister button[action=printAction]'			: { click : me.printAction },		// 원인규명서발행
			'module-clamentry2-lister button[action=exportAction]'			: { click : me.exportAction },

			'module-clamentry2-lister'										: { selectionchange: me.attachRecord },

			'module-clamentry2-editor button[action=clearAction]'			: { click : me.clearAction },	//조회2
			'module-clamentry2-editor button[action=updateAction]'			: { click : me.updateAction },
			'module-clamentry2-editor button[action=cancelAction]'			: { click : me.cancelAction },

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-clamentry2-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-clamentry2-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-clamentry2-lister')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-clamentry2-editor')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-clamentry2-editorlister')[0] }
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
			lister = smodel ? smodel.view.ownerCt : me.pocket.lister()
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

	clearAction:function() {
		var me = this,
			editor = me.pocket.editor();

		editor.down('[name=proc_date]').setValue(null);
		editor.down('[name=proc_drtr_name]').setValue(null);
		editor.down('[name=proc_drtr_idcd]').setValue(null);
		editor.down('[name=clam_proc_dvcd]').setValue(null);
		editor.down('[name=stok_proc_dvcd]').setValue(null);
		editor.down('[name=caus_memo]').setValue(null);
		editor.down('[name=proc_memo]').setValue(null);
		editor.down('[name=mesu_memo]').setValue(null);
	},

	// 접수 규명서 출력
	printAction : function() {
		var me = this,
		lister = me.pocket.lister(),
		select = me.pocket.lister().getSelectionModel().getSelection(),
		jrf = 'sjflv_clam2.jrf',
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
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search()

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
		lister.getStore().reload();
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		master		= me.pocket.lister(),
		editor		= me.pocket.editor(),
		values		= editor.getValues()

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false)
			}
		}, me);
		edit.tab.show();
		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();
	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

