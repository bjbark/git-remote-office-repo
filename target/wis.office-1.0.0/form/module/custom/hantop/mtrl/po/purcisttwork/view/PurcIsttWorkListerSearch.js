Ext.define('module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkListerSearch',{ extend: 'Axt.form.Search',

	alias: 'widget.module-purcisttwork-lister-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	name		: 'barcode_pono',
								fieldCls	: 'textTemp field-c-25',
								xtype		: 'searchfield'	,
								width		: 500,
								emptyText	: '거래명세표의 바코드를 스캔하세요...',
								enableKeyEvents : true			,
								margin		: '0 0 0 95',
								hidden		: true,
								height		: 40,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction2]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
							items : [
								{	fieldLabel	: Language.get('offr_numb','발주번호'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'invc_numb',
									width		: 300,
									labelWidth	: 90,
									pair		: 'invc_numb1',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-purcordr-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : '자재'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('invc_numb'));
											pairField.setValue(records[0].get('invc_numb'));
										}
									}
								},{	name : 'invc_numb1', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('cstm','거래처'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'cstm_name',
									width		: 300,
									labelWidth	: 90,
									pair		: 'cstm_idcd',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0'},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('item','품목'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'item_name',
									width		: 315,
									labelWidth	: 80,
									pair		: 'item_idcd',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-item-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd	: '자재' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('item_name'));
											pairField.setValue(records[0].get('item_idcd'));
										}
									}
								},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
								}
							]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								width		: 190,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 110,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('offr_date','발주일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 183,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 118,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('offr_dvcd','발주구분'),
								xtype		: 'lookupfield',
								name		: 'offr_dvcd',
								lookupValue	: resource.lookup('offr_dvcd'),
								value		: '1100',
								width		: 315,
								labelWidth	: 80
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 85',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('invc_date', '입고일자' ),
								name		: 'invc_date',
								xtype		: 'datefield',
								width		: 190,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
							},{ fieldLabel	: '창고',
								xtype		: 'popupfield',
								name		: 'wrhs_name',
								pair		: 'wrhs_idcd',
								margin		: '0 0 0 110',
								fieldCls	: 'requiredindex',
								allowBlank	: false,
								emptyText	: Const.invalid.emptyValue,
								clearable	: true,
								width		: 240,
								labelWidth	: 90,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wrhs-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										console.log(records);
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							}
						]
					}
				]
			};
		return line;
	}
});