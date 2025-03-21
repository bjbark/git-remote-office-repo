Ext.define('module.custom.kortc.qc.insp.inspentry.InspEntry', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmClassPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.ProdPopup'
	],
	models	: [
		'module.custom.kortc.qc.insp.inspentry.model.InspEntryLister',
		'module.custom.kortc.qc.insp.inspentry.model.InspEntryFile'
	],
	stores	: [
		'module.custom.kortc.qc.insp.inspentry.store.InspEntryMrbLister',
		'module.custom.kortc.qc.insp.inspentry.store.InspEntryLister',
		'module.custom.kortc.qc.insp.inspentry.store.InspEntryLister2',
		'module.custom.kortc.qc.insp.inspentry.store.InspEntryFile'
	],
	views	: [
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryLayout',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntrySearch',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryLister',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryLister2',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryFileLister',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryMrbLister',
		'module.custom.kortc.qc.insp.inspentry.view.InspEntryEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-inspentry-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-inspentry-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-inspentry-lister button[action=insertAction]'			: { click : me.insertAction },
			'module-inspentry-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-inspentry-lister'										: { selectionchange: me.attachRecord },
			'module-inspentry-lister2'										: { selectionchange: me.attachRecord2 },

			'module-inspentry-lister2 button[action=modifyAction]'			: { click : me.modifyAction },	// 수정
			'module-inspentry-lister2 button[action=deleteAction]'			: { click : me.deleteAction },
			'module-inspentry-lister2 button[action=printAction]'			: { click : me.printAction },	// 부적합보고서 출력

			'module-inspentry-editor button[action=updateAction]'			: { click : me.updateAction },
			'module-inspentry-editor button[action=updateAction2]'			: { click : me.updateAction2 },
			'module-inspentry-editor button[action=cancelAction]'			: { click : me.cancelAction },

//			'module-inspentry-lister' : {
//				itemdblclick : me.selectDetail1 ,
//				selectionchange : me.attachRecord
//			},
//			'module-inspentry-lister2' : {
//				itemdblclick : me.selectDetail2 ,
//				selectionchange : me.attachRecord
//			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-inspentry-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-inspentry-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-inspentry-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-inspentry-lister2')[0] },
		mrblister: function () { return Ext.ComponentQuery.query('module-inspentry-mrblister')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-inspentry-editor')[0] },
		file: function () { return Ext.ComponentQuery.query('module-inspentry-filelister')[0] }
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			editor = me.pocket.editor(),
			mrblister = me.pocket.mrblister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			master = undefined

		;

		if ( tindex == 0 ) {
			master = lister;
		}else if(tindex == 1){
			master = lister2;
		}


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id }) );
	},

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			file = me.pocket.file(),
			lister	= me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : record ? record : lister.getSelectionModel().getSelection()
			});
			console.log(editor.down('[name=invc_numb]').getValue());

			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : editor.getRecord().data.invc_numb,orgn_dvcd : 'insp_mast', line_seqn : 1 });
			file.down('[name=file]').popup.params.invc_numb = editor.getRecord().data.invc_numb;
		}
	},

	attachRecord2:function( smodel, record ){
		var me     = this,
			editor = me.pocket.editor(),
			file = me.pocket.file(),
			lister2	= me.pocket.lister2()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister2(), record : record }, me);

			editor.attachRecord({
				caller : me ,
				lister2 : lister2 ,
				record : record ? record : lister.getSelectionModel().getSelection()
			});
			console.log(editor.down('[name=invc_numb]').getValue());

			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : editor.getRecord().data.invc_numb,orgn_dvcd : 'insp_mast', line_seqn : 1 });
			file.down('[name=file]').popup.params.invc_numb = editor.getRecord().data.invc_numb;
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			listerselect = me.pocket.lister().getSelectionModel().getSelection()[0],
			search = me.pocket.search(),
			param = search.getValues(),
			file	= me.pocket.file()
		;


		if(!listerselect){
			Ext.Msg.alert("알림","검사입력할 입고건을 선택하여주십시오.");
			return;
		}
		file.getStore().clearData();
		file.getStore().loadData([],false);

		file.down('[name=file]').popup.params.invc_numb = "";

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'insp_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.modifyRecord({
						caller	: me,
						callback: function( results ) {
							if (results.success){
								results.feedback( {success : true, visible : true } );
								me.pocket.layout().down('#mainpanel').setDisabled(true);
								me.pocket.search().setDisabled(true);
								editor.down('[name=invc_numb]').setValue(keygen.records[0].seq);
							}
						}
					});
				}
				file.down('[name=file]').popup.params.invc_numb = keygen.records[0].seq;
			}
		});
		editor.down('[itemId=lister1]').show();
		editor.down('[itemId=lister2]').hide();
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

	},


	//저장
	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			lister = me.pocket.lister(),
			editor = me.pocket.editor(),
			store  = lister.getStore(),
			mrb_store	= me.pocket.mrblister().getStore()
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
						success : function(operation){
							mrb_store.sync();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
					lister.getStore().reload();
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

	//저장
	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister2(),
			editor = me.pocket.editor(),
			store  = lister.getStore(),
			mrb_store	= me.pocket.mrblister().getStore()
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
						success : function(operation){
							mrb_store.sync();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
					lister.getStore().reload();
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
			lister = me.pocket.lister2(),
			store  = lister.getStore(),
			select	= lister.getSelectionModel().getSelection()


		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

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
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/qc/insp/inspentry/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
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

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			mrblister = me.pocket.mrblister()
		;

		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true)
				}
			}
		},me);
		mrblister.select({
			callback:function(records, operation, success) {
			if (success) {
			} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id , invc_numb : editor.getRecord().data.invc_numb}) );
		editor.down('[itemId=lister1]').hide();
		editor.down('[itemId=lister2]').show();
	},

	// 부적합보고서 출력
	printAction : function() {
		var me = this,
		lister = me.pocket.lister2(),
		select = me.pocket.lister2().getSelectionModel().getSelection(),
		jrf ='kortc_insp_report.jrf' ,
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		console.log(_global.img_http);

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

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

