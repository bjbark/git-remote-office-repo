Ext.define('module.custom.sjflv.stock.isos.etcisttwork.view.EtcIsttWorkRegiSearch',{ extend: 'Axt.form.Search',

	alias: 'widget.module-etcisttwork-regi-search',

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
							{	fieldLabel	: Language.get('item','품목'),
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
							},{	fieldLabel	: Language.get('','입고일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 183,
								labelWidth	: 90,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 118,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 65',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('istt_dvcd','입고구분'),
								hidden		: true,
								xtype		: 'lookupfield',
								name		: 'istt_dvcd',
								lookupValue	: resource.lookup('istt_dvcd'),
								value		: '1100',
								width		: 180,
								labelWidth	: 80,
								value		: '1300'
							},{	fieldLabel	: Language.get('','입고창고'),
								hidden		: true,
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
								hidden		: true
								//hidden		:_global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false
							}
						]
					}
				]
			};
		return line;
	}
});