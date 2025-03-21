Ext.define('module.custom.iypkg.prod.workbookv1.view.WorkBookV1ListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv1-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.iypkg.prod.workbookv1.store.WorkBookV1',
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

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},



	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:2.5em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width : 60  , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","시작"],["2","중단"],["3","완료"]], align : 'center'
					},{ dataIndex: 'seqn'			, text : Language.get('seqn'			,'순번'		) , width : 45  , align : 'center'
					},{ dataIndex: 'pref_rank'		, text : Language.get('pref_rank'		,'우선순위'	) , width : 80  , xtype : 'numericcolumn'
						//					},{ dataIndex: 'work_strt'		, text : Language.get('work_strt'		,'착수예정'		) , width : 100 , align : 'center'
//					},{ dataIndex: 'work_endd'		, text : Language.get('work_endd'		,'종료예정'		) , width : 100 , align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'지시번호'	) , width : 155 , align : 'center'
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'거래처'	) , width : 150 , align : 'center'
					},{ dataIndex: 'prod_code'		, text : Language.get('prod_code'		,'품목코드'	) , width : 125 , align : 'center'	, hidden : true
					},{ dataIndex: 'prod_name'		, text : Language.get('prod_name'		,'품명'		) , width : 250
					},{ dataIndex: 'bxty_name'		, text : Language.get('bxty_name'		,'상자형식'	) , width : 150
					},{ dataIndex: 'prod_leng'		, text : Language.get('prod_leng'		,'장'		) , width : 60
					},{ dataIndex: 'prod_widh'		, text : Language.get('prod_widh'		,'폭'		) , width : 60
					},{ dataIndex: 'prod_hght'		, text : Language.get('prod_hght'		,'고'		) , width : 60
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명'		) , width : 130
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 85  , xtype : 'numericcolumn'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 220 , align : 'center'	, hidden : true
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , flex  : 2   , align : 'center'	, hidden : true
					},{ dataIndex: 'prod_spec'		, text : Language.get('prod_spec'		,'규격'		) , flex  : 2   , hidden: true
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'	) , flex  : 2   , hidden: true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 60  , hidden: true
					},{ header: '실행',
						sortable: false,
						width:130,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width:120,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">시작</span>',
										cls:'btn btn-success btnTemp '+_global.options.work_book_tema+'button',
										handler: function(){
											var cnt;
											me.popup(rec);
										}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	insert : function (rec,upf) {
		var me = this;
		var store = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore(),
			invc_numb, work_sttm,mngt_drtr_idcd
		;
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
					invc_numb = result.records[0].seq;
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/cvic/cvicmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					cvic_idcd	: _global.login_pk
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
					if(result.records[0]){
						mngt_drtr_idcd = result.records[0].mngt_drtr_idcd?result.records[0].mngt_drtr_idcd:"";						
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		dayn_dvcd = '';
		work_sttm = new Date();
		
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 150,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_date','작업일자'),
					name		: 'invc_date',
					xtype		: 'datefield',
					value		: new Date(),
					width		: 435,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					maxValue	: new Date(),
				},{	fieldLabel	: Language.get('work_sttm','시작시간'),
					name		: 'work_sttm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					readOnly	: true,
					value		: work_sttm,
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 433,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('wker_name','작업자'),
					value		: '',
					width		: 450,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
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
					value : _global.hqof_idcd.toUpperCase() == "N1000IYPKG"?_global.login_nm:"",
					popup: {
						select : 'SINGLE',
						widget : 'lookup-workbookv1-user-popup',
						params : { stor_grp : _global.stor_grp, user_idcd : mngt_drtr_idcd },
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('user_name'));
							pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true , value : _global.hqof_idcd.toUpperCase() == "N1000IYPKG"?_global.login_pk:""
				},{	fieldLabel	: Language.get('cvic_name','설비'),
					xtype		: 'popupfield', editable : true, enableKeyEvents : true,
					name		: 'cvic_name',
					pair		: 'cvic_idcd',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					width		: 450,
					height		: 50,
					hidden		: true,
					labelStyle	: 'line-height: 75px;',
					trigger1Cls : _global.options.work_book_tema+'searchTrigger',
					popup: {
						select : 'SINGLE',
						widget : 'lookup-workbookv1-cvic-popup',
						params : { stor_grp : _global.stor_grp , row_sts : '0'},
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('cvic_name'));
							pairField.setValue(records[0].get('cvic_idcd'));
						}
					}
				},{	name : 'cvic_idcd', xtype : 'textfield' , 	value : rec.get('cvic_idcd'), hidden : true
				},{	fieldLabel	: Language.get('pkg_qntt','묶음수량'),
					name		: 'pkg_qntt',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					hideTrigger	: true,
					readOnly	: false,
					width		: 435,
					height		: 50,
					value		: rec.get('pkg_qntt'),
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					handleMouseEvents:true,
					trigger1Cls : 'hideCls pkgTriggers1',
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.pkgTriggers1')[0];
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
				},
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
						if(param.invc_date==null || param.invc_date ==''){
							Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
						}else if(param.work_sttm==null || param.work_sttm ==''){
							Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
//						}else if(param.wker_idcd==null || param.wker_idcd ==''){
//							Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
						}else{
							var	lister = Ext.ComponentQuery.query('module-workbookv1-lister')[0],
								select = lister.getSelectionModel().getSelection()[0]
							;

//							Ext.Ajax.request({
//								url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/book_cnt.do',
//								method		: "POST",
//								params		: {
//								 	token	: _global.token_id,
//									param	: Ext.encode({
//										cvic_idcd		: form.down('[name=cvic_idcd]').getValue(),
//									})
//								},
//								async	: false,
//								success : function(response, request) {
//									var object = response,
//										result = Ext.decode(object.responseText)
//									;
//									if (result.success) {
//										cnt = result.records[0].cnt;
//									} else {
//										Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
//									}
//								},
//								failure : function(response, request) {
//									resource.httpError(response);
//								},
//								callback : function() {
//								}
//							});
//							if(cnt == 0){
								if(select){
									record = Ext.create( store.model.modelName , {
										invc_numb		: invc_numb,
										indn_qntt		: select.get('indn_qntt'),
										pdsd_numb		: select.get('pdsd_numb'),
										wkod_numb		: select.get('invc_numb'),
										wkod_seqn		: select.get('line_seqn'),
										prod_idcd		: select.get('prod_idcd'),
										invc_date		: param.invc_date,
										wker_idcd		: param.wker_idcd,
										cvic_idcd		: select.get('cvic_idcd'),
										work_sttm		: param.work_sttm+'00',
										wkct_idcd		: select.get('wkct_idcd'),
										mold_idcd		: select.get('mold_idcd'),
										mtrl_bacd		: select.get('mtrl_bacd'),
										lott_numb		: select.get('lott_numb'),
										prog_stat_dvcd	: select.get('prog_stat_dvcd'),
										pkg_qntt		: param.pkg_qntt,
									});
									store.add(record);
									store.sync({
										callback: function(batch, options) {
											store.reload();

											var a = 0, pkg_qntt = 1;

											clearInterval(window.shot);

											Ext.Ajax.request({
												url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/plc_cnt.do',
												method		: "POST",
												async		: false,
												params		: {
													token	: _global.token_id,
													param	: Ext.encode({
														invc_numb	: rec.get('invc_numb'),
														line_seqn	: rec.get('line_seqn')
													})
												},
												success : function(response, request) {
													var object = response,
														result = Ext.decode(object.responseText)
													;
													if(result.records[0].cnt){
														a = result.records[0].cnt;
													}
												},
												failure : function(response, request) {
													resource.httpError(response);
												},
												callback : function() {
												}
											});

											upf.setValue(a*param.pkg_qntt);

											window.shot = setInterval(function(){
												Ext.Ajax.request({
													url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/plc_cnt.do',
													method		: "POST",
													async		: false,
													params		: {
														token	: _global.token_id,
														param	: Ext.encode({
															invc_numb	: rec.get('invc_numb'),
															line_seqn	: rec.get('line_seqn')
														})
													},
													success : function(response, request) {
														var object = response,
															result = Ext.decode(object.responseText)
														;
														if(result.records[0].cnt){
															a = result.records[0].cnt;
														}
													},
													failure : function(response, request) {
														resource.httpError(response);
													},
													callback : function() {
													}
												});
												upf.setValue(a*param.pkg_qntt);
											},30000);
											this.up('form').getForm().reset();
											this.up('window').destroy();
										} ,
										scope: this
									},{	synchro : _global.objects.synchro,_set : 'insert'} );
								}
							}
//						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
			closeAction: 'hide',
			width: 580,
			height: 440,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},

	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore()
		;
		var	form = Ext.widget('form', {
			border: false,
			itemId: 'stop',
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 130,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_endd_date','중단일자'),
					name		: 'work_endd_date',
					xtype		: 'datefield',
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					maxValue	: new Date(),
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: new Date(),
					readOnly	: true
				},{	fieldLabel	: Language.get('work_edtm','중단시간'),
					name		: 'work_edtm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					value		: new Date(),
					readOnly	: true,
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
					name		: 'prod_qntt',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					hideTrigger	: true,
					readOnly	: false,
					width		: 435,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
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
				},{	fieldLabel	: Language.get('dsct_resn_dvcd', '중단사유'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
					xtype		: 'lookupfield',
					name		: 'dsct_resn_dvcd',
					trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
					width		: 450,
					lookupValue	: resource.lookup('dsct_resn_dvcd'),
					height		: 50,
					margin		: '10 0 0 0',
					multiSelect	: false ,
					editable	: false,
					listConfig:{
						itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
				},{ xtype		: 'datefield',
					name		: 'invc_date',
					hidden		: true,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: rec.get('invc_date')
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var rec2;
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
							method		: "POST",
							async		: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: rec.get('invc_numb'),
									line_seqn	: rec.get('line_seqn')
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								rec2 = result.records[0]
							},
							failure : function(response, request) {
								resource.httpError(response);
							},
							callback : function() {
							}
						});

						var param = Ext.merge( this.up('form').getValues() );
							sttm_temp2 = rec2.work_strt_dttm.replace(/-/gi,""),
							sttm_temp1 = sttm_temp2.replace(/:/gi,""),
							sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
							sttm_hour = sttm_temp.substring('8','10');
							edtm_hour = param.work_edtm.substring('0','2');
							sttm_min = sttm_temp.substring('10','12');
							edtm_min = param.work_edtm.substring('2','4');
						var time  = edtm_hour-sttm_hour;
						var min   = edtm_min-sttm_min;
						if(min < 0){
							time = edtm_hour-sttm_hour-1;
							min  = edtm_min-sttm_min + 60;
						}
						var total = (time*60)+min;
						record = Ext.create( store.model.modelName , {
							invc_numb		: rec2.invc_numb,
							wkod_numb		: rec.get('invc_numb'),
							wkod_seqn		: rec.get('line_seqn'),
							wkct_idcd		: rec.get('wkct_idcd'),
							pdsd_numb		: rec.get('pdsd_numb'),
							work_sttm		: rec.get('work_sttm'),
							invc_date		: rec2.invc_date,
							work_edtm		: param.work_edtm+'00',
							prod_qntt		: param.prod_qntt,
							dsct_resn_dvcd	: param.dsct_resn_dvcd,
							need_time		: total,
							work_endd_date	: param.work_endd_date
						});
						store.add(record);
						store.sync({
							callback: function(batch, options) {
								store.reload();
								this.up('form').getForm().reset();
								this.up('window').destroy();
							} ,
							scope: this
						},{	synchro : _global.objects.synchro,_set : 'stop'} );
					}
				},
				{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						Ext.ComponentQuery.query('#stop')[0].up('window').destroy();
					}
				}
			]

		});

		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">중단</span>',
			closeAction: 'destory',
			width: 559,
			height: 437,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},

	end : function (rec) {
		var search = Ext.ComponentQuery.query('module-workbookv1-search')[0],
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workbookv1-lister')[0].getStore()
		;
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			itemId : 'end',
			fieldDefaults: {
				labelWidth: 200,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_endd_date','종료일자'),
					name		: 'work_endd_date',
					xtype		: 'datefield',
					width		: 535,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: new Date(),
					maxValue	: new Date(),
				},{	fieldLabel	: Language.get('work_edtm','종료시간'),
					name		: 'work_edtm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					value		: new Date(),
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					readOnly	: true,
					width		: 533,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp'
				},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'prod_qntt',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					width		: 548,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					trigger1Cls : _global.options.work_book_tema+'searchTrigger',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.trigger2')[0];
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
					trigger1Cls : 'hideCls trigger2',
				},{ xtype		: 'datefield',
					name		: 'invc_date',
					hidden		: true,
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					value		: rec.get('invc_date')
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var rec2;
						Ext.Ajax.request({
							url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
							method		: "POST",
							async		: false,
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									invc_numb	: rec.get('invc_numb'),
									line_seqn	: rec.get('line_seqn')
								})
							},
							success : function(response, request) {
								var object = response,
									result = Ext.decode(object.responseText)
								;
								rec2 = result.records[0]
							},
							failure : function(response, request) {
								resource.httpError(response);
							},
							callback : function() {
							}
						});

						var param = Ext.merge( this.up('form').getValues() );
							sttm_temp2 = rec2.work_strt_dttm.replace(/-/gi,""),
							sttm_temp1 = sttm_temp2.replace(/:/gi,""),
							sttm_temp  = sttm_temp1.replace(/\s/gi, ""),
							sttm_hour = sttm_temp.substring('8','10');
							edtm_hour = param.work_edtm.substring('0','2');
							sttm_min = sttm_temp.substring('10','12');
							edtm_min = param.work_edtm.substring('2','4');
						if(param.prod_qntt==null||param.prod_qntt==''){
							Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
						}else{
							var time  = edtm_hour-sttm_hour;
							var min   = edtm_min-sttm_min;
							if(min < 0){
								time = edtm_hour-sttm_hour-1;
								min  = edtm_min-sttm_min + 60;
							}
							var total = (time*60)+min;
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec2.invc_numb,
								wkod_numb		: rec.get('invc_numb'),
								wkod_seqn		: rec.get('line_seqn'),
								pdsd_numb		: rec.get('pdsd_numb'),
								wkct_idcd		: rec.get('wkct_idcd'),
								work_sttm		: rec.get('work_sttm'),
								cvic_idcd		: rec.get('cvic_idcd'),
								work_edtm		: param.work_edtm+'00',
								prod_qntt		: param.prod_qntt,
								invc_date		: rec2.invc_date,
								work_endd_date	: param.work_endd_date,
								need_time		: total,
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').destroy();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'end'} );
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						Ext.ComponentQuery.query('#end')[0].up('window').destroy();
					}
				}
			]

		});

		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
			closeAction: 'destroy',
			width: 650,
			height: 360,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
	},
//TODO popup
	popup : function (rec) {
		var	me = this
		;
		var store = Ext.create('Ext.data.Store', {
	        fields: ['title', 'imgSrc'],
	        data: []
	    });
		data = [];
		Ext.Ajax.request({
			url		: _global.location.http() + '/upload/get/imagesearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					invc_numb	: rec.get('prod_idcd'),
					orgn_dvcd	: 'product_mast',
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
					if(result.records.length > 0){
						var record = result.records,
							Img_format = "\\.(bmp|gif|jpg|jpeg|png)$"
						;
						for (var i = 0; i < record.length; i++) {
							var url = result.records[i].file_path;
							if(new RegExp(Img_format).test(url)){
								data.push({imgSrc:_global.img_http+url})
							}
						}
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		store.loadData(data, false);
		var form;
		if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
				form = Ext.widget('form', {
				border	: false,
				layout	: 'fit',
				bodyPadding: 10,
				fieldDefaults: {
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					labelStyle	: 'text-align:right;font-size:20px;"',
					fieldStyle	: 'font-size:20px !important;',
					labelSeparator : '',
					width		: 230,
					margin		: '5 0 0 0',
					border : 0,
				},
				items:[
					{	layout : {type:'vbox', align: 'stretch' },
						flex : 1,
						border	: 0,
						items:[
							{ layout : {type:'vbox', align: 'stretch' },
								flex : 1,
								border	: 0,
								items:[
									{	layout : {type:'hbox', align: 'stretch' },
										border	: 0,
										flex : 1,
										items:[
											{	fieldLabel	: Language.get('indn_date','지시번호'),
												name		: 'indn_date',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('invc_date','작업일자'),
												name		: 'invc_date',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','조판번호'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('prod_code','품명코드'),
												name		: 'prod_code',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	xtype	: 'button',
												text	: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
												cls		: 'button-right btn btn-danger',
												style	: 'text-decoration:none;',
												handler:function(){
													clearInterval(window.shot);
													win.close();
													this.up('window').destroy();
												},
											},
										]
									},{	layout : {type:'hbox', align: 'stretch' },
										border	: 0,
										flex : 1,
										items:[
											{	fieldLabel	: Language.get('cstm_name','거래처명'),
												name		: 'cstm_name',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 460,
											},{	fieldLabel	: Language.get('prod_name','품명'),
												name		: 'prod_name',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 460,
											}
										]
									},{	layout : {type:'hbox', align: 'stretch' },
										border	: 0,
										flex : 1,
										items:[
											{	fieldLabel	: Language.get('','원단규격'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','봉합방법'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','손잡이'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','파레트종류'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','스코어규격'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 370
											}
										]
									},{	layout : {type:'hbox', align: 'stretch' },
										border	: 0,
										flex : 1,
										items:[
											{	fieldLabel	: Language.get('','상자규격'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','상자타입'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','밴딩수량'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','적재단수'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','적재수량'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											}
										]
									},{	layout : {type:'hbox', align: 'stretch' },
										border	: 0,
										flex : 1,
										items:[
											{	fieldLabel	: Language.get('','원지구성'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','골종류'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','골방향'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','변경사항'),
												name		: '',
												xtype		: 'textfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
											},{	fieldLabel	: Language.get('','pono'),
												name		: '',
												xtype		: 'numericfield',
												readOnly	: true,
												fieldCls	: 'readonlyfield',
												width		: 370
											}
										]
									}
								]
							},{	xtype	: 'carousel',
								name	: 'apnd_imge',
								store	: store,
								flex	: 2
							}
						]
					}
				]
			});
		}else{
				form = Ext.widget('form', {
				border	: false,
				layout	: 'fit',
				bodyPadding: 10,
				fieldDefaults: {
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					labelStyle	: 'text-align:right;font-size:30px;margin:30 0 0 0',
					fieldStyle	: 'font-size:30px !important;',
					labelSeparator : '',
					border : 0,
				},
				items:[
					{	layout	: {type:'vbox', align: 'stretch' },
						flex	: 1,
						border	: 0,
						items	: [
							{	layout : {type:'hbox', align: 'stretch' },
								flex : 1,
								border	: 0,
								items:[
									{	xtype: 'carousel',
										name	: 'apnd_imge',
										store	: store,
										flex	: 2
									},{ layout : {type:'vbox', align: 'stretch' },
										flex : 1,
										border	: 0,
										items:[
											{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	xtype	: 'textfield',
														name	: 'clock',
														flex	: 3,
														listeners:{
															render:function(a,b){
																window.realTime = setInterval(function(){
																	var y,m,d,h,i,s,date = new Date();

																	y = date.getFullYear();
																	m = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
																	d = date.getDate()<10?'0'+date.getDate():date.getDate();
																	h = date.getHours()<10?'0'+date.getHours():date.getHours();
																	i = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
																	s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();

																	a.setValue(y+'-'+m+'-'+d+' '+h+':'+i+':'+s);
																}, 100)
															},
														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
														cls		: 'button-right btn btn-danger',
														style	: 'text-decoration:none;',
														handler:function(){
															clearInterval(window.shot);
															win.close();
															this.up('window').destroy();
														},
														flex	: 1
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												padding : 5,
												items:[
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">시작</span>',
														cls		: 'btn btn-success',
														margin	: 5,
														flex	: 1,
														handler	: function(){
															var stat, dvcd, cnt, numb,seqn;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	dvcd =  result.records.length > 0?result.records[0].pause_dvcd:'';
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});

															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/cnt.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		cvic_idcd	: rec.get('cvic_idcd')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	if(result.records.length > 0){
																		cnt = 1;
																		numb = result.records[0].invc_numb;
																		seqn = result.records[0].line_seqn;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});
															if(numb != rec.get('invc_numb') && seqn != rec.get('line_seqn')){
																if(cnt == 1){
																	Ext.Msg.alert("알림","현재 진행중인 작업이 있습니다.</br> 지시번호 :  "+""+numb);
																	return;
																}
															}
															if(dvcd == 1){
																Ext.Msg.alert("알림","일시정지를 해제하여 주십시오.");
																return;
															}

															//대기거나 중단일경우만 눌림 (중단일 경우 새로운 워크북 생성)
															if(stat == 0 || stat == 2){
																me.insert(rec,form.down('[name=cnt]'));
															}

														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">중단</span>',
														cls		: 'btn btn-primary',
														margin	: 5,
														flex	: 1,
														handler	: function(){
															var stat, dvcd;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	dvcd =  result.records.length > 0?result.records[0].pause_dvcd:'';
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});

															if(dvcd == 1){
																Ext.Msg.alert("알림","일시정지를 해제하여 주십시오.");
																return;
															}
															//생산착수인 경우 눌림
															if(stat == 1){
																me.stop(rec);
															}
														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">종료</span>',
														cls		: 'btn btn-warning',
														margin	: 5,
														flex	: 1,
														handler	: function(){
															var stat, dvcd;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	dvcd =  result.records.length > 0?result.records[0].pause_dvcd:'';
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});
															if(dvcd == 1){
																Ext.Msg.alert("알림","일시정지를 해제하여 주십시오.");
																return;
															}
															console.log(stat);
															if(stat != 0 && stat != 2){
																me.end(rec);
															}
														}
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	fieldLabel	: '카운터',
														xtype		: 'textfield',
														name		: 'cnt',
														readOnly	: true,
														labelStyle	: 'text-align:right;font-size:35px;margin:45 0 0 0',
														flex		: 1,
														listeners	: {
															render	:function(field){
																var a = 0, pkg_qntt = 1;
																clearInterval(window.shot);
																Ext.Ajax.request({
																	url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/plc_cnt.do',
																	method		: "POST",
																	async		: false,
																	params		: {
																		token	: _global.token_id,
																		param	: Ext.encode({
																			invc_numb	: rec.get('invc_numb'),
																			line_seqn	: rec.get('line_seqn')
																		})
																	},
																	success : function(response, request) {
																		var object = response,
																			result = Ext.decode(object.responseText)
																		;
																		if(result.records[0].cnt){
																			a = result.records[0].cnt;
																		}
																	},
																	failure : function(response, request) {
																		resource.httpError(response);
																	},
																	callback : function() {
																	}
																});
																field.setValue(a*rec.get('pkg_qntt'));
																window.shot = setInterval(function(){
																	Ext.Ajax.request({
																		url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/plc_cnt.do',
																		method		: "POST",
																		async		: false,
																		params		: {
																			token	: _global.token_id,
																			param	: Ext.encode({
																				invc_numb	: rec.get('invc_numb'),
																				line_seqn	: rec.get('line_seqn')
																			})
																		},
																		success : function(response, request) {
																			var object = response,
																				result = Ext.decode(object.responseText)
																			;
																			if(result.records[0].cnt){
																				a = result.records[0].cnt;
																			}
																		},
																		failure : function(response, request) {
																			resource.httpError(response);
																		},
																		callback : function() {
																		}
																	});
																	field.setValue(a*rec.get('pkg_qntt'));
																},30000);
															}
														}
													},{	fieldLabel	: '오더수',
														xtype		: 'textfield',
														labelStyle	: 'text-align:right;font-size:35px;margin:45 0 0 0',
														value		: rec.get('indn_qntt'),
														readOnly	: true,
														flex		: 1
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												padding : 5,
												items:[
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">일시정지</span>',
														cls		: 'btn btn-warning',
														margin	: 5,
														flex	: 1,
														handler	: function(grid, rowIndex, colIndex, item, e, record){
															var stat, dvcd, invc, seqn;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																		dvcd = result.records[0].pause_dvcd;
																		invc = result.records[0].invc_numb;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});

															if(dvcd == 0){
																dvcd = 1;
															}else if(dvcd == 1){
																dvcd = 0;
															}

															//시작이 된것만
															if(stat != 0){
																//일시정지된 seqn 구하기
																Ext.Ajax.request({
																	url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/pauseSeqn.do',
																	method		: "POST",
																	async		: false,
																	params		: {
																		token	: _global.token_id,
																		param	: Ext.encode({
																			invc_numb	: invc,
																		})
																	},
																	success : function(response, request) {
																		var object = response,
																			result = Ext.decode(object.responseText)
																		;
																		seqn = result.records[0].line_seqn;
																	},
																	failure : function(response, request) {
																		resource.httpError(response);
																	},
																	callback : function() {
																	}
																});

																//일시정지
																Ext.Ajax.request({
																	url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/set/pause.do',
																	method		: "POST",
																	async		: false,
																	params		: {
																		token	: _global.token_id,
																		param	: Ext.encode({
																			invc_numb	: invc,
																			line_seqn	: seqn,
																			pause_dvcd	: dvcd,
																			loss_resn_dvcd : '91',
																			time		: Ext.Date.format(new Date(),'Hsi')
																		})
																	},
																	success : function(response, request) {
																		var object = response,
																			result = Ext.decode(object.responseText)
																		;
																	},
																	failure : function(response, request) {
																		resource.httpError(response);
																	},
																	callback : function() {
																	}
																});

																if(dvcd == 1){
																	Ext.Msg.alert("알림","일시정지 되었습니다.");
																}else if(dvcd == 0){
																	Ext.Msg.alert("알림","일시정지가 해제되었습니다.");
																}
															}
														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">불량</span>',
														cls		: 'btn btn-danger',
														margin	: 5,
														flex	: 1,
														handler	: function(grid, rowIndex, colIndex, item, e, record){
															var stat;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	dvcd = result.records[0].pause_dvcd;
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});
															//생산착수인 경우 눌림
															if(stat == 1){
																resource.loadPopup({
																	widget	: 'lookup-poor-popup',
																	params	: {invc_numb : rec.get('invc_numb'), line_seqn : rec.get('line_seqn'), record : rec},
																});
															}
														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">유실</span>',
														cls		: 'btn btn-warning',
														margin	: 5,
														flex	: 1,
														handler	: function(grid, rowIndex, colIndex, item, e, record){
															var stat;
															//마지막 작업 불러오기
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/workbook.do',
																method		: "POST",
																async		: false,
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: rec.get('invc_numb'),
																		line_seqn	: rec.get('line_seqn')
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	if(result.records.length > 0){
																		stat = result.records[0].prog_stat_dvcd;
																	}else{
																		stat = 0;
																	}
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});
															//생산착수인 경우 눌림
															if(stat == 1){
																resource.loadPopup({
																	widget	: 'lookup-fail-popup',
																	params	: {invc_numb : rec.get('invc_numb'), line_seqn : rec.get('line_seqn'), record : rec},
																});
															}
														}
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	xtype:'textfield',
														value:'기존',
														readOnly: true,
														flex : 1,
														listeners : {
															beforeRender : function(e){
																if(rec.get('stat_dvcd') == 1){
																	e.fieldStyle = "background-color : #ccff66 !important; font-size:30px !important; background-image:none;";
																}
															}
														}
													},
													{	xtype:'textfield',
														value:'신규',
														readOnly: true,
														flex : 1,
														listeners : {
															beforeRender : function(e){
																if(rec.get('stat_dvcd') == 2){
																	e.fieldStyle = "background-color : #ccff66 !important; font-size:30px !important; background-image:none;";
																}
															}
														}
													},
													{	xtype:'textfield',
														value:'변경',
														readOnly: true,
														flex : 1,
														listeners : {
															beforeRender : function(e){
																if(rec.get('stat_dvcd') == 3){
																	e.fieldStyle = "background-color : #ccff66 !important; font-size:30px !important; background-image:none;";
																}
															}
														}
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	fieldLabel	: '장',
														xtype		: 'numericfield',
														value		: rec.get('prod_leng'),
														readOnly: true,
														labelWidth	: 50,
														flex		: 1
													},{	fieldLabel	: '폭',
														xtype		: 'numericfield',
														value		: rec.get('prod_widh'),
														readOnly: true,
														labelWidth	: 50,
														flex		: 1
													},{	fieldLabel	: '고',
														xtype		: 'numericfield',
														readOnly: true,
														value		: rec.get('prod_hght'),
														labelWidth	: 50,
														name		: '',
														flex		: 1
													}
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	fieldLabel	: '규격',
														xtype		: 'textfield',
														readOnly: true,
														value		: rec.get('bom_spec'),
														flex		: 1,
														listeners	: {
															render : function(){
																var spec;
																console.log(rec);
																Ext.Ajax.request({
																	url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workbookv1/get/fabc.do',
																	method		: "POST",
																	async		: false,
																	params		: {
																		token	: _global.token_id,
																		param	: Ext.encode({
																			fabc_idcd	: rec.get('fabc_idcd'),
																		})
																	},
																	success : function(response, request) {
																		var object = response,
																			result = Ext.decode(object.responseText)
																		;
																		console.log(result);
																		//규격+지골+종
																		spec = rec.get('bom_spec')
																			   + ' '
																			   + result.records[0].ppkd?result.records[0].ppkd:''
																			   + ' '
																			   + result.records[0].ppln?result.records[0].ppln:''
																		;
																	},
																	failure : function(response, request) {
																		resource.httpError(response);
																	},
																	callback : function() {
																	}
																});
																this.setValue(spec);
															}
														}
													}
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	xtype	: 'textfield',
														name	: 'user_memo',
														readOnly: true,
														editable: false,
														flex	: 1
													},
												]
											}
										]
									}
								]
							},
							{	layout	: {type:'hbox', align: 'stretch' },
								border	: 0,
								height	: 100,
								margin	: '5 0 0 0',
								items:[
									{	fieldLabel	: '거래처',
										xtype		: 'textfield',
										value		: rec.get('cstm_name'),
										flex		: 2
									},{	fieldLabel	: '품명',
										xtype		: 'textfield',
										value		: rec.get('prod_name'),
										flex		: 3
									},
								]
							}
						]
					}
				]
			});
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
			closeAction	: 'hide',
			layout		: 'fit',
			itemId		: 'mainPopup',
			maximized	: true,
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: '',
			listeners:{
				close:function(){
					clearInterval(window.realTime);
					me.getStore().reload();
				}
			}
		});
		win.show();
	},

});