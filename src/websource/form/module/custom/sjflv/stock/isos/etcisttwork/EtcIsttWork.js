Ext.define('module.custom.sjflv.stock.isos.etcisttwork.EtcIsttWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkInvoice',
		'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkMaster',
		'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkDetail',
		'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkLabelPopup',
		'module.custom.sjflv.stock.isos.etcisttwork.model.EtcIsttWorkRegiModel'
	],
	stores:[
		'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkInvoice',
		'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkMaster',
		'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkDetail',
		'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkLabelPopup',
		'module.custom.sjflv.stock.isos.etcisttwork.store.EtcIsttWorkRegiStore'
	],
	views : [
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkLayout',
		/* 현황 */
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkSearch',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkListerMaster',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkListerDetail',
		/* 작업 */
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerEditor',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerSearch',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerLister',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkWorkerLister',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkLabelPopup',
		/* 입고등록 */
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkRegiLister',
		'module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkRegiSearch'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-etcisttwork-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-etcisttwork-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */

			'module-etcisttwork-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-etcisttwork-lister-master menuitem[action=closecancleAction]'	: { click : me.closecancleAction  }, /* 마감해지 */

			'module-etcisttwork-lister-master button[action=etcPrintAction]'		: { click : me.invReportAction    }, /* 명세서 발행 */
			'module-etcisttwork-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-etcisttwork-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-etcisttwork-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-etcisttwork-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-etcisttwork-lister-detail button[action=labelAction]'			: { click : me.labelAction},		 /* 라벨발행 */
			'module-etcisttwork-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-etcisttwork-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-etcisttwork-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-etcisttwork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			/* 기타입고등록탭 */
			'module-etcisttwork-regi-search button[action=selectAction2]'			: { click : me.selectAction2 },		// 조회
			'module-etcisttwork-regi-lister button[action=updateAction]'			: { click : me.updateAction2 },
			'module-etcisttwork-regi-lister button[action=cancelAction]'			: { click : me.cancelAction2 },
			'module-etcisttwork-regi-lister button[action=exportAction]'			: { click : me.exportAction2 }
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-etcisttwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-etcisttwork-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-etcisttwork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-etcisttwork-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-etcisttwork-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-etcisttwork-lister-detail')[0] },
			regi    : function () { return Ext.ComponentQuery.query('module-etcisttwork-regi-lister')[0] }
		},
		labelpopup  : function () { return Ext.ComponentQuery.query('module-etcisttwork-label-popup')[0] },
		regisearch  : function () { return Ext.ComponentQuery.query('module-etcisttwork-regi-search')[0] }
	},
	
	selectAction2: function() {
		var me = this,
			lister = me.pocket.lister.regi(),
			search = me.pocket.regisearch(),
			param  = search.getValues();
			
		if(param.deli_date1>param.deli_date2 || param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","일자를 다시입력해 주십시오.");
		}else{
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}) );
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
				err_msg = "입고가 마감되어 수정할 수 없습니다.";
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

						if(_global.hq_id.toUpperCase() == 'N1000SJFLV') {
							editor.down('[name=stok_type_dvcd]').setReadOnly(false);
						}else{
							editor.down('[name=stok_type_dvcd]').setReadOnly(true);
						}
					}
				}
			}, me);
		}
	},
	
	/* v1 */
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
						table_nm: 'etit_mast'
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
							invc_date	: Ext.Date.format(new Date(), 'Y-m-d'),
							stok_type_dvcd	: '1'
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
								results.feedback({success : true , visible : true });

								if(_global.hq_id.toUpperCase() == 'N1000SJFLV') {
									editor.down('[name=stok_type_dvcd]').setReadOnly(false);
								}else{
									editor.down('[name=stok_type_dvcd]').setReadOnly(true);
								}
							}
						}
					});
				}
			}
		});
	},
	
	/*insertAction:function() {
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
						table_nm: 'etit_trst_mast'
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
							invc_date	: Ext.Date.format(new Date(), 'Y-m-d'),
							stok_type_dvcd	: '1'
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
								results.feedback({success : true , visible : true });

								if(_global.hq_id.toUpperCase() == 'N1000SJFLV') {
									editor.down('[name=stok_type_dvcd]').setReadOnly(false);
								}else{
									editor.down('[name=stok_type_dvcd]').setReadOnly(true);
								}
							}
						}
					});
				}
			}
		});
	},*/
	
	/* 입고등록 v1 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail()
		;



		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				for(var i=0;i<record.productStore.data.items.length;i++){
					var lott = record.productStore.data.items[i].data.lott_numb;
					if(lott == '' || lott == null){
						Ext.Msg.alert("알림", Language.get('lott_numb', 'Batch No') + "를 반드시 입력하여 주시기 바랍니다.");
						return;
					}
				}

				// 로트번호 중복체크
				var lottNumb    = "";
				var lottDupCont = 0;
				var lottDupNumb = "";

				for(var i=0;i<record.productStore.data.items.length;i++){
					var lott = record.productStore.data.items[i].data.lott_numb;
					if (lottNumb.match(lott + ",")) {
						lottDupCont++;
						if (!lottDupNumb.match(lott + ",")) {
							lottDupNumb += lott + ",";
						}
					} else {
						lottNumb += lott + ",";
					}
				}

				if (lottDupCont > 0) {
					Ext.Msg.alert('알림', lottDupCont + "건의 Batch No가 중복되었습니다.<p><p>" + lottDupNumb.slice(0, lottDupNumb.length - 1));
					return;
				}

				if (results.success) {
					var info	= record,
						qty		= 0,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						qty = qty + Math.abs(item.get('istt_qntt'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					info.set('qty'	, qty);
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
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
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
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-etcisttwork-worker-search')[0].getForm().reset();
			}
		});
	},

	/* 입고요청 */
	/*updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail()
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				for(var i=0;i<record.productStore.data.items.length;i++){
					var lott = record.productStore.data.items[i].data.lott_numb;
					if(lott == '' || lott == null){
						Ext.Msg.alert("알림", Language.get('lott_numb', 'Batch No') + "를 반드시 입력하여 주시기 바랍니다.");
						return;
					}
				}

				// 로트번호 중복체크
				var lottNumb    = "";
				var lottDupCont = 0;
				var lottDupNumb = "";

				for(var i=0;i<record.productStore.data.items.length;i++){
					var lott = record.productStore.data.items[i].data.lott_numb;
					if (lottNumb.match(lott + ",")) {
						lottDupCont++;
						if (!lottDupNumb.match(lott + ",")) {
							lottDupNumb += lott + ",";
						}
					} else {
						lottNumb += lott + ",";
					}
				}

				if (lottDupCont > 0) {
					Ext.Msg.alert('알림', lottDupCont + "건의 Batch No가 중복되었습니다.<p><p>" + lottDupNumb.slice(0, lottDupNumb.length - 1));
					return;
				}

				if (results.success) {
					var info	= record,
						qty		= 0,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						qty = qty + Math.abs(item.get('istt_qntt'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					info.set('qty'	, qty);
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
								//ms = Ext.create( master.getStore().model.modelName , record.data );
								//master.getStore().insert(0, ms);
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							//detail.getStore().loadData(record.product().data.items, false);
							//master.getSelectionModel().select(ms);
							//master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-etcisttwork-worker-search')[0].getForm().reset();
			}
		});
	},*/
	
	// 기타입고등록 저장
	updateAction2 : function() {
		var me = this,
			lister = me.pocket.lister.regi(),
			store = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		
		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			mask.show();
			store.sync({
				success : function(operation){
					store.reload();
				},
				failure : function(operation){
				},
				callback: function(operation){
					mask.hide();
				}
			});
		}
	},
	
	/* 입고등록 */
	/*updateAction2 : function() {
		var me = this,
			lister = me.pocket.lister.regi(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.regisearch(),
			values = search.getValues(),
			new_invc_numb = '',
			new_invc_numb2 = '',
			new_line_seqn
		;
		if(values.istt_wrhs_idcd==null || values.istt_wrhs_idcd ==''){
			Ext.Msg.alert('알림','입고창고를 선택해주세요.');
			return;
		}
		if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
			if(values.invc_date==null || values.invc_date ==''){
				Ext.Msg.alert('알림','입고일자를 선택해주세요.');
				return;
			}
		}

		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var x = 1;	//순번
			var msg = "";
			var arr = [];
			var new_invc = [];
			var lott_numb = "";

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
					if((record.get('lott_numb') == null || record.get('lott_numb') == "") && record.get('istt_qntt') > 0) {
						msg = "Batch No를 입력해주십시오.";
					}
				}

				if(record.get('istt_qntt') == null || record.get('istt_qntt')==''){
					if(record.get('lott_numb') != null && record.get('lott_numb') != ""){
						msg = "입고수량을 반드시 입력하십시오.";
					}else{
						record.dirty = false;
					}
				}
			})

			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			// 로트번호 중복 체크
			if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
				var lottNumb    = "";
				var lottDupCont = 0;
				var lottDupNumb = "";

				Ext.each(lister.getStore().getUpdatedRecords(),function(record){
					if((record.get('lott_numb') != null && record.get('lott_numb') != "") && record.get('istt_qntt') > 0) {
						if (lottNumb.match(record.get('lott_numb') + ",")) {
							lottDupCont++;
							if (!lottDupNumb.match(record.get('lott_numb') + ",")) {
								lottDupNumb += record.get('lott_numb') + ",";
							}
						} else {
							lottNumb += record.get('lott_numb') + ",";
						}
					}
				});

				if (lottDupCont > 0) {
					Ext.Msg.alert('알림', lottDupCont + "건의 Batch No가 중복되었습니다.<p><p>" + lottDupNumb.slice(0, lottDupNumb.length - 1));
					return;
				}
			}

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(arr.indexOf(record.get('invc_numb')) == -1){
					x = 1;
					arr.push(record.get('invc_numb'));
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm	: 'etit_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc.push(result.records[0].seq);
						}
					});

					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('invc_numb'))]);
					record.set('istt_wrhs_idcd',values.istt_wrhs_idcd);
					record.set('invc_date',values.invc_date);
					record.set('bzpl_idcd',values.bzpl_idcd);
					record.set('stok_type_dvcd', '1');
				}else{
					x++;
					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('invc_numb'))]);
					record.set('istt_wrhs_idcd',values.istt_wrhs_idcd);
					record.set('bzpl_idcd',values.bzpl_idcd);
					record.set('stok_type_dvcd', '1');
				}
			});
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
				lister.getStore().sync({
				success : function(operation){ store.reload(); },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
		}
	},*/
	
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
				Ext.ComponentQuery.query('module-etcisttwork-worker-search')[0].getForm().reset();
			}
		});
	},
	
	cancelAction2: function() {
		var store = this.pocket.lister.regi().getStore();
		
		store.rejectChanges();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/stock/etcisttwork/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							sts_cd		: records[0].get('sts_cd'),
							qty			: records[0].get('istt_qntt'),
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

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.lister.master().getSelectionModel().getSelection(),
			listermaster = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '1') {
					err_msg = "마감할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 입고 목록을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '1');
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/stock/etcisttwork/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1'
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

	//마감해지
	closecancleAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.lister.master().getSelectionModel().getSelection(),
			listermaster = me.pocket.lister.master()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') != '1') {
					err_msg = "마감 해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 입고내역을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '0');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/sjflv/stock/etcisttwork/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0'
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

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	
	exportAction2 : function(self) {
		this.pocket.lister.regi().writer({enableLoadMask:true});
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
			url		: _global.api_host_info + '/system/recv/etcisttwork/get/report.do',
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
				invoiceType 	: Const.InvoiceType.MOVE,               // 명세서 (필수)
				params			: { invc_numb : select[0].get('invc_numb'), use_fax : '0'  },
				previewParams	: { email : select[0].get('reve_email'), fax : select[0].get('reve_fax_no') },
				requrl 			: {
					search		: _global.api_host_info + '/' + _global.app_site +'/custom/sjflv/stock/etcisttwork/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/custom/sjflv/stock/etcisttwork/get/printing.do',
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

	},

	// 라벨발행
	labelAction:function() {
		var me = this,
			master  = me.pocket.lister.master().getSelectionModel().getSelection(),
			detail  = me.pocket.lister.detail(),
			records = me.pocket.lister.detail().getSelectionModel().getSelection(),
			jrf = 'sjflv_label.jrf',
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";

		if (!master || master.length < 1) {
			Ext.Msg.alert("알림", "입고현황을 선택해주십시오.");
			return;
		}

		/* 2024.02.16 - 이강훈 - 라벨발행 조건 삭제
		var cstm_dvcd  = master[0].data.cstm_dvcd;
        if (cstm_dvcd != '4') {
        	Ext.Msg.alert("알림", "입고처구분이 구매거래처인 현황을 선택해주십시오.");
        	return;
        }
        */

		if (!records || records.length == 0) {
			Ext.Msg.alert("알림", "라벨발행 품목을 선택해주십시오.");
		} else {
			var err_msg = "";
			Ext.each(records, function(record) {
				if ("3" == record.get("acct_bacd").substring(0, 1)) {
					err_msg = "제품은 라벨발행을 할 수 없습니다.";
					return;
				}
			});
			
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			resource.loadPopup({
				widget	: 'module-etcisttwork-label-popup',
				params:{
					records : records
				},
				result	: function(records) {
				},
			})
		}
	},

});
