Ext.define('module.cust.oembmast.view.OembMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-oembmast-editor',

	height : 260,
	layout : {
	type: 'border'
	},

	collapsible 	: true	,
	collapsed		: true	,
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
							{	fieldLabel	: Language.get('oemb_idcd','코드'),
								name		: 'oemb_idcd',
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
							},{	xtype		: 'textfield', name : 'orig_oemb_idcd', hidden : true
							}
						]
					},{	fieldLabel	: Language.get('oemb_name','OEM명')	,
						xtype		: 'textfield'						,
						name		: 'oemb_name'					,
						allowBlank	: true								,
						width		: 390
					},{	fieldLabel	: Language.get('drtr_name','담당자')	,
						xtype		: 'popupfield',
						name		: 'drtr_name',
						pair		: 'drtr_idcd',
						clearable	: true,
						width		: 208,
						popup		: {
							widget	: 'lookup-user-popup',
							select	: 'SINGLE',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						},
						width		: 200
					},{	xtype		: 'textfield', name : 'drtr_idcd', hidden : true
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
				title		:  Language.get('','메모사항'),
				layout		: 'hbox'		,
				border		: 0				,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	name		: 'user_memo',
						xtype		: 'textarea',
						height		: 167,
						flex		: 1
					}
				]
			}
		;
		return item;
	}
});