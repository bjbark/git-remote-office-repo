
Ext.define('module.stock.isos.prodosttwork.ProdOsttWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.ProrPopup',
		'lookup.popup.view.BasePopup'
	],

	models:[
		'module.stock.isos.prodosttwork.model.ProdOsttWorkInvoice',
		'module.stock.isos.prodosttwork.model.ProdOsttWorkMaster',
		'module.stock.isos.prodosttwork.model.ProdOsttWorkDetail'
	],
	stores:[
		'module.stock.isos.prodosttwork.store.ProdOsttWorkInvoice',
		'module.stock.isos.prodosttwork.store.ProdOsttWorkMaster',
		'module.stock.isos.prodosttwork.store.ProdOsttWorkDetail'
	],
	views : [
		'module.stock.isos.prodosttwork.view.ProdOsttWorkLayout',
		/* 현황 */
		'module.stock.isos.prodosttwork.view.ProdOsttWorkSearch',
		'module.stock.isos.prodosttwork.view.ProdOsttWorkListerMaster',
		'module.stock.isos.prodosttwork.view.ProdOsttWorkListerDetail',
		/* 작업 */
		'module.stock.isos.prodosttwork.view.ProdOsttWorkWorkerEditor',
		'module.stock.isos.prodosttwork.view.ProdOsttWorkWorkerSearch',
		'module.stock.isos.prodosttwork.view.ProdOsttWorkWorkerLister'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-prodosttwork-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodosttwork-layout button[action=selectAction]'				: { click : me.selectAction }, /* 조회 */
			'module-prodosttwork-lister-master button[action=etcPrintAction]'		: { click : me.invReportAction }, /* 명세서 발행 */
			'module-prodosttwork-lister-master button[action=insertAction]'			: { click : me.insertAction }, /* 등록 */
			'module-prodosttwork-lister-master button[action=modifyAction]'			: { click : me.modifyAction }, /* 수정 */
			'module-prodosttwork-lister-master button[action=exportAction]'			: { click : me.exportAction }, /* 엑셀 */
			'module-prodosttwork-lister-master button[action=deleteAction]'			: { click : me.deleteAction }, /* 삭제 */
			'module-prodosttwork-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-prodosttwork-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-prodosttwork-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-prodosttwork-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prodosttwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prodosttwork-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-prodosttwork-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-prodosttwork-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-prodosttwork-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-prodosttwork-lister-detail')[0] }
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
		console.log(select);
		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "출고가 마감되어 수정할 수 없습니다.";
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select){
			editor.modifyRecord({
				 caller  : me
				,action  : 'invoice'
				,params  : {param:JSON.stringify({ invc_numb : select.get('invc_numb') , wkod_numb : select.get('wkod_numb') })}
				,lister  : lister
				,callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},
	insertAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			parent
		;
		console.debug( editor );
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
						table_nm: 'mtrl_ostt_mast'
					})
				}
			},

			// 2022.01.19 - 출고용도는 hidden처리하고, 본 기능에서 입력하는 모든 자료는 "생산"으로 고정 처리
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action : 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: keygen.records[0].seq,
							ostt_dvcd	: '1000',
							cstm_dvcd	: '1',
							line_clos	: '0',
							invc_date	: Ext.Date.format(new Date(), 'Y-m-d'),
							ostt_usge_bacd : '0001',
							ostt_usge_name : '생산',
						}),
						lister   : me.pocket.worker.lister(),
						callback : function (results){
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
			detail = me.pocket.lister.detail()
		;


		editor.updateRecord({
			caller   : me,
			action   : 'invoice',
			before   : function(results, record ) {
				if (results.success) {
					var info		= record,
						qty			= 0,
						txfree_amt	= 0,
						taxtn_amt	= 0,
						sply_amt	= 0,
						tax_amt		= 0,
						inv_amt		= 0,
						dirty		= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						qty = qty + Math.abs(item.get('qty'));

						txfree_amt	= txfree_amt + item.get('txfree_amt');
						taxtn_amt	= taxtn_amt  + item.get('taxtn_amt' );
						sply_amt	= sply_amt   + item.get('sply_amt'  );
						tax_amt		= tax_amt    + item.get('tax_amt'   );
						inv_amt		= inv_amt    + item.get('inv_amt'   );
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					info.set('qty'        , qty);
					info.set('txfree_amt' , txfree_amt);
					info.set('taxtn_amt'  , taxtn_amt);
					info.set('sply_amt'   , sply_amt);
					info.set('tax_amt'    , tax_amt);
					info.set('inv_amt'    , inv_amt);
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
			Ext.ComponentQuery.query('module-prodosttwork-worker-search')[0].getForm().reset();
			}
		});
	},
	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
		;
		editor.cancelRecord({
			action   : 'invoice',
			caller   : me,
			callback : function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
				Ext.ComponentQuery.query('module-prodosttwork-worker-search')[0].getForm().reset();
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
					err_msg = "재고 출고가 마감되어 삭제할 수 없습니다.";
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
					url : _global.api_host_info + '/' + _global.app_site + '/stock/isos/prodosttwork/set/del_yn.do',
					method : "POST",
					params : {
					 	token : _global.token_id,
						param : Ext.encode({
							invc_numb    : records[0].get('invc_numb')
						})
					},

					attachitem:function( smodel, record ){
						var me	= this,
						listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
						record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
						;
						me.pocket.listerdetail().eraser() ;

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
			title: '마감리포트',
			url: _global.api_host_info + '/system/recv/prodosttwork/get/report.do',
			params: { param :
				JSON.stringify({
					stor_grp: _global.stor_grp,
					token: _global.token_id,
					invc_numb: selected[0].get('invc_numb')
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
			Ext.Msg.show({ title: '알림', msg: '출고번호를 선택해 주시기 바랍니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		} else
		if(select.length === 1) {
			// type1. 미리보기후 출력
			resource.loadPrint({
				preview        : true,                                 // 미리보기
				enableLoadMask : true,                                 // mask 띄우기
				paperType      : Const.PaperType.A4_NORMAL,            // A4순면지 용지 설정(default A4순면지)(Constant.paperType 참고)(옵션)
				invoiceType 	: Const.InvoiceType.MOVE,               // 명세서 (필수)
				params : { invc_numb : select[0].get('invc_numb'), use_fax : '0'  },
				previewParams  : { email : select[0].get('reve_email'), fax : select[0].get('reve_fax_no') },
				requrl 			: {
					search : _global.api_host_info + '/' + _global.app_site +'/stock/prodosttwork/get/printing.do',
				},

				callback       : function (success) {
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
						preview : false,
						invoiceType    : Const.InvoiceType.ESTI,     // 견적서 (필수)
						params  : { invc_numb : data.get('invc_numb') },
						requrl  : {
							search : _global.api_host_info + '/' + _global.app_site +'/stock/prodosttwork/get/printing.do',
						},
						callback : function (success, msg) {
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
				maskMsg : '출력중입니다... ($count/$total)',
				callback : function () {
					Ext.Msg.alert('', '출력이 완료 되었습니다.');
				}
			});

		}

	}

});
