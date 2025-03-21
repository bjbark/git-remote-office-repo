Ext.define('module.prod.basic.prodlineroute.view.ProdLineRouteItem', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-prodlineroute-lister-item',

	layout : {
		type: 'border'
	},
	defaultFocus	: 'wkct_mans',

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
					{	fieldLabel	: Language.get('wkfw_code','공정코드'),
						xtype		: 'textfield',
						name		: 'wkfw_code',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue
					},{	fieldLabel	: Language.get('wkfw_name','공정명')	,
						xtype		: 'textfield',
						name		: 'wkfw_name'
					}
				]
			}
		;
		return item;
	},
});