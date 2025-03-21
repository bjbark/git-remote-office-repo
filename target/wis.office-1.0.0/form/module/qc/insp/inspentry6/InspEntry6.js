
Ext.define('module.qc.insp.inspentry6.InspEntry6', { extend : 'Axt.app.Controller',

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
		'module.qc.insp.inspentry6.model.InspEntry6Master',
		'module.qc.insp.inspentry6.model.InspEntry6Lister1',
		'module.qc.insp.inspentry6.model.InspEntry6Lister2',
		'module.qc.insp.inspentry6.model.InspEntry6Lister3',

	],
	stores:[
		'module.qc.insp.inspentry6.store.InspEntry6Master',
		'module.qc.insp.inspentry6.store.InspEntry6Lister1',
		'module.qc.insp.inspentry6.store.InspEntry6Lister2',
		'module.qc.insp.inspentry6.store.InspEntry6Lister3',

	],
	views : [
		'module.qc.insp.inspentry6.view.InspEntry6Layout',
		/* 현황 */
		'module.qc.insp.inspentry6.view.InspEntry6Search',
		'module.qc.insp.inspentry6.view.InspEntry6ListerMaster',
		'module.qc.insp.inspentry6.view.InspEntry6Lister1',
		'module.qc.insp.inspentry6.view.InspEntry6Lister2',
		'module.qc.insp.inspentry6.view.InspEntry6Lister3',

	],
	init: function() {
		var me = this;
		me.control({
			'module-inspentry6-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */

			'module-inspentry6-lister-master menuitem[action=closeActiveAction]'	: { click : me.closeAction			}, /* 마감 */
			'module-inspentry6-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeAction			}, /* 마감취소 */

			'module-inspentry6-lister-master button[action=dsseAction]'				: { click : me.dsseAction			}, /* 불량폐기 */
			//'module-inspentry6-lister-master button[action=useAction]'				: { click : me.useAction		}, /* 재고사용입고 = 구매입고 */
			'module-inspentry6-lister-master button[action=returnAction]'			: { click : me.returnAction			}, /* 업체반품 */
			'module-inspentry6-lister-master button[action=exportAction]'			: { click : me.exportAction			}, /* 엑셀 */
			'module-inspentry6-lister1 button[action=exportAction]'					: { click : me.exportLister1Action	}, /* 엑셀 */
			'module-inspentry6-lister1 button[action=dropAction]'					: { click : me.dropAction1			}, /* 공정 불량 폐기 */
			'module-inspentry6-lister1 button[action=specialAction]'				: { click : me.specialAction1		}, /* 공정 불량 특채 */
			'module-inspentry6-lister1 button[action=reWorkAction]'					: { click : me.reWorkAction			}, /* 공정 불량 재작업지시 */
			'module-inspentry6-lister1 button[action=returnAction]'					: { click : me.returnAction1		}, /* 공정 불량 반품 */
			'module-inspentry6-lister2 button[action=exportAction]'					: { click : me.exportLister2Action	}, /* 엑셀 */
			'module-inspentry6-lister2 button[action=specialAction]'				: { click : me.specialAction2		}, /* 최종 불량 특채 */
			'module-inspentry6-lister2 button[action=dropAction]'					: { click : me.dropAction2			}, /* 최종 불량 폐기 */
			'module-inspentry6-lister2 button[action=reWorkAction]'					: { click : me.reWorkAction			}, /* 최종 불량 재작업지시 */
			'module-inspentry6-lister2 button[action=returnAction]'					: { click : me.returnAction2		}, /* 최종 불량 반품 */
			'module-inspentry6-lister3 button[action=exportAction]'					: { click : me.exportLister3Action	}, /* 엑셀 */
			'module-inspentry6-lister3 button[action=dropAction]'					: { click : me.dropAction3			}, /* 출고 불량 폐기 */
			'module-inspentry6-lister3 button[action=specialAction]'				: { click : me.specialAction3		}, /* 출고 불량 특채 */
			'module-inspentry6-lister3 button[action=reWorkAction]'					: { click : me.reWorkAction			}, /* 출고 불량 재작업지시 */
			'module-inspentry6-lister3 button[action=returnAction]'					: { click : me.returnAction3		}, /* 출고 불량 반품 */

			'module-inspentry6-lister-master' : {
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-inspentry6-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspentry6-search')[0] },
		lister : {
		master : function () { return Ext.ComponentQuery.query('module-inspentry6-lister-master')[0] },
		},
		lister1 : function () { return Ext.ComponentQuery.query('module-inspentry6-lister1')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-inspentry6-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-inspentry6-lister3')[0] },
	},

	selectAction:function(callbackFn) {

		var me = this,
			lister = me.pocket.lister.master(),
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			temp = '',
			master = undefined,
			search = me.pocket.search(),
			param = search.getValues()
		;
//		if(tindex==0){
//			master = lister;
//			temp = 'query';
//		}else{
//			master = lister1;
//			temp = 'entry';
//		}

//		lister.select({
//			 callback:function(records, operation, success) {
//				if (success) {
//					lister.getSelectionModel().select(0);
//				} else {
//				}
//				mask.hide();
//			}, scope:me
//		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, query : temp  }));

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		if(tindex==0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp, query : temp  }));
		}else if(tindex==1){
			lister1.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==2){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		} else if(tindex==3){
			lister3.select({
				callback:function(records, operation, success) {
					if (success) {
						lister3.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},
	dsseAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			now = new Date(),
			res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "불량폐기 할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}

		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 불량폐기하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
							Ext.each(select, function(record) {
								var value = {invc_numb		: select.get('invc_numb'),
										line_seqn		: select.get('line_seqn'),
										poor_qntt		: select.get('poor_qntt'),
										trtm_drtr_idcd	: _global.user_idcd};
								Ext.Ajax.request({
									url		: _global.location.http() + '/qc/insp/inspentry6/set/dsse.do',
									params	: {
										token : _global.token_id,
										invc_numb		: select.get('invc_numb'),
										line_seqn		: select.get('line_seqn'),
										trtm_drtr_idcd	: _global.user_idcd,
										param : JSON.stringify({
											records : [value]
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
	//수입 반품
	returnAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()[0],
			now = new Date(),
			res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 업체반품하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
							Ext.each(select, function(record) {
								var value = {invc_numb		: select.get('invc_numb'),
										line_seqn		: select.get('line_seqn'),
										poor_qntt		: select.get('poor_qntt'),
										trtm_drtr_idcd	: _global.user_idcd};
								Ext.Ajax.request({
									url		: _global.location.http() + '/qc/insp/inspentry6/set/return.do',
									params	:{
										token : _global.token_id,
										invc_numb		: select.get('invc_numb'),
										line_seqn		: select.get('line_seqn'),
										poor_qntt		: select.get('poor_qntt'),
										trtm_drtr_idcd	: _global.user_idcd,
										param : JSON.stringify({
											records : [value]
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
	//공정검사 반품
	returnAction1:function() {
		var me = this,
			lister = me.pocket.lister1(),
			select = lister.getSelectionModel().getSelection()[0],
			now = new Date(),
			res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 업체반품하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/return1.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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
	//최종검사 반품
	returnAction2:function() {
		var me = this,
		lister = me.pocket.lister2(),
		select = lister.getSelectionModel().getSelection()[0],
		now = new Date(),
		res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 업체반품하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/return2.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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
	//출고검사 반품
	returnAction3:function() {
		var me = this,
		lister = me.pocket.lister3(),
		select = lister.getSelectionModel().getSelection()[0],
		now = new Date(),
		res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 업체반품하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/return3.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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

	useAction:function() {
		var me = this,
		master = me.pocket.lister.master(),
		select = master.getSelectionModel().getSelection()[0],
		now = new Date(),
		res = now.toISOString().slice(0,10).replace(/-/g,"")
		;
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "재고사용입고 할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 재고사용입고 처리 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/set/book.do',
								params	: {
									token : _global.token_id,
									invc_numb		: select.get('invc_numb'),
									line_seqn		: select.get('line_seqn'),
									job_dvcd		: '구매입고',
									param : JSON.stringify({
										a : 'a'
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

	//재작업지시
	reWorkAction:function(){
		var me = this,
		select = '',
		lister = '',
		source_dvcd='',
		wkct_insp_dvcd1='',
		insp_sbsc_seqn1='',
		now = new Date(),
		res = now.toISOString().slice(0,10).replace(/-/g,"")
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		var err_msg = "";
		if(tindex==1){
			lister = me.pocket.lister1(),
			select = lister.getSelectionModel().getSelection()[0];
			_source_dvcd="공정재작업";
		}else if(tindex==2){
			lister =  me.pocket.lister2(),
			select = lister.getSelectionModel().getSelection()[0];
			_source_dvcd="최종재작업";
		}else if(tindex==3){
			lister = me.pocket.lister3(),
			select = lister.getSelectionModel().getSelection()[0];
			_source_dvcd="출고재작업";
		}

		if(!select){
			Ext.Msg.alert("알림", "재작업지시할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 재작업지시 처리 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{
													trtm_drtr_idcd : _global.user_idcd,
													_source_dvcd : _source_dvcd,
													});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/repror.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {

									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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


	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
	exportLister1Action : function(self) {
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportLister2Action : function(self) {
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportLister3Action : function(self) {
		this.pocket.lister3().writer({enableLoadMask:true});
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
	},

	//공정검사 폐기
	dropAction1 : function(){
		var me = this,
		lister = me.pocket.lister1(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 폐기하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/drop1.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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


	dropAction2 : function(){
		var me = this,
		lister = me.pocket.lister2(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 폐기하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/drop2.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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

	//출고검사 폐기
	dropAction3 : function(){
		var me = this,
		lister = me.pocket.lister3(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "업체 반품할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 폐기하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/return3.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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


	//공정검사 특채
	specialAction1 : function(){
		var me = this,
		lister = me.pocket.lister1(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "특채할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 특채하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/special1.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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

	//최종검사 특채
	specialAction2 : function(){
		var me = this,
		lister = me.pocket.lister2(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "특채할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 특채하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/special2.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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

	//출고검사 특채
	specialAction3 : function(){
		var me = this,
		lister = me.pocket.lister3(),
		select = lister.getSelectionModel().getSelection()[0];
		var err_msg = "";
		if(!select){
			Ext.Msg.alert("알림", "특채할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if(select.get('poor_qntt') == '0' || null){
			Ext.Msg.alert("알림", "불량수량이 없는 데이터입니다.");
			return;
		}
		if(select.get('rett_qntt') != 0 || select.get('dsse_qntt')!=0 ||select.get('rewk_qntt')!=0||select.get('scex_qntt')!=0){
			Ext.Msg.alert("알림", "이미 처리된 데이터입니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 검사항목을 특채하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.merge(record.data,{trtm_drtr_idcd : _global.user_idcd});
							Ext.Ajax.request({
								url		: _global.location.http() + '/qc/insp/inspentry6/set/special3.do',
								params	:{
									token : _global.token_id,
									param : Ext.JSON.encode(record.data)
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										lister.getStore().reload();
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

});
