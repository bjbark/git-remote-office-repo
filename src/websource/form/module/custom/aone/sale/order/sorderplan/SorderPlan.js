Ext.define('module.custom.aone.sale.order.sorderplan.SorderPlan', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupAone',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.aone.sale.order.sorderplan.model.SorderPlanMaster',
		'module.custom.aone.sale.order.sorderplan.model.SorderPlanMaster4',
		'module.custom.aone.sale.order.sorderplan.model.SorderPlanMtrl',
		'module.custom.aone.sale.order.sorderplan.model.SorderPlanDetail',
		'module.custom.aone.sale.order.sorderplan.model.SorderPlanFile'
	],
	stores:[
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster3',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanMaster4',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanDetail',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanImage',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanFile',
		'module.custom.aone.sale.order.sorderplan.store.SorderPlanMtrl',
	],
	views : [
		/* 현황 */
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanEditor',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanSearch',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanImage',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanImageLister',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster3',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster3_1',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanListerMaster4',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanEstiPopup',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanOrderPopup',
		/* 작업 */
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanWorkerEditor',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanWorkerMtrl',
		'module.custom.aone.sale.order.sorderplan.view.SorderPlanWorkerLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-aone-sorderplan-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-aone-sorderplan-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-aone-sorderplan-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-aone-sorderplan-layout #mainpanel'									: { tabchange : me.tabChange },
			'module-aone-sorderplan-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-aone-sorderplan-lister-master button[action=repairAllAction]'		: { click : me.repairAllAction    }, /* 수리지시(일괄) */
			'module-aone-sorderplan-lister-master button[action=repairAction]'			: { click : me.repairAction       }, /* 수리지시 */
			'module-aone-sorderplan-lister-master button[action=returnAction]'			: { click : me.returnAction       }, /* 반려*/
			'module-aone-sorderplan-lister-master button[action=estimateAction]'		: { click : me.estimateAction     }, /* 견적등록 */
			'module-aone-sorderplan-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-aone-sorderplan-lister-master button[action=printAction]'			: { click : me.printAction        }, /* 견적서발행 */

			'module-aone-sorderplan-worker-editor button[action=updateAction]'			: { click : me.updateAction       }, /* 저장 */
			'module-aone-sorderplan-worker-editor button[action=cancelAction]'			: { click : me.cancelAction       }, /* 취소 */
			'module-aone-sorderplan-image-lister'			: {
				selectionchange : me.imageChange
			}, /* 취소 */

			'module-aone-sorderplan-lister-master' : {
				selectionchange : me.selectRecord,
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-search')[0] },
		worker : {
			lister : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-worker-editorLister')[0] },
			editor : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-worker-editor')[0] },
			mtrl   : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-worker-mtrl')[0] }
		},
		master  : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-lister-master')[0] },
		master3 : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-lister-master3')[0] },
		master4 : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-lister-master4')[0] },
		image   : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-image-lister')[0] },
		imagepanel   : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-image')[0] },
		popup   : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-esti-popup')[0] },
		editor  : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-editor')[0] },
		mtrl    : function () { return Ext.ComponentQuery.query('module-aone-sorderplan-worker-mtrl')[0] }
	},

	tabChange:function() {
		Ext.ComponentQuery.query('module-aone-sorderplan-layout')[0].down('#planEdit').hide();
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			master	= me.pocket.master(),
			master3	= me.pocket.master3(),
			master4	= me.pocket.master4(),
			tpanel	= me.pocket.layout().down('#mainpanel'),
			tindex	= tpanel.items.indexOf(tpanel.getActiveTab()),
			search	= me.pocket.search(),
			editor	= me.pocket.worker.editor(),
			// lister	= me.pocket.worker.lister(),
			mtrl	= me.pocket.worker.mtrl(),
			param	= search.getValues(),
			param2	= editor.getValues(),
			layout	= me.pocket.layout(),
			planEdit = layout.down('#planEdit')
		;

		//에디터에 수리전 이미지 초기화

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			//에디터 내용 클리어
			// lister.getStore().clearData();
			// lister.getStore().loadData([],false);

			//에디터 견적 자재 클리어
			mtrl.getStore().clearData();
			mtrl.getStore().loadData([],false);

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();

			if(tindex == 0){
				lister = master;
			}else if(tindex ==1){
				lister = master3;
			}

		//주문리스트
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					//검색시 에디터 숨김
					planEdit.hide();
				} else { }
				mask.hide();
				}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

		//월간일정표
		if(tindex == 2){
			if(param2.invc_date==null || param2.invc_date=='' ){
				Ext.Msg.alert("알림", "조회년월을 선택해주십시오.");
				return;
			}else{
				master4.select({
					callback:function(records, operation, success) {
						if (success){
							master4.getSelectionModel().select(0);
							//검색시 에디터 숨김
							planEdit.hide();
						} else {  }
						mask.hide();
					}, scope:me
				}, Ext.merge(me.pocket.editor().getValues(), { stor_grp : _global.stor_grp }));
			}
		} //월간일정표 끝
		}
	},

	//수주의  detail 조회 기능
	selectRecord:function( grid, record ){
		var me = this,
			editor  = me.pocket.worker.editor(),
			mtrl    = me.pocket.worker.mtrl(),
			// editorlister  = me.pocket.worker.lister(),
			image   = me.pocket.image(),
			param   = me.pocket.search().getValues()
		;

		//에디터 이미지 초기화

		if(record.length > 0 && record[0].get('invc_numb').length > 0){
			editor.selectRecord({ lister : me.pocket.master() , record : record }, me);
			/*editorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			},{ invc_numb : record[0].get('invc_numb') , orgn_dvcd : 'acpt_mast' , upser_seqn : record[0].get('amnd_degr'),file_dvcd_1fst_yorn:'1'
			});*/
			image.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			},{ invc_numb : record[0].get('invc_numb') , orgn_dvcd : 'acpt_mast' , upser_seqn : record[0].get('amnd_degr'),file_dvcd_1fst:'3100'
			});
			// editorlister.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			// editorlister.down('[name=file]').popup.params.uper_seqn = record[0].get('amnd_degr');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		}

		//에디터 견적자재 불러오기
		var mtrl = me.pocket.worker.mtrl();

		if(record.length > 0){
			editor.selectRecord({ lister : me.pocket.master(), record : record }, me);
			if(record[0].get('invc_numb')){
				mtrl.select({
					callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id
									, invc_numb : record[0].get('invc_numb')
									, amnd_degr : record[0].get('amnd_degr')
				}) );
				if(record[0].get('acpt_stat_dvcd') != '3000') {
					//진행상태가 완료 되지 않은 수주에서 저장, 행추가(견적자재), 행삭제(견적자재) 버튼 보이기
					editor.down('[itemId=btnupdate]').show();
					mtrl.down('[itemId=itemInsertRow]').show();
					mtrl.down('[itemId=itemDeleteRow]').show();
				} else {
					//진행상태가 완료된 수주에서  저장, 행추가(견적자재), 행삭제(견적자재) 버튼 숨기기
					editor.down('[itemId=btnupdate]').hide();
					mtrl.down('[itemId=itemInsertRow]').hide();
					mtrl.down('[itemId=itemDeleteRow]').hide();
				}
				//에디터 취소 버튼은 무조건 보이기
				editor.down('[itemId=btncancel]').show();
			}else{
				//선택된 invc_numb가 없을시 견적자재 비우기
				mtrl.getStore().clearData();
				mtrl.getStore().loadData([],false);
			}
		}
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		master= smodel ? smodel.view.ownerCt : me.pocket.master(),
		master3= smodel ? smodel.view.ownerCt : me.pocket.master3(),
		master4= smodel ? smodel.view.ownerCt : me.pocket.master4(),

		record= record ? record[0] : master.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master3.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master4.getSelectionModel().getSelection()[0]
		;
	},

	//저장
	updateAction:function() {
		var me = this,
			master	= me.pocket.master(),
			editor	= me.pocket.worker.editor(),
			search	= me.pocket.search(),
			store	= master.getStore(),
			param	= editor.getValues(),
			select	= master.getSelectionModel().getSelection()[0],
			layout	= me.pocket.layout(),
			planEdit = layout.down('#planEdit')
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
					if	(results.success) {
						 results.feedback({success : true })
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
					store.reload();
					planEdit.show();
				}
			}
		});

		var mtrl = me.pocket.worker.mtrl();

		mtrl.getStore().sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.success) {
				}
			},
			finished : function(results, record, operation){
				if (results.success){
				}
			}
		});
		store.reload();
		mask.hide();
	},

	//수정 취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			// lister = me.pocket.worker.lister(),
			mtrl   = me.pocket.worker.mtrl(),
			param  = me.pocket.search().getValues(),
			layout	= me.pocket.layout(),
			planEdit = layout.down('#planEdit')
		;

		//에디터 이미지 비우기

		//취소시 에디터 부분 안보이게 숨기기
		planEdit.hide();

		//에디터 내용 클리어
		// lister.getStore().clearData();
		// lister.getStore().loadData([],false);


		editor.cancelRecord({
			caller : me,
			lister : me.pocket.worker.editor(),
			callback : function( results ) {
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				me.pocket.worker.editor().getForm().reset(true);

				results.feedback( {success : true, visible : false, selectRecord : true });
			}
		}, me);
	},

	//수리지시
	repairAction:function() {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			editor = me.pocket.worker.editor(),
			param  = me.pocket.search().getValues(),
			layout	= me.pocket.layout(),
			planEdit = layout.down('#planEdit')
			;

		if (select && select.length == 1) {
			if (select[0].get("acpt_stat_dvcd") == 6000) {
				Ext.Msg.alert("알림", "이미 출고된 제품입니다.");
				return;
			}

			if (select[0].get("repa_stat_dvcd") == 4000) {
				Ext.Msg.alert("알림", "이미 반려된 제품입니다.");
				return;
			}

			var acpt_dvcd = select[0].get("acpt_dvcd");
			var dept_idcd;

			if(acpt_dvcd == 1000) {
				dept_idcd = '000025'
			} else if (acpt_dvcd == 1100) {
				dept_idcd = '000025'
			} else if (acpt_dvcd == 2000) {
				dept_idcd = '000028'
			}

			editor.down('[name=prod_drtr_name]').popup.params.find_name = dept_idcd;

			editor.modifyRecord({
				caller	: me,
				params	: { param:JSON.stringify({
					invc_numb : select[0].get('invc_numb'),
					amnd_degr : select[0].get('amnd_degr'),
					})
				},
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
					}
				}
			});

			//진행상태가 출고완료가 아닌 수주건에서 에디터 표시
			planEdit.show();
		}else {
			Ext.Msg.alert("알림", "수리지시 하려는 1건을 선택해 주십시오.");
		}
	},

	// 견적금액 산출 버튼
	estimateAction:function() {
		var me = this,
			master = me.pocket.master(),
			popup  = me.pocket.popup(),
			search = me.pocket.search(),
			values = search.getValues(),
			select = master.getSelectionModel().getSelection()
		;
		if (select && select.length == 1) {
			if (select[0].get("acpt_stat_dvcd") == 3000) {
				Ext.Msg.alert("알림", "작업이 종료된 건은 견적금액 산출이 불가합니다.");
				return;
			}
			if (select[0].get("esti_amnt") == "") {
				Ext.Msg.alert("알림", "수리지시에서 견적자재 내역부터 등록해 주십시오.");
				return;
			}
			popup = resource.loadPopup({
				widget	: 'module-aone-sorderplan-esti-popup',
				param	:  {
					hqof_idcd	: _global.hqof_idcd,
					stor_id		: _global.stor_id,
					invc_numb	: select[0].get('invc_numb'),	//견적번호
					amnd_degr	: select[0].get('amnd_degr'),	//견적차수
					cstm_idcd	: select[0].get('cstm_idcd'),	//거래처ID
					cstm_name	: select[0].get('cstm_name'),	//거래처명
					esti_amnt	: select[0].get('esti_amnt'),	//견적금액
					invc1_date	: values.invc1_date,	//조회날짜1
					invc2_date	: values.invc2_date,	//조회날짜2
				}
			});
		}else {
			Ext.Msg.alert("알림", "수리지시 하려는 1건을 선택해 주십시오.");
		}
	},

	//반려
	returnAction:function() {
		var me	= this,
			master	  = me.pocket.master(),
			select	  = me.pocket.master().getSelectionModel().getSelection(),
			err_msg	  = ""
		;

		if (select.length > 0) {
			var records =[];
			Ext.each(select,function(rec){
				/*if(rec.get("acpt_stat_dvcd") == '3000'){
					err_msg = "작업종료된 지시서는  반려를 할 수 없습니다.";
				}else if(rec.get("acpt_stat_dvcd") == "2000"){
					err_msg = "작업지시된 지시서는 반려할 수 없습니다.";
				}else{
					records.push(rec.data);
				}*/
				records.push(rec.data);
			})

		/*	if(err_msg != "" ){
				Ext.Msg.alert("알림",err_msg);
				return;
			}*/

			Ext.Msg.confirm("확인", "해당 수주를 반려 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/aone/sale/order/sorderplan/set/return.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								repa_stat_dvcd	: "4000",
								records			: records
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
								Ext.ComponentQuery.query('module-aone-sorderplan-layout')[0].down('#planEdit').hide();
								Ext.Msg.alert("알림", "반려 등록이 완료 되었습니다.");
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
			Ext.Msg.alert("알림","반려할 수주목록을 선택해주십시오.");
		}
	},

	// 견적서 발행
	printAction:function() {
		var me = this,
			master= me.pocket.master(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'A-one_estimate.jrf',
			resId =_global.hq_id.toUpperCase()
		;

		var http_url = _global.img_http;
		if(_global.hq_id.toUpperCase() == 'N1000A-ONE'){
			http_url = _global.img_http.replace("https://", "http://");
		}

		if(select.length==1) {
			if(select[0].get('esti_amnt') != 0) {
				var invc_numb = select[0].get('invc_numb');
				var amnd_degr = select[0].get('amnd_degr');
				var arg =   'invc_numb~'+invc_numb+'~'+'amnd_degr~'+amnd_degr+'~'+'path~'+http_url+'~';

				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

				var win   =  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
				return win;
			}else {
				Ext.Msg.alert("알림", "견적비 산출이 완료되지 않았습니다.");
			}
		} else {
			Ext.Msg.alert("알림", "견적서 출력하시려는 1건을 선택 후 진행하십시오.");
		}
	},

	// 수리지시 일괄
	repairAllAction:function(){
		var me = this,
			master = me.pocket.master(),
			select = master.getSelectionModel().getSelection(),
			chk    = 0
		;
		if(select[0]){
			var arr = [];
			Ext.each(select,function(rec){
				if(rec.get('acpt_stat_dvcd')!="1000"){
					chk = 1;
				}else{
					arr.push(rec.data);
				}
			})
			if(chk==1){
				Ext.Msg.alert("알림", "작업대기인 작업만 지시가능합니다.");
				return;
			}
			resource.loadPopup({
				widget	: 'module-aone-sorderplan-order-popup',
				param	:  {
					hqof_idcd	: _global.hqof_idcd,
					stor_id		: _global.stor_id,
					records		: arr
				},
				listeners:{
					close:function(){
						master.getStore().reload();
					}
				}
			});
		}else{
			Ext.Msg.alert('알림','선택된 작업이 없습니다.');
			return;
		}
	},
	imageChange : function(grid,records){
		var me			= this,
			imagepanel	= me.pocket.imagepanel()
		;
		imagepanel.down('[name=aone_plan_imge]').setSrc('');
		if(records[0]){
			var url = _global.img_http+'/'+records[0].get('file_name');
			imagepanel.down('[name=aone_plan_imge]').setSrc(url+'?'+new Date().getTime());    // 브라우저 캐시 변경
			imagepanel.down('[name=aone_plan_imge]').setSrc(url);
		}
	},
	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},


});
