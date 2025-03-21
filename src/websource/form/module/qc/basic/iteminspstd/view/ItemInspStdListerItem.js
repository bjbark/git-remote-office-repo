Ext.define('module.qc.basic.iteminspstd.view.ItemInspStdListerItem', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-iteminspstd-lister-item',

	layout : {
		type: 'border'
	},

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
							{	fieldLabel	: Language.get('insp_type_idcd','검사유형코드'),
								xtype		: 'textfield',
								name		: 'insp_type_code',
								readOnly	: true,
								width		: 250,
								labelWidth	: 80,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue
							},{	fieldLabel	: Language.get('insp_mthd_dvcd','검사방법')	,
								xtype		: 'lookupfield',
								name		: 'insp_mthd_dvcd',
								readOnly	: true,
								lookupValue : resource.lookup('insp_mthd_dvcd'),
								width		: 340,
								labelWidth	: 80,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('insp_type_name','검사유형명'),
								xtype		: 'textfield',
								name		: 'insp_type_name',
								readOnly	: true,
								width		: 250,
								labelWidth	: 80,
							}
						]
					}
				]
		}
		;
		return item;
	},
});