Ext.define('module.custom.inkopack.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-workentry-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var cvicLookup = new Array();
		var wkctLookup = new Array();
		cvicLookup.push(['','']);
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/incopack/prod/workentry/get/wkctsearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					rslt_rept_yorn	: '1',
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
		me.items =[ me.searchBasic(cvicLookup,wkctLookup)];
		me.callParent();
	},

	searchBasic : function(cvicLookup,wkctLookup){
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
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 210,
								maxWidth	: 500,
								value		: new Date(),
								labelWidth	: 47,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: true,
								height		: 45,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								style		: 'text-align:center',
							}
						]
					},{	fieldLabel	: Language.get('', '공정'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 270,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
//						value		: Ext.util.Cookies.get('cvic_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
							minHeight	: 200
						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workentry-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workentry-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workentry-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									cvic_idcd	= me.down('[name=cvic_name]').getValue(),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= feild.value
								;
								if(value!=''){
									mask.show();

									lister.select({
										callback:function(records, operation, success) {
											if (success) {
												lister.getSelectionModel().select(0);
											} else { }
										}, scope:me
									}, Ext.merge({	cvic_idcd : cvic_idcd,
													stor_id   : _global.stor_id,
													wkct_idcd : value,
													work_date :work_date }));
									detail.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else { }
										}, scope:me
									}, Ext.merge( {	cvic_idcd : cvic_idcd,
													wkct_idcd : value,
													stor_id   : _global.stor_id,
													work_date :work_date }));
									detail2.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else {}
										}, scope:me
									}, Ext.merge( {	cvic_idcd : cvic_idcd,
													wkct_idcd : value,
													stor_id : _global.stor_id,
													work_date :work_date}));
									mask.hide();
								}
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-workentry-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workentry-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workentry-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									layout		= Ext.ComponentQuery.query('module-workentry-layout')[0],
									cvic_idcd	= me.down('[name=cvic_name]').getValue(),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									tpanel		= layout.down('#mainpanel'),
									tindex = tpanel.items.indexOf(tpanel.getActiveTab())
								;
								if(value!=''){
									mask.show();
									Ext.Ajax.request({
										url		: _global.location.http() + '/custom/incopack/prod/workentry/get/cvicsearch.do',
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
												for(var i =0; i<result.records.length;i++){
													var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{	// 데이터 모델화
														code : result.records[i].cvic_idcd,
														data : result.records[i].cvic_idcd,
														name : result.records[i].cvic_name
													})
													cvicLookup.push(record);															// loadData를 위해 배열에 저장
												}
												me.down('[name=cvic_name]').getStore().loadData(cvicLookup);							// loadData
												cvicLookup = [];																		// 초기화
												var record = Ext.create(me.down('[name=cvic_name]').getStore().model.modelName,{		// 빈값
													code : '',
													data : '',
													name : '　'
												})
												cvicLookup.push(record);																// 첫번째 빈 값 저장
											}
										},
										failure : function(result, request) {
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
											me.down('[name=cvic_name]').setValue('');
										}
									});
									if(tindex == 0){
										lister.select({
											callback:function(records, operation, success) {
												if (success) {
													lister.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
														stor_id  : _global.stor_id,
														work_date:work_date }));
										detail.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
														stor_id  : _global.stor_id,
														work_date:work_date }));
									}else if(tindex == 1){
										detail2.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	wkct_idcd : value,
														stor_id  : _global.stor_id
										}) );
									}
								}
								mask.hide();
								Ext.util.Cookies.set('wkct_idcd', value);
							}
						}
					},{	fieldLabel	: Language.get('', '설비'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'cvic_name',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 270,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: cvicLookup,
						height		: 45,
						maxWidth	: 500,
						value		: '',
						labelWidth	: 60,
//						value		: Ext.util.Cookies.get('cvic_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workentry-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workentry-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workentry-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									wkct_idcd	= me.down('[name=wkct_name]').getValue(),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= feild.value
								;
								if(wkct_idcd){
									mask.show();
									lister.select({
										callback:function(records, operation, success) {
											if (success) {
												lister.getSelectionModel().select(0);
											} else { }
										}, scope:me
									}, Ext.merge({	cvic_idcd : value,
													wkct_idcd : wkct_idcd,
													stor_id   : _global.stor_id,
													work_date :work_date }));
									detail.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else { }
										}, scope:me
									}, Ext.merge( {	cvic_idcd : value,
													wkct_idcd : wkct_idcd,
													stor_id   : _global.stor_id,
													work_date :work_date }));
									detail2.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else {}
										}, scope:me
									}, Ext.merge( {	cvic_idcd : value,
													wkct_idcd : wkct_idcd,
													stor_id : _global.stor_id,
													work_date :work_date}));
									mask.hide();
								}
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-workentry-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workentry-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workentry-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									wkct_idcd	= me.down('[name=wkct_name]').getValue(),
									layout		= Ext.ComponentQuery.query('module-workentry-layout')[0],
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									tpanel		= layout.down('#mainpanel'),
									tindex = tpanel.items.indexOf(tpanel.getActiveTab())
								;
								if(wkct_idcd){
									mask.show();
									if(tindex == 0){
										lister.select({
											callback:function(records, operation, success) {
												if (success) {
													lister.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	cvic_idcd : value,
														wkct_idcd : wkct_idcd,
														stor_id  : _global.stor_id,
														work_date:work_date }));
										detail.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	cvic_idcd : value,
														wkct_idcd : wkct_idcd,
														stor_id  : _global.stor_id,
														work_date:work_date }));
									}else if(tindex == 1){
										detail2.select({
											callback:function(records, operation, success) {
												if (success) {
													detail.getSelectionModel().select(0);
												} else { me.pocket.editor().getForm().reset(true);}
											}, scope:me
										}, Ext.merge({	cvic_idcd : value,
														wkct_idcd : wkct_idcd,
														stor_id  : _global.stor_id
										}) );
									}
									mask.hide();
									Ext.util.Cookies.set('cvic_idcd', value);
								}
							}

						}
					},{	fieldLabel	: Language.get('shot', 'SHOT'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'numericfield',
						name		: 'shot',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 190,
						multiSelect	: false ,
						editable	: false,
						readOnly	: true,
						hidden		: true,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 90,
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('poor_qntt_sum', '불량계'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'numericfield',
						name		: 'poor_qntt_sum',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 190,
						multiSelect	: false ,
						editable	: false,
						readOnly	: true,
						hidden		: true,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 85,
						margin		: '0 0 0 0',
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
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
							clearInterval(window.TimeInterval );
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},

});