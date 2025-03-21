Ext.define('module.custom.aone.sale.esti.estimast.EstiMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupAone2',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.aone.sale.esti.estimast.model.EstiMastInvoice',
		'module.custom.aone.sale.esti.estimast.model.EstiMastMaster',
		'module.custom.aone.sale.esti.estimast.model.EstiMastFile',
		'module.custom.aone.sale.esti.estimast.model.EstiMastDetail',
		'module.custom.aone.sale.esti.estimast.model.EstiMastDetail2',
		'module.custom.aone.sale.esti.estimast.model.EstiMastDetail3',
		'module.custom.aone.sale.esti.estimast.model.EstiMastDetail4',
		'module.custom.aone.sale.esti.estimast.model.EstiMastDetail6'
	],
	stores:[
		'module.custom.aone.sale.esti.estimast.store.EstiMastInvoice',
		'module.custom.aone.sale.esti.estimast.store.EstiMastMaster',
		'module.custom.aone.sale.esti.estimast.store.EstiMastMaster2',
		'module.custom.aone.sale.esti.estimast.store.EstiMastDetail',
		'module.custom.aone.sale.esti.estimast.store.EstiMastDetail2',
		'module.custom.aone.sale.esti.estimast.store.EstiMastDetail3',
		'module.custom.aone.sale.esti.estimast.store.EstiMastDetail4',
		'module.custom.aone.sale.esti.estimast.store.EstiMastDetail6',
		'module.custom.aone.sale.esti.estimast.store.EstiMastFile'
	],
	views : [
		'module.custom.aone.sale.esti.estimast.view.EstiMastLayout',
		/* 현황 */
		'module.custom.aone.sale.esti.estimast.view.EstiMastSearch',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerMaster',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerMaster2',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail2',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail3',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail4',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail5',
		'module.custom.aone.sale.esti.estimast.view.EstiMastListerDetail6',
		/* 작업 */
		'module.custom.aone.sale.esti.estimast.view.EstiMastWorkerEditor',
		'module.custom.aone.sale.esti.estimast.view.EstiMastWorkerSearch',
		'module.custom.aone.sale.esti.estimast.view.EstiMastWorkerLister',
		'module.custom.aone.sale.esti.estimast.view.EstiMastAmendPopup',
		'module.custom.aone.sale.esti.estimast.view.EstiMastCalcPopup',
		'module.custom.aone.sale.esti.estimast.view.EstiMastCopyPopup',
		'module.custom.aone.sale.esti.estimast.view.EstiMastAcptPopup'
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
//			'module-estimast-lister-master menuitem[action=closeActiveAction]'		: { click : me.closeAction        }, /* 마감 */
//			'module-estimast-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeAction        }, /* 마감취소 */
//			'module-estimast-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
//			'module-estimast-lister-master menuitem[action=closeCancelAction]'		: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-estimast-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 견적복사 */
			'module-estimast-lister-master button[action=amendAction]'				: { click : me.amendAction        }, /* Amend*/
			'module-estimast-lister-master button[action=printAction]'				: { click : me.printAction        }, /* 견적서발행 */
			'module-estimast-lister-master button[action=calcAction]'				: { click : me.calcAction         }, /* 가공비산출 */
			'module-estimast-lister-master button[action=orderAction]'				: { click : me.orderAction        }, /* 수주등록 */

			'module-estimast-lister-master2 button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-estimast-lister-master2 button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-estimast-lister-master2 button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-estimast-lister-master2 button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
//			'module-estimast-lister-detail button[action=exportAction]'				: { click : me.exportDetailAction }, /* 엑셀 */

			'module-estimast-worker-lister button[action=updateAction]'				: { click : me.updateAction       }, /* 저장 */
			'module-estimast-worker-lister button[action=deleteAction]'				: { click : me.deleteAction2      }, /* 디테일삭제 */
			'module-estimast-worker-lister button[action=cancelAction]'				: { click : me.cancelAction       }, /* 취소 */

			'module-estimast-lister-detail3 button[action=updateAction]'			: { click : me.updateAction3      }, /*상담내역 저장 */
			'module-estimast-lister-detail3 button[action=cancelAction]'			: { click : me.cancelAction3      }, /* 취소 */

			'module-estimast-lister-detail5 button[action=updateAction]'			: { click : me.imgUpdateAction    }, /*이미지 저장 */
			'module-estimast-lister-detail5 button[action=cancelAction]'			: { click : me.imgCancelAction    }, /* 취소 */

			'module-estimast-lister-detail6 button[action=updateAction]'			: { click : me.updateAction6      }, /*자재소요 저장 */
			'module-estimast-lister-detail6 button[action=cancelAction]'			: { click : me.cancelAction6      }, /* 취소 */

			'module-estimast-lister-master' : {
				itemclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-estimast-lister-master2' : {
				itemclick    : me.selectDetail2,
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estimast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estimast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estimast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estimast-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-estimast-lister-master')[0] },
			master2 : function () { return Ext.ComponentQuery.query('module-estimast-lister-master2')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail')[0] },
			detail2 : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail2')[0] },
			detail3 : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail3')[0] },
			detail4 : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail4')[0] },
			detail5 : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail5')[0] },
			detail6 : function () { return Ext.ComponentQuery.query('module-estimast-lister-detail6')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-estimast-copy-popup')[0] },
		popup2  : function () { return Ext.ComponentQuery.query('module-estimast-calc-popup')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-estimast-lister-master2')[0] }
	},

// 2023/02/01 황유찬 / 현재 상태 관리 협의 여부로 인해 주석처리
/*
	// 마감
	closeAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master(),
			err_msg = ""
		;

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되었습니다.";
			}
		});

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}} else {
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
								url		: _global.location.http() + '/sale/esti/estimast/set/close.do',
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
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다.
								}
							});
						})
					}
				}
			});
		}
	},

	// 마감 취소
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
								url		: _global.location.http() + '/sale/esti/estimast/set/close.do',
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
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다.
								}
							});
						})
					}
				}
			});
		}
	},
*/

	// 조회
	selectAction : function(callbackFn) {
		var me = this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			layout	= me.pocket.layout(),
			imge	= layout.down('#imgTab'),
			mtrl	= layout.down('#mtrlTab')
		;

		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			imge.tab.hide();
			mtrl.tab.hide();

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback : function(records, operation, success) {
					if (success) {
						master2.getStore().clearData();
						master2.getStore().loadData([],false);
					} else { me.pocket.editor().getForm().reset(true); }
					mask.hide();
				}, scope:me
			}, Ext.merge(search.getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	// master1 선택
	selectDetail : function(grid, record) {
		var me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			detail  = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			detail4 = me.pocket.lister.detail4(),
			detail5 = me.pocket.lister.detail5(),
			detail6 = me.pocket.lister.detail6(),
			layout	= me.pocket.layout(),
			imge    = layout.down('#imgTab'),
			mtrl	= layout.down('#mtrlTab')
		;
		detail5.down('[name=image]').setSrc(null);
		detail5.down('[name=image2]').setSrc(null);

		if (record) {
			imge.tab.hide();
			mtrl.tab.hide();

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			// 제품 목록
			master2.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr') });

			// detail
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'),orgn_dvcd : 'esti_mast', uper_seqn : record.get('amnd_degr') });

			// 변경이력
			detail2.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr') });

			// 상담내역
			detail3.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr') });

			// 가공비
			detail4.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr') });

//			detail5.getStore().removeAll();

			detail6.getStore().removeAll();

			// 첨부파일
			detail.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			detail.down('[name=file]').popup.params.uper_seqn = record.get('amnd_degr');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.

			// 최종차수 버튼 표시
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/aone/sale/estimast/get/orderinfo.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb : record.get('invc_numb'),
						amnd_degr : record.get('amnd_degr')
					})
				},
				method : 'POST',
				success:function(response){
					var result = Ext.decode(response.responseText);
					if (result.success) {
						if ( record.get('amnd_degr') == result.records.max_amnd_degr) {
							var acpt_cofm_yorn = record.get('acpt_cofm_yorn');
								if(acpt_cofm_yorn == 0){
									master.down('[itemId=btnAmend]').show();
									master.down('[itemId=btnOrder]').show();
									master.down('[itemId=btnCalc]').show();
								}

							master.down('[itemId=btnCopy]').show();
							master.down('[itemId=btnPrint]').show();

//							master2.down('[itemId=btnInsert]').show();
//							master2.down('[itemId=btnModify]').show();
//							master2.down('[itemId=btnExport]').show();
//							master2.down('[itemId=btnDelete]').show();

							detail.down('[itemId=btnfileSelect]').show();
							detail.down('[itemId=btnFileDelete]').show();

							detail3.down('[itemId=cnslInsertRow]').show();
							detail3.down('[itemId=cnslDeleteRow]').show();
							detail3.down('[itemId=btnCnslUpdate]').show();
							detail3.down('[itemId=btnCnslCancel]').show();

							detail5.down('[itemId=imgSelect]').show();
							detail5.down('[itemId=imgUpdate]').show();
							detail5.down('[itemId=imgCancel]').show();

							detail6.down('[itemId=itemInsertRow]').show();
							detail6.down('[itemId=itemDeleteRow]').show();
							detail6.down('[itemId=btnItemUpdate]').show();
							detail6.down('[itemId=btnItemCancel]').show();

						}

					}
				},
				failure:function(result, request){
					Ext.Msg.show({ msg: '최종차수가 아닙니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				}
	    	 });
		}
	},

	// master2 선택
	selectDetail2 : function(grid, record) {
		var me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			detail5 = me.pocket.lister.detail5(),
			detail6 = me.pocket.lister.detail6(),
			layout	= me.pocket.layout(),
			imge    = layout.down('#imgTab'),
			mtrl	= layout.down('#mtrlTab')
		;

		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			imge.tab.show();
			mtrl.tab.show();
			detail5.down('[name=image]').setSrc(null);
			detail5.down('[name=image2]').setSrc(null);

				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/aone/sale/estimast/get/image.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							invc_numb		: record.get('invc_numb'),
							amnd_degr		: record.get('amnd_degr'),
							line_seqn		: record.get('line_seqn')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var item_imge = result.records[0].item_imge;
						var item_imge2 = result.records[0].item_imge2;
						if(item_imge != undefined){
							var x = item_imge.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							detail5.down('[name=image]').setSrc(url);
						}
						if(item_imge2 != undefined){
							var x = item_imge2.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							detail5.down('[name=image2]').setSrc(url);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

				detail5.down('[name=invc_numb]').setValue(record.get('invc_numb'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
				detail5.down('[name=amnd_degr]').setValue(record.get('amnd_degr'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
				detail5.down('[name=line_seqn]').setValue(record.get('line_seqn'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.

				detail6.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
						}, scope:me
				}, { invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr'), line_seqn : record.get('line_seqn') });
		}
	},


	// master 선택 변경
	selectRecord : function(){
		var me = this,
		 	master = me.pocket.lister.master(),
		 	master2 = me.pocket.lister.master2(),
			detail  = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			detail4 = me.pocket.lister.detail4(),
			detail5 = me.pocket.lister.detail5(),
			detail6 = me.pocket.lister.detail6(),
			workerlister = me.pocket.worker.lister(),
			layout	= me.pocket.layout(),
			imge    = layout.down('#imgTab'),
			mtrl	= layout.down('#mtrlTab')
		;
			workerlister.getStore().clearData();
			workerlister.getStore().loadData([],false);

			master.down('[itemId=btnCopy]').hide();
			master.down('[itemId=btnAmend]').hide();
			master.down('[itemId=btnOrder]').hide();
			master.down('[itemId=btnPrint]').hide();
			master.down('[itemId=btnCalc]').hide();

//			master2.down('[itemId=btnInsert]').hide();
//			master2.down('[itemId=btnModify]').hide();
//			master2.down('[itemId=btnExport]').hide();
//			master2.down('[itemId=btnDelete]').hide();

			detail.down('[itemId=btnfileSelect]').hide();
			detail.down('[itemId=btnFileDelete]').hide();

			detail3.down('[itemId=cnslInsertRow]').hide();
			detail3.down('[itemId=cnslDeleteRow]').hide();
			detail3.down('[itemId=btnCnslUpdate]').hide();
			detail3.down('[itemId=btnCnslCancel]').hide();

			detail5.down('[itemId=imgSelect]').hide();
			detail5.down('[itemId=imgUpdate]').hide();
			detail5.down('[itemId=imgCancel]').hide();

			detail6.down('[itemId=itemInsertRow]').hide();
			detail6.down('[itemId=itemDeleteRow]').hide();
			detail6.down('[itemId=btnItemUpdate]').hide();
			detail6.down('[itemId=btnItemCancel]').hide();

			imge.tab.hide();
			mtrl.tab.hide();

	},

	//이미지 업로드
	imgUpdateAction : function(grid, record){
		var me = this,
		master2	= me.pocket.lister.master2(),
		detail5	= me.pocket.lister.detail5(),
		store	= master2.getStore(),
		invc_numb = '' , amnd_degr = '', line_seqn = '',
		uploadForm = detail5.down('[name=uploadForm]'),
		item_imge  = detail5.down('[name=image]').src,
		item_imge2 = detail5.down('[name=image2]').src,
		chek1	   = detail5.down('[name=imge_chek1]').getValue(),
		chek2	   = detail5.down('[name=imge_chek2]').getValue(),
		param={},
		chk1=0, chk2=0
	;
		invc_numb  = detail5.down('[name=invc_numb]').getValue();
		amnd_degr  = detail5.down('[name=amnd_degr]').getValue();
		line_seqn  = detail5.down('[name=line_seqn]').getValue();

	if(item_imge){
		if(chek1 == "" || chek1 == undefined){
			chk1 = 10;
		}
		else{
			chk1 = 1;
		}
	}
	if(item_imge2){
		if(chek2 == "" || chek2 == undefined){
			chk2 = 10;
		}else{
			chk2 = 1;
		}
	}

	param.stor_grp  = _global.stor_grp;
	param.stor_id   = _global.stor_id;
	param.invc_numb = invc_numb;
	param.amnd_degr = amnd_degr;
	param.line_seqn = line_seqn;
	param.chk1		= chk1;
	param.chk2		= chk2;
	Ext.merge(param, this.params);
	uploadForm.getForm().setValues({
		param : JSON.stringify(param)
	});
    //submit
	uploadForm.getForm().submit({
		waitMsg:this.waitMsg, // progressbar 띄우기
		success:function(form, action){
			 Ext.Msg.alert('알림','저장 완료되었습니다.');
			store.reload();
		},
		failure: function(form, action) {
			Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
		}
	  })
	},

	//이미지 저장 취소
	imgCancelAction : function() {
		var	me = this,
		detail5 = me.pocket.lister.detail5()
	    ;
		detail5.getStore().reload();
	},

	// AMEND 추가
	amendAction : function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail2 = me.pocket.lister.detail2(),
			popup  = me.pocket.popup(),
			store  = detail2.getStore(),
			select = master.getSelectionModel().getSelection()[0],
			err_msg = "";

		if (select) {
			resource.loadPopup({
				widget : 'module-estimast-amend-popup',
				param : {
					invc_numb  : select.get('invc_numb'),
					amnd_degr  : select.get('amnd_degr'),
				},
			});
		}else{
			Ext.Msg.alert("알림", "amend 등록할 수주건을 선택 후 진행하십시오.");
			return;
		}

	},

	// 수정
	modifyAction : function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			err_msg = ""
		;

		if (select){
			if (select.get("line_clos") == "1") {
				Ext.Msg.alert("알림", "마감된 견적입니다.");
				return;
			}
			if (select.get("acpt_cofm_yorn") == "1") {
				Ext.Msg.alert("알림", "수주확정된 견적입니다.");
				return;
			}
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ invc_numb : select.get('invc_numb') , amnd_degr : select.get('amnd_degr') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}else {
			Ext.Msg.alert("알림", " 등록할 수주건을 선택 후 진행하십시오.");
			return;
		}
	},

	// 추가 버튼
	insertAction : function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister()
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

	// 가공비 산출 버튼
	calcAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup2(),
			select = master.getSelectionModel().getSelection()[0],
			err_msg = ""
		;

		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method	: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'esti_mast'
				})
			},
			async	: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				invc_numb = result.records[0].seq;
				esti_case_name = result.records[0].seq;
				esti_date = result.records[0].seq;
				cstm_name = result.records[0].seq;
				cstm_name = result.records[0].seq;
				deli_date = result.records[0].seq;
				esti_dvcd = result.records[0].seq;
				esti_amnt = result.records[0].seq;
				},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		if(select){
			popup = resource.loadPopup({
				widget	: 'module-estimast-calc-popup',
				param	: { hqof_idcd	: _global.hqof_idcd,
							stor_id		: _global.stor_id,
							invc_numb	: select.get('invc_numb'),	//견적번호
							esti_case_name	: select.get('esti_case_name'),	//견적명
							invc_date	: select.get('invc_date'),	//견적일자
							amnd_degr	: select.get('amnd_degr'),	//견적차수
							cstm_idcd	: select.get('cstm_idcd'),	//거래처ID
							cstm_name	: select.get('cstm_name'),	//거래처명
							user_name	: select.get('user_name'),	//작성자
							deli_date	: select.get('deli_date'),	//납기일자
							esti_dvcd	: select.get('esti_dvcd'),	//견적구분
							esti_amnt	: select.get('esti_amnt')	//견적금액
					}
				}
			);
		}else{
			Ext.Msg.alert('알림','BOM을 선택해주세요.');
		}
	},

	// 에디터 내용 저장 버튼
	updateAction:function() {
		var me = this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			master	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			detail	= me.pocket.lister.detail(),
			store	= master.getStore(),
			store2	= editor.getStore(),
			store3	= lister.getStore()
		;

		items = store3.data.items
		for(var i=0; i <items.length; i++){
			if(items[i].get('deli_date2') == "" || items[i].get('deli_date2') == null){
				Ext.Msg.alert("알림","납기일자를 선택하여 주세요.");
				return;
			}
		}

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
							master2.getStore().loadData(record.product().data.items, false);
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); },

					});
				}
			Ext.ComponentQuery.query('module-estimast-worker-search')[0].getForm().reset();
			}
		});
	},

	// 상담내역 저장 버튼
	updateAction3 : function() {
		var	me		 = this,
			detail3  = me.pocket.lister.detail3(),
			store    = detail3.getStore(),
			changes  = detail3.getStore().getUpdatedRecords().length,
			change   = detail3.getStore().data.items,
			length   = detail3.getStore().data.items.length,
			remove   = detail3.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = detail3.getStore();

			detail3.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}
		detail3.getStore().reload();
	},

	// 상담내역 취소 버튼
	cancelAction3 : function() {
		var	me = this,
			detail3  = me.pocket.lister.detail3(),
			store    = detail3.getStore(),
			changes  = store.getUpdatedRecords().length,
			change   = store.data.items,
			length   = store.data.items.length,
			remove   = store.removed.length,
			search   = me.pocket.search()
		;
		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			store.reload();
		}
	},

	// 자재소요 저장 버튼
	updateAction6 : function() {
		var	me		 = this,
			detail6  = me.pocket.lister.detail6(),
			store    = detail6.getStore(),
			changes  = store.getUpdatedRecords().length,
			change   = store.data.items,
			length   = store.data.items.length,
			remove   = store.removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();

			store.sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.'); },
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){ mask.hide();							}
			}, {synchro : _global.objects.synchro} );
		}
		store.reload();
	},

	// 자재소요 취소 버튼
	cancelAction6 : function() {
		var	me = this,
			detail6 = me.pocket.lister.detail6();
		;
		detail6.getStore().reload();
	},

	// 견적복사 버튼
	copyAction : function() {
		var me = this,
			master = me.pocket.lister.master(),
			records = master.getSelectionModel().getSelection(),
			err_msg = ""
		;

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		resource.loadPopup({
			widget : 'module-estimast-copy-popup',
			params : {
				invc_numb : records[0].get('invc_numb'),
				cstm_name : records[0].get('cstm_name'),
				cstm_idcd : records[0].get('cstm_idcd'),
				invc_date : records[0].get('invc_date'),
			},
		});
	},

	// 2023/01/13 황유찬 수주등록 수정
	orderAction:function() {
		var me	= this,
			master = me.pocket.lister.master(),
			store  = master.getStore(),
			select = master.getSelectionModel().getSelection()[0],
			selects= master.getSelectionModel().getSelection(),
			acpt_invc_numb;

		if(!selects || selects.length!=1) {
			Ext.Msg.alert("알림", "등록 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}

		if(select){
			if  (select.get('acpt_cofm_yorn') !== '0') {
				Ext.Msg.alert("알림", "이미 수주등록이 완료된 견적입니다.");
				return;
			}
		}

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id  : _global.stor_id,
					table_nm : 'acpt_mast'
				})
			},
			async   : false,
			method   : 'POST',
			success   : function(response, request) {
				var result = Ext.decode(response.responseText);
					acpt_invc_numb = 'A'+result.records[0].seq;
				}
		});
		resource.loadPopup({
			widget	: 'module-estimast-acpt-popup',
			param	: { hqof_idcd	: _global.hqof_idcd,
						stor_id		: _global.stor_id,
						amnd_degr	: select.get('amnd_degr'),	//견적서 번호
						invc_numb	: select.get('invc_numb'),	//견적서 차수
						deli_date	: select.get('deli_date'),	//납기일자
						acpt_invc_numb : acpt_invc_numb			//수주 번호
				}
			}
		);
	},

	// 에디터 내용 취소 버튼
	cancelAction : function() {
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
				Ext.ComponentQuery.query('module-estimast-worker-search')[0].getForm().reset();
			}
		});
	},

	// 삭제 버튼
	deleteAction : function() {
		var me = this,
			master	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			detail  = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			detail4 = me.pocket.lister.detail4(),
			detail5 = me.pocket.lister.detail5(),
			detail6 = me.pocket.lister.detail6(),
			store	= master.getStore(),
			store2	= master2.getStore(),
			select	= master.getSelectionModel().getSelection()[0],
			records = master.getSelectionModel().getSelection(),
			err_msg = ""
		;

		if(select) {
		if (select.get("acpt_cofm_yorn") == "1") {
				Ext.Msg.alert("알림", "수주확정된 견적입니다.");
				return;
		}}

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제할 수주건을 선택 후 진행하십시오.");
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
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/aone/sale/estimast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							amnd_degr	: records[0].get('amnd_degr'),
							uper_seqn	: records[0].get('amnd_degr'),
							line_seqn	: 0,
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
//							store2.loadData(records[0]);
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
						me.pocket.lister.master2().getStore().loadData([],false);
					}
				});
			}
		});
	},

	// workerlister detail 삭제
	deleteAction2:function(){
		var me = this,
			workerlister = me.pocket.worker.lister(),
			store  = workerlister.getStore(),
			editor = me.pocket.worker.editor(),
			record = editor.getRecord(),
			store2 = editor.getStore(),
			records = workerlister.getSelectionModel().getSelection(),
			err_msg = ""
		;

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
				}
			}
		});
	},

	// 2023/02/01 황유찬 / 견적서 리포트 작업시 열 예정

	// 견적서 발행
	printAction : function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'A-one_estimate.jrf',
			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
//			return;
//		}
		var invc_numb = select[0].get('invc_numb');
		var amnd_degr = select[0].get('amnd_degr');

		var arg =	'invc_numb~'+invc_numb+'~'+'amnd_degr~'+amnd_degr+'~';

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});
