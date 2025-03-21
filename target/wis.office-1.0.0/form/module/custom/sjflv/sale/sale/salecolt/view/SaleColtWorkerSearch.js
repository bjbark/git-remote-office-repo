Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-salecolt-worker-search',
	style	: 'padding-left : 5px;' ,

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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 280, labelWidth : 75, labelSeparator : '' },
				items			: [
						{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('', '수금일자' ),
									name		: 'iomy_date',
									xtype		: 'datefield',
									width		: 175,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
									margin		: '0 0 0 16',
								},{	fieldLabel	: Language.get('', '' ),
									name		: 'invc_date',
									xtype		: 'datefield',
									width		: 175,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									hidden		: true,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get('', '결제구분' ),
									name		: 'stot_dvcd',
									xtype		: 'lookupfield',
									labelWidth	: 85,
									width		: 190,
									lookupValue	: resource.lookup('stot_dvcd'),
									listeners	: {
										beforeselect: function(self, value, index, eOpts ) {
											me.down('[name=stot_bass]').setValue(null);
											me.down('[name=paym_bank_name]').setValue(null);
											me.down('[name=paym_bank_name2]').setValue(null);

											if (value.get('code') == "1" || value.get('code') == "3") {
												me.down('[name=paym_bank_name]').hide();
												me.down('[name=paym_bank_name2]').show();
												me.down('[name=stot_bass]').show();
												me.down('[name=publ_date]').hide();
												me.down('[name=expr_date]').hide();
											}else if (value.get('code') == "4"){
												me.down('[name=paym_bank_name]').show();
												me.down('[name=paym_bank_name2]').hide();
												me.down('[name=stot_bass]').show();
												me.down('[name=publ_date]').show();
												me.down('[name=expr_date]').show();
												me.down('[name=publ_date]').setValue(Ext.Date.add( new Date(), Ext.Date.DAY, +0));
												me.down('[name=expr_date]').setValue(Ext.Date.add( new Date(), Ext.Date.DAY, +0));
											}else{
												me.down('[name=paym_bank_name]').hide();
												me.down('[name=paym_bank_name2]').hide();
												me.down('[name=stot_bass]').hide();
												me.down('[name=publ_date]').hide();
												me.down('[name=expr_date]').hide();
											}
										}
									},
									margin		: '0 0 0 39',
								},{	fieldLabel	: Language.get('drtr_name', '수금담당' ),
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									labelWidth	: 50,
									width		: 150,
									clearable	: false ,
									popup		: {
										widget	: 'lookup-user-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									},
									margin		: '0 0 0 60',
								},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox',
							items : [
								{	fieldLabel	: Language.get('', '은행명' ),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									clearable	: false ,
									name		: 'paym_bank_name2',
									pair		: 'paym_bank_name2',
									margin		: '0 0 0 15',
									width		: 209,
									hidden		: true,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-base-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '2001'},
										result : function(records, nameField, pairField) {
											var panel1 = nameField.up('form');
											panel1.down('[name=stot_bass]').setValue(records[0].get('user_memo'));
											panel1.down('[name=paym_bank_name]').setValue(records[0].get('base_name'));
//											nameField.setValue(records[0].get('base_name'));
											pairField.setValue(records[0].get('base_name'));
										}
									}
								},{	name : 'paym_bank_name2', xtype : 'textfield' , hidden : true,
								},{	fieldLabel	: Language.get('', '은행(발행인)명 등' ),
									xtype		: 'textfield',
									name		: 'paym_bank_name',
									hidden		: true,
									width		: 220,
									labelWidth	: 85,
									margin		: '0 0 0 5',
								},{	fieldLabel	: Language.get('', '계좌(어음)번호 등' ),
									xtype		: 'textfield',
									name		: 'stot_bass',
									labelWidth	: 85,
									width		: 400,
									margin		: '0 0 0 5',
									hidden		: true
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('', '발행일자' ),
									name		: 'publ_date',
									xtype		: 'datefield',
									labelWidth	: 85,
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
//									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
									hidden		: true,
									margin		: '0 0 0 5',
								},{	fieldLabel	: Language.get('', '만기일자' ),
									name		: 'expr_date',
									xtype		: 'datefield',
									labelWidth	: 85,
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
//									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
									margin		: '0 0 0 45',
									hidden		: true
								}
							]
						}
					]
			};
		return line;
	}
});