Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryListerDetail',{extend : 'Axt.grid.Panel',
	alias		: 'widget.module-dhtec-workenty-detail',
	selModel	: {selType : 'checkboxmodel',mode : 'MULTI'},
	store		: 'module.custom.dhtec.prod.workentry.store.WorkEntryDetail',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

		pagingItem : function() {
			var me = this, item = {
				xtype : 'grid-paging',
				items : [
						{	text : '<span class="btnTemp" style="font-size:1.5em;">작업취소</span>',
							cls : 'btn btn-danger ',
							width : 100,
							height : 35,
							margin : '0 0 0 5',
							handler : me.deleted
						},
						'-',
						'->',
						{	text : '<span class="btnTemp" style="font-size:2.5em;">'+ Language.get('work_cond','검사입력') + '</span>',
							cls : 'button1-style',
							name : 'workBtn',
							width : 210,
							height : 50,
							margin : '0 0 0 5',
							action : 'castcond'
						},{	text : '<span class="btnTemp" style="font-size:2.5em;">불량/유실보고</span>',
							cls : 'button-left btn btn-primary',
							width : 210,
							height : 50,
							margin : '0 0 0 5',
							handler : function() {
								var detail = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
								master = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
								select = detail.getSelectionModel().getSelection()[0];
								if (!select) {
									Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
								} else {
									me.iteminfo(select);
								}
							}
						},{	text : '<span class="btnTemp" style="font-size:2.5em;">교대/마감</span>',
							cls : 'button-left btn btn-success',
							width : 190,
							height : 50,
							margin : '0 0 0 5',
							handler : me.shiftWork
						},
					]
			};
			return item;
		},
		listeners : {
			afterrender : function() {
				var sideButton = Ext.dom.Query
						.select('#mainmenu-splitter-collapseEl')[0];
				setTimeout(function() {
					sideButton.click();
				}, 100);
			}
		},

					columnItem : function() {
						var me = this, item = {
							cls : _global.options.work_book_tema + 'grid',
							defaults : {
								style : 'text-align: center;font-size:2.5em !important;'
							},
							items : [
									{	dataIndex : 'prog_stat_dvcd',text : Language.get('', '상태'),width : 70,xtype : 'lookupcolumn',lookupValue : resource.lookup('prog_stat_dvcd'),align : 'center'
									},{	dataIndex : 'wkod_numb'		,text : Language.get('', '지시번호'),width : 160,align : 'center'
									},{	dataIndex : 'invc_date'		,text : Language.get('', '작업일자'),width : 120,align : 'center'
									},{	dataIndex : 'work_strt_dttm',text : Language.get('', '시작일시'),width : 165,align : 'center'
									},{	dataIndex : 'wker_name'		,text : Language.get('', '작업자'),width : 120,align : 'left'
									},{	dataIndex : 'cstm_name'		,text : Language.get('', '거래처명'),width : 160,align : 'left'
									},{	dataIndex : 'acpt_numb'		,text : Language.get('', '수주번호'),width : 140,align : 'center'
									},{	dataIndex : 'item_name'		,text : Language.get('', '품명'),flex : 1,minWidth : 200
									},{	dataIndex : 'item_spec'		,text : Language.get('', '규격'),width : 140,align : 'left'
									},{	dataIndex : 'modl_name'		,text : Language.get('', '모델명'),width : 140,align : 'left'
									},{	dataIndex : 'indn_qntt',
										text : Language.get('', '지시수량'),
										width : 80,
										align : 'right',
										xtype : 'numericcolumn'
									},{
										header : Language.get('action', '실행'),
										width : 220,
										sortable : false,
										align : 'center',
										renderer : function(val, meta, rec, a,
												b, c) {
											var id = Ext.id();
											Ext.defer(function() {
												Ext.widget('button',
													{	width : 100,
														height : 40,
														margin : "0 10px 0 0",
														renderTo : Ext.query("#"+ id)[0],
														text : '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+ Language.get('stop','정지')+ '</span>',
														cls : 'btn btn-warning btnTemp '+ _global.options.work_book_tema+ 'button',
														handler : function() {
															me.stop(rec)
														},
												});
												Ext.widget('button',
													{	width : 100,
														height : 40,
														renderTo : Ext.query("#"+ id)[0],
														text : '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+ Language.get('end','종료')+ '<span>',
														cls : 'btn btn-danger btnTemp '+ _global.options.work_book_tema+ 'button',
														handler : function() {
															me.end(rec)
														},
													});
											}, 50);
											return Ext.String.format(
													'<div id="{0}"></div>', id);
										},
										dataIndex : 'somefieldofyourstore'
									} ]
						};
						return item;
					},
					//TODO 삭제
					deleted : function () {
						var search = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
							searchDate = search.down('[name=work_date]').getValue(),
							wkct_idcd = search.down('[name=wkct_name]').getValue(),
							store = Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0].getStore(),
							store2 = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getStore(),
							store3 = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0].getStore(),
							detail = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
							rec = detail.getSelectionModel().getSelection()[0],
							length = detail.getSelectionModel().getSelection().length
						;
						if(rec){
							if(length > 1){
								Ext.Msg.alert("알림","삭제하려는 작업내역을 하나만 선택해주십시오.");
								return;
							}
							var	form = Ext.widget('form', {
								border: false,
								bodyPadding: 10,
								itemId:'delete',
								fieldDefaults: {
									labelWidth: 200,
									labelStyle: 'text-align:right',
									labelSeparator : '',
								},
								items:[
									{	xtype		: 'label',
										text		: '삭제하시겠습니까?',
										cls			: 'textTemp',
										style	: 'font-size:4em;'
									},{	fieldLabel	: Language.get('work_date','작업일자'),
										name		: 'invc_date',
										xtype		: 'datefield',
										value		: new Date(),
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										maxValue	: new Date(),
										hidden		: true
									}
								],
								buttons: [
									{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
										cls: 'button-style',
										flex:1,
										height:50,
										handler: function() {
											var param = Ext.merge( this.up('form').getValues() );
											record = Ext.create( store.model.modelName , {
												invc_numb		: rec.get('invc_numb'),
												wkod_numb		: rec.get('wkod_numb'),
												wkod_seqn		: rec.get('wkod_seqn'),
												wkct_idcd		: rec.get('wkct_idcd'),
												pdsd_numb		: rec.get('pdsd_numb'),
												work_sttm		: rec.get('work_sttm'),
												invc_date		: param.invc_date,
												work_edtm		: '',
												need_time		: ''
											});
											store.add(record);
											store.sync({
												callback: function(batch, options) {
													store3.reload();
													store2.reload();
													this.up('form').getForm().reset();
													Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
												} ,
												scope: this
											},{	synchro : _global.objects.synchro,_set : 'delete'} );
										}
									},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
										cls: 'button-style',
										flex:1,
										height:50,
										handler: function() {
											this.up('form').getForm().reset();
											Ext.ComponentQuery.query('#delete')[0].up('window').destroy();
										}
									}
								]

							});

							win = Ext.widget('window', {
								title: '<span class="btnTemp" style="font-size:15px; color:black;">삭제</span>',
								closeAction: 'destroy',
								width: 500,
								height: 180,
								layout: 'fit',
								resizable: true,
								modal: true,
								items: form,
								defaultFocus: ''
							});
							win.show();
						}else{
							Ext.Msg.alert("알림","삭제하려는 작업내역을 선택해주십시오.");
						}
					},
					// TODO 중단
					stop : function(rec) {
						var search = Ext.ComponentQuery
								.query('module-dhtec-workenty-search')[0], searchDate = search
								.down('[name=work_date]').getValue(), wkct_idcd = search
								.down('[name=wkct_name]').getValue(), store = Ext.ComponentQuery
								.query('module-dhtec-workenty-lister')[0]
								.getStore(), store2 = Ext.ComponentQuery
								.query('module-dhtec-workenty-detail')[0]
								.getStore(), me = this;
						var form = Ext
								.widget(
										'form',
										{
											border : false,
											bodyPadding : 10,
											fieldDefaults : {
												labelWidth : 140,
												labelStyle : 'text-align:right',
												labelSeparator : '',
											},
											items : [
													{
														fieldLabel : Language
																.get(
																		'work_date',
																		'정지일자'),
														name : 'invc_date',
														xtype : 'datefield',
														width : 435,
														height : 50,
														labelStyle : 'line-height: 75px;',
														labelCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'label',
														fieldCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'field',
														cls : 'textTemp',
														maxValue : new Date(),
														trigger1Cls : _global.options.work_book_tema
																+ 'dateTrigger',
														format : Const.DATE_FORMAT_YMD_BAR,
														submitFormat : Const.DATE_FORMAT_YMD,
														value : searchDate,
														readOnly : true
													},
													{
														fieldLabel : Language
																.get(
																		'work_edtm',
																		'정지시간'),
														name : 'work_edtm',
														xtype : 'timefield',
														format : 'H:i',
														submitFormat : 'Hi',
														hideTrigger : true,
														value : new Date(),
														readOnly : true,
														minValue : '00:00 AM',
														maxValue : '23:59 PM',
														width : 435,
														height : 50,
														labelStyle : 'line-height: 75px;',
														labelCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'label',
														fieldCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'field',
														cls : 'textTemp',
														listConfig : {
															itemCls : _global.options.work_book_tema
																	+ 'item' // lookup
																				// list에
																				// 클래스
																				// 추가
														},
													},
													{
														xtype : 'fieldset',
														layout : 'hbox',
														border : 0,
														height : 70,
														margin : '10 0 5 0',
														items : [
																{
																fieldLabel : Language
																		.get(
																				'prod_qntt',
																				'생산수량'),
																xtype : 'popupfield',
																editable : true,
																enableKeyEvents : true,
																name : 'prod_qntt',
																hideTrigger : true,
																readOnly : false,
																width : 435,
																height : 50,
																labelWidth : 130,
																labelStyle : 'line-height: 43px;',
																trigger1Cls : _global.options.work_book_tema
																		+ 'searchTrigger',
																labelCls : 'textTemp '
																		+ _global.options.work_book_tema
																		+ 'label',
																fieldCls : 'textTemp '
																		+ _global.options.work_book_tema
																		+ 'field',
																cls : 'textTemp',
																handleMouseEvents : true,
																listeners : {
																	render : function(
																			field) {
																		field
																				.getEl()
																				.on(
																						'click',
																						function(
																								event,
																								el) {
																							var trigger1 = Ext.dom.Query
																									.select('.qntt11')[0];
																							Ext
																									.get(trigger1).dom
																									.click();
																						});
																	}
																},
																popup : {
																	select : 'SINGLE',
																	widget : 'lookup-keypad-popup',
																	params : {
																		stor_grp : _global.stor_grp
																	},
																	result : function(
																			records,
																			nameField,
																			pairField) {
																		nameField
																				.setValue(records[0].result);
																	}
																},
																trigger1Cls : 'hideCls qntt11',
															}
														]
													},
													{
														xtype : 'textfield',
														name : 'dsct_resn_dvcd',
														hidden : true
													},
													{
														xtype : 'datefield',
														name : 'work_endd_date',
														hidden : true,
														format : Const.DATE_FORMAT_YMD_BAR,
														submitFormat : Const.DATE_FORMAT_YMD,
														value : new Date()
													} ],
											buttons : [
													{
														text : '<span class="btnTemp" style="font-size:3em">'
																+ Language
																		.get(
																				'confirm',
																				'확인')
																+ '</span>',
														cls : 'button-style',
														flex : 1,
														height : 50,
														handler : function() {
															var param = Ext
																	.merge(this
																			.up(
																					'form')
																			.getValues());
																	sttm_temp2 = rec
																			.get(
																					'work_strt_dttm')
																			.replace(
																					/-/gi,
																					""),
																	sttm_temp1 = sttm_temp2
																			.replace(
																					/:/gi,
																					""),
																	sttm_temp = sttm_temp1
																			.replace(
																					/\s/gi,
																					""),
																	sttm_hour = sttm_temp
																			.substring(
																					'8',
																					'10'),
																	edtm_hour = param.work_edtm
																			.substring(
																					'0',
																					'2'),
																	sttm_min = sttm_temp
																			.substring(
																					'10',
																					'12'),
																	edtm_min = param.work_edtm
																			.substring(
																					'2',
																					'4');
															var time = edtm_hour
																	- sttm_hour;
															var min = edtm_min
																	- sttm_min;
															var select = me
																	.getSelectionModel()
																	.getSelection()[0];
															if (min < 0) {
																time = edtm_hour
																		- sttm_hour
																		- 1;
																min = edtm_min
																		- sttm_min
																		+ 60;
															}
															var total = (time * 60)
																	+ min;
															record = Ext
																	.create(
																			store2.model.modelName,
																			{
																				invc_numb : rec
																						.get('invc_numb'),
																				wkod_numb : rec
																						.get('wkod_numb'),
																				wkod_seqn : rec
																						.get('wkod_seqn'),
																				wkct_idcd : rec
																						.get('wkct_idcd'),
																				pdsd_numb : rec
																						.get('pdsd_numb'),
																				work_sttm : rec
																						.get('work_sttm'),
																				cvic_idcd : select
																						.get('cvic_idcd'),
																				work_edtm : param.work_edtm
																						+ '00',
																				invc_date : param.invc_date,
																				prod_qntt : param.prod_qntt,
																				prod_qntt_1fst : param.prod_qntt_1fst,
																				dsct_resn_dvcd : param.dsct_resn_dvcd,
																				need_time : total,
																				work_endd_date : param.work_date
																			});
															store2.add(record);
															store2
																	.sync(
																			{
																				callback : function(
																						batch,
																						options) {
																					store
																							.reload();
																					store2
																							.reload();
																					this
																							.up(
																									'form')
																							.getForm()
																							.reset();
																					this
																							.up(
																									'window')
																							.destroy();
																				},
																				scope : this
																			},
																			{
																				synchro : _global.objects.synchro,
																				_set : 'stop'
																			});
														}
													},
													{
														text : '<span class="btnTemp" style="font-size:3em">'
																+ Language
																		.get(
																				'cancel',
																				'취소')
																+ '</span>',
														cls : 'button-style',
														flex : 1,
														height : 50,
														handler : function() {
															this.up('form')
																	.getForm()
																	.reset();
															this.up('window')
																	.destroy();
															// this.up('window').hide();
														}
													} ]

										});

						win = Ext
								.widget(
										'window',
										{
											title : '<span class="btnTemp" style="font-size:15px; color:black;">'
													+ Language
															.get('stop', '정지')
													+ '</span>',
											closeAction : 'hide',
											width : 559,
											height : 370,
											layout : 'fit',
											resizable : true,
											modal : true,
											items : form,
											defaultFocus : ''
										});
						win.show();
						win.tools.close.hide(); // 닫기버튼 hide
					},
					// TODO 종료
					end : function(rec) {
						var me = this, search = Ext.ComponentQuery
								.query('module-dhtec-workenty-search')[0], searchDate = search
								.down('[name=work_date]').getValue(), wkct_idcd = search
								.down('[name=wkct_name]').getValue()
						store = me.getStore(), cnt = 0;
						Ext.Ajax
								.request({
									url : _global.api_host_info
											+ '/'
											+ _global.app_site
											+ '/custom/dhtec/prod/workentry/get/chekrpst.do',
									method : "POST",
									async : false,
									params : {
										token : _global.token_id,
										param : Ext.encode({
											hqof_idcd : _global.hqof_idcd,
											stor_grp : _global.stor_grp,
											item_idcd : rec.get('item_idcd')
										})
									},
									success : function(response, request) {
										var object = response, result = Ext
												.decode(object.responseText);
										if (result.records.length) {
											console.log(result.records[0]);
											cnt = result.records[0].cnt;
										}
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});

						var form = Ext
								.widget(
										'form',
										{
											border : false,
											bodyPadding : 10,
											fieldDefaults : {
												labelWidth : 200,
												labelStyle : 'text-align:right',
												labelSeparator : '',
											},
											items : [
													{
														fieldLabel : Language
																.get(
																		'work_date',
																		'작업일자'),
														name : 'invc_date',
														xtype : 'datefield',
														width : 535,
														height : 50,
														readOnly : true,
														labelStyle : 'line-height: 75px;',
														labelCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'label',
														fieldCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'field',
														cls : 'textTemp',
														trigger1Cls : _global.options.work_book_tema
																+ 'dateTrigger',
														format : Const.DATE_FORMAT_YMD_BAR,
														submitFormat : Const.DATE_FORMAT_YMD,
														value : searchDate,
														maxValue : new Date(),
													},
													{
														fieldLabel : Language
																.get(
																		'work_edtm',
																		'종료시간'),
														name : 'work_edtm',
														xtype : 'timefield',
														format : 'H:i',
														submitFormat : 'Hi',
														hideTrigger : true,
														value : new Date(),
														minValue : '00:00 AM',
														maxValue : '23:59 PM',
														readOnly : true,
														width : 535,
														height : 50,
														labelStyle : 'line-height: 75px;',
														labelCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'label',
														fieldCls : 'textTemp '
																+ _global.options.work_book_tema
																+ 'field',
														cls : 'textTemp'
													},
													{
														xtype : 'datefield',
														name : 'work_endd_date',
														hidden : true,
														format : Const.DATE_FORMAT_YMD_BAR,
														submitFormat : Const.DATE_FORMAT_YMD,
														value : new Date()
													},
													{
														xtype : 'fieldset',
														layout : 'hbox',
														border : 0,
														height : 70,
														margin : '13 0 0 0',
														items : [
																{
																	fieldLabel : Language
																			.get(
																					'prod_qntt_l',
																					'생산수량(L)'),
																	xtype : 'popupfield',
																	editable : true,
																	enableKeyEvents : true,
																	name : 'prod_qntt',
																	hideTrigger : true,
																	readOnly : false,
																	width : 343,
																	height : 50,
																	labelWidth : 190,
																	labelStyle : 'line-height: 44px;',
																	trigger1Cls : _global.options.work_book_tema
																			+ 'searchTrigger',
																	labelCls : 'textTemp '
																			+ _global.options.work_book_tema
																			+ 'label',
																	fieldCls : 'textTemp '
																			+ _global.options.work_book_tema
																			+ 'field',
																	cls : 'textTemp',
																	handleMouseEvents : true,
																	listeners : {
																		render : function(
																				field) {
																			field
																					.getEl()
																					.on(
																							'click',
																							function(
																									event,
																									el) {
																								var trigger1 = Ext.dom.Query
																										.select('.qntt12')[0];
																								Ext
																										.get(trigger1).dom
																										.click();
																							});
																			if (!cnt) {
																				this.width = 525;
																				this.labelEl
																						.update(Language
																								.get(
																										'prod_qntt',
																										'생산수량'));
																			}
																		}
																	},
																	popup : {
																		select : 'SINGLE',
																		widget : 'lookup-keypad-popup',
																		params : {
																			stor_grp : _global.stor_grp
																		},
																		result : function(
																				records,
																				nameField,
																				pairField) {
																			nameField
																					.setValue(records[0].result);
																		}
																	},
																	trigger1Cls : 'hideCls qntt12',
																},
																{
																	fieldLabel : Language
																			.get(
																					'prod_qntt_r',
																					'(R)'),
																	xtype : 'popupfield',
																	editable : true,
																	enableKeyEvents : true,
																	name : 'prod_qntt_1fst',
																	hideTrigger : true,
																	readOnly : false,
																	width : 183,
																	height : 50,
																	labelWidth : 30,
																	labelStyle : 'line-height: 44px;',
																	trigger1Cls : _global.options.work_book_tema
																			+ 'searchTrigger',
																	labelCls : 'textTemp '
																			+ _global.options.work_book_tema
																			+ 'label',
																	fieldCls : 'textTemp '
																			+ _global.options.work_book_tema
																			+ 'field',
																	cls : 'textTemp',
																	handleMouseEvents : true,
																	listeners : {
																		render : function(
																				field) {
																			field
																					.getEl()
																					.on(
																							'click',
																							function(
																									event,
																									el) {
																								var trigger1 = Ext.dom.Query
																										.select('.qntt21')[0];
																								Ext
																										.get(trigger1).dom
																										.click();
																							});
																			if (!cnt) {
																				this
																						.hide();
																			}
																		}
																	},
																	popup : {
																		select : 'SINGLE',
																		widget : 'lookup-keypad-popup',
																		params : {
																			stor_grp : _global.stor_grp
																		},
																		result : function(
																				records,
																				nameField,
																				pairField) {
																			nameField
																					.setValue(records[0].result);
																		}
																	},
																	trigger1Cls : 'hideCls qntt21',
																} ]
													} ],
											buttons : [
													{
														text : '<span class="btnTemp" style="font-size:3em">'
																+ Language
																		.get(
																				'confirm',
																				'확인')
																+ '</span>',
														cls : 'button-style',
														flex : 1,
														height : 50,
														handler : function() {
															var param = Ext.merge(this.up('form').getValues());
																sttm_temp2 = rec.get('work_strt_dttm').replace(/-/gi,""),
																sttm_temp1 = sttm_temp2.replace(/:/gi,""),
																sttm_temp = sttm_temp1.replace(/\s/gi,""),
																sttm_hour = sttm_temp.substring('8','10');
																edtm_hour = param.work_edtm.substring('0','2');
																sttm_min = sttm_temp.substring('10','12');
																edtm_min = param.work_edtm.substring('2','4');
															if (param.prod_qntt == null|| param.prod_qntt == '') {
																Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
															} else {
																var time = edtm_hour- sttm_hour;
																var min = edtm_min- sttm_min;
																if (min < 0) {
																	time = edtm_hour- sttm_hour- 1;
																	min = edtm_min- sttm_min+ 60;
																}
																var total = (time * 60)+ min;
																record = Ext.create(
																	store.model.modelName,
																	{	invc_numb : rec.get('invc_numb'),
																		wkod_numb : rec.get('wkod_numb'),
																		wkod_seqn : rec.get('wkod_seqn'),
																		pdsd_numb : rec.get('pdsd_numb'),
																		wkct_idcd : rec.get('wkct_idcd'),
																		cvic_idcd : rec.get('cvic_idcd'),
																		work_sttm : rec.get('work_sttm'),
																		work_edtm : param.work_edtm+ '00',
																		invc_date : param.invc_date,
																		prod_qntt : param.prod_qntt,
																		prod_qntt_1fst : param.prod_qntt_1fst,
																		need_time : total,
																		invc_date : param.invc_date
																	});
																store.add(record);
																store.sync(
																{callback : function(batch,options) {
																		store.reload();
																		this.up('form').getForm().reset();
																		this.up('window').destroy();
																	},
																	scope : this
																},
																{
																	synchro : _global.objects.synchro,
																	_set : 'end'
																});
															}
														}
													},{
														text : '<span class="btnTemp" style="font-size:3em">'+ Language.get('cancel','취소')+ '</span>',
														cls : 'button-style',
														flex : 1,
														height : 50,
														handler : function() {
															this.up('form').getForm().reset();
															this.up('window').destroy();
														}
													} ]

										});

						win = Ext.widget('window',
							{	title : '<span class="btnTemp" style="font-size:15px; color:black;">'+ Language.get('end', '종료')+ '</span>',
								closeAction : 'hide',
								width : 650,
								height : 350,
								layout : 'fit',
								resizable : true,
								modal : true,
								items : form,
								defaultFocus : ''
							});
						win.show();
						win.tools.close.hide(); // 닫기버튼 hide
					},

					//TODO 불량내역
					poor : function (rec) {
						var search     = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
							store      = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0].getStore(),
							store2     = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getStore(),
							poorLookup = new Array(),
							me         = this
						;
						var form = Ext.widget('form', {
							border         : false,
							itemId         : 'poor',
							bodyPadding    : 10,
							fieldDefaults  : {
								labelWidth     : 150,
								labelStyle     : 'text-align:right',
								labelSeparator : '',
							},
							items:[
								{	xtype		: 'label',
									text		:'불량수량을 입력 후 불량유형을 선택하여 주십시오..',
									style		: {
										fontSize: '20px',
										color	: 'darkblue'
									},
									cls			: 'textTemp',
									margin		: '0 0 0 62'
								},{	fieldLabel	: Language.get('poor_name', '불량유형'),
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
									xtype		: 'textfield',
									name		: 'poor_name',
									width		: 413,
									height		: 50,
									maxWidth	: 500,
									readOnly	: true,
									labelWidth	: 210,
									margin		: '20 0 0 0'
								},{ xtype:'textfield', name : 'poor_bacd',hidden:true
								},{	fieldLabel	: Language.get('poor_qntt', '불량수량'),
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'poor_qntt',
									width		: 430,
									height		: 50,
									maxWidth	: 500,
									labelWidth	: 210,
									margin		: '20 0 0 0',
									listConfig	:{
										itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
									handleMouseEvents:true,
									listeners:{
										render:function(field ){
											field.getEl().on('click', function( event, el ) {
												var trigger1 = Ext.dom.Query.select('.trigger1')[0];
												Ext.get(trigger1).dom.click();
											});
										}
									},
									popup: {
										select	: 'SINGLE',
										widget	: 'lookup-keypad-popup',
										params	: { stor_grp : _global.stor_grp},
										result	: function(records, nameField, pairField){
											nameField.setValue(records[0].result);
										}
									},
									trigger1Cls : 'hideCls trigger1',
								},{	xtype   : 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#1</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('01');
											poor_name.setValue('불량유형#1');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#2</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('02');
											poor_name.setValue('불량유형#2');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#3</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('03');
											poor_name.setValue('불량유형#3');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#4</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('04');
											poor_name.setValue('불량유형#4');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#5</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('05');
											poor_name.setValue('불량유형#5');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#6</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('06');
											poor_name.setValue('불량유형#6');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#7</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('07');
											poor_name.setValue('불량유형#7');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#8</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('08');
											poor_name.setValue('불량유형#8');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#9</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('09');
											poor_name.setValue('불량유형#9');
										}
									}
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#10</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('10');
											poor_name.setValue('불량유형#10');
										}
									},
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#11</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('11');
											poor_name.setValue('불량유형#11');
										}
									}
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">불량유형#12</span>',
									cls     : 'poorbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
									listeners :{
										click : function(){
											var form		= this.up('form'),
												poor_bacd	= form.down('[name=poor_bacd]'),
												poor_name	= form.down('[name=poor_name]')
											;
											poor_bacd.setValue('12');
											poor_name.setValue('불량유형#12');
										}
									}
								}
							],
							buttons: [
								{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
									cls		: 'button-style',
									flex	: 1,
									height	:50,
									handler	: function() {
										var form		= this.up('form'),
											poor_bacd	= form.down('[name=poor_bacd]'),
											poor_name	= form.down('[name=poor_name]')
										;
										if(poor_bacd.getValue()){
											me.poorupdate(form.getValues());
										}else{
											return;
										}

//										this.up('form').getForm().reset();
										win.destroy();
									}
								},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
									cls		: 'button-style',
									flex	: 1,
									height	:50,
									handler	: function() {
										this.up('form').getForm().reset();
//										this.up('window').destroy();
										win.destroy();
									}
								}
							]
						});

						win = Ext.widget('window', {
							title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량내역</span>',
							closeAction	: '',
							width		: 650,
							layout		: 'fit',
							resizable	: true,
							modal		: true,
							items		: form,
							defaultFocus: ''
						});
						win.show();
					},
					//TODO 유실보고
					fail : function (rec) {
						var search     = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
							store      = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0].getStore(),
							store2     = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getStore(),
							me         = this
						;
						var form = Ext.widget('form', {
							border         : false,
							itemId         : 'fail',
							bodyPadding    : 10,
							fieldDefaults  : {
								labelWidth : 150,
								labelStyle : 'text-align:right',
								labelSeparator : '',
							},
							items:[
								{	xtype		: 'label',
									text		:'유실 유형과 유실 시간을 입력하여 주십시오.',
									style		: {
										fontSize: '20px',
										color	: 'darkblue'
									},
									cls			: 'textTemp',
									margin		: '0 0 10 89'
								},{	fieldLabel	: Language.get('loss_resn_name', '유실유형 '),
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
									xtype		: 'textfield',
									name		: 'loss_resn_name',
									width		: 419,
									labelWidth	: 130,
									height		: 50,
									maxWidth	: 500,
									readOnly	: true,
									margin		: '20 0 0 0'
								},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('sttm','시간'),
											name		: 'sttm',
											xtype		: 'timefield',
											format		: 'H:i',
											labelWidth	: 60,
											submitFormat: 'Hi',
											value		: new Date(),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											margin		: '0 0 0 70',
											readOnly	: false,
											width		: 180,
											height		: 50,
											labelStyle	: 'line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
											trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
											listConfig:{
												itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
											},
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','~'),
											name		: 'edtm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											labelWidth	: 15,
											value		: '',
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: false,
											margin		: '0 0 0 50',
											width		: 135,
											height		: 50,
											labelStyle	: 'line-height: 45px;',
											labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
											fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
											trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
											listConfig:{
												itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
											},
											cls			: 'textTemp'
										}
									]
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#1</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('01');
											loss_resn_name.setValue('유실유형#1');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#2</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('02');
											loss_resn_name.setValue('유실유형#2');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#3</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('03');
											loss_resn_name.setValue('유실유형#3');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#4</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('04');
											loss_resn_name.setValue('유실유형#4');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#5</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('05');
											loss_resn_name.setValue('유실유형#5');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#6</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('06');
											loss_resn_name.setValue('유실유형#6');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20',
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#7</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('07');
											loss_resn_name.setValue('유실유형#7');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 30',
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#8</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('08');
											loss_resn_name.setValue('유실유형#8');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#9</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('09');
											loss_resn_name.setValue('유실유형#9');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 0 20'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#10</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('10');
											loss_resn_name.setValue('유실유형#10');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 30 30'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#11</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('11');
											loss_resn_name.setValue('유실유형#11');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 30 20'
								},{	xtype	: 'button',
									text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">유실유형#12</span>',
									listeners :{
										click : function(){
											var form			= this.up('form'),
												loss_resn_name	= form.down('[name=loss_resn_name]'),
												loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
											;
											loss_resn_dvcd.setValue('12');
											loss_resn_name.setValue('유실유형#12');
										}
									},
									cls     : 'failbutton-style',
									width   : 170,
									height  : 50,
									margin  :'30 0 30 20'
								}
							],
							buttons: [
								{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
									cls		: 'button-style',
									flex	: 1,
									height	:50,
									handler	: function() {
										var form			= this.up('form'),
											loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
											loss_resn_name	= form.down('[name=loss_resn_name]')
										;
										if(loss_resn_dvcd){
											me.failupdate(form.getValues());
										}else{
											return;
										}
//										form.getForm().reset();
										win.destroy();
									}
								},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
									cls		: 'button-style',
									flex	: 1,
									height	:50,
									handler	: function() {
										this.up('form').getForm().reset();
										win.destroy();
//										Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
									}
								}
							]
						});

						win = Ext.widget('window', {
							title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
							closeAction	: 'destory',
							width		: 650,
							layout		: 'fit',
							resizable	: true,
							modal		: true,
							items		: form,
							defaultFocus: ''
						});
						win.show();
					},
					// TODO 불량업데이트
					poorupdate : function(param) {
						var me = this,
						poor_qntt = param.poor_qntt,
						poor_bacd = param.poor_bacd,
						detail = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
						poor = Ext.ComponentQuery.query('module-dhtec-workenty-poor')[0],
						select = detail.getSelectionModel().getSelection()[0], line_seqn = 0,
						sttm1 = select.get('work_sttm'),
						edtm1 = select.get('work_edtm'),
						sttm = null,
						edtm = '';
						console.log(poor_qntt);
						if (poor_qntt == 0 || poor_qntt == ''
								|| poor_qntt == null) {
							Ext.Msg.alert("알림", "불량수량을 반드시 입력하여 주십시오.");
						} else {
							if (sttm1 != null || sttm1 != undefined) {
								sttm = sttm1.replace(':', '');
							}
							if (edtm1 != null || edtm1 != undefined) {
								edtm = edtm1.replace(':', '');
							}
							// line_seqn count
							Ext.Ajax.request({
										url : _global.location.http()+ '/custom/dhtec/prod/workentry/get/poorseqn.do',
										params : {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id : _global.stor_id,
												hqof_idcd : _global.hqof_idcd,
												invc_numb : select.get('invc_numb')
											})
										},
										async : false,
										method : 'POST',
										success : function(response, request) {
											var result = Ext
													.decode(response.responseText);
											if (!result.success) {
												return;
											} else {
											}
											line_seqn = result.records[0].line_seqn;
										},
										failure : function(result, request) {
										},
										callback : function(operation) { /* * 성공 실패관계없이 호출된다.*/
										}
									});
							line_seqn = line_seqn + 1;

							Ext.Ajax.request({
								url : _global.location.http()+ '/custom/dhtec/prod/workentry/set/poor.do',
								params : {
									token : _global.token_id,
									param : JSON.stringify({
										_set : 'insert',
										stor_id : _global.stor_id,
										hqof_idcd : _global.hqof_idcd,
										invc_numb : select.get('invc_numb'),
										line_seqn : line_seqn,
										invc_date : select.get('invc_date'),
										poor_bacd : poor_bacd,
										sttm : sttm,
										edtm : edtm,
										wker_idcd : select.get('wker_idcd'),
										good_qntt : null,
										poor_qntt : poor_qntt,
										loss_qntt : null,
										runn_dsct_yorn : null
									})
								},
								async : false,
								method : 'POST',
								success : function(response, request) {
									var result = Ext
											.decode(response.responseText);
									if (!result.success) {
										return;
									} else {
									}
								},
								failure : function(result, request) {
								},
								callback : function(operation) {
									Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
									poor.getStore().reload();
								}
							});
						}
					},
					// TODO 유실업데이트
					failupdate : function(param) {
						var me = this,
						sttm1 = param.sttm,
						edtm1 = param.edtm,
						sttm = sttm1.replace(':', ''),
						edtm = edtm1.replace(':', ''),
						loss_resn_dvcd = param.loss_resn_dvcd,
						detail = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
						fail = Ext.ComponentQuery.query('module-dhtec-workenty-fail')[0],
						select = detail.getSelectionModel().getSelection()[0],
						line_seqn = 0,
						loss_time = 0,
						sttm_hour = sttm.substring(0, 2),
						sttm_min = sttm.substring(2, 4),
						edtm_hour = edtm.substring(0, 2),
						edtm_min = edtm.substring(2, 4),
						time = edtm_hour - sttm_hour,
						min = edtm_min - sttm_min
						;
						if (sttm1 == null || edtm1 == null || sttm1 == ''
								|| edtm1 == '' || sttm > edtm) {
							Ext.Msg.alert("알림", "시간을 다시 입력하여주십시오.");
						} else {
							if (min < 0) {
								time = edtm_hour - sttm_hour - 1;
								min = edtm_min - sttm_min + 60;
							}
							var total = (time * 60) + min;
							// line_seqn count
							Ext.Ajax.request({
									url : _global.location.http()+ '/custom/dhtec/prod/workentry/get/failseqn.do',
									params : {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id : _global.stor_id,
											hqof_idcd : _global.hqof_idcd,
											invc_numb : select.get('invc_numb')
										})
									},
									async : false,
									method : 'POST',
									success : function(response, request) {
										var result = Ext
												.decode(response.responseText);
										if (!result.success) {
											return;
										} else {
										}
										line_seqn = result.records[0].line_seqn;
									},
									failure : function(result, request) {
									},
									callback : function(operation) {
									}
								});
							line_seqn = line_seqn + 1;

							Ext.Ajax.request({
								url : _global.location.http()+ '/custom/dhtec/prod/workentry/set/fail.do',
								params : {
									token : _global.token_id,
									param : JSON.stringify({
										_set : 'insert',
										stor_id : _global.stor_id,
										hqof_idcd : _global.hqof_idcd,
										invc_numb : select.get('invc_numb'),
										line_seqn : line_seqn,
										invc_date : select.get('invc_date'),
										cvic_idcd : select.get('cvic_idcd'),
										loss_resn_dvcd : loss_resn_dvcd,
										sttm : sttm + '00',
										edtm : edtm + '00',
										loss_time : total,
										loss_pcnt : 0,
										loss_mnhr : 0,
										work_dsct_yorn : 0,
									})
								},
								async : false,
								method : 'POST',
								success : function(response, request) {
									var result = Ext
											.decode(response.responseText);
									if (!result.success) {
										return;
									} else {
									}
								},
								failure : function(result, request) {
								},
								callback : function(operation) {
									Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
									fail.getStore().reload();
								}
							});
						}
					},
					// TODO 품목
					iteminfo : function(select) {
						var search = Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
						poor = Ext.ComponentQuery.query('module-dhtec-workenty-poor')[0],
						store = Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0].getStore(),
						store2 = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getStore(),
						me = this;
						var form = Ext.widget('form',
								{	border : false,
									itemId : 'info',
									layout : 'border',
									bodyPadding : 5,
									fieldDefaults : {
										labelWidth : 150,
										labelStyle : 'text-align:right',
										labelSeparator : '',
									},
									items : [
										{	xtype : 'fieldset',
										layout : 'hbox',
										padding : '0',
										border : 0,
										margin : '10 0 5 0',
										region : 'north',
										items : [{	xtype : 'image',
													name : 'image',
													id : 'image',
													src : '',
													width : 207,
													height : 220,
													margin : '10 0 5 18',
													hidden : false,
												},{	xtype : 'textfield',
													name : 'item_imge',
													hidden : true,
													value : select.get('item_imge'),
													listeners : {
														render : function(val) {
															if (val.getValue()) {
																img = new Uint8Array(
																		val.getValue().split(","));
																blob = new Blob([ img ],
																		{	type : 'image/png'})
																url = URL.createObjectURL(blob);
																this.up('form').down('[name=image]').setSrc(url);
															} else {
																this.up('form').down('[name=image]').setSrc('');
															}
														}
													}
												},{
													xtype : 'fieldset',
													layout : 'vbox',
													padding : '0',
													border : 0,
													margin : '10 0 5 0',
													items : [
														{	xtype : 'fieldset',
															layout : 'hbox',
															padding : '0',
															border : 0,
															margin : '0 0 0 20',
															items : [
																{	fieldLabel : Language.get('ordr_numb','지시번호'),
																	name : 'invc_numb',
																	xtype : 'textfield',
																	labelWidth : 80,
																	hideTrigger : true,
																	readOnly : true,
																	width : 290,
																	height : 40,
																	labelStyle : 'line-height: 35px;',
																	labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																	fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																	cls : 'textTemp',
																	value : select.get('invc_numb')
																},{	fieldLabel : Language.get('work_sttm','작업시간'),
																	name : 'work_sttm',
																	xtype : 'timefield',
																	format : 'H:i',
																	submitFormat : 'Hi',
																	margin : '0 0 0 10',
																	hideTrigger : true,
																	labelWidth : 90,
																	value : select.get('work_sttm'),
																	minValue : '00:00 AM',
																	maxValue : '23:59 PM',
																	readOnly : true,
																	width : 200,
																	height : 40,
																	labelStyle : 'line-height: 35px;',
																	labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																	fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																	cls : 'textTemp'
																},{	fieldLabel : Language.get('','~'),
																	name : 'work_edtm',
																	xtype : 'timefield',
																	format : 'H:i',
																	submitFormat : 'Hi',
																	margin : '0 0 0 10',
																	hideTrigger : true,
																	labelWidth : 15,
																	value : select.get('work_edtm'),
																	minValue : '00:00 AM',
																	maxValue : '23:59 PM',
																	readOnly : true,
																	width : 125,
																	height : 40,
																	labelStyle : 'line-height: 35px;',
																	labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																	fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																	cls : 'textTemp'
																},{	fieldLabel : Language.get('lott_numb','LOT번호'),
																	name : 'lott_numb',
																	xtype : 'textfield',
																	value : select.get('lott_numb'),
																	margin : '0 0 0 10',
																	hideTrigger : true,
																	labelWidth : 95,
																	readOnly : true,
																	width : 320,
																	height : 40,
																	labelStyle : 'line-height: 35px;',
																	labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																	fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																	cls : 'textTemp'
																}
																]
															},{	xtype : 'fieldset',
																layout : 'hbox',
																padding : '0',
																border : 0,
																margin : '5 0 0 20',
																items : [
																	{	fieldLabel : Language.get('item_code','품목코드'),
																		name : 'item_code',
																		xtype : 'textfield',
																		labelWidth : 80,
																		hideTrigger : true,
																		readOnly : true,
																		width : 290,
																		height : 50,
																		value : select.get('item_code'),
																		height : 40,
																		labelStyle : 'line-height: 35px;',
																		labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																		fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																		cls : 'textTemp'
																	},{	fieldLabel : Language.get('item_name','품목'),
																		name : 'item_name',
																		xtype : 'textfield',
																		value : select.get('item_name'),
																		labelWidth : 100,
																		hideTrigger : true,
																		readOnly : true,
																		width : 675,
																		height : 40,
																		labelStyle : 'line-height: 35px;',
																		labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																		fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																		cls : 'textTemp'
																	}
																]
															},{	xtype : 'fieldset',
																layout : 'hbox',
																padding : '0',
																border : 0,
																margin : '5 0 0 20',
																items : [
																	{	fieldLabel : Language.get('cvic_code','설비코드'),
																		name : 'cvic_code',
																		xtype : 'textfield',
																		labelWidth : 80,
																		hideTrigger : true,
																		readOnly : true,
																		width : 290,
																		height : 40,
																		value : select.get('cvic_code'),
																		labelStyle : 'line-height: 35px;',
																		labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																		fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																		cls : 'textTemp'
																	},{fieldLabel : Language.get('cvic_name','설비명'),
																		name : 'cvic_name',
																		xtype : 'textfield',
																		labelWidth : 100,
																		hideTrigger : true,
																		readOnly : true,
																		width : 345,
																		height : 40,
																		value : select.get('cvic_name'),
																		labelStyle : 'line-height: 35px;',
																		labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																		fieldCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfoPopupfield',
																		cls : 'textTemp'
																	}
																]
															},{	xtype : 'fieldset',
																layout : 'hbox',
																padding : '0',
																border : 0,
																margin : '5 0 0 20',
																items : [
																	{	fieldLabel : Language.get('remk_text','비고사항'),
																		name : 'remk_text',
																		xtype : 'textfield',
																		labelWidth : 80,
																		hideTrigger : true,
																		readOnly : true,
																		width : 965,
																		value : select.get('remk_text'),
																		height : 40,
																		labelStyle : 'line-height: 35px;',
																		labelCls : 'textTemp '+ _global.options.work_book_tema+ 'iteminfo',
																		fieldStyle : 'text-align: left;font-size:19px !important;',
																		cls : 'textTemp',
																	}
																]
															},{	xtype : 'fieldset',
																layout : 'hbox',
																padding : '0',
																border : 0,
																margin : '5 0 0 0',
																items : [
																		{	text : '<span class="btnTemp" style="font-size:2.5em;">'+ Language.get('bad_repo','불량보고')+ '</span>',
																			xtype : 'button',
																			handler : function() {
																				var detail = Ext.ComponentQuery
																					.query('module-dhtec-workenty-detail')[0],
																					select = detail.getSelectionModel().getSelection()[0];
																				if (!select) {
																					Ext.Msg.alert("알림","불량을 등록할 내역을 선택하여주십시오.");
																				} else {
																					me.poor()
																				}
																			},
																			cls : 'button-left btn btn-danger',
																			width : 150,
																			height : 50,
																			margin : '0 0 0 237'
																		},{	text : '<span class="btnTemp" style="font-size:2.5em;">'+ Language.get('lost_repo','유실보고')+ '</span>',
																			xtype : 'button',
																			handler : function() {
																				var detail = Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
																				select = detail.getSelectionModel().getSelection()[0];
																				if (!select) {
																					Ext.Msg.alert("알림","유실 보고할 내역을 선택하여주십시오.");
																				} else {
																					me.fail()
																				}
																			},
																			cls : 'button-left btn btn-warning',
																			width : 150,
																			height : 50,
																			margin : '0 0 0 446'
																		}
																	]
																}
															]
														}
													]
												},{
													xtype : 'module-dhtec-workenty-poor',
													region : 'west',
													flex : 1,
													height : 200,
													margin : '0 0 0 17'
												},{
													xtype : 'module-dhtec-workenty-fail',
													region : 'center',
													flex : 1,
													height : 200,
													margin : '0 17 0 0'
												}
											],
											buttons : [ {
												text : '<span class="btnTemp" style="font-size:3em">'+ Language.get('cancel', '취소')+ '</span>',
												cls : 'button-style',
												flex : 1,
												height : 50,
												handler : function() {
													this.up('form').getForm().reset();
													this.up('window').destroy();
												}
											} ]
										});

						win = Ext.widget('window',
							{	title : '<span class="btnTemp" style="font-size:15px; color:black;">'+ Language.get('badn_lost','불량/유실 보고')+ '</span>',
								closeAction : 'hide',
								width : 1249,
								height : 844,
								layout : 'fit',
								resizable : true,
								modal : true,
								items : form,
								defaultFocus : ''
							});
						win.show();
						win.tools.close.hide(); // 닫기버튼 hide
					},
					//TODO 근무조교대
					shiftWork : function(){
						var me			= this,
							search		= Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
							searchDate	= search.down('[name=work_date]').getValue(),
							wkct_idcd	= search.down('[name=wkct_name]').getValue(),
							lister		= Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
							detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
							store		= lister.getStore(),
							store2		= detail.getStore(),
							select		= detail.getSelectionModel().getSelection()[0],
							dayshift	= new Date(new Date().setHours(08,00,0,0)),
							nightshift	= new Date(new Date().setHours(20,00,0,0)),
							shiftvalue,chekdayn
						;
						if(select){
							if(select.get('dayn_dvcd')==2){
								shiftvalue = dayshift;
								chekdayn = '1';
							}else{
								shiftvalue = nightshift;
								chekdayn = '2';
							}
							var form	= Ext.widget('form', {
								border	:false,
								layout	: 'vbox',
								items	: [
									{	border: false,
										itemId: 'shift',
					//					title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">전 근무조</span>',
										bodyPadding: '0 0 0 10',
										width: 500,
										fieldDefaults  : {
											labelWidth : 130,
											labelStyle : 'text-align:right',
											labelSeparator : '',
										},
										items:[
											{	fieldLabel	: Language.get('work_endd_date','마감일자'),
												name		: 'work_endd_date',
												xtype		: 'datefield',
												width		: 435,
												height		: 40,
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												maxValue	: new Date(),
												trigger1Cls : _global.options.work_book_tema+'dateTrigger',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												value		: searchDate,
												readOnly	: true,
												margin		: '20 0 0 0',
												labelSeparator : '',
											},{	fieldLabel	: Language.get('work_edtm','마감시간'),
												name		: 'work_edtm',
												xtype		: 'timefield',
												format		: 'H:i',
												submitFormat: 'Hi',
												margin		: '10 0 0 0',
												hideTrigger	: true,
												value		: shiftvalue,
												readOnly	: true,
												minValue	: '00:00 AM',
												maxValue	: '23:59 PM',
												width		: 435,
												height		: 40,
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												listConfig:{
													itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
												},
												labelSeparator : '',
											},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
												name		: 'prod_qntt',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												hideTrigger	: true,
												readOnly	: false,
												width		: 435,
												height		: 40,
												margin		: '10 0 10 0',
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												handleMouseEvents:true,
												listeners:{
													render:function(field ){
														field.getEl().on('click', function( event, el ) {
															var trigger1 = Ext.dom.Query.select('.trigger1')[0];
															Ext.get(trigger1).dom.click();
														});
													}
												},
												popup: {
													select	: 'SINGLE',
													widget	: 'lookup-keypad-popup',
													params	: { stor_grp : _global.stor_grp},
													result	: function(records, nameField, pairField){
														nameField.setValue(records[0].result);
													}
												},
												trigger1Cls : 'hideCls trigger1',
												labelSeparator : '',
											},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
												xtype		: 'lookupfield',
												name		: 'dsct_resn_dvcd',
												trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
												width		: 395,
												margin		: '10 0 10 0',
												lookupValue	: resource.lookup('dsct_resn_dvcd'),
												height		: 40,
												multiSelect	: false ,
												editable	: false,
												hidden		: true,
												listConfig:{
													itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
												},
												labelSeparator : '',
											},{	fieldLabel	: Language.get('dayn_dvcd2', '마감조'),xtype		: 'lookupfield',
												lookupValue	: resource.lookup('dayn_dvcd'),
												name		: 'dayn_dvcd2',
												hidden		: false,
												width		: 435,
												height		: 40,
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
												value		: select.get('dayn_dvcd'),
												listConfig:{
													itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
												},
												readOnly	: true,
												labelSeparator : '',
											}

										]
									},{	border: false,
										bodyPadding: 10,
										width: 500,
										title:'<span style="text-align:center;font-size:1.5em; color:black;" class="btnTemp">교대시작</span>',
										fieldDefaults: {
											labelWidth: 140,
											labelStyle: 'text-align:right',
											labelSeparator : '',
										},
										items:[
											{	fieldLabel	: Language.get('shft_date','교대일자'),
												name		: 'invc_date',
												xtype		: 'datefield',
												value		: searchDate,
												width		: 435,
												height		: 40,
												readOnly	: true,
												margin		: '20 0 0 0',
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												trigger1Cls : _global.options.work_book_tema+'dateTrigger',
												format		: Const.DATE_FORMAT_YMD_BAR,
												submitFormat: Const.DATE_FORMAT_YMD,
												maxValue	: new Date(),
												labelSeparator : '',
											},{	fieldLabel	: Language.get('shft_time','교대시간'),
												name		: 'work_sttm',
												xtype		: 'timefield',
												format		: 'H:i',
												margin		: '10 0 0 0',
												submitFormat: 'Hi',
												hideTrigger	: true,
												readOnly	: true,
												value		: shiftvalue,
												minValue	: '00:00 AM',
												maxValue	: '23:59 PM',
												width		: 435,
												height		: 40,
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												listConfig:{
													itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
												},
												labelSeparator : '',
											},{	fieldLabel	: Language.get('wker_name','관리자'),
												value		: '',
												width		: 395,
												height		: 40,
												margin		: '10 0 0 0',
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
												cls			: 'textTemp',
												xtype		: 'popupfield',
												editable	: true,
												enableKeyEvents : true,
												name		: 'wker_name',
												pair		: 'wker_idcd',
												trigger1Cls : _global.options.work_book_tema+'searchTrigger',
												clearable	: false ,
												popup: {
													select : 'SINGLE',
													widget : 'lookup-workbookv5-user-popup',
													params : { stor_grp : _global.stor_grp , row_sts : '0'},
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('user_name'));
														pairField.setValue(records[0].get('user_idcd'));
													}
												},
												labelSeparator : '',
											},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('dayn_dvcd', '시작조'),xtype		: 'lookupfield',
												lookupValue	: resource.lookup('dayn_dvcd'),
												name		: 'dayn_dvcd',
												margin		: '10 0 0 0',
												hidden		: false,
												width		: 435,
												height		: 40,
												labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
												fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
												value		: chekdayn,
												listConfig:{
													itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
												},
												readOnly	: true,
												labelSeparator : '',
											}
										],
										buttons: [
											{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
												cls: 'button-style',
												flex:1,
												height:50,
												handler: function() {
													var param = Ext.merge(form.getValues() );
														sttm_temp2 = select.get('work_strt_dttm').replace(/-/gi,""),
														sttm_temp1 = sttm_temp2.replace(/:/gi,""),
														sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
														sttm_hour = sttm_temp.substring('8','10');
														edtm_hour = param.work_edtm.substring('0','2');
														sttm_min = sttm_temp.substring('10','12');
														edtm_min = param.work_edtm.substring('2','4');
													var time = 0;
													var min   = edtm_min-sttm_min;
													if(param.dayn_dvcd==1){
														time  = (24+Number(edtm_hour)) - Number(sttm_hour);
													}else{
														time  = edtm_hour-sttm_hour;
													}
													if(min < 0){
														time = time-1;
														min  = edtm_min-sttm_min + 60;
													}
													var total = (time*60)+min;
													if(!param.prod_qntt ||param.prod_qntt <= 0){
														Ext.Msg.alert("알림","생산수량을 입력해주세요.");
														return;
//													}else if(!param.wker_name){
//														Ext.Msg.alert("알림","작업자를 선택해주세요.");
//														return;
													}
													record = Ext.create( store2.model.modelName , {
														invc_numb		: select.get('invc_numb'),
														wkod_numb		: select.get('wkod_numb'),
														wkod_seqn		: select.get('wkod_seqn'),
														wkct_idcd		: select.get('wkct_idcd'),
														pdsd_numb		: select.get('pdsd_numb'),
														work_sttm		: select.get('work_sttm'),
														item_idcd		: select.get('item_idcd'),
														work_edtm		: param.work_edtm+'00',
														invc_date		: select.get('invc_date'),
														prod_qntt		: param.prod_qntt,
														dsct_resn_dvcd	: param.dsct_resn_dvcd,
														need_time		: total,
														work_endd_date	: param.work_endd_date,
//														dayn_dvcd		: param.dayn_dvcd
													});
													store2.add(record);
													store2.sync({
														callback: function(batch, options) {

														} ,
														scope: this
													},{	synchro : _global.objects.synchro,_set : 'stop'} );
													store2.clearData();
													store2.loadData([],false);
													store2.reload();
													var new_invc_numb;
													Ext.Ajax.request({
														url		: _global.location.http() + '/listener/seq/maxid.do',
														params	: {
															token : _global.token_id,
															param : JSON.stringify({
																stor_id	: _global.stor_id,
																table_nm: 'work_book'
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
																new_invc_numb = result.records[0].seq;
															}
														},
														failure : function(result, request) {
														},
														callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
														}
													});
													record = Ext.create( store2.model.modelName , {
														invc_numb		: new_invc_numb,
														indn_qntt		: select.get('indn_qntt'),
														pdsd_numb		: select.get('pdsd_numb'),
														wkod_numb		: select.get('wkod_numb'),
														wkod_seqn		: select.get('wkod_seqn'),
														item_idcd		: select.get('item_idcd'),
														invc_date		: param.invc_date,
														wker_idcd		: param.wker_idcd,
														dayn_dvcd		: param.dayn_dvcd,
														work_sttm		: param.work_sttm+'00',
														wkct_idcd		: select.get('wkct_idcd'),
														mold_idcd		: select.get('mold_idcd'),
														mtrl_bacd		: select.get('mtrl_bacd'),
														lott_numb		: select.get('lott_numb'),
													});
													store2.add(record);
													store2.sync({
														callback: function(batch, options) {
															store.reload();
															store2.reload();
															this.up('form').getForm().reset();
															this.up('window').destroy();
														} ,
														scope: this
													},{	synchro : _global.objects.synchro,_set : 'insert'} );
												}
											},
											{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
												cls: 'button-style',
												flex:1,
												height:50,
												handler: function() {
//													form.getForm().reset();

													Ext.ComponentQuery.query('#shift')[0].up('window').destroy();
												}
											}
										]
									}
								]
							});
							win = Ext.widget('window', {
								title: '<span class="btnTemp" style="font-size:15px; color:black;">교대마감</span>',
								closeAction: 'destory',
								width: 510,
								height: 600,
								layout: 'fit',
								resizable: true,
								modal: true,
								items: form,
								defaultFocus: ''
							});
							win.show();
							win.tools.close.hide ();  // 닫기버튼 hide
						}else{
							Ext.Msg.alert("알림","근무교대할 작업을 선택해주십시오.");
						}
					},
				});
