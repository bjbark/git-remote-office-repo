Ext.define('module.prod.project.prjtprodplan2.PrjtProdPlan2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.OffePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BopPjodPopup',
		'module.prod.project.prjtworkentry.view.PrjtWorkMansPopup'

	],

	models	: [
		'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Master',
		'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Detail1',
		'module.prod.project.prjtprodplan2.model.PrjtProdPlan2Detail3'
	],
	stores	: [
		'module.prod.project.prjtprodplan2.store.PrjtProdPlan2Master',
		'module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail1',
		'module.prod.project.prjtprodplan2.store.PrjtProdPlan2Detail3',
	],
	views	: [
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2Layout',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2Search',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2ListerMaster',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2ListerDetail1',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2ListerDetail3',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2Popup',
		'module.prod.project.prjtprodplan2.view.PrjtProdImagePopup',
		'module.prod.project.prjtprodplan2.view.PrjtProdBomPopup',
		'module.prod.project.prjtprodplan2.view.PrjtProdPlan2Finder'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-prjtprodplan2-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// lister detail event
			'module-prjtprodplan2-lister-detail3 button[action=insertAction]'	: { click : me.workAction2  },	// 저정
			'module-prjtprodplan2-lister-detail3 button[action=modifyAction]'	: { click : me.workAction2  },	// 수정
			'module-prjtprodplan2-lister-detail1 button[action=updateAction]'	: { click : me.updateAction  },	// 저장
			'module-prjtprodplan2-lister-detail1 button[action=project_schd_copy]'	: { click : me.project_schd_copy  },	// 차수변경
			'module-prjtprodplan2-lister-detail1 button[action=exportAction]'	: { click : me.exportAction  },	// 엑셀
			'module-prjtprodplan2-lister-detail3 button[action=deleteAction]'	: { click : me.deleteAction  },	// 삭제
			'module-prjtprodplan2-lister-detail1 button[action=approveAction]'	: { click : me.approveAction }, /* 승인 */
			'module-prjtprodplan2-lister-detail1 button[action=approveCancel]'	: { click : me.approveCancel }, /* 해제 */
			'module-prjtprodplan2-lister-detail1 button[action=changeAction]'	: { click : me.changeAction1 }, /* 설계일정 조정   */
			'module-prjtprodplan2-lister-detail1 button[action=workAction]'		: { click : me.workAction    },	/* 작업지시  */
			'module-prjtprodplan2-lister-detail1 button[action=bomReport]'		: { click : me.bomReport    },	/* 부품식별표  */
			'module-prjtprodplan2-lister-detail1' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			'module-prjtprodplan2-lister-detail1 button[action=changeAction2]'	: { click : me.changeAction2 }, /* 작업일정 조정   */

			'module-prjtprodplan2-lister-detail1 button[action=test]'			: { click : me.test  },	// test

		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-search')[0] },
		listerdetail1: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-lister-detail1')[0] },
		listerdetail3: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-lister-detail3')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-finder')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-prjtprodplan2-popup')[0] }
	},
	//TODO test
	test:function(){
		Ext.Ajax.request({
			url		: _global.location.http() + '/testcall/getFileDat.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					line_seqn		: '1'
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
					ordr_degr = result.records[0].ordr_degr;
					search.down('[name=ordr_degr]').setValue(ordr_degr);
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},
	//TODO 조회
	selectAction:function() {
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail3 = me.pocket.listerdetail3(),
			finder = me.pocket.finder(),
			search = me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
			ordr_degr	= search.down('[name=ordr_degr]').getValue(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(pjod_idcd){
			if(!ordr_degr){
				Ext.Ajax.request({
					url		: _global.location.http() + '/prod/project/prjtprodplan2/get/getOrdr_degr.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							work_ordr_dvcd	: work_ordr_dvcd,
							pjod_idcd		: pjod_idcd,
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
							ordr_degr = result.records[0].ordr_degr;
							search.down('[name=ordr_degr]').setValue(ordr_degr);
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listerdetail1.getStore().load({
				params:{param:JSON.stringify({pjod_idcd:pjod_idcd,work_ordr_dvcd:work_ordr_dvcd,ordr_degr:ordr_degr}) }
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						listerdetail1.getRootNode().expand();
						listerdetail1.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}
			});
		}else{
		Ext.Msg.alert('알림',Language.get('acpt_numb', '금형코드')+'를 선택해주세요.');
		}
	},
	//TODO 수정
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

	//TODO 신규
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
			listerdetail1 = me.pocket.listerdetail1(),
			store  = listerdetail1.getStore();
			select = listerdetail1.selModel.getSelection()[0];
		;
		store.sync({
			callback: function(batch, options) {
				store.reload();
			} ,
			scope: this
		},{	synchro : _global.objects.synchro} );
	},

	//TODO 작업지시
	workAction:function() {
		var me = this,
			select = me.pocket.listerdetail1().selModel.getSelection()[0],
			listerdetail = me.pocket.listerdetail1(),
			search = me.pocket.search(),
			err_msg		= "",
			records		= listerdetail.selModel.getSelection(),
			mrecords	= search.getValues()
		;
		if (records.length<1) {
			Ext.Msg.alert("알림", "조회 후 작업지시 가능합니다.");
			return;
		}else{
			var pjod_idcd = records[0].get('pjod_idcd');
			var work_ordr_dvcd = records[0].get('work_ordr_dvcd');
			var ordr_degr = records[0].get('ordr_degr');
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
						text		: '작업을 지시하시겠습니까?',
						height		: 30,
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
						cls: 'button-style',
						handler: function() {
							var me = this;
							var param = Ext.merge( this.up('form').getValues() );
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/project/prjtprodplan2/set/work.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										work_ordr_dvcd	: work_ordr_dvcd,
										ordr_degr		: ordr_degr,
										pjod_idcd		: pjod_idcd,
										crte_idcd		: _global.login_pk,
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
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],

			});

			win = Ext.widget('window', {
				title: '작업지시',
				closeAction: 'hide',
				width: 320,
				height: 100,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'pjod_idcd'
			});
			win.show();
		}
	},
	//TODO 작업일지저장
	workAction2:function(record) {
		var me = this,
			select = me.pocket.listerdetail1().selModel.getSelection()[0],
			listerdetail = me.pocket.listerdetail1(),
			listerdetail3 = me.pocket.listerdetail3(),
			search = me.pocket.search(),
			err_msg		= "",
			records		= listerdetail.selModel.getSelection(),
			records2	= listerdetail3.selModel.getSelection()[0],
			mrecords	= search.getValues()
		;
		var wker_idcd_1fst = '',
			wker_idcd_2snd = '',
			wker_idcd_3trd = '',
			user_name      = '',
			user_name2     = '',
			user_name3     = '',
			work_cont      = '',
			invc_date      = new Date(),
			prog_stat_dvcd = '2',
			work_endd_date = new Date(),
			prod_qntt      = '1',
			work_sttm      = '09:00',
			work_edtm      = '21:00',
			_set           = 'insert'
		;
		if(record.itemId == 'modify'){
			if(records2){
				wker_idcd_1fst = records2.get('wker_idcd_1fst'),
				wker_idcd_2snd = records2.get('wker_idcd_2snd'),
				wker_idcd_3trd = records2.get('wker_idcd_3trd'),
				user_name      = records2.get('user_name'),
				user_name2     = records2.get('user_name2'),
				user_name3     = records2.get('user_name3'),
				work_cont      = records2.get('work_cont'),
				invc_date      = records2.get('invc_date'),
				work_endd_date = records2.get('work_endd_date'),
				prod_qntt      = records2.get('prod_qntt'),
				work_sttm      = records2.get('work_sttm'),
				work_edtm      = records2.get('work_edtm'),
				_set           = 'update'
				;
			}else{
				Ext.Msg.alert("알림", "수정하려는 작업일지를 선택해주세요.");
				return;
			}
		}
		if (records.length<1) {
			Ext.Msg.alert("알림", "작업선택 후 입력가능합니다.");
			return;
		}else{
			if(records[0].get('line_levl')=="3"){
				if(records[0].get('wkct_idcd')!=""){
					var pjod_idcd = records[0].get('pjod_idcd'),
						work_ordr_dvcd = records[0].get('work_ordr_dvcd'),
						ordr_degr = records[0].get('ordr_degr'),
						wkct_idcd = records[0].get('wkct_idcd'),
						max
					;
					Ext.Ajax.request({
						url		: _global.location.http() + '/prod/project/prjtprodplan2/get/getMaxDate.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
									pjod_idcd			: pjod_idcd,
									ordr_degr			: ordr_degr,
									work_ordr_dvcd		: work_ordr_dvcd,
									idcd				: records[0].get('gant_id')
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
								max = result.records[0].max;
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});

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
							{	fieldLabel	: Language.get('wker_name1','작업자1'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name',
								pair		: 'wker_idcd_1fst',
								clearable	: false ,
								width		: 310,
								value		: user_name,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-prjt-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd : wkct_idcd},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{ xtype : 'textfield', name : 'wker_idcd_1fst',hidden:true,value : wker_idcd_1fst
							},{	fieldLabel	: Language.get('wker_name2','작업자2'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name2',
								pair		: 'wker_idcd_2snd',
								clearable	: false ,
								width		: 310,
								value		: user_name2,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-prjt-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd:wkct_idcd},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{ xtype : 'textfield', name : 'wker_idcd_2snd',hidden:true,value	: wker_idcd_2snd,
							},{	fieldLabel	: Language.get('wker_name3','작업자3'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name3',
								pair		: 'wker_idcd_3trd',
								clearable	: false ,
								width		: 310,
								value		: user_name3,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-prjt-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0', wkct_idcd:wkct_idcd },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{ xtype : 'textfield', name : 'wker_idcd_3trd',hidden:true,value : wker_idcd_3trd,
							},{	fieldLabel	: Language.get('work_cont','작업내용'),
								name		: 'work_cont',
								xtype		: 'textarea',
								width		: 310,
								value		: work_cont,
							},{	fieldLabel	: Language.get('prog_stat_dvcd','작업상태'),
								name		: 'prog_stat_dvcd',
								xtype		: 'lookupfield',
								lookupValue	: [["2","중단"],["3","완료"]],
								value		: '2',
								minValue	: '2',
								maxValue	: '3',
								width		: 310,
								value		: prog_stat_dvcd,
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('strt_date','작업시작'),
										name		: 'invc_date',
										xtype		: 'datefield',
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										width		: 160,
										maxValue	: new Date(),
										value		: invc_date
									},{	fieldLabel	: Language.get('',''),
										name		: 'work_sttm',
										xtype		: 'timefield',
										format		: 'H:i',
										submitFormat: 'Hi'+"00",
										width		: 80,
										increment	: 30,
										value		: work_sttm
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
											{	fieldLabel	: Language.get('endd_date','작업종료'),
												name		: 'work_endd_date',
												xtype		: 'datefield',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												width		: 160,
												maxValue	: new Date(),
												value		: work_endd_date
											},{	fieldLabel	: Language.get('',''),
												name		: 'work_edtm',
												xtype		: 'timefield',
												format		: 'H:i',
												submitFormat: 'Hi'+"00",
												width		: 80,
												increment	: 30,
												value		: work_edtm
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								items	: [
											{	fieldLabel	: Language.get('prod_qntt','생산수량'),
												name		: 'prod_qntt',
												xtype		: 'numericfield',
												width		: 160,
												value		: '1',
												value		: prod_qntt
											}
										]
									}
						],
						buttons: [
							{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
								cls: 'button-style',
								handler: function() {
									var me = this;
									var param = Ext.merge( this.up('form').getValues() );
									var seq;
									Ext.Ajax.request({
										url		: _global.location.http() + '/prod/project/prjtworkentry/get/getSeqn.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												pjod_idcd		: records[0].get('pjod_idcd'),
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
												seq = result.records[0].seq;
											}
										},
										failure : function(result, request) {
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									});
									if(record.itemId == 'update'){
										seq = Number(seq)+1;
									}
									var chk = 0;
									if(param.invc_date >= max){
										chk = 1;
									}
									Ext.Ajax.request({
									url		: _global.location.http() + '/prod/project/prjtprodplan2/set/work2.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											_set			: _set,
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											work_ordr_dvcd	: work_ordr_dvcd,
											ordr_degr		: ordr_degr,
											pjod_idcd		: pjod_idcd,
											wkct_idcd		: records[0].get('wkct_idcd'),
											prnt_idcd		: records[0].get('prnt_idcd'),
											item_name		: records[0].get('item_name'),
											item_idcd		: records[0].get('item_idcd'),
											cvic_idcd		: records[0].get('cvic_idcd'),
											work_schd_dvcd	: records[0].get('work_schd_dvcd'),
											gant_id			: records[0].get('gant_id'),
											gant_seqn		: records[0].get('gant_seqn'),
											invc_date		: param.invc_date,
											wker_idcd_1fst	: param.wker_idcd_1fst,
											wker_idcd_2snd	: param.wker_idcd_2snd,
											wker_idcd_3trd	: param.wker_idcd_3trd,
											work_cont		: param.work_cont,
											prod_qntt		: param.prod_qntt,
											work_sttm		: param.work_sttm,
											work_edtm		: param.work_edtm,
											prog_stat_dvcd	: param.prog_stat_dvcd,
											work_endd_date	: param.work_endd_date,
											seqn			: seq,
											chk				: chk
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
											listerdetail3.getStore().reload();
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								}
							},
							{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
								cls: 'button-style',
								handler: function() {
									this.up('form').getForm().reset();
									this.up('window').hide();
								}
							}
						],
					});
					win = Ext.widget('window', {
						title: '작업실적등록',
						closeAction: 'hide',
						width: 350,
						height: 340,
						layout: 'fit',
						resizable: true,
						modal: true,
						items: form,
						defaultFocus: 'pjod_idcd'
					});
					win.show();
				}else{
					Ext.Msg.error('등록된 공정이 없습니다.');
				}
			}else{
			}
		}
	},

	attachRecord:function( smodel, record ){
		var me	= this;
		var select = me.pocket.listerdetail1().getSelectionModel().getSelection()[0];
//		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
//		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
//		;
		me.pocket.listerdetail3().eraser() ;
//		if (record) {
//		}
	},
	copyAction:function(){
		var me = this,
		listerdetail1 = me.pocket.listerdetail1(),
		select = listerdetail1.getSelectionModel().getSelection()[0],
		store = listerdetail1.getStore(),
		plan_dvcd = 'work',
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
							url		: _global.location.http() + 'prod/project/prjtprodplan2/get/getPrint.do',
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
	//TODO 일정복사
	project_schd_copy:function(){
		var me = this,
			search = me.pocket.search(),
			pjod_idcd = search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd = search.down('[name=work_ordr_dvcd]').getValue(),
			ordr_degr = search.down('[name=ordr_degr]').getValue(),
			msg = '상세일정을 복사하시겠습니까?',
			store = me.pocket.listerdetail1().getStore()
		;
		if(pjod_idcd){
			Ext.Msg.show({ title: '확인', msg: msg, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/prod/project/prjtprodplan2/get/project_schd_copy.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									pjod_idcd		: pjod_idcd,
									work_ordr_dvcd		: work_ordr_dvcd,
									ordr_degr		: ordr_degr
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
	//TODO 선택
	selectDetail : function(grid, record) {
		var me = this,
			detail3 = me.pocket.listerdetail3()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail3.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { pjod_idcd : record.get('pjod_idcd'),work_ordr_dvcd:record.get('work_ordr_dvcd') ,wkct_idcd:record.get('wkct_idcd'),idcd:record.get('gant_id'),ordr_degr:record.get('ordr_degr')});
		}
	},

	//TODO 삭제
	deleteAction : function() {
		var me = this,
			listerdetail3	= me.pocket.listerdetail3(),
			records			= listerdetail3.getSelectionModel().getSelection()[0]
		;
		if(records){
			Ext.Msg.confirm("확인","삭제하시겠습니까?",  function(button) {
				if(button === 'yes'){
					Ext.Ajax.request({
						url		: _global.location.http() + '/prod/project/prjtprodplan2/set/deleteBook.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id			: _global.stor_id,
								hqof_idcd		: _global.hqof_idcd,
								pjod_idcd		: records.get('pjod_idcd'),
								wkct_idcd		: records.get('wkct_idcd'),
								line_seqn		: records.get('line_seqn'),
								work_schd_dvcd	: records.get('work_schd_dvcd'),
								work_ordr_dvcd	: records.get('work_ordr_dvcd'),
								idcd			: records.get('idcd'),
								ordr_degr		: records.get('ordr_degr'),
								prog_stat_dvcd	: records.get('prog_stat_dvcd')
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
								listerdetail3.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});
				}
			});
		}else{
			Ext.Msg.alert('알림','삭제하려는 작업을 선택해주세요.')
		}

	},

	//TODO 취소
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
			y	 = 0
			prod_cofm_yorn = "";
		;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
			listerdetail = me.pocket.listerdetail1(),
			records		= listerdetail.selModel.getSelection()
			a = _global.api_host_info,
			search_url	= '/system/ganttchart/getGanttProjectWork1.do',
			update_url	= '/system/ganttchart/setGanttProjectWork1.do',
			pjod_idcd	= me.pocket.search().down('[name=pjod_idcd]').getValue(),
			invc_numb	= pjod_idcd,
			schd_dvcd	= 2000,
			hq_id = _global.hq_id,
			levels			= '2';

		;
			if(records.length < 1){
				Ext.Msg.alert("error",Language.get('pjod_idcd', '금형번호')+' 조회 후 조정가능합니다.');
			}else{
				var work_ordr_dvcd	= records[0].get('work_ordr_dvcd'),
					ordr_degr		= records[0].get('ordr_degr')
					url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\',hq_id:\''+hq_id+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\',ordr_degr:\''+ordr_degr+'\',levels:\''+levels+'\'}'
				;
				Ext.Ajax.request({
					url		: _global.location.http() + '/prod/project/prjtprodplan2/get/getApprove.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							work_ordr_dvcd	: work_ordr_dvcd,
							ordr_degr		: ordr_degr,
							pjod_idcd		: pjod_idcd,
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
							if(result.records.length ==0){
								prod_cofm_yorn = 0;
							}else{
								prod_cofm_yorn = result.records[0].prod_cofm_yorn;
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
				if(chk.length ==0||chk[0].style.display=="none"){
					var win = Ext.create("Ext.window.Window",
						{	title : '대일정조회',
							height:700,
							width:1500,
							maximizable : true,
							id : 'gantt_window',
			//				minimizable : true,
							html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="100%" height="100%" id="iframe1">iframe</iframe>',
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
	//TODO 일정조정
	changeAction2:function() {
		var me = this;
		var temp = 0,
			x	 = 0,
			y	 = 0,
			listerdetail = me.pocket.listerdetail1(),
			records		= listerdetail.selModel.getSelection()
		;
//		var popup = window.open("http://localhost/module/testcall/mblePage1.do?param={}", "gantt_window", 'height:700,width:1500')
		var chk = Ext.dom.Query.select('.x-css-shadow');
			a = _global.api_host_info,
			search_url	= '/system/ganttchart/getGanttProjectWork1_2.do',
			search_url2	= '/system/prod/project/prjtprodplan2/get/getGrid.do',
			update_url	= '/system/ganttchart/setGanttProjectWork1_2.do',
			pjod_idcd	= me.pocket.search().down('[name=pjod_idcd]').getValue(),
			invc_numb	= pjod_idcd,
			schd_dvcd	= 2000,
			hq_id = _global.hq_id.toUpperCase();
			updt_idcd = _global.login_pk;
		;
		if(records.length < 1 || pjod_idcd == ""){
			Ext.Msg.alert("error",Language.get('pjod_idcd', '금형번호')+' 조회 후 조정가능합니다.');
		}else{
			var work_ordr_dvcd	= records[0].get('work_ordr_dvcd'),
				ordr_degr		= records[0].get('ordr_degr')
				url='/system/ganttchart/ganttChart.do?param={api_host:\''+a+'\',search_url:\''+search_url+'\',update_url:\''+update_url+'\',invc_numb:\''+invc_numb+'\',schd_dvcd:\''+schd_dvcd+'\',hq_id:\''+hq_id+'\',updt_idcd:\''+updt_idcd+'\',work_ordr_dvcd:\''+work_ordr_dvcd+'\',ordr_degr:\''+ordr_degr+'\'}',
				url2='/system/ganttchart/grid2.do?param={api_host:\''+a+'\',search_url:\''+search_url2+'\',invc_numb:\''+invc_numb+'\',hq_id:\''+hq_id+'\'}'
			;
			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/project/prjtprodplan2/get/getApprove.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						work_ordr_dvcd	: work_ordr_dvcd,
						ordr_degr		: ordr_degr,
						pjod_idcd		: pjod_idcd,
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
						if(result.records.length ==0){
							prod_cofm_yorn = 0;
						}else{
							prod_cofm_yorn = result.records[0].prod_cofm_yorn;
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			if(prod_cofm_yorn == 0){
				if(chk.length ==0||chk[0].style.display=="none"){
					var win = Ext.create("Ext.window.Window",
						{	title : '생산 상세일정',
							height:700,
							width:1500,
							maximizable : true,
							id : 'gantt_window',
			//				minimizable : true,
							html:'<iframe src="'+_global.api_host_info+encodeURI(url)+'" width="80%" height="100%" id="iframe1">iframe</iframe>'
							+'<iframe src="'+_global.api_host_info+encodeURI(url2)+'" width="20%" height="100%"id="iframe2">iframe</iframe>',
							listeners : {
								show : function (win) {
									win.maximize ();
								},
								close:function(){
									listerdetail.getStore().reload();
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
					});
					win.show();
				}
			}else{
				Ext.Msg.alert('알림','승인된 작업의 일정은 조정할 수 없습니다.')
			}
		}
	},
	//TODO 승인
	approveAction:function(){
		var me			= this,
			search		= me.pocket.search(),
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
			listerdetail = me.pocket.listerdetail1(),
			records		= listerdetail.selModel.getSelection()
		;
		if(work_ordr_dvcd!='1100'){
			Ext.Msg.alert("알림","승인은 신작만 가능합니다.");
		}else{
			if(records.length >0){
				var work_ordr_dvcd	= records[0].get('work_ordr_dvcd'),
					ordr_degr		= records[0].get('ordr_degr')
				;
				Ext.Msg.show({ title: '확인', msg: '승인하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
					fn: function (button) {
						if (button=='yes') {
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/project/prjtprodplan2/set/setApprove.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: pjod_idcd,
										updt_idcd		: _global.login_id,
										work_ordr_dvcd	: work_ordr_dvcd,
										ordr_degr		: ordr_degr,
										prod_cofm_yorn	: '1'
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
						}else{
							return;
						}
					}
				});
			}else{
				Ext.Msg.alert('알림',Language.get('acpt_numb', '금형코드')+'를 선택해주세요.')
			}
		}
	},
	//TODO 해제
	approveCancel:function(){
		var me			= this,
		listerdetail = me.pocket.listerdetail1(),
		search		= me.pocket.search(),
		pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
		work_ordr_dvcd	= search.down('[name=work_ordr_dvcd]').getValue(),
		records		= listerdetail.selModel.getSelection()
		;
		if(work_ordr_dvcd!='1100'){
			Ext.Msg.alert("알림","승인해제는 신작만 가능합니다.");
		}else{
			if(records.length >0){
				var work_ordr_dvcd	= records[0].get('work_ordr_dvcd'),
					ordr_degr		= records[0].get('ordr_degr')
			;
			Ext.Msg.show({ title: '확인', msg: '해제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/prod/project/prjtprodplan2/set/setApprove.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									pjod_idcd		: pjod_idcd,
									updt_idcd		: _global.login_id,
									work_ordr_dvcd	: work_ordr_dvcd,
									ordr_degr		: ordr_degr,
									prod_cofm_yorn	: '0'
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
					}else{
						return;
					}
				}
			});
			}else{
				Ext.Msg.alert('알림',Language.get('acpt_numb', '금형코드')+'를 선택해주세요.')
			}
		}
	},
	//TODO 부품식별표 발행
	bomReport:function() {
		var me = this,
			search = me.pocket.search(),
			param = search.getValues(),
			jrf = 'BomWork.jrf',
			resId = _global.hq_id.toUpperCase()

		;
		if(param.pjod_idcd){
			if(param.ordr_degr){
				var arg = 'pjod_idcd~'+param.pjod_idcd+'~work_ordr_dvcd~'+param.work_ordr_dvcd+'~ordr_degr~'+param.ordr_degr+'~';
				var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
				var win = window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=950');
				return win;
			}else{
				Ext.Msg.alert("알림","차수를 입력하여 주십시오.");
			}
		}else{
			Ext.Msg.alert("알림",Language.get('acpt_numb', '금형코드')+"를 선택하여 주십시오.");
		}
	},
	//TODO 엑셀
	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},

});