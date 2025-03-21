Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-estientry2-worker-search',

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
				xtype		: 'fieldset',
				layout		: 'vbox',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('bsmt_loss_rate','원자재LOSS'),
										xtype		: 'numericfield',
										name		: 'bsmt_loss_rate',
										width		: 120,
										labelWidth	: 60
									},{	xtype		: 'label',
										text		: '%',
										margin		: '8 0 0 0',
										style		: 'text-align:left;',
										width		: 20,
									},{	fieldLabel	: Language.get('asmt_loss_rate','부자재LOSS'),
										xtype		: 'numericfield',
										name		: 'asmt_loss_rate',
										width		: 120,
										labelWidth	: 60,
										margin		: '5 0 0 20'
									},{	xtype		: 'label',
										text		: '%',
										margin		: '8 0 0 5',
										style		: 'text-align:left;',
										width		: 20,
									},{	fieldLabel	: Language.get('weld_loss_rate','용접LOSS'),
										xtype		: 'numericfield',
										name		: 'weld_loss_rate',
										width		: 120,
										labelWidth	: 60,
										margin		: '5 0 0 20'
									},{	xtype		: 'label',
										text		: '%',
										margin		: '8 0 0 5',
										style		: 'text-align:left;',
										width		: 20,
									},{	fieldLabel	: Language.get('rein_viss_itvl','보강비스간격'),
										xtype		: 'numericfield',
										name		: 'rein_viss_itvl',
										width		: 130,
										labelWidth	: 70,
										margin		: '5 0 0 20'
									},{	fieldLabel	: Language.get('ancr_atch_itvl','앵커부착간격'),
										xtype		: 'numericfield',
										name		: 'ancr_atch_itvl',
										width		: 130,
										labelWidth	: 70,
										margin		: '5 0 0 20'
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 5 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('remk_text','비고'),
										xtype		: 'textfield',
										name		: 'remk_text',
										width		: 775,
										labelWidth	: 60
									}
								]
							}
						]
					}
				]
			};
		return line;
	},

});