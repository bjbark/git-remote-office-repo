Ext.define('module.stock.isos.goodsrettwork.view.GoodsRettWorkWorkerSearch',{ extend: 'Axt.form.Search',
	store		: 'module.stock.isos.goodsrettwork.store.GoodsRettWorkInvoice',
	alias: 'widget.module-goodsrettwork-worker-search',
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
							{	fieldLabel	: Language.get('acpt_numb','수주번호'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								hidden		: true,
								name		: 'invc_numb',
								width		: 281,
								labelWidth	: 60,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-ordr-popup',
									params : {
										stor_grp : _global.stor_grp ,
										line_stat : '0',
										cstm_idcd : Ext.ComponentQuery.query('module-goodsrettwork-worker-editor')[0].getValues().cstm_idcd,
										acpt_stat_dvcd : '0200'
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('ostt_date1','납기일자'),
								xtype		: 'betweenfield',
								name		: 'ostt_date1',
								pair		: 'ostt_date2',
								width		: 166,
								labelWidth	: 60,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								root		: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'ostt_date2',
								pair		: 'ostt_date1',
								width		: 118,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: new Date(),
							},{	fieldLabel	: Language.get('cstm_name','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								name		: 'cstm_name',
								width		: 220,
								labelWidth	: 50,
								pair		: 'cstm_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
								listeners	: {
									change	: function(){
										var searchForm = Ext.ComponentQuery.query('module-goodsrettwork-worker-search')[0];
										searchForm.down('[name=dlvy_cstm_name]').popup.params.cstm_idcd = this.getValue();
										if(this.value == ''){
											me.down('[name=cstm_idcd]').setValue(null);
											searchForm.down('[name=dlvy_cstm_name]').popup.params.cstm_idcd = null;
										}
									}
								}
							},{	fieldLabel	: Language.get('dlvy_name','납품처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dlvy_cstm_name',
								pair		: 'dlvy_cstm_idcd',
								width		: 250,
								labelWidth	: 70,
								clearable	: true,
								popup		: {
									widget	: 'lookup-cstm-deli-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('dely_cstm_name'));
										pairField.setValue(records[0].get('dlvy_cstm_idcd'));
									},
									create : function (self ) {
										editor = Ext.ComponentQuery.query('module-goodsrettwork-worker-search')[0];
										param = editor.getValues()
										if(param.cstm_idcd== '' || param.cstm_idcd == null ){
											Ext.Msg.alert("알림","거래처를 먼저 선택하여 주십시오.");
											popup.close();
											return;
										}
									}
								},
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
							},{	name : 'dlvy_cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('item_name','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								width		: 300,
								labelWidth	: 50,
								pair		: 'item_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd	: '삼정(제품)' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('lott_numb','Batch No'),
								xtype		: 'searchfield',
								name		: 'lott_numb',
								width		: 250,
								root		: true,
								clearable	: true,
								labelWidth	:  100,
								margin		: '0 0 0 0',
								hidden		: _global.options.mes_system_type.toUpperCase() == 'SJFLV'? false : true
							},{	fieldLabel	: Language.get('wrhs_name','창고'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wrhs_name',
								width		: 315,
								labelWidth	: 80,
								hidden		: true,
								pair		: 'wrhs_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wrhs-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
									}
								}
							},{	name : 'wrhs_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','수주구분'),
								xtype		: 'lookupfield',
								name		: 'acpt_dvcd',
								width		: 155,
								labelWidth	: 70,
								margin		: '0 0 0 5',
								editable	:false,
								lookupValue	: resource.lookup('acpt_dvcd'),
								value		: '1000'
							},{	text		: '<span class="btnTemp" style="font-size:1.3em">조회</span>',
								xtype		: 'button',
								width		: 80,
								height		: 25,
								margin		: '0 0 0 20',
								cls			: 'button-style',
								action		: 'selectAction2'
							}
						]
					}
				]
			};
		return line;
	}
});