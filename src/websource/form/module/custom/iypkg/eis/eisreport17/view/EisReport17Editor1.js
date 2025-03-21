Ext.define('module.custom.iypkg.eis.eisreport17.view.EisReport17Editor1', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-eisreport17-editor1',
	header	: false,

	initComponent: function(config){
		var me = this;
		var toDay = Ext.Date.format(new Date(),'M');
		me.dockedItems = [ me.createMonth(toDay), me.createWest() ] ;
		me.callParent(arguments);
	},

	createMonth : function (now) {
		var me = this,
		item = {
				xtype		: 'form-panel' ,
				dock		: 'top',
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 50 ,
				items		: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0, margin : '0 0 0 0',
						items : [
						{	xtype	: 'label',
							width	: '100%',
							text	: now,
							style	: 'text-align:center; font-size:2.5em; ',
							cls		: 'textTemp',
						}
					]
				}
			]
		}
		return item;
	},

	createWest : function () {
		var me	= this,
		item = {
				xtype		: 'form-panel' ,
				border		: 0,
				bodyStyle	: { padding: '5px' },
				width		: 317,
				margin		: '0 0 -10 0',
				fieldDefaults: { width : 350, labelWidth : 50, margin : '0 0 0 0', labelWidth	: 65, width		: 250 },
				items		: [
					{	xtype : 'fieldset', layout: 'vbox',layout	: 'fit',
						items : [
							{	xtype : 'fieldset', layout: 'vbox', border : 0, margin : '15 3 0 0',
								items : [
									{	fieldLabel	: Language.get('','매출액'),
										xtype		: 'numericfield',
										name		: 'invc_date1',
										clearable	: true,
										value		: 0,
										margin		: '0 3 5 0',
									},{	fieldLabel	: Language.get('','원단매출'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										clearable	: true,
										value		: 0,
									},{	fieldLabel	: Language.get('','C/T매출'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','Col매출'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','매입액'),
										xtype		: 'numericfield',
										name		: 'invc_date1',
										clearable	: true,
										value		: 0,
										margin		: '10 3 5 0',
									},{	fieldLabel	: Language.get('','원지매입'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','원단매입'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','마니라매입'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','외주가공비'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','상품가공비'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','부자재매입'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 5 0',
										value		: 0,
										clearable	: true
									},{	fieldLabel	: Language.get('','부가액'),
										xtype		: 'numericfield',
										name		: 'invc_date1',
										value		: 0,
										clearable	: true,
										margin		: '10 3 5 0',
									},{	fieldLabel	: Language.get('','부가율'),
										xtype		: 'numericfield',
										name		: 'invc_date2',
										margin		: '0 0 10 0',
										value		: 0,
										clearable	: true
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
