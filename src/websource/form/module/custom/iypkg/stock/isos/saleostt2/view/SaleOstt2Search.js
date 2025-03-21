Ext.define('module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2Search.js', { extend: 'Axt.form.Search',
	alias: 'widget.module-saleostt2-search',

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
					collapsed  : true,
					name       : 'detailSelect',
					layout     : 'vbox',
					defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
					items : [
						{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '0 0 0 -18',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
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
											value		: Ext.Date.getFirstDateOfMonth(new Date()),
											listeners : {
												change : function(value){
													var val  = value.getValue()
													;
													if(val == '' || val == null){
														value.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
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
													var val  = value.getValue()
													;
													if(val == '' || val == null){
														value.setValue(new Date());
													}
												}
											}
										},{	xtype		: 'label',
											text		: '일반',
											name		: 'optn_3',
											width		: 44,
											style		: { color: 'black', backgroundColor : 'none', textAlign : 'center'},
											margin		: '5 0 0 10'
										},{	xtype		: 'label',
											text		: '계획',
											name		: 'optn_3',
											width		: 44,
											style		: { color: 'Green', backgroundColor : '#99ccff', textAlign : 'center'},
											margin		: '5 0 0 0'
										},{	xtype		: 'label',
											text		: '생산',
											name		: 'optn_3',
											width		: 44,
											style		: { color: 'black', backgroundColor : '#d9ffcc', textAlign : 'center'},
											margin		: '5 0 0 0'
										},{	xtype		: 'label',
											text		: '상품',
											name		: 'optn_3',
											width		: 44,
											style		: { color: 'black', backgroundColor : '#ffe6ff', textAlign : 'center'},
											margin		: '5 0 0 0'
										},{	xtype		: 'label',
											text		: '재고수주',
											name		: 'optn_3',
											width		: 50,
											style		: { color: 'black', backgroundColor : 'Yellow', textAlign : 'center'},
											margin		: '5 0 0 0'
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('item_code','품목코드'),
											xtype		: 'popupfield',
											name		: 'item_code',
											labelWidth	: 99,
											width		: 315,
											pair		: 'item_idcd',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-prod-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('prod_name'));
													pairField.setValue(records[0].get('prod_idcd'));
												}
											}
										},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
										}
//										,{	xtype		: 'popupfield',
//											fieldLabel	:'~',
//											name		: 'item_code2',
//											pair		: 'item_idcd2',
//											labelWidth	: 15,
//											width		: 232,
//											editable	: true,
//											enableKeyEvents : true,
//											clearable	: true,
//												popup: {
//													select : 'SINGLE',
//													widget : 'lookup-prod-popup',
//													params : { stor_grp : _global.stor_grp , line_stat : '0' },
//													result : function(records, nameField, pairField) {
//														nameField.setValue(records[0].get('prod_name'));
//														pairField.setValue(records[0].get('prod_idcd'));
//													}
//												}
//											},{	name : 'item_idcd2', xtype : 'textfield' , hidden : true
//										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('cstm_name','거래처'),
											xtype		: 'popupfield',
											name		: 'cstm_name',
											labelWidth	: 99,
											width		: 315,
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
												}
											}
										},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
										}
//										,{	name : 'cstm_code', xtype : 'textfield' , hidden : true
//										},{	xtype		: 'popupfield',
//											fieldLabel	:'~',
//											name		: 'cstm_name2',
//											pair		: 'cstm_idcd2',
//											labelWidth	: 15,
//											width		: 232,
//											value		: '',
//											editable	: true,
//											enableKeyEvents : true,
//											clearable	: true,
//											popup: {
//												select : 'SINGLE',
//												widget : 'lookup-cstm-popup',
//												params : { stor_grp : _global.stor_grp , line_stat : '0' },
//												result : function(records, nameField, pairField) {
//													nameField.setValue(records[0].get('cstm_name'));
//													pairField.setValue(records[0].get('cstm_idcd'));
//												}
//											}
//										},{	name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
//										},{	name : 'cstm_code2', xtype : 'textfield' , hidden : true
//										}
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