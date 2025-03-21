Ext.define('module.custom.sjflv.item.itemspec.ItemSpec', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.RefnPopup2',
		'Axt.popup.view.ZipcodeSearch'
	],
	models	: [
		'module.custom.sjflv.item.itemspec.model.ItemSpec',
	],
	stores	: [
		'module.custom.sjflv.item.itemspec.store.ItemSpec',
	],
	views	: [
		'module.custom.sjflv.item.itemspec.view.ItemSpecLayout',
		'module.custom.sjflv.item.itemspec.view.ItemSpecLister',
		'module.custom.sjflv.item.itemspec.view.ItemSpecSearch',
		'module.custom.sjflv.item.itemspec.view.ItemSpecEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-itemspec-layout button[action=selectAction]' : { click : me.selectAction },
			'module-itemspec-lister' : {
				selectionchange : me.selectRecord
			},
			'module-itemspec-lister button[action=exportAction]' : { click : me.exportAction },


			'module-itemspec-lister button[action=modifyAction]' : { click : me.modifyAction }, /* 수정 */

			'module-itemspec-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-itemspec-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-itemspec-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-itemspec-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-itemspec-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-itemspec-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			editor	= me.pocket.editor()
		;

		if(param.acct_code == '' || param.acct_code == null){
			Ext.Msg.alert("알림","계정구분을 선택해주세요.");
			return;
		}

		me.setValueAction(null);
		me.setReadOnlyAction(true);

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
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
		var me		= this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]
		;

		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "품목코드 1건을 선택 후 진행하십시오.");
			return;
		}

		editor.down('[name=brix_yorn]').setReadOnly(false);
		editor.down('[name=ph_yorn]').setReadOnly(false);
		editor.down('[name=ingd_yorn]').setReadOnly(false);
		editor.down('[name=ecil_yorn]').setReadOnly(false);

		me.setReadOnlyAction(false);

		editorbutton = Ext.ComponentQuery.query('module-itemspec-editor')[0];
		editorbutton.down('[itemId=update]').show();
		editorbutton.down('[itemId=cancel]').show();

		editor.modifyRecord({
			caller   : me,
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		});
	},

	//저장
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;

		var records = lister.getSelectionModel().getSelection();
		if(!records || records.length<1){
			Ext.Msg.alert("알림","품목코드 1건을 선택후 진행해주세요.");
			return;
		}

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('item_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'item_spec'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('item_idcd' , keygen.records[0].seq );
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
							results.feedback({success : true  });
							lister.select({
								callback:function(records, operation, success) {
								if (success) {
									lister.getSelectionModel().select(0);
								} else { me.pocket.editor().getForm().reset(true);}
								}, scope:me
							});
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
					editorbutton = Ext.ComponentQuery.query('module-itemspec-editor')[0]

					editorbutton.down('[itemId=update]').hide();
					editorbutton.down('[itemId=cancel]').hide();

					editor.down('[name=ecil_yorn]').readOnly = true;
					editor.down('[name=brix_yorn]').readOnly = true;
					editor.down('[name=ph_yorn]').readOnly = true;
					editor.down('[name=ingd_yorn]').readOnly = true;

					me.setReadOnlyAction(true);
				}
			}
		});

	},

	//취소
	cancelAction:function() {
		var me = this,
			lister	= me.pocket.lister(),
			editor	= me.pocket.editor()
		;

		editorbutton = Ext.ComponentQuery.query('module-itemspec-editor')[0];
		editorbutton.down('[itemId=update]').hide();
		editorbutton.down('[itemId=cancel]').hide();

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : false, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);

				editor.down('[name=ecil_yorn]').readOnly = true;
				editor.down('[name=brix_yorn]').readOnly = true;
				editor.down('[name=ph_yorn]').readOnly = true;
				editor.down('[name=ingd_yorn]').readOnly = true;
			}
		}, me);

		me.setReadOnlyAction(true);

	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	//항목 활설화
	setReadOnlyAction : function(flag) {
		var me = this,
			editor	= me.pocket.editor()
		;
		editor.down('[name=appr]').setReadOnly(flag);
		editor.down('[name=test_ordr]').setReadOnly(flag);
		editor.down('[name=dnst]').setReadOnly(flag);
		editor.down('[name=rfct_indx]').setReadOnly(flag);
		editor.down('[name=asen]').setReadOnly(flag);
		editor.down('[name=hmtl]').setReadOnly(flag);
		editor.down('[name=lead]').setReadOnly(flag);
		editor.down('[name=alin_mtrl]').setReadOnly(flag);
		editor.down('[name=slvt_carr]').setReadOnly(flag);
		editor.down('[name=shlf_life]').setReadOnly(flag);
		editor.down('[name=strg_cond]').setReadOnly(flag);
		editor.down('[name=melt_pont]').setReadOnly(flag);
		editor.down('[name=flsh_pont]').setReadOnly(flag);
		editor.down('[name=ingd]').setReadOnly(flag);
		editor.down('[name=ph]').setReadOnly(flag);
		editor.down('[name=ecil]').setReadOnly(flag);
		editor.down('[name=vtrl_cont]').setReadOnly(flag);
		editor.down('[name=brix]').setReadOnly(flag);
		editor.down('[name=remk_text]').setReadOnly(flag);
		editor.down('[name=guis]').setReadOnly(flag);
		editor.down('[name=etcc_memo]').setReadOnly(flag);
	},

	//항목 초기화
	setValueAction : function(value) {
		var me = this,
			editor	= me.pocket.editor()
		;

		editor.down('[name=appr]').setValue(value);
		editor.down('[name=test_ordr]').setValue(value);
		editor.down('[name=dnst]').setValue(value);
		editor.down('[name=rfct_indx]').setValue(value);
		editor.down('[name=asen]').setValue(value);
		editor.down('[name=hmtl]').setValue(value);
		editor.down('[name=lead]').setValue(value);
		editor.down('[name=alin_mtrl]').setValue(value);
		editor.down('[name=slvt_carr]').setValue(value);
		editor.down('[name=shlf_life]').setValue(value);
		editor.down('[name=strg_cond]').setValue(value);
		editor.down('[name=melt_pont]').setValue(value);
		editor.down('[name=flsh_pont]').setValue(value);
		editor.down('[name=ingd]').setValue(value);
		editor.down('[name=ph]').setValue(value);
		editor.down('[name=ecil]').setValue(value);
		editor.down('[name=vtrl_cont]').setValue(value);
		editor.down('[name=brix]').setValue(value);
		editor.down('[name=remk_text]').setValue(value);
		editor.down('[name=guis]').setValue(value);
		editor.down('[name=etcc_memo]').setValue(value);

		editor.down('[name=ph_yorn]').setValue(value);
		editor.down('[name=ingd_yorn]').setValue(value);
		editor.down('[name=ecil_yorn]').setValue(value);
		editor.down('[name=brix_yorn]').setValue(value);
	}
});

