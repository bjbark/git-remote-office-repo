Ext.define('module.custom.sjflv.mtrl.isttcalc.purcrettmast.view.PurcRettMastWorkerSearch',{ extend: 'Axt.form.Search',
	store		: 'module.custom.sjflv.mtrl.isttcalc.purcrettmast.store.PurcRettMastInvoice',
	alias: 'widget.module-purcrettmast-worker-search',
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
										cstm_idcd : Ext.ComponentQuery.query('module-purcrettmast-worker-editor')[0].getValues().cstm_idcd,
										acpt_stat_dvcd : '0200'
									},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('invc_numb'));
									}
								}
							},{	fieldLabel	: Language.get('ostt_date1','입고일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 166,
								labelWidth	: 60,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								root		: true
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
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
										var searchForm = Ext.ComponentQuery.query('module-purcrettmast-worker-search')[0];
										searchForm.down('[name=dlvy_cstm_name]').popup.params.cstm_idcd = this.getValue();
										if(this.value == ''){
											me.down('[name=cstm_idcd]').setValue(null);
											searchForm.down('[name=dlvy_cstm_name]').popup.params.cstm_idcd = null;
										}
									}
								}
							},{	fieldLabel	: Language.get('item_name','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
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