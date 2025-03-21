Ext.define('module.prod.order.workbookv5.view.WorkBookV5Search', { extend: 'Axt.form.Search',

	alias: 'widget.module-workbookv5-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
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
				console.log(result);
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
						trigger1Cls : _global.options.work_book_tema +'trigger',											// trigger(버튼)에 클래스 추가
						width		: 240,
						multiSelect	: false ,
						editable	: false,
						lookupValue	: wkctLookup,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 60,
//						value		: Ext.util.Cookies.get('wkct_idcd'),
						margin		: '0 40 0 0',
						listConfig	:{
							itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가

						},
						listeners : {
							render : function(feild) {
								var lister		= Ext.ComponentQuery.query('module-workbookv5-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workbookv5-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workbookv5-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
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
												work_date :work_date }));
								detail.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( { wkct_idcd : value,
												stor_id   : _global.stor_id,
												work_date :work_date }));
								detail2.select({
									callback:function(records, operation, success) {
										if (success) {
											detail.getSelectionModel().select(0);
										} else { me.pocket.editor().getForm().reset(true);}
									}, scope:me
								}, Ext.merge( { wkct_idcd : value,
												stor_id : _global.stor_id,
												work_date :work_date}));
								mask.hide();
							},
							change:function(feild,value,a){
								var lister		= Ext.ComponentQuery.query('module-workbookv5-lister')[0],
									detail		= Ext.ComponentQuery.query('module-workbookv5-detail')[0],
									detail2		= Ext.ComponentQuery.query('module-workbookv5-detail2')[0],
									work_date	= Ext.util.Format.date(me.down('[name=work_date]').getValue(), "Ymd"),
									layout		= Ext.ComponentQuery.query('module-workbookv5-layout')[0],
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
									}, Ext.merge({ wkct_idcd : value,
													stor_id  : _global.stor_id,
													work_date:work_date }));
									detail.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									}, Ext.merge({ wkct_idcd : value,
													stor_id  : _global.stor_id,
													work_date:work_date }));
								}else if(tindex == 1){
									detail2.select({
										callback:function(records, operation, success) {
											if (success) {
												detail.getSelectionModel().select(0);
											} else { me.pocket.editor().getForm().reset(true);}
										}, scope:me
									}, Ext.merge({ wkct_idcd : value,
													stor_id  : _global.stor_id
									}) );
								}
								mask.hide();

								Ext.util.Cookies.set('wkct_idcd', value);
							}
						}
					},{	fieldLabel	: Language.get('', '회전수'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'numericfield',
						name		: 'shot',
						width		: 190,
						readOnly	: true,
						hidden		: false,
						height		: 45,
						maxWidth	: 500,
						labelWidth	: 90,
						value		: '1',
						listeners:{
							render:function(field){
								var count = 2;
								var cc = setInterval(function(){
									field.setValue(count++);
								}, 60000)
							}
						}
					},{	fieldLabel	: Language.get('poor_qntt_sum', '불량계'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'numericfield',
						name		: 'poor_qntt_sum',
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						width		: 190,
						multiSelect	: false ,
						editable	: false,
						hidden		: true,
						readOnly	: true,
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
							me.up('panel').close();
						}
					}
				]
			}
		;
		return line;
	},

});