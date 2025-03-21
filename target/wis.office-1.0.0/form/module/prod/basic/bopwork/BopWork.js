Ext.define('module.prod.basic.bopwork.BopWork', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.upload.FileUpload',
		'lookup.popup.view.BopPjodPopup'
	],

	models	: [
		'module.prod.basic.bopwork.model.BopWorkMaster',
		'module.prod.basic.bopwork.model.BopWorkDetail3',
		'module.prod.basic.bopwork.model.BopWorkTree'
	],
	stores	: [
		'module.prod.basic.bopwork.store.BopWorkMaster',
		'module.prod.basic.bopwork.store.BopWorkDetail3',
		'module.prod.basic.bopwork.store.BopWorkTree'
	],
	views	: [
		'module.prod.basic.bopwork.view.BopWorkLayout',
		'module.prod.basic.bopwork.view.BopWorkSearch',
		'module.prod.basic.bopwork.view.BopWorkListerMaster',
		'module.prod.basic.bopwork.view.BopWorkTree',
		'module.prod.basic.bopwork.view.BopWorkListerDetail3',
		'module.prod.basic.bopwork.view.BopWorkFinder',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-bopwork-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// lister detail event
			'module-bopwork-tree button[action=modifyAction]'	: { click : me.modifyAction },	// 수정
			'module-bopwork-tree button[action=insertAction]'	: { click : me.insertAction },	// 신규
			'module-bopwork-tree button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
			'module-bopwork-tree button[action=deleteAction]'	: { click : me.deleteAction },	// 삭제
			'module-bopwork-tree button[action=changeAction]'	: { click : me.changeAction1}, /* 설계일정 조정   */
			'module-bopwork-tree button[action=copyAction]'		: { click : me.copyAction   }, /* 설계일정 조정   */
			'module-bopwork-tree button[action=bopInsert]'		: { click : me.bopInsert    }, /* BOP작성   */
			'module-bopwork-tree button[action=testExcel]'		: { click : me.testExcel    }, /* testExcel   */
			'module-bopwork-tree button[action=approveAction]'	: { click : me.approveAction}, /* 승인   */
			'module-bopwork-tree button[action=approveCancel]'	: { click : me.approveCancel}, /* 승인취소   */
			// editer event
			'module-bopwork-tree button[action=updateAction]'	: { click : me.updateAction },	// 저장
			'module-bopwork-tree button[action=bopCopy]'		: { click : me.bopCopy      },	// 작업일정작성
			'module-bopwork-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister master event
			'module-bopwork-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-bopwork-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-bopwork-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-bopwork-lister-master')[0] },
		listertree	: function () { return Ext.ComponentQuery.query('module-bopwork-tree')[0] },
		listerdetail3: function () { return Ext.ComponentQuery.query('module-bopwork-lister-detail3')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-bopwork-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-bopwork-finder')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listertree	= me.pocket.listertree(),
			finder		= me.pocket.finder(),
			search		= me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
			ordr_degr		= search.down('[name=ordr_degr]').getValue(),
			tpanel		= me.pocket.layout().down('#mainpanel')
		;
		if(pjod_idcd==''){
			Ext.Msg.alert('알림','수주번호를 선택해주세요.');
		}else{
			if(ordr_degr==null||ordr_degr==''){
				Ext.Msg.alert('알림','차수를 입력해주세요.');
			}else{
				listertree.getStore().clearData();
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				listertree.getStore().load({
					params:{param:JSON.stringify({pjod_idcd:pjod_idcd,work_ordr_dvcd:work_ordr_dvcd,ordr_degr:ordr_degr}) }
					, scope:me,
					callback:function(records, operation, success) {
						if (success) {
							listertree.getRootNode().expand();
							listertree.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
					}
				});
			}
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
			listertree = me.pocket.listertree(),
			store  = listertree.getStore();
			select = me.pocket.listertree().selModel.getSelection()[0];
		;
		store.sync({
			callback: function(batch, options) {
				store.reload();
			} ,
			scope: this
		},{	synchro : _global.objects.synchro} );
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
							url		: _global.location.http() + '/design/bopwork/get/getPrint.do',
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
			Ext.Msg.error('수주번호를 확인해주세요.');
		}
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
			pjod_idcd	= me.pocket.finder().down('[name=pjod_idcd]').getValue(),
			invc_numb	= pjod_idcd,
			schd_dvcd	= 2000,
			url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\'}'
		;
		if(pjod_idcd == null||pjod_idcd ==""){
			Ext.Msg.alert("error",'수주번호 조회 후 조정가능합니다.');
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
			pjod_idcd	= finder.down('[name=pjod_idcd]').getValue()
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
	//승인취소
	approveCancel:function(){
		var me			= this,
		finder		= me.pocket.finder(),
		pjod_idcd	= finder.down('[name=pjod_idcd]').getValue()
		line_clos	= finder.down('[name=line_clos]')
		;
		Ext.Msg.show({ title: '확인', msg: '승인취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
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
	bopInsert:function(){																	//TODO bop 작성
		var me				= this,
			finder			= me.pocket.finder(),
			search			= me.pocket.search(),
			listertree		= me.pocket.listertree(),
			pjod_idcd		= search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
			ordr_degr		= search.down('[name=ordr_degr]').getValue(),
			store			= me.pocket.listertree().getStore()
		;
		if(pjod_idcd==''){
			Ext.Msg.alert('알림','수주번호를 선택해주세요.');
		}else{
			if(ordr_degr == ''||ordr_degr==null){
				Ext.Msg.alert('알림','차수를 입력해주세요.');
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
							text		: '이미 작성된 BOP구조가 초기화됩니다. 진행하시겠습니까?',
							height		: 30,
						},{	fieldLabel	: Language.get('standard','표준BOP'),
							xtype		: 'lookupfield',
							name		: 'standard',
							value		: 'standard1',
							lookupValue	: [["standard1","표준"],["standard2"," 단순형"],["standard3","복합형"],["standard4","다중복합형"]],
							labelWidth	: 110,
							width		: 210,
						},
					],
					buttons: [
						{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
							cls: 'button-style',
							handler: function() {
								var me = this;
								var param = Ext.merge( this.up('form').getValues() );
								Ext.Ajax.request({
								url		: _global.location.http() + '/prod/basic/bopwork/set/setBop.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: pjod_idcd,
										work_ordr_dvcd	: work_ordr_dvcd,
										ordr_degr		: ordr_degr,
										standard		: param.standard
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
										listertree.getStore().clearData();
										var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
										mask.show();
										listertree.getStore().load({
											params:{param:JSON.stringify({pjod_idcd:pjod_idcd,work_ordr_dvcd:work_ordr_dvcd,ordr_degr:ordr_degr}) }
											, scope:me,
											callback:function(records, operation, success) {
												if (success) {
													listertree.getRootNode().expand();
													listertree.getSelectionModel().select(0);
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
					title: 'BOP작성',
					closeAction: 'hide',
					width: 320,
					height: 150,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form,
					defaultFocus: 'insp_qntt'
				});
				win.show();
			}
		}
	},
	bopCopy:function(){																	//TODO 작업일정작성
		var me			= this,
			finder		= me.pocket.finder(),
			search		= me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
			ordr_degr		= search.down('[name=ordr_degr]').getValue(),
			select	= me.pocket.listertree().selModel.getSelection()[0];
		;
		if(pjod_idcd==''){
			Ext.Msg.alert('알림','수주번호를 선택해주세요.');
		}else{
			if(ordr_degr == ''||ordr_degr==null){
				Ext.Msg.alert('알림','차수를 입력해주세요.');
			}else{
				if(select){
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
								text		: '이미 작성된 작업일정이 초기화됩니다. 진행하시겠습니까?',
								height		: 30,
							},{	fieldLabel	: Language.get('defaultdate','작업시작일'),
								xtype		: 'datefield',
								name		: 'st_dt',
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								labelWidth	: 110,
								width		: 210,
							},
						],
						buttons: [
							{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
								cls: 'button-style',
								handler: function() {
									var me = this;
									var param = Ext.merge( this.up('form').getValues() );
									Ext.Ajax.request({
										url		: _global.location.http() + '/prod/basic/bopwork/set/setBopWork.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												pjod_idcd		: pjod_idcd,
												work_ordr_dvcd	: work_ordr_dvcd,
												ordr_degr		: ordr_degr,
												crte_idcd		: _global.login_pk,
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
												me.up('window').hide();
											}
										},
										failure : function(result, request) {
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									});
								}
							},
							{	text: '<span class="btnTemp" style="font-size:1em">아니오</span>',
								cls: 'button-style',
								handler: function() {
									this.up('window').hide();
								}
							}
						],
					});
					win = Ext.widget('window', {
						title: '작업일정작성',
						closeAction: 'hide',
						width: 320,
						height: 150,
						layout: 'fit',
						resizable: true,
						modal: true,
						items: form,
						defaultFocus: 'insp_qntt'
					});
					win.show();
				}else{
					Ext.Msg.alert('알림','BOP작성 후 복사가능합니다.');
				}
			}
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});