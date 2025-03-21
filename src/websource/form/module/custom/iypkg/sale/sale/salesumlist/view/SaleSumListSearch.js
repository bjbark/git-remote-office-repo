Ext.define('module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-salesumlist-search',

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
					defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
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
							emptyText		: '조회할 품목코드 또는 품명을 입력하세요...',
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
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox',
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 11 0 0',
							items	: [
							{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
								items : [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 11 5 0',
										items	: [
											{	fieldLabel	: Language.get('','조회기간'),
												xtype		: 'betweenfield',
												name		: 'invc_date1',
												pair		: 'invc_date2',
												labelWidth	: 70,
												width		: 165,
												margin		: '0 0 0 2',
												root		: true,
												value		: Ext.Date.getFirstDateOfMonth(new Date())
											},{	xtype		: 'betweenfield',
												fieldLabel	:'~',
												name		: 'invc_date2',
												pair		: 'invc_date1',
												labelWidth	: 13,
												width		: 108,
												value		: new Date
											},{	fieldLabel	: Language.get('','합계구분'),
												xtype		: 'lookupfield',
												name		: 'chk',
												lookupValue	: [['1','소계'],['2','합계']],
												multiSelect	: true ,
												editable	: false,
												labelWidth	: 91,
												width		: 230,
											}
										]
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0', fieldDefaults: { width : 561, labelWidth : 70 },
										items	: [
											{	fieldLabel	: Language.get('','품목'),
												xtype		: 'popupfield',
												name		: 'prod_name',
												pair		: 'prod_idcd',
												labelWidth	: 72,
												width		: 275,
												clearable	: true,
												popup: {
													select : 'SINGLE',
													widget : 'lookup-prod-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0' },
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('prod_name'));
														pairField.setValue(records[0].get('prod_idcd'));
														me.down('[name=prod_code]').setValue(records[0].get('prod_code'));
													}
												},
												listeners : {
													change : function(value){
														var val = this.getValue();
														if(val == '' || val == null){
															me.down('[name=prod_idcd]').setValue('');
															me.down('[name=prod_code]').setValue('');
														}
													}
												}
											},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
											},{	name : 'prod_code', xtype : 'textfield' , hidden : true
											},{	fieldLabel	: Language.get('','~'),
												xtype		: 'popupfield',
												name		: 'prod_name2',
												pair		: 'prod_idcd2',
												labelWidth	: 15,
												width		: 232,
												clearable	: true,
												popup: {
													select : 'SINGLE',
													widget : 'lookup-prod-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0' },
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('prod_name'));
														pairField.setValue(records[0].get('prod_idcd'));
														me.down('[name=prod_code2]').setValue(records[0].get('prod_code'));
													}
												},
												listeners : {
													change : function(value){
														var val = this.getValue();
														if(val == '' || val == null){
															me.down('[name=prod_idcd2]').setValue('');
															me.down('[name=prod_code2]').setValue('');
														}
													}
												}
											},{	name : 'prod_idcd2', xtype : 'textfield' , hidden : true
											},{	name : 'prod_code2', xtype : 'textfield' , hidden : true
											}
										]
									}
								]
							},{	xtype : 'fieldset',
								layout: 'vbox',
								border: 0,
								margin: '30 0 0 0',
								height: 30,
								items : [
									{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
										items		: [
											{	xtype	: 'checkboxfield',
												allowBlank: true,
												name : 'ck1',
												boxLabel: '명세서 기준' ,
												value	: true,
												margin : '10 0 0 10',
												width : 100 ,
												inputValue: 1,
												listeners: {
													change: function(chkbox,newVal,oldVal) {
														var a = me.down('[name=ck2]').getValue();
														var b = me.down('[name=ck3]').getValue();
														if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
															me.down('[name=ck2]').setValue(false);
															me.down('[name=ck3]').setValue(false);
														}
														if(a == false && b == false){
															chkbox.setValue(true);
														}
													}
												}
											},{	xtype	: 'checkboxfield',
												allowBlank: true,
												name : 'ck2',
												boxLabel: '청구서 기준' ,
												margin : '10 0 0 0',
												width : 75 ,
												inputValue: 1,
												listeners: {
													change: function(chkbox,newVal,oldVal) {
														var a = me.down('[name=ck1]').getValue();
														var b = me.down('[name=ck3]').getValue();
														if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
															me.down('[name=ck1]').setValue(false);
															me.down('[name=ck3]').setValue(false);
														}
														if(a == false && b == false){
															chkbox.setValue(true);
														}
													}
												}
											},{	xtype	: 'checkboxfield',
												allowBlank: true,
												name : 'ck3',
												boxLabel: '계산서 기준' ,
												margin : '10 0 0 20',
												width : 100 ,
												inputValue: 1,
												listeners: {
													change: function(chkbox,newVal,oldVal) {
														var a = me.down('[name=ck1]').getValue();
														var b = me.down('[name=ck2]').getValue();
														if((chkbox.getValue() == true && a == true) || (chkbox.getValue() == true && b == true)){
															me.down('[name=ck1]').setValue(false);
															me.down('[name=ck2]').setValue(false);
														}
														if(a == false && b == false){
															chkbox.setValue(true);
														}
													}
												}
											}
										]
									}
								]
							}
						]
					}
				]
			};
		return line;
	},

});