Ext.define('module.prod.order.workbookv4.view.WorkBookV4Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbookv4-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var cvicLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv4/get/cvicsearch.do',
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
						cvicLookup.push([result.records[i].cvic_idcd,result.records[i].cvic_name]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		me.items =[ me.searchBasic(cvicLookup)];
		me.callParent();
	},
	searchBasic : function(cvicLookup){
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
								listeners	: {
									render	: function(){
										var here = this;
										window.today = setInterval(function(){
											here.setValue(new Date());
										}, 5000)
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('', '설비'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'lookupfield',
						name		: 'cvic_name',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 300,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: cvicLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
						value		: Ext.util.Cookies.get('cvic_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
							minHeight	: 1000
						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workbookv4-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workbookv4-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workbookv4-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= feild.value
								;
								mask.show();

								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { }
									}, scope:me
								}, Ext.merge({ cvic_idcd : value,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
											var	select = detail.getSelectionModel().getSelection()[0]
											;
											if(select){
												var	wkod_numb = detail.getStore().data.items[0].get('wkod_numb'),
													wkod_seqn = detail.getStore().data.items[0].get('wkod_seqn')
												;
												me.midSearch(wkod_numb,wkod_seqn);
												clearInterval(window.minInterval);
												window.minInterval = setInterval(function(){
													var	select = detail.getSelectionModel().getSelection()[0]
													;
													if(select){
														var	wkod_numb = detail.getStore().data.items[0].get('wkod_numb'),
															wkod_seqn = detail.getStore().data.items[0].get('wkod_seqn')
														;
														me.midSearch(wkod_numb,wkod_seqn);
													}
												},30000);
											}else{
												var mid = Ext.ComponentQuery.query('module-workbookv4-middlesearch')[0]
												;
												mid.getForm().reset(true);
											}
										} else { }
									}, scope:me
								}, Ext.merge( { cvic_idcd : value,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else {}
									}, scope:me
								}, Ext.merge( { cvic_idcd : value,
												stor_id : _global.stor_id,
												work_date :work_date}));
								mask.hide();
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-workbookv4-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workbookv4-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workbookv4-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									layout		= Ext.ComponentQuery.query('module-workbookv4-layout')[0],
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									tpanel		= layout.down('#mainpanel'),
									tindex = tpanel.items.indexOf(tpanel.getActiveTab())
								;

								mask.show();
								if(tindex == 0){
									lister.select({
										callback:function(records, operation, success) {
											if (success) {
												lister.getSelectionModel().select(0);
											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									}, Ext.merge({ cvic_idcd : value,
													stor_id  : _global.stor_id,
													work_date:work_date }));
									detail.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
												var	select = detail.getSelectionModel().getSelection()[0]
												;
												if(select){
													var	wkod_numb = detail.getStore().data.items[0].get('wkod_numb'),
														wkod_seqn = detail.getStore().data.items[0].get('wkod_seqn')
													;
													me.midSearch(wkod_numb,wkod_seqn);
													clearInterval(window.minInterval);
													window.minInterval = setInterval(function(){
														var	select = detail.getSelectionModel().getSelection()[0]
														;
														if(select){
															var	wkod_numb = detail.getStore().data.items[0].get('wkod_numb'),
																wkod_seqn = detail.getStore().data.items[0].get('wkod_seqn')
															;
															me.midSearch(wkod_numb,wkod_seqn);
														}
													},30000);
												}else{
													var mid = Ext.ComponentQuery.query('module-workbookv4-middlesearch')[0]
													;
													mid.getForm().reset(true);
												}
											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									}, Ext.merge({ cvic_idcd : value,
													stor_id  : _global.stor_id,
													work_date:work_date }));

								}else if(tindex == 1){
									detail2.select({
										callback:function(records, operation, success) {
											if (success) {
												detail2.getSelectionModel().select(0);

											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									}, Ext.merge({ cvic_idcd : value,
													stor_id  : _global.stor_id
									}) );
								}
								mask.hide();
								setTimeout(function(){
									var select		= lister.getSelectionModel().getSelection()[0];
									if(select){
										me.down('[name=remk_text]').setValue(select.get('remk_text'))
									}else{
										me.down('[name=remk_text]').setValue('');
									}
								},100)
								Ext.util.Cookies.set('cvic_idcd', value);
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
					},{	fieldLabel	: Language.get('remk_text', '비고'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'textfield',
						name		: 'remk_text',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						flex		: 1,
						readOnly	: true,
						height		: 45,
						labelWidth	: 85,
						fieldStyle		: 'text-align:left !important;',
						margin		: '0 10 0 0',
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
							clearInterval(window.today );
							clearInterval(window.today2 );
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},
	midSearch:function(invc_numb,line_seqn){
		var	me = this,
			mid = Ext.ComponentQuery.query('module-workbookv4-middlesearch')[0]
		;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/prod/order/workbookv4/get/midsearch.do',
			method		: "POST",
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp,
					invc_numb	: invc_numb,
					line_seqn	: line_seqn,
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					mid.down('[name=indn_qntt]').setValue(result.records[0].indn_qntt);
					mid.down('[name=runn_shot]').setValue(result.records[0].runn_shot);
					mid.down('[name=sum_qntt]').setValue(result.records[0].sum_qntt);
					mid.down('[name=deff_qntt]').setValue(result.records[0].deff_qntt);
					mid.down('[name=succ_pcnt]').setValue(((result.records[0].sum_qntt/result.records[0].indn_qntt)*100).toFixed(2));
				}else{
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
	}
});