Ext.define('module.sale.project.prjttestordr.PrjtTestOrdr', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BopPjodPopup'
	],

	models	: [
		'module.sale.project.prjttestordr.model.PrjtTestOrdrMaster',
		'module.sale.project.prjttestordr.model.PrjtTestOrdrDetail'
	],
	stores	: [
		'module.sale.project.prjttestordr.store.PrjtTestOrdrMaster',
		'module.sale.project.prjttestordr.store.PrjtTestOrdrDetail'
	],
	views	: [
		'module.sale.project.prjttestordr.view.PrjtTestOrdrLayout',
		'module.sale.project.prjttestordr.view.PrjtTestOrdrSearch',
		'module.sale.project.prjttestordr.view.PrjtTestOrdrListerMaster',
		'module.sale.project.prjttestordr.view.PrjtTestOrdrListerDetail',
		'module.sale.project.prjttestordr.view.PrjtTestOrdrEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjttestordr-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// layout event
			'module-prjttestordr-lister-master button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			// lister detail event
			'module-prjttestordr-lister-master button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-prjttestordr-lister-master button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-prjttestordr-lister-master button[action=exportAction]'		: { click : me.exportAction1},	// 엑셀
			'module-prjttestordr-lister-master button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			'module-prjttestordr-lister-master button[action=workAction]'		: { click : me.workAction   },	// 작업지시
			// editer event
			'module-prjttestordr-editor button[action=updateAction]'			: { click : me.updateAction },	// 저장
			'module-prjttestordr-editor button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			// lister master event
			'module-prjttestordr-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-prjttestordr-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-prjttestordr-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-prjttestordr-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-prjttestordr-lister-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-prjttestordr-lister-detail')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-prjttestordr-editor')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		if(param.regi_date1>param.regi_date2 || param.deli_date1>param.deli_date2){
			Ext.Msg.alert("알림","일자를 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster.select({
				callback:function(records, operation, success) {
				if (success) {
					listermaster.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd') });
		}
	},

	attachRecord:function( smodel, record ){
		var me      = this,
			editor  = me.pocket.editor(),
			lister  = smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
			mrecord = lister.getSelectionModel().getSelection()
		;
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : mrecord ? mrecord : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster(),
			search       	= me.pocket.search(),
			select			= search.getValues(),
			old_line_seqn 	= 0
		;
		if(select.pjod_idcd){
			Ext.Ajax.request({
				url		: _global.location.http() + '/sale/project/prjttestordr/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							pjod_idcd : select.pjod_idcd
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
				record	: Ext.create( listermaster.getStore().model.modelName,{
					pjod_idcd : select.pjod_idcd,
					line_seqn : old_line_seqn,
					item_name : select.item_name
				}),
				listermaster	: listermaster,
				disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
				callback: function (results) {
					if (results.success) {
						results.feedback({success : true , visible : true });
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","수주번호를 선택하여 주십시오.");
		}
	},

	//수정
	modifyAction:function() {
		var me     = this,
			editor = me.pocket.editor(),
			select = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			listermaster = me.pocket.listermaster(),
			item_name1 = editor.down('[name=item_name]')
		;
		if(select){
			var item_name = select.get('item_name')
			;
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						item_name1.setValue(item_name);
					}
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			});
		}else{
			Ext.Msg.alert("알림","수정 할 시험생산 의뢰 내역을 선택하여 주십시오.");
		}
	},

	//삭제
	deleteAction : function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster()
		;
		editor.deleteRecord({
			lister : me.pocket.listermaster(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//저장
	updateAction:function() {
		var me				= this,
			listermaster	= me.pocket.listermaster(),
			editor			= me.pocket.editor(),
			store			= listermaster.getStore(),
			select			= listermaster.getSelectionModel().getSelection()[0]
		;
		if(editor.down('[name=cvic_idcd]').getValue()==null || editor.down('[name=cvic_idcd]').getValue() == ''){
			Ext.Msg.alert("알림","설비를 반드시 입력해주십시오.");
		}else if(editor.down('[name=sttm1]').getValue()==null || editor.down('[name=sttm1]').getValue() == ''){
			Ext.Msg.alert("알림","시작일자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=sttm2]').getValue()==null || editor.down('[name=sttm2]').getValue() == ''){
			Ext.Msg.alert("알림","시작시간을 반드시 입력해주십시오.");
		}else if(editor.down('[name=edtm1]').getValue()==null || editor.down('[name=edtm1]').getValue() == ''){
			Ext.Msg.alert("알림","종료일자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=edtm2]').getValue()==null || editor.down('[name=edtm2]').getValue() == ''){
			Ext.Msg.alert("알림","종료시간을 반드시 입력해주십시오.");
		}else if(editor.down('[name=indn_qntt]').getValue()==null || editor.down('[name=indn_qntt]').getValue() == ''){
			Ext.Msg.alert("알림","지시수량을 반드시 입력해주십시오.");
		}else{
			editor.updateRecord({
				store  : store,
				action : Const.EDITOR.DEFAULT,
				before : function(results, record) {
					if (results.success) {
						if (record.phantom && Ext.isEmpty(record.get('pjod_idcd'))) {
							resource.keygen({
								url		: _global. location.http () + '/listener/seq/maxid.do',
								object	: resource. keygen,
								params	: {
									token : _global. token_id ,
									param : JSON. stringify({
										stor_id		: _global.stor_id,
										table_nm	: 'pjod_test_prod'
									})
								 },
								async	: false,
								callback: function( keygen ) {
									if (keygen.success) {
										record.dirtyValue('pjod_idcd' , keygen.records[0].seq );
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
							callback: function(operation){ results.callback({}); },
						} );
					}
				},
				finished : function(results, record, operation){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					listermaster.getStore().reload();
					if (results.success){
						editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listermaster.getSelectionModel().select(record ); break;
						}
					}
				}
			});
		}
	},

	//취소
	cancelAction:function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectDetail : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			listermaster : listermaster ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},
	//작업지시
	workAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select       = listermaster.selModel.getSelection()
		;
		if (select.length<1) {
			Ext.Msg.alert("알림", "시험생산의뢰 내역을 선택해주세요.");
			return;
		}else{
			var pjod_idcd = select[0].get('pjod_idcd');
			var line_seqn = select[0].get('line_seqn');
				Ext.Ajax.request({
				url		: _global.location.http() + '/sale/project/prjttestordr/set/workAction.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						pjod_idcd		: pjod_idcd,
						line_seqn		: line_seqn
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
		}
	},
	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});