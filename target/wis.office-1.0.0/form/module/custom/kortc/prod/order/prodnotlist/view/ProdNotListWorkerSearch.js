Ext.define('module.custom.kortc.prod.order.prodnotlist.view.ProdNotListWorkerSearch',{ extend: 'Axt.form.Search',
	alias: 'widget.module-prodnotlist-worker-search',
	style	: 'padding-left : 5px;' ,

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '5 5 5 0', padding: '0', border: 0 ,  },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' , },
				items			: [
				{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
					items : [
						{	fieldLabel	: Language.get('','생산불량율'),
							xtype		: 'textfield',
							name		: 'count',
							readOnly	: true,
							width		: 150,
							labelWidth	: 70,
							margin		: '0 0 0 10',
						}
					]
				}
			]
		};
		return line;
	},

});