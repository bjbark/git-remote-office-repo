Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.OrderMast2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.BzplPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.CstmDeliPopup',
	],

	models:[
		'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Invoice',
		'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Master',
		'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2Detail',
		'module.custom.sjflv.mtrl.imp.ordermast2.model.OrderMast2File',
	],
	stores:[
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Invoice',
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Master',
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Detail',
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Detail2',
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Detail3',
		'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2SplyInsertPopup',
	],
	views : [
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2Layout',
		/* 현황 */
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2Search',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ListerMaster',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ListerDetail',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ListerDetail2',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ListerDetail3',
		/* 작업 */
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerEditor',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerSearch',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerLister',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2PaymentPopup',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2InvoicePopup',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2ConfirmPopup',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2DatePopup',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2PrintPopup',
		'module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2SplyInsertPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-ordermast2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-ordermast2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-ordermast2-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-ordermast2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */

			'module-ordermast2-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-ordermast2-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-ordermast2-lister-master button[action=amendAction]'			: { click : me.amendAction        }, /* Amend차수증가 */
			'module-ordermast2-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-ordermast2-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-ordermast2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-ordermast2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-ordermast2-lister-master button[action=paymentAction]'			: { click : me.paymentAction      }, /* payment등록 */
			'module-ordermast2-lister-master button[action=invoiceAction]'			: { click : me.invoiceAction      }, /* invoice등록 */
			'module-ordermast2-lister-master menuitem[action=confirmAction]'		: { click : me.confirmAction      }, /* 확정 */
			'module-ordermast2-lister-master menuitem[action=confirmCancelAction]'	: { click : me.confirmCancelAction}, /* 확정취소 */
			'module-ordermast2-lister-master button[action=dateAction]'				: { click : me.dateAction         }, /* 선적일정등록 */
			'module-ordermast2-lister-master button[action=printAction]'			: { click : me.printAction        }, /* 수입견적서발행 */
			'module-ordermast2-lister-master button[action=splyinsertAction]'		: { click : me.splyinsertAction   }, /* 공급가등록 */
			'module-ordermast2-lister-detail button[action=fileAction]'				: { click : me.fileAction         }, /* 선적서류업로드 */
			'module-ordermast2-lister-detail2 button[action=fileAction2]'			: { click : me.fileAction2        }, /* 입고서류업로드 */
			'module-ordermast2-lister-master button[action=sheetPrint]'				: { click : me.sheetPrint         }, /* sheetPrint */
			'module-ordermast2-lister-master button[action=offerPrint]'				: { click : me.offerPrint         }, /* offerPrint  */



			'module-ordermast2-lister-detail button[action=deleteAction]'			: { click : me.deleteAction2      }, /* 삭제 */
			'module-ordermast2-lister-detail2 button[action=deleteAction]'			: { click : me.deleteAction3      }, /* 삭제 */

			'module-ordermast2-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-ordermast2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-ordermast2-lister-master' : {
				selectionchange : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-ordermast2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-ordermast2-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-ordermast2-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-ordermast2-worker-search')[0] }
		},

		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-ordermast2-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-ordermast2-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-ordermast2-lister-detail2')[0] },
			detail3 : function () { return Ext.ComponentQuery.query('module-ordermast2-lister-detail3')[0] }
		},
	},




	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor(),
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
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		detail3.getStore().clearData();
		detail3.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3()
		;
		if (record.length > 0) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('ordr_numb'),line_seqn : record[0].get('amnd_degr') , orgn_dvcd : 'impt_ordr_item' });
			detail2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('ordr_numb'),line_seqn : record[0].get('amnd_degr') , orgn_dvcd : 'impt_istt_file' });
			detail3.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record[0].get('ordr_numb'),line_seqn : record[0].get('amnd_degr') , orgn_dvcd : 'impt_colt_file' });
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
				if(select.get('cofm_yorn') == "1"){
					lister.down('[itemId=insert]').hide();
					lister.down('[itemId=delete]').hide();
				}else{
					lister.down('[itemId=insert]').show();
					lister.down('[itemId=delete]').show();
				}

				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

			if(_global.hq_id.toUpperCase() == 'N1000SJUNG'){
				lister.down('[itemId=insert]').hide();
			}

			editor.down('[name=invc_numb]').setReadOnly(true);

			if (select){
				editor.modifyRecord({
					caller	: me,
					action	: 'invoice',
					params	: {param:JSON.stringify({ invc_numb : select.get('ordr_numb'),amnd_degr : select.get('amnd_degr') })},
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

	paymentAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			paym_memo = "";
		;
		if(select){
			paym_memo = select.get('paym_memo');
			if (paym_memo == null || paym_memo == "") {
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/get/paymMemo.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							cstm_idcd	: select.get('cstm_idcd'),
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if	(result.success){
							paym_memo = result.records[0].paym_memo;
						} else {
						};
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			resource.loadPopup({
				widget : 'module-ordermast2-payment-popup',
				params : {"paym_yorn" : select.get('paym_yorn'),
					      "paym_date" : select.get('paym_date'),
					      "paym_numb" : select.get('paym_numb'),
					      "paym_send_ddln" : select.get('paym_send_ddln'),
					      "paym_memo" : paym_memo,
					      "ordr_numb" : select.get('ordr_numb'),
					      "amnd_degr" : select.get('amnd_degr')
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	invoiceAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-invoice-popup',
				params : select
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	amendAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			msg		= ""
		;
		if(select.length > 0){
			if(select.length==1){
				Ext.each(select,function(record){
					if(record.get('line_clos')==1){
						msg = "마감된 Order 입니다.";
					}else if(record.get('cofm_yorn') == "1"){
						msg = "확정처리된 Order 입니다.";
					}
				})
				if(msg!=""){
					Ext.Msg.alert('알림',msg);
					return;
				}
				Ext.Ajax.request({
					url		: _global.location.http() + '//custom/sjflv/mtrl/imp/ordermast2/set/amend.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							invc_numb		: select[0].get('ordr_numb'),
							amnd_degr		: select[0].get('amnd_degr'),
							crte_idcd		: _global.login_pk
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
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						master.getStore().reload();
					}
				});
			}else{
				Ext.Msg.alert('알림','하나의 Order를 선택해주세요.')
			}
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	confirmAction:function() {
		var me		= this,
			master	= me.pocket.lister.master(),
			select	= master.getSelectionModel().getSelection(),
			msg		= ""
		;
		if(select[0]){
			Ext.each(select,function(record){
				if(record.get('line_clos')==1){
					msg = "마감된 Order 입니다.";
				}else if(record.get('cofm_yorn') == "1"){
					msg = "이미 확정처리된 Order 입니다.";
				}
			})
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}
			resource.loadPopup({
				widget : 'module-ordermast2-confirm-popup',
				params :  select
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	confirmCancelAction:function() {
		var me		= this,
			master	= me.pocket.lister.master(),
			select	= master.getSelectionModel().getSelection(),
			msg		= "",
			ordr_chk = '1'
		;

		if(select.length == 1){
			Ext.each(select,function(record){
				if(record.get('line_clos')==1){
					msg = "마감된 Order 입니다.";
				}else if(record.get('cofm_yorn') == "0"){
					msg = "Order가 확정되지 않았습니다.";
				}
			})
			if(msg != ""){
				Ext.Msg.alert('알림',msg);
				return;
			}else{
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/sjflv/mtrl/imp/ordermast2/set/confirmCancel.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							invc_numb		: select[0].get('ordr_numb'),
							amnd_degr		: select[0].get('amnd_degr'),
							crte_idcd		: _global.login_pk
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
						Ext.Msg.error(result.mesage);
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						master.getStore().reload();
					}
				});
			}
		}else{
			Ext.Msg.alert('알림','Order를 한개 선택해주세요.')
		}
	},

	dateAction:function() {
		var me		= this,
			master	= me.pocket.lister.master(),
			select	= master.getSelectionModel().getSelection(),
			records	= master.getSelectionModel().getSelection()[0],
			msg		= ""
		;
		if(select[0]){
			Ext.each(select,function(record){
				if(record.get('line_clos')==1){
					msg = "마감된 Order 입니다.";
				}else if(record.get('cofm_yorn') == "1"){
					msg = "이미 확정처리된 Order 입니다.";
				}
			})
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}
			resource.loadPopup({
				widget : 'module-ordermast2-date-popup',
				params :
				{
					etdd	: records.get('etdd'),
					etaa	: records.get('etaa'),
					ecdd	: records.get('ecdd'),
					ordr_numb	: records.get('ordr_numb')
				},

			});

		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},


	printAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-print-popup',
				params : select
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},


	splyinsertAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-ordermast2-sply-insert-popup',
				params :	{
					invc_numb		: select.get('ordr_numb'),
					amnd_degr		: select.get('amnd_degr')
				}
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	fileAction:function(){
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'lookup-board-upload',
				params:{
					invc_numb : select.get('ordr_numb'),
					line_seqn : select.get('amnd_degr'),
					orgn_dvcd : 'impt_ordr_item',
				},
				result : function(records, nameField, pairField) {
					detail.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert('알림','선적서류를 등록할 Order을 선택해주세요.');
		}

	},

	fileAction2:function(){
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail2(),
			select = master.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'lookup-board-upload',
				params:{
					invc_numb : select.get('ordr_numb'),
					line_seqn : select.get('amnd_degr'),
					orgn_dvcd : 'impt_istt_file',
				},
				result : function(records, nameField, pairField) {
					detail.getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert('알림','입고서류를 등록할 Order을 선택해주세요.');
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

		editor.down('[name=invc_numb]').setReadOnly(false);

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
					var exchange = 0;
//					Ext.Ajax.request({
//						url		: _global.location.http() + '/custom/sjflv/eis/sjdashboard/get/exchange.do',
//						params	: {
//							token : _global.token_id,
//							param : JSON.stringify({
//								_set : 'undefinded'
//							})
//						},
//						async	: false,
//						method	: 'POST',
//						success	: function(response, request) {
//
//							var result = Ext.decode(response.responseText);
//							console.log(result);
//							if	(!result.success ){
//								Ext.Msg.error(result.message );
//								return;
//							} else {
//								exchange = result.records[0].basePrice;
//							}
//						},
//						failure : function(result, request) {
//							Ext.Msg.error(result.mesage);
//						},
//						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//						}
//					});
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: '-'+keygen.records[0].seq,
							offr_numb	: keygen.records[0].seq,
							drtr_name	: _global.login_nm,
							drtr_idcd	: _global.login_id,
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
			detail = me.pocket.lister.detail(),
			store	= master.getStore(),
			store3	= lister.getStore(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()
		;

		var err_msg = "";
		store3.each( function( item ) {
			if (item.data.qntt == 0) {
				err_msg = "수량이 0인 품목이 있습니다. 확인 후 저장 바랍니다.";
				return;
			}
		});

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.dirtyValue('sysm_memo', Ext.Date.format(new Date(),'YmdHis'));
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.qntt == 0){
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
							me.pocket.layout().getLayout().setActiveItem(0);

							master.getStore().reload();

							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
						}
					});
				}
			}
		});
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
					search.getForm().reset();
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
			}
		});

		//취소시 거래처 파라미터 삭제
		search.down('[name=item_code]').popup.params.cstm_idcd = undefined;
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		console.log(records);
		if (records.length>0) {

			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}else if(record.get('cofm_yorn') == "1") {
					err_msg = "확정된 Order는 삭제할 수 없습니다.";
				}
				if (_global.hq_id.toUpperCase() == 'N1000SJFLV') {
					if(record.get('amnd_degr')==1 ){
						err_msg = "차수가 1 인 Order는 삭제할 수 없습니다.";
					}
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {

					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					Ext.each(records,function(record){
						store.remove(record);
					});
					store.sync({
						callback:function(){
							store.reload();
						}
					});
					mask.hide();
				}
			});
		}
	},

	deleteAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			select = detail.getSelectionModel().getSelection(),
			store  = detail.getStore()
		;
		if(select.length > 0){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < select.length; i++) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/upload/get/fileDelete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									file_name		: select[i].get('file_name'),
									orgn_dvcd		: "impt_ordr_item",
									invc_numb		: select[i].get('invc_numb'),
									line_seqn		: select[i].get('line_seqn'),
									assi_seqn		: select[i].get('assi_seqn')
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
								Ext.Msg.error(result.mesage);
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
					store.reload();
					mask.hide();
				}
			});
		}
	},

	deleteAction3:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail2(),
			select = detail.getSelectionModel().getSelection(),
			store  = detail.getStore()
		;
		if(select.length > 0){
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					for (var i = 0; i < select.length; i++) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/upload/get/fileDelete.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									file_name		: select[i].get('file_name'),
									orgn_dvcd		: "impt_istt_file",
									invc_numb		: select[i].get('invc_numb'),
									line_seqn		: select[i].get('line_seqn'),
									assi_seqn		: select[i].get('assi_seqn')
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
								Ext.Msg.error(result.mesage);
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
					store.reload();
					mask.hide();
				}
			});
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
										invc_numb		: record.get('ordr_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'impt_ordr_mast'
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
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()
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
										invc_numb		: record.get('ordr_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'impt_ordr_mast'
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
										master.getStore().reload();
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
	sheetPrint:function(){
		var	me = this,
		master = me.pocket.lister.master(),
		record = master.getSelectionModel().getSelection(),
		resId	= _global.hq_id.toUpperCase(),
		jrf    = 'sjflv_order_sheet.jrf'
			;
		var a = "";

		if(resId == 'N1000SJUNG'){
			var a = "",
			jrf = 'sjung_order_sheet.jrf',
			resId	= _global.hq_id.toUpperCase()
			;

			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
				a+= '{\'invc_numb\':\''+record[i].get('ordr_numb')+'\', \'amnd_degr\':'+record[i].get('amnd_degr')+'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param ;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'Print','width=1400,height=800');
			return win;
		}


		if(record.length > 0 ){
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
				a+= '{\'invc_numb\':\''+record[i].get('ordr_numb')+'\', \'amnd_degr\':'+record[i].get('amnd_degr')+'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param ;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'Print','width=1400,height=800');
			return win;
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	offerPrint:function(){
		var	me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			resId	= _global.hq_id.toUpperCase(),
			jrf    = 'sjflv_firm_offer.jrf'
		;

		if(resId == 'N1000SJUNG'){
			var a = "",
			jrf = 'sjung_firm_offer.jrf',
			resId	= _global.hq_id.toUpperCase()
			;

			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('ordr_numb')+'\', \'amnd_degr\':'+record[i].get('amnd_degr')+'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param ;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'Print','width=1400,height=800');
			return win;
		}

		if(record.length > 0 ){
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('ordr_numb')+'\', \'amnd_degr\':'+record[i].get('amnd_degr')+'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'records\':'+a+'}~';
			var arg = _param ;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'Print','width=1400,height=800');
			return win;
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},
	//엑셀
	exportAction : function(){
		this.pocket.lister.master().writer({enableLoadMask:true});
	}

});
