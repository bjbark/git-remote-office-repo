Ext.define('module.custom.sjflv.mtrl.imp.reportmast.view.ReportMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-reportmast-worker-editor',
	header	: false,
	height	: 110,
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
										{	fieldLabel	: Language.get('','사업장'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 100,
											width		: 220,
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
										},{	fieldLabel	: Language.get('','B/L No'),
											xtype		: 'popupfield',
											name		: '',
											pair		: '',
											clearable	: true,
											labelWidth	: 100,
											width		: 220,
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
										},{	fieldLabel	: Language.get('','등록기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 99,
											width		: 198,
											margin		: '0 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											width		: 115,
											value		: new Date()
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
											width		: 220,
										},{	fieldLabel	: Language.get('', '담당자' ),
											name		: '',
											xtype		: 'textfield',
											labelWidth	: 100,
											width		: 220,
										},{	fieldLabel	: Language.get('','선적예정일'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 99,
											width		: 198,
											margin		: '0 0 0 0',
											root		: true,
											value		: Ext.Date.getFirstDateOfMonth(new Date())
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											width		: 115,
											value		: new Date()
										}
									]
								},{	xtype : 'fieldset',
									layout: 'hbox',
									border: 0,
									margin: '5 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','수입구분'),
											xtype		: 'lookupfield',
											name		: '',
											lookupValue	:  resource.lookup(''),
											labelWidth	: 100,
											width		: 220,
											value		: ''
										},
									]
								}
							]
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">대기 B/L 조회</span>',
							xtype		: 'button',
							width		: 160,
							height		: 80,
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
