Ext.define('module.mtrl.project.prjtpurcorder.PrjtPurcOrder', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PjodPopup'
	],

	models:[
		'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderInvoice',
		'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderMaster',
		'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderDetail',
		'module.mtrl.project.prjtpurcorder.model.PrjtPurcOrderLister'
	],
	stores:[
		'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderInvoice',
		'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderMaster',
		'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderDetail',
		'module.mtrl.project.prjtpurcorder.store.PrjtPurcOrderLister'
	],
	views : [
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderLayout',
		/* 현황 */
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderSearch',
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderListerMaster',
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderListerDetail',
		/* 작업 */
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderWorkerEditor',
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderWorkerLister',
		/* BOM */
		'module.mtrl.project.prjtpurcorder.view.PrjtPurcOrderLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-prjtpurcorder-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-prjtpurcorder-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-prjtpurcorder-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prjtpurcorder-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */
			'module-prjtpurcorder-layout #mainpanel'								: { tabchange : me.mainTabChange },

			'module-prjtpurcorder-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-prjtpurcorder-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */

			'module-prjtpurcorder-lister-master button[action=insertAction]'		: { click : me.insertAction       }, /* 등록 */
			'module-prjtpurcorder-lister-master button[action=modifyAction]'		: { click : me.modifyAction       }, /* 수정 */
			'module-prjtpurcorder-lister-master button[action=exportAction]'		: { click : me.exportAction       }, /* 엑셀 */
			'module-prjtpurcorder-lister-master button[action=deleteAction]'		: { click : me.deleteAction       }, /* 삭제 */
			'module-prjtpurcorder-lister-master button[action=isttAction]'			: { click : me.isttAction         }, /* 입고접수 */

			'module-prjtpurcorder-lister-detail button[action=exportAction]'		: { click : me.exportDetailAction }, /* 엑셀 */

			'module-prjtpurcorder-lister button[action=exportAction]'				: { click : me.exportListerlAction }, /* 엑셀 */

			'module-prjtpurcorder-worker-lister button[action=updateAction]'		: { click : me.updateAction }, /* 저장 */
			'module-prjtpurcorder-worker-lister button[action=cancelAction]'		: { click : me.cancelAction }, /* 취소 */
			'module-prjtpurcorder-worker-search button[action=selectAction2]'		: { click : me.selectAction2},	/*조회*/

			'module-prjtpurcorder-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-search')[0] },
		lister1 : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-lister')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-prjtpurcorder-lister-detail')[0] }
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
			editor = this.pocket.worker.editor(),
			workerlister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			lister = undefined,
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues(),
			listermaster = me.pocket.lister.master()
			lister = me.pocket.lister1()
		;

		if ( tindex == 1 ) {
			if(param.pjod_idcd==''){
				Ext.Msg.alert("알림","발주등록시 "+Language.get('acpt_case_name', '금형명')+"을 반드시 입력해주십시오.");
			}else if(me.pocket.worker.editor().getValues().cstm_idcd==''){
				Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
			}else{
				workerlister.getStore().clearData();
				workerlister.getStore().loadData([],false);

				var cstm_idcd = me.pocket.worker.editor().getValues().cstm_idcd;
				var cstm_name = me.pocket.worker.editor().getValues().cstm_name;
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {
						param:JSON.stringify({
							pjod_idcd		: me.pocket.search().getValues().pjod_idcd,
						})
					},
					lister	: workerlister,
					callback: function( results ) {
						if (results.success){
							results.feedback( {success : true } );
						}
						editor.down('[name=cstm_idcd]').setValue(cstm_idcd);
						editor.down('[name=cstm_name]').setValue(cstm_name);
						editor.down('[name=drtr_idcd]').setValue(_global.login_id);
						editor.down('[name=drtr_name]').setValue(_global.login_nm);
					}
				});
			}
		}
		else if(tindex == 0 ){
			lister = listermaster;
		}else if(tindex == 2){
			lister == lister
		}
		if(tindex != 1 && lister != undefined ){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			listermaster = me.pocket.lister.master()
			lister = me.pocket.lister1()

			listermaster.select({
				 callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail()
		;
		console.log(record.get('invc_numb'));
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
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
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
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

	insertAction:function() {
		var me		= this,
			worker = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())

		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			lister1		= me.pocket.worker.lister(),
			search		= me.pocket.search(),
			param		= search.getValues(),
			editor		= me.pocket.worker.editor(),
			tindex		= tabPanel.items.indexOf(newCard),
			listermaster = me.pocket.lister.master()
			lister = me.pocket.lister1()
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister1.getStore().clearData();
		lister1.getStore().loadData([],false);
//		Ext.ComponentQuery.query('module-prjtpurcorder-search')[0].getForm().reset();

		editor.down('[name=drtr_idcd]').setValue(_global.login_id);
		editor.down('[name=drtr_name]').setValue(_global.login_nm);
		editor.down('[name=invc_date]').setValue(Ext.Date.format(new Date(), 'Y-m-d'));

		if(tindex == 0){
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 2){
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},

	updateAction:function() {
		var me = this,
		editor = me.pocket.worker.editor(),
		lister = me.pocket.worker.lister(),
		master = me.pocket.lister.master(),
		store  = editor.getStore(),
		changes = lister.getStore().getUpdatedRecords().length,
		new_line_seqn,
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
		total_ttsm_amnt = editor.down('[name=total_ttsm_amnt]').getValue(),
		n = 0
	;
	if(changes != 0){
		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.offr_qntt == 0){
				n = 1;
				break;
			}
		}

		if(n == 1){
			Ext.Msg.alert("알림","수량을 입력하여 주십시오.");
			return;
		}

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'purc_ordr_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				editor.down('[name=new_invc_numb]').setValue(result.records[0].seq);
			}
		});
		var x = 1;	//순번
		for (var a = 0; a < changes; a++) {
			lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
		}
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					record.productStore.data.items = lister.getStore().getUpdatedRecords();
					var product = new Array();
					for(var i=0;i<changes;i++) {
						product.push(lister.getStore().getUpdatedRecords()[i].data);
					}
					record.raw.product = product;
					var info	= record,
						dirty	= false
					;
					info.dirtyValue('user_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('pjod_idcd', info.get('pjod_idcd'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					if (dirty) {
						info.setDirty();
					}
					results.feedback({success : true  });
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( lister.getStore().model.modelName , record.data );
								lister.getStore().insert(0, ms);
							} else {
								ms = lister.getStore().findRecord('pjod_idcd', record.get('pjod_idcd'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							tpanel.items.indexOf(tpanel.setActiveTab(0));
							master.getStore().load();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){results.callback({});
						}
					});
				}
			}
		});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	cancelAction:function() {
		var me = this,
		editor = me.pocket.worker.editor(),
		lister = me.pocket.worker.lister(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
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
					url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/project/prjtpurcorder/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							qty			: records[0].get('offr_qntt'),
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
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
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
						url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/project/prjtpurcorder/set/istt.do',
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
	exportListerAction : function(self) {
		this.pocket.lister1().writer({enableLoadMask:true});
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
			url		: _global.api_host_info + '/system/mtrl/project/prjtpurcorder/get/report.do',
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

});
