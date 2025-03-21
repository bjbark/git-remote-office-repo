Ext.define('module.sale.sale.bondinit.view.BondInitSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-bondinit-search',

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
						},{	fieldLabel	: Language.get('','이월년월'),
							xtype		: 'monthfield',
							name		: 'trns_yymm',
							submitFormat: 'Ym',
							format		: 'Y-m',
							labelWidth	: 50,
							width		: 150,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							margin		: '3 10 0 0',
							value		: new Date(new Date().getFullYear(),new Date().getMonth())
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
				{	xtype		: 'fieldset',
					title		: '상세검색',
					collapsible	: true,
					collapsed	: false,
					layout		: 'vbox',
					defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '0 0 0 ', padding:'0', border: 0 },
					items		: [
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
										margin: '0 0 5 0',
										items : [
											{	fieldLabel	: Language.get('cstm_name','거래처'),
												xtype		: 'popupfield',
												name		: 'cstm_name',
												pair		: 'cstm_idcd',
												clearable	: true,
												editable	: true,
												enableKeyEvents : true,
												labelWidth	: 99,
												width		: 315,
												popup: {
													select : 'SINGLE',
													widget : 'lookup-cstm-popup',
													params : { stor_grp : _global.stor_grp , line_stat : '0',  sale_cstm_yorn : '1'},
													result : function(records, nameField, pairField) {
														nameField.setValue(records[0].get('cstm_name'));
														pairField.setValue(records[0].get('cstm_idcd'));
													}
												}
											},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
											},
								{	xtype		: 'checkbox',
									boxLabel	: '이월 잔액만 표시',
									name		: 'optn_1',
									margin: '0 0 0 50',
									style		: { color: 'Black'},
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