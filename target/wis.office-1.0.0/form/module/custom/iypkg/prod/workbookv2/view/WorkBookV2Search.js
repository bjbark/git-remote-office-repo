Ext.define('module.custom.iypkg.prod.workbookv2.view.WorkBookV2Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbookv2-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();
		var cvicLookup = new Array();
		wkctLookup.push(['','전체']);
		cvicLookup.push(['','전체']);
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					rslt_rept_yorn	: '1'
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
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_name]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		var wkct = Ext.util.Cookies.get('wkct_idcd');
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/cvic/cvicmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					wkct_idcd		: wkct
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
						cvicLookup.push([result.records[i].cvic_idcd,result.records[i].cvic_name]);
					}
				}
			},
			failure : function(result, request) {
			},
		});


		me.items =[ me.searchBasic(wkctLookup,cvicLookup)];
		me.callParent();

	},
	listeners:{
		destroy:function(){
			clearInterval(window.shot);
		},
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},
	searchBasic : function(wkctLookup,cvicLookup){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 65
				,margin	: '20 40 0 10'
				,autoScroll: true
				,items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						items: [
							{	fieldLabel	: '일자',
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								root		: true,
								value		: new Date(),
								editable	: false,
								hideTrigger	: true,
								clearable	: false,
								width		: 220,
								labelWidth	: 47,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
								listeners	: {
									change	: function(){
										var val = this.getValue(),
											invc_date = me.down('[name=invc_date2]').getValue()
										;
										if(invc_date < val){
											Ext.Msg.alert('알림','일자를 확인해주세요.')
											return;
										}else{
											var lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
												invc_date2	= Ext.util.Format.date(me.down('[name=invc_date2]').getValue(), "Ymd"),
												invc_date1	= Ext.util.Format.date(val, "Ymd"),
												wkct_idcd	= me.down('[name=wkct_name]').getValue(),
												layout		= Ext.ComponentQuery.query('module-workbookv2-layout')[0],
												mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
												cvic_idcd	= me.down('[name=cvic_name]').getValue()
											;
											mask.show();
											lister.select({
												callback:function(records, operation, success) {
													if (success) {
														lister.getSelectionModel().select(0);
														mask.hide();
													} else { me.pocket.editor().getForm().reset(true);}
												}, scope:me
											}, Ext.merge({ wkct_idcd   : wkct_idcd,
															stor_id    : _global.stor_id,
															invc_date1 :invc_date1,
															invc_date2 : invc_date2,
															cvic_idcd  : cvic_idcd!=null?cvic_idcd:''
														}));
										}
									}
								}
							},{	fieldLabel	: '~',
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								value		: new Date(),
								editable	: false,
								hideTrigger	: true,
								clearable	: false,
								width		: 190,
								labelWidth	: 15,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
								listeners	: {
									change	: function(){
										var val = this.getValue(),
											invc_date = me.down('[name=invc_date1]').getValue()
										;
										if(invc_date > val){
											Ext.Msg.alert('알림','일자를 확인해주세요.')
											return;
										}else{
											var lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
												invc_date1	= Ext.util.Format.date(me.down('[name=invc_date1]').getValue(), "Ymd"),
												invc_date2	= Ext.util.Format.date(val, "Ymd"),
												wkct_idcd	= me.down('[name=wkct_name]').getValue(),
												cvic_idcd	= me.down('[name=cvic_name]').getValue(),
												layout		= Ext.ComponentQuery.query('module-workbookv2-layout')[0],
												mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
											;
											mask.show();
											lister.select({
												callback:function(records, operation, success) {
													if (success) {
														lister.getSelectionModel().select(0);
														mask.hide();
													} else { me.pocket.editor().getForm().reset(true);}
												}, scope:me
											}, Ext.merge({ wkct_idcd   : wkct_idcd,
															stor_id    : _global.stor_id,
															invc_date1 :invc_date1,
															invc_date2 : invc_date2,
															cvic_idcd  : cvic_idcd!=null?cvic_idcd:''
														}));
										}
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('', '공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.options.work_book_tema +'trigger',											// trigger(버튼)에 클래스 추가
						width		: 240,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
						value		: Ext.util.Cookies.get('wkct_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가

						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
									invc_date1	= Ext.util.Format.date(me.down('[name=invc_date1]').getValue(), "Ymd"),
									invc_date2	= Ext.util.Format.date(me.down('[name=invc_date2]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= feild.value
								;
								mask.show();
								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({ wkct_idcd : value,
												stor_id   : _global.stor_id,
												invc_date1 :invc_date1,
												invc_date2 : invc_date2
											}))
								mask.hide();
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
									invc_date1	= Ext.util.Format.date(me.down('[name=invc_date1]').getValue(), "Ymd"),
									invc_date2	= Ext.util.Format.date(me.down('[name=invc_date2]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
								;

								mask.show();
								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
											mask.hide();
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({ wkct_idcd   : value,
												stor_id    : _global.stor_id,
												invc_date1 :invc_date1,
												invc_date2 : invc_date2
											}));
								Ext.util.Cookies.set('wkct_idcd', value);

								Ext.Ajax.request({
									url		: _global.location.http() + '/prod/cvic/cvicmast/get/lookup.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											wkct_idcd		: value
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											return;
										} else {
											me.down('[name=cvic_name]').getStore().removeAll();										// store clear
											cvicLookup = [];																		// 초기화

											var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{		// 빈값
												code : '',
												data : '',
												name : '전체'
											})
											cvicLookup.push(record);																// 첫번째 빈 값 저장
											for(var i =0; i<result.records.length;i++){
												var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{	// 데이터 모델화
													code : result.records[i].cvic_idcd,
													data : result.records[i].cvic_idcd,
													name : result.records[i].cvic_name
												})
												cvicLookup.push(record);															// loadData를 위해 배열에 저장
											}
											setTimeout(function(){
												me.down('[name=cvic_name]').getStore().loadData(cvicLookup,false);
											},400);
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										me.down('[name=cvic_name]').setValue(' ');
									}
								});
							}
						}
					},{	fieldLabel	: Language.get('cvic', '설비'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'cvic_name',
						trigger1Cls : 'cvicLookup '+_global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 260,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: cvicLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
//						value		: Ext.util.Cookies.get('cvic_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
						},
						listeners : {
							change:function(feild,value,a){
								var	lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
									invc_date1	= Ext.util.Format.date(me.down('[name=invc_date1]').getValue(), "Ymd"),
									invc_date2	= Ext.util.Format.date(me.down('[name=invc_date2]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									wkct_idcd	= me.down('[name=wkct_name]').getValue()
								;
								mask.show();
								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge({	wkct_idcd : wkct_idcd,
												stor_id   : _global.stor_id,
												invc_date1 :invc_date1,
												invc_date2 : invc_date2,
												cvic_idcd  : value
											}))
								mask.hide();
							}
						}
					},{	buttonAlign	: 'center',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">새로고침</span>',
						cls			: 'btn btn-warning',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 30',
						style: 'text-decoration:none;',
						handler:function(){
							var	lister		= Ext.ComponentQuery.query('module-workbookv2-lister')[0],
								invc_date1	= Ext.util.Format.date(me.down('[name=invc_date1]').getValue(), "Ymd"),
								invc_date2	= Ext.util.Format.date(me.down('[name=invc_date2]').getValue(), "Ymd"),
								mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
								wkct_idcd	= me.down('[name=wkct_name]').getValue(),
								cvic_idcd	= me.down('[name=cvic_name]').getValue()
							;
							mask.show();
							lister.select({
								callback:function(records, operation, success) {
									if (success) {
										lister.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true);}
								}, scope:me
							}, Ext.merge({	wkct_idcd : wkct_idcd,
											stor_id   : _global.stor_id,
											invc_date1 :invc_date1,
											invc_date2 : invc_date2,
											cvic_idcd  : cvic_idcd!=null?cvic_idcd:''
										}))
							mask.hide();
						}
					},{	buttonAlign	: 'right',
						xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
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

});