Ext.define('module.workshop.print.basic.sheetmast.view.SheetMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-sheetmast-editor',

	height : 240,
	layout : {
		type: 'border'
	},

	title			: Language.get('','용지코드'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'wrhs_idcd',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'wrhs_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','용지코드'),
								name		: 'shet_idcd',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 255
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('wrhs_name','용지명'),
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						xtype		: 'textfield',
						name		: 'shet_name'
					},{	fieldLabel	: Language.get('','용지사이즈'),
						xtype		: 'lookupfield',
						name		: 'shet_size_dvcd',
						lookupValue	: resource.lookup('shet_size_dvcd')
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 10 5 0',
						items	: [
							{	fieldLabel	: Language.get( '', '규격' ),
								name		: 'horz_leng',
								xtype		: 'numericfield',
								maxLength	: 50,
								width		: 170,
							},{	fieldLabel	: Language.get( '', 'X' ),
								name		: 'vrtl_leng'  ,
								xtype		: 'numericfield',
								width		: 80,
								labelWidth	: 10,
							},{	xtype		: 'numericfield',
								name		: 'shet_wght',
								width		: 60,
								labelWidth	: 10,
								margin		: '1 0 0 5',
							},{	xtype		:'label',
								text		:'g',
								margin		: '5 0 0 5',
							}
						]
					},{	fieldLabel	: Language.get('colr_name','컬러'),
						xtype		: 'popupfield'		,
						name		: 'colr_name'	,
						pair		: 'colr_bacd'	,
						clearable	: true ,
						editable : true,
						enableKeyEvents : true,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-base-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' ,prnt_idcd : '3104'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_idcd'));
							}
						}
					},{	name : 'colr_bacd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('','용지분류'),
						xtype		: 'popupfield'	,
						name		: 'clss_desc'	,
						pair		: 'lcls_idcd'	,
						editable	: true,
						enableKeyEvents : true,
						clearable	: true ,
							popup	: {
								select : 'SINGLE',
								widget : 'lookup-item-clss-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
									me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
									me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									nameField.setValue(records[0].get('clss_desc'));
								}
							},
					listeners	: {
						change	: function(){
							var val = this.getValue();
							if( val == '' || val == null ){
								me.down('[name=lcls_idcd]').reset();
								me.down('[name=mcls_idcd]').reset();
								me.down('[name=scls_idcd]').reset();
							}
						}
					}
					},{	name : 'lcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'mcls_idcd', xtype : 'textfield' , hidden : true
					},{	name : 'scls_idcd', xtype : 'textfield' , hidden : true
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1()]
			}
		;
		return item;
	},

	createTab1	: function() {
		var me	= this,
		item	= {
			title			: Language.get('full_addr','단가정보'),
			xtype			: 'form-panel',
			dock			: 'left',
			width			: 500,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 10 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '구매단가' ),
									name		: 'puch_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '견적단가' ),
									name		: 'esti_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 10 5 20',
									width		: 140,
									labelWidth	: 50,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '흑맥단면' ),
									name		: 'sprt_blwt_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '흑백양면' ),
									name		: 'dprt_blwt_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 10 5 20',
									width		: 140,
									labelWidth	: 50,
								}
							]
						},
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 0',
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 10',
								items	: [
								{	fieldLabel	: Language.get( '', '컬러단면' ),
									name		: 'sprt_colr_pric',
									xtype		: 'numericfield',
									width		: 140,
									labelWidth	: 50,
								},{	fieldLabel	: Language.get( '', '컬러양면' ),
									name		: 'dprt_colr_pric'  ,
									xtype		: 'numericfield',
									margin		: '0 10 5 20',
									width		: 140,
									labelWidth	: 50,
								}
							]
						},
					]
				}
			]
		}
		;
		return item;
	}
});