Ext.define('module.workshop.sale.order.estimast.EstiMast', { extend : 'Axt.app.Controller',

	requires:[
//		'lookup.upload.FileUpload',
//		'lookup.upload.BoardUpload2',
//		'lookup.upload.DXFconvert',
//		'lookup.popup.view.ItemCodeHjPopup',

		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.MmbrPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.ShetPopup',
		'lookup.popup.view.ShetItemPopup',
		'lookup.popup.view.ShetWghtPopup',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.EstiPricPopup',
		'lookup.popup.view.ProcPopup',
		'lookup.popup.view.ItemClassPopup2',
		'lookup.popup.view.ItemClassPopup3',
		'lookup.popup.view.ShetPopupWorkShop',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.workshop.sale.order.estimast.model.EstiMastInvoice',
		'module.workshop.sale.order.estimast.model.EstiMastMaster',
		'module.workshop.sale.order.estimast.model.EstiMastDetail',
		'module.workshop.sale.order.estimast.model.EstiMastItem1',
		'module.workshop.sale.order.estimast.model.EstiMastItem2',
		'module.workshop.sale.order.estimast.model.EstiMastSubItem',
		'module.workshop.sale.order.estimast.model.EstiMastMainItem',
		'module.workshop.sale.order.estimast.model.EstiMastShetItem',
		'module.workshop.sale.order.estimast.model.EstiMastTree',
		'module.workshop.sale.order.estimast.model.EstiMastBomListMaster',
		'module.workshop.sale.order.estimast.model.EstiMastBomListDetail',
		'module.workshop.sale.order.estimast.model.EstiMastExcel',
		'module.workshop.sale.order.estimast.model.EstiMastFilePopup'
	],
	stores:[
		'module.workshop.sale.order.estimast.store.EstiMastInvoice',
		'module.workshop.sale.order.estimast.store.EstiMastMaster',
		'module.workshop.sale.order.estimast.store.EstiMastDetail',
		'module.workshop.sale.order.estimast.store.EstiMastItem1',
		'module.workshop.sale.order.estimast.store.EstiMastItem2',
		'module.workshop.sale.order.estimast.store.EstiMastSubItem',
		'module.workshop.sale.order.estimast.store.EstiMastShetItem',
		'module.workshop.sale.order.estimast.store.EstiMastMainItem',
		'module.workshop.sale.order.estimast.store.EstiMastTree',
		'module.workshop.sale.order.estimast.store.EstiMastBomListMaster',
		'module.workshop.sale.order.estimast.store.EstiMastBomListDetail',
		'module.workshop.sale.order.estimast.store.EstiMastExcel',
		'module.workshop.sale.order.estimast.store.EstiMastFilePopup'
	],
	views : [
		'module.workshop.sale.order.estimast.view.EstiMastLayout',
		/* 현황 */
		'module.workshop.sale.order.estimast.view.EstiMastSearch',
		'module.workshop.sale.order.estimast.view.EstiMastListerMaster',
		'module.workshop.sale.order.estimast.view.EstiMastListerDetail',
		/* 작업 */
		'module.workshop.sale.order.estimast.view.EstiMastWorkerEditor',
		'module.workshop.sale.order.estimast.view.EstiMastWorkerEditor2',
		'module.workshop.sale.order.estimast.view.EstiMastWorkerEditor3',
		'module.workshop.sale.order.estimast.view.EstiMastWorkerEditor4',
		'module.workshop.sale.order.estimast.view.EstiMastWorkerSearch',
		'module.workshop.sale.order.estimast.view.EstiMastWorkerLister',
		'module.workshop.sale.order.estimast.view.EstiMastCopyPopup',
		'module.workshop.sale.order.estimast.view.EstiMastConsultingPopup',
		'module.workshop.sale.order.estimast.view.EstiMastEditor',
		'module.workshop.sale.order.estimast.view.EstiMastItem1',
		'module.workshop.sale.order.estimast.view.EstiMastItem2',
		'module.workshop.sale.order.estimast.view.EstiMastSubItem',
		'module.workshop.sale.order.estimast.view.EstiMastMainItem',
		'module.workshop.sale.order.estimast.view.EstiMastShetItem',
		'module.workshop.sale.order.estimast.view.EstiMastPopup',
		'module.workshop.sale.order.estimast.view.EstiMastFilePopup',
		'module.workshop.sale.order.estimast.view.ItemPopup',
		'module.workshop.sale.order.estimast.view.EstiMastTree',
		'module.workshop.sale.order.estimast.view.EstiMastImage',
		'module.workshop.sale.order.estimast.view.EstiMastImage2',
		/*BOM LIST*/
		'module.workshop.sale.order.estimast.view.EstiMastBomListMaster',
		'module.workshop.sale.order.estimast.view.EstiMastBomListDetail',
		'module.workshop.sale.order.estimast.view.EstiMastListerExcel',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-estimast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-estimast-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-estimast-layout button[action=enrollment]'						: { click : me.enrollment         }, //1건등록(<)
			'module-estimast-layout button[action=remove]'							: {	click : me.remove             }, //1건삭제(>)

//			'module-estimast-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 수주복사 */
			'module-estimast-lister-master menuitem[action=cofmAction]'				: { click : me.cofmAction         }, /* 수주확정 */
			'module-estimast-lister-master menuitem[action=cofmCancelAction]'		: { click : me.cofmCancelAction   }, /* 확정취소 */
			'module-estimast-lister-master button[action=insertAction]'				: { click : me.insertAction       }, /* 등록 */
			'module-estimast-lister-master button[action=modifyAction]'				: { click : me.modifyAction       }, /* 수정 */
			'module-estimast-lister-master button[action=exportAction]'				: { click : me.exportAction       }, /* 엑셀 */
			'module-estimast-lister-master button[action=deleteAction]'				: { click : me.deleteAction       }, /* 삭제 */
			'module-estimast-lister-master button[action=osttAction]'				: { click : me.osttAction         }, /* 출고 */
			'module-estimast-lister-master button[action=uploadAction]'				: { click : me.excelUploadAction  },
			'module-estimast-lister-master button[action=pasteUploadAction]'		: { click : me.pasteUploadAction  }, /* 엑셀 붙여 넣기 액션 */

			'module-estimast-lister-detail button[action=exportAction]'				: { click : me.exportAction       }, // 엑셀

			'module-estimast-worker-lister button[action=updateAction]'				: { click : me.updateAction2      }, /* 저장 */

			'module-estimast-editor button[action=cancelAction]'					: { click : me.cancelAction2      }, // 취소
			'module-estimast-editor button[action=updateAction]'					: { click : me.updateAction       }, // 저장

			'module-estimast-lister-shetItem button[action=cancelAction]'			: { click : me.cancelAction3      }, // 취소
			'module-estimast-lister-shetItem button[action=updateAction]'			: { click : me.updateAction3      }, // 저장

			'module-estimast-lister-subItem button[action=cancelAction]'			: { click : me.cancelAction4      }, // 취소
			'module-estimast-lister-subItem button[action=updateAction]'			: { click : me.updateAction4      }, // 저장

			'module-estimast-lister-mainItem button[action=cancelAction]'			: { click : me.cancelAction5      }, // 취소
			'module-estimast-lister-mainItem button[action=updateAction]'			: { click : me.updateAction5      }, // 저장


			'module-estimast-tree button[action=cancelAction]'						: { click : me.cancelAction       }, /* 취소 */
			'module-estimast-tree button[action=excelUploadAction]'					: { click : me.excelUploadAction  }, /* 엑셀업로드 */
			'module-estimast-tree button[action=exportAction]'						: { click : me.treeExportAction       }, // tree엑셀

			'module-estimast-tree'		: {
//				selectionchange	: me.selectImage,
			},


			'module-estimast-lister-master '		: {
				selectionchange	: me.selectDetail,
			},
			'module-estimast-bomlistmaster '		: {
				selectionchange	: me.selectBomMaster,
			},
			'module-estimast-layout #mainpanel'							: {
				tabchange :  me.mainTabChange
			}, //1건삭제(>)
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estimast-layout')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-estimast-editor')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estimast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor2')[0] },
			editor3 : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor3')[0] },
			editor4 : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor4')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estimast-worker-lister')[0] },
			search : function () { return Ext.ComponentQuery.query('module-estimast-worker-search')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-estimast-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail')[0] },
			item1   : function () { return Ext.ComponentQuery.query('module-estimast-lister-item1')[0] },
			wkct    : function () { return Ext.ComponentQuery.query('module-estimast-lister-item2')[0] },
			shet    : function () { return Ext.ComponentQuery.query('module-estimast-lister-shetItem')[0] },
			item2   : function () { return Ext.ComponentQuery.query('module-estimast-lister-subItem')[0] },
			item3   : function () { return Ext.ComponentQuery.query('module-estimast-lister-mainItem')[0] },
			image   : function () { return Ext.ComponentQuery.query('module-estimast-image')[0] },
			image2  : function () { return Ext.ComponentQuery.query('module-estimast-image2')[0] },
			tree    : function () { return Ext.ComponentQuery.query('module-estimast-tree')[0] },
			excel    : function () { return Ext.ComponentQuery.query('module-estimast-lister-excel')[0] }
		},
		bomlistmaster : function() { return Ext.ComponentQuery.query('module-estimast-bomlistmaster')[0] },
		bomlistdetail : function() { return Ext.ComponentQuery.query('module-estimast-bomlistdetail')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-estimast-copy-popup')[0] },
		file  : function () { return Ext.ComponentQuery.query('module-estimast-file')[0] },
		consultingpopup	: function () { return Ext.ComponentQuery.query('module-estimast-consulting-popup')[0] },
	},

	printAction:function(callbackFn){
		var me = this,
			lister = '',
			record = '',
			check = '1',
			resId = _global.hq_id.toUpperCase(),
			dvcd  = '',
			jrf = 'hjsys_draw.jrf'
		;
		if(callbackFn.itemId=='masterPrint'){
			lister	= me.pocket.lister.master();
			dvcd	= '@';
		}else if(callbackFn.itemId=='treePrint'){
			lister = me.pocket.lister.tree();
			dvcd	= 'on';
		}else if(callbackFn.itemId=='detailPrint'){
			lister = me.pocket.lister.master();
			dvcd	= 'pror';
		}
		record = lister.getSelectionModel().getSelection();
		if(record.length > 0){
			var a = "";
			for(var i =0; i< record.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			var _param = '_param~{\'dvcd\':\''+dvcd+'\',\'path\':\''+_global.img_http+'\',\'records\':'+a+'}~';
			var arg = _param;
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
			return;
		}else{
			Ext.Msg.alert("알림", "수주를 선택하여 주십시오.");
		}
	},


	mainTabChange : function(tabPanel, newCard, oldCard){
		var me				= this,
			tindex			= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			bomlistmaster	= me.pocket.bomlistmaster(),
			bomlistdetail	= me.pocket.bomlistdetail(),
			record			= me.pocket.search().getValues()
		;

		if( tindex == 1 ){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			bomlistmaster.getStore().load({
				params: {
					param : JSON.stringify({
						hq_id		: _global.hqof_idcd ,
						cstm_idcd	: (record.cstm_idcd ?record.cstm_idcd :''),
						invc_date1	: (record.invc_date1?record.invc_date1:''),
						invc_date2	: (record.invc_date2?record.invc_date2:''),
						item_idcd	: (record.item_idcd ?record.item_idcd :''),
						line_clos	: (record.line_clos ?record.line_clos :''),
						find_name	: (record.find_name ?record.find_name :''),
						drtr_idcd	: (record.drtr_idcd ?record.drtr_idcd :''),
						deli_date1	: (record.deli_date1?record.deli_date1:''),
						deli_date2	: (record.deli_date2?record.deli_date2:'')
					}),
				}
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						bomlistmaster.getRootNode().expand();
						bomlistdetail.getRootNode().removeAll();
					} else {
					}
					mask.hide();
				}
			});
		}else{
			bomlistmaster.getRootNode().removeAll();
			bomlistdetail.getRootNode().removeAll();
		}
	},

	//수주확정
	cofmAction:function() {
		var me = this,
		master = me.pocket.lister.master(),
		select = master.getSelectionModel().getSelection(),
		count  = 0
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") == "1") {
					count++;
				}
			});

			if(count > 0){
				if(select.length == 1){
					err_msg = "이미 확정되었습니다.";
				}else{
					err_msg = "이미 확정된 건이 포함되어 있습니다.";
				}
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}



		} else {
			Ext.Msg.alert("알림", "수주확정할 견적을 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 확정하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/workshop/sale/order/estimast/set/cofm.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										cofm_yorn		: '1',
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


	//수주확정취소
	cofmCancelAction:function() {
		var me = this,
		master = me.pocket.lister.master(),
		store  = master.getStore(),
		select = master.getSelectionModel().getSelection(),
		count  = 0
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") != "1") {
					err_msg = "견적번호 [ <span style='color:red;'>"+record.get('invc_numb')+"</span> ]</br> 확정되지 않은 견적은 확정 취소할 수 없습니다.";
					return false;
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 확정취소할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 확정취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/workshop/sale/order/estimast/set/cofmcancel.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										cofm_yorn		: '0',
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


	selectAction:function(callbackFn) {
		var me			= this,
			editor		= this.pocket.worker.editor(),
			lister		= me.pocket.lister.master(),
			detail		= me.pocket.lister.detail(),
			store		= lister.getStore()
			selection	= lister.getSelectionModel().getSelection()[0],
			index		= store.indexOf(selection),
			tabPanel	= me.pocket.layout().down('[itemId=mainpanel]'),
			tindex		= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			record		= me.pocket.search().getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(record));
	},

	selectDetail:function() {
		var me = this,
			lister = me.pocket.lister.detail(),
			master = me.pocket.lister.master(),
			editor = me.pocket.editor(),
			select = master.getSelectionModel().getSelection()[0]
			file = me.pocket.file(),
			record = lister.getSelectionModel().getSelection()[0]
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		if(select){
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, { stor_grp : _global.stor_id , invc_numb : select.data.invc_numb});
		}

	},
	selectBomMaster:function() {
		var	me				= this,
			bomlistmaster	= me.pocket.bomlistmaster(),
			bomlistdetail	= me.pocket.bomlistdetail(),
			select			= bomlistmaster.getSelectionModel().getSelection()[0]
		;
		if(select){
			bomlistdetail.getStore().load({
				params:{
					param : JSON.stringify({
						invc_numb : select.get('invc_numb'),
						item_idcd : select.get('item_idcd')
					})
				}
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						bomlistdetail.getRootNode().expand();
					} else {
					}
				}
			});
		}
	},
	//수정
	modifyAction:function() {
		var me = this,
			listermaster = me.pocket.lister.master(),
			select       = listermaster.getSelectionModel().getSelection()[0],
			mrecord      = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			editor       = me.pocket.editor()
			paylister    = me.pocket.worker.lister(),
			lister       = me.pocket.lister.detail()
		;
		editor.down('[name=cstm_name]').setReadOnly(true);
//		editor.down('[name=invc_date]').setReadOnly(true);
		editor.selectRecord({ lister : listermaster, record : mrecord }, me);
		editor.modifyRecord({
			caller   : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				if (results.success){
					lister.getStore().clearData();
					lister.getStore().loadData([],false);
					results.feedback({success : true});
				}
			},
			finished : function(results, record){
				if (results.success){
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/hjsys/sale/order/estimast/set/qnttUpdate',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								invc_numb	: select.get('invc_numb'),
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
								if(result.records[0].count > 0){
									Ext.Msg.alert("알림","이미 등록된 도번입니다.");
									 check = 0;
									return;
								}
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});

					me.pocket.layout().down('#master').setDisabled(true);
					me.pocket.layout().down('#detail').setDisabled(true);
					me.pocket.search().setDisabled(true);
					editor.expand(false);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search        = me.pocket.search(),
			lister        = me.pocket.lister.master(),
//			paylister     = me.pocket.worker.lister(),
			editor        = me.pocket.editor(),
			param         = search.getValues()
//			mrecord       = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		editor.down('[name=cstm_name]').setReadOnly(false);
		editor.down('[name=invc_date]').setReadOnly(false);
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'prnt_ordr_mast'
					})
				}
			},

			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
					action : Const.EDITOR.DEFAULT,
					record : Ext.create( lister.getStore().model.modelName,{
						invc_numb	: keygen.records[0].seq,
						emp_id		: _global.emp_id,
						emp_nm		: _global.emp_nm
					}),
					callback: function (results){
						if (results.success) {
							me.pocket.layout().down('#master').setDisabled(true);
							me.pocket.layout().down('#detail').setDisabled(true);
							me.pocket.search().setDisabled(true);
							editor.expand(false);
							setTimeout(function(){
//								editor.down('[name=dlvy_cstm_name]').focus(true , 10);
							},200);
							results.feedback({success : true});
						}
					},
					finished : function(results, record){
					}
				})
				}
			}
		});
//		editor.down('[name=cstm_name]').setReadOnly(false);
//		editor.down('[name=invc_date]').setReadOnly(false);
//		editor.insertRecord({
//			action : Const.EDITOR.DEFAULT,
//			record : Ext.create( listermaster.getStore().model.modelName,{
//				emp_id		: _global.emp_id,
//				emp_nm		: _global.emp_nm
//			}),
//			callback: function (results){
//				if (results.success) {
//					me.pocket.layout().down('#master').setDisabled(true);
//					me.pocket.layout().down('#detail').setDisabled(true);
//					me.pocket.search().setDisabled(true);
//					editor.expand(false);
//					setTimeout(function(){
////						editor.down('[name=dlvy_cstm_name]').focus(true , 10);
//					},200);
//					results.feedback({success : true});
//				}
//			},
//			finished : function(results, record){
//			}
//		})
	},

	// master 저장
	updateAction:function() {
		var me = this,
			editor	= me.pocket.editor(),
			master	= me.pocket.lister.master(),
			store	= master.getStore(),
			lister	= me.pocket.lister.detail(),
			records	= editor.getRecord(),
			invc_numb, line_seqn, line_ordr,
			select	= master.getSelectionModel().getSelection()[0],
			values	= editor.getForm().getValues(),
			row = store.indexOf(select)
		;


		invc_numb = editor.getForm().getValues().invc_numb;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			callback : function(results, record ) {
				if (results.success) {
					store.each(function(findrecord){
						findrecord.set('mtrl_seqn',line_seqn);
					});
					store.sync({
						success : function(operation){
							lister.getStore().clearData();
							lister.getStore().loadData([],false);
							me.selectAction();
							me.pocket.layout().down('#mainpanel').setDisabled(false);
							me.pocket.layout().down('#master').setDisabled(false);
							me.pocket.layout().down('#detail').setDisabled(false);
							me.pocket.search().setDisabled(false);
							editor.getForm().reset();
							editor.collapse(false);
								switch (operation) {
								}

							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });
						},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
				}
			}
		});

	},

	//worker
	updateAction2:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			changes= lister.getStore().getUpdatedRecords().length,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			store  = lister.getStore(),
			check=1, count = 0, str = ''
		;
		store.each(function(findrecord){
			if(findrecord.get('drwg_numb') == null || findrecord.get('drwg_numb') == ''){
				Ext.Msg.alert("알림","도번을 입력하여 주십시오.");
				check = 0;
			}
			if(findrecord.get('revs_numb') == null || findrecord.get('revs_numb') == ''){
				Ext.Msg.alert("알림","revision 번호를 입력하여 주십시오.");
				check = 0;
			}
			if(findrecord.get('item_name') == null || findrecord.get('item_name') == ''){
				Ext.Msg.alert("알림","품명을 입력하여 주십시오.");
				check = 0;
			}
			if(findrecord.get('invc_qntt') < 0 || findrecord.get('invc_qntt') == ''){
				Ext.Msg.alert("알림","품목수주량을 확인하여 주십시오.");
				check = 0;
			}
			if(findrecord.get('mtrl_name')!=''){
				if(findrecord.get('mtrl_idcd')== ''){
					Ext.Msg.alert("알림","등록되지 않은 원자재가 있습니다. 확인하여 주십시오.");
					check = 0;
				}
			}

			if(str==findrecord.get('drwg_numb').concat(findrecord.get('revs_numb'))){
				count += 1;
			}
			str = findrecord.get('drwg_numb').concat(findrecord.get('revs_numb'));

			});

//			if(count > 1){
//				Ext.Msg.alert("알림","도번이 중복됩니다.");
//			}
			if(check==1 && count <= 1){
//				Ext.Ajax.request({
//					url		: _global.location.http() + '/custom/hjsys/sale/order/estimast/get/drwg.do',
//					params	: {
//						token : _global.token_id,
//						param : JSON.stringify({
//							drwg_numb	: findrecord.get('drwg_numb'),
//							revs_numb	: findrecord.get('revs_numb'),
//						})
//					},
//					async	: false,
//					method	: 'POST',
//					success	: function(response, request) {
//						var result = Ext.decode(response.responseText);
//						if	(!result.success ){
//							Ext.Msg.error(result.message );
//							return;
//						} else {
//							if(result.records[0].count > 0){
//								Ext.Msg.alert("알림","이미 등록된 도번입니다.");
//								 check = 0;
//								return;
//							}
//						}
//					},
//					failure : function(result, request) {
//					},
//					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//					}
//				});

//				check 1 일떄만
				// update

				editor.updateRecord({
					caller	: me,
					action	: 'invoice',
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

									me.pocket.layout().getLayout().setActiveItem(0);
									master.getStore().reload();
									results.feedback({success : true  });
								}, /* 저장 성공시 */
								failure : function(operation){ results.feedback({success : false });},
								callback: function(operation){ results.callback({}); }
							});
						}
					Ext.ComponentQuery.query('module-estimast-worker-search')[0].getForm().reset();
					}
				});
			}
	},

	//item1
	updateAction3:function() {
		var me = this,
			lister  = me.pocket.lister.shet(),
			editor  = me.pocket.worker.editor2(),
			store   = lister.getStore(),
			field   = editor.getForm().getValues(),
			tree    = me.pocket.lister.tree(),
			changes = store.getNewRecords().length,
			removes = store.getRemovedRecords().length,
			check=1
		;
//		if (changes == 0 && removes == 0) {
//			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
//		}else {
			if(check==1){
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.INSERT.mask });
				mask.show();
				lister.getStore().sync({
					success : function(operation){
//					tree.getStore().reload();
					me.pocket.layout().getLayout().setActiveItem(window.tabActive);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
					}
				});
			}
//		}

	},

	//후가공
	updateAction4:function() {
		var me = this,
			lister  = me.pocket.lister.item2(),
			store   = lister.getStore(),
			tree    = me.pocket.lister.tree(),
			changes = store.getNewRecords().length,
			removes = store.getRemovedRecords().length,
			check=1
		;

			if(check==1){
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.INSERT.mask });
				mask.show();
				lister.getStore().sync({
					success : function(operation){
					me.pocket.layout().getLayout().setActiveItem(window.tabActive);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
					}
				});
			}
//		}
	},

	//간지
	updateAction5:function() {
		var me = this,
			lister  = me.pocket.lister.item3(),
			tree    = me.pocket.lister.tree(),
			store   = lister.getStore(),
//			change  = store.getStore().data.items,
			changes = lister.getStore().getNewRecords().length,
			removes = lister.getStore().getRemovedRecords().length,
			check=1
		;

			if(check==1){
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.INSERT.mask });
				mask.show();
				lister.getStore().sync({
					success : function(operation){
					me.pocket.layout().getLayout().setActiveItem(window.tabActive);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
					}
				});
			}
	},
	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup(),
			records = master.getSelectionModel().getSelection(),
			new_invc_numb= ''
		;
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/hjsys/sale/order/estimast/get/invc.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'acpt_mast',
					cstm_idcd	: records[0].get('cstm_idcd'),
					invc_date	: Ext.Date.format(new Date(),'Ymd'),
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				console.log(result);
				new_invc_numb = result.records[0].invc_numb;
			}
		});
		resource.loadPopup({
			widget : 'module-estimast-copy-popup',
			params : {
				new_invc_numb : new_invc_numb,
				invc_numb : records[0].get('invc_numb'),
				cstm_name : records[0].get('cstm_name'),
			}
		});
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			record = []
		;
		if(!select){
			Ext.Msg.alert("알림","출고지시 할 수주를 선택해주십시오.");
		}else{
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
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
						}
					});
					var x = 1;
//					for (var i = 0; i < select.length; i++) {
						record.push({
							new_invc_numb : new_invc_numb,
							new_line_seqn : x,
							invc_numb : select.data.invc_numb,
							line_seqn : select.data.line_seqn,
							invc_date : Ext.util.Format.date(new Date(),'Ymd'),
							bzpl_idcd : select.data.bzpl_idcd,
							cstm_idcd : select.data.cstm_idcd,
							drtr_idcd : select.data.drtr_idcd,
							dept_idcd : select.data.dept_idcd,
							deli_date : Ext.util.Format.date(select.data.deli_date,'Ymd'),
							item_idcd : select.data.item_idcd,
							sale_pric : select.data.sale_pric,
							ostt_qntt : select.data.acpt_qntt,
							sale_amnt : select.data.invc_pric,
							ttsm_amnt : select.data.invc_amnt,
							pcod_numb : select.data.pcod_numb,
							updt_idcd : select.data.updt_idcd,
							crte_idcd : select.data.crte_idcd,
							dlvy_cstm_idcd : select.data.dlvy_cstm_idcd
						})
						x++;
					return;
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/stps.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd,
								records			: record
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							me.pocket.lister.master().getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
						}
					});
				}
			});
		}
	},

	// worker 취소
	cancelAction:function() {
		var me = this;
//			detail = me.pocket.lister.detail()
		;
		me.pocket.layout().getLayout().setActiveItem(0);
//		detail.getStore().reload();
	},

	//master 취소
	cancelAction2:function() {
		var me = this,
			editor = me.pocket.editor(),
			listermaster = me.pocket.lister.master()
		;
		editor.cancelRecord({
			caller : me,
			action   : Const.EDITOR.DEFAULT ,
			callback : function( results ) {
				editor.getForm().reset(true);
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.layout().down('#master').setDisabled(false);
				me.pocket.layout().down('#detail').setDisabled(false);
				me.pocket.search().setDisabled(false);
				results.feedback( {success : true, visible : true, selectDetail : false });
			},
			finished : function(results){
				if (results.success){
					editor.collapse(false);
				}
			}
		}, me);
	},

	//공정 취소
	cancelAction3:function() {
		var	me		= this,
			lister	= me.pocket.lister.shet()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		me.pocket.layout().getLayout().setActiveItem(window.tabActive);
	},

	// 부자재 취소
	cancelAction4:function() {
		var	me		= this,
			lister	= me.pocket.lister.item2()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		me.pocket.layout().getLayout().setActiveItem(window.tabActive);
	},
	// 원자재 취소
	cancelAction5:function() {
		var	me = this,
			lister	= me.pocket.lister.item3()
		;
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		me.pocket.layout().getLayout().setActiveItem(window.tabActive);
	},
	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore()
			err_msg = "",
			records = master.getSelectionModel().getSelection()
		;
		if (!records || records.length <= 0) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오.");
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
				Ext.each(records, function(record) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/workshop/sale/order/estimast/set/Masterdelete.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
								hqof_idcd	: _global.hq_id
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								Ext.each(records, function(record) {
									store.remove(record);
								});
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
						}
					});
				});
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
			editor	= me.pocket.worker.editor();
			tree	= me.pocket.lister.tree()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'file-upload-popup',
//			sample : {
//				xtype	: 'button' ,
//				text	: '엑셀양식 받기' ,
//				iconCls	: Const.FINISH.icon ,
//				href	: 'resource/sample/' + Const.UPLOAD.SAMPLE.ITEM
//			},
			apiurl : {
				upload : _global.location.href + '/system/custom/hjsys/sale/order/estimast/excel.do', // url (필수)
			},
			params : {
				table_nm	: 'mtrl_need',
				invc_numb	: editor.getForm().getValues().invc_numb,
			},
			title			: '품목등록 엑셀 Upload',				// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					tree.getStore().reload();
				}
			}
		});
	},

	exportAction : function(self) {
		var me = this,
			lister;
		if(self.itemId=='detail'){
			lister = me.pocket.lister.detail();
		}else{
			lister = me.pocket.lister.master();
		}
		lister.writer({enableLoadMask:true});
	},
	//TODO treeExport
	treeExportAction: function(self) {
		var me = this,
			lister = me.pocket.lister.excel(),
			editor = me.pocket.worker.editor(),
			invc_numb = editor.getForm().getValues().invc_numb
		;

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.writer({enableLoadMask:true});
				} else {}
			}, scope:me
		}, { stor_grp : _global.stor_id , invc_numb :invc_numb});
	},

	// < enrollment
//	enrollment:function() {
//		var me			= this,
//			record		= new Array(),
//			seqn		= Number(0),
//			item1		= me.pocket.lister.item1(),
//			item2		= me.pocket.lister.wkct(),
//			store		= item1.getStore(),
//			store2		= item2.getStore(),
//			selects		= item2.getSelectionModel().getSelection(),
//			editor		= me.pocket.worker.editor2(),
//			values		= editor.getForm().getValues()
//		;
//		if (!selects || selects.length <= 0) {
//			Ext.Msg.alert("알림", "추가할 공정을 선택하여 주십시오.");
//			return;
//		};
//		if(store.data.items.length >0){
//			seqn = Number(store.data.items[store.data.items.length-1].data.line_seqn)+1;
//		}else{
//			seqn = 1;
//		}
//		var seqnArray = new Array();
//		for (var int = 0; int < selects.length; int++) {
//			seqnArray[int] = seqn++;
//		}
//		var i = 0;
//		if(store.data.items.length >0){
//			seqn2 = store.data.items.length+1;
//		}else{
//			seqn2 = 1;
//		}
//		console.log(values.cstm_idcd);
//		for( i = 0; i<selects.length; i++){
//		record[i] = Ext.create( store.model.modelName , {
//			_set			: 'insert',
//			line_seqn		: seqnArray[i],
//			wkfw_seqn		: seqn2++,
//			wkct_idcd		: selects[i].get('wkct_idcd'),
//			wkct_name		: selects[i].get('wkct_name'),
//			wkct_code		: selects[i].get('wkct_code'),
//			wkct_insp_yorn	: selects[i].get('wkct_insp_yorn'),
//			last_insp_yorn	: selects[i].get('last_insp_yorn'),
//			aftr_wkct_ordr	: selects[i].get('aftr_wkct_ordr'),
//			indn_qntt		: values.need_qntt,
//			new_invc_numb	: values.invc_numb+'-'+values.line_seqn,
//			acpt_numb		: values.invc_numb,
//			acpt_seqn		: values.line_seqn,
//			acpt_amnd_degr	: 1,
//			cstm_idcd		: values.cstm_idcd,
//			item_idcd		: values.item_idcd,
//			line_stat		: '0',
//			modify			: 'Y'
//			});
//		}
//		store.add(record);
//		store.flush();
//		store2.remove(selects);
//		store2.sort('wkct_code', 'ASC');
//	},
//
//	// > remove
//	remove : function() {
//		var me = this,
//			item1		= me.pocket.lister.item1(),
//			item2		= me.pocket.lister.wkct(),
//			store		= item1.getStore(),
//			store2		= item2.getStore(),
//			selects		= item1.getSelectionModel().getSelection(),
//			i = 1
//		;
//		store.remove (selects);
//		store.each(function(findrecord){
//			findrecord.set('wkfw_seqn', i++);
//		});
//
//		store2.add(selects);
//		store2.sort('wkct_code', 'ASC');
//
//	},
//
//	test:function(){
//		var me = this;
//		resource.loadPopup({
//			widget : 'lookup-board-dxfconvert',
//		});
//	},

	osttAction:function(){
		var	me      = this,
			lister  = me.pocket.lister.master(),
			selects = lister.getSelectionModel().getSelection()
		;
		var arr = new Array();
		if(selects[0]){
			Ext.each(selects,function(record){
				arr.push({'invc_numb':record.get('invc_numb')})
			});

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hjsys/sale/order/estimast/set/ostt.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						records			: arr
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						lister.getStore().reload();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	}
});
