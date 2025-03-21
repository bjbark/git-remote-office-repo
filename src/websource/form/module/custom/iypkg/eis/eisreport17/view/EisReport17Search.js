Ext.define('module.custom.iypkg.eis.eisreport17.view.EisReport17Search', { extend: 'Axt.form.Search',
	alias: 'widget.module-eisreport17-search',

	initComponent: function(){
		var me = this;
		me.items =  [
			me.searchBasic(),
			me.createLine1(),
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
		line = {
			xtype	: 'fieldset',
			border	: 0,
			style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
			region	: 'center',
			width	: '100%',
			height	: 40,
			margin	: '0 40 0 40',
			items	: [
				{	xtype		: 'fieldset',
					border		: 3,
					flex		: 1,
					style		: { borderColor	: '#000081', borderStyle	: 'solid' },
					region		: 'center',
					height		: 34,
					margin 	: '3 0 0 0',
					defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '0 10  0', padding:'0', border: 0 },
					layout		: 'hbox',
					items		:[
						{	xtype	: 'label',
							fieldCls: 'requiredindex',
							text	: 'SEARCH  | ',
							margin	: '5 10 0 0',
							style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
						},{ name	: 'find_name',
							xtype	: 'searchfield',
							flex	: 4,
							emptyText		: '조회할 거래처코드 또는 거래처명을 입력하세요...',
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == 9) {
										var searchButton = self.up('form').down('[action=selectAction]');
										searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
									}
								},
							}
						}
					]
				},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
					style	: 'background:url("../../../resource/img/btn_search_icon.png")'
				},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
				}
			]
		};
	return line;
	},

	createLine1 : function(){
		var	me	= this,
			line =
				{	xtype      : 'fieldset',
					title      : '상세검색',
					collapsible: true,
					collapsed  : false,
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,
							items : [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 11 0 0',
								items	: [
									{	fieldLabel	: Language.get('','기간'),
										xtype		: 'betweenfield',
										name		: 'invc1_date',
										pair		: 'invc2_date',
										labelWidth	: 80,
										width		: 180,
										margin		: '0 0 0 0',
										root		: true,
										value		: new Date(new Date().getFullYear(),new Date().getMonth(), 1),
									},{	xtype		: 'betweenfield',
										fieldLabel	:'~',
										name		: 'invc2_date',
										pair		: 'invc1_date',
										labelWidth	: 15,
										width		: 115,
										value		: new Date(),
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
										items		: [
											{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
												items		: [
													{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 100',
														items		: [
															{	xtype	: 'checkboxfield',
																labelSeparator: '',
																allowBlank: true,
																boxLabel: '명세서 기준' ,
																name : 'pric_burd_dvcd1',
																margin : '0 0 -5 0',
																inputValue: 1,
																value	: 1,
																width : 110 ,
																listeners: {
																	change: function(chkbox,newVal,oldVal) {
																		var a = me.down('[name=pric_burd_dvcd2]').getValue();
																		var b = me.down('[name=pric_burd_dvcd3]').getValue();
																		if(chkbox.getValue() == true && a == true){
																			me.down('[name=pric_burd_dvcd2]').setValue(false);
																		}
																		if(chkbox.getValue() == true && b == true){
																			me.down('[name=pric_burd_dvcd3]').setValue(false);
																		}
																		if(a == false && b == false){
																			this.setValue(true);
																		}
																	}
																}
															},{	xtype	: 'checkboxfield',
																labelSeparator: '',
																allowBlank: true,
																boxLabel: '청구서 기준',
																margin : '0 0 -5 0',
																name : 'pric_burd_dvcd2',
																inputValue: 2,
																width : 110 ,
																listeners: {
																	change: function(chkbox,newVal,oldVal) {
																		var b = me.down('[name=pric_burd_dvcd1]').getValue();
																		var a = me.down('[name=pric_burd_dvcd3]').getValue();
																		if(chkbox.getValue() == true && b == true){
																			me.down('[name=pric_burd_dvcd1]').setValue(false);
																		}
																		if(chkbox.getValue() == true && a == true){
																			me.down('[name=pric_burd_dvcd3]').setValue(false);
																		}
																		if(a == false && b == false){
																			this.setValue(true);
																		}
																	}
																}
															},{	xtype	: 'checkboxfield',
																labelSeparator: '',
																allowBlank: true,
																boxLabel: '계산서 기준',
																margin : '0 0 -5 0',
																name : 'pric_burd_dvcd3',
																inputValue: 2,
																width : 110 ,
																listeners: {
																	change: function(chkbox,newVal,oldVal) {
																		var b = me.down('[name=pric_burd_dvcd1]').getValue();
																		var a = me.down('[name=pric_burd_dvcd2]').getValue();
																		if(chkbox.getValue() == true && b == true){
																			me.down('[name=pric_burd_dvcd1]').setValue(false);
																		}
																		if(chkbox.getValue() == true && a == true){
																			me.down('[name=pric_burd_dvcd2]').setValue(false);
																		}
																		if(a == false && b == false){
																			this.setValue(true);
																		}
																	}
																}
															}
														]
													}
												]
											},
										]
									},
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
								items		: [
									{	fieldLabel	: Language.get('','원단수주'),
										xtype		: 'numericfield',
										name		: 'invc1_date',
										labelWidth	: 70,
										width		: 170,
										margin		: '0 0 0 10',
										root		: true,
										value		: 0,
									},{	fieldLabel	: Language.get('','COL수주'),
										xtype		: 'numericfield',
										name		: 'invc1_date',
										labelWidth	: 70,
										width		: 170,
										margin		: '0 0 0 0',
										root		: true,
										value		: 0,
									},{	fieldLabel	: Language.get('','C/T수주'),
										xtype		: 'numericfield',
										name		: 'invc1_date',
										labelWidth	: 70,
										width		: 170,
										margin		: '0 0 0 0',
										root		: true,
										value		: 0,
									},{	fieldLabel	: Language.get('','수주총액'),
										xtype		: 'numericfield',
										name		: 'invc1_date',
										labelWidth	: 70,
										width		: 170,
										margin		: '0 27 0 0',
										root		: true,
										value		: 0,
									}
								]
							},
						]
					}
				]
			};
		return line;
	},

});