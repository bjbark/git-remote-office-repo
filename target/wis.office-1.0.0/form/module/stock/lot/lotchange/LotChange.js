Ext.define('module.stock.lot.lotchange.LotChange', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsWkctPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup'
	],
	models:[
		'module.stock.lot.lotchange.model.LotChangeDetail',
		'module.stock.lot.lotchange.model.LotChangeMaster'
	],
	stores:[
		'module.stock.lot.lotchange.store.LotChangeDetail',
		'module.stock.lot.lotchange.store.LotChangeMaster'
	],
	views: [
		'module.stock.lot.lotchange.view.LotChangeLayout',
		'module.stock.lot.lotchange.view.LotChangeSearch',
		'module.stock.lot.lotchange.view.LotChangeEditor',
		'module.stock.lot.lotchange.view.LotChangeListerDetail',
		'module.stock.lot.lotchange.view.LotChangeListerMaster'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-lotchange-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-lotchange-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-lotchange-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			//lister master event
			'module-lotchange-lister-master button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister detail event
			'module-lotchange-lister-detail button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-lotchange-lister-detail button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-lotchange-lister-detail button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-lotchange-lister-detail button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-lotchange-lister-master' : {
				selectionchange : me.selectDetail
			},
			'module-lotchange-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-lotchange-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout		 : function () { return Ext.ComponentQuery.query('module-lotchange-layout')[0] },
		search		 : function () { return Ext.ComponentQuery.query('module-lotchange-search')[0] },
		listermaster : function () { return Ext.ComponentQuery.query('module-lotchange-lister-master')[0] },
		listerdetail : function () { return Ext.ComponentQuery.query('module-lotchange-lister-detail')[0] },
		editor		 : function () { return Ext.ComponentQuery.query('module-lotchange-editor')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			store1 = listermaster.getStore(),
			store2 = listerdetail.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		store1.removeAll();
		store2.removeAll();
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listerdetail.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster(),
			record = listerdetail.getSelectionModel().getSelection()[0]
		;
		if(record){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}else{
			Ext.Msg.alert('알림', '수정할 항목을 선택해주세요.');
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search			= me.pocket.search(),
			listermaster	= me.pocket.listermaster(),
			listerdetail	= me.pocket.listerdetail(),
			editor			= me.pocket.editor(),
			param			= search.getValues(),
			select			= me.pocket.listermaster().getSelectionModel().getSelection()[0],
			mrecord			= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			old_line_seqn	= 0
		;

		if(select){
			Ext.Ajax.request({
				url		: _global.location.http() + '/stock/lot/lotchange/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						lott_numb : select.get('lott_numb')
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
						old_line_seqn = result.records[0].line_seqn;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			old_line_seqn = old_line_seqn+1;

			editor.insertRecord({
				caller	: me,
				record	: Ext.create( listerdetail.getStore().model.modelName,{
					item_idcd : select.get('item_idcd'),
					lott_numb : select.get('lott_numb'),
					item_code : select.get('item_code'),
					item_name : select.get('item_name'),
					item_spec : select.get('item_spec'),
					modl_name : select.get('modl_name'),
					acct_bacd_name : select.get('acct_bacd_name'),
					unit_name : select.get('unit_name'),
					line_seqn : old_line_seqn
				}),
				listerdetail	: listerdetail,
				disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
				callback: function (results) {
					if (results.success) {
						results.feedback({success : true , visible : true });
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","추가 할 수불내역을 선택하여 주십시오.");
		}
	},

	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore()
		;
		if(Number(editor.down('[name=qntt]').getValue()) == 0 || editor.down('[name=qntt]').getValue() == ''){
			Ext.Msg.alert("알림","조정수량을 확인하여 주시기 바랍니다.");
			return;
		}
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('lott_numb'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'lot_isos_book'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('lott_numb' , keygen.records[0].seq );
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
						success	: function(operation){
							me.selectAction();
							results.feedback({success : true  });
						},
						failure	: function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); },
					} );
				}
			},
			finished : function(results, record, operation){
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				if (results.success){
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;

	},

	attachRecord2:function( smodel, record ){
		var me	= this,
		editor = me.pocket.editor(),
		lister = smodel ? smodel.view.ownerCt : me.pocket.listermaster()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail	= me.pocket.listerdetail(),
			param	= me.pocket.search().getValues(),
			editor	= me.pocket.editor(),
			lister	= me.pocket.listermaster(),
			record	= lister.getSelectionModel().getSelection()[0]
		;
		if (record) {

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope  : me
			}, Ext.merge( param, {stor_id   : _global.stor_id , lott_numb : record.get('lott_numb')}) );
		}

	},

	//삭제
	deleteAction:function() {
		var	me = this,
			editor = me.pocket.editor(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail()
		;
		editor.deleteRecord({
			lister : me.pocket.listerdetail(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); store.reload()} // 성공 실패 관계 없이 호출된다.
				});
//				listerdetail.getStore().reload();
//				listermaster.getStore().reload();
			}
		}, me);
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		lister = me.pocket.listerdetail();
		editor.cancelRecord({
			caller	 : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function(record) {
		var value = record.itemId;
		if(value == 'master'){
			this.pocket.listermaster().writer({enableLoadMask:true});
		}else{
			this.pocket.listerdetail().writer({enableLoadMask:true});
		}
	}
});