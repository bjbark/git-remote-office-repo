Ext.define('module.prod.basic.wkctcvicmast.view.WkctCvicMastListerItem', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-wkctcvicmast-lister-item',
	layout	: {
		type: 'border'
	},
	defaultFocus	: 'wkct_cvic',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createpannel()];
		me.callParent(arguments)  ;
	},

	createpannel : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 10 0',
						items	: [
							{	fieldLabel	: Language.get('wkct_idcd','공정코드'),
								xtype		: 'textfield',
								name		: 'wkct_idcd',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue
							},{	fieldLabel	: Language.get('wkct_name','공정명'),
								xtype		: 'textfield',
								name		: 'wkct_name'
							}
						]
					}
				]
			}
		;
		return item;
	},
});