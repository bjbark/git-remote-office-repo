Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearchTest',{ extend: 'Axt.form.Search',
	store		: 'module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoiceTest',
	alias: 'widget.module-goodsosttwork-worker-search-test',
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
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('acpt_numb','주문번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 250,
								labelWidth	: 60,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-ordr-popup',
									params : {
										stor_grp : _global.stor_grp ,
										line_stat : '0',
										cstm_idcd : Ext.ComponentQuery.query('module-goodsosttwork-worker-editor-test')[0].getValues().cstm_idcd,
										acpt_stat_dvcd : '0200'
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								name		: 'cstm_name',
								width		: 270,
								labelWidth	: 50,
								pair		: 'cstm_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 250,
								labelWidth	: 60,
								clearable	: true,
								pair		: 'item_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd	: '제품' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('deli_date1','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								width		: 161,
								labelWidth	: 60,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								root		: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 118,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
							},{	fieldLabel	: Language.get('acpt_dvcd','수주구분'),
								xtype		: 'lookupfield',
								name		: 'acpt_dvcd',
								lookupValue	: resource.lookup('acpt_dvcd' ),
								value		: '1000',
								labelWidth	: 60,
								width		: 155,
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 30',
								cls			: 'button-style',
								action		: 'selectAction3'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: '비고사항' 		,
								name		: 'user_memo',
								xtype		: 'textarea',
//								emptyText	: '메모사항을 적어주십시오',
								width		: 250,
								labelWidth	: 60,
								height		: 50,
								hidden		: true
//								hidden		: (_global.stor_id.toUpperCase()!= 'N1000NBOLT1000'?true:false)
							}
						]
					}
				]
			};
		return line;
	}
});