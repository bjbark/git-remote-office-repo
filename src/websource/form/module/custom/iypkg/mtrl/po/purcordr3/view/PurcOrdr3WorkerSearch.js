Ext.define('module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerSearch',{ extend: 'Axt.form.Search',
	store	: 'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerInvoice',
	alias	: 'widget.module-purcordr3-worker-search',
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
				xtype		: 'fieldset' ,
				dock		: 'left',
				border		: 0,
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 40 , margin : '5 5 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0,
						items : [
							{	fieldLabel	: Language.get('cstm_name','발주처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								width		: 207,
								name		: 'cstm_name',
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
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
						},{	fieldLabel	: Language.get('offr_date', '발주일자' ),
							name		: 'offr_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('drtr_name', '발주 담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: false ,
							width		: 190,
							labelWidth	: 75,
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
				}
			]
			};
	return line;
	}
});