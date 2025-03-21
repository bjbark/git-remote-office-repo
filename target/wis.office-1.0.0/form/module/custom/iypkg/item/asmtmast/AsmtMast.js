Ext.define('module.custom.iypkg.item.asmtmast.AsmtMast', {  extend   : 'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.DeptPopup',
	],
	models	: [
		'module.custom.iypkg.item.asmtmast.model.AsmtMast',
		'module.custom.iypkg.item.asmtmast.model.AsmtMastPric',
	],
	stores	: [
		'module.custom.iypkg.item.asmtmast.store.AsmtMast',
		'module.custom.iypkg.item.asmtmast.store.AsmtMastDetail',
		'module.custom.iypkg.item.asmtmast.store.AsmtMastEditorLister',
	],
	views	: [
  	    'module.custom.iypkg.item.asmtmast.view.AsmtMastSearch',
		'module.custom.iypkg.item.asmtmast.view.AsmtMastLayout',
		'module.custom.iypkg.item.asmtmast.view.AsmtMastMaster',
		'module.custom.iypkg.item.asmtmast.view.AsmtMastDetail',
		'module.custom.iypkg.item.asmtmast.view.AsmtMastEditor',
		'module.custom.iypkg.item.asmtmast.view.AsmtMastEditorLister',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-asmtmast-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-asmtmast-master button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-asmtmast-master button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-asmtmast-master button[action=insertAction]' : { click : me.insertAction },	// 추가
			'module-asmtmast-master button[action=exportAction]' : { click : me.exportAction },	// 엑셀master
			'module-asmtmast-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀detail

			// editor 이벤트
			'module-asmtmast-editor button[action=updateAction]'  : { click : me.updateAction },	// 저장
			'module-asmtmast-editor button[action=cancelAction]'  : { click : me.cancelAction },	// 취소

			// 클릭이벤트(동작)
			'module-asmtmast-master'	: {
				selectionchange	: me.selectRecord,
				itemdblclick	: me.selectDetail
			}

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-asmtmast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-asmtmast-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-asmtmast-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-asmtmast-master')[0] },
		detail	: function () { return Ext.ComponentQuery.query('module-asmtmast-detail')[0] },
		editorlister	: function () { return Ext.ComponentQuery.query('module-asmtmast-editor-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			detail = me.pocket.detail()
			search = me.pocket.search(),
			param = search.getValues(),
			store = lister.getStore(),
			selection = lister.getSelectionModel().getSelection()[0],
			index = store.indexOf(selection)
		;
		if(index == -1){
			index = 0;
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(index);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister(),
			detail = me.pocket.detail(),
			editorlister = me.pocket.editorlister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, Ext.merge( param, {stor_id : _global.stor_id , asmt_idcd : editor.getRecord().data.asmt_idcd}) );

			editorlister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , asmt_idcd : editor.getRecord().data.asmt_idcd}) );

		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search	= me.pocket.search(),
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor(),
			param 	= search.getValues(),
			editorlister	= me.pocket.editorlister()
		;

		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm   	: 'asmt_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							asmt_idcd : keygen.records[0].seq,
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
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

	//삭제
	deleteAction:function(grid, record) {
		var me = this,
		lister = me.pocket.lister(),
		store  = lister.getStore()
	;
	var records = lister.getSelectionModel().getSelection();

	Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
		if (button == 'yes') {

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
			mask.show();

			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/item/asmtmast/set/del_yn.do',
				method		: "POST",
				params		: {
				 	token	: _global.token_id,
					param	: Ext.encode({
						asmt_idcd	: records[0].data.asmt_idcd
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						store.remove(records[0]);
						store.commitChanges();
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
					mask.hide();
				}
			});
		}
	});
},

	//저장
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			lister		= me.pocket.lister(),
			detail		= me.pocket.detail(),
			store		= lister.getStore(),
			detail_store = detail.getStore(),
			records		= editor.getValues(),
			values		= editor.getForm().getValues(),
			editorlister= me.pocket.editorlister().getStore(),
			success		= false,
			check		= '1'
		;
		if(values.asmt_code == '' || values.asmt_code == null){
			Ext.Msg.alert("알림","부자재코드를 입력하여 주시기 바랍니다.");
			check = '0';
		}
		if(values.asmt_name == '' || values.asmt_name == null){
			Ext.Msg.alert("알림","부자재명을 입력하여 주시기 바랍니다.");
			check = '0';
		}

		editorlister.each(function(findrecord){
			if(findrecord.get('cstm_idcd') == '' || findrecord.get('cstm_idcd') == null){
				Ext.Msg.alert("알림","매입단가정보에서 거래처를 선택하여 주시기 바랍니다.");
				check = '0';
			}
			if(findrecord.get('adpt_date') == '' || findrecord.get('adpt_date') == null){
				Ext.Msg.alert("알림","매입단가정보에서 적용일자를 입력하여 주시기 바랍니다.");
				check = '0';
			}
			if(findrecord.get('puch_pric') == '' || findrecord.get('puch_pric') == null){
				Ext.Msg.alert("알림","매입단가정보에서 매입단가를 입력하여 주시기 바랍니다.");
				check = '0';
			}
		});

		if(check != '1'){
			return;
		}
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('amst_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'asmt_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('records'   , keygen.records[0].seq );
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
						success : function(operation){
							editorlister.sync();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );
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
				me.selectAction();
				detail_store.clearData();
				detail_store.loadData([],false);
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor(),
		lister = me.pocket.lister(),
		select = lister.getSelectionModel().getSelection()[0],
		editorlister = me.pocket.editorlister().getStore()
		;
		if(select){
			editorlister.reload();
		}

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				results.feedback( {success : true, visible : true, selectRecord : true });
			}
		}, me);

},

	//수정
	modifyAction:function() {
		var me = this,
		editor = me.pocket.editor(),
		select = me.pocket.lister().getSelectionModel().getSelection()[0]
	;

	if(!select){
		Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
	}else{
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true });
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	}
},

	//엑셀
	exportAction : function(button){
		var value = button.button,
		lister = '' ;
		;
		if(button.itemId == 'master'){
			lister = this.pocket.lister();
		}else if(button.itemId == 'detail'){
			lister = this.pocket.detail();
		}
		lister.writer({enableLoadMask:true});
	}
});

