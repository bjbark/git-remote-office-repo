Ext.define('module.custom.iypkg.item.ppermast.PperMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.DelyLcalPopup',
		'lookup.upload.BoardUpload'
	],
	models	: [
		'module.custom.iypkg.item.ppermast.model.PperMastCstm',
		'module.custom.iypkg.item.ppermast.model.PperMastPric',
		'module.custom.iypkg.item.ppermast.model.PperMast',
	],
	stores	: [
		'module.custom.iypkg.item.ppermast.store.PperMastCstm',
		'module.custom.iypkg.item.ppermast.store.PperMastPric',
		'module.custom.iypkg.item.ppermast.store.PperMastCstm2',
		'module.custom.iypkg.item.ppermast.store.PperMastPric2',
		'module.custom.iypkg.item.ppermast.store.PperMast',
	],
	views	: [
		'module.custom.iypkg.item.ppermast.view.PperMastLayout',
		'module.custom.iypkg.item.ppermast.view.PperMastLister',
		'module.custom.iypkg.item.ppermast.view.PperMastCstmLister',
		'module.custom.iypkg.item.ppermast.view.PperMastPricLister',
		'module.custom.iypkg.item.ppermast.view.PperMastCstmLister2',
		'module.custom.iypkg.item.ppermast.view.PperMastPricLister2',
		'module.custom.iypkg.item.ppermast.view.PperMastSearch',
		'module.custom.iypkg.item.ppermast.view.PperMastEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-ppermast-layout button[action=selectAction]' : { click : me.selectAction },

			'module-ppermast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-ppermast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-ppermast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-ppermast-lister button[action=deleteAction]' : { click : me.deleteAction },

			'module-ppermast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-ppermast-editor button[action=cancelAction]' : { click : me.cancelAction },

			'module-ppermast-cstm-lister2 button[action=exportAction]' : { click : me.exportAction },
			'module-ppermast-pric-lister2 button[action=exportAction]' : { click : me.exportAction },
			'module-ppermast-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-ppermast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-ppermast-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-ppermast-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-ppermast-lister')[0] },
		cstm_lister: function () { return Ext.ComponentQuery.query('module-ppermast-cstm-lister')[0] },
		pric_lister: function () { return Ext.ComponentQuery.query('module-ppermast-pric-lister')[0] },
		cstm_lister2: function () { return Ext.ComponentQuery.query('module-ppermast-cstm-lister2')[0] },
		pric_lister2: function () { return Ext.ComponentQuery.query('module-ppermast-pric-lister2')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			store = lister.getStore(),
			selection = lister.getSelectionModel().getSelection()[0],
			index = store.indexOf(selection)
			cstm2  = me.pocket.cstm_lister2(),
			pric2  = me.pocket.pric_lister2()
		;

		cstm2.getStore().clearData();
		cstm2.getStore().loadData([],false);

		pric2.getStore().clearData();
		pric2.getStore().loadData([],false);
		;

		if(index < 0){
			index = 0;
		}
		console.log(index);
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(index);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			cstm   = me.pocket.cstm_lister(),
			pric   = me.pocket.pric_lister(),
			cstm2  = me.pocket.cstm_lister2(),
			pric2  = me.pocket.pric_lister2(),
			editor = me.pocket.editor(),
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			cstm.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , pper_idcd : editor.getRecord().data.pper_idcd}) );

			pric.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , pper_idcd : editor.getRecord().data.pper_idcd}) );

			cstm2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , pper_idcd : editor.getRecord().data.pper_idcd}) );

			pric2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , pper_idcd : editor.getRecord().data.pper_idcd}) );


		}
	},

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0]
		;
		if(!select){
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
			return;
		}else{
			editor.modifyRecord({
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			}, me);
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues(),
			cstm = me.pocket.cstm_lister(),
			pric = me.pocket.pric_lister()
		;
		cstm.getStore().clearData();
		cstm.getStore().loadData([],false);

		pric.getStore().clearData();
		pric.getStore().loadData([],false);


		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'pper_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							pper_idcd : keygen.records[0].seq,
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


	/**
	 * 저장
	 */
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			record		= editor.getRecord(),
			cstm_store	= me.pocket.cstm_lister().getStore(),
			pric_store	= me.pocket.pric_lister().getStore(),
			values		= editor.getForm().getValues(),
			addr_seqn	= record.data.addr_seqn,
			success		= false,
			check		= '1'
		;
		if(values.pper_code == '' || values.pper_code == null){
			Ext.Msg.alert("알림","원지코드를 입력하여 주시기 바랍니다.");
			check = '0';
		}
		if(values.pper_name == '' || values.pper_name == null){
			Ext.Msg.alert("알림","원지명을 입력하여 주시기 바랍니다.");
			check = '0';
		}

		pric_store.each(function(findrecord){
			if(findrecord.get('cstm_idcd') == '' || findrecord.get('cstm_idcd') == null){
				Ext.Msg.alert("알림","거래처 정보에서 거래처를 선택하여 주시기 바랍니다.");
				check = '0';
			}
			if(findrecord.get('adpt_date') == '' || findrecord.get('adpt_date') == null){
				Ext.Msg.alert("알림","거래처 정보에서 적용일자를 입력하여 주시기 바랍니다.");
				check = '0';
			}
		});

		cstm_store.each(function(findrecord){
			if(findrecord.get('cstm_idcd') == '' || findrecord.get('cstm_idcd') == null){
				Ext.Msg.alert("알림","LOSS및 가공비에서 거래처를 선택하여 주시기 바랍니다.");
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
					if	(record.phantom && Ext.isEmpty(record.get('pper_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'pper_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('records' , keygen.records[0].seq );
									record.dirtyValue('pper_code' , keygen.records[0].code );
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
							cstm_store.sync();
							pric_store.sync();
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
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor(),
			master = me.pocket.lister(),
			select = master.getSelectionModel().getSelection()[0],
			pric_store = me.pocket.pric_lister().getStore(),
			cstm_lister = me.pocket.cstm_lister().getStore()
		;
		if(select){
			pric_store.reload();
			cstm_lister.reload();
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

	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},			// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },							// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }											// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	exportAction : function(button){
		var value = button.button,
			lister = '' ;
		;
		if(button.itemId == 'lister'){
			lister = this.pocket.lister();
		}else if(button.itemId == 'cstm'){
			lister = this.pocket.cstm_lister2();
		}else if(button.itemId == 'pric'){
			lister = this.pocket.pric_lister2();
		}
		lister.writer({enableLoadMask:true});
	}
});

