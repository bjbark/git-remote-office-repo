Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail4Search',{ extend: 'Axt.form.Search',
	alias: 'widget.module-estientry2-detail4-search',

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
									{	fieldLabel	: Language.get('base_name','브랜드명'),
										xtype		: 'textfield',
										name		: 'base_name',
										width		: 160,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 60
									},{	fieldLabel	: Language.get('modl_name','모델명'),
										xtype		: 'textfield',
										name		: 'modl_name',
										width		: 165,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 50
									},{	fieldLabel	: Language.get('wdbf_itid','BF자재'),
										xtype		: 'textfield',
										name		: 'wdbf_itid',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_widh','길이(W)'),
										xtype		: 'numericfield',
										name		: 'item_widh',
										width		: 155,
										labelWidth	: 65,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_hght','높이(H)'),
										xtype		: 'numericfield',
										name		: 'item_hght',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('ispl_name','설치위치'),
										xtype		: 'textfield',
										name		: 'ispl_name',
										width		: 160,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 60
									},{	fieldLabel	: Language.get('wdsf_rate_name','창형태'),
										xtype		: 'textfield',
										name		: 'wdsf_rate_name',
										width		: 165,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 50
									},{	fieldLabel	: Language.get('wdsf_itid','SF자재'),
										xtype		: 'textfield',
										name		: 'wdbf_itid',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_widh_1fst','길이1(W)'),
										xtype		: 'numericfield',
										name		: 'item_widh_1fst',
										width		: 155,
										labelWidth	: 65,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_hght_1fst','높이1(H)'),
										xtype		: 'numericfield',
										name		: 'item_hght_1fst',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									}
								]
							}
						]
					}
				]
			};
		return line;
	}
});