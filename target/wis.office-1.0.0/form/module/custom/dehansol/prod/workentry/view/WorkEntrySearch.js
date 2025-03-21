Ext.define('module.custom.dehansol.prod.workentry.view.WorkEntrySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-dehansol-workentry-search',

	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dehansol/prod/workentry/get/wkctsearch.do',
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

		me.items =[ me.searchBasic(wkctLookup)];
		me.callParent();
	},

	searchBasic : function(wkctLookup){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,region	: 'center'
				,width	: '100%'
				,height	: 65
				,margin	: '20 40 0 10'
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,autoScroll: true
				,items	: [
					{	xtype: 'fieldset',
						layout: 'hbox',
						border	: 0,
						width	: 380,
						heigt	: 50,
						items: [
							{	fieldLabel	: Language.get('work_date', '작업일자'),
								xtype		: 'datefield',
								name		: 'work_date',
								width		: 300,
								height		: 50,
								maxWidth	: 550,
								labelWidth	: 100,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								readOnly	: false,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								cls			: 'textTemp',
								trigger1Cls : _global.options.work_book_tema+'dateTrigger',
								style		: 'text-align:center',
								listeners	: {
									change:function(field,value,a){
										console.log(Ext.util.Cookies.get('wkct_idcd'));
										var lister		= Ext.ComponentQuery.query('module-dehansol-workentry-lister')[0],
										layout		= Ext.ComponentQuery.query('module-dehansol-workentry-layout')[0],
										mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
									;
									mask.show();

									lister.select({
										callback:function(records, operation, success) {
											if (success) {
												lister.getSelectionModel().select(0);
											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									},	Ext.merge({
											wkct_idcd : Ext.util.Cookies.get('wkct_idcd'),
											stor_id   : _global.stor_id,
											work_date : Ext.util.Format.date(value,'Ymd')
										})
									);
									mask.hide();
									}
								}
							}
						]
					},{	fieldLabel	: Language.get('wkct_name', '공정'),
						xtype		: 'lookupfield',
						name		: 'wkct_name',
						width		: 300,
						height		: 50,
						maxWidth	: 500,
						labelWidth	: 60,
						margin		: '0 40 0 0',
//						value		: Ext.util.Cookies.get('wkct_idcd'),
						lookupValue	: wkctLookup,
						multiSelect	: false ,
						editable	: false,
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',								// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',								// field에 클래스추가
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',										// lookup list에 클래스 추가
						},
						listeners : {
							render : function(field) {
								var lister		= Ext.ComponentQuery.query('module-dehansol-workentry-lister')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask }),
									value		= field.value
								;
								mask.show();

								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { }
									}, scope:me
								},	Ext.merge({ wkct_idcd : value,
												stor_id   : _global.stor_id,
												work_date : work_date
									})
								);
								mask.hide();
							},
							change:function(field,value,a){
								var lister		= Ext.ComponentQuery.query('module-dehansol-workentry-lister')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									layout		= Ext.ComponentQuery.query('module-dehansol-workentry-layout')[0],
									mask		= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
								;
								mask.show();

								lister.select({
									callback:function(records, operation, success) {
										if (success) {
											lister.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								},	Ext.merge({
										wkct_idcd : value,
										stor_id  : _global.stor_id,
										work_date:work_date
									})
								);
								mask.hide();

								Ext.util.Cookies.set('wkct_idcd', value);
							}
						}
					},{	buttonAlign	: 'right',
						text		: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
						xtype		: 'button',
						width		: 165,
						height		: 46,
						margin		: '0 0 0 0',
						cls			: 'button-right btn btn-danger',
						style		: 'text-decoration:none;',
						handler		:function(){
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