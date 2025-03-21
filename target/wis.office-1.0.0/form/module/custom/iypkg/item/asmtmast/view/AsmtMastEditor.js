Ext.define('module.custom.iypkg.item.asmtmast.view.AsmtMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-asmtmast-editor',

	height : 350,
	layout : {
		type: 'border'
	},

	title			: Language.get('','부자재코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'amst_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					,'-','->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},
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
				width			: 400,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','부자재코드'),
								name		: 'asmt_code',
								xtype		: 'textfield',
								allowBlank	: false,	// 값이 필수로 필요함(필수값)
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 280
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								editable	: false,
								margin		: '0 0 0 5',
								value		: '0'
							}
						]
					},{	fieldLabel	: Language.get('','부자재명'),
						xtype		: 'textfield',
						name		: 'asmt_name',
						width		: 340,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
					},{	fieldLabel	: Language.get('','규격'),
						xtype		: 'textfield',
						name		: 'asmt_spec',
						width		: 340
					},{	fieldLabel	: Language.get('','자재구분'),
						xtype		: 'lookupfield',
						name		: 'asmt_dvcd',
						width		: 340,
						editable	: false,
						lookupValue	: resource.lookup('asmt_dvcd')
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
						     {	fieldLabel	: Language.get('unit_idcd','단위'),
						    	 xtype		: 'popupfield',
						    	 name		: 'unit_name',
						     	 pair		: 'unit_idcd',
						     	 width		: 100,
						     	 labelWidth	: 25,
						     	 margin : '0 0 0 75',
						     	 popup  : {
						     		 select : 'SINGLE',
						     		 widget : 'lookup-unit-popup',
						     		 params : { stor_grp : _global.stor_grp , line_stat : '0' },
						     		 result : function(records, nameField, pairField) {
						     			 nameField.setValue(records[0].get('unit_name'));
						     			 pairField.setValue(records[0].get('unit_idcd'));
						     	   		}
						     	  	}
						     },{	fieldLabel	: Language.get('','표준단가'),
						     		xtype		: 'numericfield',
						     		name		: 'stnd_pric',
						     		width		: 150,
						     		labelWidth	: 45,
						     		minValue	: 0,
						     		margin		: '0 0 0 15',
						     }
						   ]
						},{	xtype		: 'textfield',
				     		name		: 'unit_idcd',
				     		hidden		: true,
						},{	fieldLabel	: Language.get('sale_cstm_idcd','매출거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							clearable	: true,
							width		: 340,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , sale_cstm_yorn : '1', line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype		: 'textfield',
							name		: 'cstm_idcd',
							hidden		: true,
						},{	xtype		: 'textfield',
							name		: 'sale_cstm_idcd',
							hidden		: true,
						},{	fieldLabel	: Language.get('prod_name','제품코드'),
							xtype		: 'popupfield',
							name		: 'prod_name',
							pair		: 'prod_idcd',
							clearable	: true,
							width		: 340,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-prod-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('prod_name'));
									pairField.setValue(records[0].get('prod_idcd'));
								}
							}
					},{	xtype		: 'textfield',
						name		: 'prod_idcd',
						hidden		: true,
					},{	fieldLabel	: Language.get('','사용처'),
						xtype		: 'popupfield',
						name		: 'dept_name',
						pair		: 'dept_idcd',
						clearable	: true,
						width		: 340,
						popup  : {
							select : 'SINGLE',
							widget : 'lookup-dept-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								 nameField.setValue(records[0].get('dept_name'));
								 pairField.setValue(records[0].get('dept_idcd'));
								}
							}
					},{	xtype		: 'textfield', name : 'dept_idcd', hidden : true
					},{	fieldLabel	: Language.get('','관리번호'),
						xtype		: 'textfield',
						name		: 'mngt_numb',
						width		: 340,
					},{	xtype : 'textfield',	name : 'asmt_idcd'	, hidden : true,
					},{	xtype : 'textfield',	name : 'change'		, hidden : true,
					},{	xtype : 'textfield',	name : 'modify'		, hidden : true,
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
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [
				     	   me.createTab1(),
				     	   me.createTab2()
						]
		}
		;
		return item;
	},

	// 매입단가정보 Tab
	createTab1 : function() {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '매입단가정보'),
			xtype	: 'module-asmtmast-editor-lister',
		};
		return item;
	},

	// 용도 등 Tab
	createTab2 : function() {
		var me = this,
		item = {
			title	: '용도 등',
			xtype	: 'form-panel',
			dock	:'left',
			name	: 'edit_tab2',
			region	: 'center',
			fieldDefaults	: { width : 200, labelWidth : 80, labelSeparator : '' },
				items	: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 , margin : '10 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('','등록구분'),
								xtype		: 'lookupfield',
								name		: 'asmt_regi_dvcd',
								width		: 340,
								editable	: false,
								lookupValue	: resource.lookup('asmt_regi_dvcd')
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin:'0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('','관리일자'),
										xtype		: 'datefield',
										name		: '',
										width		: 200,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										listeners	: {
											chnage	: function(){

											}
										}

									}
								]
							},{	fieldLabel	: Language.get('','용도'),
								name		: 'asmt_usge',
								xtype		: 'textarea',
								height		: 150,
								width		: 500
							}
						]
					}
				]
			}
	;
	return item;
	}
});