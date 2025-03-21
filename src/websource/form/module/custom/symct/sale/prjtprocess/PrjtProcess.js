Ext.define('module.custom.symct.sale.prjtprocess.PrjtProcess', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup'
	],

	models	: [
		'module.custom.symct.sale.prjtprocess.model.PrjtProcessMaster',
		'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail3',
		'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail3',
		'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail5',
		'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail8'
	],
	stores	: [
		'module.custom.symct.sale.prjtprocess.store.PrjtProcessMaster',
		'module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail3',
		'module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail5',
		'module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail8'
	],
	views	: [
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessLayout',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessSearch',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessListerMaster',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessListerDetail3',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessListerDetail5',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessListerDetail8',
		'module.custom.symct.sale.prjtprocess.view.PrjtProcessColtPopup',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtprocess-layout button[action=selectAction]'				: { click : me.selectAction     },	// 조회
			'module-prjtprocess-layout #detail'									: { tabchange : me.selectDetail },
			// editer event
			'module-prjtprocess-editor button[action=updateAction]'				: { click : me.updateAction     },	// 저장
			'module-prjtprocess-editor button[action=cancelAction]'				: { click : me.cancelAction     },	// 취소
			// lister master event
			'module-prjtprocess-lister-master button[action=exportAction]'		: { click : me.exportAction1    },	// 엑셀
			'module-prjtprocess-lister-master button[action=coltreportAction]'	: { click : me.coltreportAction },	// 수금보고
			'module-prjtprocess-lister-master menuitem[action=closeAction]'		: { click : me.closeAction      },	// 마감
			'module-prjtprocess-lister-master menuitem[action=closecancelAction]':{ click : me.closecancelAction},	// 마감해지
			'module-prjtprocess-lister-master menuitem[action=closeholdAction]'	: { click : me.closeholdAction  },	// 마감보류
			'module-prjtprocess-lister-master menuitem[action=closeremkAction]'	: { click : me.closeremkAction  },	// 마감육성
			'module-prjtprocess-lister-master' : {
				itemdblclick : me.selectDetail ,
			},
			// lister detail event
			'module-prjtprocess-lister-detail3 button[action=exportAction]'	: { click : me.exportAction4 },	// 디테일3엑셀
			'module-prjtprocess-lister-detail4 button[action=exportAction]'	: { click : me.exportAction5 },	// 디테일4엑셀
			'module-prjtprocess-lister-detail5 button[action=exportAction]'	: { click : me.exportAction6 },	// 디테일5엑셀
			'module-prjtprocess-lister-detail8 button[action=exportAction]'	: { click : me.exportAction9 },	// 디테일8엑셀
			'module-prjtprocess-lister-detail1 button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			'module-prjtprocess-lister-detail1 button[action=changeAction]'	: { click : me.changeAction1 }, /* 설계일정 조정   */
			'module-prjtprocess-lister-detail3 button[action=changeAction]'	: { click : me.changeAction2 }, /* 작업일정 조정   */

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		  : function () { return Ext.ComponentQuery.query('module-prjtprocess-layout')[0] },
		search		  : function () { return Ext.ComponentQuery.query('module-prjtprocess-search')[0] },
		listermaster  : function () { return Ext.ComponentQuery.query('module-prjtprocess-lister-master')[0] },
		listerdetail3 : function () { return Ext.ComponentQuery.query('module-prjtprocess-lister-detail3')[0] },
		listerdetail5 : function () { return Ext.ComponentQuery.query('module-prjtprocess-lister-detail5')[0] },
		listerdetail8 : function () { return Ext.ComponentQuery.query('module-prjtprocess-lister-detail8')[0] },
		coltpopup     : function () { return Ext.ComponentQuery.query('module-prjtprocess-colt-popup')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail1 = me.pocket.listerdetail3(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		listermaster = me.pocket.listermaster();
		listermaster.select({
			callback:function(records, operation, success) {
				if (success) {
					listerdetail1.getSelectionModel().select(0);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectDetail : function(grid, record) {
		var me = this,
			listermaster  = me.pocket.listermaster(),
			listerdetail3 = me.pocket.listerdetail3(),
//			listerdetail4 = me.pocket.listerdetail4(),
			listerdetail5 = me.pocket.listerdetail5(),
			listerdetail8 = me.pocket.listerdetail8(),
			tpanel        = me.pocket.layout().down('#detail'),
			tindex        = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister        = undefined,
			record        = listermaster.getSelectionModel().getSelection()[0]
		;
		if (record) {
			if(tindex == 0){
				lister = listerdetail3
			}else if(tindex == 1){
				lister = listerdetail5
			}else if(tindex == 2){
				lister = listerdetail8
			}else if(tindex == 4){
				lister = listerdetail8
			}

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister.select({
				 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd') });
		}
	},

	changeAction1:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var search_url	= '/system/ganttchart/getGanttProjectDesign.do';
		var update_url	= '/system/ganttchart/setGanttProjectDesign.do';
		var invc_numb	= 'test project';

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '설계일정 관리',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\'}" width="100%" height="100%">iframe</iframe>',
					listeners : {
						show : function (win) {
							win.maximize ();
						},
						minimize: function(data) {
							win.setVisible(false);
							var a;
							var button = Ext.create('Ext.Button', {
								text: data.title,
								style: 'z-index: 9999!important',
								draggable :true,
								renderTo: Ext.getBody(),
								listeners : {
									move : function (e) {// dropped
										a = 1;
									},
									click : function(e) {
										if(a==1){
											x = button.getX();
											y = button.getY();
											temp = 1;
											a = 0;
											return;
										}else{
											win.setVisible(true);
											this.destroy();
										}
									}
								}
							});
							if(temp == 0){
								button.setX(200);
								button.setY(850);
							}else{
								button.setX(x);
								button.setY(y);
							}
						}
					}
			}); win.show();
		}
	},

	changeAction2:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var search_url	= '/system/ganttchart/getGanttProjectWork.do';
		var update_url	= '/system/ganttchart/setGanttProjectWork.do';
		var invc_numb	= 'test project';

		if(chk.length ==0||chk[0].style.display=="none"){
			var win = Ext.create("Ext.window.Window",
				{	title : '설계일정 관리',
					height:700,
					width:1500,
					maximizable : true,
					id : 'gantt_window',
	//				minimizable : true,
					html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\'}" width="100%" height="100%">iframe</iframe>',
					listeners : {
						show : function (win) {
							win.maximize ();
						},
						minimize: function(data) {
							win.setVisible(false);
							var a;
							var button = Ext.create('Ext.Button', {
								text: data.title,
								style: 'z-index: 9999!important',
								draggable :true,
								renderTo: Ext.getBody(),
								listeners : {
									move : function (e) {// dropped
										a = 1;
									},
									click : function(e) {
										if(a==1){
											x = button.getX();
											y = button.getY();
											temp = 1;
											a = 0;
											return;
										}else{
											win.setVisible(true);
											this.destroy();
										}
									}
								}
							});
							if(temp == 0){
								button.setX(200);
								button.setY(850);
							}else{
								button.setX(x);
								button.setY(y);
							}
						}
					}
			}); win.show();
		}
	},

	//마감
	closeAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.listermaster().getSelectionModel().getSelection(),
			listermaster = me.pocket.listermaster()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '1') {
					err_msg = "마감할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 수주 목록을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '1');
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtprocess/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: record.get('pjod_idcd'),
										line_clos		: '1'
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

	//마감해지
	closecancelAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.listermaster().getSelectionModel().getSelection(),
			listermaster = me.pocket.listermaster()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '0') {
					err_msg = "마감 해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 수주내역을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '0');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtprocess/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: record.get('pjod_idcd'),
										line_clos		: '0'
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

	//마감대기
	closeholdAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.listermaster().getSelectionModel().getSelection(),
			listermaster = me.pocket.listermaster()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '2') {
					err_msg = "대기 할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "대기할 수주내역을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 대기하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '2');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtprocess/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: record.get('pjod_idcd'),
										line_clos		: '2'
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

	//마감육성
	closeremkAction:function(callbackFn) {
		var me = this,
			select       = me.pocket.listermaster().getSelectionModel().getSelection(),
			listermaster = me.pocket.listermaster()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get('line_clos') == '3') {
					err_msg = "육성 할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "육성할 수주내역을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 내역을 육성하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('line_clos', '3');
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/sale/project/prjtprocess/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: record.get('pjod_idcd'),
										line_clos		: '3'
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

	coltreportAction:function() {
		var me  = this,
			listermaster = me.pocket.listermaster() ,
			select = listermaster.getSelectionModel().getSelection(),
//			a = new Array()
//			b = new Array(),
			popup = Ext.ComponentQuery.query('module-prjtprocess-colt-popup')[0]
		;
//		var record = select[0];
//		for(var i=0;i <select.length;i++){
//			a.push(select[i].data.invc_numb);
//			b.push(select[i].data.line_seqn);
//		}
		if(select.length == 0){
			Ext.Msg.alert("알림","수금 보고 할 내역을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-prjtprocess-colt-popup',
				params : {
					pjod_idcd : select[0].get('pjod_idcd')
				},
				result : function(result) {
//					if (result.success) {
//						record.dirtyValue( 'invc_numb' , record.get('invc_numb') );
//					}
				}
			})
//			var a = Ext.ComponentQuery.query('#mold_idcd')[0].setValue(select[0].data.mold_idcd);
//			var b = Ext.ComponentQuery.query('#mold_name')[0].setValue(select[0].data.mold_name);
//			var c = Ext.ComponentQuery.query('#mtrl_name')[0].setValue(select[0].data.mtrl_name);
//			var d = Ext.ComponentQuery.query('#mtrl_bacd')[0].setValue(select[0].data.mtrl_bacd);
		}
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.listerdetail3().writer({enableLoadMask:true});
	},
	exportAction5 : function() {
		this.pocket.listerdetail4().writer({enableLoadMask:true});
	},
	exportAction6 : function() {
		this.pocket.listerdetail5().writer({enableLoadMask:true});
	},
	exportAction7 : function() {
		this.pocket.listerdetail6().writer({enableLoadMask:true});
	},
	exportAction8 : function() {
		this.pocket.listerdetail7().writer({enableLoadMask:true});
	},
	exportAction9 : function() {
		this.pocket.listerdetail8().writer({enableLoadMask:true});
	}
});