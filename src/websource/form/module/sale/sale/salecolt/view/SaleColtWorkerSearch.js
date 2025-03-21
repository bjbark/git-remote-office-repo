Ext.define('module.sale.sale.salecolt.view.SaleColtWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-salecolt-worker-search',
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
						{	xtype : 'fieldset', layout: 'vbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('', '수금일자' ),
									name		: 'iomy_date',
									xtype		: 'datefield',
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get('', '' ),
									name		: 'invc_date',
									xtype		: 'datefield',
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									hidden		: true,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get('', '지급은행명' ),
									xtype		: 'textfield',
									name		: 'paym_bank_name',
								},{	fieldLabel	: Language.get('', '계좌번호 등' ),
									xtype		: 'textfield',
									name		: 'stot_bass',
								}
							]
						},{	xtype : 'fieldset', layout: 'vbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('', '결제구분' ),
									name		: 'stot_dvcd',
									xtype		: 'lookupfield',
									width		: 180,
									lookupValue	: resource.lookup('stot_dvcd')
								},{	fieldLabel	: Language.get('', '발행일자' ),
									name		: 'publ_date',
									xtype		: 'datefield',
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								},{	fieldLabel	: Language.get('drtr_name', '수금담당' ),
									name		: 'drtr_name',
									pair		: 'drtr_idcd',
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									width		: 180,
									clearable	: false ,
									popup		: {
										widget	: 'lookup-user-popup',
										select	: 'SINGLE',
										params	: { stor_grp : _global.stor_grp, line_stat : '0' },
										result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
								}
							]
						},{	xtype : 'fieldset', layout: 'vbox', border : 0,
							items : [
								{	fieldLabel	: Language.get('', '수금액' ),
									name		: 'total_amnt',
									xtype		: 'numericfield',
									width		: 200,
									fieldCls	: 'requiredindex',
									emptyText	: Const.invalid.emptyValue,
									allowBlank	: false,
								},{	fieldLabel	: Language.get('', '만기일자' ),
									name		: 'expr_date',
									xtype		: 'datefield',
									width		: 180,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
								}
							]
						}
					]
				}
				]
			};
		return line;
	}
});