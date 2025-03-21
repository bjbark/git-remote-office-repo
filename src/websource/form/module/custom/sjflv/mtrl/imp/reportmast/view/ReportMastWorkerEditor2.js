Ext.define('module.custom.sjflv.mtrl.imp.reportmast.view.ReportMastWorkerEditor2', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-reportmast-worker-editor2',
	header	: false,
	height	: 140,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 180,
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
										{	fieldLabel	: Language.get('','수입통관번호'),
											name		: '',
											xtype		: 'textfield',
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											width		: 240,
											labelWidth	: 100,
										},{	xtype		: 'lookupfield',
											name		: 'line_stat',
											width		: 55,
											editable	: false,
											margin		: '1 0 0 5',
											lookupValue	: resource.lookup('line_stat')
										},{	fieldLabel	: Language.get('','관리번호'),
											xtype		: 'textfield',
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											name		: '',
											labelWidth	: 60,
											width		: 190,
										},{	fieldLabel	: Language.get('','통관일자'),
											xtype		: 'datefield',
											name		: '',
											width		: 170,
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','사업장'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 100,
											width		: 300,
											margin		: '0 0 0 0',
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
										},{	fieldLabel	: Language.get('','수입구분'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											labelWidth	: 60,
											width		: 190,
											value		: ''
										},{	fieldLabel	: Language.get('','수입종류'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											width		: 170,
											value		: ''
										},{	fieldLabel	: Language.get('','거래구분'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											width		: 170,
											value		: ''
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Vendor' ),
											name		: '',
											xtype		: 'textfield',
											labelWidth	: 100,
											width		: 300,
										},{	fieldLabel	: Language.get('','담당자'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 60,
											width		: 190,
											margin		: '0 0 0 0',
											popup: {
												select : 'SINGLE',
												widget : 'lookup--popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get(''));
													pairField.setValue(records[0].get(''));
												}
											}
										},{	name : '', xtype : 'textfield' , hidden : true
										},{	fieldLabel	: Language.get('', '운임' ),
											name		: '',
											xtype		: 'textfield',
											width		: 170,
										},{	fieldLabel	: Language.get('','Ship Via'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											width		: 170,
											value		: ''
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','단가조건'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											labelWidth	: 100,
											width		: 220,
											value		: ''
										},{	fieldLabel	: Language.get('','결제방법'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											labelWidth	: 140,
											width		: 270,
											value		: ''
										},{	fieldLabel	: Language.get('','결제시기'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											width		: 170,
											value		: ''
										},{	fieldLabel	: Language.get('', '결제기한' ),
											name		: '',
											xtype		: 'textfield',
											width		: 170,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','신고일자'),
											xtype		: 'datefield',
											name		: '',
											labelWidth	: 100,
											width		: 220,
											value		: new Date(),
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD
										},{	fieldLabel	: Language.get('','화폐단위'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 140,
											width		: 270,
											margin		: '0 0 0 0',
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
										},{	fieldLabel	: Language.get('', '적용환율' ),
											name		: '',
											xtype		: 'textfield',
											width		: 170,
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Remarks' ),
											name		: '',
											xtype		: 'textfield',
											labelWidth	: 100,
											width		: 830,
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
	}
});
