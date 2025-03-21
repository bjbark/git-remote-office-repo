Ext.define('module.mtrl.po.purcisttwork.view.PurcIsttWorkListerSearch',{ extend: 'Axt.form.Search',

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
								height		: 40,
								hidden		: (_global.options.mes_system_type !='Frame'? false:true),
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
									clearable	: true,
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
									clearable	: true,
									name		: 'cstm_name',
									width		: 300,
									labelWidth	: 90,
									pair		: 'cstm_idcd',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1'},
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
									clearable	: true,
									name		: 'item_name',
									width		: 344,
									labelWidth	: 80,
									pair		: 'item_idcd',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-item-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd : '삼정(구매발주)' },
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
								width		: 185,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 115,
								labelWidth	: 22,
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
								width		: 180,
								labelWidth	: 80
							},{	fieldLabel	: Language.get('','입고창고'),
								xtype		: 'popupfield',
								editable	: false,
								enableKeyEvents : true,
								clearable	: true,
								name		: 'wrhs_name',
								width		: 150,
								labelWidth	: 50,
								margin		: '2 0 0 15',
								pair		: 'istt_wrhs_idcd',
								allowBlank	: true,
								emptyText	: Const.invalid.emptyValue,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										var panel1 = nameField.up('form');
										panel1.down('[name=bzpl_idcd]').setValue(records[0].get('bzpl_idcd'));
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{	name : 'istt_wrhs_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','사업장'),
								xtype		: 'textfield',
								name		: 'bzpl_idcd',
								hidden		: true
							},{ fieldLabel	: '입고일자',
								xtype		: 'datefield',
								name		: 'invc_date',
								width		: 183,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								hidden		:_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 65',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					}
				]
			};
		return line;
	}
});