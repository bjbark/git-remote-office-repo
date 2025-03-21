Ext.define('module.custom.dehansol.cust.cstmmast.CstmMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.DelyLcalPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.HdcoPopup'
	],
	models	: [
		'module.custom.dehansol.cust.cstmmast.model.CstmMastDrtr',
		'module.custom.dehansol.cust.cstmmast.model.CstmMastDeli',
		'module.custom.dehansol.cust.cstmmast.model.CstmMast',
		'module.custom.dehansol.cust.cstmmast.model.CstmMastMngt',
		'module.custom.dehansol.cust.cstmmast.model.CstmMastFile'
	],
	stores	: [
		'module.custom.dehansol.cust.cstmmast.store.CstmMastDrtr',
		'module.custom.dehansol.cust.cstmmast.store.CstmMastDeli',
		'module.custom.dehansol.cust.cstmmast.store.CstmMast',
		'module.custom.dehansol.cust.cstmmast.store.CstmMastMngt',
		'module.custom.dehansol.cust.cstmmast.store.CstmMastFile'
	],
	views	: [
		'module.custom.dehansol.cust.cstmmast.view.CstmMastLayout',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastLister',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastDrtrLister',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastDeliLister',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastSearch',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastEditor',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastEditorLister',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastMngtLister',
		'module.custom.dehansol.cust.cstmmast.view.CstmMastDeliListerSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-cstmmast-layout button[action=selectAction]' : { click : me.selectAction },

			'module-cstmmast-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-cstmmast-lister button[action=insertAction]' : { click : me.insertAction },
			'module-cstmmast-lister button[action=exportAction]' : { click : me.exportAction },
			'module-cstmmast-lister button[action=deleteAction]' : { click : me.deleteAction },

			'module-cstmmast-deli-lister button[action=selectAction2]' : { click : me.selectAction2 },

			'module-cstmmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-cstmmast-editor button[action=cancelAction]' : { click : me.cancelAction },

			'module-cstmmast-lister'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-cstmmast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-cstmmast-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-cstmmast-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-cstmmast-lister')[0] },
		drtr_lister: function () { return Ext.ComponentQuery.query('module-cstmmast-drtr-lister')[0] },
		deli_lister: function () { return Ext.ComponentQuery.query('module-cstmmast-deli-lister')[0] },
		mngtlister : function () { return Ext.ComponentQuery.query('module-cstmmast-mngtlister')[0] },
		editorlister: function () { return Ext.ComponentQuery.query('module-cstmmast-editorlister')[0] }
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			optn1 = param.optn_1,
			optn2 = param.optn_2,
			optn3 = param.optn_3,
			optn4 = param.optn_4,
			optn5 = param.optn_5,
			optn6 = param.optn_6
		;

		if(optn1 != 'on' && optn2 != 'on' && optn3 != 'on' && optn4 != 'on' && optn5 != 'on' && optn6 != 'on'){
			Ext.Msg.alert("알림","거래처 구분을 선택하여주십시오.");
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
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
			lister = me.pocket.lister(),
			mngtlister = me.pocket.mngtlister()
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

			mngtlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor.getRecord().data.cstm_idcd}) );
		}
	},

	//store.filter조회
	selectAction2:function(grid, record){
		var me =this,
		deli = me.pocket.deli_lister();
		store = deli.getStore(),
		param = deli.down('[name=find_name2]').getValue();
		param2 = deli.down('[name=find_name3]').getValue();
			if (Ext.isEmpty(param,param2)) {
				store.clearFilter();
				} else {
					store.clearFilter();
					store.filter([{
						property: 'dely_cstm_name',
						value: param,
						anyMatch: true,
						caseSensitive : false,
						},
						{
						property: 'dlvy_drtr_name',
						value: param2,
						anyMatch: true,
						caseSensitive : false,
						}])
					}
				},


	modifyAction:function() {
		var me = this,
			mngtlister = me.pocket.mngtlister(),
			param  = me.pocket.search().getValues(),
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
		mngtlister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id , cstm_idcd : editor.getRecord().data.cstm_idcd}) );
		window.update_stat = 2;
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search()
			param = search.getValues(),
			editorlister = me.pocket.editorlister(),
			mngtlister = me.pocket.mngtlister(),
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
		var url = _global.location.http() + '/listener/seq/maxid.do';
		if(_global.options.mes_system_type.toUpperCase()=='BOX'){
			url=_global.location.http() + '/custom/dehansol/cust/custmast/get/box_cstm_idcd.do';
		}
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: url,
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
				if (keygen .success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							cstm_idcd : keygen.records[0].seq,
							cstm_code : keygen.records[0].seq,
							sale_cstm_yorn : '1',
							puch_cstm_yorn : '0',
							otod_cstm_yorn : '0',
							etcc_cstm_yorn : '0',
							vatx_dvcd	   : '1'
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function (results) {
							if (results.success) {
								mngtlister.select({
									callback:function(records, operation, success) {
									if (success) {
									} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( param, {stor_id : _global.stor_id ,cstm_idcd : keygen.records[0].seq}) );
								results.feedback({success : true , visible : true });
							}
						}
					});

				}
			}
		});
		window.update_stat = 1;
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
			fields		= editor.getForm().getValues(),
			drtr_store	= me.pocket.drtr_lister().getStore(),
			deli_store	= me.pocket.deli_lister().getStore(),
			addr_seqn	= records.data.addr_seqn,
			success		= false,
			buss_chk	= 0
		;
		if(fields.acpt_typl_char != ''){
			if(fields.acpt_typl_char.length != 2){
				Ext.Msg.alert("알림","주문인식 문자를 확인하여 주십시오.");
				return;
			}
		}
		if(_global.options.cstm_buss_numb==1&&window.update_stat == 1){
			var buss_numb = editor.down('[title=사업장정보]').down('[name=buss_numb]').getValue();
			Ext.Ajax.request({
				url : _global.location.http() + '/custom/dehansol/cust/custmast/get/buss_numb.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						buss_numb	: buss_numb
					})
				},
				async	: false,
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					buss_chk = result.records[0].result;
				}
			});
		}
		if(buss_chk){
			Ext.Msg.alert('알림','이미 등록된 사업자번호입니다.');
			return;
		}
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
									record.set('hqof_idcd' , _global.hqof_idcd );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }

					record.set('hqof_idcd' , _global.hqof_idcd );
				}
			},
			callback : function(results, record ) {
				record.set('hqof_idcd' , _global.hqof_idcd );
				if (results.success) {
					store.sync({
						success : function(operation){
							drtr_store.sync();
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
		var	mngtlister = me.pocket.mngtlister();
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask }),
			store = mngtlister.getStore();
		;
		mask.show();
		if(store.getUpdatedRecords().length>0){
			store.getUpdatedRecords()[0].data.cstm_idcd = editor.down('[name=cstm_idcd]').getValue();
		}
		mngtlister.getStore().sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
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
		window.update_stat = 0;
		mask.hide();
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor(),
			master = me.pocket.lister(),
			select = master.getSelectionModel().getSelection()[0],
			deli_store = me.pocket.deli_lister().getStore(),
			drtr_store = me.pocket.drtr_lister().getStore(),
			mngtlister = me.pocket.mngtlister()
		;
		if(select){
			deli_store.clearFilter();
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

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}
});

