Ext.define('module.design.project.dsigplan2.DsigPlan2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup'
	],

	models	: [
		'module.design.project.dsigplan2.model.DsigPlan2Master',
		'module.design.project.dsigplan2.model.DsigPlan2Detail1',
		'module.design.project.dsigplan2.model.DsigPlan2Detail3'
	],
	stores	: [
		'module.design.project.dsigplan2.store.DsigPlan2Master',
		'module.design.project.dsigplan2.store.DsigPlan2Detail1',
		'module.design.project.dsigplan2.store.DsigPlan2Detail3'
	],
	views	: [
		'module.design.project.dsigplan2.view.DsigPlan2Layout',
		'module.design.project.dsigplan2.view.DsigPlan2Search',
		'module.design.project.dsigplan2.view.DsigPlan2ListerMaster',
		'module.design.project.dsigplan2.view.DsigPlan2ListerDetail1',
		'module.design.project.dsigplan2.view.DsigPlan2ListerDetail3',
		'module.design.project.dsigplan2.view.DsigPlan2Finder'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dsigplan2-layout button[action=selectAction]'			: { click : me.selectAction  },	// 조회
			// lister detail event
			'module-dsigplan2-lister-detail1 button[action=modifyAction]'	: { click : me.modifyAction  },	// 수정
			'module-dsigplan2-lister-detail1 button[action=insertAction]'	: { click : me.insertAction  },	// 신규
			'module-dsigplan2-lister-detail1 button[action=exportAction]'	: { click : me.exportAction  },	// 엑셀
			'module-dsigplan2-lister-detail1 button[action=deleteAction]'	: { click : me.deleteAction  },	// 삭제
			'module-dsigplan2-lister-detail1 button[action=changeAction]'	: { click : me.changeAction1 }, /* 설계일정 조정   */
			'module-dsigplan2-lister-detail1 button[action=copyAction]'		: { click : me.copyAction    }, /* 설계일정 조정   */
			'module-dsigplan2-lister-detail1 button[action=approveAction]'	: { click : me.approveAction }, /* 승인   */
			'module-dsigplan2-lister-detail1 button[action=approveCancel]'	: { click : me.approveCancel }, /* 해제   */
			'module-dsigplan2-lister-detail1 menuitem[action=okAction]'			: { click : me.okAction },			/* 승인 */
			'module-dsigplan2-lister-detail1 menuitem[action=okCancelAction]'	: { click : me.okCancelAction },	/* 승인취소 */
			'module-dsigplan2-lister-detail1 button[action=writeAction]'	: { click : me.writeAction   }, /* 일정작성   */
			// editer event
			'module-dsigplan2-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-dsigplan2-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-dsigplan2-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-dsigplan2-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-dsigplan2-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-dsigplan2-lister-master')[0] },
		listerdetail1: function () { return Ext.ComponentQuery.query('module-dsigplan2-lister-detail1')[0] },
		listerdetail3: function () { return Ext.ComponentQuery.query('module-dsigplan2-lister-detail3')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-dsigplan2-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-dsigplan2-finder')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail3 = me.pocket.listerdetail3(),
			search = me.pocket.search(),
			param = search.getValues(),
			finder = me.pocket.finder(),
			pjod_idcd = search.down('[name=pjod_idcd]').getValue(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(pjod_idcd){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listerdetail1.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail1.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id,pjod_idcd:pjod_idcd}) );
			listerdetail3.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail3.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id, pjod_idcd:pjod_idcd}) );
		}else{
		Ext.Msg.alert('알림',Language.get('acpt_numb', '금형코드')+'를 선택해주세요.');
		}
	},
	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor()
		;

		editor.modifyRecord({
			caller	: me,
			callback: function( results ){
				if (results.success){
					results.feedback( {success : true, visible : true } );
				}me.pocket.layout().down('#mainpanel').setDisabled(true);
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	//신규
	insertAction:function() {
		var me = this,
			search = me.pocket.search(),
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			param = search.getValues(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]
			sub = listerdetail.down('#sub').grid.store.data.length;
		;
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url		: _global.location.http() + '/listener/seq/maxid.do',
					object	: resource.keygen,
					params	: {
						token : _global.token_id ,
						param : JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'cvic_chck',
							invc_numb	: mrecord.get('cvic_idcd')
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( listerdetail.getStore().model.modelName,{
								cvic_idcd :  mrecord.get('cvic_idcd'),
								cvic_name : mrecord.get('cvic_name'),
								line_seqn : sub+1
							}),
							listerdetail: listerdetail,
							disables	: [me.pocket.layout().down('#mainpanel')],
//							disables	: [me.pocket.layout().down('#itempanel')],
							callback: function (results){
								if (results.success) {
									results.feedback({success : true , visible : true });
								}
							}
						});
					}
				}
			});
	},
	updateAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			editor = me.pocket.editor(),
			store  = listerdetail.getStore()
		;
		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('cvic_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token : _global. token_id ,
								param : JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'cvic_mast'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('cvic_idcd' , keygen.records[0].seq );
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
						callback: function(operation){ results.callback({}); },
					} );
				}
			},
			finished : function(results, record, operation){
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				if (results.success){
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : listerdetail.getSelectionModel().select(record ); break;
						}
				}
			}
		});
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},
	copyAction:function(){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			select = listerdetail1.getSelectionModel().getSelection()[0],
			store = listerdetail1.getStore(),
			plan_dvcd = 'dsig',
			finder = me.pocket.finder(),
			search = me.pocket.search(),
			pjod_idcd = search.down('[name=pjod_idcd]').getValue(),
			msg,
			chk
		;
		if(pjod_idcd){
			if(select){
				msg = '이미 처리된 일정계획입니다. 대일정을 가져오시겠습니까?';
			}else{
				msg = '대일정을 가져오시겠습니까?';
			}
			Ext.Msg.show({ title: '확인', msg: msg, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/dsigplan2/get/getPrint.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									invc_numb		: pjod_idcd,
									plan_dvcd		: plan_dvcd
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
					}else{
						return;
					}
				}
			});
		}else{
			Ext.Msg.error(Language.get('pjod_idcd', '금형번호')+'를 확인해주세요.');
		}
	},
	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.listerdetail()
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
			}, { cvic_idcd : record.get('cvic_idcd') });
		}
	},

	//삭제
	deleteAction : function() {
		var me = this,
		editor = me.pocket.editor();
		listerdetail = me.pocket.listerdetail();
		editor.deleteRecord({
			lister : me.pocket.listerdetail(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			record : record ? record : lister.getSelectionModel().getSelection(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},
	changeAction1:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
			a = _global.api_host_info,
			search_url	= '/system/ganttchart/getGanttProjectDesign1.do',
			update_url	= '/system/ganttchart/setGanttProjectDesign1.do',
			pjod_idcd	= me.pocket.search().down('[name=pjod_idcd]').getValue(),
			invc_numb	= pjod_idcd,
			schd_dvcd	= 2000,
			hq_id = _global.hq_id,
			url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\',hq_id:\''+hq_id+'\'}',
			listerdetail1 = me.pocket.listerdetail1()
		;
		if(pjod_idcd == null||pjod_idcd ==""){
			Ext.Msg.alert("error",Language.get('pjod_idcd', '금형번호')+' 조회 후 조정가능합니다.');
		}else{
			if(chk.length ==0||chk[0].style.display=="none"){
				var win = Ext.create("Ext.window.Window",
					{	title : '설계일정 관리',
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
							close:function(){
								listerdetail1.getStore().reload();
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
	//승인
	approveAction:function(){
		var me			= this,
			finder		= me.pocket.finder(),
			search		= me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue()
			line_clos	= finder.down('[name=line_clos]')
		;
		Ext.Msg.show({ title: '확인', msg: '승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/design/dsigplan1/set/setApprove.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								pjod_idcd		: pjod_idcd,
								updt_idcd		: _global.login_id,
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
								line_clos.setValue('1');
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}else{
					return;
				}
			}
		});
	},
	//해제
	approveCancel:function(){
		var me			= this,
		finder		= me.pocket.finder(),
		search		= me.pocket.search(),
		pjod_idcd	= search.down('[name=pjod_idcd]').getValue()
		line_clos	= finder.down('[name=line_clos]')
		;
		Ext.Msg.show({ title: '확인', msg: '해제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.Ajax.request({
						url		: _global.location.http() + '/design/dsigplan1/set/setApprove.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								pjod_idcd		: pjod_idcd,
								updt_idcd		: _global.login_id,
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
								line_clos.setValue('0');
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}else{
					return;
				}
			}
		});
	},

	writeAction:function(){
		var me				= this,
			finder			= me.pocket.finder(),
			search			= me.pocket.search(),
			listerdetail1	= me.pocket.listerdetail1(),
			pjod_idcd		= search.down('[name=pjod_idcd]').getValue(),
			store			= me.pocket.listerdetail1().getStore()
		;
		if(pjod_idcd==''){
			Ext.Msg.alert('알림',Language.get('pjod_idcd', '금형번호')+'를 선택해주세요.');
		}else{
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 60,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '이미 작성된 설계일정이 초기화됩니다. 진행하시겠습니까?',
						height		: 30,
					},{	fieldLabel	: Language.get('stnd_idcd','표준일정'),
						xtype		: 'lookupfield',
						name		: 'stnd_idcd',
						value		: 'standard1',
						editable	: false,
						lookupValue	: [["standard1","신작"],["standard2","설변,수정"]],
						labelWidth	: 110,
						width		: 210,
					},{	fieldLabel	: Language.get('st_dt','시작일자'),
						xtype		: 'datefield',
						name		: 'st_dt',
						labelWidth	: 110,
						width		: 210,
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
						cls: 'button-style',
						handler: function() {
							var me = this;
							var param = Ext.merge( this.up('form').getValues());
							if(param.st_dt==null||param.st_dt==''){
								Ext.Msg.alert("알림","시작일자를 반드시 입력해주십시오.");
							}else{
								Ext.Ajax.request({
								url		: _global.location.http() + '/design/dsigplan2/set/setwrite.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: pjod_idcd,
										stnd_idcd		: param.stnd_idcd,
										st_dt			: param.st_dt
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
										listerdetail1.getStore().clearData();
										var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
										mask.show();
										listerdetail1.getStore().load({
											params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
											, scope:me,
											callback:function(records, operation, success) {
												if (success) {
													listerdetail1.select({
														callback:function(records, operation, success) {
															if (success) {
																listerdetail1.getSelectionModel().select(0);
															} else {
															}
															mask.hide();
														}, scope:me
													}, Ext.merge( {pjod_idcd:pjod_idcd}) );
												} else {
												}
												mask.hide();
											}
										});
										me.up('window').hide();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							}
						}
					},
					{	text: '<span class="btnTemp" style="font-size:1em">아니오</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],
			});

			win = Ext.widget('window', {
				title: '일정작성',
				closeAction: 'hide',
				width: 320,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
//				defaultFocus: 'insp_qntt'
			});
			win.show();
		}
	},

	//승인
	okAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listerdetail1().getSelectionModel().getSelection(),
			master = me.pocket.listerdetail1(),
			search = me.pocket.search(),
			pjod_idcd = search.down('[name=pjod_idcd]').getValue()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("dsig_cofm_yorn") == "1") {
					err_msg = "이미 승인되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인할 금형을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 금형을 승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('dsig_cofm_yorn', '1'); // 1:승인 / 0:취소
							record.store.commitChanges();
						});
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/design/dsigplan2/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: pjod_idcd,
										dsig_cofm_yorn	: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
									master.getStore().load({
										params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
										, scope:me,
										callback:function(records, operation, success) {
											if (success) {
												master.getSelectionModel().select(0);
											} else {
										}
										}
									});
								}
							});
						})
					}
				}
			});
		}
	},

	//승인취소
	okCancelAction:function(callbackFn) {
		var me = this,
			select = me.pocket.listerdetail1().getSelectionModel().getSelection(),
			master = me.pocket.listerdetail1(),
			search = me.pocket.search(),
			pjod_idcd = search.down('[name=pjod_idcd]').getValue()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("dsig_cofm_yorn") != "1") {
					err_msg = "승인 취소할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "승인 취소할 금형을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 금형을 승인 취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							record.dirtyValue('dsig_cofm_yorn', '0'); // 0:승인취소 / 1:승인완료
							record.store.commitChanges();
						});

						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/design/dsigplan2/set/ok.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										pjod_idcd		: pjod_idcd,
										dsig_cofm_yorn	: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd
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
									master.getStore().load({
										params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
										, scope:me,
										callback:function(records, operation, success) {
											if (success) {
												master.getSelectionModel().select(0);
											} else {
										}
										}
									});
								}
							});
						})
					}
				}
			});
		}
	},

	// 엑셀
	exportAction : function(comp) {
		console.log(comp.itemId);
		if(comp.itemId =='detail1'){
			this.pocket.listerdetail1().writer({enableLoadMask:true});
		}else{
			this.pocket.listerdetail3().writer({enableLoadMask:true});
		}

	}
});