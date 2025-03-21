Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-dhtec-workenty-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();
		var cvicLookup = new Array();
		cvicLookup.push(['','']);
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/wkctsearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						if(_global.lang_gbcd=='ENG'){
							wkctLookup.push([result.records[i].wkct_idcd,result.records[i].user_memo]);
						}else{
							wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_name]);
						}
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		me.items =[ me.searchBasic(wkctLookup,cvicLookup)];
		me.callParent();
	},

	searchBasic : function(wkctLookup,cvicLookup){
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 65,
				margin	: '20 40 0 10',
				autoScroll: true,
				items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: Language.get('date','일자'),
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 250,
								maxWidth	: 500,
								value		: new Date(),
								labelWidth	: 70,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
								listeners	:{
									render	: function(field){
										window.searchIt = setInterval(function(){
											field.setValue(new Date());
										},60000)
									},
									destroy:function(){
										clearInterval(window.searchIt);
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('wkct', '작업공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',	// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',	// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.options.work_book_tema+'trigger',				// trigger(버튼)에 클래스 추가
						width		: 300,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 100,
//						value		: Ext.util.Cookies.get('wkct_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',				// lookup list에 클래스 추가
						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
									detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0],
//									cvic_idcd	= me.down('[name=cvic_name]').getValue(),
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value
								;
								value = feild.value;
								mask.show();
//								Ext.Ajax.request({
//									url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/cvicsearch.do',
//									params	: {
//										token : _global.token_id,
//										param : JSON.stringify({
//											stor_id			: _global.stor_id,
//											hqof_idcd		: _global.hqof_idcd,
//											wkct_idcd		: value
//										})
//									},
//									async	: false,
//									method	: 'POST',
//									success	: function(response, request) {
//										var result = Ext.decode(response.responseText);
//										if	(!result.success ){
//											return;
//										} else {
//											me.down('[name=cvic_name]').getStore().removeAll();										// store clear
//											cvicLookup = [];																		// 초기화
//
//											var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{		// 빈값
//												code : '',
//												data : '',
//												name : '　'
//											})
//											cvicLookup.push(record);																// 첫번째 빈 값 저장
//											for(var i =0; i<result.records.length;i++){
//												var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{	// 데이터 모델화
//													code : result.records[i].cvic_idcd,
//													data : result.records[i].cvic_idcd,
//													name : result.records[i].cvic_name
//												})
//												cvicLookup.push(record);															// loadData를 위해 배열에 저장
//											}
//											me.down('[name=cvic_name]').getStore().loadData(cvicLookup);							// loadData
//										}
//									},
//									failure : function(result, request) {
//									},
//									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//										me.down('[name=cvic_name]').setValue(' ');
//									}
//								});

//								if(value=='WT003'){
//									detail.down('[name=workBtn]').show();
//									detail.down('[name=workMtrl]').show();
//									detail.down('[name=workBtn2]').hide();
//								}else if(value=='WT004'){
//									detail.down('[name=workBtn2]').show();
//									detail.down('[name=workBtn]').hide();
//									detail.down('[name=workMtrl]').hide();
//								}else{
//									detail.down('[name=workBtn]').hide();
//									detail.down('[name=workBtn2]').hide();
//									detail.down('[name=workMtrl]').hide();
//								}
								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({	wkct_idcd : value,
//												cvic_idcd : cvic_idcd,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {	wkct_idcd : value,
//												cvic_idcd : cvic_idcd,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( {	wkct_idcd : value,
//												cvic_idcd : cvic_idcd,
												stor_id : _global.stor_id}));
								mask.hide();
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
									detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									layout		= Ext.ComponentQuery.query('module-dhtec-workenty-layout')[0],
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									tpanel		= layout.down('#mainpanel'),
									tindex = tpanel.items.indexOf(tpanel.getActiveTab())
								;
								if(value!=''){
									mask.show();
//									Ext.Ajax.request({
//										url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/cvicsearch.do',
//										params	: {
//											token : _global.token_id,
//											param : JSON.stringify({
//												stor_id			: _global.stor_id,
//												hqof_idcd		: _global.hqof_idcd,
//												wkct_idcd		: value
//											})
//										},
//										async	: false,
//										method	: 'POST',
//										success	: function(response, request) {
//											var result = Ext.decode(response.responseText);
//											if	(!result.success ){
//												return;
//											} else {
//												me.down('[name=cvic_name]').getStore().removeAll();										// store clear
//												cvicLookup = [];																		// 초기화
//
//												var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{		// 빈값
//													code : '',
//													data : '',
//													name : '　'
//												})
//												cvicLookup.push(record);																// 첫번째 빈 값 저장
//												for(var i =0; i<result.records.length;i++){
//													var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{	// 데이터 모델화
//														code : result.records[i].cvic_idcd,
//														data : result.records[i].cvic_idcd,
//														name : result.records[i].cvic_name
//													})
//													cvicLookup.push(record);															// loadData를 위해 배열에 저장
//												}
//												me.down('[name=cvic_name]').getStore().loadData(cvicLookup);							// loadData
//											}
//										},
//										failure : function(result, request) {
//										},
//										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//											me.down('[name=cvic_name]').setValue(' ');
//										}
//									});
//									var cvic_idcd	= me.down('[name=cvic_name]').getValue();

									if(tindex == 0){
//										if(value=='WT003'){
//											detail.down('[name=workBtn]').show();
//											detail.down('[name=workMtrl]').show();
//											detail.down('[name=workBtn2]').hide();
//										}else if(value=='WT004'){
//											detail.down('[name=workBtn2]').show();
//											detail.down('[name=workBtn]').hide();
//											detail.down('[name=workMtrl]').hide();
//										}else{
//											detail.down('[name=workBtn]').hide();
//											detail.down('[name=workBtn2]').hide();
//											detail.down('[name=workMtrl]').hide();
//										}
										lister.select({
											callback:function(records, operation, success) {
												if (success) {
													lister.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
//														cvic_idcd : cvic_idcd,
														stor_id  : _global.stor_id,
														work_date:work_date }));
										detail.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
//														cvic_idcd : cvic_idcd,
														stor_id  : _global.stor_id,
														work_date:work_date }));
									}else if(tindex == 1){
//										if(value=='WT003'){
//											me.down("[name=printBtn]").setVisible(true);
//										}else{
//											me.down("[name=printBtn]").setVisible(false);
//										}
										detail2.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
//														cvic_idcd : cvic_idcd,
														stor_id  : _global.stor_id
										}) );
									}
									mask.hide();
//									Ext.util.Cookies.set('wkct_idcd', value);
								}
							}
						}
					}
//					,{	fieldLabel	: Language.get('cvic', '설비'),
//						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
//						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
//						xtype		: 'lookupfield',
//						name		: 'cvic_name',
//						trigger1Cls : 'cvicLookup '+_global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
//						width		: 300,
//						multiSelect	: false ,
//						editable	: false,
//						lookupValue	: cvicLookup,
//						height		: 45,
//						maxWidth	: 500,
//						value		: '',
//						labelWidth	: 100,
////						value		: Ext.util.Cookies.get('cvic_idcd'),
//						margin		: '0 40 0 0',
//						listConfig	:{
//							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
//						},
//						listeners : {
//							render : function(feild) {
//								var lister		= Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
//									detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
//									detail2		= Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0],
//									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
//									wkct_idcd	= me.down('[name=wkct_name]').getValue(),
//									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
//									value		= feild.value
//								;
//								var trigger1 = Ext.dom.Query.select('.cvicLookup')[0];
//								setTimeout(function(){
//									Ext.get(trigger1).dom.click();
//									Ext.get(trigger1).dom.click();
//									me.down('[name=cvic_name]').getStore().loadData(cvicLookup);
//								},1000);
//								if(wkct_idcd){
//									mask.show();
//									lister.select({
//										callback:function(records, operation, success) {
//											if (success) {
//												lister.getSelectionModel().select(0);
//											} else { }
//										}, scope:me
//									}, Ext.merge({	cvic_idcd : value,
//													wkct_idcd : wkct_idcd,
//													stor_id   : _global.stor_id,
//													work_date :work_date }));
//									detail.select({
//										callback:function(records, operation, success) {
//											if (success) {
//												detail.getSelectionModel().select(0);
//											} else { }
//										}, scope:me
//									}, Ext.merge( {	cvic_idcd : value,
//													wkct_idcd : wkct_idcd,
//													stor_id   : _global.stor_id,
//													work_date :work_date }));
//									detail2.select({
//										callback:function(records, operation, success) {
//											if (success) {
//												detail.getSelectionModel().select(0);
//											} else {}
//										}, scope:me
//									}, Ext.merge( {	cvic_idcd : value,
//													wkct_idcd : wkct_idcd,
//													stor_id : _global.stor_id,
//													work_date :work_date}));
//									mask.hide();
//								}
//							},
//							change:function(feild,value,a){
//								var lister		= Ext.ComponentQuery.query('module-dhtec-workenty-lister')[0],
//									detail		= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0],
//									detail2		= Ext.ComponentQuery.query('module-dhtec-workenty-detail2')[0],
//									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
//									wkct_idcd	= me.down('[name=wkct_name]').getValue(),
//									layout		= Ext.ComponentQuery.query('module-dhtec-workenty-layout')[0],
//									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
//									tpanel		= layout.down('#mainpanel'),
//									tindex = tpanel.items.indexOf(tpanel.getActiveTab())
//								;
//								if(wkct_idcd){
//									mask.show();
//									if(tindex == 0){
//										lister.select({
//											callback:function(records, operation, success) {
//												if (success) {
//													lister.getSelectionModel().select(0);
//												} else { me.pocket.editor().getForm().reset(true);}
//											}, scope:me
//										}, Ext.merge({	cvic_idcd : value,
//														wkct_idcd : wkct_idcd,
//														stor_id  : _global.stor_id,
//														work_date:work_date }));
//										detail.select({
//											callback:function(records, operation, success) {
//												if (success) {
//													detail.getSelectionModel().select(0);
//												} else { me.pocket.editor().getForm().reset(true);}
//											}, scope:me
//										}, Ext.merge({	cvic_idcd : value,
//														wkct_idcd : wkct_idcd,
//														stor_id  : _global.stor_id,
//														work_date:work_date }));
//									}else if(tindex == 1){
//										detail2.select({
//											callback:function(records, operation, success) {
//												if (success) {
//													detail.getSelectionModel().select(0);
//												} else { me.pocket.editor().getForm().reset(true);}
//											}, scope:me
//										}, Ext.merge({	cvic_idcd : value,
//														wkct_idcd : wkct_idcd,
//														stor_id  : _global.stor_id
//										}) );
//									}
//									mask.hide();
//									Ext.util.Cookies.set('cvic_idcd', value);
//								}
//							}
//						}
//					}
					,{	fieldLabel	: '지시번호',
						xtype		: 'textfield',
						name		: 'invc_numb',
						width		: 300,
						labelWidth	: 100,
						height		: 45,
						margin		: '0 0 0 10',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',	// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',	// field에 클래스추가
						cls			: 'textTemp',
						style		: 'text-align:center',
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER ) {
									var value = self.getValue();
									if(value == '' || value == null){
										return;
									}
//									me.barcode(value);
									self.setValue('');
								}
							},
						},
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">'+Language.get('close', '닫기')+'</span>',
						cls			: 'button-right btn btn-danger',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 0',
						style: 'text-decoration:none;',
						handler:function(){
							var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
							sideButton.click();
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},

	printPopup:function(record){
		var	me			= this,
			form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 60,
				labelStyle: 'text-align:right',
				width		: 280,
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('prod_qntt', '생산수량'),
					name		: 'qntt1',
					xtype		: 'textfield',
					labelWidth	: 130,
					hideTrigger	: true,
					readOnly	: true,
					width		: 308,
					height		: 50,
					labelStyle	: 'line-height: 35px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					margin		: '30 0 0 30',
					listeners:{
						render:function(field){
							this.setValue(record.data.prod_qntt);
						}
					}
				},{	fieldLabel	: Language.get('qntt_box', '박스당수량'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'qntt2',
					labelWidth	: 130,
					width		: 325,
					height		: 50,
					margin		: '30 0 0 30',
					listConfig	:{
						itemCls	: _global.options.work_book_tema+'item'
					},
					handleMouseEvents:true,
					listeners:{
						render:function(field ){
							field.getEl().on('click', function( event, el ) {
								var trigger1 = Ext.dom.Query.select('.triggerprt')[0];
								Ext.get(trigger1).dom.click();
							});
						}
					},
					popup: {
						select	: 'SINGLE',
						widget	: 'lookup-keypad-popup',
						params	: { stor_grp : _global.stor_grp},
						result	: function(records, nameField, pairField){
							console.log(nameField);
							console.log(records[0].result);
							nameField.setValue(records[0].result);
						}
					},
					trigger1Cls : 'hideCls triggerprt',
				},{	xtype	: 'textfield',
					name	: 'invc',
					hidden	: true,
					listeners:{
						render:function(field){
							this.setValue(record.data.wkod_numb);
						}
					}
				},{	xtype	: 'textfield',
					name	: 'seqn',
					hidden	: true,
					listeners:{
						render:function(field){
							this.setValue(record.data.wkod_seqn);
						}
					}
				}

			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:1.5em">'+Language.get('confirm', '확인')+'</span>',
					width : 100,
					height : 30,
					cls: 'button-style',
					handler: function() {
						var me = this;
						var param = Ext.merge( this.up('form').getValues() );
						var jrf		= 'Kitec_ItemTag2.jrf',
							resId	= _global.hq_id.toUpperCase(),
							arg = 'wkod_numb~'+param.invc+'~'+'wkod_seqn~'+param.seqn+'~'+'qntt1~'+param.qntt1+'~'+'qntt2~'+param.qntt2+'~'+'invc_numb~'+record.get('invc_numb')+'~',
							url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}',
							win = window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=950')
						;
							this.up('window').destroy();
							return win;
					}
				},
				{	text: '<span class="btnTemp" style="font-size:1.5em">'+Language.get('cancel', '취소')+'</span>',
					cls: 'button-style',
					width : 100,
					height : 30,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').destroy();
					}
				}
			],
		});
		win = Ext.widget('window', {
			title: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('tag_label', '층별관리현품표')+'</span>',
			closeAction: 'hide',
			width: 400,
			height: 280,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();
	},








});