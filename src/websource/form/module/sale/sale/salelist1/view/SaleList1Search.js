Ext.define('module.sale.sale.salelist1.view.SaleList1Search.js', { extend: 'Axt.form.Search',
	alias: 'widget.module-salelist1-search',

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
							emptyText		: '조회할 제품코드 또는 제품명을 입력하세요...',
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
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '0 0 0 -18',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','조회기간'),
											xtype		: 'betweenfield',
											name		: 'invc1_date',
											pair		: 'invc2_date',
											labelWidth	: 99,
											width		: 198,
											margin		: '0 0 0 0',
											root		: true,
											value		: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
											listeners : {
												change : function(value){
													var val  = value.getValue()
													;
													if(val == '' || val == null){
														value.setValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
													}
												}
											}
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc2_date',
											pair		: 'invc1_date',
											labelWidth	: 15,
											width		: 115,
											value		: new Date(),
											listeners : {
												change : function(value){
													var val  = value.getValue(),
														date = new Date()
													;
													if(val == '' || val == null){
														value.setValue(date);
													}
												}
											}
										},{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','누계']],
											multiSelect	: true ,
											editable	: false,
											labelWidth	: 60,
											width		: 230,
											margin		: '0 0 0 0',
										}
									]
								}
							]
						},{	xtype : 'fieldset',
							layout: 'hbox',
							border: 0,
							margin: '5 0 0 0',
							items : [
							{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								name		: 'cstm_name',
								labelWidth	: 90,
								width		: 305,
								pair		: 'cstm_idcd',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
										me.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));
									}
								},
								listeners : {
									change : function(){
										var val = this.getValue();
										if(val == '' || val == null){
											me.down('[name=cstm_idcd]').setValue('');
											me.down('[name=cstm_code]').setValue('');
										}
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	name : 'cstm_code', xtype : 'textfield' , hidden : true
							},{	xtype		: 'popupfield',
								fieldLabel	:'~',
								name		: 'cstm_name2',
								pair		: 'cstm_idcd2',
								labelWidth	: 15,
								width		: 230,
								value		: '',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
										me.down('[name=cstm_code2]').setValue(records[0].get('cstm_code'));
									}
								},
								listeners : {
									change : function(){
										var val = this.getValue();
										if(val == '' || val == null){
											me.down('[name=cstm_idcd2]').setValue('');
											me.down('[name=cstm_code2]').setValue('');
										}
									}
								}
							},{	name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
							},{	name : 'cstm_code2', xtype : 'textfield' , hidden : true
							},{	xtype		: 'checkbox',
								boxLabel	: '명세서 기준',
								name		: 'optn_1',
								margin: '0 0 0 20',
								checked		: true,
								style		: { color: 'Black'},
								listeners: {
									change: function(chkbox,newVal,oldVal){
										var a = me.down('[name=optn_2]').getValue();
										var b = me.down('[name=optn_3]').getValue();
										if(chkbox.getValue() == true && a == true){
											me.down('[name=optn_2]').setValue(false);
										}
										if(chkbox.getValue() == true && b==true){
											me.down('[name=optn_3]').setValue(false);
										}
										if(a == false && b == false){
											chkbox.setValue(true);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '청구서 기준',
								name		: 'optn_2',
								margin: '0 0 0 5',
								style		: { color: 'Black'},
								listeners: {
									change: function(chkbox,newVal,oldVal){
										var a = me.down('[name=optn_1]').getValue();
										var b = me.down('[name=optn_3]').getValue();
										if(chkbox.getValue() == true && a == true){
											me.down('[name=optn_1]').setValue(false);
										}
										if(chkbox.getValue() == true && b==true){
											me.down('[name=optn_3]').setValue(false);
										}
										if(a == false && b == false){
											chkbox.setValue(true);
										}
									}
								}
							},{	xtype		: 'checkbox',
								boxLabel	: '계산서 기준',
								name		: 'optn_3',
								margin: '0 0 0 5',
								style		: { color: 'Black'},
								listeners: {
									change: function(chkbox,newVal,oldVal){
										var a = me.down('[name=optn_2]').getValue();
										var b = me.down('[name=optn_1]').getValue();
										if(chkbox.getValue() == true && a == true){
											me.down('[name=optn_2]').setValue(false);
										}
										if(chkbox.getValue() == true && b==true){
											me.down('[name=optn_1]').setValue(false);
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
		};
		return line;
	},

});