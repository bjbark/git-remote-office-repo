Ext.define('module.prod.order.otodwork.OtodWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ProrPopup'
	],

	models:[
		'module.prod.order.otodwork.model.OtodWorkInvoice',
		'module.prod.order.otodwork.model.OtodWorkMaster',
		'module.prod.order.otodwork.model.OtodWorkDetail'
	],
	stores:[
		'module.prod.order.otodwork.store.OtodWorkInvoice',
		'module.prod.order.otodwork.store.OtodWorkMaster',
		'module.prod.order.otodwork.store.OtodWorkDetail'
	],
	views : [
		'module.prod.order.otodwork.view.OtodWorkLayout',
		'module.prod.order.otodwork.view.OtodWorkPopup',
		/* 현황 */
		'module.prod.order.otodwork.view.OtodWorkSearch',
		'module.prod.order.otodwork.view.OtodWorkListerMaster',
		'module.prod.order.otodwork.view.OtodWorkListerDetail',
		/* 작업 */
		'module.prod.order.otodwork.view.OtodWorkWorkerEditor',
		'module.prod.order.otodwork.view.OtodWorkWorkerLister',
		'module.prod.order.otodwork.view.OtodWorkIsttPartPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-otodwork-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-otodwork-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-otodwork-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-otodwork-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */
			'module-otodwork-layout #mainpanel'									: { tabchange : me.mainTabChange },

			'module-otodwork-lister-master menuitem[action=closeAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-otodwork-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */

			'module-otodwork-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-otodwork-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-otodwork-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-otodwork-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-otodwork-lister-master button[action=isttAction]'			: { click : me.isttAction         }, /* 입고접수 */
			'module-otodwork-lister-master button[action=osttAction]'			: { click : me.osttAction         }, /* 자재출고 */

			'module-otodwork-lister-detail button[action=isttPartAction]'		: { click : me.isttPartAction     }, /* 입고접수 */
			'module-otodwork-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-otodwork-lister button[action=exportAction]'				: { click : me.exportListerlAction }, /* 엑셀 */

			'module-otodwork-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-otodwork-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */

			'module-otodwork-worker-editor button[action=selectAction3]'			: { click : me.selectAction3 }, /* 발주등록 조회 */

			'module-otodwork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-otodwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-otodwork-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-otodwork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-otodwork-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-otodwork-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-otodwork-lister-detail')[0] }
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
	selectAction3 : function(callbackFn){
		var me = this,
			editor = this.pocket.worker.editor(),
			workerlister = me.pocket.worker.lister(),
			search = me.pocket.search()
		;
		workerlister.getStore().clearData();
		workerlister.getStore().loadData([],false);
		editor.modifyRecord({
			caller	: me,
			action	: 'invoice',
			params	: {
				param:JSON.stringify({
					cstm_idcd		: search.getValues().cstm_idcd,
					drtr_idcd		: search.getValues().drtr_idcd,
					hq_id			: _global.hq_id,
					mes_type		: _global.options.mes_system_type
				})
			},
			lister	: workerlister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
			}
		});
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
		;

		if ( tindex == 1 ) {
			Ext.Msg.alert("알림","발주등록의 조회를 클릭 해 주십시오.");
		}else if(tindex == 0 ){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			listermaster = me.pocket.lister.master();

			listermaster.select({
				 callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, hq_id : _global.hq_id }));
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
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb'), hq_id : _global.hq_id,mes_type:_global.options.mes_system_type });
		}
	},




	selectAction2 : function(){
		var me = this,
			editor = this.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			param	= editor.getValues()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		editor.modifyRecord({
			caller	: me,
			action	: 'invoice',
			params	: {
				param:JSON.stringify({
					cstm_idcd		: editor.getValues().cstm_idcd,
					drtr_idcd		: editor.getValues().drtr_idcd
				})
			},
			lister	: lister,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true } );
				}
			}
		});
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
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister1.getStore().clearData();
		lister1.getStore().loadData([],false);
//		Ext.ComponentQuery.query('module-otodwork-search')[0].getForm().reset();

		editor.down('[name=drtr_idcd]').setValue(_global.login_id);
		editor.down('[name=drtr_name]').setValue(_global.login_nm);
		editor.down('[name=invc_date]').setValue(Ext.Date.format(new Date(), 'Y-m-d'));

		if(tindex == 0){
			listermaster.select({
				 callback:function(records, operation, success) {
					if (success) {
						listermaster.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp, hq_id : _global.hq_id }));
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
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		console.log(lister.getStore().getUpdatedRecords());
		if(changes != 0){
			for(i=0;i<lister.getStore().getUpdatedRecords().length;i++){
				if(lister.getStore().getUpdatedRecords()[i].data.deli_date == null || lister.getStore().getUpdatedRecords()[i].data.deli_date == ''){
					Ext.Msg.alert("알림","납기일자를 반드시 입력하여주십시오.");
					return;
				}else if(lister.getStore().getUpdatedRecords()[i].data.offr_qntt == null || lister.getStore().getUpdatedRecords()[i].data.offr_qntt == ''){
					Ext.Msg.alert("알림","발주수량을 반드시 입력하여주십시오.");
					return;
				}else if(lister.getStore().getUpdatedRecords()[i].data.offr_pric == null || lister.getStore().getUpdatedRecords()[i].data.offr_pric == ''){
					Ext.Msg.alert("알림","발주단가를 반드시 입력하여주십시오.");
					return;
				}else if(lister.getStore().getUpdatedRecords()[i].data.cstm_idcd == null || lister.getStore().getUpdatedRecords()[i].data.cstm_idcd == ''){
					Ext.Msg.alert("알림","거래처명을 반드시 입력하여주십시오.");
					return;
				}
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
						info.product().data.each( function( item ) {
							item.dirtyValue('new_invc_numb' , info.get('new_invc_numb') );
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
									ms = lister.getStore().findRecord('new_invc_numb', record.get('new_invc_numb'));
									Ext.iterate(ms.data, function (key, value) {
										ms.set( key, record.get(key));
									});
								}

								master.getSelectionModel().select(ms);
								master.getStore().commitChanges();
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
			store  = master.getStore(),
			err_msg = "",
			records = master.getSelectionModel().getSelection()
		;


		if (!records) {
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
				for(var i=0;i<records.length;i++){
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/prod/project/otodwork/set/delete.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: records[i].get('invc_numb'),
								updt_idcd	: _global.login_pk
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								for(var i=0;i<records.length;i++){
									store.remove(records[i]);
								}
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
			}
		});
	},

	isttAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			records= me.pocket.lister.master().getSelectionModel().getSelection(),
			chk=0
		;

		if(!select){
			Ext.Msg.alert("알림","입고접수할 목록을 선택해주십시오.");
		}else{
			for(var i=0;i<records.length;i++){
				if(records[i].get('line_clos') != 0){
					Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
					chk = 1;
				}else if( (_global.options.mes_system_type =='Frame' && typeof  records[i].get('mtrl_ostt_date') == 'undefined')){
					Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
					chk = 1;
				}
			}
		}

		if(chk == 0){
			Ext.Msg.confirm("확인", "입고접수 하시겠습니까?", function(button) {
				if (button == 'yes') {
					for(var i=0;i<records.length;i++){
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/prod/project/otodwork/set/istt.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: records[i].get('invc_numb'),
									stor_id		: _global.stor_id,
									hqof_idcd	: _global.hqof_idcd,
									mes_type	: _global.options.mes_system_type
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
				}
			});
		}
	},
	//부분입고
	isttPartAction:function() {
		var me = this,
			lister = me.pocket.lister.detail(),
			master = me.pocket.lister.master(),
			select = lister.getSelectionModel().getSelection()[0]
			selectMaster = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			if( (_global.options.mes_system_type =='Frame' && typeof  selectMaster.get('mtrl_ostt_date') == 'undefined')){
				Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
				return;
			}
			if(selectMaster.get('line_clos') == 1){
				Ext.Msg.alert("알림","이미 마감된 발주입니다.");
				return;
			}else{
				resource.loadPopup({
					widget  : 'module-otodwork-isttpart-popup',
					params  : {
						records : select
					},
					listeners: {
						close:function(){
						}
					}
				});
			}
		}
	},
	//자재출고
	osttAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			records= me.pocket.lister.master().getSelectionModel().getSelection()
			chk=0
		;

		if(!select){
			Ext.Msg.alert("알림","자재출고할 목록을 선택해주십시오.");
		}else{
			for(var i=0;i<records.length;i++){
				if(records[i].get('line_clos') != 0){
					Ext.Msg.alert("알림","자재출고할 수 없는 발주입니다.");
					chk = 1;
				}else if( (_global.options.mes_system_type =='Frame' && typeof  records[i].get('mtrl_ostt_date') != 'undefined')){
					Ext.Msg.alert("알림","이미 자재출고 된 발주입니다.");
					chk = 1;
				}
			}
		}

		if(chk == 0){
//		;
//		if(!select){
//			Ext.Msg.alert("알림","자재출고할 목록을 선택해주십시오.");
//		}else if(select.data.line_clos != 0){
//			Ext.Msg.alert("알림","자재출고할 수 없는 발주입니다.");
//		}else if(select.data.mtrl_ostt_date != undefined){
//			Ext.Msg.alert("알림","이미 자재출고 된 발주입니다.");
//		}else{
			resource.loadPopup({
				widget  : 'module-otodwork-popup',
				params  : {
					records : records
				},
				listeners: {
					close:function(){
					}
				}
			});
		}
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}

});
