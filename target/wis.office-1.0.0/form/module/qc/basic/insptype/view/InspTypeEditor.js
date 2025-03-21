Ext.define('module.qc.basic.insptype.view.InspTypeEditor', { extend: 'Axt.form.Editor',

	 alias: 'widget.module-insptype-editor',

	height : 263,
	layout : {
	type: 'border'
	},


	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'insp_type_idcd'	,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
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
				fieldDefaults	: { width : 500, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('insp_type_code','검사유형코드'),
								name		: 'insp_type_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 330
							},{ xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5',
								editable	: false
							}
						]
					},{ fieldLabel	: Language.get('insp_type_name','검사유형명'),
						xtype		: 'textfield',
						name		: 'insp_type_name',
						allowBlank	: true,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 390
					},{	fieldLabel	: Language.get('insp_mthd_dvcd','검사방법'),
						xtype		: 'lookupfield',
						allowBlank	: false,
						editable	: false,
						fieldCls	: 'requiredindex',
						name		: 'insp_mthd_dvcd',
						emptyText	: Const.invalid.emptyValue,
						lookupValue	: resource.lookup('insp_mthd_dvcd')	,
						width		: 390
					},{	fieldLabel	: Language.get('wkct_name', '공정명' ),
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						width		: 390,
						clearable	: false ,
						popup		: {
							widget	: 'lookup-wkct-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp, line_stat : '0' },
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	name : 'wkct_idcd', xtype	: 'textfield', hidden : true
					},{	fieldLabel	: Language.get('smor_rate','시료(%)'),
						xtype		: 'numericfield',
						name		: 'smor_rate',
						width		: 390,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
						items : [
							{	fieldLabel	: Language.get('wkct_insp_yorn','공정검사'),
								xtype		: 'lookupfield',
								name		: 'wkct_insp_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 150,
							},{	fieldLabel	: Language.get('rcpt_insp_yorn','인수검사'),
								labelWidth : 50,
								xtype		: 'lookupfield',
								name		: 'rcpt_insp_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 120,
							},{	fieldLabel	: Language.get('last_insp_yorn','최종검사'),
								labelWidth : 50,
								xtype		: 'lookupfield',
								name		: 'last_insp_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 120,
							},
						]
					},{	fieldLabel	: Language.get('shpm_insp_yorn','출고검사'),
						xtype		: 'lookupfield',
						name		: 'shpm_insp_yorn',
						lookupValue	: resource.lookup('yorn'),
						width		: 150,
					},{	name : 'prnt_idcd', xtype : 'textfield' ,
						hidden : true
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
				items	: [ me.createTab1(), {title : '첨부파일',xtype: 'module-insptype-editorlister'}]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		:  Language.get('insp_cond','검사조건'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'insp_cond',
						xtype		: 'textarea',
						emptyText	: '검사조건을 적어주십시오',
						height		: 167,
						flex		: 1
					},{	fieldLabel	: '' ,
						name		: 'lookup_val',
						xtype		: 'textarea'  ,
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	}
});