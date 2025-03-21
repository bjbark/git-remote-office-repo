Ext.define('module.custom.sjflv.oms.omsmast.OmsMast', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload',
		],

	models	: [
		'module.custom.sjflv.oms.omsmast.model.OmsMast',
		'module.custom.sjflv.oms.omsmast.model.OmsMastSmpl',
		],
	stores	: [
		'module.custom.sjflv.oms.omsmast.store.OmsMast',
		'module.custom.sjflv.oms.omsmast.store.OmsMastSmpl',
	 	],
	views	: [
		'module.custom.sjflv.oms.omsmast.view.OmsMastLayout',
		'module.custom.sjflv.oms.omsmast.view.OmsMastSearch',
		'module.custom.sjflv.oms.omsmast.view.OmsMastLister',
		'module.custom.sjflv.oms.omsmast.view.OmsMastEditor',
		'module.custom.sjflv.oms.omsmast.view.OmsMastSmplLister',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-sjflv-omsmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-sjflv-omsmast-layout #mainpanel'				  : { tabchange : me.tabChange       },
			// editer event
			'module-sjflv-omsmast-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-sjflv-omsmast-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-sjflv-omsmast-lister button[action=printAction]'  : { click : me.printAction  }, // 견적서발행
			'module-sjflv-omsmast-lister button[action=copyAction]'   : { click : me.copyAction   }, // 샘플복사
			'module-sjflv-omsmast-lister button[action=amendAction]'  : { click : me.amendAction  },	// amend
			'module-sjflv-omsmast-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-sjflv-omsmast-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-sjflv-omsmast-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-sjflv-omsmast-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-sjflv-omsmast-lister'							 : { selectionchange: me.attachRecord },
			'module-sjflv-omsmast-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-sjflv-omsmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sjflv-omsmast-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-sjflv-omsmast-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-sjflv-omsmast-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-sjflv-omsmast-smpl')[0] },
	},

	//조회
	selectAction:function(){
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex==0){
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
						me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, cstm_drtr_idcd : _global.login_pk}) );
		}else if(tindex==1){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
		}else{

		}
	},

	//에디티 숨기기 및 보이기
	tabChange:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			editor = me.pocket.editor()
		;
			if ( tindex == 0 ) {
//				Ext.ComponentQuery.query('module-sjflv-omsmast-layout')[0].down('#smpl_info').show();
				editor.show();
			}else{
//				Ext.ComponentQuery.query('module-sjflv-omsmast-layout')[0].down('#smpl_info').hide();
				editor.hide();
			}
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

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			editor = me.pocket.editor(),
			search = me.pocket.search()
		;

//		editor.down('[name=ttsm_amnt]').setReadOnly(true);

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

		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/oms/omsmast/get/cstmInfo.do',
			method		: "POST",
			params		: {
			 	token	: _global.token_id,
				param	: Ext.encode({
					stor_id		: _global.stor_id,
					user_idcd	: _global.login_pk,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb : '',
							amnd_degr : '1',
							line_clos : '0',
							cstm_drtr_idcd : _global.login_pk,
							cstm_drtr_name : _global.login_nm,
							cstm_name      : result.records[0].cstm_name ? result.records[0].cstm_name : '',
							addr_1fst      : result.records[0].dlvy_addr_1fst ? result.records[0].dlvy_addr_1fst : '',
							cstm_code      : result.records[0].cstm_code ? result.records[0].cstm_code : '',
							cstm_idcd      : result.records[0].cstm_idcd ? result.records[0].cstm_idcd : '',
							tele_numb      : result.records[0].dlvy_tele_numb ? result.records[0].dlvy_tele_numb : '',
							post_code      : result.records[0].dlvy_zpcd ? result.records[0].dlvy_zpcd : '',
							smpl_stat_dvcd : '1000',
							bzpl_idcd : '001',
							bzpl_name : '본사'
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
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
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
								url		: _global.location.http() + '/custom/sjflv/sale/etc/smplmast/set/del_yn.do',
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
});

