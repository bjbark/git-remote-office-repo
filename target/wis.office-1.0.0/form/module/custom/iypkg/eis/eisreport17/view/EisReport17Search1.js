Ext.define('module.custom.iypkg.eis.eisreport17.view.EisReport17Search1', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport17-search1',
	height	: 45,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 1,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 280 },
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '11 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('','기간'),
									xtype		: 'betweenfield',
									name		: 'invc1_date',
									pair		: 'invc2_date',
									labelWidth	: 80,
									width		: 180,
									margin		: '0 0 0 0',
									root		: true,
									value		: new Date(),
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc2_date',
									pair		: 'invc1_date',
									labelWidth	: 15,
									width		: 115,
									value		: new Date(),
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
									items		: [
										{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
											items		: [
												{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 93',
													items		: [
														{	xtype	: 'checkboxfield',
															labelSeparator: '',
															allowBlank: true,
															boxLabel: '거래명세서' ,
															name : 'pric_burd_dvcd1',
															margin : '0 0 -5 0',
															inputValue: 1,
															value	: 1,
															width : 110 ,
															listeners: {
																change: function(chkbox,newVal,oldVal) {
																	var a = me.down('[name=pric_burd_dvcd2]').getValue();
																	var b = me.down('[name=pric_burd_dvcd3]').getValue();
																	if(chkbox.getValue() == true && a == true){
																		me.down('[name=pric_burd_dvcd2]').setValue(false);
																	}
																	if(chkbox.getValue() == true && b == true){
																		me.down('[name=pric_burd_dvcd3]').setValue(false);
																	}
																}
															}
														},{	xtype	: 'checkboxfield',
															labelSeparator: '',
															allowBlank: true,
															boxLabel: '청구서',
															margin : '0 0 -5 0',
															name : 'pric_burd_dvcd2',
															inputValue: 2,
															width : 80 ,
															listeners: {
																change: function(chkbox,newVal,oldVal) {
																	var b = me.down('[name=pric_burd_dvcd1]').getValue();
																	var a = me.down('[name=pric_burd_dvcd3]').getValue();
																	if(chkbox.getValue() == true && b == true){
																		me.down('[name=pric_burd_dvcd1]').setValue(false);
																	}
																	if(chkbox.getValue() == true && a == true){
																		me.down('[name=pric_burd_dvcd3]').setValue(false);
																	}
																}
															}
														},{	xtype	: 'checkboxfield',
															labelSeparator: '',
															allowBlank: true,
															boxLabel: '세금계산서',
															margin : '0 0 -5 0',
															name : 'pric_burd_dvcd3',
															inputValue: 2,
															width : 110 ,
															listeners: {
																change: function(chkbox,newVal,oldVal) {
																	var b = me.down('[name=pric_burd_dvcd1]').getValue();
																	var a = me.down('[name=pric_burd_dvcd2]').getValue();
																	if(chkbox.getValue() == true && b == true){
																		me.down('[name=pric_burd_dvcd1]').setValue(false);
																	}
																	if(chkbox.getValue() == true && a == true){
																		me.down('[name=pric_burd_dvcd2]').setValue(false);
																	}
																}
															}
														}
													]
												}
											]
										},
									]
								},{	fieldLabel	: Language.get('','원단수주'),
									xtype		: 'numericfield',
									name		: 'invc1_date',
									labelWidth	: 80,
									width		: 210,
									margin		: '0 0 0 10',
									root		: true,
									value		: 0,
								},{	fieldLabel	: Language.get('','COL수주'),
									xtype		: 'numericfield',
									name		: 'invc1_date',
									labelWidth	: 80,
									width		: 210,
									margin		: '0 0 0 0',
									root		: true,
									value		: 0,
								},{	fieldLabel	: Language.get('','C/T수주'),
									xtype		: 'numericfield',
									name		: 'invc1_date',
									labelWidth	: 80,
									width		: 210,
									margin		: '0 0 0 0',
									root		: true,
									value		: 0,
								},{	fieldLabel	: Language.get('','수주총액'),
									xtype		: 'numericfield',
									name		: 'invc1_date',
									labelWidth	: 80,
									width		: 210,
									margin		: '0 27 0 0',
									root		: true,
									value		: 0,
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
