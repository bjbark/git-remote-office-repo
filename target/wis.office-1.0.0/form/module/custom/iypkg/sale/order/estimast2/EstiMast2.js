Ext.define('module.custom.iypkg.sale.order.estimast2.EstiMast2', { extend : 'Axt.app.Controller',


	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.BxtyPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.popup.view.FabcPopup',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice2',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice3',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice4',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Master',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2File',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail2',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail3',
		'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Detail4',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2PrintPopup'
	],
	stores:[
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice2',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice3',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice4',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2WorkerLister5',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Master',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Detail',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2Detail2',
		'module.custom.iypkg.sale.order.estimast2.store.EstiMast2File',
	],
	views : [
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2Layout',
		/* 현황 */
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2Search',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerMaster',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerDetail',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2ListerDetail2',
		/* 작업 */
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor2',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor3',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor4',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerEditor5',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch2',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch3',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerSearch4',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister2',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister3',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister4',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2WorkerLister5',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2EditorLister1',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2EditorLister2',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2EditorLister3',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2Lister2',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2OrdrPopup',
		'module.custom.iypkg.sale.order.estimast2.view.EstiMast2CopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-estimast2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast2-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-estimast2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-estimast2-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeAction        }, /* 마감취소 */
			'module-estimast2-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-estimast2-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-estimast2-lister-master button[action=closeAction]'				: { click : me.closeAction        }, /* 마감 */
			'module-estimast2-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 견적복사 */
			'module-estimast2-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 주문등록 */
			'module-estimast2-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-estimast2-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-estimast2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-estimast2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-estimast2-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-estimast2-lister-master button[action=printAction]'				: { click : me.printAction        }, /* 견적서발행 */

			'module-estimast2-lister-detail2 button[action=exportAction]'			: { click : me.exportDetailAction2 }, /* 엑셀 */

			'module-estimast2-worker-lister button[action=updateAction]'			: { click : me.updateAction       }, /* 저장 */
			'module-estimast2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction       }, /* 취소 */

			'module-estimast2-worker-lister2 button[action=updateAction]'			: { click : me.updateAction2      }, /* 자재소요저장 */
			'module-estimast2-worker-lister2 button[action=cancelAction]'			: { click : me.cancelAction2      }, /* 취소 */

			'module-estimast2-worker-lister3 button[action=updateAction]'			: { click : me.updateAction3      }, /* 가공비내역저장 */
			'module-estimast2-worker-lister3 button[action=cancelAction]'			: { click : me.cancelAction2      }, /* 취소 */

			'module-estimast2-worker-editor5 button[action=updateAction]'			: { click : me.updateAction4      }, /* 개발내역저장 */
			'module-estimast2-worker-editor5 button[action=cancelAction]'			: { click : me.cancelAction2      }, /* 취소 */

			'module-estimast2-lister-master' : {
				selectionchange : me.selectRecord
			},
			'module-estimast2-editor-lister1' : {
				selectionchange : me.selectRecord2
			},
			'module-estimast2-editor-lister2' : {
//				selectionchange : me.selectRecord
			},
			'module-estimast2-editor-lister3' : {
//				selectionchange : me.selectRecord
			},

			'module-estimast2-layout #mainpanel' : {
				tabchange : me.mainTabChange
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estimast2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estimast2-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor2')[0] },
			editor3 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor3')[0] },
			editor4 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor4')[0] },
			editor5 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor5')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estimast2-worker-lister')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-lister2')[0] },
			lister3 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-lister3')[0] },
			lister4 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-lister4')[0] },
			lister5 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-lister5')[0] },
			editorlister1 : function () { return Ext.ComponentQuery.query('module-estimast2-editor-lister1')[0] },
			editorlister2 : function () { return Ext.ComponentQuery.query('module-estimast2-editor-lister2')[0] },
			editorlister3 : function () { return Ext.ComponentQuery.query('module-estimast2-editor-lister3')[0] },
			search2 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-search2')[0] },
			search3 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-search3')[0] },
			search4 : function () { return Ext.ComponentQuery.query('module-estimast2-worker-search4')[0] },
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-estimast2-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-estimast2-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-estimast2-lister-detail2')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-estimast2-copy-popup')[0] },
		popup2  : function () { return Ext.ComponentQuery.query('module-estimast2-print-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-estimast2-lister2')[0] }
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			select		= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			select2		= me.pocket.lister.detail().getSelectionModel().getSelection()[0],
			editor2		= me.pocket.worker.editor2(),
			editor3		= me.pocket.worker.editor3(),
			editor4		= me.pocket.worker.editor4(),
			editor5		= me.pocket.worker.editor5(),
			lister		= me.pocket.lister.master(),
			detail		= me.pocket.lister.detail(),
			lister2		= me.pocket.worker.lister2(),
			lister3		= me.pocket.worker.lister3(),
			lister4		= me.pocket.worker.lister4(),
			editorlister1	= me.pocket.worker.editorlister1(),
			editorlister2	= me.pocket.worker.editorlister2(),
			editorlister3	= me.pocket.worker.editorlister3(),
			workersearch2	= me.pocket.worker.search2(),
			workersearch3	= me.pocket.worker.search3(),
			workersearch4	= me.pocket.worker.search4(),
			tindex		= tabPanel.items.indexOf(newCard),
			search		= me.pocket.search(),
			param		= search.getValues(),
			records		= lister.getSelectionModel().getSelection()
		;

		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "자재소요내역을 조회할 견적을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}

			updatebutton = Ext.ComponentQuery.query('module-estimast2-worker-lister2')[tindex-1];
			if (select.get("line_clos") == "1") {
				updatebutton.down('[itemId=update]').hide();
			}
			if (select.get("line_clos") == "0") {
				updatebutton.down('[itemId=update]').show();
			}

			workEditor = Ext.ComponentQuery.query('module-estimast2-worker-editor2')[tindex-1];
			workEditor.down('[name=invc_numb]').setReadOnly(true);
			workEditor.down('[name=esti_case_name]').setReadOnly(true);
			workEditor.down('[name=cstm_code]').setReadOnly(true);
			workEditor.down('[name=cstm_name]').setReadOnly(true);
			workEditor.down('[name=drtr_name]').setReadOnly(true);
			workEditor.down('[name=invc_date]').setReadOnly(true);
			workEditor.down('[name=rcvr_name]').setReadOnly(true);
			workEditor.down('[name=supl_dvcd]').setReadOnly(true);
			workEditor.down('[name=memo]').setReadOnly(true);

			editor2.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({invc_numb	: select.get('invc_numb')})
				},
				lister	: lister2,
				callback: function( results ) {
					if (results.success){
						editorlister1.getSelectionModel().select(0);
						results.feedback( {success : true } );
					}
				}
			});
			Ext.ComponentQuery.query('module-estimast2-worker-search2')[0].getForm().reset();
			Ext.ComponentQuery.query('module-estimast2-worker-search3')[0].getForm().reset();
			Ext.ComponentQuery.query('module-estimast2-worker-search4')[0].getForm().reset();

		}
		if (tindex == 2) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "가공비내역을 조회할 견적을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}

			updatebutton = Ext.ComponentQuery.query('module-estimast2-worker-lister3')[tindex-2];
			if (select.get("line_clos") == "1") {
				updatebutton.down('[itemId=update]').hide();
			}
			if (select.get("line_clos") == "0") {
				updatebutton.down('[itemId=update]').show();
			}

			workEditor = Ext.ComponentQuery.query('module-estimast2-worker-editor3')[tindex-2];
			workEditor.down('[name=invc_numb]').setReadOnly(true);
			workEditor.down('[name=esti_case_name]').setReadOnly(true);
			workEditor.down('[name=cstm_code]').setReadOnly(true);
			workEditor.down('[name=cstm_name]').setReadOnly(true);
			workEditor.down('[name=drtr_name]').setReadOnly(true);
			workEditor.down('[name=invc_date]').setReadOnly(true);
			workEditor.down('[name=rcvr_name]').setReadOnly(true);
			workEditor.down('[name=supl_dvcd]').setReadOnly(true);
			workEditor.down('[name=memo]').setReadOnly(true);
			editor3.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({invc_numb	: select.get('invc_numb')})
				},
				lister	: lister3,
				callback: function( results ) {
					if (results.success){
						editorlister2.getSelectionModel().select(0);
						results.feedback( {success : true } );
					}
				}
			});
			Ext.ComponentQuery.query('module-estimast2-worker-search3')[0].getForm().reset();
			Ext.ComponentQuery.query('module-estimast2-worker-search4')[0].getForm().reset();
		}
		if (tindex == 3) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "개발내역을 조회할 견적을 선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			workEditor = Ext.ComponentQuery.query('module-estimast2-worker-editor4')[tindex-3];
			workEditor2 = Ext.ComponentQuery.query('module-estimast2-worker-editor5')[tindex-3];
			if (select.get("line_clos") == "1") {
				workEditor2.down('[itemId=update]').hide();
			}
			if (select.get("line_clos") == "0") {
				workEditor2.down('[itemId=update]').show();
			}

			workEditor.down('[name=invc_numb]').setReadOnly(true);
			workEditor.down('[name=esti_case_name]').setReadOnly(true);
			workEditor.down('[name=cstm_code]').setReadOnly(true);
			workEditor.down('[name=cstm_name]').setReadOnly(true);
			workEditor.down('[name=drtr_name]').setReadOnly(true);
			workEditor.down('[name=invc_date]').setReadOnly(true);
			workEditor.down('[name=rcvr_name]').setReadOnly(true);
			workEditor.down('[name=supl_dvcd]').setReadOnly(true);
			workEditor.down('[name=memo]').setReadOnly(true);
			workEditor2.down('[name=gnrl_mngt_cost_rate]');
			workEditor2.down('[name=pfit_rate]');

			editor4.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({invc_numb	: select.get('invc_numb')})
				},
				lister	: lister4,
				callback: function( results ) {
					if (results.success){
						editorlister3.getSelectionModel().select(0);
						results.feedback( {success : true } );
					}
				}
			});
			editor5.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {
					param:JSON.stringify({invc_numb	: select.get('invc_numb')})
				},
				lister	: lister4,
				callback: function( results ) {
					if (results.success){
						editorlister3.getSelectionModel().select(0);
						results.feedback( {success : true } );
					}
				}
			});
			Ext.ComponentQuery.query('module-estimast2-worker-search2')[0].getForm().reset();
			Ext.ComponentQuery.query('module-estimast2-worker-search3')[0].getForm().reset();
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
			Ext.Msg.alert("알림", "마감할 견적을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/iypkg/sale/order/estimast2/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'esti_mast'
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
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/iypkg/sale/order/estimast2/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'esti_mast'
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
			editor	= this.pocket.worker.editor(),
			editor2	= this.pocket.worker.editor2(),
			lister	= me.pocket.lister.master(),
			lister2	= me.pocket.worker.lister2(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab()),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
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

	selectRecord:function( grid, record ){
		var me = this,
			detail = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			master = me.pocket.lister.master(),
			editor = me.pocket.worker.editor(),
			lister2 = me.pocket.lister2(),
			lister5	= me.pocket.worker.lister5(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			workerlister = me.pocket.worker.lister()

		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

		lister5.getStore().clearData();
		lister5.getStore().loadData([],false);

		workerlister.getStore().clearData();
		workerlister.getStore().loadData([],false);


		if (record.length > 0) {
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record[0].data.invc_numb });
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].data.invc_numb });
			lister5.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].data.invc_numb });
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].data.invc_numb ,orgn_dvcd : 'esti_mast' });
			lister2.down('[name=file]').popup.params.invc_numb = record[0].data.invc_numb;		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}
	},

	selectRecord2:function( grid, record ){
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.worker.editorlister1().getSelectionModel().getSelection()[0],
			lister2 = me.pocket.worker.lister2()

		;

		if (record.length > 0) {
			lister2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			},{ invc_numb : record[0].data.invc_numb , line_seqn : record[0].data.line_seqn });
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
				err_msg = "마감된 견적입니다.";
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
						table_nm: 'esti_mast'
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
			store2	= editor.getStore(),
			store3	= lister.getStore()
		;

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					var items	= info.product().data.items;

					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.esti_qntt == 0){
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
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-estimast2-worker-search')[0].getForm().reset();
			}
		});
	},

	updateAction2:function() {
		var me = this,
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor	= me.pocket.worker.editor2()
			lister	= me.pocket.worker.lister2(),
			master	= me.pocket.lister.master()
			store	= master.getStore(),
			store2	= editor.getStore(),
			store3	= lister.getStore(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					var items	= info.product().data.items;

					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.esti_qntt == 0){
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
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({});
						tpanel.items.indexOf(tpanel.setActiveTab(0));
						}
					});
				}
			Ext.ComponentQuery.query('module-estimast2-worker-search2')[0].getForm().reset();
			}
		})
	},

	updateAction3:function() {
		var me = this,
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor	= me.pocket.worker.editor3()
			lister	= me.pocket.worker.lister3(),
			master	= me.pocket.lister.master()
			store	= master.getStore(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
					var items	= info.product().data.items;
					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.esti_qntt == 0){
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
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({});
						tpanel.items.indexOf(tpanel.setActiveTab(0));
						}
					});
				}
			Ext.ComponentQuery.query('module-estimast2-worker-search3')[0].getForm().reset();
			}
		})
	},

	updateAction4:function() {
		var me = this,
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor	= me.pocket.worker.editor4(),
			editor2	= me.pocket.worker.editor5(),
			lister	= me.pocket.worker.lister4(),
			master	= me.pocket.lister.master()
			store	= master.getStore(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(editor2.down('[name=chk]').setValue('Y')){
			editor2.updateRecord({
				caller	: me,
				action	: 'invoice',
				before	: function(results, record ) {
					if (results.success) {
						var info	= record,
							dirty	= false
						;
						var items	= info.product().data.items;

						info.dirtyValue('sysm_memo', '');
						info.product().data.each( function( item ) {
							item.dirtyValue('invc_numb', info.get('invc_numb'));
							if (item.dirty || item.phantom) {
								dirty = true;
							}
						});
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
								master.getSelectionModel().select(ms);
								master.getStore().commitChanges();
								me.pocket.layout().getLayout().setActiveItem(0);
								results.feedback({success : true  });
								master.select({
									 callback:function(records, operation, success) {
										if (success) {
											master.getSelectionModel().select(0);
										} else { me.pocket.editor2().getForm().reset(true); }
									}, scope:me
								}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
							}, /* 저장 성공시 */
							failure : function(operation){ results.feedback({success : false });},
							callback: function(operation){ results.callback({});
							tpanel.items.indexOf(tpanel.setActiveTab(0));
							}
						});
					}
				Ext.ComponentQuery.query('module-estimast2-worker-search4')[0].getForm().reset();
				}
			})
		};
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
			widget : 'module-estimast2-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			record =[];
			invcs  = '';
		;

		if(select.length > 0){
			for(var i = 0; i<select.length;i++){
				if (select[i].data.cstm_idcd == '') {
					Ext.Msg.alert("알림", "거래처로 정보를 입력하여 주시기 바랍니다.");
					return;
				}
				if (select[i].data.line_clos == '1') {
					Ext.Msg.alert("알림", "주문 등록할 수 없는 건입니다.");
					return;
				}
				if (select[i].data.acpt_cofm_yorn == '1') {
					Ext.Msg.alert("알림", "이미 주문등록이 완료된 건입니다.");
					return;
				}
				record.push({ invc_numb : select[i].data.invc_numb, cstm_name : select[i].data.cstm_name });
			}

			resource.loadPopup({
				widget : 'module-estimast2-ordr-popup',
				params : {
					token	: _global.token_id,
					param	: JSON.stringify({
						records		: record
					})
				},
			});

		}else{
			Ext.Msg.alert("알림","등록할 견적을 선택해주십시오.");
		}
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
				Ext.ComponentQuery.query('module-estimast2-worker-search')[0].getForm().reset();
			}
		});
	},

	cancelAction2:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
		Ext.ComponentQuery.query('module-estimast2-worker-search2')[0].getForm().reset();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast2/set/del_yn.do',
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

	// 견적서 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			jrf ,
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			if (records[0].get("vatx_dvcd")== "1"|| records[0].get("vatx_dvcd")== null || records[0].get("vatx_dvcd")== "" ) {
				jrf = 'EstiReport_Liebe.jrf',
				resId = _global.hq_id.toUpperCase()

			}
			if(records[0].get("vatx_dvcd")== "2" || records[0].get("vatx_dvcd")== "3" ){
				jrf = 'EstiReport_Liebe2.jrf',
				resId = _global.hq_id.toUpperCase()

			}
			if(records[0].get("vatx_dvcd")== "4"){
				jrf = 'EstiReport_Liebe3.jrf',
				resId = _global.hq_id.toUpperCase()
			}

			if(resId == 'N1000LIEBE'){
				resource.loadPopup({
					widget : 'module-estimast2-print-popup',
					params : {
						invc_numb : select.data.invc_numb,
						vatx_dvcd : select.data.vatx_dvcd,
					}
				});
			}else{
				var invc_numb = select.data.invc_numb;
				var arg =	'invc_numb~'+invc_numb+'~';
				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
				Ext.Ajax.request({
					url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
				});
			}
		}
	},



	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},

	exportDetailAction2 : function(self) {
		this.pocket.lister.detail2().writer({enableLoadMask:true});
	}
});
