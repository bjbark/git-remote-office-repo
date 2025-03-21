Ext.define('module.custom.sjflv.sale.sale.salework.view.SaleWorkWorkerSearch',{ extend: 'Axt.form.Search',
	store	: 'module.custom.sjflv.sale.sale.salework.store.SaleWorkInvoice',
	alias	: 'widget.module-sjflv-salework-worker-search',
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
				fieldDefaults	: { width : 175, labelWidth : 75, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('date','발행일자'),
								xtype		: 'datefield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'publ_date',
								clearable	: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date()
							},{	fieldLabel	: Language.get('rqod_rcvd_dvcd','영수/청구'),
								xtype		: 'lookupfield',
								editable	: false,
								name		: 'rqod_rcvd_dvcd',
								lookupValue	: resource.lookup('rqod_rcvd_dvcd'),
								clearable	: true,
								value		: '2'
							},{	fieldLabel	: Language.get('vatx_dvcd','자료구분'),
								xtype		: 'lookupfield',
								name		: 'vatx_dvcd',
								width		: 200,
								labelWidth	: 100,
								lookupValue	: resource.lookup('vatx_dvcd'),
								value		: '1',
								listeners	: {
									change:function(){
										var	lister = Ext.ComponentQuery.query('module-sjflv-salework-worker-lister')[0],
											store  = lister.getStore(),
											update = store.getUpdatedRecords(),
											value  = this.getValue()
										;
										Ext.each(update,function(record){
											if(value == '1'){
												record.set('vatx',record.get('sply')*0.1);
												record.set('amnt',record.get('sply'));
												record.set('ttsm',(record.get('sply')+record.get('sply')*0.1));
											}else{
												record.set('vatx',0);
												record.set('ttsm',record.get('sply'));
												record.set('amnt',record.get('sply'));
											}
										})
									}
								}
							}
						]
					}
				]
			};
		return line;
	}
});