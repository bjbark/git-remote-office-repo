Ext.define('module.custom.aone.sale.order.sorderplan.view.SorderPlanEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-aone-sorderplan-editor',
	height	: 55,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
//		me.items = me.createTabs();
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			width		: 2000 ,
			fieldDefaults: { width : 280, labelWidth : 70, margin : '8 0 0 0'},
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '8 5 0 0',
					items	: [
						{	fieldLabel	: Language.get('invc_date', '조회년월' ),
							name		: 'invc_date',
							xtype		: 'monthfield',
							width		: 155,
							format		: 'Y-m',
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				}
			]
		};
		return item;
	},
});
