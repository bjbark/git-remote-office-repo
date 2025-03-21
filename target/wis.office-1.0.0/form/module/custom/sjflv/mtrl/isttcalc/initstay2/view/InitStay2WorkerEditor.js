Ext.define('module.custom.sjflv.mtrl.isttcalc.initstay2.view.InitStay2WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-mtrl-initstay2-worker-editor',
	header	: false,
	height	: 45,
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			height		: 45,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '3 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
								{	fieldLabel	: Language.get('','이월일자'),
									xtype		: 'datefield',
									name		: 'trns_date',
									clearable	: true,
									margin		: '5 5 5 -10',
									width		: 146,
									labelWidth	: 50,
									root		: true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
								}
							]
							}
						]
					}
				]
			}
			]
		};
		return item;
	}
});
