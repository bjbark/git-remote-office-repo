
Ext.define('module.qc.insp.inspentry3.InspEntry3', { extend : 'Axt.app.Controller',

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
		'module.qc.insp.inspentry3.model.InspEntry3Invoice',
		'module.qc.insp.inspentry3.model.InspEntry3Master',
		'module.qc.insp.inspentry3.model.InspEntry3Detail',
		'module.qc.insp.inspentry3.model.InspEntry3Master2',
		'module.qc.insp.inspentry3.model.InspEntry3Detail2',

	],
	stores:[
		'module.qc.insp.inspentry3.store.InspEntry3Invoice',
		'module.qc.insp.inspentry3.store.InspEntry3Master',
		'module.qc.insp.inspentry3.store.InspEntry3Detail',
		'module.qc.insp.inspentry3.store.InspEntry3Master2',
		'module.qc.insp.inspentry3.store.InspEntry3Detail2',

	],
	views : [
		'module.qc.insp.inspentry3.view.InspEntry3Layout',
		/* 현황 */
		'module.qc.insp.inspentry3.view.InspEntry3Search',
		'module.qc.insp.inspentry3.view.InspEntry3ListerMaster',
		'module.qc.insp.inspentry3.view.InspEntry3ListerDetail',
		'module.qc.insp.inspentry3.view.InspEntry3Lister2Master',
		'module.qc.insp.inspentry3.view.InspEntry3Lister2Detail',
		/* 작업 */
		'module.qc.insp.inspentry3.view.InspEntry3WorkerEditor',
		'module.qc.insp.inspentry3.view.InspEntry3WorkerSearch',
		'module.qc.insp.inspentry3.view.InspEntry3WorkerLister',
		'module.qc.insp.inspentry3.view.InspEntry3Popup'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-inspentry3-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-inspentry3-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-inspentry3-lister-master button[action=etcPrintAction]'),  Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-inspentry3-layout #mainpanel'									: { tabchange : me.selectAction },
			'module-inspentry3-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */

			'module-inspentry3-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction			}, /* 마감 */
			'module-inspentry3-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction	}, /* 마감해지 */

			'module-inspentry3-lister-master button[action=exportAction]'			: { click : me.exportAction			}, /* 엑셀 */

			'module-inspentry3-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction	}, /* 엑셀 */
			'module-inspentry3-lister-detail button[action=passAction]'				: { click : me.passAction			}, /* 입고 */
			'module-inspentry3-lister-detail button[action=inspAction]'				: { click : me.inspAction 			}, /* 검사성적 입력 */

			'module-inspentry3-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-inspentry3-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */
			'module-inspentry3-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-inspentry3-lister2-master button[action=exportAction]'			: { click : me.exportAction			}, /* 엑셀 */
			'module-inspentry3-lister2-detail button[action=exportAction]'			: { click : me.exportDetailAction	}, /* 엑셀 */
			'module-inspentry3-lister2-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inspentry3-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry3-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-inspentry3-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-inspentry3-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-inspentry3-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-inspentry3-lister-detail')[0] }
		},
		lister2 : {
			master  : function () { return Ext.ComponentQuery.query('module-inspentry3-lister2-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-inspentry3-lister2-detail')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-insp-entry')[0] }

	},

	inspAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			detail = me.pocket.lister.detail()
			popup  = me.pocket.popup()
		;
		var err_msg		= "";
		var mrecords	= master.getSelectionModel().getSelection();
		var records		= detail.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "검사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-inspentry3-popup',
			param  : {
				istt_qntt : records[0].data.istt_qntt
			},
			result : function (records) {
					me.selectAction();
				}
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.line_seqn);
		Ext.ComponentQuery.query('#cstm_name')[0].setValue(mrecords[0].data.cstm_name);
		Ext.ComponentQuery.query('#item_idcd')[0].setValue(records[0].data.item_idcd);
		Ext.ComponentQuery.query('#item_code')[0].setValue(records[0].data.item_code);
		Ext.ComponentQuery.query('#item_name')[0].setValue(records[0].data.item_name);
		Ext.ComponentQuery.query('#item_spec')[0].setValue(records[0].data.item_spec);
		Ext.ComponentQuery.query('#unit_idcd')[0].setValue(records[0].data.unit_idcd);
		Ext.ComponentQuery.query('#poor_qntt')[0].setValue(records[0].data.poor_qntt);
		Ext.ComponentQuery.query('#judt_dvcd')[0].setValue(records[0].data.judt_dvcd);
		Ext.ComponentQuery.query('#pass_qntt')[0].setValue(records[0].data.pass_qntt);
		Ext.ComponentQuery.query('#insp_qntt')[0].setValue(records[0].data.insp_qntt);
		Ext.ComponentQuery.query('#istt_qntt')[0].setValue(records[0].data.istt_qntt);
		Ext.ComponentQuery.query('#insp_mthd_dvcd')[0].setValue(records[0].data.insp_mthd_dvcd);
		Ext.ComponentQuery.query('#insp_drtr_name')[0].setValue(records[0].data.insp_drtr_name);
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
			Ext.Msg.alert("알림", "마감할 전표를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 전표를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
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
										table			: 'purc_istt_mast'
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
			Ext.Msg.show({ title: '확인', msg: '선택하신 출고를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
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
										table			: 'purc_istt_mast'
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
						})					}
				}
			});
		}
	},

	passAction:function() {
		var me = this,
			select = me.pocket.lister.detail().getSelectionModel().getSelection(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail().getSelectionModel().getSelection()
		;

		console.log(Ext.Date.format(new Date(),'Ymd'));

		if (select.length == 0) {
			Ext.Msg.alert("알림","전표를 선택해주십시오.");
		}else{
			Ext.Msg.confirm("확인", "합격처리를 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/qc/insp/inspentry3/set/pass.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: select[0].data.invc_numb,
									line_seqn		: select[0].data.line_seqn,
									istt_qntt		: select[0].data.istt_qntt,
									invc_date		: select[0].data.invc_date,
									insp_date		: Ext.Date.format(new Date(),'Ymd'),
									insp_drtr_idcd	: _global.login_pk,
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
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
									me.selectAction();
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
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			lister = undefined,
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = ''
		;
		if(tindex==0){
			lister = master;
			temp   = 'query';
		}else{
			lister = master2;
			temp   = 'entry';
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
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, query : temp, index : tindex }));
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
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			detail
		;
		if(tindex==0){
			detail =  me.pocket.lister.detail();
		}else{
			detail =  me.pocket.lister2.detail();
		}
		console.log(grid,record);
		if (record) {
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
			Ext.ComponentQuery.query('module-inspentry3-worker-search')[0].getForm().reset();
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
				Ext.ComponentQuery.query('module-inspentry3-worker-search')[0].getForm().reset();
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
					url			: _global.api_host_info + '/' + _global.app_site + '/stock/inspentry3/set/del_yn.do',
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
		if(self.itemId == 'lister'){
			this.pocket.lister.master().writer({enableLoadMask:true});
		}else{
			this.pocket.lister2.master().writer({enableLoadMask:true});
		}
	},
	exportDetailAction : function(self) {
		if(self.itemId == 'detail'){
			this.pocket.lister.detail().writer({enableLoadMask:true});
		}else{
			this.pocket.lister2.detail().writer({enableLoadMask:true});
		}
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
			url		: _global.api_host_info + '/system/recv/inspentry3/get/report.do',
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
					search		: _global.api_host_info + '/' + _global.app_site +'/stock/inspentry3/get/printing.do',
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
							search	: _global.api_host_info + '/' + _global.app_site +'/stock/inspentry3/get/printing.do',
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
