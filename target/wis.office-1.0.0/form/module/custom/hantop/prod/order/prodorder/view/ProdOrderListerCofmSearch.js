Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmSearch',{ extend: 'Axt.form.Search',

	alias: 'widget.module-prodorder-lister-cofmsearch',

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
					{	xtype : 'fieldset', layout: 'hbox', margin:'5 0 0 0',
							items : [
								{	fieldLabel	: Language.get('both','동시절단'),
									xtype		: 'lookupfield',
									editable	: false,
									name		: 'both_cutt',
									width		: 180,
									labelWidth	: 90,
									lookupValue	: resource.lookup('yorn'),
									value		: '0',
									listeners	: {
										change:function(){
											var layout = Ext.ComponentQuery.query('module-prodorder-layout')[0];
											if(this.getValue()==1){
												layout.down('[itemId=detail3_1_2]').show()
											}else{
												layout.down('[itemId=detail3_1_2]').hide()
											}
										}
									}
								},{	fieldLabel	: Language.get('stnd_abar_leng','원자재길이'),
									xtype		: 'numericfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'stnd_abar_leng',
									width		: 180,
									labelWidth	: 90,
								},
							]
					},{	xtype : 'fieldset', layout: 'hbox', margin:'5 0 0 0',
						items : [
							{	fieldLabel	: Language.get('auto_yorn','자동여부'),
								xtype		: 'lookupfield',
								editable	: false,
								name		: 'auto_yorn',
								width		: 180,
								labelWidth	: 90,
								lookupValue	: resource.lookup('yorn'),
								value		: '0',
							},{	fieldLabel	: Language.get('ydge_used_yorn','자투리사용여부'),
								xtype		: 'lookupfield',
								editable	: false,
								name		: 'ydge_used_yorn',
								width		: 180,
								labelWidth	: 90,
								lookupValue	: resource.lookup('yorn'),
								value		: '0',
							}
						]
					}
				]
			};
		return line;
	}
});