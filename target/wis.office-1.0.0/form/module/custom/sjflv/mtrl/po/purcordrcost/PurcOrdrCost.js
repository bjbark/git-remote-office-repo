
Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.PurcOrdrCost', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.cust.CustPopup',
		'lookup.popup.view.VendPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.LottPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.ItemPopup'
	],

	models:[
		'module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostMaster',
		'module.custom.sjflv.mtrl.po.purcordrcost.model.PurcOrdrCostDetail',
	],
	stores:[
		'module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostMaster',
		'module.custom.sjflv.mtrl.po.purcordrcost.store.PurcOrdrCostDetail'
	],
	views : [
		'module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostLayout',
		/* 현황 */
		'module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostSearch',
		'module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostMaster',
		'module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostDetail',
		'module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostEditor',

	],
	initPermission: function(workspace, permission) {
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcordrcost-layout button[action=selectAction]'				: { click : me.selectAction       }, /* 조회 */


			'module-purcordrcost-detail button[action=printAction]'					: { click : me.PrintAction        }, /* 발주서발행*/
			'module-purcordrcost-detail button[action=costAction]'					: { click : me.costAction         }, /* 원가정산*/
			'module-purcordrcost-detail button[action=costcancelAction]'			: { click : me.costcancelAction   }, /* 원가정산취소*/
			'module-purcordrcost-detail button[action=modifyAction]'				: { click : me.modifyAction       }, /* 수정 */
			'module-purcordrcost-detail button[action=deleteAction]'				: { click : me.deleteAction       }, /* 삭제 */

			'module-purcordrcost-editor button[action=updateAction]'				: { click : me.updateAction }, /* 저장 */
			'module-purcordrcost-editor button[action=cancelAction]'				: { click : me.cancelAction }, /* 취소 */
			'module-purcordrcost-master'	: { selectionchange: me.selectRecord },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordrcost-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordrcost-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-purcordrcost-editor')[0] },
		master  : function () { return Ext.ComponentQuery.query('module-purcordrcost-master')[0] },
		detail  : function () { return Ext.ComponentQuery.query('module-purcordrcost-detail')[0] }
	},

	selectAction:function() {
		var me = this,
			master = me.pocket.master(),
			detail = me.pocket.detail(),
			editor = me.pocket.editor(),
			search = me.pocket.search(),
			param = search.getValues(),
			store = master.getStore(),
			selection = master.getSelectionModel().getSelection()[0],
			index = store.indexOf(selection)
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		if(index < 0){
			index = 0;
		}

		editor.down('[name=entr_date]').setValue(null);
		editor.down('[name=bl_numb]').setValue(null);
		editor.down('[name=bl_pric_amnt]').setValue(null);
		editor.down('[name=lc_stot_amnt]').setValue(null);
		editor.down('[name=exrt]').setValue(null);
		editor.down('[name=taxx_amnt]').setValue(null);
		editor.down('[name=taxx_vatx]').setValue(null);
		editor.down('[name=wrhs_insu_amnt]').setValue(null);
		editor.down('[name=wrhs_insu_vatx]').setValue(null);
		editor.down('[name=entr_cmsn_amnt]').setValue(null);
		editor.down('[name=entr_cmsn_vatx]').setValue(null);
		editor.down('[name=trnt_exps_amnt]').setValue(null);
		editor.down('[name=trnt_exps_vatx]').setValue(null);
		editor.down('[name=etcc_amnt_1fst]').setValue(null);
		editor.down('[name=etcc_amnt_1fst_vatx]').setValue(null);
		editor.down('[name=etcc_amnt_2snd]').setValue(null);
		editor.down('[name=etcc_amnt_2snd_vatx]').setValue(null);
		editor.down('[name=remk_text]').setValue(null);
		editor.down('[name=ttsm_vatx_amnt]').setValue(null);
		editor.down('[name=ttsm_amnt]').setValue(null);
		editor.down('[name=ttsm_sum]').setValue(null);

		editor.down('[name=entr_date]').setReadOnly(true);
		editor.down('[name=bl_numb]').setReadOnly(true);
		editor.down('[name=bl_pric_amnt]').setReadOnly(true);
		editor.down('[name=lc_stot_amnt]').setReadOnly(true);
		editor.down('[name=exrt]').setReadOnly(true);
		editor.down('[name=taxx_amnt]').setReadOnly(true);
		editor.down('[name=taxx_vatx]').setReadOnly(true);
		editor.down('[name=wrhs_insu_amnt]').setReadOnly(true);
		editor.down('[name=wrhs_insu_vatx]').setReadOnly(true);
		editor.down('[name=entr_cmsn_amnt]').setReadOnly(true);
		editor.down('[name=entr_cmsn_vatx]').setReadOnly(true);
		editor.down('[name=trnt_exps_amnt]').setReadOnly(true);
		editor.down('[name=trnt_exps_vatx]').setReadOnly(true);
		editor.down('[name=etcc_amnt_1fst]').setReadOnly(true);
		editor.down('[name=etcc_amnt_1fst_vatx]').setReadOnly(true);
		editor.down('[name=etcc_amnt_2snd]').setReadOnly(true);
		editor.down('[name=etcc_amnt_2snd_vatx]').setReadOnly(true);
		editor.down('[name=remk_text]').setReadOnly(true);

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
			if (success) {
				master.getSelectionModel().select(index);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			master = me.pocket.master(),
			detail = me.pocket.detail(),
			detail_store = me.pocket.detail().getStore(),
			param  = me.pocket.search().getValues()
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		editor.selectRecord({ lister : me.pocket.master(), record : record }, me);

		if(record.length > 0){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, invc_numb : record[0].data.invc_numb}) );
		}
	},

	// 발주서 발행
	PrintAction:function() {
		var me = this,
			master = me.pocket.master(),
			select = me.pocket.master().getSelectionModel().getSelection(),
			jrf = 'sjflv_purcordrcost.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}

		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1300,height=800'),
			});
		}
	},

	//원가정산
	costAction:function(callbackFn) {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			lister = me.pocket.master()
		;

		var records = lister.getSelectionModel().getSelection();
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "목록을 선택해주십시오.");
				return;
			}

		if(select){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordrcost/get/expsInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: records[0].get("invc_numb")
					})
				},
				success : function(response, request) {
					var result = Ext.decode(response.responseText);

					if (!result.success) {
						Ext.Msg.error(result.message );
					} else {
						if (result.records.length == 0) {
							Ext.Msg.alert("알림","원가 정산 자료를 입력하세요.");
							return;
						}
						var line_clos = result.records[0].line_clos;
						if (line_clos == 1) {
							Ext.Msg.alert("알림","원가 정산된 값을  취소 후 작업바랍니다.");
							return;
						}

						Ext.Msg.confirm("확인", " 원가정산 하시겠습니까?", function(button) {
							if (button == 'yes') {
								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordrcost/set/cost.do',
									method		: "POST",
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											invc_numb	: select[0].get('invc_numb'),
											cost_clos	: '1'
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										if (result.success) {
											Ext.Msg.alert("알림","원가정산 처리가 완료 되었습니다.");
											lister.getStore().reload();
										} else {
											Ext.Msg.alert("알림", result.message);
										}
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});
							}
						});
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
	},

	//원가정산취소
	costcancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			lister = me.pocket.master()
		;

		var records = lister.getSelectionModel().getSelection();
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "목록을 선택해주십시오.");
				return;
			}

		if(select){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordrcost/get/expsInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: records[0].get("invc_numb")
					})
				},
				success : function(response, request) {
					var result = Ext.decode(response.responseText);

					if (!result.success) {
						Ext.Msg.error(result.message );
					} else {
						if (result.records.length == 0) {
							Ext.Msg.alert("알림","원가 정산 자료가 없습니다.");
							return;
						}

						Ext.Msg.confirm("확인", " 원가정산된 값을 취소하시겠습니까?", function(button) {
							if (button == 'yes') {
								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordrcost/set/cost.do',
									method		: "POST",
									params		: {
										token	: _global.token_id,
										param	: Ext.encode({
											invc_numb	: select[0].get('invc_numb'),
											cost_clos	: '0'

										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										if (result.success) {
											Ext.Msg.alert("알림","원가정산이 취소 되었습니다.");
											lister.getStore().reload();
										} else {
											Ext.Msg.alert("알림", result.message);
										}
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});
							}
						});
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
	},


	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor(),
			lister = me.pocket.master()
		;

		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "수정할 1건을 선택 후 진행하십시오.");
			return;
		}

		if (select) {
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/mtrl/po/purcordrcost/get/expsInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						invc_numb	: records[0].get("invc_numb")
					})
				},
				success : function(response, request) {
					var result = Ext.decode(response.responseText);

					if (!result.success) {
						Ext.Msg.error(result.message );
					} else {
						if (result.records.length != 0) {
							var line_clos = result.records[0].line_clos;
							if (line_clos == 1) {
								Ext.Msg.error("원가 정산된 값을  취소 후 작업바랍니다.");
								return;
							}
						}

						editor.down('[name=entr_date]').setReadOnly(false);
						editor.down('[name=bl_numb]').setReadOnly(false);
						editor.down('[name=bl_pric_amnt]').setReadOnly(false);
						editor.down('[name=lc_stot_amnt]').setReadOnly(false);
						editor.down('[name=exrt]').setReadOnly(false);
						editor.down('[name=taxx_amnt]').setReadOnly(false);
						editor.down('[name=taxx_vatx]').setReadOnly(false);
						editor.down('[name=wrhs_insu_amnt]').setReadOnly(false);
						editor.down('[name=wrhs_insu_vatx]').setReadOnly(false);
						editor.down('[name=entr_cmsn_amnt]').setReadOnly(false);
						editor.down('[name=entr_cmsn_vatx]').setReadOnly(false);
						editor.down('[name=trnt_exps_amnt]').setReadOnly(false);
						editor.down('[name=trnt_exps_vatx]').setReadOnly(false);
						editor.down('[name=etcc_amnt_1fst]').setReadOnly(false);
						editor.down('[name=etcc_amnt_1fst_vatx]').setReadOnly(false);
						editor.down('[name=etcc_amnt_2snd]').setReadOnly(false);
						editor.down('[name=etcc_amnt_2snd_vatx]').setReadOnly(false);
						editor.down('[name=remk_text]').setReadOnly(false);

						editor.down('[itemId=update]').show();
						editor.down('[itemId=cancel]').show();

						editor.modifyRecord({
							caller   : me,
							callback : function( results ) {
								if (results.success){
									results.feedback( {success : true, visible : true } );
									me.pocket.layout().down('#mainpanel').setDisabled(true);
									me.pocket.search().setDisabled(true);
								}
							}
						});
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
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.master(),
			store	= lister.getStore(),
			param  = editor.getValues()
		;

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'purc_istt_exps'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							results.feedback({success : true  });
							lister.select({
								callback:function(records, operation, success) {
								if (success) {
									lister.getSelectionModel().select(0);
								} else { me.pocket.editor().getForm().reset(true);}
								}, scope:me
							});
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.down('[itemId=update]').hide();
					editor.down('[itemId=cancel]').hide();
					editor.down('[name=entr_date]').setReadOnly(true);
					editor.down('[name=bl_numb]').setReadOnly(true);
					editor.down('[name=bl_pric_amnt]').setReadOnly(true);
					editor.down('[name=lc_stot_amnt]').setReadOnly(true);
					editor.down('[name=exrt]').setReadOnly(true);
					editor.down('[name=taxx_amnt]').setReadOnly(true);
					editor.down('[name=taxx_vatx]').setReadOnly(true);
					editor.down('[name=wrhs_insu_amnt]').setReadOnly(true);
					editor.down('[name=wrhs_insu_vatx]').setReadOnly(true);
					editor.down('[name=entr_cmsn_amnt]').setReadOnly(true);
					editor.down('[name=entr_cmsn_vatx]').setReadOnly(true);
					editor.down('[name=trnt_exps_amnt]').setReadOnly(true);
					editor.down('[name=trnt_exps_vatx]').setReadOnly(true);
					editor.down('[name=etcc_amnt_1fst]').setReadOnly(true);
					editor.down('[name=etcc_amnt_1fst_vatx]').setReadOnly(true);
					editor.down('[name=etcc_amnt_2snd]').setReadOnly(true);
					editor.down('[name=etcc_amnt_2snd_vatx]').setReadOnly(true);
					editor.down('[name=remk_text]').setReadOnly(true);
				}
			}
		});



	},

	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.master(),
			callback : function( results ) {
				results.feedback( {success : true, visible : false, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false)
			}
		}, me);

		editor.down('[name=entr_date]').setReadOnly(true);
		editor.down('[name=bl_numb]').setReadOnly(true);
		editor.down('[name=bl_pric_amnt]').setReadOnly(true);
		editor.down('[name=lc_stot_amnt]').setReadOnly(true);
		editor.down('[name=exrt]').setReadOnly(true);
		editor.down('[name=taxx_amnt]').setReadOnly(true);
		editor.down('[name=taxx_vatx]').setReadOnly(true);
		editor.down('[name=wrhs_insu_amnt]').setReadOnly(true);
		editor.down('[name=wrhs_insu_vatx]').setReadOnly(true);
		editor.down('[name=entr_cmsn_amnt]').setReadOnly(true);
		editor.down('[name=entr_cmsn_vatx]').setReadOnly(true);
		editor.down('[name=trnt_exps_amnt]').setReadOnly(true);
		editor.down('[name=trnt_exps_vatx]').setReadOnly(true);
		editor.down('[name=etcc_amnt_1fst]').setReadOnly(true);
		editor.down('[name=etcc_amnt_1fst_vatx]').setReadOnly(true);
		editor.down('[name=etcc_amnt_2snd]').setReadOnly(true);
		editor.down('[name=etcc_amnt_2snd_vatx]').setReadOnly(true);
		editor.down('[name=remk_text]').setReadOnly(true);

		editor.down('[itemId=update]').hide();
		editor.down('[itemId=cancel]').hide();
	},

	deleteAction:function() {
		var me = this,
		editor = me.pocket.editor();
		lister = me.pocket.master();
		lister = me.pocket.master();
		;

		editor.deleteRecord({
			lister	: me.pocket.master(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : false, visible : false, selectRecord : true });},// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },				// 저장 실패시 호출
					callback: function(operation){ results.callback({}); lister.getStore().reload(); }								// 성공 실패 관계 없이 호출된다.

				});
			}
		}, me);
	},

});
