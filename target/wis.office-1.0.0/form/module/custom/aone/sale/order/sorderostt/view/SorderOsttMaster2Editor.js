Ext.define('module.custom.aone.sale.order.sorderostt.view.SorderOsttMaster2Editor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-sorderostt-lister-editor',
	height	: 82,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.aone.sale.order.sorderostt.store.SorderOsttMaster2' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 5 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	fieldLabel	: Language.get('ostt_date', '출고일자' ),
							name		: 'ostt_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						}
					]
				}
			]
		};
		return item;
	}
});
