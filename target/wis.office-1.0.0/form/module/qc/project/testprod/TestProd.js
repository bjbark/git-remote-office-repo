Ext.define('module.qc.project.testprod.TestProd', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.qc.project.testprod.model.TestProdMaster',
		'module.qc.project.testprod.model.TestProdDetail',
		'module.qc.project.testprod.model.TestProdFile'
	],
	stores	: [
		'module.qc.project.testprod.store.TestProdMaster',
		'module.qc.project.testprod.store.TestProdDetail',
		'module.qc.project.testprod.store.TestProdFile'
	],
	views	: [
		'module.qc.project.testprod.view.TestProdLayout',
		'module.qc.project.testprod.view.TestProdSearch',
		'module.qc.project.testprod.view.TestProdListerMaster',
		'module.qc.project.testprod.view.TestProdListerDetail',
		'module.qc.project.testprod.view.TestProdEditor',
		'module.qc.project.testprod.view.TestProdFile'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-testprod-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// layout event
			'module-testprod-lister-master button[action=exportAction]'		: { click : me.exportAction },	// 엑셀
			// lister detail event
			'module-testprod-lister-detail button[action=modifyAction]'		: { click : me.modifyAction },	// 수정
			'module-testprod-lister-detail button[action=insertAction]'		: { click : me.insertAction },	// 신규
			'module-testprod-lister-detail button[action=exportAction]'		: { click : me.exportAction1},	// 엑셀
			'module-testprod-lister-detail button[action=deleteAction]'		: { click : me.deleteAction },	// 삭제
			// editer event
			'module-testprod-editor button[action=updateAction]'			: { click : me.updateAction },	// 저장
			'module-testprod-editor button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			// lister master event
			'module-testprod-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-testprod-lister-detail' : {
				selectionchange : me.attachRecord2
			},
			'module-testprod-layout #mainpanel' : {
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-testprod-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-testprod-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-testprod-lister-master')[0] },
		listerdetail	: function () { return Ext.ComponentQuery.query('module-testprod-lister-detail')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-testprod-editor')[0] },
		file			: function () { return Ext.ComponentQuery.query('module-testprod-file')[0] }
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
			}, { pjod_idcd : record.get('pjod_idcd'),
				 orig_seqn : record.get('line_seqn')});
		}
	},

	attachRecord:function( smodel, record ){
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	attachRecord2:function( smodel, record ){
		var me      = this,
			editor  = me.pocket.editor(),
			lister  = smodel ? smodel.view.ownerCt : me.pocket.listerdetail(),
			mrecord = lister.getSelectionModel().getSelection(),
			record  = me.pocket.listerdetail().getSelectionModel().getSelection()
			file    = me.pocket.file()
		;
		if(record[0]){
			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : mrecord ? mrecord : lister.getSelectionModel().getSelection(),
				callback : function (results , record ) {
					if (results.success) {
					}
				}
			});
			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('pjod_idcd'),orgn_dvcd : 'testprod',line_seqn: record[0].get('line_seqn') });
			file.down('[name=file]').popup.params.invc_numb = record[0].get('pjod_idcd');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			file.down('[name=file]').popup.params.line_seqn = record[0].get('line_seqn');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor			= me.pocket.editor(),
			listermaster	= me.pocket.listermaster(),
			listerdetail	= me.pocket.listerdetail(),
			select			= me.pocket.listermaster().getSelectionModel().getSelection()[0],
			sub				= listerdetail.down('#sub').grid.store.data.length,
			old_line_seqn	= 0,
			file			= me.pocket.file()
		;
		file.getStore().clearData();
		file.getStore().loadData([],false);
		file.down('[name=file]').popup.params.invc_numb = "";

		if(select){
			Ext.Ajax.request({
				url		: _global.location.http() + '/qc/project/testprod/get/seqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							pjod_idcd : select.get('pjod_idcd')
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
					pjod_idcd : select.get('pjod_idcd'),
					orig_seqn : select.get('line_seqn'),
					line_seqn : old_line_seqn,
					item_name : select.get('item_name')
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
			Ext.Msg.alert("알림","추가 할 의뢰내역을 선택하여 주십시오.");
		}
	},

	//수정
	modifyAction:function() {
		var me     = this,
			editor = me.pocket.editor(),
			select = me.pocket.listerdetail().getSelectionModel().getSelection()[0],
			select1 = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster(),
			item_name = select1.get('item_name'),
			item_name1 = editor.down('[name=item_name]')
		;
		if(select){
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
			Ext.Msg.alert("알림","수정 할 시험생산 내역을 선택하여 주십시오.");
		}
	},

	//삭제
	deleteAction : function() {
		var me				= this,
			editor			= me.pocket.editor(),
			listerdetail	= me.pocket.listerdetail()
		;
		editor.deleteRecord({
			lister : me.pocket.listerdetail(),
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
			listerdetail	= me.pocket.listerdetail(),
			editor			= me.pocket.editor(),
			store			= listerdetail.getStore(),
			select			= me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		if(editor.down('[name=cvic_idcd]').getValue()==null || editor.down('[name=cvic_idcd]').getValue() == ''){
			Ext.Msg.alert("알림","설비를 반드시 입력해주십시오.");
		}else if(editor.down('[name=drtr_idcd]').getValue()==null || editor.down('[name=drtr_idcd]').getValue() == ''){
			Ext.Msg.alert("알림","담당자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=sttm1]').getValue()==null || editor.down('[name=sttm1]').getValue() == ''){
			Ext.Msg.alert("알림","시작일자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=sttm2]').getValue()==null || editor.down('[name=sttm2]').getValue() == ''){
			Ext.Msg.alert("알림","시작시간을 반드시 입력해주십시오.");
		}else if(editor.down('[name=edtm1]').getValue()==null || editor.down('[name=edtm1]').getValue() == ''){
			Ext.Msg.alert("알림","종료일자를 반드시 입력해주십시오.");
		}else if(editor.down('[name=edtm2]').getValue()==null || editor.down('[name=edtm2]').getValue() == ''){
			Ext.Msg.alert("알림","종료시간을 반드시 입력해주십시오.");
		}else if(editor.down('[name=prod_qntt]').getValue()==null || editor.down('[name=prod_qntt]').getValue() == ''){
			Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
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
					listerdetail.select({
						callback : function(records, operation, success) {
							if (success) {
							} else {}
						}, scope : me
					}, { pjod_idcd : select.get('pjod_idcd'), orig_seqn : select.get('line_seqn') });
					if (results.success){
						editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
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
			listermaster	= me.pocket.listermaster(),
			listerdetail	= me.pocket.listerdetail()
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
			listerdetail : listerdetail ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	exportAction1 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});