Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2Detail3Search',{ extend: 'Axt.form.Search',
	alias: 'widget.module-estientry2-detail3-search',

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
				autoScroll	: true,
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('ordr_numb','오더번호'),
										xtype		: 'textfield',
										name		: 'ordr_numb',
										width		: 160,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 60
									},{	fieldLabel	: Language.get('invc_numb','견적번호'),
										xtype		: 'textfield',
										name		: 'invc_numb',
										width		: 140,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 50
									},{	fieldLabel	: Language.get('scen_addr_1fst','시공주소'),
										xtype		: 'textfield',
										name		: 'scen_addr_1fst',
										width		: 485,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('brnd_name','브랜드'),
										xtype		: 'textfield',
										name		: 'base_name',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('ispl_name','설치위치'),
										xtype		: 'textfield',
										name		: 'ispl_name',
										width		: 145,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('cont_schd_date','현장출고일'),
										xtype		: 'textfield',
										name		: 'cont_schd_date',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{ xtype		: 'hiddenfield', name : 'line_seqn'
									},{	fieldLabel	: Language.get('wdsf_rate_name','창형태'),
										xtype		: 'textfield',
										name		: 'wdsf_rate_name',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{	fieldLabel	: Language.get('wndw_dirt_dvcd','창방향'),
										xtype		: 'textfield',
										name		: 'wndw_dirt_dvcd',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('item_widh','창짝(W)'),
										xtype		: 'numericfield',
										name		: 'item_widh',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{	fieldLabel	: Language.get('item_hght','창짝(H)'),
										xtype		: 'numericfield',
										name		: 'item_hght',
										width		: 140,
										labelWidth	: 50,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{	fieldLabel	: Language.get('item_widh_1fst','창짝(W1)'),
										xtype		: 'numericfield',
										name		: 'item_widh_1fst',
										width		: 155,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
									},{	fieldLabel	: Language.get('item_hght_1fst','창짝(H1)'),
										xtype		: 'numericfield',
										name		: 'item_hght_1fst',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
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