Ext.define('module.stock.lot.lotchange.view.LotChangeSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-lotchange-search',

	initComponent: function() {
		var me = this;
		me.items = [ me.searchBasic(),me.createLine1()];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line =
				{	xtype	: 'fieldset',
					border	: 0,
					style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
					region	: 'center',
					width	: '100%',
					height	: 40,
					margin	: '0 40 0 40',
					items	:[
						{	xtype		: 'fieldset',
							border		: 3,
							flex		: 1,
							style		: { borderColor : '#000081', borderStyle : 'solid' },
							region		: 'center',
							height		: 34,
							margin		: '3 0 0 0',
							defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
							layout		: 'hbox',
							items		: [
								{	xtype		: 'label',
									fieldCls	: 'requiredindex',
									text		: 'SEARCH  | ',
									margin		: '5 10 0 0',
									style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name		: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 품목코드 또는 품명을 입력하세요...',
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
											}
										},
									}
								}
							]
						},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',border : 0 ,region : 'north',height : 34, width : 2
						}
					]
				};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line =
			{
				xtype		: 'fieldset',
				collapsible	: true,
				collapsed	: false,
				title		: '상세검색',
				layout		: 'vbox',
				defaults	: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items : [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('istt_date','수불일자'),
								xtype		: 'datefield',
								name		: 'istt_date',
								width		: 240,
								labelWidth	: 100,
								value		: '',
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								clearable	: true,
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? true : false,
							},{	fieldLabel	: Language.get('isos_date','조회기간'),
								xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								value		: Ext.Date.getFirstDateOfMonth(new Date),
								labelWidth	: 99,
								width		: 198,
								root		: true,
								margin		: '0 0 0 2',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							},{
								xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: new Date(),
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								clearable	: true,
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true,
							},{	fieldLabel	: Language.get('wrhs','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								width		: 150,
								labelWidth	: 25,
								clearable	: true,
								pair		: 'wrhs_idcd',
								margin		: '0 0 0 30',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhswkct-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
	 								}
								}
							},{ name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('acct_bacd','계정구분'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'acct_bacd_name',
								pair		: 'acct_bacd',
								width		: 251,
								margin		: '0 2 0 0',
								labelWidth	: 80,
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'acct_bacd', xtype : 'textfield' , hidden : true,
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? 465 : 393,
								labelWidth	: 72,
								name		: 'item_name',
								pair		: 'item_idcd',
								margin		: '0 0 0 28',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								},
								listeners	: {
									change	: function (){
										var val = this.getValue();
										if(val == '' || val == null ){
											me.down('[name=item_idcd]').reset();
										}
									}
								}
							},{ name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('lott_numb','LOT번호'),
								xtype		: 'textfield',
								name		: 'lott_numb',
								width		: 250,
								clearable	: true,
								labelWidth	:  80,
								margin		: '0 0 0 0'
							}
						]
					}
				]
		};
		return line;
	}
});