Ext.define('module.user.usermast.view.UserMastListerItem', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-usermast-lister-item',

	layout	: {
		type : 'border'
	},
	defaultFocus : 'wkct_mans',

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
				fieldDefaults	: { width : 250, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 10 0',
						items	: [
							{	fieldLabel	: Language.get('user_code','사원코드'),
								xtype		: 'textfield',
								name		: 'user_code',
								readOnly	: true,
							},{	fieldLabel	: Language.get('user_name','사원명')	,
								xtype		: 'textfield',
								name		: 'user_name',
								readOnly	: true
							},{	fieldLabel	: Language.get('dept_name','근무부서')	,
								xtype		: 'textfield',
								name		: 'dept_name',
								readOnly	: true
							},{	fieldLabel	: Language.get('wkrn_name','직급')	,
								xtype		: 'textfield',
								name		: 'wkrn_name',
								readOnly	: true
							}
						]
					}
				]
			}
		;
		return item;
	},
});