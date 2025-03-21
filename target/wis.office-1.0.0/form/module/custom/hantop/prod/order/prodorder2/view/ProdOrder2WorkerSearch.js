Ext.define('module.custom.hantop.prod.order.prodorder2.view.ProdOrder2WorkerSearch', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-prodorder2-worker-search',
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
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 10 0',
						items	: [
							{	fieldLabel	: Language.get('','계획번호')	,
								xtype		: 'textfield',
								name		: 'invc_numb',
								labelWidth	: 80,
								width		: 200,
								readOnly	: true,
							},{	fieldLabel	: Language.get('esti_date','계획일자'),
								xtype		: 'datefield',
								name		: 'invc_date',
								labelWidth	: 90,
								width		: 198,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('','Lot번호')	,
								xtype		: 'textfield',
								name		: 'lott_numb',
								labelWidth	: 80,
								width		: 200,
								hidden		: true
							}
						]
					}
				]
			}
		;
		return item;
	},
});