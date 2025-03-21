Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-rqstwork-worker-search',
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
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','청구일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								width		: 156,
								labelWidth	: 60,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('ttsm_amnt','영수구분'),
								xtype		: 'lookupfield',
								name		: 'rqod_rcvd_dvcd',
								margin		: '0 0 0 102',
								lookupValue: resource.lookup( 'rqod_rcvd_dvcd' ),
								labelWidth	: 115,
								width		: 131,
								value		: '1',
								labelWidth	: 60,
								editable	: false
							}
						]
					}
				]
			};
		return line;
	},

});