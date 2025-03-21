Ext.define('module.sale.spts.sptsmast.SptsMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.OrdrPopup'
	],

	models:[
		'module.sale.spts.sptsmast.model.SptsMastMaster',
		'module.sale.spts.sptsmast.model.SptsMastDetail',
		'module.sale.spts.sptsmast.model.SptsMastMaster2',
		'module.sale.spts.sptsmast.model.SptsMastDetail2',
		'module.sale.spts.sptsmast.model.SptsMastWorkerDetail',
		'module.sale.spts.sptsmast.model.SptsMastWorkerMaster',
		'module.sale.spts.sptsmast.model.SptsMastWorkInvoice'
	],

	stores:[
		'module.sale.spts.sptsmast.store.SptsMastMaster',
		'module.sale.spts.sptsmast.store.SptsMastDetail',
		'module.sale.spts.sptsmast.store.SptsMastMaster2',
		'module.sale.spts.sptsmast.store.SptsMastDetail2',
		'module.sale.spts.sptsmast.store.SptsMastWorkInvoice'
	],

	views : [
		'module.sale.spts.sptsmast.view.SptsMastLayout',
		/* 현황 */
		'module.sale.spts.sptsmast.view.SptsMastSearch',
		'module.sale.spts.sptsmast.view.SptsMastListerMaster',
		'module.sale.spts.sptsmast.view.SptsMastListerDetail',
		'module.sale.spts.sptsmast.view.SptsMastListerMaster2',
		'module.sale.spts.sptsmast.view.SptsMastListerDetail2',
		'module.sale.spts.sptsmast.view.SptsMastWorkerEditor',
		'module.sale.spts.sptsmast.view.SptsMastWorkerLister',
		'module.sale.spts.sptsmast.view.SptsMastWorkerSearch',
		'module.sale.spts.sptsmast.view.SptsMastChangePopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sptsmast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sptsmast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sptsmast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},

	init: function() {
		var me = this;
		me.control({
			'module-sptsmast-layout button[action=selectAction]'				: { click : me.selectAction        }, /* 조회 */
			'module-sptsmast-layout #mainpanel'									: { tabchange : me.selectAction    },

			'module-sptsmast-lister-detail button[action=orderAction]'			: { click : me.orderAction         }, /* 출고지시 */
			'module-sptsmast-lister-master2 button[action=ordercancleAction]'	: { click : me.ordercancleAction   }, /* 출고지시취소 */
			'module-sptsmast-lister-master2 button[action=printAction]'			: { click : me.printAction         }, /* 거래명세서출력 */
			'module-sptsmast-lister-master button[action=etcPrintAction]'		: { click : me.invReportAction     }, /* 명세서 발행 */
			'module-sptsmast-lister-master button[action=exportAction]'			: { click : me.exportAction        }, /* 엑셀 */
			'module-sptsmast-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction  }, /* 엑셀 */
			'module-sptsmast-lister-master2 button[action=exportAction]'		: { click : me.exportAction1       }, /* 엑셀 */
			'module-sptsmast-lister-master2 button[action=changeAction]'		: { click : me.changeAction        }, /* 삼정 납품처변경 */
			'module-sptsmast-lister-detail2 button[action=exportAction]'		: { click : me.exportDetailAction1 }, /* 엑셀 */
			'module-sptsmast-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			// lister2 event
			'module-sptsmast-worker-lister button[action=updateAction]': { click : me.updateAction		},		// 저장
			'module-sptsmast-worker-lister button[action=cancelAction]': { click : me.cancelAction		},		// 취소
			'module-sptsmast-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회

			'module-sptsmast-lister-master2' : {
				itemdblclick    : me.selectDetail1,
				selectionchange : me.selectRecord1
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sptsmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sptsmast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sptsmast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sptsmast-worker-lister')[0] },
			workersearch	: function () { return Ext.ComponentQuery.query('module-sptsmast-worker-search')[0] },
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-sptsmast-lister-master')[0]  },
			detail : function () { return Ext.ComponentQuery.query('module-sptsmast-lister-detail')[0]  },
			master2: function () { return Ext.ComponentQuery.query('module-sptsmast-lister-master2')[0] },
			detail2: function () { return Ext.ComponentQuery.query('module-sptsmast-lister-detail2')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-sptsmast-copy-popup')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister.master(),
			lister2 = me.pocket.lister.master2(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.invc1_date>param.invc2_date || param.deli1_date>param.deli2_date){
			Ext.Msg.alert("알림","조회기간을 다시 입력 해 주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});

			if(tindex == 0){
				mask.show();
				lister.select({
					 callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { editor.getForm().reset(true); }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }, { rsvd_ordr_spts : _global.options.rsvd_ordr_spts }));
			}else if ( tindex == 2 ) {
				mask.show();
				lister2.select({
					 callback:function(records, operation, success) {
						if (success) {
							lister2.getSelectionModel().select(0);
						} else { editor.getForm().reset(true); }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
			}
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			master = me.pocket.lister.master(),
			lister = me.pocket.worker.lister(),
			detail = me.pocket.lister.detail(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.workersearch(),
			param  = search.getValues(),
			record = undefined
		;
		if(editor.getValues().cstm_idcd==''){
			Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
		}else{
			var wrhs_idcd = editor.getValues().wrhs_idcd;
			var wrhs_name = editor.getValues().wrhs_name;
			var drtr_idcd = editor.getValues().drtr_idcd;
			var drtr_name = editor.getValues().drtr_name;
			lister.getStore().clearData();
			lister.getStore().loadData([],false);
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({
						cstm_idcd		: editor.getValues().cstm_idcd,
						invc_numb		: param.invc_numb,
						item_idcd		: param.item_idcd,
						deli_date1		: param.deli_date1,
						deli_date2		: param.deli_date2
					})
				},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true } );
					}
					editor.down('[name=drtr_idcd]').setValue(drtr_idcd);
					editor.down('[name=drtr_name]').setValue(drtr_name);
					editor.down('[name=wrhs_idcd]').setValue(wrhs_idcd);
					editor.down('[name=wrhs_name]').setValue(wrhs_name);
				}
			});
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
			search = me.pocket.worker.workersearch(),
			param  = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(changes != 0){
			Ext.Ajax.request({
				url			: _global.location.http() + '/listener/seq/maxid.do',
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'spts_mast'
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

						console.log(record);

						info.dirtyValue('sysm_memo', '');
						info.product().data.each( function( item ) {
							item.dirtyValue('acpt_numb', info.get('acpt_numb'));
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
//								if (results.inserted){
//									ms = Ext.create( lister.getStore().model.modelName , record.data );
//									lister.getStore().insert(0, ms);
//								} else {
//									ms = lister.getStore().findRecord('acpt_numb', record.get('acpt_numb'));
//									Ext.iterate(ms.data, function (key, value) {
//										ms.set( key, record.get(key));
//									});
//								}
								me.selectAction2();
								tpanel.items.indexOf(tpanel.setActiveTab(0));
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

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectRecord1:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail2()
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

	selectDetail1 : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail2()
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


	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			master = me.pocket.lister.master(),
			lister = me.pocket.lister.detail(),
			invc_numb = undefined
		;
		var	schd_date   = Ext.Date.format(Ext.ComponentQuery.query('module-sptsmast-lister-detail [name=ostt_shcd_date]')[0].getValue(),'Ymd');
		var store	= lister.getStore();
		var qntt = 0;
		store.each(function(findrecord) {
			qntt = qntt + findrecord.get("spts_qntt");
		});
		var err_msg = "";
		if (qntt == 0) {
				err_msg = "출고할 품목을 선택해 주십시오.";
			}
		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		Ext.Msg.confirm("확인", "출고지시 하시겠습니까?", function(button) {
			if (button == 'yes') {
				resource.keygen({
					url			: _global. location.http () + '/listener/seq/maxid.do',
					object		: resource. keygen,
					params		: {
						token	: _global. token_id ,
						param	: JSON. stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'spts_mast'
						})
					 },
					async		: false,
					callback	: function( keygen ) {
						if (keygen.success) {
							invc_numb = keygen.records[0].seq ;
//							results.feedback({success : true  });
							var store = lister.getStore();
							store.each(function(findrecord) {
								findrecord.set("_invc_numb"			, invc_numb);
								findrecord.set("_ostt_schd_date"	, schd_date);
								findrecord.set("_drtr_idcd"			, _global.login_id);
							});
							lister.getStore().sync({
								success : function(operation){
									Ext.Msg.alert("알림","출고지시가 완료되었습니다.");
									lister.getStore().reload();
									master.getStore().reload();
								},
								failure : function(operation){ },
								callback: function(operation){
								}
							});
						} else {
							Ext.Msg.alert("error", keygen.message  );
							return;
						}
					}
				});
			}
		});
	},

	ordercancleAction:function() {
		var me = this,
			select = me.pocket.lister.master2().getSelectionModel().getSelection()[0]
		;
		if(!select){
			Ext.Msg.alert("알림","취소할 출고지시를 선택해주십시오.");
		}else{
			Ext.Msg.confirm("확인", "출고지시를 취소 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/spts/sptsmast/set/stpscancle.do',
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
							Ext.Msg.alert("알림", "출고지시가 취소 되었습니다.");
							me.pocket.lister.master2().getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master2().getStore().loadData([],true);
							me.pocket.lister.detail2().getStore().loadData([],false);
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
	exportAction1 : function(self) {
		this.pocket.lister.master2().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.lister.detail2().writer({enableLoadMask:true});
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
			url		: _global.api_host_info + '/system/sale/order/sptsmast/get/report.do',
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
					search		: _global.api_host_info + '/' + _global.app_site +'/sale/order/sptsmast/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/sale/order/sptsmast/get/printing.do',
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

	cancelAction : function() {
		var me	= this,
		lister = me.pocket.worker.lister(),
		search = me.pocket.worker.workersearch(),
		param  = search.getValues(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));

	},

	// 거래명세서출력
	printAction:function() {
		var me = this,
			lister2 = me.pocket.lister.master2(),
			select = me.pocket.lister.master2().getSelectionModel().getSelection(),
			jrf = 'Invoice2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/sale/spts/sptsmast/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "1000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var invc_numb = select[0].get('invc_numb')
		var arg = 'invc_numb~'+invc_numb+'~';

		if(resId == 'N1000NBOLT'){
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'Invoice_Nbolt2.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}else{
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
//		if (select) {
//			var invc_numb = select[0].get('invc_numb');
//			var arg =	'invc_numb.'+invc_numb+'.';
//			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//			Ext.Ajax.request({
//			url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
//			});
//		}
	},

	//납품처 변경
	changeAction:function() {
		var me = this,
			master2 = me.pocket.lister.master2()
			popup  = me.pocket.popup()
		;

		var records		= master2.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "변경하려는 출고의뢰 1건을 선택 후 진행하십시오.");
			return;
		}

		var me = this
		resource.loadPopup({
			widget : 'module-sptsmast-change-popup',
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
		Ext.ComponentQuery.query('#ostt_schd_date')[0].setValue(records[0].data.ostt_schd_date);
		Ext.ComponentQuery.query('#dlvy_cstm_name')[0].setValue(records[0].data.dlvy_cstm_name);
	},
});
