Ext.define('module.stock.isos.mtrlisttwork.MtrlIsttWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkMaster',
		'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkDetail',
		'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkMaster2',
		'module.stock.isos.mtrlisttwork.model.MtrlIsttWorkDetail2',
	],
	stores:[
		'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster',
		'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkDetail',
		'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkMaster2',
		'module.stock.isos.mtrlisttwork.store.MtrlIsttWorkDetail2',
	],
	views : [
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkLayout',
		/* 현황 */
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkSearch',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkListerMaster',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkListerDetail',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkLister2Master',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkLister2Detail',
		/* 작업 */
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkWorkerEditor',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkWorkerSearch',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkWorkerLister',
		'module.stock.isos.mtrlisttwork.view.MtrlIsttWorkPopup'

	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-mtrlisttwork-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-mtrlisttwork-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-mtrlisttwork-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-mtrlisttwork-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-mtrlisttwork-layout button[action=selectAction]'				: { click : me.selectAction			}, /* 조회 */

			'module-mtrlisttwork-lister-master button[action=exportAction]'			: { click : me.exportAction			}, /* 엑셀 */
			'module-mtrlisttwork-lister-master button[action=rejectAction]'			: { click : me.rejectAction			}, /* 입고취소 */

			'module-mtrlisttwork-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction	}, /* 엑셀 */

			'module-mtrlisttwork-lister2-master button[action=passAction]'			: { click : me.passAction			}, /* 입고승인 */

			'module-mtrlisttwork-lister2-master' : {
				select          : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-mtrlisttwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-mtrlisttwork-search')[0] },
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-mtrlisttwork-lister-master')[0] },
		},
		lister2 : {
			master : function () { return Ext.ComponentQuery.query('module-mtrlisttwork-lister2-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-mtrlisttwork-lister2-detail')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-insp-entry')[0] }

	},

	passAction:function() {
		var me = this,
			master = me.pocket.lister2.master()
			select = me.pocket.lister2.master().getSelectionModel().getSelection(),
			detail = me.pocket.lister2.detail().getSelectionModel().getSelection(),
			param = ''
		;
		if (select.length == 0) {
			Ext.Msg.alert("알림","대기 중인 품목들을 선택해주십시오.");
		}else{
			var a = [];
			for (var i = 0; i < detail.length ; i++) {
				a.push({ invc_numb : detail[i].get('invc_numb'),line_seqn:detail[i].get('line_seqn')});
			}
			Ext.Msg.confirm("확인", "선택하신 품목들을 입고로 등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						param = JSON.stringify({
							cstm_idcd		: select[0].get('cstm_idcd'),
							istt_date		: select[0].data.invc_date.replace(/-/gi,''),
							wrhs_idcd		: select[0].data.istt_wrhs_idcd,
							drtr_idcd		: select[0].data.drtr_idcd,
							records			: a
						})
						Ext.Ajax.request({
							url		: _global.location.http() + '/stock/isos/mtrlisttwork/set/pass.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									param			: param,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd
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
			});
		}
	},

	rejectAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			param = ''
		;
		if (select.length == 0) {
			Ext.Msg.alert("알림","품목을 선택해주십시오.");
		}else{
			var a = [];
			for (var i = 0; i < select.length ; i++) {
				a.push({ invc_numb : select[i].get('invc_numb'),line_seqn:select[i].get('line_seqn')});
			}
			Ext.Msg.confirm("확인", "선택하신 품목들을 취소 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						param = JSON.stringify({
							cstm_idcd		: select[0].get('cstm_idcd'),
							istt_date		: select[0].data.invc_date.replace(/-/gi,''),
							wrhs_idcd		: select[0].data.istt_wrhs_idcd,
							drtr_idcd		: select[0].data.drtr_idcd,
							records			: a
						})
						Ext.Ajax.request({
							url		: _global.location.http() + '/stock/isos/mtrlisttwork/set/cancel.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									param			: param,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd
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
			});
		}
	},

	selectAction:function(callbackFn) {
		var me = this
			master	= me.pocket.lister.master(),
			master2	= me.pocket.lister2.master(),
			detail	= me.pocket.lister2.detail()
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			lister = undefined,
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = ''
		;
		if(tindex==0){
			lister = master;
			temp = 'query';
		}else{
			lister = master2;
			temp = 'entry';
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, query : temp }));
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister2.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function() {
		var me = this,
			detail = me.pocket.lister2.detail(),
			record = me.pocket.lister2.master().getSelectionModel().getSelection()[0]
		;
		if (record != '' || record!= null) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
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
				err_msg = "출고가 마감되어 수정할 수 없습니다.";
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
						table_nm: 'purc_istt_mast'
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
			detail = me.pocket.lister.detail()
		;

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						istt_qntt	= 0,
						istt_amnt	= 0,
						istt_vatx	= 0,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
						istt_qntt = istt_qntt + Math.abs(item.get('istt_qntt'));
						istt_amnt = istt_amnt + Math.abs(item.get('istt_amnt'));
						istt_vatx = istt_vatx + Math.abs(item.get('istt_vatx'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
					});
					info.set('istt_qntt'	, istt_qntt);
					info.set('istt_amnt'	, istt_amnt);
					info.set('istt_vatx'	, istt_vatx);
					info.set('ttsm_amnt'	, istt_amnt + istt_vatx);
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
			Ext.ComponentQuery.query('module-mtrlisttwork-worker-search')[0].getForm().reset();
			}
		});
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
				Ext.ComponentQuery.query('module-mtrlisttwork-worker-search')[0].getForm().reset();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/stock/mtrlisttwork/set/del_yn.do',
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
			url		: _global.api_host_info + '/system/recv/mtrlisttwork/get/report.do',
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
					search		: _global.api_host_info + '/' + _global.app_site +'/stock/mtrlisttwork/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/stock/mtrlisttwork/get/printing.do',
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
