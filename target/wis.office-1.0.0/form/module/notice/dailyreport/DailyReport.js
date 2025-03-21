Ext.define('module.notice.dailyreport.DailyReport', { extend: 'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PrjtPopup',
	],
	models	: [
		'module.notice.dailyreport.model.DailyReport'
	],
	stores	: [
		'module.notice.dailyreport.store.DailyReport'
	],
	views	: [
		'module.notice.dailyreport.view.DailyReportLayout',
		'module.notice.dailyreport.view.DailyReportSearch',
		'module.notice.dailyreport.view.DailyReportLister',
		'module.notice.dailyreport.view.DailyReportEditor',
		'module.notice.dailyreport.view.DailyReportPopup',
		'module.notice.dailyreport.view.DailyReportApvlPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.selectAction();
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dailyreport-layout button[action=selectAction]'			: { click : me.selectAction   },	// 조회
			'module-dailyreport-layout button[action=enrollment]'			: { click : me.enrollment     },	// 등록
			// lister event
			'module-dailyreport-lister button[action=inspAction]'			: { click : me.inspAction     },	// 신규
			'module-dailyreport-lister button[action=inspAction2]'			: { click : me.inspAction2    },	// 수정
			'module-dailyreport-lister button[action=exportAction]'			: { click : me.exportAction   },	// 엑셀
			'module-dailyreport-lister button[action=deleteAction]'			: { click : me.deleteAction   },	// 삭제

			'module-dailyreport-lister menuitem[action=okAction]'			: { click : me.okAction       },	// 승인
			'module-dailyreport-lister menuitem[action=rejectAction]'		: { click : me.okAction       },	// 반려
			'module-dailyreport-lister menuitem[action=okCancelAction]'		: { click : me.okAction       },	// 취소
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-dailyreport-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-dailyreport-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-dailyreport-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-dailyreport-lister')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-dailyreport-popup')[0] }
	},

	//추가팝업
	inspAction: function() {
		var me = this,
			lister   = me.pocket.lister(),
			popup    = me.pocket.popup(),
			search   = me.pocket.search(),
			today    = Ext.Date.format(new Date(),'Y-m-d'),
			invc_numb
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/notice/dailyreport/get/work.do',
			method	: 'POST',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					line_seqn	: invc_numb,
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					invc_numb = result.records[0].max;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		}),
		resource.loadPopup({
			widget : 'module-dailyreport-popup',
			params : {
				invc_numb 		: invc_numb,
				user_name		: _global.login_nm,
				user_idcd		: _global.login_pk,
				dwup_date		: today,
				plan_rslt_dvcd	: '',
				oprt_smry		: '',
				oprt_cont		: '',
				prjt_idcd		: '',
				prog_rate		: '0',
				user_memo		: '',
				_set			: 'insert'
			}
		});
	},

	//조회
	selectAction: function() {
		var me =this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param  = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operatioin, success) {
				if(success){
					lister.getSelectionModel().select(0);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//수정
	inspAction2: function() {
		var me = this,
			lister = me.pocket.lister(),
			popup  = me.pocket.popup(),
			record = lister.getSelectionModel().getSelection()
		;
		if(record[0]){
			if(record[0].data.apvl_dvcd=='0500'){
				Ext.Msg.alert(Const.NOTICE,"승인된 일지는 수정할 수 없습니다.");
				return;
			}
			if(record[0].get('user_idcd') == _global.login_pk){
				resource.loadPopup({
					widget : 'module-dailyreport-popup',
					params : {
						invc_numb 		: record[0].data.line_seqn,
						user_name		: record[0].data.user_name,
						user_idcd		: record[0].data.user_idcd,
						dwup_date		: record[0].data.dwup_date,
						oprt_smry		: record[0].data.oprt_smry,
						oprt_cont		: record[0].data.oprt_cont,
						prjt_idcd		: record[0].data.prjt_idcd,
						prjt_name		: record[0].data.prjt_name,
						prog_rate		: record[0].data.prog_rate,
						user_memo		: record[0].data.user_memo,
						plan_rslt_dvcd	: record[0].data.plan_rslt_dvcd,
						apvl_dvcd		: '0200',
						_set			: 'update'
					}
				});
			}else{
				Ext.Msg.alert(Const.NOTICE, "작성자 이외에는 수정 할 수 없습니다.");
			}
		}else{
			Ext.Msg.alert(Const.NOTICE, "수정 할 데이터를 선택하여 주시기 바랍니다.");
		}
	},

	//삭제
	deleteAction:function() {
		var me				= this,
			lister		= me.pocket.lister(),
			mrecords	= lister.getSelectionModel().getSelection()[0],
			store		= lister.getStore()
		;
		if(mrecords){
			if(mrecords.data.apvl_dvcd=='0500' || mrecords.data.apvl_dvcd=='0400'){
				Ext.Msg.alert(Const.NOTICE,"승인되거나 반려된 일지는 삭제할 수 없습니다.");
				return;
			}
			if(mrecords.get('user_idcd') == _global.login_pk){
				Ext.Msg.show({ title: '확인', msg: '선택하신 일지를 삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
					fn: function (button) {
						if (button=='yes') {
							Ext.Ajax.request({
								url		: _global.location.http() + '/notice/dailyreport/set/insp.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										line_seqn		: mrecords.get('line_seqn'),
										user_idcd		: mrecords.get('user_idcd'),
										dwup_date		: mrecords.get('dwup_date').replace(/\-/g,''),
										plan_rslt_dvcd	: mrecords.get('plan_rslt_dvcd'),
										_set			: 'delete'
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
										store.reload();
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
			}else{
				Ext.Msg.alert( Const.NOTICE , "작성자 이외에는 삭제 할 수 없습니다."  );
			}
		}else{
			Ext.Msg.alert( Const.NOTICE , "삭제 할 데이터를 선택하여 주시기 바랍니다."  );
		}
	},

	// 승인 처리
	okAction:function(callbackFn) {
		var me    = this,
			select = me.pocket.lister().getSelectionModel().getSelection(),
			lister = me.pocket.lister().getSelectionModel().getSelection()[0].data,
			store  = me.pocket.lister().getStore(),
			seqn   = lister.line_seqn,
			writer = lister.user_idcd,
			dwDate = lister.dwup_date.replace(/\-/g,''),
			plan   = lister.plan_rslt_dvcd,
			itemId = callbackFn.itemId,
			apvl   = lister.apvl_dvcd,
			chk    = 1
		;
		if (select && select.length != 0) {
			if(apvl == '0200'){
				if(itemId == 'cancel'){
					Ext.Msg.alert(Const.NOTICE,"승인요청 중인 일지는 취소할 수 없습니다.");
					chk = 1;
				}else { chk = 0 }
			}else if(apvl == '0400'){
				if(itemId == 'cancel'){
					apvl = '0200';
					chk = 0;
				}else if(itemId == 'reject'){
					Ext.Msg.alert(Const.NOTICE,"이미 반려 된 일지입니다.");
					chk = 1;
				}else { chk = 0 }
			}else if(apvl == '0500'){
				if(itemId == 'ok'){
					Ext.Msg.alert(Const.NOTICE,"이미 승인 된 일지입니다.");
					chk = 1;
				}else if(itemId == 'reject'){
					Ext.Msg.alert(Const.NOTICE,"이미 승인 된 일지는 반려 할 수 없습니다.");
					chk = 1;
				}else { chk = 0 }
			}
			if(chk == 1){
				return;
			}else{
				if(itemId == 'ok'){
					Ext.each(select, function(record) {
						resource.loadPopup({
							widget : 'module-dailyreport-apvl-popup',
							params : {
								line_seqn		: seqn,
								user_idcd		: lister.user_idcd,
								dwup_date		: lister.dwup_date,
								apvl_dvcd		: lister.apvl_dvcd,
								plan_rslt_dvcd	: lister.plan_rslt_dvcd,
								oprt_smry		: lister.oprt_smry,
								prjt_idcd		: lister.prjt_idcd,
								prog_rate		: lister.prog_rate,
								user_memo		: lister.user_memo,
								source_dvcd		: '업무일지',
								apvl_date		: Ext.Date.format(new Date(),'Y-m-d'),
							}
						});
					});
				}
				if(itemId == 'reject'){
					apvl = '0400'
					Ext.Msg.show({ title: '확인', msg: '선택하신 일지를 반려하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
						fn: function (button) {
							if (button=='yes') {
								Ext.each(select, function(record) {
									record.store.commitChanges();
								});
								Ext.each(select, function(record) {
									Ext.Ajax.request({
										url		: _global.location.http() + '/notice/dailyreport/set/ok.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												line_seqn		: seqn,
												user_idcd		: writer,
												dwup_date		: dwDate,
												plan_rslt_dvcd	: plan,
												apvl_dvcd		: apvl,
												oprt_smry		: lister.oprt_smry,
												prjt_idcd		: lister.prjt_idcd,
												prog_rate		: lister.prog_rate,
												user_memo		: lister.user_memo,
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												source_dvcd		: '업무일지',
												_set			: 'update'
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
												store.reload();
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
				if(itemId == 'cancel'){
					apvl = '0200';
					Ext.Msg.show({ title: '확인', msg: '취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
						fn: function (button) {
							if (button=='yes') {
								Ext.each(select, function(record) {
									record.store.commitChanges();
								});
								Ext.each(select, function(record) {
									Ext.Ajax.request({
										url		: _global.location.http() + '/notice/dailyreport/set/ok.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												line_seqn		: seqn,
												user_idcd		: writer,
												dwup_date		: dwDate,
												plan_rslt_dvcd	: plan,
												apvl_dvcd		: apvl,
												oprt_smry		: lister.oprt_smry,
												prjt_idcd		: lister.prjt_idcd,
												prog_rate		: lister.prog_rate,
												user_memo		: lister.user_memo,
												source_dvcd		: '업무일지',
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												_set			: 'update'
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
												store.reload();
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
			}
		} else {
			Ext.Msg.alert(Const.NOTICE, "업무일지를 선택하여 주시기 바랍니다.");
			return;
		}
	},

	//엑셀
	exportAction: function() {
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
