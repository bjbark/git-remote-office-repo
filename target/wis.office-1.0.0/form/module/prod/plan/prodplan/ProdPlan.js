Ext.define('module.prod.plan.prodplan.ProdPlan', { extend : 'Axt.app.Controller',

	requires	: [
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.BasePopup',
		'Axt.popup.view.ZipcodeSearch',
		'module.prod.plan.prodplan.view.ProdPlanMoldPopup',
		'module.prod.plan.prodplan.view.ProdPlanBasePopup',
		'lookup.popup.view.CvicPopup'
	],
	models	: [
		'module.prod.plan.prodplan.model.ProdPlan1',
		'module.prod.plan.prodplan.model.ProdPlan2',
		'module.prod.plan.prodplan.model.ProdPlan3'
	],
	stores	: [
		'module.prod.plan.prodplan.store.ProdPlan1',
		'module.prod.plan.prodplan.store.ProdPlan2',
		'module.prod.plan.prodplan.store.ProdPlan3',
		'module.prod.plan.prodplan.store.ProdPlanWrite'
	],
	views	: [
		'module.prod.plan.prodplan.view.ProdPlanLayout',
		'module.prod.plan.prodplan.view.ProdPlanLister1',
		'module.prod.plan.prodplan.view.ProdPlanLister2',
		'module.prod.plan.prodplan.view.ProdPlanLister3',
		'module.prod.plan.prodplan.view.ProdPlanSearch',
		'module.prod.plan.prodplan.view.ProdPlanCancel',
		'module.prod.plan.prodplan.view.ProdPlanWritePopup',
		'module.prod.plan.prodplan.view.ProdPlanEditor'
	],

	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init : function() {
		var me = this;
		me.control({
			'module-prodplan-layout #mainpanel'							: { tabchange : me.selectAction		},
			'module-prodplan-layout button[action=selectAction]'		: { click : me.selectAction			},	/* 조회 */
			'module-prodplan-lister1 button[action=changeAction]'		: { click : me.ganttAction			},	/* 일정보기 */
			'module-prodplan-lister1 button[action=insertAction]'		: { click : me.insertAction			},	/* 등록 */
			'module-prodplan-lister1 button[action=onePlanAction]'		: { click : me.onePlanAction		},	/* 건별지시 */
			'module-prodplan-lister1 button[action=exportAction]'		: { click : me.exportAction			},	/* 엑셀 */
			'module-prodplan-lister1 button[action=cancelOrderAction]'	: { click : me.cancelOrderAction	},	/* 주문취소 */
			'module-prodplan-lister2 button[action=exportAction]'		: { click : me.exportAction2		},	/* 엑셀 */
			'module-prodplan-lister3 button[action=exportAction]'		: { click : me.exportAction3		},	/* 엑셀 */
			'module-prodplan-lister2 button[action=deleteAction]'		: { click : me.deleteAction			},	/* 삭제 */
			'module-prodplan-lister2 button[action=modifyAction]'		: { click : me.modifyAction			},	// 수정
			'module-prodplan-lister2 button[action=okAction]'			: { click : me.okAction				},	// 지시확정
			'module-prodplan-lister2 button[action=cancleAction]'		: { click : me.cancleAction			},	// 지시취소
			'module-prodplan-lister2 menuitem[action=printAction]'		: { click : me.printAction			},	// 겉지출력
			'module-prodplan-lister2 menuitem[action=printAction2]'		: { click : me.printAction2			},	// 속지출력
			'module-prodplan-editor button[action=updateAction]'		: { click : me.updateAction			},	// 저장
			'module-prodplan-editor button[action=cancelAction]'		: { click : me.cancelAction			},	// 취소
			'module-prodplan-lister2' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			},
			'module-prodplan-lister3 button[action=updateAction]'		: { click : me.updateAction2		},	// lister2저장

		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-prodplan-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-prodplan-search')[0] },
		lister1	: function () { return Ext.ComponentQuery.query('module-prodplan-lister1')[0]},
		lister2	: function () { return Ext.ComponentQuery.query('module-prodplan-lister2')[0]},
		lister3	: function () { return Ext.ComponentQuery.query('module-prodplan-lister3')[0]},
		change	: function () { return Ext.ComponentQuery.query('module-prodplan-change-popup')[0] },
		write	: function () { return Ext.ComponentQuery.query('module-prodplan-write-popup')[0]},
		editor	: function () { return Ext.ComponentQuery.query('module-prodplan-editor')[0]}
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister1	= me.pocket.lister1(),
			lister2	= me.pocket.lister2(),
			lister3	= me.pocket.lister3(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(tindex==0){
			lister = lister1
		}else if(tindex==1){
			lister = lister2
		}else if(tindex==2){
			lister = lister3
		}
		if(param.fr_dt>param.to_dt){
			Ext.Msg.alert("알림", "일자를 다시 입력해주십시오.")
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);

					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	selectRecord : function( grid, record ) {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.selectRecord({ lister : me.pocket.lister2(), record : record }, me);
	},

	//수정
	modifyAction : function() {
		var me = this,
			editor   = me.pocket.editor(),
			lister2  = me.pocket.lister2(),
			select   = lister2.getSelectionModel().getSelection()[0]
		;
		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}
			}
		});
	},

	cancelAction : function() {
		var me = this,
			editor = me.pocket.editor()
		;
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister2(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister2(),
			store  = lister.getStore(),
			values = editor.getValues()
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					results.feedback({success : true  });
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
			finished : function(results, record, operation) {
				if (results.success){
//						me.pocket.layout().down('#mainpanel').setDisabled(false);
//						me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});
	},
	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister3(),
			store  = lister.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
				store.reload();
			}
		});
	},
	cancelOrderAction:function() {
		var me = this,
			lister1  = me.pocket.lister1(),
			select = lister1.getSelectionModel().getSelection()
		;
		if (!select || select.length != 1 ){
			Ext.Msg.error('취소 하시려는 1건을 선택 후 진행하십시오!');
			return;
		}

		var record = select[0];
		if (!(record.get('sts_cd') == '0190' || record.get('sts_cd') == '0100')) {
			Ext.Msg.error('입금대기/배송대기 상태만 취소 가능 합니다.');
			return;
		}

		if ( record.get('row_clos') == '1' ) {
			Ext.Msg.show({ title: '알림', msg: '마감된 내역은 취소 하실수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		Ext.Msg.confirm('확인','주문 취소 하시겠습니까?',  function(button) {
			if (button === 'yes'){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url: _global.api_host_info + '/' + _global.app_site + '/sale/prodplan/set/cancel.do' ,
					method:"POST",
					params: {
					 	token : _global.token_id ,
						param : Ext.encode({
							inv_no    : record.get('inv_no' ),
							upt_id : _global.login_pk
						})
					},
					success: function (response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success){
							record.set('sts_cd' , '0040');
							master.getStore().commitChanges();
						}else{
							Ext.Msg.show({ msg: result.message,  buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
						}
					},
					failure: function (response, request) {
						resource.httpError(response);
					},
					callback : function () {
						mask.hide();
					}

				});
			}
		});
	},

	onePlanAction:function() {
		var me  = this,
			lister = me.pocket.lister1() ,
			select = lister.getSelectionModel().getSelection(),
			a = new Array()
			b = new Array(),
			popup = Ext.ComponentQuery.query('module-prodplan-write-popup')[0]
		;
		var record = select[0];
		for(var i=0;i <select.length;i++){
			a.push(select[i].data.invc_numb);
			b.push(select[i].data.line_seqn);
		}

		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			for(var i=0;i <select.length;i++){
				if(select[0].get('item_idcd')!=select[i].get('item_idcd')){
					Ext.Msg.alert("알림", "동일품목의 항목을 선택해주십시오.");
					return;
				}
			}
			var item_idcd = select[0].data.item_idcd;
			var mold_find_name = item_idcd.substring(0, 5);
			resource.loadPopup({
				widget : 'module-prodplan-write-popup',
				params : {	invc_numb : a,
							line_seqn : b,
							mold_name : select[0].data.mold_name,
							mold_find_name: mold_find_name,
							wkct_item_idcd: select[0].data.item_idcd
				},
				result : function(result) {
					if (result.success) {
						record.dirtyValue( 'invc_numb' , record.get('invc_numb') );
					}
				}
			})
		}
	},

	changeAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			lister = me.pocket.lister1() ,
			select = lister.getSelectionModel().getSelection()
		;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
		var a = _global.api_host_info;
		var hq_id = _global.hq_id;
		var search_url	= '/system/ganttchart/getGanttProjectWork.do';
		var update_url	= '/system/ganttchart/setGanttProjectWork.do';
		var schd_dvcd	= '1000'; /* 개략설계  */
		if(select.length>0){
			var invc_numb	= select[0].get('invc_numb');
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '작업일정 관리',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+'/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',hq_id:\''+hq_id+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\'}" width="100%" height="100%">iframe</iframe>',
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
		}else{
			Ext.Msg.alert("알림","수주 항목을 선택해주십시오.");
		}
	},
	deleteAction:function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			store   = lister2.getStore()
			records = lister2.getSelectionModel().getSelection(),
			select  = lister2.getSelectionModel().getSelection()
		;
		console.log(select);
		if (select == null || select == '' ) {
			Ext.Msg.alert("알림", "삭제 하시려는 지시건을 선택해주세요.");
			return;
		}else{
			if(select.length > 1){
				Ext.Msg.alert("알림", "삭제는 한 건만 가능합니다.");
				return;
			}else{
				if (select[0].get('line_stat')=='1') {
					Ext.Msg.alert("알림", "확정 된 지시는 삭제할 수 없습니다.");
					return;
				}
			}
		}
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				for(var i=0;i<select.length;i++){
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/prod/plan/prodplan/set/delete.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: records[i].get('invc_numb')
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store.remove(records[i]);
								store.commitChanges();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister2().getStore().loadData([],false);
							store.reload();
						}
					});
				}
			}
		});
	},

	//지시확정
	okAction:function() {
		var me = this,
			select = me.pocket.lister2().getSelectionModel().getSelection(),
			lister = me.pocket.lister2()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_stat") == "1") {
					err_msg = "이미 확정 된 지시입니다.";
				}else if (record.get("cvic_idcd") == '' || record.get("cvic_idcd") == undefined || record.get("cvic_idcd") == 'DOOINCVIC00') {
					err_msg = "설비를 반드시 입력하여 주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "지시 확정할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 지시를 확정하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('line_stat'	, '1'); // 0:확정대기 / 1:확정
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/plan/prodplan/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_seqn		: record.get('line_seqn'),
										line_stat		: '1'
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

	//지시확정취소
	cancleAction:function() {
		var me = this,
			select = me.pocket.lister2().getSelectionModel().getSelection(),
			lister = me.pocket.lister2()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_stat") == "0") {
					err_msg = "확정취소 할 수 없는 지시입니다.";
				}
				if (record.get("prog_stat_dvcd") != "0") {
					err_msg = "확정취소 할 수 없는 지시입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "지시를 취소할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 지시를 확정 취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.set('line_stat'	, '0'); // 0:확정대기 / 1:확정
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/plan/prodplan/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_seqn		: record.get('line_seqn'),
										line_stat		: '0'
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

	// 겉지발행
	printAction:function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			select = me.pocket.lister2().getSelectionModel().getSelection(),
			jrf = 'ItemTag.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var line_seqn = select[0].get('line_seqn');
			var arg =	'invc_numb~'+invc_numb+'~'+'line_seqn~'+line_seqn+'~' ;

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},


	// 속지발행
	printAction2:function() {
		var me = this,
			lister2 = me.pocket.lister2(),
			select = me.pocket.lister2().getSelectionModel().getSelection(),
			jrf = 'DooinBom.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister2.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var line_seqn = select[0].get('line_seqn');
			var arg =	'invc_numb~'+invc_numb+'~'+'line_seqn~'+line_seqn+'~' ;

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	ganttAction:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			search = me.pocket.search(),
			param = search.getValues()
		;
		if(param.fr_dt == '' || param.to_dt == ''){
			Ext.Msg.alert('알림','기간을 선택해주세요.')
		}else{
			var hq_id		= _global.hq_id.toUpperCase();
				chk			= Ext.dom.Query.select('.x-css-shadow'),
				a			= _global.api_host_info,
				search_url	= '/system/ganttchart/gantt_query_1.do',
				update_url	= '',
				title		= '생산계획',
				source		= '생산계획',
				levels		= '2',
				to_dt		= param.to_dt,
				fr_dt		= param.fr_dt,
				url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',title:\''+title+'\',source:\''+source+'\',levels:\''+levels+'\',hq_id:\''+hq_id+'\',to_dt:\''+to_dt+'\',fr_dt:\''+fr_dt+'\'}'
			;
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '생산계획 관리',
						height:700,
						width:1500,
						maximizable : true,
						id : 'gantt_window',
		//				minimizable : true,
						html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%">iframe</iframe>',
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
		}
	},
	exportAction : function(self){
		this.pocket.lister1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self){
		this.pocket.lister2().writer({enableLoadMask:true});
	},
	exportAction3 : function(self){
		this.pocket.lister3().writer({enableLoadMask:true});
	}
});