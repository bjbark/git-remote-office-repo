Ext.define('module.custom.iypkg.sale.order.estimast1.EstiMast1', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.FabcPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BxtyPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMastOrdrPopup'
	],

	models:[
		'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Invoice',
		'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Master',
		'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Detail',
		'module.custom.iypkg.sale.order.estimast1.model.EstiMast1File',
		'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Detail2',
	],
	stores:[
		'module.custom.iypkg.sale.order.estimast1.store.EstiMast1Invoice',
		'module.custom.iypkg.sale.order.estimast1.store.EstiMast1Master',
		'module.custom.iypkg.sale.order.estimast1.store.EstiMast1Detail',
		'module.custom.iypkg.sale.order.estimast1.store.EstiMast1Detail2',
		'module.custom.iypkg.sale.order.estimast1.store.EstiMast1File',
	],
	views : [
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1Layout',
		/* 현황 */
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1Search',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1ListerMaster',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1ListerDetail',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1ListerDetail2',
		/* 작업 */
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1WorkerEditor',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1WorkerSearch',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1WorkerLister',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1Lister2',
		'module.custom.iypkg.sale.order.estimast1.view.EstiMast1CopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-estimast1-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast1-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-estimast1-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-estimast1-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-estimast1-lister-master menuitem[action=closeActiveAction]'		: { click : me.closeAction        }, /* 마감 */
			'module-estimast1-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeAction        }, /* 마감취소 */
			'module-estimast1-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-estimast1-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-estimast1-lister-master button[action=closeAction]'				: { click : me.closeAction        }, /* 마감 */
			'module-estimast1-lister-master button[action=amendAction]'				: { click : me.amendAction        }, /* amend */
			'module-estimast1-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 견적복사 */
			'module-estimast1-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 견적등록 */
			'module-estimast1-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-estimast1-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-estimast1-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-estimast1-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-estimast1-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-estimast1-lister-master button[action=printAction]'				: { click : me.printAction        }, /* 견적서발행 */

			'module-estimast1-lister-detail2 button[action=exportAction]'			: { click : me.exportDetailAction2 }, /* 엑셀 */

			'module-estimast1-worker-lister button[action=deleteAction]	'			: { click : me.deleteAction2      }, /* 디테일삭제 */

			'module-estimast1-worker-lister button[action=updateAction]'			: { click : me.updateAction       }, /* 저장 */
			'module-estimast1-worker-lister button[action=cancelAction]'			: { click : me.cancelAction       }, /* 취소 */
			'module-estimast1-lister-master' : {
				selectionchange : me.selectDetail
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estimast1-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estimast1-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estimast1-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estimast1-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-estimast1-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-estimast1-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-estimast1-lister-detail2')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-estimast1-copy-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-estimast1-lister2')[0] }
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			lister		= me.pocket.lister(),
			tindex		= tabPanel.items.indexOf(newCard),
			isos		= me.pocket.isos(),
			rett		= me.pocket.rett(),
			order		= me.pocket.order(),
			visit		= me.pocket.visit(),
			records		= lister.getSelectionModel().getSelection()
		;
		if (tindex == 1) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "주문내역을 조회할 거래처를  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var param = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				cstm_idcd		: records[0].get('cstm_idcd'),
				to_date			: me.getFormatDate(new Date()),
				fr_date			: me.getFormatDate(new Date(new Date().setMonth(new Date().getMonth()-1))),
				job_dvcd		: 'cstm'
			})
			order.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}) );
		}
		else if (tindex == 2) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "수불내역을 조회할 거래처를  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			var param = JSON.stringify({
				stor_id			: _global.stor_id,
				hqof_idcd		: _global.hqof_idcd,
				cstm_idcd		: records[0].get('cstm_idcd'),
				to_date			: me.getFormatDate(new Date()),
				fr_date			: me.getFormatDate(new Date(new Date().setMonth(new Date().getMonth()-1))),
				job_dvcd		: 'cstm'
			})
			isos.select({
				callback : function(records, operation, success) {
					if (success) {
						isos.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {param : param },{stor_id : _global.stor_id}) );
		}
		else if (tindex == 3) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "반품내역을 조회할 거래처를  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			rett.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}, {}) );
		}else if (tindex == 4) {
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "방문일지를 조회할 거래처를  선택하여 주십시오.");
				tabPanel.setActiveTab(0);
				return;
			}
			visit.select({
				callback : function(records, operation, success) {
					if (success) {
						rett.getSelectionModel().select(0);
					} else {
					}
				}, scope:me
			}, Ext.merge( {cstm_idcd : records[0].get('cstm_idcd')},{stor_id : _global.stor_id}, {}) );
		}
	},

	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;
		console.log('test');
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
//							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/iypkg/sale/order/estimast1/set/close.do',
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
								url		: _global.location.http() + '/custom/iypkg/sale/order/estimast1/set/close.do',
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
			lister	= me.pocket.lister.master(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			store = lister.getStore(),
			selection = lister.getSelectionModel().getSelection()[0],
			index = store.indexOf(selection)
		;

		if(index == -1){
			index = 0;
		}

		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(index);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			lister2 = me.pocket.lister2(),
			workerlister = me.pocket.worker.lister()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

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
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].data.invc_numb ,orgn_dvcd : 'esti_mast' });
			lister2.down('[name=file]').popup.params.invc_numb = record[0].data.invc_numb;		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
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
			if (select.get('acpt_cofm_yorn') == '1') {
				Ext.Msg.alert("알림", "이미 주문등록이 완료된 건입니다.");
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

	amendAction:function() {
		var me = this,
			listermaster = me.pocket.lister.master(),
			listerdetail1 = me.pocket.lister.detail2(),
			select = listermaster.getSelectionModel().getSelection()[0]
		;
		console.log(select.get('invc_numb'))
		if(select){
			Ext.Msg.confirm("확인", "새로운 견적서를 작성하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast1/set/amend.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								stor_id		: _global.stor_id,
								invc_numb	: select.get('invc_numb'),
								amnd_degr	: select.get('amnd_degr'),
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							Ext.Msg.alert("알림","견적이 amend되었습니다.");
							listerdetail1.getStore().reload();
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							listermaster.getStore().loadData([],true);
							listerdetail1.getStore().loadData([],false);
							me.selectAction();
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","amend할 주문을 복사해주십시오.");
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
//		editor.getForm().reset();
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
					console.log(me.pocket.worker.lister(), 'seq');
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
			store3	= lister.getStore(),
			chk = 0
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
						console.log(item.data);
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.bxty_idcd == ''){
							Ext.Msg.alert("알림","상자형식을 확인하여 주십시오.");
							chk = 1;
						}
						if(item.data.esti_qntt == 0){
							Ext.Msg.alert("알림","수량을 확인하여 주십시오.");
							chk = 1;
						}
					});
					if (dirty) {
						info.setDirty();
					}
					if(chk == 1){
						results.feedback({failure : true  });
					}else{
						results.feedback({success : true  });
					}
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
//							detail.getStore().loadData(record.product().data.items, false);

//							detail.getStore().reload();
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
						callback: function(operation){ results.callback({}); },
						finished : function(results, record, operation){me.selectAction();}
					});
				}
			Ext.ComponentQuery.query('module-estimast1-worker-search')[0].getForm().reset();
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
			widget : 'module-estimast1-copy-popup',
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
			console.log(select);
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
				widget : 'module-estimast-ordr-popup',
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
				Ext.ComponentQuery.query('module-estimast1-worker-search')[0].getForm().reset();
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

		if (!records.length > 0) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
				if (record.get('acpt_cofm_yorn') == '1') {
					err_msg = "이미 주문등록이 완료된 건입니다.";
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/estimast1/set/del_yn.do',
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
			select = master.getSelectionModel().getSelection(),
			jrf = 'EstiReport.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			console.log(arg);
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	deleteAction2:function(){
		var me = this,
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;
		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					for (var i = 0; i < records.length; i++) {
						store.remove(records[i]);
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
					console.log(record.store,'record');
				}
			}
		});



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
