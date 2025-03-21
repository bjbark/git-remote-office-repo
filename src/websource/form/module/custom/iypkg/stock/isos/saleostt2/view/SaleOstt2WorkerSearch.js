Ext.define('module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2WorkerSearch',{ extend: 'Axt.form.Search',
	alias	: 'widget.module-saleostt2-worker-search',
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
				fieldDefaults: { width : 210, labelWidth : 50 },
				items		: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('new_invc_numb', '출고번호' ),
								xtype		: 'textfield',
								name		: 'new_invc_numb',
								allowBlank	: true,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								margin		: '5 5 5 0',
								width		: 270,
								labelWidth	: 50,
								readOnly	: false,
								hidden		: true
							},{	fieldLabel	: Language.get('ostt_date','출고일자'),
								xtype		: 'datefield',
								name		: 'ostt_date',
								width		: 161,
								labelWidth	: 61,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('cars_name', '운송차량' ),
								name		: 'cars_alis',
								pair		: 'cars_idcd',
								xtype		: 'popupfield',
								value		: _global.hq_id.toUpperCase() == 'N1000LIEBE'? '2.5톤' : null,
								enableKeyEvents : true,
								width		: 181,
								labelWidth	: 61,
								popup		: {
									widget	: 'lookup-car-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cars_alis'));
										pairField.setValue(records[0].get('cars_idcd'));
										setTimeout(function(){
											me.down('[name=trnt_exps]').focus(true , 10);
										},100);

										me.down('[name=nwek_name]').setValue(records[0].get('nwek_name'));
									}
								}
							},{	name	: 'cars_idcd', xtype	: 'textfield', hidden : true , value :_global.hq_id.toUpperCase() == 'N1000LIEBE'? '000001' : null,
							},{	fieldLabel	: Language.get('nwek_name','기사명'),
								xtype		: 'textfield',
								name		: 'nwek_name',
								width		: 181,
								labelWidth	: 61,
								value		: _global.hq_id.toUpperCase() == 'N1000LIEBE'? '최용환' : null,
							},{	fieldLabel	: Language.get('trnt_exps','운송비'),
								xtype		: 'numericfield',
								name		: 'trnt_exps',
								width		: 161,
								labelWidth	: 61,
								enableKeyEvents : true,
								listeners	:{
									change	: function (field,value){
										field.setValue(String(value).replace(/[^0-9]/g, ""));
									}
								}
							}
						]
					}
				]
			};
		return line;
	},

});