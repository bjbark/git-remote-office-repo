Ext.define('module.custom.aone.sale.order.sordermast.SorderMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupAone2',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.upload.CarouselPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.BasePopup'
	],

	models:[
		'module.custom.aone.sale.order.sordermast.model.SorderMastMaster',
		'module.custom.aone.sale.order.sordermast.model.SorderMastDetail',
		'module.custom.aone.sale.order.sordermast.model.SorderMastFilePopup',
		'module.custom.aone.sale.order.sordermast.model.SorderMastFile',
		'module.custom.aone.sale.order.sordermast.model.SorderMastPopupMans',
		'module.custom.aone.sale.order.sordermast.model.SorderMastPopupMtrl',
	],
	stores:[
		'module.custom.aone.sale.order.sordermast.store.SorderMastMaster',
		'module.custom.aone.sale.order.sordermast.store.SorderMastFilePopup',
		'module.custom.aone.sale.order.sordermast.store.SorderMastFile',
		'module.custom.aone.sale.order.sordermast.store.SorderMastPopupMans',
		'module.custom.aone.sale.order.sordermast.store.SorderMastPopupMtrl',
	],
	views : [
		'module.custom.aone.sale.order.sordermast.view.SorderMastLayout',
		/* 현황 */
		'module.custom.aone.sale.order.sordermast.view.SorderMastSearch',
		'module.custom.aone.sale.order.sordermast.view.SorderMastListerMaster',
		/* 작업 */
		'module.custom.aone.sale.order.sordermast.view.SorderMastWorkerEditor',
		'module.custom.aone.sale.order.sordermast.view.SorderMastWorkerLister',
		'module.custom.aone.sale.order.sordermast.view.SorderMastAmendPopup',
		'module.custom.aone.sale.order.sordermast.view.SorderMastCalcPopup',
		/* 입고등록 팝업  */
		'module.custom.aone.sale.order.sordermast.view.SorderMastInsertPopup',
		'module.custom.aone.sale.order.sordermast.view.SorderMastFilePopup',
		/*에디터 이미지*/
		'module.custom.aone.sale.order.sordermast.view.SorderMastImage',
		/* add Popup*/
		'module.custom.aone.sale.order.sordermast.view.SorderMastPopup',
		'module.custom.aone.sale.order.sordermast.view.SorderMastPopupMans',
		'module.custom.aone.sale.order.sordermast.view.SorderMastPopupMtrl',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-aone-sordermast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-aone-sordermast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-aone-sordermast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-aone-sordermast-layout button[action=selectAction]'					: { click : me.selectAction       	}, /* 조회 */

			'module-aone-sordermast-lister-master menuitem[action=releaseAction]'		: { click : me.releaseAction      	}, /* 출고등록 */
			'module-aone-sordermast-lister-master menuitem[action=releaseCancelAction]'	: { click : me.releaseCancelAction	}, /* 출고취소 */
			'module-aone-sordermast-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-aone-sordermast-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */

			'module-aone-sordermast-lister-master button[action=orderPrintAction]'		: { click : me.orderPrintAction   	}, /* 입고전표 발행 */
			'module-aone-sordermast-lister-master button[action=printAction]'			: { click : me.printAction        	}, /* 견적서발행 */
			'module-aone-sordermast-lister-master button[action=receiptAction]'			: { click : me.receiptAction      	}, /* 반입/반출증 발행 */
			'module-aone-sordermast-lister-master button[action=workPrintAction]'		: { click : me.workAction         	}, /* 작업보고서발행 */

			'module-aone-sordermast-lister-master button[action=storeAction]'			: { click : me.storeAction        	}, /* 입고등록 */
			'module-aone-sordermast-lister-master button[action=calcAction]'				: { click : me.calcAction         	}, /* 수리비산출 */
			'module-aone-sordermast-lister-master button[action=amendAction]'			: { click : me.amendAction        	}, /* 재수리등록 */
			'module-aone-sordermast-lister-master button[action=imageUpload]'			: { click : me.imageUpload        	}, /* 이미지등록 */

			'module-aone-sordermast-lister-master button[action=insertAction]'			: { click : me.insertAction       	}, /* 등록 */
			'module-aone-sordermast-lister-master button[action=modifyAction]'			: { click : me.modifyAction       	}, /* 수정 */
			'module-aone-sordermast-lister-master button[action=deleteAction]'			: { click : me.deleteAction       	}, /* 삭제 */
			'module-aone-sordermast-lister-master button[action=exportAction]'			: { click : me.exportAction       	}, /* 엑셀 */

			'module-aone-sordermast-worker-editor button[action=updateAction]'			: { click : me.updateAction       	}, /* 저장 */
			'module-aone-sordermast-worker-editor button[action=cancelAction]'			: { click : me.cancelAction       	}, /* 취소 */

			'module-aone-sordermast-lister-master'	: {
				selectionchange : me.selectRecord
			},
			'module-aone-sordermast-worker-editorLister'		: {
				selectionchange	: me.selectImage
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-aone-sordermast-layout')[0]},
		search : function () { return Ext.ComponentQuery.query('module-aone-sordermast-search')[0]},
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-aone-sordermast-worker-editor')[0]	  },
			lister : function () { return Ext.ComponentQuery.query('module-aone-sordermast-worker-editorLister')[0]},
			image  : function () { return Ext.ComponentQuery.query('module-aone-sordermast-image')[0]},
		},
		lister : {
			master : function () { return Ext.ComponentQuery.query('module-aone-sordermast-lister-master')[0]},
		},
		popup  : function () { return Ext.ComponentQuery.query('module-aone-sordermast-insert-popup')[0]},
//		popup  : function () { return Ext.ComponentQuery.query('module-aone-sordermast-amend-popup')[0] },
		popup2 : function () { return Ext.ComponentQuery.query('module-aone-sordermast-calc-popup')[0]  },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			master	= me.pocket.lister.master(),
			search	= me.pocket.search(),
			editor	= me.pocket.worker.editor(),
			param	= search.getValues(),
			selects = master.getSelectionModel().getSelection()[0]
		;

		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{

			//에디터 내용 초기화
			me.pocket.worker.editor().getForm().reset(true);

			//로딩 마스크
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			master.select({
				 callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));


		}
	},

	//조회시 작동할 기능
	selectRecord:function( grid, record ){
		var me = this,
			master		= me.pocket.lister.master(),
			editor		= me.pocket.worker.editor(),
			editorlister= me.pocket.worker.lister(),
			param		= me.pocket.search().getValues(),
			select		= master.getSelectionModel().getSelection()
		;

		if(select != '' && select != null ){
			if (select[0].get("acpt_stat_dvcd") == "6000") {

//				editor.down('[itemId=btnUpdate]').hide();
//				editor.down('[itemId=btnCancel]').hide();
//				editorlister.down('[itemId=attachItem]').hide();
			} else {
				editor.down('[itemId=btnUpdate]').show();
				editor.down('[itemId=btnCancel]').show();
//				editorlister.down('[itemId=attachItem]').show();
			}
		}

		if(record.length > 0 && record[0].get('invc_numb').length > 0){
			editor.selectRecord({ lister : master , record : record }, me);

			editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				invc_numb: select[0].get('invc_numb'),
				orgn_dvcd: 'acpt_mast',
				line_seqn: 0,
				uper_seqn: select[0].get('amnd_degr'),
				file_dvcd_1fst : "3100"
			}));
		}
	},

	// 재수리 등록
	amendAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup(),
			select = master.getSelectionModel().getSelection(),
			store  = master.getStore(),
			max_amnd_degr,
			amnd_degr = select[0].get('amnd_degr')
		;

		if (select && select.length == 1) {
			// 출고완료가 아닌 경우 return
			if (select[0].get("acpt_stat_dvcd") != "6000") {
				Ext.Msg.alert("알림", "출고가 완료되지 않았습니다.");
				return;
			}

			var records =[];
			Ext.each(select,function(rec){
				records.push({
					invc_numb : rec.get('invc_numb'),
					amnd_degr : rec.get('amnd_degr'),
					ostt_qntt : rec.get('invc_qntt'),
					line_seqn : rec.get('line_seqn'),
					prnt_idcd : rec.get('prnt_idcd'),
					ostt_drtr_idcd	: _global.login_id
				});
			})

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/orderInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param : JSON.stringify({
						records	: records
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						max_amnd_degr = result.records.max_amnd_degr;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

				if(max_amnd_degr > amnd_degr ) {
					Ext.Msg.alert('알림',"최종 차수가 아닌 수리품은 재수리를 할 수 없습니다.");
				} else {
					var prnt_idcd = select[0].get('prnt_idcd')?select[0].get('prnt_idcd'):select[0].get('invc_numb'); // prnt_idcd가 없을 경우 invc_numb를 사용
					var invc = "";

					if(select[0].get('acpt_dvcd') == '1100') {
						// 재수리의 재수리일 경우 R의 숫자를 늘려줌
					 	invc = select[0].get('invc_numb').slice(0,9) + '_R' + ( parseFloat(select[0].get('invc_numb').slice(-1)) + 1);
					} else {
						// 첫 재수리시 R1 추가
						invc = select[0].get('invc_numb')+"_R1";
					}

					// 재수리 팝업으로 값을 전달
					resource.loadPopup({
						widget : 'module-aone-sordermast-amend-popup',
						param : {
							invc_numb  : invc,
							remk_text  : select[0].get('remk_text') ,
							amnd_degr  : select[0].get('amnd_degr') ,
							prnt_idcd  : prnt_idcd
						},
					});
				}
			// 24.05.31 최종차수 검사를 추가 하며 주석처리
			/* Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/aone/sale/order/sordermast/get/amendCode.do',
				method		: "POST",
				params		: {
				token	: _global.token_id,
					param	: Ext.encode({
						// prnt_idcd 를 통해 새로운 invc_numb 가져오기
						prnt_idcd	: prnt_idcd,
						line_seqn	: 0,
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if (result.success) {
						var invc = "";
						var remk = "";
						if(result.records[0].seq){
							invc = result.records[0].seq;
							remk = result.records[0].remk_text;
						}else{
							invc = select[0].get('invc_numb')+"_R1";
						}
						resource.loadPopup({
							widget : 'module-aone-sordermast-amend-popup',
							param : {
								invc_numb  : invc,
								remk_text  : remk,
								amnd_degr  : select[0].get('amnd_degr') ,
								prnt_idcd  : prnt_idcd
							},
						});
					} else {
						Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {

				}
			});*/
		}else{
			Ext.Msg.alert("알림", "재수리 등록할 1건을 선택 후 진행하십시오.");
		}
	},

	//추가 버튼
	insertAction:function() {
		var me	= this,
			search		= me.pocket.search(),
			master		= me.pocket.lister.master(),
			editor		= me.pocket.worker.editor(),
			editorlister= me.pocket.worker.lister(),
			select		= master.getSelectionModel().getSelection(),
			selects		= master.getSelectionModel().getSelection()[0],

			date		= new Date(),
			param		= search.getValues()
		;
		date.setDate(date.getDate()+7);

		editor.down('[name=invc_numb]').hide();

		editor.down('[itemId=btnUpdate]').show();
		editor.down('[itemId=btnCancel]').show();


//		//첨부파일 버튼 숨기기
//		editor.down('[itemId=attachItemTab]').tab.hide();
//
//		//수리사진 및 수리비 산출 탭 숨기기
//		editor.down('[itemId=work_photo]').tab.hide();
//		editor.down('[itemId=repr_info]').tab.hide();
//
//		// 첨부파일 비우기
		editorlister.getStore().clearData();
		editorlister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
//				url			: _global.location.http() + '/listener/seq/maxid.do',
//				object		: resource.keygen,
//				params		: {
//					token	: _global.token_id ,
//					param	: JSON.stringify({
//						stor_id	: _global.stor_id,
//						table_nm: 'acpt_mast'
//					})
//				}
			},
			callback : function (keygen){
//				if (keygen.success){
					Ext.merge( param, {stor_id : _global.stor_id });
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( master.getStore().model.modelName,{
//							invc_numb	: keygen.records[0].seq,
							deli_date2	: Ext.Date.format(date,'Ymd'),
							acct_bacd	: '수리품',
						}),
						lister		: master,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback	: function (results){
							if  (results.success){
								results.feedback({success : true , visible : true });
								setTimeout(function(){
									editor.down('[name=cstm_idcd]').focus(true,10);
								},50);
							}
						}
					});
//				}
			}
		});
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor		= me.pocket.worker.editor(),
			master		= me.pocket.lister.master(),
			editorlister= me.pocket.worker.lister(),
			select		= master.getSelectionModel().getSelection(),
			param		= me.pocket.search().getValues()
		;
//		//첨부파일 버튼 보이기

		if (select && select.length == 1) {

			editor.down('[name=invc_numb]').show();


			if (select[0].get("acpt_stat_dvcd") == "6000") {
				Ext.Msg.alert("알림", "출고완료된건은 수정 불가합니다.");
				editor.down('[itemId=btnUpdate]').hide();
				editor.down('[itemId=btnCancel]').hide();
				return;
			} else {
				editor.down('[itemId=btnUpdate]').show();
				editor.down('[itemId=btnCancel]').show();
			}

			editor.modifyRecord({
				caller	: me,
				params	: {param:JSON.stringify({
					invc_numb : select[0].get('invc_numb'),
					amnd_degr : select[0].get('amnd_degr')
				})
			},
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					}
				}
			});
		}else{
			Ext.Msg.alert("알림", "변경할 목록 1건을 선택하여주십시오.");
		}
	},

	//저장
	updateAction:function() {
		var me = this,
			master	= me.pocket.lister.master(),
			editor	= me.pocket.worker.editor(),
			search	= me.pocket.search(),
			store	= master.getStore(),
			param	= editor.getValues(),
			select	= master.getSelectionModel().getSelection()[0],
			invc_numb,amnd_degr,
			chk = 0
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
										table_nm: 'acpt_mast'
									})
								},
								async  : false,
								callback : function( keygen ) {
									if (keygen.success) {
										if(record.get('prnt_idcd')==""){
											record.set('prnt_idcd',record.get('invc_numb'))
										}
										editor.insertRecord({
											caller	: me,
											record	: Ext.create( master.getStore().model.modelName,{
												invc_numb	: keygen.records[0].seq,
											}),
											lister		: master,
											disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
											callback	: function (results){
												if  (results.success){
													results.feedback({success : true , visible : true });
												}
											}
										});
										record.dirtyValue('invc_numb' , keygen.records[0].seq );
										record.set('hqof_idcd' , _global.hqof_idcd );
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
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},

			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
				}
			}
		});
	},

	//저장 취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			param  = me.pocket.search().getValues()
		;

		editor.cancelRecord({
			caller : me,
			lister : lister,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
//				me.pocket.worker.editor().getForm().reset(true);
//
//				lister.getStore().clearData();
//				lister.getStore().loadData([],false);
			}
		}, me);

//		editor.attachRecord({
//			caller : me ,
//			lister : me.pocket.worker.lister(),
//			callback : function (results , record ) {
//				if (results.success) {
//				}
//			}
//		});
	},

	//마스터 삭제
	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore(),
			select = master.getSelectionModel().getSelection();
		;

		if (select && select.length == 1) {
			if (select[0].get("acpt_stat_dvcd") != '0010') {
				Ext.Msg.alert("알림", "입고대기 상태인 제품만 삭제할 수 있습니다.");
				return;
			}

			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/aone/sale/order/sordermast/set/del_yn.do',
						method		: "POST",
						params		: {
						token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select[0].get('invc_numb'),
								amnd_degr	: select[0].get('amnd_degr'),
								prnt_idcd	: select[0].get('prnt_idcd'),
								line_seqn	: 0,
								uper_seqn	: select[0].get('amnd_degr'),
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store.remove(select[0]);
								store.commitChanges();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							master.getStore().reload();
						}
					});
				}
			});
		} else {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
		}
	},

	// 견적서 발행
	printAction:function() {
		var me = this,
			master= me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			selects = master.getSelectionModel().getSelection()[0],
			jrf = 'A-one_estimate.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		if(select.length == 1) {
			if(selects.get('make_cost') != 0) {
			var invc_numb = select[0].get('invc_numb');
			var amnd_degr = select[0].get('amnd_degr');
			var arg =	'invc_numb~'+invc_numb+'~'+'amnd_degr~'+amnd_degr+'~';

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
			}else {
				Ext.Msg.alert("알림", "견적비 산출이 완료되지 않았습니다.");
			}
		} else {
			Ext.Msg.alert("알림", "견적서 출력하시려는 1건을 선택 후 진행하십시오.");
		}
	},

	// 입고전표 발행
	orderPrintAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			jrf    = 'A-one_Sordermast.jrf',
			resId  = _global.hq_id.toUpperCase()
		;
		var err_msg = "";

		var records = master.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
			a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'amnd_degr\':\''+record[i].get('amnd_degr')+'\'}';

			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win   =  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	//	 반입/반출증 발행
	receiptAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			record = master.getSelectionModel().getSelection(),
			jrf    = 'A-one_receipt.jrf',
			resId  = _global.hq_id.toUpperCase()
		;
		var err_msg = "";

		var records = master.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
				Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a+= "[";
			}
			a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'amnd_degr\':\''+record[i].get('amnd_degr')+'\'}';

			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win   =  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 작업보고서 발행
	workAction:function() {
		var me = this,
			master= me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			selects = master.getSelectionModel().getSelection()[0],
			jrf = 'A-one_Sorderostt.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";

		var http_url = _global.img_http;
		if(_global.hq_id.toUpperCase() == 'N1000A-ONE'){
			http_url = _global.img_http.replace("https://", "http://");
		}

		if(select.length == 1) {
			var invc_numb = select[0].get('invc_numb');
			var amnd_degr = select[0].get('amnd_degr');
			var arg =	'invc_numb~'+invc_numb+'~'+'amnd_degr~'+amnd_degr+'~'+'path~'+http_url+'~';

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
			return win;
		} else {
			Ext.Msg.alert("알림", "작업보고서 출력하시려는 1건을 선택 후 진행하십시오.");
		}
	},

	//수리비 산출
	calcAction:function() {
		var me = this,
			master  = me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if (select && select.length == 1) {
			if (select[0].get("acpt_stat_dvcd") == "6000") {
				Ext.Msg.alert("알림", "출고완료된 제품은 수리비 산출을 수정할 수 없습니다.");
				return;
			}

			if (select[0].get("acpt_stat_dvcd") != "3000") {
				Ext.Msg.alert("알림", "작업완료 상태가 아닌 제품은 수리비 산출을 등록할 수 없습니다.");
				return;
			}

			if (select[0].get("repa_stat_dvcd") == "4000") {
				Ext.Msg.alert("알림", "반려된 제품은 수리비 산출을 등록할 수 없습니다.");
				return;
			}

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/repairCalc.do',
				method	: "POST",
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select[0].get('invc_numb'),
						amnd_degr		: select[0].get('amnd_degr'),
						prnt_idcd		: select[0].get('prnt_idcd')
					})
				},
				success : function(response, request) {
					var object = response,
					result = Ext.decode(object.responseText)
					;
					if (result.success) {
						resource.loadPopup({
							widget : 'module-aone-sordermast-calc-popup',
							params : {
								invc_numb	   :select[0].get('invc_numb'),
								amnd_degr	   :select[0].get('amnd_degr'),
								cstm_name	   :select[0].get('cstm_name'),
								invc_date	   :select[0].get('invc_date'),
								item_name	   :select[0].get('item_name'),
								sral_numb	   :select[0].get('sral_numb'),
								need_time	   :result.records[0].need_time,
								prts_repa_amnt :result.records[0].prts_repa_amnt,
								prod_drtr_idcd :result.records[0].prod_drtr_idcd,
								prod_drtr_name :result.records[0].prod_drtr_name,
								work_invc_numb :result.records[0].work_invc_numb,
								prnt_idcd	   :select[0].get('prnt_idcd')
							}
						});
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
		} else {
			Ext.Msg.alert("알림", "수리비 산출 목록을  1건 선택하여 주십시오.");
		}
	},

	//입고등록(멀티)
	storeAction:function() {
		var me	= this,
			master	= me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection(),
			popup	= me.pocket.popup(),
			modify 	= 0,
			err_msg = ""
		;
		if (select && select.length > 0) {
			Ext.each(select, function(record) {
				if(record.get("acpt_stat_dvcd") != '0010' && record.get("acpt_stat_dvcd") != '1000') {
					err_msg = "처리 할수 없는 상태입니다.";
					return false;
				}
				if(record.get("acpt_stat_dvcd") == '1000'){
					modify++;
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
			if(modify > 0){
				Ext.Msg.confirm("확인", "이미 입고 등록 된 상품입니다.<br><br>수정 하시겠습니까?", function(button) {
					if (button == 'yes') {
						var popup = resource.loadPopup({
							widget	: 'module-aone-sordermast-insert-popup',
							param	: {
								select		: select,
							}
						})
						popup.down('[name = istt_date]').setValue(select[0].data.istt_date);
						popup.down('[name = acpt_dvcd]').setValue(select[0].data.acpt_dvcd);
						popup.down('[name = brin_yorn]').setValue(select[0].data.brin_yorn);
						popup.down('[name = modi_yorn]').setValue('y');
					}else{
						return;
					}
				})
			}else{
				resource.loadPopup({
					widget	: 'module-aone-sordermast-insert-popup',
					param	: {
						select		: select,
						acpt_dvcd 	: select[0].data.acpt_dvcd,
					}
				})
			}

		} else {
			Ext.Msg.alert("알림","입고목록을 선택해주십시오.");
			return;
		}
	},


	//출고등록(멀티)
	releaseAction:function() {
		var me	= this,
			master	= me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection(),
			err_msg = ""
		;

		if (select && select.length > 0) {
			Ext.each(select, function(record) {
				if(record.get("acpt_stat_dvcd") != "3000"){
					err_msg = "작업종료된 입고리스트만 출고가능합니다.";
					return false;
				}

				if(record.get("acpt_stat_dvcd") == "3000" && record.get("repa_stat_dvcd") == "2000" || record.get("repa_stat_dvcd") == "3000" ){
					if(record.get("invc_amnt") == "0"){
						err_msg = "수리비 산출이 완료되지 않았습니다.";
						return false;
					}
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}

			Ext.Msg.confirm("확인", "출고등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					var re =[];
					for(var i =0; i< select.length ; i++){
						re.push({
							invc_numb : select[i].get('invc_numb'),
							amnd_degr : select[i].get('amnd_degr'),
							ostt_qntt : select[i].get('invc_qntt'),
							line_seqn : select[i].get('line_seqn'),
							wrhs_idcd : select[i].get('wrhs_idcd'),
							zone_idcd : select[i].get('zone_idcd'),
							ostt_drtr_idcd	: _global.login_id
						});
					}

					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/aone/sale/order/sordermast/set/release.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param : JSON.stringify({
								records	: re
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
							} else {
								Ext.Msg.alert("알림", "출고 등록이 완료 되었습니다.");
								master.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		} else {
			Ext.Msg.alert("알림","출고목록을 선택해주십시오.");
			return;
		}
	},

	//출고 취소 등록
	releaseCancelAction:function() {
		var me	= this,
			master	= me.pocket.lister.master(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection(),
			err_msg = "",
			max_amnd_degr,
			amnd_degr = select[0].get('amnd_degr')
		;
		if (select) {
			var records =[];
			Ext.each(select,function(rec){
				if(rec.get("acpt_stat_dvcd") != "6000"){
					err_msg = "출고완료된 입고리스트만 출고가능합니다.";
				}else{
					records.push({
						invc_numb : rec.get('invc_numb'),
						amnd_degr : rec.get('amnd_degr'),
						ostt_qntt : rec.get('invc_qntt'),
						line_seqn : rec.get('line_seqn'),
						prnt_idcd : rec.get('prnt_idcd'),
						ostt_drtr_idcd	: _global.login_id
					});
				}
			})
			if(err_msg!=""){
				Ext.Msg.alert('알림',err_msg);
				return;
			}

			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/aone/sale/order/sordermast/get/orderInfo.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param : JSON.stringify({
						records	: records
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						max_amnd_degr = result.records.max_amnd_degr;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			if(max_amnd_degr > amnd_degr ) {
				Ext.Msg.alert('알림',"최종 차수가 아닌 수리품은 출고취소를 할 수 없습니다.");
			} else {
				Ext.Msg.confirm("확인", "출고취소 등록 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/aone/sale/order/sordermast/set/releasecancel.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param : JSON.stringify({
									records	: records
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
								} else {
									Ext.Msg.alert("알림", "출고 취소가 완료 되었습니다.");
									master.getStore().reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				});
			}


		}
	},
	imageUpload:function(){
		var	me	= this,
			master	= me.pocket.lister.master(),
			select	= master.getSelectionModel().getSelection()[0],
			image	= me.pocket.worker.lister(),
			panel	= me.pocket.worker.image()
		;

		if(select){
			var prnt_idcd = select.get('prnt_idcd')?select.get('prnt_idcd'):select.get('invc_numb');
			resource.loadPopup({
				widget  : 'module-aone-sordermast-file-popup',
				params  : {
					stor_grp  :_global.stor_grp,
					invc_numb : select.get('invc_numb'),
					orgn_dvcd : 'acpt_mast',
					line_seqn : 0,
					uper_seqn : select.get('amnd_degr'),
					prnt_idcd : prnt_idcd,
					file_dvcd_1fst : "3100"
				},
				listeners: {
					close:function(){
						image.getStore().reload();
					}
				}
			});
		}
	},
	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
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
			Ext.Msg.alert("알림", "마감할 오더를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag', '1');     // 1:마감&마감해지
							record.set('line_clos', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/aone/sale/order/sordermast/set/lineClos.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_clos		: '1',
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
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()
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
			Ext.Msg.show({ title: '확인', msg: '선택하신 오더를 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('_flag'		, '1'); // 1:마감&마감해지
							record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/aone/sale/order/sordermast/set/lineClos.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										line_clos		: '0',
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
	selectImage:function(grid, record){
		var me = this,
			image = me.pocket.worker.image()
		;

		image.down('[name=imge_1fst]').setSrc('');
		var reg = new RegExp('\.(jpeg|jpg|gif|png)', 'i')
		if(record.length > 0 && record[0].get('file_name').search(reg)){
			var url = _global.img_http+'/'+record[0].get('file_name');
			image.down('[name=imge_1fst]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
			image.down('[name=imge_1fst]').setSrc(url);
		}
	},
});
