Ext.define('module.custom.sjflv.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-purcpaywork-worker-search',
	style	: 'padding-left : 5px;' ,
	store		: 'module.custom.sjflv.mtrl.isttcalc.purcpaywork.store.PurcPayWorkWorkerLister',

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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 ,  },
				fieldDefaults	: { width : 280, labelWidth : 75, labelSeparator : '' , },
				items			: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0 ,
					items : [
						{	fieldLabel	: Language.get('','지급일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							clearable	: true,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 50',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('','결제방법'),
							xtype		: 'lookupfield',
							name		: 'stot_dvcd',
							labelWidth	: 85,
							width		: 190,
							lookupValue	: resource.lookup('stot_dvcd'),
							editable	: false,
							margin		: '0 0 0 40',
							listeners	: {
								beforeselect: function(self, value, index, eOpts ) {
									me.down('[name=stot_bass]').setValue(null);
									me.down('[name=paym_bank_name]').setValue(null);

									if (value.get('code') == "1" || value.get('code') == "3") {
										me.down('[name=paym_bank_name]').show();
										me.down('[name=stot_bass]').show();
										me.down('[name=publ_date]').hide();
										me.down('[name=expr_date]').hide();
									}else if (value.get('code') == "4"){
										me.down('[name=paym_bank_name]').show();
										me.down('[name=stot_bass]').show();
										me.down('[name=publ_date]').show();
										me.down('[name=expr_date]').show();
										me.down('[name=publ_date]').setValue(Ext.Date.add( new Date(), Ext.Date.DAY, +0));
										me.down('[name=expr_date]').setValue(Ext.Date.add( new Date(), Ext.Date.DAY, +0));
									}else{
										me.down('[name=paym_bank_name]').hide();
										me.down('[name=stot_bass]').hide();
										me.down('[name=publ_date]').hide();
										me.down('[name=expr_date]').hide();
									}
								}
							}
						},{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 40',
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', puch_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('','지급액'),
							xtype		: 'numericfield',
							margin		: '0 0 0 40',
							name		: 'total_amnt',
							value		: 0,
							width		: 190,
							labelWidth	: 50,
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('', '은행(발행인)명 등' ),
							xtype		: 'textfield',
							name		: 'paym_bank_name',
							hidden		: true,
							width		: 220,
							labelWidth	: 85,
							margin		: '0 0 0 15',
						},{	fieldLabel	: Language.get('', '계좌(어음)번호 등' ),
							xtype		: 'textfield',
							name		: 'stot_bass',
							width		: 380,
							labelWidth	: 85,
							margin		: '0 0 0 5',
							hidden		: true
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	fieldLabel	: Language.get('', '발행일자' ),
							name		: 'publ_date',
							xtype		: 'datefield',
							margin		: '0 0 0 15',
							labelWidth	: 85,
							width		: 180,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							hidden		: true
						},{	fieldLabel	: Language.get('', '만기일자' ),
							name		: 'expr_date',
							xtype		: 'datefield',
							width		: 180,
							labelWidth	: 85,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin		: '0 0 0 45',
							hidden		: true
						}
					]
				}
			]
		};
		return line;
	},

});