Ext.define('module.prod.basic.prodlinemast.view.ProdLineMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-prodlinemast-editor',

	height : 255,
	layout : {
	type: 'border'
	},


	collapsible 	: true			,
	collapsed		: true			,
	defaultFocus	: 'wkct_idcd'	,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock()/*, me.createwest()*/];
		me.items = me.createwest();
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
				width : 3000,
				height: 600,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items	: [
					{	fieldLabel	: Language.get('wkfw_code','코드'),
						name		: 'wkfw_code',
						xtype		: 'textfield',
						allowBlank	: true,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						width		: 340
					},{ xtype		: 'lookupfield',
						name		: 'line_stat',
						lookupValue	: resource.lookup('line_stat'),
						width		: 55,
						margin		: '0 0 0 5'
						}
					]
					},{ fieldLabel	: Language.get('wkfw_name','코드명'),
						xtype		: 'textfield',
						name		: 'wkfw_name',
						allowBlank	: true,
						fieldCls	: 'requiredindex',
					},{ fieldLabel	: Language.get('remk_text','메모사항'),
						xtype		: 'textarea',
						name		: 'remk_text',
						height		: 120
					},
				]
			}
		;
		return item;
	},

});