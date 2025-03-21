Ext.define('module.custom.iypkg.stock.isos.isttwork3.view.IsttWork3WorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-isttwork3-worker-search',
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
						{	fieldLabel	: Language.get('', '입고처' ),
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 255,
							labelWidth	: 50,
							margin		: '0 0 0 10',
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							hidden		: true,
							popup		: {
								widget	: 'lookup-cstm-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0', puch_cstm_yorn : '1' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true
						},{	fieldLabel	: Language.get('','입고일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							clearable	: true,
							width		: 150,
							labelWidth	: 50,
							margin		: '0 0 0 10',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						}
					]
				}
			]
		};
		return line;
	},

});