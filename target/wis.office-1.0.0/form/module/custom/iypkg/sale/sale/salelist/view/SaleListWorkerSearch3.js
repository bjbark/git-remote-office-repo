Ext.define('module.custom.iypkg.sale.sale.salelist.view.SaleListWorkerSearch3', { extend: 'Axt.form.Search',

	alias	: 'widget.module-salelist-worker-search3',
	height	: 85,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 280 },
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '8 0 0 0',
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
							items : [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 11 5 0',
									items	: [
										{	fieldLabel	: Language.get('','조회기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 70,
											width		: 175,
											margin		: '0 0 0 2',
											root		: true,
											value		: new Date(),
											listeners	: {
												change : function(value){
													var val  = value.getValue()
														date = new Date()
													;
													if(val == '' || val == null){
														value.setValue(date);
													}
												}
											}
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 13,
											width		: 118,
											value		: new Date(),
											listeners	: {
												change : function(value){
													var val  = value.getValue()
														date = new Date()
													;
													if(val == '' || val == null){
														value.setValue(date);
													}
												}
											}
										},{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'popupfield',
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											clearable	: true,
											labelWidth	: 72,
											width		: 295,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-user-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											}
										},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
									items	: [
										{	fieldLabel	: Language.get('','합계구분'),
											xtype		: 'lookupfield',
											name		: 'chk',
											lookupValue	: [['0','소계'],['1','일계'],['2','월계'],['3','합계']],
											multiSelect	: true ,
											editable	: false,
											labelWidth	: 70,
											width		: 295,
											margin		: '0 0 0 0',
										},{	fieldLabel	: Language.get('prod_name','제품명'),
											xtype		: 'popupfield',
											name		: 'prod_name',
											pair		: 'prod_idcd',
											width		: 295  ,
											labelWidth	: 72,
											clearable	: true,
											editable	: true,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-prod-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('prod_name'));
													pairField.setValue(records[0].get('prod_idcd'));
												}
											}
										},{	xtype : 'textfield',  name : 'prod_idcd' , hidden: true
										},{	xtype	: 'checkboxfield',
											allowBlank: true,
											name : 'ck1',
											boxLabel: '명세서 기준' ,
											value	: true,
											margin : '0 0 0 10',
											width : 100 ,
											inputValue: 1,
											listeners: {
												change: function(chkbox,newVal,oldVal) {
													var a = me.down('[name=ck2]').getValue();
													var b = me.down('[name=ck3]').getValue();
													if(chkbox.getValue() == true && a == true){
														me.down('[name=ck2]').setValue(false);
													}
													if(chkbox.getValue() == true && b == true){
														me.down('[name=ck3]').setValue(false);
													}
													if(a == false && b == false){
														this.setValue(true);
													}
												}
											}
										},{	xtype	: 'checkboxfield',
											allowBlank: true,
											name : 'ck2',
											boxLabel: '청구서 기준' ,
											margin : '0 0 0 0',
											width : 80 ,
											inputValue: 2,
											listeners: {
												change: function(chkbox,newVal,oldVal) {
													var a = me.down('[name=ck1]').getValue();
													var b = me.down('[name=ck3]').getValue();
													if(chkbox.getValue() == true && a == true){
														me.down('[name=ck1]').setValue(false);
													}
													if(chkbox.getValue() == true && b == true){
														me.down('[name=ck3]').setValue(false);
													}
													if(a == false && b == false){
														this.setValue(true);
													}
												}
											}
										},{	xtype	: 'checkboxfield',
											allowBlank: true,
											name : 'ck3',
											boxLabel: '계산서 기준' ,
											margin : '0 0 0 20',
											width : 80 ,
											inputValue: 2,
											listeners: {
												change: function(chkbox,newVal,oldVal) {
													var a = me.down('[name=ck1]').getValue();
													var b = me.down('[name=ck2]').getValue();
													if(chkbox.getValue() == true && a == true){
														me.down('[name=ck1]').setValue(false);
													}
													if(chkbox.getValue() == true && b == true){
														me.down('[name=ck2]').setValue(false);
													}
													if(a == false && b == false){
														this.setValue(true);
													}
												}
											}
										}
									]
								}
							]
						}
					]
				}
			]
		};
	return item;
	},

});
