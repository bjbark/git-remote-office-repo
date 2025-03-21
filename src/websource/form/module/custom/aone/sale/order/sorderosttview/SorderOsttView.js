Ext.define('module.custom.aone.sale.order.sorderosttview.SorderOsttView', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'module.common.view.SearchBar',
		'module.common.view.SearchRowStatus',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewMaster1',
		'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewMaster2',
		'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewMaster3',
		'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewDetail',
		'module.custom.aone.sale.order.sorderosttview.model.SorderOsttViewFile'
	],
	stores:[
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster1',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster2',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster3',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewMaster4',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewDetail',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewFile',
		'module.custom.aone.sale.order.sorderosttview.store.SorderOsttViewUpload'
	],
	views : [
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewLayout',
		/* 현황 */
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewEditor',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewSearch',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster1',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster1_1',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster2',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster2_1',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster3',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster3_1',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster4',
		'module.custom.aone.sale.order.sorderosttview.view.SorderOsttViewListerMaster4_1'
		/* 작업 */
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.joinPermission(workspace.down('module-sorderosttview-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-sorderosttview-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-sorderosttview-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sorderosttview-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-sorderosttview-layout #mainpanel'									: { tabchange : me.selectAction },
//			'module-sorderosttview-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction        }, /* 마감 */
//			'module-sorderosttview-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeAction        }, /* 마감취소 */
//			'module-sorderosttview-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
//			'module-sorderosttview-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
//			'module-sorderosttview-lister-master2 button[action=repairAction]'			: { click : me.repairAction    	  }, /* Amend */
//			'module-sorderosttview-lister-master2 button[action=copyAction]'			: { click : me.copyAction         }, /* 견적복사 */
//			'module-sorderosttview-lister-master2 button[action=orderAction]'			: { click : me.orderAction        }, /* 견적등록 */
//			'module-sorderosttview-lister-master2 button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
//			'module-sorderosttview-lister-master2 button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-sorderosttview-lister-master1 button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
//			'module-sorderosttview-lister-master2 button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-sorderosttview-lister-master2 button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-sorderosttview-lister-master3 button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-sorderosttview-lister-master4 button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
//			'module-sorderosttview-lister-master2 button[action=printAction]'			: { click : me.printAction        }, /* 견적서발행 */

//			'module-sorderosttview-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2       }, /* 디테일삭제 */

//			'module-sorderosttview-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
//			'module-sorderosttview-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-sorderosttview-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sorderosttview-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderosttview-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sorderosttview-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sorderosttview-worker-lister')[0] }
		},
		lister : {
				detail  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-detail')[0] }
		},
		master1  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master1')[0] },
		master2  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master2')[0] },
		master3  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master3')[0] },
		master4  : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister-master4')[0] },
		popup   : function () { return Ext.ComponentQuery.query('module-sorderosttview-copy-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-sorderosttview-lister2')[0] }
	},

//	closeAction:function(callbackFn) {
//		var me = this,
//			select = me.pocket.lister.master().getSelectionModel().getSelection(),
//			master = me.pocket.lister.master()
//		;
//
//		var err_msg = "";
//		if (select && select.length != 0) {
//			Ext.each(select, function(record) {
//				if (record.get("line_clos") == "1") {
//					err_msg = "이미 마감되었습니다.";
//				}
//			});
//
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		} else {
//			Ext.Msg.alert("알림", "마감할 견적을 선택하여 주시기 바랍니다.");
//			return;
//		}
//
//		if (select) {
//			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//				fn: function (button) {
//					if (button=='yes') {
//						Ext.each(select, function(record) {
//							record.set('_flag', '1');     // 1:마감&마감해지
//							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
////							record.store.commitChanges();
//						});
//						Ext.each(select, function(record) {
//							Ext.Ajax.request({
//								url		: _global.location.http() + '/sale/order/estimast/set/close.do',
//								params	: {
//									token : _global.token_id,
//									param : JSON.stringify({
//										invc_numb		: record.get('invc_numb'),
//										line_clos		: '1',
//										stor_id			: _global.stor_id,
//										hqof_idcd		: _global.hqof_idcd,
//										table			: 'esti_mast'
//									})
//								},
//								async	: false,
//								method	: 'POST',
//								success	: function(response, request) {
//									var result = Ext.decode(response.responseText);
//									if	(!result.success ){
//										Ext.Msg.error(result.message );
//										return;
//									} else {
//									}
//								},
//								failure : function(result, request) {
//								},
//								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//								}
//							});
//						})
//					}
//				}
//			});
//		}
//	},
//
//	closeCancelAction:function(callbackFn) {
//		var me = this,
//			select = me.pocket.lister.master().getSelectionModel().getSelection(),
//			master = me.pocket.lister.master()
//		;
//
//		var err_msg = "";
//		if (select && select.length != 0) {
//			Ext.each(select, function(record) {
//				if (record.get("line_clos") != "1") {
//					err_msg = "마감해지할 수 없는 상태입니다.";
//				}
//			});
//
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		} else {
//			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
//			return;
//		}
//
//		if (select) {
//			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//
//				fn: function (button) {
//					if (button=='yes') {
//						Ext.each(select, function(record) {
//							record.set('_flag'		, '1'); // 1:마감&마감해지
//							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
//							record.store.commitChanges();
//						});
//						Ext.each(select, function(record) {
//							Ext.Ajax.request({
//								url		: _global.location.http() + '/sale/order/estimast/set/close.do',
//								params	: {
//									token : _global.token_id,
//									param : JSON.stringify({
//										invc_numb		: record.get('invc_numb'),
//										line_clos		: '0',
//										stor_id			: _global.stor_id,
//										hqof_idcd		: _global.hqof_idcd,
//										table			: 'esti_mast'
//									})
//								},
//								async	: false,
//								method	: 'POST',
//								success	: function(response, request) {
//									var result = Ext.decode(response.responseText);
//									if	(!result.success ){
//										Ext.Msg.error(result.message );
//										return;
//									} else {
//									}
//								},
//								failure : function(result, request) {
//								},
//								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//								}
//							});
//						})
//					}
//				}
//			});
//		}
//	},

	selectAction:function(callbackFn) {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
			master3 = me.pocket.master3(),
			master4 = me.pocket.master4(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(param.invc1_date==''||param.invc1_date==''){
			Ext.Msg.alert("알림", "기간을 입력해주십시오.");
		}else if(param.invc1_date > param.invc1_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			if(tindex == 0){
				lister = master1;
			}else if(tindex == 1){
				lister = master2;
			}else if(tindex == 2){
				lister = master3;
			}else if(tindex == 3){
				lister = master4;
			}
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

//	selectRecord:function( grid, records ){
//		var me = this,
//			detail = me.pocket.lister.detail(),
//			lister2 = me.pocket.lister2(),
//			workerlister = me.pocket.worker.lister()
//		;
//		detail.getStore().clearData();
//		detail.getStore().loadData([],false);
//
//		lister2.getStore().clearData();
//		lister2.getStore().loadData([],false);
//
//		workerlister.getStore().clearData();
//		workerlister.getStore().loadData([],false);
//	},
//
//	selectDetail : function(grid, record) {
//		var me = this,
//			detail = me.pocket.lister.detail(),
//			lister2 = me.pocket.lister2()
//		;
//		if (record) {
//			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
//			mask.show();
//			detail.select({
//				 callback : function(records, operation, success) {
//					if (success) {
//					} else {}
//					mask.hide();
//				}, scope : me
//			}, { invc_numb : record.get('invc_numb') });
//			lister2.select({
//				callback:function(records, operation, success) {
//					if (success) {
//					} else { me.pocket.editor().getForm().reset(true);}
//					}, scope:me
//			}, { invc_numb : record.get('invc_numb'),orgn_dvcd : 'esti_mast' });
//			lister2.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
//		}
//	},
//
//	repairAction:function() {
//		var me = this,
//			master = me.pocket.lister.master(),
//			popup  = me.pocket.popup(),
//			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]
//		;
//		var err_msg = "";
//
//
////		var records = master.getSelectionModel().getSelection();
////		if (!records || records.length!=1) {
////			Ext.Msg.alert("알림", "amend 등록할 수주  1건을 선택 후 진행하십시오.");
////			return;
////		}
//		var me = this
//		resource.loadPopup({
//			widget : 'module-aone-sorderplan-repair-popup',
//		});
////		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//	},
//
//
//	modifyAction:function() {
//		var me = this,
//			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
//			editor = me.pocket.worker.editor(),
//			lister = me.pocket.worker.lister()
//		;
//
//		var err_msg = "";
//		if (select){
//			if (select.get("line_clos") == "1") {
//				err_msg = "마감된 견적입니다.";
//			}
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		}
//		if (select){
//			editor.modifyRecord({
//				caller	: me,
//				action	: 'invoice',
//				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
//				lister	: lister,
//				callback: function( results ) {
//					if (results.success){
//						me.pocket.layout().getLayout().setActiveItem(1);
//						results.feedback( {success : true } );
//					}
//				}
//			}, me);
//		}
//	},
//
//	insertAction:function() {
//		var me		= this,
//			editor	= me.pocket.worker.editor(),
//			lister	= me.pocket.worker.lister(),
//			parent
//		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();
//		lister.getStore().clearData();
//		lister.getStore().loadData([],false);
//
//		editor.insertBefore({
//			caller	: me,
//			keygen	: {
//				url			: _global.location.http() + '/listener/seq/maxid.do',
//				object		: resource.keygen,
//				params		: {
//					token	: _global.token_id ,
//					param	: JSON.stringify({
//						stor_id	: _global.stor_id,
//						table_nm: 'esti_mast'
//					})
//				}
//			},
//			callback : function (keygen){
//				if (keygen.success){
//					editor.insertRecord({
//						action	: 'invoice',
//						caller	: me,
//						record	: Ext.create( me.models[0] ,{
//							invc_numb	: keygen.records[0].seq
//						}),
//						lister		: me.pocket.worker.lister(),
//						callback	: function (results){
//							if  (results.success){
//								me.pocket.layout().getLayout().setActiveItem(1);
//								results.feedback({success : true , visible : true });
//							}
//						}
//					});
//				}
//			}
//		});
//	},
//
//	updateAction:function() {
//		var me = this,
//			editor = me.pocket.worker.editor(),
//			lister = me.pocket.worker.lister(),
//			master = me.pocket.lister.master(),
//			detail = me.pocket.lister.detail(),
//			store	= master.getStore(),
//			store2	= editor.getStore(),
//			store3	= lister.getStore()
//		;
//
//			editor.updateRecord({
//			caller	: me,
//			action	: 'invoice',
//			before	: function(results, record ) {
//				if (results.success) {
//					var info	= record,
//						dirty	= false
//					;
//					var items	= info.product().data.items;
//
//					info.dirtyValue('sysm_memo', '');
//					info.product().data.each( function( item ) {
//						item.dirtyValue('invc_numb', info.get('invc_numb'));
//						if (item.dirty || item.phantom) {
//							dirty = true;
//						}
//						if(item.data.esti_qntt == 0){
//							store3.remove(item);
//						}
//					});
//					if (dirty) {
//						info.setDirty();
//					}
//
//					results.feedback({success : true  });
//
//				}
//			},
//
//			callback : function(results, record, store ) {
//				if (results.success){
//					store.sync({
//						success : function(records, operation){
//							var ms;
//							if (results.inserted){
//								ms = Ext.create( master.getStore().model.modelName , record.data );
//								master.getStore().insert(0, ms);
//							} else {
//								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
//								Ext.iterate(ms.data, function (key, value) {
//									ms.set( key, record.get(key));
//								});
//							}
////							detail.getStore().loadData(record.product().data.items, false);
//
////							detail.getStore().reload();
//							master.getSelectionModel().select(ms);
//							master.getStore().commitChanges();
//							me.pocket.layout().getLayout().setActiveItem(0);
//							results.feedback({success : true  });
//							master.select({
//								 callback:function(records, operation, success) {
//									if (success) {
//										master.getSelectionModel().select(0);
//									} else { me.pocket.editor().getForm().reset(true); }
//								}, scope:me
//							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
//
//						}, /* 저장 성공시 */
//						failure : function(operation){ results.feedback({success : false });},
//						callback: function(operation){ results.callback({}); }
//					});
//				}
//			Ext.ComponentQuery.query('module-estimast-worker-search')[0].getForm().reset();
//			}
//		});
//	},
//
//	copyAction:function() {
//		var me = this,
//			master = me.pocket.lister.master()
//			popup  = me.pocket.popup()
//		;
//		var err_msg = "";
//		var records = master.getSelectionModel().getSelection();
//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
//			return;
//		}
//		var me = this
//		resource.loadPopup({
//			widget : 'module-estimast-copy-popup',
//			params : {
//				invc_numb : records[0].get('invc_numb'),
//				cstm_name : records[0].get('cstm_name'),
//				cstm_idcd : records[0].get('cstm_idcd'),
//			},
//		});
//	},
//
//	orderAction:function() {
//		var me = this,
//			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
//			editor = me.pocket.worker.editor(),
//			lister = me.pocket.worker.lister(),
//			master = me.pocket.lister.master()
//		;
//		if(select){
//			console.log(select);
//			if  (select.get('acpt_cofm_yorn') !== '0') {
//				Ext.Msg.alert("알림", "이미 수주등록이 완료된 견적입니다.");
//				return;
//			}
//
//			Ext.Msg.confirm("확인", "수주등록을 하시겠습니까?", function(button) {
//				if (button == 'yes') {
//					Ext.Ajax.request({
//						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/acpt.do',
//						method		: "POST",
//						params		: {
//							token	: _global.token_id,
//							param	: Ext.encode({
//								invc_numb	: select.get('invc_numb'),
//								deli_date	: select.get('deli_date'),
//								stor_id		: _global.stor_id,
//								hqof_idcd	: _global.hqof_idcd
//							})
//						},
//						success : function(response, request) {
//							var object = response,
//								result = Ext.decode(object.responseText)
//							;
//							master.getStore().reload();
//							Ext.Msg.alert("알림","등록이 완료 되었습니다.");
//						},
//						failure : function(response, request) {
//							resource.httpError(response);
//						},
//						callback : function() {
//							me.pocket.lister.master().getStore().loadData([],true);
//							me.pocket.lister.detail().getStore().loadData([],false);
//						}
//					});
//				}
//			});
//		}else{
//			Ext.Msg.alert("알림","등록할 견적을 선택해주십시오.");
//		}
//	},
//
//	cancelAction:function() {
//		var me = this,
//			editor = me.pocket.worker.editor()
//		;
//		editor.cancelRecord({
//			action		: 'invoice',
//			caller		: me,
//			callback	: function( results ) {
//				if (results.success){
//					me.pocket.layout().getLayout().setActiveItem(0);
//					results.feedback( {success : true});
//				}
//				Ext.ComponentQuery.query('module-estimast-worker-search')[0].getForm().reset();
//			}
//		});
//	},
//
//	deleteAction:function() {
//		var me = this,
//			master = me.pocket.lister.master(),
//			store  = master.getStore()
//		;
//
//		var err_msg = "";
//		var records = master.getSelectionModel().getSelection();
//
//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
//			return;
//		}
//
//		if (records && records.length != 0){
//			Ext.each(records, function(record) {
//				if (record.get("line_clos") == "1") {
//					err_msg = "마감되어 삭제할 수 없습니다.";
//				}
//			});
//
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		}
//
//		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
//			if (button == 'yes') {
//				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
//				mask.show();
//
//				Ext.Ajax.request({
//					url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/del_yn.do',
//					method		: "POST",
//					params		: {
//					 	token	: _global.token_id,
//						param	: Ext.encode({
//							invc_numb	: records[0].get('invc_numb')
//						})
//					},
//					success : function(response, request) {
//						var object = response,
//							result = Ext.decode(object.responseText)
//						;
//						if (result.success) {
//							store.remove(records[0]);
//							store.commitChanges();
//						} else {
//							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
//						}
//					},
//					failure : function(response, request) {
//						resource.httpError(response);
//					},
//					callback : function() {
//						mask.hide();
//						me.pocket.lister.detail().getStore().loadData([],false);
//					}
//				});
//			}
//		});
//	},
//
//	// 견적서 발행
//	printAction:function() {
//		var me = this,
//			master = me.pocket.lister.master(),
//			select = master.getSelectionModel().getSelection(),
//			jrf = 'EstiReport.jrf',
//			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
//		;
//		var err_msg = "";
//		var records = master.getSelectionModel().getSelection();
//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
//			return;
//		}
//		var invc_numb = select[0].get('invc_numb');
//		var arg =	'invc_numb~'+invc_numb+'~';
//
//		if(resId == 'SJFLV'){
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'EstiReport_Sjflv.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
//		}else if (select) {
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
//		}
//
//		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
//		return win;
//	},
//
//	deleteAction2:function(){
//		var me = this,
//		workerlister = me.pocket.worker.lister(),
//		store  = workerlister.getStore(),
//		editor = me.pocket.worker.editor(),
//		record = editor.getRecord(),
//		store2 = editor.getStore()
//	;
//		console.log(record);
//		var err_msg = "";
//		var records = workerlister.getSelectionModel().getSelection();
//
//		if (!records || records.length<1) {
//			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
//			return;
//		}
//		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
//			fn : function (button) {
//				if (button==='yes') {
//					for (var i = 0; i < records.length; i++) {
//						store.remove(records[i]);
//					}
//					if(record.data.modi_yorn=='n'){
//						record.set('modi_yorn','y');
//						record.store.commitChanges();
//					}
//				}
//			}
//		});
//
//
//
//	},




	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.master4().writer({enableLoadMask:true});
	}
});
