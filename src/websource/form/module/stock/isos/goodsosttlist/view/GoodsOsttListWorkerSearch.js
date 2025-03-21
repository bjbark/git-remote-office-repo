Ext.define('module.custom.sjflv.sale.sale.salearlist2.view.goodsosttlistWorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-goodsosttlist-worker-search',
	height	: 50,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest()] ;
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			height		: 50,
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '0 0 0 0',
					items : [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '1 0 5 0',
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0,
								items : [
									{	fieldLabel	: Language.get('plan_year','년도'),
										xtype		: 'monthfield',
										name		: 'invc_date',
										fieldCls	: 'requiredindex',
										format		: 'Y'+'년',
										submitFormat: 'Y',
										width		: 150,
										labelWidth	: 50,
										margin		: '10 0 0 0',
										value		: new Date(new Date().getFullYear(), 0)
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
