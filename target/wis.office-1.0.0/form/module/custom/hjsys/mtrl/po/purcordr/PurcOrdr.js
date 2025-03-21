Ext.define('module.custom.hjsys.mtrl.po.purcordr.PurcOrdr', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrHjsysPopup',
	],

	models:[
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrInvoice',
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrMaster',
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrDetail',
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrDetail2',
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrInvoice2',
		'module.custom.hjsys.mtrl.po.purcordr.model.PurcOrdrSubItem',
	],
	stores:[
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrInvoice',
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrMaster',
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrDetail',
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrDetail2',
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrInvoice2',
		'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrSubItem',
	],
	views : [
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrLayout',
		/* 현황 */
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrSearch',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrListerMaster',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrListerDetail',
		/* 작업 */
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerEditor',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerSearch',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerLister',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerEditor2',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrWorkerLister2',
		'module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrSubItem'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-purcordr-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordr-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */

			'module-purcordr-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-purcordr-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-purcordr-lister-master button[action=etcPrintAction]'		: { click : me.invReportAction    }, /* 명세서 발행 */
			'module-purcordr-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-purcordr-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-purcordr-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-purcordr-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-purcordr-lister-master button[action=writeAction]'			: { click : me.PrintAction        }, /* 발주서발행*/
			'module-purcordr-lister-master button[action=isttAction]'			: { click : me.isttAction         }, /* 입고접수 */
			'module-purcordr-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-purcordr-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2      }, /*디테일삭제*/

			'module-purcordr-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-purcordr-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */


			'module-purcordr-lister-master button[action=HjInsertAction]'		: { click : me.HjInsertAction      }, /* 혁진등록 */
			'module-purcordr-lister-master button[action=modifyAction2]'		: { click : me.modifyAction2       }, /* 수정 혁진 */

			'module-purcordr-worker-lister2 button[action=updateAction2]'		: { click : me.updateAction2 }, /* 저장 */
			'module-purcordr-worker-lister2 button[action=cancelAction2]'		: { click : me.cancelAction2 }, /* 취소 */
			'module-purcordr-lister-master' : {
				selectionchange    : me.selectDetail,
//				selectionchange : me.selectRecord
			},
			'module-purcordr-worker-lister2' : {
				selectionchange : me.selectRecord2
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordr-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordr-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr-worker-lister')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-purcordr-worker-editor2')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-purcordr-worker-lister2')[0] },
			subItem : function () { return Ext.ComponentQuery.query('module-purcordr-lister-subItem')[0] }
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-purcordr-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-purcordr-lister-detail')[0] }
		}
	},
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되어 요청하신 작업을 진행할 수 없습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 발주서를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주서를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'purc_ordr_mast'
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
						})
					}
				}
			});
		}
	},
	closeCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") != "1") {
					err_msg = "마감해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 발주서를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주서를 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1');     // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'purc_ordr_mast'
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
						})
					}
				}
			});
		}
	},
	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor()
		;
		var me = this,
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},



	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail(),
			lister = me.pocket.worker.lister()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		lister.getStore().clearData();
		lister.getStore().loadData([],false);
	},

	selectRecord2:function( grid, records ){
		var me = this,
			lister = me.pocket.worker.lister2(),
			subItem = me.pocket.worker.subItem()
		;
		subItem.getStore().clearData();
		subItem.getStore().loadData([],false);

		if(records && records.length > 0 && records[0].data.item_idcd != ""){
			subItem.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : records[0].get('invc_numb'),item_idcd : records[0].data.item_idcd });
		}
	},



	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
			lister = me.pocket.worker.lister()
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		if (record.length > 0) {
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record[0].data.invc_numb });
		}
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 발주서는 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (select){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb'),acpt_numb:select.get('prnt_idcd') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},

	modifyAction2:function() {
		var me = this,
		select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
		editor = me.pocket.worker.editor2(),
		lister = me.pocket.worker.lister2()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 발주서는 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (select){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb'), acpt_numb : select.get('prnt_idcd'), dvcd : 'modify' })},
				lister	: lister,
				callback: function( results ) {
					console.log(results.records[0].raw.product[0]);
					if (results.success){
						console.log(results);
						editor.down('[name=modi_yorn]').setValue('Y');
						editor.down('[name=acpt_numb]').setReadOnly(true);
						editor.down('[name=modl_name]').setValue(results.records[0].raw.product[0].modl_name);
						editor.down('[name=modl_name]').setReadOnly(true);
						me.pocket.layout().getLayout().setActiveItem(2);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},
	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'purc_ordr_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: keygen.records[0].seq,
							user_name	: _global.login_nm,
							drtr_idcd	: _global.login_id
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},

	getFormatDate : function(date){
	    var year = date.getFullYear();              //yyyy
	    var month = (1 + date.getMonth());          //M
	    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
	    var day = date.getDate();                   //d
	    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
	    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
	},

	HjInsertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor2(),
			lister	= me.pocket.worker.lister2(),
			date = new Date(),new_invc_numb
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();

		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'purc_ordr_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: keygen.records[0].seq
						}),
						lister		: lister,
						callback	: function (results){
							if  (results.success){
								editor.getStore().clearData();
								editor.getStore().loadData([],false);
								editor.getForm().reset();

								editor.down('[name=invc_numb]').setValue(new_invc_numb);
								editor.down('[name=amnd_degr]').setValue('1');
								editor.down('[name=invc_date]').setValue(me.getFormatDate(new Date()));
								editor.down('[name=acpt_numb]').setReadOnly(false);
								me.pocket.layout().getLayout().setActiveItem(2);
								results.feedback( {success : true } );
							}
						}
					});
				}
			}
		});

//		Ext.Ajax.request({
//			url : _global.location.http() + '/listener/seq/maxid.do',
//			object		: resource.keygen,
//			params		: {
//				token	: _global.token_id ,
//				param	: JSON.stringify({
//					stor_id		: _global.stor_id,
//					table_nm	: 'purc_ordr_mast'
//				})
//			},
//			async	: false,
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				new_invc_numb = result.records[0].seq;
//			}
//		});

//		editor.modifyRecord({
//			caller	: me,
//			action	: 'invoice',
//			params	: {param:JSON.stringify({})},
//			lister	: lister,
//			callback: function( results ) {
//				if (results.success){
//					editor.getStore().clearData();
//					editor.getStore().loadData([],false);
//					editor.getForm().reset();
//
//					editor.down('[name=invc_numb]').setValue(new_invc_numb);
//					editor.down('[name=amnd_degr]').setValue('1');
//					editor.down('[name=invc_date]').setValue(me.getFormatDate(new Date()));
//
//					me.pocket.layout().getLayout().setActiveItem(2);
//					results.feedback( {success : true } );
//				}
//			}
//		}, me);

//		editor.attachRecord({
//			caller : me ,
//			lister : lister ,
//			record : Ext.create( me.models[0] ,{
//				invc_numb	: 'test',
//				user_name	: _global.login_nm,
//				drtr_idcd	: _global.login_id
//			}),
//			callback: function( results ) {
//				if (results.success){
//					results.feedback( {success : true } );
//				}
//			}
//		});
//		lister.select({
//			callback:function(records, operation, success) {
//				if (success) {
//				} else { me.pocket.editor2().getForm().reset(true); }
//			}, scope:me
//		}, Ext.merge({stor_grp : _global.stor_grp})
//		);
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			store	= master.getStore()
		;


		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				for(var i=0;i<record.productStore.data.items.length;i++){
					var deli2 = record.productStore.data.items[i].data.deli_date2;
					if(deli2 == '' || deli2 == null){
						Ext.Msg.alert("알림","납기일자를 입력하여 주시기 바랍니다.");
						return;
					}
				}

				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					if (dirty) {
						info.setDirty();
					}
					console.log(editor.getStore(),'editor');
					return;
					results.feedback({success : true  });
				}
			},
			callback : function(results, record, store ) {
				console.log(store);
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
								me.selectAction();
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
//							lister.select({
//								callback:function(records, operation, success) {
//									if (success) {
////										lister.getStore().load();
////										lister.getSelectionModel().select(0);
//									} else { me.pocket.editor().getForm().reset(true); }
//								}, scope:me
//							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
						}
					});
				}
			Ext.ComponentQuery.query('module-purcordr-worker-search')[0].getForm().reset();
			}
		});
	},

	updateAction2:function() {
		var me = this,
			editor = me.pocket.worker.editor2(),
			lister = me.pocket.worker.lister2(),
			detail = me.pocket.lister.detail(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			new_invc_numb = '', chk = 1, ch = 1;
		;

		store.each(function(findrecord){
			if(findrecord.get('modify') == 'Y'){
				if(findrecord.get('puch_qntt') == 0 && findrecord.get('stok_used_qntt') == 0 ){
					Ext.Msg.alert("알림","재고사용수량 또는 발주수량을 확인하여 주시기 바랍니다.");
					chk = 0;
				}
			}
			if(findrecord.get('puch_qntt') > 0 || findrecord.get('stok_used_qntt') > 0 ){
				if(findrecord.get('deli_date2') == '' || findrecord.get('deli_date2') == null){
					Ext.Msg.alert("알림","납기일자를 입력하여 주시기 바랍니다.");
					chk = 0;
				}
			}
		});

		if(chk == 1){
		store.each(function(findrecord){
			if((findrecord.get('puch_qntt') == '' || findrecord.get('puch_qntt') == null)
				|| (findrecord.get('stok_used_qntt') == '' || findrecord.get('stok_used_qntt') == null)){
					Ext.Msg.confirm("확인", "발주수량이나 재고사용수량이 0인 건의 경우 발주되지 않습니다. 진행 하시겠습니까?", function(button) {
						if (button == 'yes') {
							editor.updateRecord({
								caller	: me,
								action	: 'invoice',
								before	: function(results, record ) {
									console.log(record);
									if (results.success) {
										var info	= record,
											dirty	= false
										;
										info.product().data.each( function( item ) {
											item.set('invc_numb', info.get('invc_numb'));
											if (item.dirty || item.phantom) {
												dirty = true;
											}
										});
										if (dirty) {
											info.setDirty();
										}
										editor.getStore().add(info);

										// record 제거
										editor.getStore().each(function(findrecord){
											var deli = findrecord.productStore.data.each(function(findproduct){
												if(findproduct.get('puch_qntt') <= 0 && findproduct.get('stok_used_qntt') <= 0){
													findrecord.productStore.data.remove(findproduct);
												}
											});
										});
//
//										// 제거후 시퀀스
										var i = 1;
										editor.getStore().each(function(findrecord){
											findrecord.productStore.data.each(function(findproduct){
												findproduct.set('line_seqn', i++);
											});
										});

										results.feedback({success : true  });
									}
								},
								callback : function(results, record, store ) {
									if (results.success){
										var chk = 'insert';
										if(editor.down('[name=modi_yorn]').getValue()=='Y'){
											chk = 'update';
										}
										editor.getStore().each(function(findrecord){
											var deli = findrecord.productStore.data.each(function(findproduct){
												if(findproduct.get('puch_qntt') <= 0 && findproduct.get('stok_used_qntt') <= 0){
													findrecord.productStore.data.remove(findproduct);
												}
											});
										});
										store.sync({
											success : function(records, operation){
												var ms;
												if (results.inserted){
													ms = Ext.create( lister.getStore().model.modelName , record.data );
													lister.getStore().insert(0, ms);
													me.selectAction();
												} else {
													ms = lister.getStore().findRecord('invc_numb', record.get('invc_numb'));
													Ext.iterate(ms.data, function (key, value) {
														ms.set( key, record.get(key));
													});
												}
//												detail.getStore().loadData(record.product().data.items, false);
												detail.getStore().clearData();
												detail.getStore().loadData([],false);

												lister.getSelectionModel().select(ms);
												lister.getStore().commitChanges();

												me.pocket.layout().getLayout().setActiveItem(0);
												me.selectAction();
												results.feedback({success : true  });

											}, /* 저장 성공시 */
											failure : function(operation){ results.feedback({success : false });},
											callback: function(operation){
												results.callback({});
											}
										},{ chk : chk });
									}
								}
							});
						}
					});
				}
			});
		}
		return;
	},

	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
				Ext.ComponentQuery.query('module-purcordr-worker-search')[0].getForm().reset();
			}
		});
	},

	cancelAction2:function() {
		var me = this,
		editor = me.pocket.worker.editor2()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
			}
		});
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/mtrl/po/purcordr/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							upt_usr_nm	: _global.login_pk
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
						me.selectAction();
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
	},

	deleteAction2:function(){
		var me = this,
		master = me.pocket.lister.master(),
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;
		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					for (var i = 0; i < records.length; i++) {
						store.remove(records[i]);
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
				}
			}
		});
	},



	// 발주서 발행
	PrintAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport_hjsys2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if(_global.options.purc_ordr_rprt){
			jrf = 	_global.options.purc_ordr_rprt;
		}
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}
	},

	isttAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			records= me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","입고접수할 목록을 선택해주십시오.");
		}else if(select.data.line_clos != 0){
			Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
		}else{
			Ext.Msg.confirm("확인", "입고접수 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr/set/istt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select.get('invc_numb'),
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							Ext.Msg.alert("알림", "입고접수 처리가 완료 되었습니다.");
							me.pocket.lister.master().getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
							me.pocket.lister.detail().getStore().loadData([],false);
						}
					});
				}
			});
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},

	reportAction : function(button) {
		var me = this, lister = me.pocket.lister.master(),
			param = me.pocket.search().getValues(), store = lister.getStore()
		;
		var selModel = lister.getSelectionModel();
		var selected = selModel.getSelection();

		if(!selected[0]){
			return
		}

		Ext.widget('popup-report',{
			title	: '마감리포트',
			url		: _global.api_host_info + '/system/mtrl/po/purcordr/get/report.do',
			params	: { param :
				JSON.stringify({
					stor_grp	: _global.stor_grp,
					token		: _global.token_id,
					invc_numb	: selected[0].get('invc_numb')
				})
			}
		}, this);
	},

	reportDetail : function (button) {

		Ext.each(button.ownerCt.items.items, function( menu ) {
			if (menu.action === 'fax' && menu.checked === true ) {
				console.debug( 'fax' );
			}
			if (menu.action === 'sms' && menu.checked === true) {
				console.debug( 'sms' );
			}
			if (menu.action === 'email' && menu.checked === true ) {
				console.debug( 'email' );
			}
			if (menu.action === 'print' && menu.checked === true ) {
				console.debug( 'print' );
			}
		});
	} ,

	/**
	* 명세서 발행
	*/
	invReportAction:function(button) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(select.length === 0) {
			Ext.Msg.show({ title: '알림', msg: '입고번호를 선택해 주시기 바랍니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		} else
		if(select.length === 1) {
			// type1. 미리보기후 출력
			resource.loadPrint({
				preview			: true,                                 // 미리보기
				enableLoadMask	: true,                                 // mask 띄우기
				paperType		: Const.PaperType.A4_NORMAL,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
				invoiceType		: Const.InvoiceType.MOVE,               // 명세서 (필수)
				params			: { invc_numb : select[0].get('invc_numb'), use_fax : '0'  },
				previewParams	: { email : select[0].get('reve_email'), fax : select[0].get('reve_fax_no') },
				requrl			: {
				search			: _global.api_host_info + '/' + _global.app_site +'/mtrl/purcordr/get/printing.do',
				},

				callback		: function (success) {
					if(success) {
					}
				}
			});

		} else {
			var batch = Axt.util.Batch.getInstance();

			select.forEach( function(data) {
				batch.add(function(){
					// 출력 호출
					resource.loadPrint({
						preview		: false,
						invoiceType	: Const.InvoiceType.ESTI,  // 견적서 (필수)
						params		: { invc_numb : data.get('invc_numb') },
						requrl		: {
							search	: _global.api_host_info + '/' + _global.app_site +'/mtrl/po/purcordr/get/printing.do',
						},
						callback	: function (success, msg) {
							/* next()를 실행해줘야 순차적으로 실행된다. */
							batch.next();
						}
					});
				});
				console.debug(' length > 1 종료');
			});


			/* 여기서 출력 시작! */
			batch.run({
				enableLoadMask : true,
				maskMsg		: '출력중입니다... ($count/$total)',
				callback	: function () {
					Ext.Msg.alert('', '출력이 완료 되었습니다.');
				}
			});
		}
	}
});
