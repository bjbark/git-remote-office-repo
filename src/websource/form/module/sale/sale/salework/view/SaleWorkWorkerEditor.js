Ext.define('module.sale.sale.salework.view.SaleWorkWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-salework-worker-editor',
	header	: false,
	height	: 80,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 110,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			defaults   : { xtype: 'fieldset', layout: 'hbox', margin : '0 0 -10 0', padding:'0', border: 0 },
			items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						border: 0,
						margin: '5 0 0 -18',
						items : [
						{	xtype : 'fieldset',
							layout: 'vbox',
							border: 0,
							margin: '0 0 0 0',
							items : [
								{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '0 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','거래처'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 100,
											width		: 260,
											margin		: '6 0 0 0',
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-bzpl-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('bzpl_name'));
													pairField.setValue(records[0].get('bzpl_idcd'));
												}
											}
										},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('','출고기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 79,
											width		: 183,
											margin		: '6 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											margin		: '6 0 0 0',
											width		: 120,
											value		: new Date()
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('cont_date','발행일자'),
											xtype		: 'datefield',
											name		: 'cont_date',
											width		: 170,
											margin		: '0 0 0 30',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('deli_dcnt','공급가'),
											xtype		: 'numericfield',
											width		: 174,
											name		: 'deli_dcnt',
											margin		: '0 0 0 69',
											style		: { color: 'Blue'},
										},{	fieldLabel	: Language.get('deli_dcnt','부가세'),
											xtype		: 'numericfield',
											width		: 174,
											name		: 'deli_dcnt',
											style		: { color: 'Red'},
										},{	fieldLabel	: Language.get('deli_dcnt','합계'),
											xtype		: 'numericfield',
											labelWidth	: 40,
											width		: 174,
											name		: 'deli_dcnt',
										},{	fieldLabel	: Language.get('','영수/청구'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											labelWidth	: 60,
											width		: 140,
											value		: ''
										}
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">발행 대기내역 조회</span>',
							xtype		: 'button',
							width		: 160,
							height		: 55,
							margin		: '2 0 0 0',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				}
			]
		};
		return item;
	}
});
