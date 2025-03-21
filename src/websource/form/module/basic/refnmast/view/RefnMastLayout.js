Ext.define('module.basic.refnmast.view.RefnMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-refnmast-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-refnmast-search' } ) ;
		me.items =  [
			{	xtype	: 'panel',
				layout	: 'border',
				itemId	: 'mainpanel',
				region	: 'center',
				layout	: 'fit',
				flex	:1,
				items	: [
					{	xtype	: 'module-refnmast-lister',
					}
				]
			},{
				xtype	: 'module-refnmast-editor' ,
				region	: 'south'
			}
		];
		me.callParent(arguments);
	}
});


