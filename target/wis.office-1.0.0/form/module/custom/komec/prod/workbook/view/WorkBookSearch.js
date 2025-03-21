Ext.define('module.custom.komec.prod.workbook.view.WorkBookSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-komec-workbook-search',

	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		var wkctLookup = new Array();


		me.items =[ me.searchBasic()];
		me.callParent();
	},
	listeners :{
		afterrender : function(){
			var lister = Ext.ComponentQuery.query('module-komec-workbook-detail')[0];
			lister.select({
				callback:function(records, operation, success) {
					if (success) {

					} else { }
				}, scope:lister
			}, Ext.merge({	work_date      : Ext.Date.format(new Date(),'Ymd'),
			}));
		}
	},

	searchBasic : function(){
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
					},{	fieldLabel	: '지시번호',
						xtype		: 'textfield',
						name		: 'invc_numb',
						width		: 300,
						labelWidth	: 100,
						height		: 45,
						hidden		: true,
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
									//TODO grid select 후 해당하는 button 클릭을 fireEvent로 실행하면 될듯.

									self.setValue('');
								}
							},
						},
					},{	xtype		: 'button',
						text		: '<span class="btnTemp" style="font-size:25px;">새로고침</span>',
						cls			: 'button-center btn btn-warning',
						width		: 170,
						height		: 46,
						margin		: '0 40 0 100',
						action		: 'refreshAction'
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