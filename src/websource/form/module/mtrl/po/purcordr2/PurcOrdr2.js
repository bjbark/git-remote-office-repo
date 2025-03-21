
Ext.define('module.mtrl.po.purcordr2.PurcOrdr2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.HntopItemPopup2'
	],

	models:[
		'module.mtrl.po.purcordr.model.PurcOrdr2Invoice',
		'module.mtrl.po.purcordr.model.PurcOrdr2Master',
		'module.mtrl.po.purcordr.model.PurcOrdr2Detail',
		'module.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister2',
		'module.mtrl.po.purcordr2.model.PurcOrdr2WorkerLister3',
		'module.mtrl.po.purcordr2.model.PurcOrdr2Popup2'
	],
	stores:[
		'module.mtrl.po.purcordr2.store.PurcOrdr2Invoice',
		'module.mtrl.po.purcordr2.store.PurcOrdr2Master',
		'module.mtrl.po.purcordr2.store.PurcOrdr2Detail',
		'module.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister2',
		'module.mtrl.po.purcordr2.store.PurcOrdr2WorkerLister3',
		'module.mtrl.po.purcordr2.store.PurcOrdr2Popup2'

	],
	views : [
		'module.mtrl.po.purcordr2.view.PurcOrdr2Layout',
		/* 현황 */
		'module.mtrl.po.purcordr2.view.PurcOrdr2Search',
		'module.mtrl.po.purcordr2.view.PurcOrdr2ListerMaster',
		'module.mtrl.po.purcordr2.view.PurcOrdr2ListerDetail',
		/* 작업 */
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerEditor',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerEditor2',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch2',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister2',
		'module.mtrl.po.purcordr2.view.PurcOrdr2WorkerLister3',
		'module.mtrl.po.purcordr2.view.PurcOrdr2Popup',
		'module.mtrl.po.purcordr2.view.PurcOrdr2Popup2',
		'module.mtrl.po.purcordr2.view.PurcOrdrAonePopup'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-purcordr2-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr2-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-purcordr2-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordr2-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */
			'module-purcordr2-worker-editor2 button[action=selectAction2]'		: { click : me.selectAction2      }, /* 조회2*/

			'module-purcordr2-lister-master menuitem[action=okAction]'			: { click : me.okAction           }, /* 승인 */
			'module-purcordr2-lister-master menuitem[action=okCancelAction]'	: { click : me.okCancelAction     }, /* 승인취소 */

			'module-purcordr2-lister-master button[action=insertAction]'		: { click : me.insertAction       }, /* 등록 */
			'module-purcordr2-lister-master button[action=modifyAction]'		: { click : me.modifyAction       }, /* 수정 */
			'module-purcordr2-lister-master button[action=exportAction]'		: { click : me.exportAction       }, /* 엑셀 */
			'module-purcordr2-lister-master button[action=deleteAction]'		: { click : me.deleteAction       }, /* 삭제 */
			'module-purcordr2-lister-master button[action=writeAction]'			: { click : me.PrintAction        }, /* 발주서발행*/
			'module-purcordr2-lister-master button[action=imptAction]'			: { click : me.imptAction         }, /* 수입order등록*/
			'module-purcordr2-lister-master button[action=isttAction]'			: { click : me.isttAction         }, /* 입고접수 */
			'module-purcordr2-lister-detail button[action=exportAction]'		: { click : me.exportDetailAction }, /* 엑셀 */

			'module-purcordr2-worker-lister button[action=updateAction]'		: { click : me.updateAction  }, /* 저장 */
			'module-purcordr2-worker-lister button[action=deleteAction]'		: { click : me.deleteAction2 }, /*디테일삭제*/
			'module-purcordr2-worker-lister button[action=cancelAction]'		: { click : me.cancelAction  }, /* 취소 */

			'module-purcordr2-worker-lister3 button[action=updateAction]'		: { click : me.updateAction2    }, /* 저장 */
			'module-purcordr2-worker-lister3 button[action=cancelAction]'		: { click : me.cancelAction2    }, /* 취소 */
			'module-purcordr2-worker-lister3 button[action=itemAction]'			: { click : me.itemAction       }, /* 신규품목 */
			'module-purcordr2-worker-lister3 button[action=itemupdateAction]'	: { click : me.itemupdateAction }, /* 품목지정 */


			'module-purcordr2-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-purcordr2-worker-lister2' : {
				selectionchange    : me.selectDetail2,
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordr2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordr2-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-editor2')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-lister')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-lister2')[0] },
			lister3 : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-lister3')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-search')[0] },
			search2 : function () { return Ext.ComponentQuery.query('module-purcordr2-worker-search2')[0] },
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-purcordr2-lister-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-purcordr2-lister-detail')[0] }
		},
			popup  : function () { return Ext.ComponentQuery.query('module-purcordr2-popup')[0] },
			popup2 : function () { return Ext.ComponentQuery.query('module-purcordr2-popup2')[0]},
			popup3 : function () { return Ext.ComponentQuery.query('module-purcordr2-aone-popup')[0] }

	},


	selectAction:function(callbackFn) {
		var me = this,
			editor = this.pocket.worker.editor()
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(tindex==0){
			lister = me.pocket.lister.master();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, mes_system_type:_global.options.mes_system_type }));
		}else if(tindex==1){
			Ext.Msg.alert("알림","발주등록의 대기내역 조회로 조회하여 주십시오.");
		}
	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister2(),
			lister3 = me.pocket.worker.lister3(),
			editor = me.pocket.worker.editor2(),
			search = me.pocket.worker.search2(),
			param  = editor.getValues(),
			record = undefined
		;

		me.pocket.search().down('[name=collapsed]').collapse();
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else { }
			}, scope:me
		}, Ext.merge({
			invc_date1		: param.invc_date1,
			invc_date2		: param.invc_date2,
			bzpl_idcd		: param.bzpl_idcd,
			drtr_idcd		: param.drtr_idcd,
			item_idcd		: param.item_idcd,
			usge_dvcd		: param.usge_dvcd

		}));

		lister3.getStore().clearData();
		lister3.getStore().loadData([],false);

	},

	// 신규품목
	itemAction:function() {
		var me = this,
			selection = me.pocket.worker.lister3().getSelectionModel().getSelection(),
			store =  me.pocket.worker.lister3().getStore(),
			row = store.indexOf(selection[0]);
		;

		if (!selection || selection.length != 1) {
			Ext.Msg.alert("알림", "품목을 선택해주세요.");
			return;
		}

		if (selection[0].get('item_idcd') != '' && selection[0].get('item_idcd') != null) {
			Ext.Msg.alert("알림", "등록된 품목입니다. 기존품목지정 버튼을 사용하여 발주품목을 변경해주세요.");
			return;
		}

		if(_global.hq_id.toUpperCase() == 'N1000A-ONE' ){
			resource.loadPopup({
				widget : 'module-purcordr2-aone-popup',
				params : {
				},
				result : function(record) {
					store.each(function(item, idx) {
						if (idx == row) {
							item.set("item_idcd", record.item_idcd);
							item.set("item_code", record.values.item_code);
							item.set("item_name", record.values.item_name);
							item.set("item_spec", record.values.item_spec);
							item.set("unit_idcd", record.values.unit_idcd);
							item.set("unit_name", record.values.unit_name);
						}
					});
				}
			});
		}else{
			resource.loadPopup({
				widget : 'module-purcordr2-popup',
				params : {
				},
				result : function(record) {
					store.each(function(item, idx) {
						if (idx == row) {
							item.set("item_idcd", record.item_idcd);
							item.set("item_code", record.values.item_code);
							item.set("item_name", record.values.item_name);
							item.set("item_spec", record.values.item_spec);
							item.set("unit_idcd", record.values.unit_idcd);
							item.set("unit_name", record.values.unit_name);
						}
					});
				}
			});
		}
	},

	// Aone 신규품목
	aoneItemAction:function() {
		var me = this,
			selection = me.pocket.worker.lister3().getSelectionModel().getSelection(),
			store =  me.pocket.worker.lister3().getStore(),
			row = store.indexOf(selection[0]);
		;

		if (!selection || selection.length != 1) {
			Ext.Msg.alert("알림", "품목을 선택해주세요.");
			return;
		}

		if (selection[0].get('item_idcd') != '' && selection[0].get('item_idcd') != null) {
			Ext.Msg.alert("알림", "등록된 품목입니다. 품목지정 버튼을 사용하여 변경해주세요.");
			return;
		}

		resource.loadPopup({
			widget : 'module-purcordr2-aone-popup',
			params : {
			},
			result : function(record) {
				store.each(function(item, idx) {
					if (idx == row) {
						item.set("item_idcd", record.item_idcd);
						item.set("item_code", record.values.item_code);
						item.set("item_name", record.values.item_name);
						item.set("item_spec", record.values.item_spec);
						item.set("unit_idcd", record.values.unit_idcd);
						item.set("unit_name", record.values.unit_name);
					}
				});
			}
		});
	},

	// 품목지정
	itemupdateAction:function() {
		var me = this,
			selection = me.pocket.worker.lister3().getSelectionModel().getSelection(),
			store =  me.pocket.worker.lister3().getStore(),
			row = store.indexOf(selection[0])
		;

		if (!selection || selection.length != 1) {
			Ext.Msg.alert("알림", "품목을 선택해주세요.");
			return;
		}

		resource.loadPopup({
			select	: 'SINGLE',
			widget : 'module-purcordr2-popup2',
			params : {acct_bacd : '발주' , hqof_idcd	: _global.hqof_idcd
			},
			result : function(record) {
				store.each(function(item, idx) {
					if (idx == row) {
						item.set("item_idcd", record[0].data.item_idcd);
						item.set("item_code", record[0].data.item_code);
						item.set("item_name", record[0].data.item_name);
						item.set("item_spec", record[0].data.item_spec);
						item.set("unit_idcd", record[0].data.unit_idcd);
						item.set("unit_name", record[0].data.unit_name);
					}
					console.log(item);
				});
			}
		});
	},

	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 발주입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 발주를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 발주를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:예&아니오
							record.set('apvl_yorn', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/mtrl/po/purcordr2/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										apvl_yorn		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'purc_ordr_mast'
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

	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") != "1") {
					err_msg = "승인해지할 수 없는 상태입니다.";
				}
			});

			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감된 발주입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인여부 해지할 발주를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {

			Ext.each(select, function(record) {
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr2/chk/cancel.do',
					method		: "POST",
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: record.get('invc_numb'),
							mes_system_type	: _global.options.mes_system_type
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {

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
			})

			Ext.Msg.show({ title: '확인', msg: '선택하신 발주를 승인해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:예&아니오
							record.set('apvl_yorn'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/mtrl/po/purcordr2/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										apvl_yorn		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'purc_ordr_mast'
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

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail(),
			lister = me.pocket.worker.lister()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		lister.getStore().clearData();
		lister.getStore().loadData([],false);
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

	selectDetail2 : function(grid, record) {
		var me = this,
			lister3 = me.pocket.worker.lister3(),
			lister2	= me.pocket.worker.lister2(),
			record	= lister2.getSelectionModel().getSelection()[0]

		;
		if (record) {
//			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
//			mask.show();
			lister3.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			},{ invc_numb : record.get('invc_numb') });
		}
	},



	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		var err_msg = "";

		if (select.get("line_clos") == "1") {
			err_msg = "마감되어 수정할 수 없습니다.";
		}

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		if (select.get("apvl_yorn") == "1") {
			err_msg = "승인되어 수정할 수 없습니다.";
		}

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		if(select.get('supl_dvcd')=='6000'){
			editor.down('[name=supl_dvcd]').setReadOnly(true);
		}

		if (select){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
//						lister.getSelectionModel().select(0);
						if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
							if (select.get("supl_dvcd") == "6000") {
								editor.down('[name=crny_dvcd]').show();
								editor.down('[name=trde_trnt_dvcd]').show();
								editor.down('[name=supl_dvcd]').setReadOnly(true);
								editor.setHeight(290);
							}else{
								editor.down('[name=crny_dvcd]').hide();
								editor.down('[name=crny_dvcd]').setValue('');
								editor.down('[name=trde_trnt_dvcd]').hide();
								editor.down('[name=trde_trnt_dvcd]').setValue('');
								editor.down('[name=supl_dvcd]').setReadOnly(false);
								editor.setHeight(240);
							}
						}

						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},

	insertAction:function() {
		var me		= this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			store	= master.getStore(),
			resId = _global.options.mes_system_type
		;


		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if(resId != 'SJFLV'){
					for(var i=0;i<record.productStore.data.items.length;i++){
						var deli2 = record.productStore.data.items[i].data.deli_date2;
						if(deli2 == '' || deli2 == null){
							Ext.Msg.alert("알림","납기일자를 입력하여 주시기 바랍니다.");
							return;
						}
					}
				}

				if (results.success) {
					var info	= record,
						dirty	= false
					;
					info.product().data.each( function( item ) {
						item.set('invc_numb', info.get('invc_numb'));
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
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
								me.selectAction();
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							detail.getStore().loadData(record.product().data.items, false);
							master.getSelectionModel().select(ms);
							master.getStore().reload();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){
							results.callback({});
						}
					});
				}
			Ext.ComponentQuery.query('module-purcordr2-worker-search')[0].getForm().reset();
			}
		});
	},

	//저장
	updateAction2:function() {
		var me = this,
			master = me.pocket.lister.master(),
			lister3 = me.pocket.worker.lister3(),
			lister2 = me.pocket.worker.lister2(),
			lister = me.pocket.worker.lister(),
			store  = lister3.getStore(),
			changes = lister3.getStore().getUpdatedRecords().length,
			search = me.pocket.worker.search2(),
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk
			record	= lister3.getSelectionModel().getSelection()[0]
		;

		for (var i = 0; i < changes; i++) {
			if(lister3.getStore().getUpdatedRecords()[i].data.offr_qntt == 0){
				chk = 1;
				break;
			}
		}

		if(search.down('[name=supl_dvcd]').getValue()=="6000"){
			if (search.down('[name=crny_dvcd]').getValue() == null || search.down('[name=crny_dvcd]').getValue() == '') {
				Ext.Msg.alert("알림", "화폐단위값을 넣어주세요.");
				return;
			}
			if (search.down('[name=trde_trnt_dvcd]').getValue() == null || search.down('[name=trde_trnt_dvcd]').getValue() == '') {
				Ext.Msg.alert("알림", "운송수단값을 넣어주세요.");
				return;
			}
		}

		if(changes != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
				return;
			}

			if (param.drtr_idcd == ''){
				Ext.Msg.alert("알림","발주담당자를 반드시 입력해주십시오.");
				return;
			}

			console.log(param.offr_pric != 0);

			for (var a = 0; a < changes; a++) {
				if (lister3.getStore().getUpdatedRecords()[a].data.offr_pric == 0){
					Ext.Msg.alert("알림","단가를 다시 한번 확인해주세요");
					return;
				}

				if (lister3.getStore().getUpdatedRecords()[a].data.offr_amnt == 0){
					Ext.Msg.alert("알림","금액을 다시 한번 확인해주세요");
					return;
				}

				if (lister3.getStore().getUpdatedRecords()[a].data.item_idcd=='' || lister3.getStore().getUpdatedRecords()[a].data.item_idcd==null) {
					Ext.Msg.alert("알림", "등록되어있지 않은 품목이 있습니다. 다시 확인해주세요.");
					return;
				}
				console.log(lister3.getStore().getUpdatedRecords()[a].data.item_idcd);
				console.log(lister3.getStore().getUpdatedRecords()[a].data.item_code);
			}

			if (param.cstm_idcd==''){
				Ext.Msg.alert("알림","거래처를 반드시 입력해주십시오.");
				return;
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'purc_ordr_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});
				var x = 1;	//순번
				for (var a = 0; a < changes; a++) {
					lister3.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister3.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
					lister3.getStore().getUpdatedRecords()[a].data.invc_date = param.invc_date;
					lister3.getStore().getUpdatedRecords()[a].data.deli_date = param.deli_date;
					lister3.getStore().getUpdatedRecords()[a].data.drtr_idcd = param.drtr_idcd;
					lister3.getStore().getUpdatedRecords()[a].data.cstm_idcd = param.cstm_idcd;
					lister3.getStore().getUpdatedRecords()[a].data.supl_dvcd = param.supl_dvcd;
					lister3.getStore().getUpdatedRecords()[a].data.crny_dvcd = param.crny_dvcd;
					lister3.getStore().getUpdatedRecords()[a].data.cstm_name = param.cstm_name;
					lister3.getStore().getUpdatedRecords()[a].data.cstm_code = param.cstm_code;
					lister3.getStore().getUpdatedRecords()[a].data.trde_trnt_dvcd = param.trde_trnt_dvcd;
					lister3.getStore().getUpdatedRecords()[a].data.offr_dvcd = 1100;
					lister3.getStore().getUpdatedRecords()[a].data.apvl_yorn = 0;
				}

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
				mask.show();
				var store = lister.getStore();
				lister3.getStore().sync({
					success : function(operation){
						tpanel.items.indexOf(tpanel.setActiveTab(0));
//						lister.getStore().reload();
						lister2.getStore().reload();
						lister3.getStore().reload();
						master.getStore().reload();
						search.getForm().reset(true);
					},
					failure : function(operation){ },
					callback: function(operation){
						mask.hide();
						store.reload();
					}
				});

			}
		}else{

			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}

		search.down('[name=crny_dvcd]').hide();
		search.down('[name=trde_trnt_dvcd]').hide();
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
				Ext.ComponentQuery.query('module-purcordr2-worker-search')[0].getForm().reset();
			}
		});
	},

	cancelAction2:function() {
		var me		= this,
				editor = me.pocket.worker.editor(),
				lister = me.pocket.worker.lister(),
				tpanel = me.pocket.layout().down('#mainpanel'),
				tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			;
			tpanel.items.indexOf(tpanel.setActiveTab(0));
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
			if (_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
				Ext.each(records, function(record) {
					if (record.get("apvl_yorn") == "1") {
						err_msg = "승인되어 삭제할 수 없습니다.";
					}
				});
			}

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
					url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							qty			: records[0].get('offr_qntt'),
							upt_usr_nm	: _global.login_pk,
							mes_system_type : _global.options.mes_system_type
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
						me.selectAction();
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
	},

	deleteAction2:function(){
		var me = this,
		master = me.pocket.lister.master(),
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore(),
		store3 = me.pocket.worker.search()

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
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr/set/del_yn2.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: records[i].get('invc_numb'),
									line_seqn	: records[i].get('line_seqn'),
									mes_system_type	: _global.options.mes_system_type
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								if (result.success) {
									store.remove(records[0]);
									store.reload();
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
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
				}
			}
		});
	},



	// 발주서 발행
	PrintAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport_sjflv2.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if(resId == 'N1000SJUNG'){
			if(select[0].get('supl_dvcd') == '6000'){
				Ext.Msg.alert("알림", "수입Order관리에서 발행하세요.");
				return;
			}else{
				var report_name = ("N1000SJFLV" == _global.hq_id.toUpperCase()) ? 'PurcOrderReport_sjflv2.jrf' : 'PurcOrderReport_sjung.jrf';
				var invc_numb = select[0].get('invc_numb');
					var arg = 'invc_numb~'+invc_numb+'~';
					var url = '/ubi/getReport.do?param={\"jrf\" : \"'+report_name+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
					Ext.Ajax.request({
						url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
					});
				}
			}

		if(resId == 'N1000A-ONE'){
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'A-one_PurcOrderReport.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}

		if(select[0].get('supl_dvcd') == '6000'){
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'PurcOrderReport_sjflv.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}else{
			var report_name = ("N1000SJFLV" == resId) ? 'PurcOrderReport_sjflv2.jrf' : 'PurcOrderReport_sjung.jrf';

			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+report_name+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}
	},

	imptAction:function(){
		var	me		= this,
			lister	= me.pocket.lister.master(),
			select	= lister.getSelectionModel().getSelection()[0],
			records = lister.getSelectionModel().getSelection(),
			cnt = 0
		;

		if(records[0].get('line_clos')=='1'){
			Ext.Msg.alert("알림","마감되어 수입 Order 등록이 안됩니다.");
			return;
		}

		if(records[0].get('apvl_yorn')=='1'){
			Ext.Msg.alert('알림','승인되어 수입 Order 등록이 안됩니다.');
			return;
		}

		if(select.get('supl_dvcd')!='6000'){
			Ext.Msg.alert('알림','외자매입만 수입 Order 등록 가능합니다.');
			return;
		}

		if(select){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr2/get/impt.do',
				method		: "POST",
				async	: false,
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: select.get('invc_numb'),
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						console.log(result.records[0])
						cnt = result.records[0].cnt;
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
			Ext.Msg.confirm("확인", "수입 Order 등록하시겠습니까?", function(button) {
				if (button == 'yes') {
			if(select.get('supl_dvcd')=='6000' && cnt == 0){
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr2/set/impt.do',
					method		: "POST",
					async	: false,
					params		: {
						token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: select.get('invc_numb'),
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd,
							crte_idcd	: _global.login_pk
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							lister.getStore().reload();
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
			}else if(cnt > 0){
				Ext.Msg.alert('알림','이미 등록된 발주입니다.');
				return;
			}
				}
			});
		}
	},

	isttAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			records= me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","입고접수할 목록을 선택해주십시오.");
		}else if(select.data.line_clos != 0){
			Ext.Msg.alert("알림","입고접수할 수 없는 발주입니다.");
		}else{
			Ext.Msg.confirm("확인", "입고접수 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/mtrl/po/purcordr2/set/istt.do',
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
							if (result.success) {
								Ext.Msg.alert("알림", "입고접수 처리가 완료 되었습니다.");
								me.pocket.lister.master().getStore().reload();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
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

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},
});
