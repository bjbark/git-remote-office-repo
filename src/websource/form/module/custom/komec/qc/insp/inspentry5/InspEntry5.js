Ext.define('module.custom.komec.qc.insp.inspentry5.InspEntry5', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.MoldPopup',
	],

	models:[
		'module.custom.komec.qc.insp.inspentry5.model.InspEntry5Master',
		'module.custom.komec.qc.insp.inspentry5.model.InspEntry5Lister1'
	],
	stores:[
		'module.custom.komec.qc.insp.inspentry5.store.InspEntry5Master',
		'module.custom.komec.qc.insp.inspentry5.store.InspEntry5Lister1'
	],
	views:
	[
		'module.custom.komec.qc.insp.inspentry5.view.InspEntry5Layout',
		'module.custom.komec.qc.insp.inspentry5.view.InspEntry5Search',
		'module.custom.komec.qc.insp.inspentry5.view.InspEntry5Master',
		'module.custom.komec.qc.insp.inspentry5.view.InspEntry5Popup',
		'module.custom.komec.qc.insp.inspentry5.view.InspEntry5Lister1'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-komec-inspentry5-layout button[action=selectAction]'	: { click : me.selectAction },	// 조회
			// editer event
//			'module-komec-inspentry5-editor button[action=updateAction]'	: { click : me.updateAction },	// 저장
//			'module-komec-inspentry5-editor button[action=cancelAction]'	: { click : me.cancelAction },	// 취소
			// lister event
			'module-komec-inspentry5-lister1 button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-komec-inspentry5-lister1 button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-komec-inspentry5-lister button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-komec-inspentry5-lister button[action=passAction]'	: { click : me.passAction },	// 합격처리
			'module-komec-inspentry5-lister1 button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-komec-inspentry5-lister1 button[action=inspPopup]'	: { click : me.inspPopup },	// 엑셀
			'module-komec-inspentry5-lister button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			// lister event
			'module-komec-inspentry5-lister' : {
				selectionchange   : me.selectLister,												// 메뉴 선택시 이벤트
			}

		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-komec-inspentry5-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-komec-inspentry5-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-komec-inspentry5-lister')[0] },
		lister1: function () { return Ext.ComponentQuery.query('module-komec-inspentry5-lister1')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-komec-inspentry5-popup')[0] },
	},


	//조회
	selectAction:function()
		{
		var me = this,
			master = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.fr_dt == null || param.fr_dt <= param.to_dt || param.fr_dt2 <= param.to_dt2){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			master.select({
				callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			Ext.Msg.alert("알림", '지시일자와 납기일자를 확인해주세요');
		}

	},

	//선택
	selectLister:function( grid, record ){
		if(record[0] == null){
			return;
		}else{
			var me = this,
			master = me.pocket.master(),
			lister1 = me.pocket.lister1(),
			record = master.getSelectionModel().getSelection()[0]
			;
			lister1.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}

					}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

//	//수정
//	modifyAction:function() {
//		var me = this,
//			master = me.pocket.lister(),
//			mrecord		= mrecord ? record[0] : master.getSelectionModel().getSelection()[0]
//		;
//		editor.modifyRecord({
//			caller	: me,
//			callback: function( results) {
//				if (results.success){
//					results.feedback( {success : true, visible : true } );
//				}
//			}
//		});
//	},
//
//	updateAction:function() {
//		var me = this,
//			master = me.pocket.lister(),
//			editor = me.pocket.editor(),
//			store  = lister.getStore()
//		;
//		editor.updateRecord({
//			store  : store,
//			action : Const.EDITOR.DEFAULT,
//			before : function(results, record) {
//				if (results.success) {
//					 { results.feedback({success : true }); }
//				}
//			},
//			callback : function(results, record ) {
//				if (results.success) {
//					store.sync({
//						success : function(operation){ results.feedback({success : true,  });},
//						failure : function(operation){ results.feedback({success : false,  });},
//						callback: function(operation){ results.callback({});}
//					} );
//				}
//			},
//			finished : function(results, record, operation){
//				if (results.success){
////					editor.collapse(false);
//					switch (operation) {
//					case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record );
//					break;
//				}
//				}
//			}
//		});
//	},
//
//	//취소
//	cancelAction:function() {
//		var me = this, editor = me.pocket.editor();
//		editor.getForm().reset();
//	},
//
//	//삭제
//	deleteAction:function() {
//		var me = this, editor = me.pocket.editor();
//		editor.deleteRecord({
//			lister		: me.pocket.lister(),
//			callback	: function(results, record, store) {
//				store.sync({
//					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
//					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
//					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
//				});
//			}
//		}, me);
//	},

	//합격처리
	passAction:function() {
		var me = this,
			lister1 = me.pocket.lister1(),

			select = lister1.getSelectionModel().getSelection()[0]
		;
		if (!select) {
			Ext.Msg.alert("알림","출고내역을 선택해주십시오.");
		}else{
			console.log(select);
			console.log(select.get('line_seqn'));
			Ext.Msg.confirm("확인", "합격처리를 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry5/set/pass.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: select.get('invc_numb'),
									line_seqn		: select.get('line_seqn'),
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd
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
								lister1.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					})
				}
			});
		}
	},
	inspPopup : function(){
		var me = this,
			master = me.pocket.master(),
			detail = me.pocket.lister1()
		;
		var err_msg		= "";
		var mrecord	= master.getSelectionModel().getSelection()[0];
		var record		= detail.getSelectionModel().getSelection()[0];
		if (!record) {
			Ext.Msg.alert("알림", "검사 하시려는 출고의뢰를 선택 후 진행하십시오.");
			return;
		}
		var a = resource.loadPopup({
			widget : 'module-komec-inspentry5-popup',
			param  : {
			},
			result : function (records) {
				detail.getStore().reload();
			}
		});
		var form = a.down('form');
		var rec = Ext.merge({
//			invc_numb : mrecord.get('invc_numb'),
			cstm_name : mrecord.get('cstm_name')
		},record.data);
		form.getForm().setValues(rec)
	},
	//엑셀
	exportAction : function(record){
		var value = record.itemId;
		if(value == 'master'){
			this.pocket.master().writer({enableLoadMask:true});
		}else if(value == 'lister1'){
			this.pocket.lister1().writer({enableLoadMask:true});
		}
//		else if(value == 'lister2'){
//			console.log('lister2')
//			this.pocket.lister2().writer({enableLoadMask:true});
//		}else if(value == 'lister3'){
//			console.log('lister3')
//			this.pocket.lister3().writer({enableLoadMask:true});
//		}else if(value == 'lister4'){
//			console.log('lister4')
//			this.pocket.lister4().writer({enableLoadMask:true});
//		}
	}
});
