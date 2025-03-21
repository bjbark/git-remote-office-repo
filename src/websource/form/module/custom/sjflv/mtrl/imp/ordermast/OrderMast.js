Ext.define('module.custom.sjflv.mtrl.imp.ordermast.OrderMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.BasePopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.WkfwPopup'
	],

	models:[
		'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastInvoice',
		'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastMaster',
		'module.custom.sjflv.mtrl.imp.ordermast.model.OrderMastDetail',
	],
	stores:[
		'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastInvoice',
		'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastMaster',
		'module.custom.sjflv.mtrl.imp.ordermast.store.OrderMastDetail',
	],
	views : [
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastLayout',
		/* 현황 */
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastSearch',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastListerMaster',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastListerDetail',
		/* 작업 */
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastWorkerEditor',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastWorkerSearch',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastWorkerLister',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastCostPopup',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastInvoicePopup',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastBlPopup',
		'module.custom.sjflv.mtrl.imp.ordermast.view.OrderMastReportPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-ordermast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-ordermast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-ordermast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-ordermast-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */

			'module-ordermast-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-ordermast-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-ordermast-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 출고지시 */
			'module-ordermast-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-ordermast-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-ordermast-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-ordermast-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-ordermast-lister-detail button[action=deleteAction2]'			: { click : me.deleteAction2      }, /* 삭제 */
			'module-ordermast-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */

			'module-ordermast-lister-master button[action=costAction]'				: { click : me.costAction         }, /* 부대비용등록 */
			'module-ordermast-lister-master button[action=amendAction]'				: { click : me.amendAction        }, /* amend등록 */
			'module-ordermast-lister-master button[action=invoiceAction]'			: { click : me.invoiceAction      }, /* invoice등록 */
			'module-ordermast-lister-master button[action=blpopupAction]'			: { click : me.blpopupAction      }, /* B/L등록 */
			'module-ordermast-lister-master button[action=reportpopupAction]'		: { click : me.reportpopupAction  }, /* 수입신고필증등록*/
			'module-ordermast-lister-master button[action=uploadAction]'			: { click : me.excelUploadAction  },
			'module-ordermast-lister-master button[action=pasteUploadAction]'		: { click : me.pasteUploadAction  }, /* 엑셀 붙여 넣기 액션 */


			'module-ordermast-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-ordermast-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-ordermast-worker-search button[action=inputAction]'				: { click : me.itemInputAction }, /* 취소 */
			'module-ordermast-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-ordermast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-ordermast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-ordermast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-ordermast-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-ordermast-worker-search')[0] }
		},

		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-ordermast-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-ordermast-lister-detail')[0] }
		},
	},




	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor()
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {  }
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
			search = me.pocket.search(),
			param = search.getValues()
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
			}, { invc_numb : record.get('ordr_numb')});

//			file.select({
//				callback:function(records, operation, success) {
//					if (success) {
//					} else { me.pocket.editor().getForm().reset(true);}
//					}, scope:me
//			}, { invc_numb : record.get('invc_numb'),orgn_dvcd : 'saleorder'});
//			file.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
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
					url		: _global.location.http() + '//custom/sjflv/mtrl/imp/ordermast/set/amend.do',
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

	costAction:function() {
		var me = this,
			master = me.pocket.lister.master()
		;

		resource.loadPopup({
			widget : 'module-ordermast-cost-popup',
		});
	},

	invoiceAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0]
		;

		if(select){
			resource.loadPopup({
				widget : 'module-ordermast-invoice-popup',
				params : select
			});
		}else{
			Ext.Msg.alert('알림','Order를 선택해주세요.')
		}
	},

	blpopupAction:function() {
		var me = this,
			master = me.pocket.lister.master()
		;

		resource.loadPopup({
			widget : 'module-ordermast-bl-popup',
		});
	},

	reportpopupAction:function() {
		var me = this,
			master = me.pocket.lister.master()
		;

		resource.loadPopup({
			widget : 'module-ordermast-report-popup',
		});
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
						table_nm: 'acpt_mast'
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
//								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
//								console.log(ms);
//								Ext.iterate(ms.data, function (key, value) {
//									ms.set( key, record.get(key));
//								});
							}
//							detail.getStore().loadData(record.product().data.items, false);
							detail.eraser();
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
						}
					});
				}
			Ext.ComponentQuery.query('module-offermast-worker-search')[0].getForm().reset();
			master.getStore().reload();
			}
		});
	},

	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-offermast-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;
		if(!select){
			Ext.Msg.alert("알림","출고지시 할 수주를 선택해주십시오.");
		}else{
			console.debug('수주상태 : ',select.get('acpt_stat_dvcd'));
			if (select.get('acpt_stat_dvcd') == '0010') {
				Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(미승인 오더)");
				return;
			}
			if (select.get('acpt_stat_dvcd') == '0200') {
				Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(출고지시 완료)");
				return;
			}
			if (select.get('acpt_stat_dvcd') !== '0011') {
				Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.");
				return;
			}
			if (select.get('line_clos') !== '0') {
				Ext.Msg.alert("알림", "출고지시할 수 없는 수주입니다.(마감된 오더)");
				return;
			}

			Ext.Msg.confirm("확인", "출고지시 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom.sjflv.sale.export.offermast/set/stps.do',
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
							Ext.Msg.alert("알림", "출고지시가 완료 되었습니다.");
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
				Ext.ComponentQuery.query('module-offermast-worker-search')[0].getForm().reset();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom.sjflv.sale.export.offermast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
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

	deleteAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			store  = detail.getStore()
		;

		var err_msg = "";
		var records1 = master.getSelectionModel().getSelection();
		var records  = detail.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records1, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
			});

			Ext.each(records1, function(record) {
				if (record.get("acpt_stat_dvcd") == "0011") {
					err_msg = "승인완료된 상태에서 삭제할수없습니다. 승인취소후 삭제해주세요. ";
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
				for (var i = 0; i < records.length; i++) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom.sjflv.sale.export.offermast/set/del_yn2.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: records[i].get('invc_numb'),
								line_seqn	: records[i].get('line_seqn')
							})
						},
						success : function(response, request) {
							var object = response,
							result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store.remove(records[i]);
								store.commitChanges();
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
				}
				mask.hide();
				store.reload();
			}
		});
	},

	/**
	 * 엑셀 업로드 액션
	 */
	pasteUploadAction : function () {
		var me = this ,
			layout = me.pocket.layout()
		;
		layout.getLayout().setActiveItem(1);
	},
	/**
	 * 엑셀 업로드
	 */
	excelUploadAction : function () {
		var me = this,
			param  = me.pocket.search().getValues()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'file-upload-popup',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/' + Const.UPLOAD.SAMPLE.ITEM
			},
			apiurl : {
				upload : _global.location.href + '/system/custom.sjflv.sale.export.offermast/excel.do', // url (필수)
			},
			params : {
//				token	: _global.token_id,
//				hq_id		: _global.hq_id,
//				stor_id		: _global.stor_id
			},
			title			: '고객 수주내역 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
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
			title	: '마감리포트',
			url		: _global.api_host_info + '/system/custom.sjflv.sale.export.offermast/get/report.do',
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
					search		: _global.api_host_info + '/' + _global.app_site +'/custom.sjflv.sale.export.offermast/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/custom.sjflv.sale.export.offermast/get/printing.do',
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

	itemInputAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-itemcode-input-popup'
		});

		/*

		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-offermast-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
		*/
	},

	ganttAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.invc1_date == '' || param.invc2_date == ''){
			Ext.Msg.alert('알림','기간을 선택해주세요.')
		}else{
			var hq_id		= _global.hq_id.toUpperCase();
				chk			= Ext.dom.Query.select('.x-css-shadow'),
				a			= _global.api_host_info,
				search_url	= '/system/ganttchart/gantt_query_1.do',
				update_url	= '',
				title		= '수주내역',
				source		= '수주내역',
				levels		= '2',
				to_dt		= param.invc2_date,
				fr_dt		= param.invc1_date,
				url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',title:\''+title+'\',source:\''+source+'\',levels:\''+levels+'\',hq_id:\''+hq_id+'\',to_dt:\''+to_dt+'\',fr_dt:\''+fr_dt+'\'}'
			;
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '주문오더관리',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%">iframe</iframe>',
						listeners : {
							show : function (win) {
								win.maximize ();
							},
							minimize: function(data) {
								win.setVisible(false);
								var a;
								var button = Ext.create('Ext.Button', {
									text: data.title,
									style: 'z-index: 9999!impant',
									draggable :true,
									renderTo: Ext.getBody(),
									listeners : {
										move : function (e) {// dropped
											a = 1;
										},
										click : function(e) {
											if(a==1){
												x = button.getX();
												y = button.getY();
												temp = 1;
												a = 0;
												return;
											}else{
												win.setVisible(true);
												this.destroy();
											}
										}
									}
								});
								if(temp == 0){
									button.setX(200);
									button.setY(850);
								}else{
									button.setX(x);
									button.setY(y);
								}
							}
						}
				}); win.show();
			}
		}
	},
});
