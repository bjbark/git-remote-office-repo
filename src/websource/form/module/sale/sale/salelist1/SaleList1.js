Ext.define('module.sale.sale.salelist1.SaleList1', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
	],
	models	: [
		'module.sale.sale.salelist1.model.SaleList1',
	],
	stores	: [
		'module.sale.sale.salelist1.store.SaleList1',
	],
	views	: [
		'module.sale.sale.salelist1.view.SaleList1Layout',
		'module.sale.sale.salelist1.view.SaleList1Lister',
		'module.sale.sale.salelist1.view.SaleList1Search',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-salelist1-layout button[action=selectAction]' : { click : me.selectAction },
			'module-salelist1-lister button[action=exportAction]' : { click : me.exportAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-salelist1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-salelist1-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-salelist1-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-salelist1-lister')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			drtr   = me.pocket.drtr_lister(),
			deli   = me.pocket.deli_lister(),
			editor = me.pocket.editor(),
			editorlister = me.pocket.editorlister(),
			param  = me.pocket.search().getValues(),
			lister = me.pocket.lister()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			drtr.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor.getRecord().data.cstm_idcd}) );

			deli.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor.getRecord().data.cstm_idcd}) );

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('cstm_idcd'),orgn_dvcd : 'cstm_mast', line_seqn : 1 });
			editorlister.down('[name=file]').popup.params.invc_numb = record[0].get('cstm_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.

		}
	},

	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.modifyRecord({
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		}, me);
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues(),
			editorlister = me.pocket.editorlister(),
			drtr = me.pocket.drtr_lister(),
			deli = me.pocket.deli_lister()
		;
		drtr.getStore().clearData();
		drtr.getStore().loadData([],false);

		deli.getStore().clearData();
		deli.getStore().loadData([],false);

		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);
		editorlister.down('[name=file]').popup.params.invc_numb = "";

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'cstm_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							cstm_idcd : keygen.records[0].seq,
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
			records		= editor.getRecord(),
			drtr_store	= me.pocket.drtr_lister().getStore(),
			deli_store	= me.pocket.deli_lister().getStore(),
			addr_seqn	= records.data.addr_seqn,
			success		= false
		;

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('cstm_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'cstm_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('records' , keygen.records[0].seq );
									record.dirtyValue('cstm_code' , keygen.records[0].code );
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
							drtr_store.sync();
							deli_store.sync();
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
			deli_store = me.pocket.deli_lister().getStore(),
			drtr_store = me.pocket.drtr_lister().getStore()
		;
		if(select){
			deli_store.reload();
			drtr_store.reload();
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


//	downAction : function(){
//		var me = this,
//			lister = me.pocket.lister(),
//			select = lister.getSelectionModel().getSelection(),
//			editorlister = me.pocket.editorlister(),
//			a = editorlister.getStore().data.items,
//			val
//		;
//		var ck = 0;
//
//		for (var c = 0; c < a.length; c++) {
//			var file_dvcd_1fst	= editorlister.getStore().data.items[c].data.file_dvcd_1fst;
//			if(file_dvcd_1fst=='1000'){
//				ck = 1;
//				break;
//			}else{
//				ck = 0;
//			}
//		}
//
//		if(ck == '0'){
//			console.log("ck0");
//			Ext.Msg.alert('알림','사업자등록증이 등록되지 않았습니다.');
//		}else if(ck =='1'){
//			console.log(ck);
//			for (var i = 0; i < a.length; i++) {
//				var file_dvcd_1fst	= editorlister.getStore().data.items[i].data.file_dvcd_1fst,
//					invc_numb 		= editorlister.getStore().data.items[i].data.invc_numb,
//					orgn_dvcd		= editorlister.getStore().data.items[i].data.orgn_dvcd
//				;
//				if(file_dvcd_1fst == '1000'){
//					val = editorlister.getStore().data.items[i].data.file_name;
//				}
//			}
//			Ext.Msg.show({ title: '확인', msg: '사업자 등록증을 다운로드 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//				fn: function (button) {
//					if (button=='yes') {
//						Ext.Ajax.request({
//						url		: _global.location.http() + '/upload/set/fileDownload.do',
//								params	: {
//							token : _global.token_id,
//								param : JSON.stringify({
//								stor_id			: _global.stor_id,
//								hqof_idcd		: _global.hqof_idcd,
//									file_name		: val,
//									path			: '/Downloads'
//								})
//							},
//							async	: false,
//							method	: 'POST',
//							success	: function(response, request) {
//								var result = Ext.decode(response.responseText);
//								if	(!result.success ){
//									Ext.Msg.error(result.message );
//									return;
//								} else {
//									Ext.Msg.alert('알림','다운로드 완료');
//									console.log(result);
//								}
//								mask.hide();
//							},
//							failure : function(result, request) {
//									mask.hide();
//							Ext.Msg.error(result.mesage);
//							},
//							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//							}
//						});
//					}
//				}
//			});
//		}
//	},

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

