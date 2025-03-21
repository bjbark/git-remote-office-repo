Ext.define('module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-goodsstocklist-search',

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
							emptyText		: '조회할 제품명을 입력하세요...',
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
					defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
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
													name		: 'fr_dt',
													pair		: 'to_dt',
													value		: Ext.Date.getFirstDateOfMonth(new Date()),
													labelWidth	: 99,
													width		: 198,
													margin		: '0 0 0 0',
													root		: true,
												},{	xtype		: 'betweenfield',
													fieldLabel	:'~',
													name		: 'to_dt',
													pair		: 'fr_dt',
													labelWidth	: 15,
													width		: 115,
												},{	fieldLabel	: Language.get('cstm','거래처'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													margin		: '0 0 0 10',
													name		: 'cstm_name',
													pair		: 'cstm_idcd',
													width		: 215,
													labelWidth	:  50,
													clearable	: true,
													popup		:
														{	select	: 'SINGLE',
															widget	: 'lookup-cstm-popup',
															params	: { stor_grp : _global.stor_grp , line_stat : '0' },
															result	: function(records, nameField, pairField) {
																nameField.setValue(records[0].get('cstm_name'));
																pairField.setValue(records[0].get('cstm_idcd'));
															}
														}
													},{ name : 'cstm_idcd', xtype : 'textfield' , hidden : true
												},{	fieldLabel	: Language.get('','~'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													name		: 'cstm_name2',
													pair		: 'cstm_idcd2',
													width		: 175,
													labelWidth	:  10,
													clearable	: true,
													popup		:
														{	select	: 'SINGLE',
															widget	: 'lookup-cstm-popup',
															params	: { stor_grp : _global.stor_grp , line_stat : '0' },
															result	: function(records, nameField, pairField) {
																nameField.setValue(records[0].get('cstm_name'));
																pairField.setValue(records[0].get('cstm_idcd'));
															}
														}
													},{ name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
												},{	fieldLabel	: Language.get('','합계구분'),
													xtype		: 'lookupfield',
													name		: 'chk',
													lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
													multiSelect	: true ,
													editable	: false,
													labelWidth	: 70,
													width		: 220,
													margin		: '0 60 0 0',
												}
											]
										},{	xtype : 'fieldset',
											layout: 'hbox',
											border: 0,
											margin: '5 0 0 40',
											items : [
												{	fieldLabel	: Language.get('','P/O No'),
													xtype		: 'textfield',
													name		: '',
													labelWidth	: 59,
													width		: 273,
													margin		: '0 0 0 0',
													root		: true,
													value		: ''
												},{	fieldLabel	: Language.get('item','품목'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													margin		: '0 0 0 10',
													name		: 'item_name',
													pair		: 'item_idcd',
													width		: 215,
													labelWidth	:  50,
													clearable	: true,
													popup		:
														{	select	: 'SINGLE',
															widget	: 'lookup-item-popup',
															params	: { stor_grp : _global.stor_grp , line_stat : '0' },
															result	: function(records, nameField, pairField) {
																nameField.setValue(records[0].get('item_name'));
																pairField.setValue(records[0].get('item_idcd'));
															}
														}
													},{ name : 'item_idcd', xtype : 'textfield' , hidden : true
												},{	fieldLabel	: Language.get('','~'),
													xtype		: 'popupfield',
													editable	: true,
													enableKeyEvents : true,
													name		: 'item_name2',
													pair		: 'item_idcd2',
													width		: 175,
													labelWidth	:  10,
													clearable	: true,
													popup		:
														{	select	: 'SINGLE',
															widget	: 'lookup-item-popup',
															params	: { stor_grp : _global.stor_grp , line_stat : '0' },
															result	: function(records, nameField, pairField) {
																nameField.setValue(records[0].get('item_name'));
																pairField.setValue(records[0].get('item_idcd'));
															}
														}
													},{ name : 'item_idcd2', xtype : 'textfield' , hidden : true
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