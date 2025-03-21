Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttWorkerEditor', { extend: 'Axt.form.Editor',
	border	: false,
	alias	: 'widget.module-saleostt-worker-editor',
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.iypkg.stock.isos.saleostt.store.SaleOsttInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
				xtype		: 'form-panel' ,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				fieldDefaults	: { width : 210, labelWidth : 50, labelSeparator : '' , },
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', height		: 80, border		: 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', height		: 34, border		: 0,
								items : [
									{	fieldLabel	: Language.get('','수주일자'),
										xtype		: 'betweenfield',
										name		: 'invc_date1',
										pair		: 'invc_date2',
										margin		: '5 0 0 0',
										root		: true,
										width		: 150,
										value		: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
										listeners : {
											change : function(value){
												var val  = value.getValue()
												;
												if(val == '' || val == null){
													value.setValue(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
												}
											}
										}
									},{	xtype		: 'betweenfield',
										fieldLabel	:'~',
										name		: 'invc_date2',
										pair		: 'invc_date1',
										margin		: '5 5 0 0',
										labelWidth	: 15,
										width		: 115,
										value		: new Date(),
										listeners : {
											change : function(value){
												var val  = value.getValue()
												;
												if(val == '' || val == null){
													value.setValue(new Date());
												}
											}
										}
									},{	fieldLabel	: Language.get('acpt_numb', '수주번호' ),
										xtype		: 'popupfield',
										name		: 'acpt_numb',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										margin		: '5 5 0 0',
										popup		: {
											widget	: 'lookup-iypkg-ordr-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('invc_numb'));
											}
										}
									},{	fieldLabel	: Language.get('prod_name','제품코드'),
										xtype		: 'popupfield',
										name		: 'prod_name',
										margin		: '5 5 0 5',
										pair		: 'prod_idcd',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-prod-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' },
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('prod_name'));
												pairField.setValue(records[0].get('prod_idcd'));
											}
										}
									},{	name : 'prod_idcd', xtype : 'textfield' , hidden : true
									},{	text		: '<span class="btnTemp" style="font-size:1.3em">출고대기내역 가져오기</span>',
										xtype		: 'button',
										width		: 160,
										height		: 25,
										margin		: '3 0 0 45',
										cls			: 'button-style',
										action		: 'selectAction2'
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border		: 0, margin : '-5 0 0 0',
								items : [
									{	fieldLabel	: Language.get('','납기일자'),
										xtype		: 'betweenfield',
										name		: 'deli_date1',
										pair		: 'deli_date2',
										root		: true,
										width		: 150,
										value		: '',
//										listeners : {
//											change : function(value){
//												var val  = value.getValue()
//												;
//												if(val == '' || val == null){
//													value.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
//												}
//											}
//										}
									},{	xtype		: 'betweenfield',
										fieldLabel	:'~',
										name		: 'deli_date2',
										pair		: 'deli_date1',
										margin		: '0 5 0 0',
										labelWidth	: 15,
										width		: 115,
										value		: '',
//										listeners : {
//											change : function(value){
//												var val  = value.getValue()
//												;
//												if(val == '' || val == null){
//													value.setValue(new Date());
//												}
//											}
//										}
									},{	fieldLabel	: Language.get('cstm_name', '거래처' ),
										name		: 'cstm_name',
										pair		: 'cstm_idcd',
										xtype		: 'popupfield',
										editable	: true,
										enableKeyEvents : true,
										clearable	: true ,
										margin		: '0 5 0 0',
										popup		: {
											widget	: 'lookup-cstm-popup',
											select	: 'SINGLE',
											params	: { stor_grp : _global.stor_grp, line_stat : '0' },
											result	: function(records, nameField, pairField ) {
												nameField.setValue(records[0].get('cstm_name'));
												pairField.setValue(records[0].get('cstm_idcd'));
												me.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));

												var search = Ext.ComponentQuery.query('module-saleostt-worker-search')[0];
												search.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
												search.down('[name=cstm_idcd]').setValue(records[0].get('cstm_idcd'));
											}
										}
									},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true
									},{	name	: 'cstm_code', xtype	: 'textfield', hidden : true
									},{ xtype	: 'fieldcontainer',
										layout	: { type: 'hbox', align: 'stretch' },
										margin	: '-5 0 0 50',
										height	: 30,
										width	: 500,
										items	:[
											{	xtype	: 'label',
												text	: '생산대기',
												margin	: '8 0 8 0',
											},{	xtype	: 'label',
												margin	: '8 1 8 1',
												width	: 50,
												style	: 'background-color:grey !important;'
											},{	xtype	: 'label',
												text	: '생산중',
												margin	: '8 0 8 40',
											},{	xtype	: 'label',
												margin	: '8 1 8 1',
												width	: 50,
												style	: 'background-color:lightblue !important;'
											},{	xtype	: 'label',
												text	: '생산완료',
												margin	: '8 0 8 40',
											},{	xtype	: 'label',
												margin	: '8 1 8 1',
												width	: 50,
												style	: 'background-color:lightgreen !important;'
											},{	xtype	: 'label',
												text	: '생산입고완료',
												margin	: '8 0 8 40',
											},{	xtype	: 'label',
												margin	: '8 1 8 1',
												width	: 50,
												style	: 'background-color:red !important;'
											},
										]
									}
								]
							}
						]
					}
				]
			};
		return item;
	}
});
