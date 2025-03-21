Ext.define('module.custom.sjflv.sale.export.ordermast2.OrderMast2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'lookup.upload.FileUpload',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.WkfwPopup'
	],

	models:[
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Invoice',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2InvoiceMaster',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2InvoiceDetail',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Master',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Cost',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2File',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2Payment',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2PackingPopup',
		'module.custom.sjflv.sale.export.ordermast2.model.OrderMast2NegoPopup',
	],
	stores:[
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Invoice',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Master',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Cost',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2File',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2Payment',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2PackingPopup',
		'module.custom.sjflv.sale.export.ordermast2.store.OrderMast2NegoPopup',
	],
	views : [
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2Layout',
		/* 현황 */
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2Search',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2ListerMaster',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2Editor',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2ListerPayment',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2ListerCost',
		/* 작업 */
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerEditor',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerSearch',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2WorkerLister',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2FileLister',

		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2NegoPopup',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2PackingPopup',
		'module.custom.sjflv.sale.export.ordermast2.view.OrderMast2SkedPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sjflv-export-ordermast2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sjflv-export-ordermast2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sjflv-export-ordermast2-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-export-ordermast2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */

			'module-sjflv-export-ordermast2-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-sjflv-export-ordermast2-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-sjflv-export-ordermast2-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-sjflv-export-ordermast2-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-sjflv-export-ordermast2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-sjflv-export-ordermast2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */

			'module-sjflv-export-ordermast2-lister-master button[action=negopopupAction]'		: { click : me.negopopupAction    }, /* Nego등록 */
			'module-sjflv-export-ordermast2-lister-master button[action=invoiceAction]'			: { click : me.invoiceAction      }, /* Invoice 등록 */
			'module-sjflv-export-ordermast2-lister-master button[action=skedAction]'			: { click : me.skedAction         }, /* 일정등록     */
			'module-sjflv-export-ordermast2-lister-master button[action=packingAction]'			: { click : me.packingAction      }, /* paking list 등록 */
			'module-sjflv-export-ordermast2-lister-master button[action=orderAction]'			: { click : me.orderAction        }, /* 주문오더 등록 */

			'module-sjflv-export-ordermast2-lister-master button[action=invoicePrint]'			: { click : me.printAction      }, /* invoicePrint */
			'module-sjflv-export-ordermast2-lister-master button[action=packingPrint]'			: { click : me.printAction      }, /* invoicePrint */


			'module-sjflv-export-ordermast2-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-sjflv-export-ordermast2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-sjflv-export-ordermast2-worker-search button[action=inputAction]'			: { click : me.itemInputAction }, /* 취소 */

			'module-sjflv-export-ordermast2-editor button[action=updateAction]'					: { click : me.updateAction2 }, /* editor저장 */
			'module-sjflv-export-ordermast2-editor button[action=cancelAction]'					: { click : me.cancelAction2 }, /* editor취소 */
			'module-sjflv-export-ordermast2-lister-master' : {
				selectionchange : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-editor')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-search')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-master')[0] },
			cost    : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-cost')[0] },
			payment : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-lister-payment')[0] },
			file    : function () { return Ext.ComponentQuery.query('module-sjflv-export-ordermast2-filelister')[0] }
		},
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
					err_msg = "이미 마감되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
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
										table			: 'acpt_mast'
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
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
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
										table			: 'acpt_mast'
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
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
//					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	selectDetail : function(grid, record) {
		var me		= this,
			file	= me.pocket.lister.file(),
			cost	= me.pocket.lister.cost(),
			payment	= me.pocket.lister.payment(),
			editor	= me.pocket.editor(),
			invc_numb2  = editor.down('[name=ordr_numb]').getValue();

		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			editor.selectRecord({lister : grid , record : record[0]},me);
			if(record[0].get('ogin_name')==""){
				editor.down('[name=ogin_name]').setValue('korea');
			}
			editor.down('[name=cstm_pcod_numb]').setReadOnly(record[0].get('cofm_yorn'));

			file.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('ordr_numb'),orgn_dvcd : 'expt_offr_item'});

			cost.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('ordr_numb')});

			payment.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('ordr_numb'),orgn_dvcd : 'expt_offr_item',line_seqn: '0'});
			file.down('[name=file]').popup.params.invc_numb = record[0].get('ordr_numb');
//			file.down('[name=file]').popup.params.invc_numb = record[0].get('ordr_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
//			file.down('[name=file]').popup.params.line_seqn = record[0].get('line_seqn');
			cost.down('[name=paym_cstm_name]').setValue(record[0].get('paym_cstm_name')?record[0].get('paym_cstm_name'):'');
			cost.down('[name=paym_date]').setValue(record[0].get('paym_date')?record[0].get('paym_date'):'');
			mask.hide();
		}
	},

	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			search = me.pocket.worker.search(),
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;
			var err_msg = "";
			if (select){
				if (select.get("line_clos") == "1") {
					err_msg = "마감된 오더입니다.";
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
					params	: {param:JSON.stringify({ invc_numb : select.get('ordr_numb') })},
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
			editor	= me.pocket.worker.editor(),
			search	= me.pocket.worker.search(),
			lister	= me.pocket.worker.lister(),
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		search.getForm().reset();
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
						table_nm: 'expt_ordr_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					var exchange = 0;
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/sjflv/eis/sjdashboard/get/exchange.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								_set : 'undefinded'
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
								exchange = result.records[0].basePrice;
							}
						},
						failure : function(result, request) {
							Ext.Msg.error(result.mesage);
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
//							invc_numb	: keygen.records[0].seq,
							mney_unit	: '2000',
							exrt		: exchange
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

	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			store	= master.getStore(),
			store3	= lister.getStore(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.invc_qntt == 0){
							store3.remove(item);
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
							var ms
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {
							}
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
							me.selectAction();
							Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-search')[0].getForm().reset();
						}
					});
				}
			}
		});
	},
	updateAction2:function() {
		var me		= this,
			editor	= me.pocket.editor(),
			master	= me.pocket.lister.master(),
			cost	= me.pocket.lister.cost(),
			payment	= me.pocket.lister.payment(),
			store	= master.getStore(),
			select	= master.getSelectionModel().getSelection()[0]
		;
		if(select){
			var	paym_cstm_name = cost.down('[name=paym_cstm_name]').getValue(),
				paym_date = Ext.Date.format(cost.down('[name=paym_date]').getValue(),'Ymd')
			;
			cost.getStore().each(function(record){
				if(record.get('krwn_amnt')>0){
					if(select.get('paym_cstm_name')!=paym_cstm_name){
						record.set('paym_cstm_name',paym_cstm_name);
					}
					if(paym_date){
						record.set('paym_date',paym_date);
					}
				}
			});
			editor.updateRecord({
				store  : store,
				action : Const.EDITOR.DEFAULT,
				callback : function(results, record ) {
					if (results.success) {
						store.sync({
							success : function(operation){ results.feedback({success : true  });},
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){ results.callback({}); }
						} );
					}
				},
				finished : function(results, record, operation){
					if (results.success){


//						cost.getStore().sync();

						payment.getStore().sync();

//						me.selectAction();
					}
				}
			});
		}
	},
	skedAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-sked-popup',
				params : {
					ordr_numb		: select.get('ordr_numb'),
					ostt_schd_date	: select.get('ostt_schd_date'),
					etdd			: select.get('etdd'),
					etaa			: select.get('etaa'),
					cofm_yorn		: select.get('cofm_yorn'),
					item_idcd		: select.get('item_idcd')
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},
	packingAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-packing-popup',
				params :	{
					invc_numb		: select.get('ordr_numb'),
					pckg_unit		: select.get('pckg_unit'),
					pckg_totl_wigt	: select.get('pckg_totl_wigt'),
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	negopopupAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-nego-popup',
				params :	{
					invc_numb	: select.get('ordr_numb')
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	//오더등록
	orderAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		select = master.getSelectionModel().getSelection()[0]
		record	= master.getSelectionModel().getSelection();
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		var acpt_numb;

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 오더입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}


		if(!records || records.length < 1) {
			Ext.Msg.alert("알림","주문 Order로  등록할 항목을 선택해주십시오.");
			return;
		}else{
			var ostt_schd_date = records[0].get('ostt_schd_date');
			if (ostt_schd_date == undefined) {
				Ext.Msg.alert("알림", "공장픽업일이 입력되지 않았습니다.");
				return;
			}
			var msg = "주문 Order를 등록 하시겠습니까?";
			var cofm_yorn = records[0].get('cofm_yorn');
			if (cofm_yorn == '1') {
				msg = "주문 Order가 등록되어 있습니다. 주문 Order를 변경하시겠습니까?";
				acpt_numb = "1";
			} else  {
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'acpt_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						acpt_numb = result.records[0].seq;
					}
				});
			}

			Ext.Msg.confirm("확인", msg, function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/sjflv/sale/export/ordermast2/set/order.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select.get('ordr_numb'),
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd,
								acpt_numb 	: acpt_numb
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							Ext.Msg.alert("알림", "오더 등록이 완료 되었습니다.");
							master.getStore().reload();
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
								var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
								mask.show();
								master.select({
									 callback : function(records, operation, success) {
										if (success) {
										} else {}
										mask.hide();
									}, scope : me
								});
								me.hide();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
						}
					});
				}
			});
		}
	},



	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
				Ext.ComponentQuery.query('module-sjflv-export-ordermast2-worker-search')[0].getForm().reset();
			}
		});

		//취소시 거래처 파라미터 삭제
		search.down('[name=item_code]').popup.params.cstm_idcd = undefined;
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			editor = me.pocket.editor(),
			store  = master.getStore(),
			err_msg = "",
			records = master.getSelectionModel().getSelection(),
			select	= master.getSelectionModel().getSelection()[0]
		;

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


		if(select){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/export/ordermast2/get/order.do',
				method		: "POST",
				async	: false,
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: select.get('ordr_numb'),
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						cofm_yorn = result.records[0].cofm_yorn;
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
			if(cofm_yorn == 0){
				editor.deleteRecord({
					lister		: me.pocket.lister.master(),
					callback	: function(results, record, store) {
						store.sync({
							success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
							failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
							callback: function(operation){ results.callback({}); store.reload(); } // 성공 실패 관계 없이 호출된다.
						});
					}
				}, me);
			}else{
				Ext.Msg.alert('알림','주문오더가 등록되어 삭제할 수 없습니다.');
				return;
			}
		}
	},

	cancelAction2:function(){
		var	me		= this,
			lister	= me.pocket.lister.master(),
			select	= lister.getSelectionModel().getSelection()[0],
			editor	= me.pocket.editor(),
			cost	= me.pocket.lister.cost(),
			payment	= me.pocket.lister.payment(),
			file	= me.pocket.lister.file()
		;
		editor.selectRecord({lister : lister , record : select},me);
		cost.getStore().reload();
		payment.getStore().reload();
		file.getStore().reload();
	},
	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},
	printAction:function(cont){
		var	me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			resId	= _global.hq_id.toUpperCase(),
			jrf    = 'sjflv_commercial_invoice.jrf'
		;
		if(cont.itemId == 'packing'){
			jrf = 'sjflv_packing_list.jrf';
		}
		var a = "";
		if(record.length > 0 ){
			for(var i =0; i< record.length ; i++){
				a+= record[i].get('ordr_numb');
				if(record.length>1 && i != record.length -1){
					a+=",";
				}
			}
			var _param = 'invc_numb~'+a+'~';
			var arg = _param ;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'Print','width=1400,height=800');
			return win;
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

});
