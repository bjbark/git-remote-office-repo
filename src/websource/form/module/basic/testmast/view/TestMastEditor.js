Ext.define('module.basic.testmast.view.TestMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-testmast-editor',

	height : 260,
	layout : {
	type: 'border'
	},

	title			: Language.get('dept_idcd','부서 정보'),
	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'dept_idcd'	,

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
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	name	: 'dept_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('dept_code','부서코드'),
								name		: 'dept_code',
								xtype		: 'textfield'				,
								allowBlank	: false						,
								fieldCls	: 'requiredindex'			,
								emptyText	: Const.invalid.emptyValue	,
								width		: 255
							},{	xtype		: 'lookupfield'					,
								name		: 'line_stat'					,
								lookupValue	: resource.lookup('line_stat')	,
								width		: 55							,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('dept_name','부서명')	,
						xtype		: 'textfield'						,
						name		: 'dept_name'
					},{	fieldLabel	: Language.get('prnt_dept_name','상위부서'),
						xtype		: 'popupfield'		,
						name		: 'prnt_dept_name'	,
						pair		: 'prnt_idcd'		,
						editable	: true,
						clearable	: false ,
						enableKeyEvents : true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-dept-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'prnt_idcd', xtype : 'textfield' , hidden : true
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
					items	: [ me.createTab1() ]
				}
			;
			return item;
		},

		createTab1 : function() {
			var me = this,
				item = {
					title		: Language.get('user_memo','메모사항'),
					xtype		: 'form-panel',
					layout		: 'hbox',
					border		: 0,
					bodyStyle	: { padding: '5px' },
					items		: [
						{	fieldLabel	: '' 		,
							name		: 'user_memo',
							xtype		: 'textarea',
							emptyText	: '메모사항을 적어주십시오',
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