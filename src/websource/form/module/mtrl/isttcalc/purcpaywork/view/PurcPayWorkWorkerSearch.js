Ext.define('module.mtrl.isttcalc.purcpaywork.view.PurcPayWorkWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-purcpaywork-worker-search',
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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 ,  },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' , },
				items			: [
				{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
					items : [
						{	fieldLabel	: Language.get('','지급일자'),
							xtype		: 'datefield',
							name		: 'iomy_date',
							clearable	: true,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 50',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('','지급일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							clearable	: true,
							hidden		: true,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 50',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('','결제방법'),
							xtype		: 'lookupfield',
							name		: 'stot_dvcd',
							labelWidth	: 50,
							width		: 150,
							lookupValue	: resource.lookup('stot_dvcd'),
							editable	: false,
							margin		: '0 0 0 20',
						},{	fieldLabel	: Language.get('', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 20',
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
							margin		: '0 0 0 20',
							name		: 'total_amnt',
							value		: 0,
							width		: 190,
							labelWidth	: 50,
						}
					]
				}
			]
		};
		return line;
	},

});