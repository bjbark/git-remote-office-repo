Ext.define('module.custom.iypkg.stock.isos.isttwork2.view.IsttWork2WorkerSearch',{ extend: 'Axt.form.Search',
	alias	: 'widget.module-isttwork2-worker-search',
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
				fieldDefaults: { width : 280, labelWidth : 40 , margin : '3 5 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox',	border	: 0,
						items : [
							{	fieldLabel	: Language.get('cstm_name','입고처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								hidden		: true,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 263,
								margin		: '3 0 0 10',
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
							},{	fieldLabel	: Language.get('invc_date', '입고일자' ),
								name		: 'invc_date',
								xtype		: 'datefield',
								width		: 150,
								labelWidth	: 50,
								margin		: '2 0 0 8',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
							}
						]
					},
				]
			};
	return line;
	}
});