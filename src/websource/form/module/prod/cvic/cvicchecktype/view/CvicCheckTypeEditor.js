Ext.define('module.prod.cvic.cvicchecktype.view.CvicCheckTypeEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-cvicchecktype-editor',

	height : 260,
	layout : {
	type: 'border'
	},


	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'insp_type_idcd'	,
	initComponent: function(config){
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
				xtype			: 'form-panel'		,
				dock			: 'left'			,
				width			: 500				,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 80, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('chek_type_code','점검유형코드'),
								name		: 'chek_type_code',
								xtype		: 'textfield'				,
								allowBlank	: false						,
								fieldCls	: 'requiredindex'			,
								emptyText	: Const.invalid.emptyValue	,
								width		: 330
							},{	xtype		: 'lookupfield'					,
								name		: 'line_stat'					,
								lookupValue	: resource.lookup('line_stat')	,
								width		: 55							,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('chek_type_name','점검유형명')	,
						xtype		: 'textfield'						,
						name		: 'chek_type_name'					,
						allowBlank	: true								,
						fieldCls	: 'requiredindex'					,
						emptyText	: Const.invalid.emptyValue			,
						width		: 390
					},{	fieldLabel	: Language.get('chek_mthd_dvcd','점검방법')	,
						xtype		: 'lookupfield',
						name		: 'chek_mthd_dvcd',
						lookupValue	: resource.lookup('chek_mthd_dvcd'),
						width		: 200
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
				plain	: true	,
				items	: [ me.createTab1() ]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		:  Language.get('chek_cond','점검조건'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'chek_cond',
						xtype		: 'textarea',
						emptyText	: '점검조건을 적어주십시오',
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