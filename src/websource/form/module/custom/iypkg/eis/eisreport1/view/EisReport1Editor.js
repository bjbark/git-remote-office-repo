Ext.define('module.custom.iypkg.eis.eisreport1.view.EisReport1Editor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-eisreport1-editor',

	layout : {
		type: 'border'
	},

	collapsible 	: false	,
	collapsed		: false	,
	defaultFocus	: 'item_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ /*me.createDock(),*/ me.createwest()];
//		me.items = [me.createTabs()];
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
//				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
//				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'fieldset',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 100, labelWidth : 90, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '15 0 5 0',
							items	: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '5 0 5 0',
								items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 -20',
									items	: [
										,{	fieldLabel	: Language.get('','수주번호'),
											xtype		: 'textfield',
											name		: 'invc_numb',
											readOnly	: true,
											width		: 300
										}
									]
									},{	fieldLabel	: Language.get('','수주처'),
										xtype		: 'textfield',
										readOnly	: true,
										name		: 'dlvy_cstm_name',
										width		: 300,
										margin : '0 0 5 -20'
									},{	fieldLabel	: Language.get('','제품명'),
										xtype		: 'textfield',
										readOnly	: true,
										name		: 'prod_name',
										width		: 300,
										margin : '0 0 5 -20'
									},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 15', fieldDefaults: { width : 561, labelWidth : 70 },
										items	: [
													{	fieldLabel	: Language.get('','제품규격'),
														xtype		: 'numericfield',
														name		: 'item_leng',
														labelWidth	: 60,
														width		: 140,
														readOnly	: true,
													},{	xtype		: 'numericfield',
														name		: 'item_widh',
														margin		: '0 0 0 5',
														width		: 75,
														readOnly	: true,
													},{	xtype		: 'numericfield',
														name		: 'item_hght',
														margin		: '0 0 0 5',
														width		: 75,
														readOnly	: true,
													}
												]
											},{	fieldLabel	: Language.get('','P/O No'),
												xtype		: 'textfield',
												name		: 'pcod_numb',
												margin		: '0 0 0 12',
												labelWidth	: 60,
												width		: 270,
												readOnly	: true,
											}
								]
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '5 0 5 20',
								items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
									items	: [
										,{	fieldLabel	: Language.get('invc_date','수주일자'),
											xtype		: 'datefield',
											name		: 'invc_date',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											readOnly	: true,
											width		: 200,
											root		: true,
										}
									]
									},{	fieldLabel	: Language.get('','단가'),
										xtype		: 'numericfield',
										readOnly	: true,
										value		: '0',
										name		: 'stnd_pric2',
										width		: 200
									},{	fieldLabel	: Language.get('','수주량'),
										xtype		: 'numericfield',
										value		: '0',
										readOnly	: true,
										name		: 'acpt_qntt',
										width		: 200
									},{	fieldLabel	: Language.get('','공급가액'),
										xtype		: 'numericfield',
										value		: '0',
										readOnly	: true,
										name		: 'ttsm_amnt',
										width		: 200
									},{	fieldLabel	: Language.get('','원자재비부가율'),
										xtype		: 'numericfield',
										value		: '0',
										readOnly	: true,
										name		: 'item_name',
										width		: 200
									},
								]
							},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '5 0 5 50',
								items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 5 0',
									items	: [
										,{	xtype		: 'label',
											text		: '가공비계',
											wdith		: 107,
											margin		: '3 0 0 13',
										},{	xtype		: 'numericfield',
											name		: 'item_name',
											width		: 80,
											readOnly	: true,
											value		: '0',
											margin		: '0 0 0 5',
										},{	xtype		: 'numericfield',
											name		: 'item_name',
											width		: 50,
											value		: '0',
											readOnly	: true,
											margin		: '0 0 0 3',
										},{	xtype		: 'label',
											margin		: '5 0 0 5',
											text		: '%',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										,{	xtype		: 'label',
											text		: '외주비계',
											wdith		: 107,
											margin		: '3 0 0 13',
										},{	xtype		: 'numericfield',
											name		: 'item_name',
											width		: 80,
											readOnly	: true,
											value		: '0',
											margin		: '0 0 0 5',
										},{	xtype		: 'numericfield',
											name		: 'item_name',
											width		: 50,
											readOnly	: true,
											value		: '0',
											margin		: '0 0 0 3',
										},{	xtype		: 'label',
											margin		: '5 0 0 5',
											text		: '%',
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
									items	: [
										,{	xtype		: 'label',
											text		: '판매 부가액',
											wdith		: 150,
											style		: { color : 'Red' },
											margin		: '3 0 0 0',
										},{	xtype		: 'numericfield',
											readOnly	: true,
											name		: 'item_name',
											width		: 80,
											value		: '0',
											margin		: '0 0 0 5',
										},{	xtype		: 'numericfield',
											readOnly	: true,
											name		: 'item_name',
											width		: 50,
											value		: '0',
											margin		: '0 0 0 3',
										},{	xtype		: 'label',
											margin		: '5 0 0 5',
											text		: '%',
										}
									]
								}
								]
							}
						]
					}
				]
			}
		;
		return item;
	},

});