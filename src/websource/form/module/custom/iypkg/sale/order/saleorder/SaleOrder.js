Ext.define('module.custom.iypkg.sale.order.saleorder.SaleOrder', {
	extend: 'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.BxtyPopup',
		'lookup.popup.view.FabcPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.AsmtPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.SaleOrderStokPopup'
	],

	models: [
		'module.custom.iypkg.sale.order.saleorder.model.SaleOrder',
		'module.custom.iypkg.sale.order.saleorder.model.SaleOrderFabc',
		'module.custom.iypkg.sale.order.saleorder.model.SaleOrderWkct',
	],
	stores: [
		'module.custom.iypkg.sale.order.saleorder.store.SaleOrder',
		'module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabc',
		'module.custom.iypkg.sale.order.saleorder.store.SaleOrderFabcCopy',
		'module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkct',
		'module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkctCopy',
	],
	views: [
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderLayout',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderSearch',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderLister',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderEditor',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderFabc',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderWkct',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderCopyPopup',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderOsttPopup',
		'module.custom.iypkg.item.productmast.view.ProductMastCalcPopup',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderEditorIypkg',
		'module.custom.iypkg.sale.order.saleorder.view.SaleOrderListerIypkg',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.selectAction();
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleorder-layout button[action=selectAction]': { click: me.selectAction }, /* 조회 */

			'module-saleorder-lister button[action=insertAction]': { click: me.insertAction }, /* 등록 */
			'module-saleorder-lister button[action=modifyAction]': { click: me.modifyAction }, /* 수정 */
			'module-saleorder-lister button[action=deleteAction]': { click: me.deleteAction }, /* 삭제 */
			'module-saleorder-lister button[action=exportAction]': { click: me.exportAction }, /* 엑셀 */

			'module-saleorder-editor button[action=cancelAction]': { click: me.cancelAction }, /* 취소 */
			'module-saleorder-editor button[action=updateAction]': { click: me.updateAction }, /* 저장 */

			'module-saleorder-lister menuitem[action=closeAction]': { click: me.closeAction }, /* 마감 */
			'module-saleorder-lister menuitem[action=closeCancelAction]': { click: me.closeCancelAction }, /* 마감취소 */
			'module-saleorder-lister menuitem[action=okAction]': { click: me.okAction }, /* 승인 */
			'module-saleorder-lister menuitem[action=okCancelAction]': { click: me.okCancelAction }, /* 승인취소 */

			'module-saleorder-editor-iypkg button[action=selectAction]': { click: me.selectAction3 }, /*  조회 */
			'module-saleorder-editor-iypkg button[action=insertAction]': { click: me.addSale }, /*  추가*/
			'module-saleorder-editor-iypkg button[action=deleteAction]': { click: me.deleteAction2 }, /* 삭제 */
			'module-saleorder-editor-iypkg button[action=updateAction]': { click: me.updateAction2 }, /* 저장 */

			'module-saleorder-lister button[action=copyAction]': { click: me.copyAction }, /* 주문복사 */
			'module-saleorder-lister button[action=orderAction]': { click: me.orderAction }, /* 주문복사 */

			'module-saleorder-lister': {
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			},
			'module-saleorder-lister-iypkg': {
				selectionchange: me.selectRecord									// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);

		window._ordr = new Ext.util.HashMap();
	},
	pocket: {
		layout: function() { return Ext.ComponentQuery.query('module-saleorder-layout')[0] },
		search: function() { return Ext.ComponentQuery.query('module-saleorder-search')[0] },
		lister: function() { return Ext.ComponentQuery.query('module-saleorder-lister')[0] },
		editor: function() { return Ext.ComponentQuery.query('module-saleorder-editor')[0] },
		editorIypkg: function() { return Ext.ComponentQuery.query('module-saleorder-editor-iypkg')[0] },
		listerIypkg: function() { return Ext.ComponentQuery.query('module-saleorder-lister-iypkg')[0] },
		fabc_lister: function() { return Ext.ComponentQuery.query('module-saleorder-fabc-lister')[0] },
		stok_lister: function() { return Ext.ComponentQuery.query('module-saleorder-stok-lister')[0] },
		wkct_lister: function() { return Ext.ComponentQuery.query('module-saleorder-wkct-lister')[0] },
		popup: function() { return Ext.ComponentQuery.query('module-iypkg-saleorder-copy-popup')[0] },
	},

	//조회
	selectAction: function(callbackFn) {
		var me = this,
			lister = me.pocket.lister(),
			listerIypkg = me.pocket.listerIypkg(),
			values = me.pocket.search().getValues()
			;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
		mask.show();

		if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
//			me.pocket.editorIypkg.getForm().reset(true);

			listerIypkg.select({
				callback: function(records, operation, success) {
					if (success) {
						listerIypkg.getSelectionModel().select(0);
					} else {
						me.pocket.editorIypkg.getForm().reset(true);
					}
					mask.hide();
				}, scope: me
			},
			Ext.merge(me.pocket.search().getValues(), { stor_grp: _global.stor_grp }));
		}else{
			lister.select({
				callback: function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
						me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope: me
			},
			Ext.merge(me.pocket.search().getValues(), { stor_grp: _global.stor_grp }));
		}
	},

	//조회
	selectAction3: function() {
		var me = this,
			lister = me.pocket.lister(),
			listerIypkg = me.pocket.listerIypkg(),
			editorIypkg = me.pocket.editorIypkg(),
			search = me.pocket.search()
		;

		var invc_numb = editorIypkg.down('[name = invc_numb]').getValue();

		if(!invc_numb){
			Ext.Msg.alert("알림","해당 수주번호를 찾을 수 없습니다. 다시 한번 확인해주세요.");
			return;
		}else{
			search.down('[name = find_name]').setValue(invc_numb);
			search.down('[name = invc1_date]').setValue(null);
			search.down('[name = invc2_date]').setValue(null);
		}

		var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.SELECT.mask });
		mask.show();

		if( invc_numb ){
			if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
				listerIypkg.select({
					callback: function(records, operation, success) {
						if (success) {
							listerIypkg.getSelectionModel().select(0);
							me.selectRecord(listerIypkg, records);
						} else {
							me.pocket.editorIypkg.getForm().reset(true);
						}
						mask.hide();
					}, scope: me
				},
				Ext.merge(me.pocket.search().getValues(), { stor_grp: _global.stor_grp }))
			}else{
				lister.select({
					callback: function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
							me.selectRecord(lister, records);
						} else {
							me.pocket.editor().getForm().reset(true);
						}
						mask.hide();
					}, scope: me
				},
				Ext.merge(me.pocket.search().getValues(), { stor_grp: _global.stor_grp }))
			}
		}
	},

	//추가
	insertAction: function() {
		var me = this,
			editor  = me.pocket.editor(),
			editor2 = me.pocket.editorIypkg(),
			lister  = me.pocket.lister(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			fabc_store = me.pocket.fabc_lister().getStore(),
			wkct_store = me.pocket.wkct_lister().getStore(),
			date = new Date()
			;
		date.setDate(date.getDate() + 7);
		fabc_store.clearData();
		fabc_store.loadData([], false);
		wkct_store.clearData();
		wkct_store.loadData([], false);

		editor.down('[itemId=updateSale]').show();
		editor.down('[itemId=cancelSale]').show();

		editor.insertBefore({
			caller: me,
			keygen: {
				url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/invc_numb.do',
				object: resource.keygen,
				params: {
					token: _global.token_id,
					param: JSON.stringify({
						stor_id: _global.stor_id,
						date: Ext.Date.format(new Date(), 'ymd')
					})
				}
			},
			callback: function(keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller: me,
						record: Ext.create(lister.getStore().model.modelName, {
							invc_numb: keygen.records[0].seq,
							acpt_dvcd: '3000',
							crny_dvcd: '1000',
							vatx_dvcd: '1',
							stat_dvcd: '1',
							deli_date: Ext.Date.format(date, 'Ymd'),
							//							item_idcd : keygen.records[0].seq,
						}),
						lister: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function(results) {
							if (results.success) {
								results.feedback({ success: true, visible: true });

								if(_global.hqof_idcd.toUpperCase()== 'N1000IYPKG'){
									editor2.down('[name=cstm_name]').focus(true, 10)
								}else{
									editor.down('[name=cstm_name]').focus(true, 10)
								}
							}
						}
					});
					editor.down('[name=stok_qntt]').setValue(0);
				}
			}
		});

		window._ordr.add('dvcd', 'insert');
	},


	addSale: function() {
		var me = this,
			editorIypkg = me.pocket.editorIypkg(),
			lister = me.pocket.listerIypkg(),
			search = me.pocket.search(),
			param = search.getValues(),
			fabc_store = me.pocket.fabc_lister().getStore(),
			wkct_store = me.pocket.wkct_lister().getStore(),
			date = new Date()
		;

		date.setDate(date.getDate() + 7);
		fabc_store.clearData();
		fabc_store.loadData([], false);
		wkct_store.clearData();
		wkct_store.loadData([], false);

		editorIypkg.insertBefore({
			caller: me,
			keygen: {
				url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/invc_numb.do',
				object: resource.keygen,
				params: {
					token: _global.token_id,
					param: JSON.stringify({
						stor_id: _global.stor_id,
						date: Ext.Date.format(new Date(), 'ymd')
					})
				}
			},
			callback: function(keygen) {
				if (keygen.success) {
					editorIypkg.insertRecord({
						caller: me,
						record: Ext.create(lister.getStore().model.modelName, {
							invc_numb: keygen.records[0].seq,
							acpt_dvcd: '3000',
							crny_dvcd: '1000',
							vatx_dvcd: '1',
							stat_dvcd: '1',
							deli_date: Ext.Date.format(date, 'Ymd'),
							//							item_idcd : keygen.records[0].seq,
						}),
						lister: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function(results) {
							if (results.success) {
								results.feedback({ success: true, visible: true });
								editorIypkg.down('[name=cstm_name]').focus(true, 10)
							}
						}
					});
					editorIypkg.down('[name=stok_qntt]').setValue(0);
				}
			}
		});

		window._ordr.add('dvcd', 'insert');

	},

	//선택
	selectRecord: function(grid, record) {
		var me = this,
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			fabc_lister = me.pocket.fabc_lister(),
			wkct_lister = me.pocket.wkct_lister(),
			stok_lister = me.pocket.stok_lister(),
			editorIypkg = me.pocket.editorIypkg(),

			select = record[0]
			;

		if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
			window._ordr.add('dvcd', 'cancel'); // 'cancel'로 변경
		}

		if (window._ordr.map.dvcd == 'insert') {
			me.insertAction();
		} else {
			if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
				editor = me.pocket.editorIypkg();
			}else{
				editor = me.pocket.editor();
			}

			if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
				editor.selectRecord({ lister: me.pocket.listerIypkg(), record: record }, me);
			}else{
				editor.selectRecord({ lister: me.pocket.lister(), record: record }, me);
			}

			if (record[0]) {
				var total = 0, m2_qntt = 0;
				Ext.each(record, function(records) {
					m2_qntt += records.get('pqty_mxm2') * records.get('acpt_qntt');
					total += records.get('sply_amnt');
				})
				search.down('[name=m2_qntt]').setValue(m2_qntt);
				search.down('[name=total_sum]').setValue(total);

				editor.modifyRecord({
					caller: me,
					callback: function(results) {
						if (results.success) {
							fabc_lister.select({
								callback: function(records, operation, success) {
									if (success) {
									} else { }
								}, scope: me
							}, Ext.merge({ invc_numb: select.get('invc_numb'), item_idcd: select.get('item_idcd') }, { stor_grp: _global.stor_grp }));
							wkct_lister.select({
								callback: function(records, operation, success) {
									if (success) {
									} else { }
								}, scope: me
							}, Ext.merge({ invc_numb: select.get('invc_numb'), item_idcd: select.get('item_idcd') }, { stor_grp: _global.stor_grp }));

							Ext.Ajax.request({
								url: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/get/image.do',
								method: "POST",
								params: {
									token: _global.token_id,
									param: Ext.encode({
										invc_numb: select.get('invc_numb'),
									})
								},
								async: false,
								method: 'POST',
								success: function(response, request) {
									var result = Ext.decode(response.responseText);
									if (!result.success) {
										Ext.Msg.error(result.message);
										return;
									} else {
										var imge_1fst = result.records[0].imge_1fst;
										var imge_2snd = result.records[0].imge_2snd;
										if (imge_1fst != undefined) {
											if (result.records[0].imge_1fst.length > 0) {
												var x = imge_1fst.toString();
												var img = new Uint8Array(x.split(",")),
													blob = new Blob([img], { type: 'image/png' }),
													url = URL.createObjectURL(blob);
												editor.down('[name=image]').setSrc(url);
											}
										} else {
											editor.down('[name=image]').setSrc('');
										}
										if (imge_2snd != undefined) {
											if (result.records[0].imge_2snd.length > 0) {
												var x = imge_2snd.toString();
												var img = new Uint8Array(x.split(",")),
													blob = new Blob([img], { type: 'image/png' }),
													url = URL.createObjectURL(blob);
												editor.down('[name=image2]').setSrc(url);
											}
										} else {
											editor.down('[name=image2]').setSrc('');
										}
									}
								},
								failure: function(result, request) {
								},
								callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							results.feedback({ success: true, visible: true });
							me.pocket.layout().down('#mainpanel').setDisabled(true);
							me.pocket.search().setDisabled(true);
						}
					}
				});

				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}
	},
	//수정
	modifyAction: function() {
		var me = this,
			master = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			fabc_lister = me.pocket.fabc_lister(),
			wkct_lister = me.pocket.wkct_lister()
			;
		var err_msg = "";


		if (select) {
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 오더입니다.";
			}
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (!select) {
		} else {
			editor.modifyRecord({
				caller: me,
				callback: function(results) {
					if (results.success) {
						fabc_lister.select({
							callback: function(records, operation, success) {
								if (success) {
								} else { }
							}, scope: me
						}, Ext.merge({ invc_numb: select.get('invc_numb'), item_idcd: select.get('item_idcd') }, { stor_grp: _global.stor_grp }));
						wkct_lister.select({
							callback: function(records, operation, success) {
								if (success) {
								} else { }
							}, scope: me
						}, Ext.merge({ invc_numb: select.get('invc_numb') }, { stor_grp: _global.stor_grp }));

						Ext.Ajax.request({
							url: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/get/image.do',
							method: "POST",
							params: {
								token: _global.token_id,
								param: Ext.encode({
									invc_numb: select.get('invc_numb'),
								})
							},
							async: false,
							method: 'POST',
							success: function(response, request) {
								var result = Ext.decode(response.responseText);
								if (!result.success) {
									Ext.Msg.error(result.message);
									return;
								} else {
									var imge_1fst = result.records[0].imge_1fst;
									var imge_2snd = result.records[0].imge_2snd;
									if (imge_1fst != undefined) {
										if (result.records[0].imge_1fst.length > 0) {
											var x = imge_1fst.toString();
											var img = new Uint8Array(x.split(",")),
												blob = new Blob([img], { type: 'image/png' }),
												url = URL.createObjectURL(blob);
											editor.down('[name=image]').setSrc(url);
										}
									} else {
										editor.down('[name=image]').setSrc('');
									}
									if (imge_2snd != undefined) {
										if (result.records[0].imge_2snd.length > 0) {
											var x = imge_2snd.toString();
											var img = new Uint8Array(x.split(",")),
												blob = new Blob([img], { type: 'image/png' }),
												url = URL.createObjectURL(blob);
											editor.down('[name=image2]').setSrc(url);
										}
									} else {
										editor.down('[name=image2]').setSrc('');
									}
								}
							},
							failure: function(result, request) {
							},
							callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
							}
						});
						results.feedback({ success: true, visible: true });
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
			editor.down('[itemId=updateSale]').show();
			editor.down('[itemId=cancelSale]').show();

		}
		window._ordr.add('dvcd', 'modify');
	},


	//삭제
	deleteAction: function() {
		var me = this,
			master = me.pocket.lister(),
			store = master.getStore(),
			editor = me.pocket.editor()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		select = []
		if (records && records.length != 0) {
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				} else {
					select.push(record.data);
				}

			});
		}
		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}
		if (records[0]) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.DELETE.mask });
					mask.show();
					Ext.Ajax.request({
						url: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/set/del_yn.do',
						method: "POST",
						params: {
							token: _global.token_id,
							param: JSON.stringify({
								records: JSON.stringify(select)
							})
						},
						async: false,
						method: 'POST',
						success: function(response, request) {
							var result = Ext.decode(response.responseText);
							if (!result.success) {
								Ext.Msg.error(result.message);
								return;
							} else {
							}
						},
						failure: function(result, request) {
						},
						callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */

							store.reload({callback:function(){
								me.cancelAction();
								editor.getForm().reset(true);
							}});
							mask.hide();
						}
					});
				}
			});
		}
	},


	//취소
	cancelAction: function() {

		window._ordr.add('dvcd', 'cancel');
		var me = this, editor = me.pocket.editor(),
			master = me.pocket.lister(),
			fabc_store = me.pocket.fabc_lister().getStore(),
			wkct_store = me.pocket.wkct_lister().getStore(),
			editor = me.pocket.editor(),
			values = editor.getValues()
		;

		if(_global.hqof_idcd.toUpperCase()== 'N1000IYPKG'){
			editor = me.pocket.editorIypkg();
			values = editor.getValues();
		}else{
			editor = me.pocket.editor();
			values = editor.getValues();
		}

		if (wkct_store.data.length) {
			Ext.Ajax.request({
				url: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/set/auto_bom_bop_delete.do',
				method: "POST",
				params: {
					token: _global.token_id,
					param: Ext.encode({
						invc_numb: values.invc_numb
					})
				},
				async: false,
				method: 'POST',
				success: function(response, request) {
					var result = Ext.decode(response.responseText);
					if (!result.success) {
						Ext.Msg.error(result.message);
						return;
					} else {
					}
				},
				failure: function(result, request) {
				},
				callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image2]').setSrc('');
		fabc_store.clearData();
		fabc_store.loadData([], false);
		wkct_store.clearData();
		wkct_store.loadData([], false);
		editor.cancelRecord({
			caller: me,
			lister: me.pocket.lister(),
			callback: function(results) {
				results.feedback({ success: true, visible: false, selectRecord: true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller: me,
			lister: me.pocket.lister(),
			callback: function(results, record) {
				if (results.success) {
				}
			}
		});

		if(_global.hq_id.toUpperCase()!='N1000IYPKG'){
			editor.down('[itemId=updateSale]').hide();
			editor.down('[itemId=cancelSale]').hide();
		}
	},


	//삭제
	deleteAction2: function() {
		var me = this,
			master = me.pocket.listerIypkg(),
			store = master.getStore(),
			editor = me.pocket.editorIypkg()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		select = []
		if (records && records.length != 0) {
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				} else {
					select.push(record.data);
				}

			});
		}
		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}
		if (records[0]) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.DELETE.mask });
					mask.show();
					Ext.Ajax.request({
						url: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/sale/order/saleorder/set/del_yn.do',
						method: "POST",
						params: {
							token: _global.token_id,
							param: JSON.stringify({
								records: JSON.stringify(select)
							})
						},
						async: false,
						method: 'POST',
						success: function(response, request) {
							var result = Ext.decode(response.responseText);
							if (!result.success) {
								Ext.Msg.error(result.message);
								return;
							} else {
							}
						},
						failure: function(result, request) {
						},
						callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */

							store.reload({callback:function(){
								me.cancelAction();
								editor.getForm().reset(true);
							}});
							mask.hide();
						}
					});
				}
			});
		}
	},


	//저장
	updateAction: function() {
		var me = this,
			editor = me.pocket.editor(),
			master = me.pocket.lister(),
			store = master.getStore(),
			records = editor.getRecord(),
			fabc_store = me.pocket.fabc_lister().getStore(),
			wkct_store = me.pocket.wkct_lister().getStore(),
			check = null,
			check2 = true,
			msg = ''
			;

		wkct_store.each(function(findrecord) {
			//			if(findrecord.get('stnd_pric') == '' ||findrecord.get('stnd_pric') < 0 || findrecord.get('stnd_pric') == null){
			//				msg = "작업공정에서 단가를 입력하여 주시기 바랍니다."
			//					check = '1';
			//			}
			if (findrecord.get('need_qntt') == '' || findrecord.get('need_qntt') < 0 || findrecord.get('stnd_pric') == null) {
				msg = "작업공정에서 계획수량을 입력하여 주시기 바랍니다.!!!!!!"
				check = '1';
			}

			if (findrecord.get('wkct_idcd') == '' || findrecord.get('wkct_idcd') == null) {
				if(_global.hq_id.toUpperCase()=='N1000DAE-A'){

				}else{
					msg = "작업공정에서 공정명을 선택하여 주시기 바랍니다."
					check = '1';
				}
			}

			if (findrecord.get('rep_chek')) {//임시,최종공정 없는 데이터 입력 후 삭제예정
				check2 = false;
			}

		});
		fabc_store.each(function(findrecord) {
			if (findrecord.get('fabc_idcd') == '' || findrecord.get('fabc_idcd') == null) {
				msg = "원단투입에서 원단명을 선택하여 주시기 바랍니다.";
				check = '1';
			}
		});
		if (check2) {  //임시,최종공정 없는 데이터 입력 후 삭제예정
			if(_global.hq_id.toUpperCase()=='N1000DAE-A'){

			}else{
				Ext.Msg.alert("알림", '최종공정이 선택되지 않았습니다. 작업공정을 확인해주세요.');
				return;
			}
		}

		if (check) {
			Ext.Msg.alert("알림", msg);
			return;
		}
		async function checkAndHandleUpdate() {
			let chk = false;

			const response = await new Promise((resolve, reject) => {
				Ext.Ajax.request({
					url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/child.do',
					params: {
						token: _global.token_id,
						param: JSON.stringify({
							prod_code: editor.down('[name=prod_code]').getValue(),
						})
					},
					method: 'POST',
					success: function (response, request) {
						resolve(response);
					},
					failure: function () {
						resolve(null);
					}
				});
			});

			if (response) {
				const result = Ext.decode(response.responseText);

			if (!result.success) {
				Ext.Msg.error(result.message);
			} else {
				if (result.records[0].count > 0) {
					chk = true;
				}
			}
		}

		if (chk) {
			Ext.Msg.confirm("확인", "부모코드입니다 자식코드도 추가 등록하시겠습니까?", async function (button) {
				if (button == 'yes') {
					editor.down('[name=child_change]').setValue('Y');
				}
				await updateRecord();
			});
		}else{
			await updateRecord();
		}
			async function updateRecord() {
				return new Promise((resolve, reject) => {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.UPDATE.mask });
					mask.show();
					editor.updateRecord({
						store: store,
						action: Const.EDITOR.DEFAULT,
						callback: function(results, record) {
							if (results.success) {
								store.sync({
									success: function(operation) {
										var uploadForm = editor.down('[name=uploadForm]'),
											item_imge = editor.down('[name=image]').src,
											item_imge2 = editor.down('[name=image2]').src,
											chek1 = editor.down('[name=imge_chek1]').getValue(),
											chek2 = editor.down('[name=imge_chek2]').getValue(),
											param = {},
											chk1 = 0, chk2 = 0
											;

										if (item_imge) {
											if (chek1 == "" || chek1 == undefined) {
												chk1 = 3;
											}
											else {
												chk1 = 1;
											}
										}
										if (item_imge2) {
											if (chek2 == "" || chek2 == undefined) {
												chk2 = 3;
											} else {
												chk2 = 1;
											}
										}

										param.stor_grp = _global.stor_grp;
										param.stor_id = _global.stor_id;
										param.invc_numb = records.get('invc_numb');
										param.chk1 = chk1;
										param.chk2 = chk2;
										Ext.merge(param, this.params);
										uploadForm.getForm().setValues({
											param: JSON.stringify(param)
										});

										//submit
										uploadForm.getForm().submit({
											waitMsg: this.waitMsg, // progressbar 띄우기
											success: function(form, action) {
											},
											failure: function(form, action) {
												Ext.Msg.alert('', '이미지 업로드 실패 했습니다.');
											}
										});
										results.feedback({
											success: true
										});
									},
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) {
										if(_global.hqof_idcd.toUppercase() != 'N1000IYPKG'){
											store.reload();
										}
									}
								});
							}
						},
						finished: function(results, record, operation) {
							if (results.success) {
								me.pocket.layout().down('#mainpanel').setDisabled(false);
								me.pocket.search().setDisabled(false);
								fabc_store.sync({
									success: function(operation) { },
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) { }
								});
								wkct_store.sync({
									success: function(operation) { },
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) { }
								});
								editor.down('[name=cstm_name]').focus(true, 10)
								//				editor.collapsed(false);
								//				switch (operation) {
								//				case Const.EDITOR.PROCESS.INSERT : master.getSelectionModel().select(record ); break;
								//				}
							}

							mask.hide();
						}
					});
				});
			}
		}

		checkAndHandleUpdate();



//		var chk = false;
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/child.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					prod_code	: editor.down('[name=prod_code]').getValue(),
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				console.log(result.records[0].count);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//					if(result.records[0].count > 0){
//						chk=true;
//					}
//				}
//			},
//		});
//		if(chk){
//			Ext.Msg.confirm("확인", "부모코드입니다 자식코드도 추가 등록하시겠습니까?",function(button) {
//				if (button == 'yes') {
//					editor.down('[name=child_change]').setValue('Y');
//				}
//			});
//		}
//		editor.updateRecord({
//			store: store,
//			action: Const.EDITOR.DEFAULT,
//			callback: function(results, record) {
//				if (results.success) {
//					store.sync({
//						success: function(operation) {
//							var uploadForm = editor.down('[name=uploadForm]'),
//								item_imge = editor.down('[name=image]').src,
//								item_imge2 = editor.down('[name=image2]').src,
//								chek1 = editor.down('[name=imge_chek1]').getValue(),
//								chek2 = editor.down('[name=imge_chek2]').getValue(),
//								param = {},
//								chk1 = 0, chk2 = 0
//								;
//
//							if (item_imge) {
//								if (chek1 == "" || chek1 == undefined) {
//									chk1 = 3;
//								}
//								else {
//									chk1 = 1;
//								}
//							}
//							if (item_imge2) {
//								if (chek2 == "" || chek2 == undefined) {
//									chk2 = 3;
//								} else {
//									chk2 = 1;
//								}
//							}
//
//							param.stor_grp = _global.stor_grp;
//							param.stor_id = _global.stor_id;
//							param.invc_numb = records.get('invc_numb');
//							param.chk1 = chk1;
//							param.chk2 = chk2;
//							Ext.merge(param, this.params);
//							uploadForm.getForm().setValues({
//								param: JSON.stringify(param)
//							});
//
//							//submit
//							uploadForm.getForm().submit({
//								waitMsg: this.waitMsg, // progressbar 띄우기
//								success: function(form, action) {
//								},
//								failure: function(form, action) {
//									Ext.Msg.alert('', '이미지 업로드 실패 했습니다.');
//								}
//							});
//							results.feedback({
//								success: true
//							});
//						},
//						failure: function(operation) { results.feedback({ success: false }); },
//						callback: function(operation) { store.reload(); }
//					});
//				}
//			},
//			finished: function(results, record, operation) {
//				if (results.success) {
//					me.pocket.layout().down('#mainpanel').setDisabled(false);
//					me.pocket.search().setDisabled(false);
//					fabc_store.sync({
//						success: function(operation) { },
//						failure: function(operation) { results.feedback({ success: false }); },
//						callback: function(operation) { }
//					});
//					wkct_store.sync({
//						success: function(operation) { },
//						failure: function(operation) { results.feedback({ success: false }); },
//						callback: function(operation) { }
//					});
//					editor.down('[name=cstm_name]').focus(true, 10)
//					//				editor.collapsed(false);
//					//				switch (operation) {
//					//				case Const.EDITOR.PROCESS.INSERT : master.getSelectionModel().select(record ); break;
//					//				}
//				}
//
//				mask.hide();
//			}
//		});
	},



	//저장
	updateAction2: function() {
		var me = this,
			editorIypkg = me.pocket.editorIypkg(),
			master = me.pocket.lister(),
			masterIypkg = me.pocket.listerIypkg(),
			store = master.getStore(),
			storeIypkg = masterIypkg.getStore(),
			records = editorIypkg.getRecord(),
			fabc_store = me.pocket.fabc_lister().getStore(),
			wkct_store = me.pocket.wkct_lister().getStore(),
			check = null,
			check2 = true,
			msg = ''
			;

		wkct_store.each(function(findrecord) {
			//			if(findrecord.get('stnd_pric') == '' ||findrecord.get('stnd_pric') < 0 || findrecord.get('stnd_pric') == null){
			//				msg = "작업공정에서 단가를 입력하여 주시기 바랍니다."
			//					check = '1';
			//			}
			if (findrecord.get('need_qntt') == '' || findrecord.get('need_qntt') < 0 || findrecord.get('stnd_pric') == null) {
				msg = "작업공정에서 계획수량을 입력하여 주시기 바랍니다."
				check = '1';
			}

			if (findrecord.get('wkct_idcd') == '' || findrecord.get('wkct_idcd') == null) {
				if(_global.hq_id.toUpperCase()=='N1000DAE-A'){

				}else{
					msg = "작업공정에서 공정명을 선택하여 주시기 바랍니다."
					check = '1';
				}
			}

			if (findrecord.get('rep_chek')) {//임시,최종공정 없는 데이터 입력 후 삭제예정
				check2 = false;
			}

		});
		fabc_store.each(function(findrecord) {
			if (findrecord.get('fabc_idcd') == '' || findrecord.get('fabc_idcd') == null) {
				msg = "원단투입에서 원단명을 선택하여 주시기 바랍니다.";
				check = '1';
			}
		});
		if (check2) {  //임시,최종공정 없는 데이터 입력 후 삭제예정
			if(_global.hq_id.toUpperCase()=='N1000DAE-A'){

			}else{
				Ext.Msg.alert("알림", '최종공정이 선택되지 않았습니다. 작업공정을 확인해주세요.');
				return;
			}
		}

		if (check) {
			Ext.Msg.alert("알림", msg);
			return;
		}
		async function checkAndHandleUpdate() {
			let chk = false;

			const response = await new Promise((resolve, reject) => {
				Ext.Ajax.request({
					url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/child.do',
					params: {
						token: _global.token_id,
						param: JSON.stringify({
							prod_code: editorIypkg.down('[name=prod_code]').getValue(),
						})
					},
					method: 'POST',
					success: function (response, request) {
						resolve(response);
					},
					failure: function () {
						resolve(null);
					}
				});
			});

			if (response) {
				const result = Ext.decode(response.responseText);

			if (!result.success) {
				Ext.Msg.error(result.message);
			} else {
				if (result.records[0].count > 0) {
					chk = true;
				}
			}
		}

		if (chk) {
			Ext.Msg.confirm("확인", "부모코드입니다 자식코드도 추가 등록하시겠습니까?", async function (button) {
				if (button == 'yes') {
					editorIypkg.down('[name=child_change]').setValue('Y');
				}
				await updateRecord();
			});
		}else{
			await updateRecord();
		}
			async function updateRecord() {
				return new Promise((resolve, reject) => {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg: Const.UPDATE.mask });
					mask.show();
					editorIypkg.updateRecord({
						store: store,
						action: Const.EDITOR.DEFAULT,
						callback: function(results, record) {
							if (results.success) {
								store.sync({
									success: function(operation) {
										var uploadForm = editorIypkg.down('[name=uploadForm]'),
											item_imge = editorIypkg.down('[name=image]').src,
											item_imge2 = editorIypkg.down('[name=image2]').src,
											chek1 = editorIypkg.down('[name=imge_chek1]').getValue(),
											chek2 = editorIypkg.down('[name=imge_chek2]').getValue(),
											param = {},
											chk1 = 0, chk2 = 0
											;

										if (item_imge) {
											if (chek1 == "" || chek1 == undefined) {
												chk1 = 3;
											}
											else {
												chk1 = 1;
											}
										}
										if (item_imge2) {
											if (chek2 == "" || chek2 == undefined) {
												chk2 = 3;
											} else {
												chk2 = 1;
											}
										}

										param.stor_grp = _global.stor_grp;
										param.stor_id = _global.stor_id;
										param.invc_numb = records.get('invc_numb');
										param.chk1 = chk1;
										param.chk2 = chk2;
										Ext.merge(param, this.params);
										uploadForm.getForm().setValues({
											param: JSON.stringify(param)
										});

										//submit
										uploadForm.getForm().submit({
											waitMsg: this.waitMsg, // progressbar 띄우기
											success: function(form, action) {
											},
											failure: function(form, action) {
												Ext.Msg.alert('', '이미지 업로드 실패 했습니다.');
											}
										});
										results.feedback({
											success: true
										});
									},
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) {
										if(_global.hq_id.toUpperCase()=='N1000IYPKG'){
											storeIypkg.reload();
										}else{
											store.reload();
										}
									}
								});
							}
						},
						finished: function(results, record, operation) {
							if (results.success) {
								me.pocket.layout().down('#mainpanel').setDisabled(false);
								me.pocket.search().setDisabled(false);
								fabc_store.sync({
									success: function(operation) { },
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) { }
								});
								wkct_store.sync({
									success: function(operation) { },
									failure: function(operation) { results.feedback({ success: false }); },
									callback: function(operation) { }
								});
								editorIypkg.down('[name=cstm_name]').focus(true, 10)
								//				editor.collapsed(false);
								//				switch (operation) {
								//				case Const.EDITOR.PROCESS.INSERT : master.getSelectionModel().select(record ); break;
								//				}
							}

							mask.hide();
						}
					});
				});
			}
		}

		checkAndHandleUpdate();
	},

	//엑셀
	exportAction: function(button) {
		var value = button.button;
		this.pocket.lister().writer({ enableLoadMask: true });
	},

	//마감
	closeAction: function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
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
			Ext.Msg.show({
				title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function(button) {
					if (button == 'yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url: _global.location.http() + '/listener/set/close.do',
								params: {
									token: _global.token_id,
									param: JSON.stringify({
										invc_numb: record.get('invc_numb'),
										line_clos: '1',
										stor_id: _global.stor_id,
										hqof_idcd: _global.hqof_idcd,
										table: 'boxx_acpt'
									})
								},
								async: false,
								method: 'POST',
								success: function(response, request) {
									var result = Ext.decode(response.responseText);
									if (!result.success) {
										Ext.Msg.error(result.message);
										return;
									} else {
									}
								},
								failure: function(result, request) {
								},
								callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//마감해지
	closeCancelAction: function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
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
			Ext.Msg.show({
				title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function(button) {
					if (button == 'yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1'); // 1:마감&마감해지
							record.set('line_clos', '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url: _global.location.http() + '/listener/set/close.do',
								params: {
									token: _global.token_id,
									param: JSON.stringify({
										invc_numb: record.get('invc_numb'),
										line_clos: '0',
										stor_id: _global.stor_id,
										hqof_idcd: _global.hqof_idcd,
										table: 'boxx_acpt'
									})
								},
								async: false,
								method: 'POST',
								success: function(response, request) {
									var result = Ext.decode(response.responseText);
									if (!result.success) {
										Ext.Msg.error(result.message);
										return;
									} else {
									}
								},
								failure: function(result, request) {
								},
								callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//승인
	okAction: function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
			;

		var err_msg = "";
		if (select[0].get('line_clos') == '1') {
			Ext.Msg.alert('알림', '마감된 수주는 변경할 수 없습니다.');
			return;
		}
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({
				title: '확인', msg: '선택하신 오더를 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function(button) {
					if (button == 'yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('apvl_yorn', '1'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/set/ok.do',
								params: {
									token: _global.token_id,
									param: JSON.stringify({
										invc_numb: record.get('invc_numb'),
										apvl_yorn: '1',
										stor_id: _global.stor_id,
										hqof_idcd: _global.hqof_idcd
									})

								},
								async: false,
								method: 'POST',
								success: function(response, request) {
									var result = Ext.decode(response.responseText);
									if (!result.success) {
										Ext.Msg.error(result.message);
										return;
									} else {
										master.getStore().reload();
									}
								},
								failure: function(result, request) {
								},
								callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//승인해지
	okCancelAction: function(callbackFn) {
		var me = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			master = me.pocket.lister()
			;
		if (select[0].get('line_clos') == '1') {
			Ext.Msg.alert('알림', '마감된 수주는 변경할 수 없습니다.');
			return;
		}
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("apvl_yorn") == "0") {
					err_msg = "승인 해지할 수 없는 상태입니다.";
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 해지할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({
				title: '확인', msg: '선택하신 오더를 승인 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function(button) {
					if (button == 'yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('apvl_yorn', '0'); // 0010:승인대기 / 0011:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/set/ok.do',
								params: {
									token: _global.token_id,
									param: JSON.stringify({
										invc_numb: record.get('invc_numb'),
										apvl_yorn: '0',
										stor_id: _global.stor_id,
										hqof_idcd: _global.hqof_idcd
									})

								},
								async: false,
								method: 'POST',
								success: function(response, request) {
									var result = Ext.decode(response.responseText);
									if (!result.success) {
										Ext.Msg.error(result.message);
										return;
									} else {
									}
								},
								failure: function(result, request) {
								},
								callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//주문복사
	copyAction: function() {
		var me = this,
			master = me.pocket.lister(),
			popup = me.pocket.popup()
			;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length != 1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget: 'module-iypkg-saleorder-copy-popup',
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
		var numb2 = Ext.ComponentQuery.query('#cstm_name')[0].setValue(records[0].data.cstm_name);
	},
	orderAction: function() {
		var me = this,
			master = me.pocket.lister(),
			select = master.getSelectionModel().getSelection(),
			qntt = 0,
			diff = 0
			;
		if (select) {
			if (select.length > 1) {
				Ext.Msg.alert("알림", "수주를 1건만 선택하여 주시기 바랍니다.");
				return;
			}
		} else {
			Ext.Msg.alert("알림", "출하계획을 작성하려는 수주를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select[0].get('apvl_yorn') == '0') {
			Ext.Msg.alert('알림', '승인되지 않은 수주입니다. 승인된 수주만 출하계획 가능합니다.');
			return;
		}
		if (select[0].get('line_clos') == '1') {
			Ext.Msg.alert('알림', '마감된 수주로 출하계획을 작성할 수 없습니다.');

			return;
		}
		Ext.Ajax.request({
			url: _global.location.http() + '/custom/iypkg/sale/order/saleorder/get/ostt_plan_qntt.do',
			params: {
				token: _global.token_id,
				param: JSON.stringify({
					invc_numb: select[0].get('invc_numb'),
					stor_id: _global.stor_id,
					hqof_idcd: _global.hqof_idcd
				})
			},
			async: false,
			method: 'POST',
			success: function(response, request) {
				var result = Ext.decode(response.responseText);
				if (!result.success) {
					Ext.Msg.error(result.message);
					return;
				} else {
					if (result.records[0].qntt) {
						qntt = result.records[0].qntt;
					}
				}
			},
			failure: function(result, request) {
			},
			callback: function(operation) {  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		if ((select[0].get('acpt_qntt') - qntt) > 0) {
			diff = select[0].get('acpt_qntt') - qntt;
			resource.loadPopup({
				widget: 'module-iypkg-saleorder-ostt-popup',
				params: { invc_numb: select[0].get('invc_numb'), trst_qntt: diff }
			});
		} else {
			Ext.Msg.show({
				title: '확인', msg: '이미 출하계획이 완료된 수주입니다. 추가 출하계획 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function(button) {
					if (button == 'yes') {
						resource.loadPopup({
							widget: 'module-iypkg-saleorder-ostt-popup',
							params: { invc_numb: select[0].get('invc_numb'), trst_qntt: diff }
						});
					}
				}
			});
		}

	}
});
