Ext.define('module.custom.kortc.qc.insp.insplist.InspList', {  extend   : 'Axt.app.Controller',
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
		'module.custom.kortc.qc.insp.insplist.model.InspListLister',
		'module.custom.kortc.qc.insp.insplist.model.InspListFile'
	],
	stores	: [
		'module.custom.kortc.qc.insp.insplist.store.InspListLister',
		'module.custom.kortc.qc.insp.insplist.store.InspListFile'
	],
	views	: [
		'module.custom.kortc.qc.insp.insplist.view.InspListLayout',
		'module.custom.kortc.qc.insp.insplist.view.InspListSearch',
		'module.custom.kortc.qc.insp.insplist.view.InspListLister',
		'module.custom.kortc.qc.insp.insplist.view.InspListDetail',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-insplist-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-insplist-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-insplist-lister2 menuitem[action=okAction]'			: { click : me.okAction           }, /* 승인 */
			'module-insplist-lister2 menuitem[action=okCancelAction]'		: { click : me.okCancelAction     }, /* 승인취소 */

			'module-insplist-lister button[action=insertAction]'			: { click : me.insertAction },
			'module-insplist-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-insplist-lister'										: { selectionchange: me.attachRecord },
			'module-insplist-lister2 button[action=deleteAction]'			: { click : me.deleteAction },
			'module-insplist-lister2 button[action=printAction]'			: { click : me.printAction },	// 부적합보고서 출력

			'module-insplist-editor button[action=updateAction]'			: { click : me.updateAction },
			'module-insplist-editor button[action=cancelAction]'			: { click : me.cancelAction },

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-insplist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-insplist-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query(' module-insplist-lister')[0] },
		file: function () { return Ext.ComponentQuery.query('module-insplist-detail')[0] }
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
//			lister.select({
//				callback:function(records, operation, success) {
//					if (success) {
//						lister.getSelectionModel().select(0);
//					} else {}
//				}, scope:me
//			}, Ext.merge( param, {stor_id : _global.stor_id}) );

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
//		if(record!=''){
//			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
//
//			editor.attachRecord({
//				caller : me ,
//				lister : lister ,
//				record : record ? record : lister.getSelectionModel().getSelection()
//			});
//
//			editorlister.select({
//				callback:function(records, operation, success) {
//					if (success) {
//					} else { me.pocket.editor().getForm().reset(true);}
//				}, scope:me
//			}, { invc_numb : editor.getRecord().data.invc_numb,orgn_dvcd : 'clam_mast', line_seqn : 1 });
//			editorlister.down('[name=file]').popup.params.invc_numb = editor.getRecord().data.invc_numb;
//		}
	},

	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("acpt_stat_dvcd") == "0011") {
					err_msg = "이미 승인되었습니다.";
				}
				if (record.get("acpt_stat_dvcd") != "0010") {
					err_msg = "승인할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('acpt_stat_dvcd', '0011'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/kortc/qc/insp/saleorder/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										acpt_stat_dvcd	: '0011',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
										master.getStore().reload();
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
	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("acpt_stat_dvcd") != "0011" || record.get("cnt") > 0 || record.get("pdsd_yorn") == 1 || record.get("pdsd_yorn") == 'Y') {
					err_msg = "승인 해지할 수 없는 상태입니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 해지할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 승인 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('acpt_stat_dvcd', '0010'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/order/saleorder/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										acpt_stat_dvcd	: '0010',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: ''
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
									table_nm	: '',
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

