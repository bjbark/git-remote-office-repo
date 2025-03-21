Ext.define('module.custom.hantop.prod.labelprint1.view.labelPrint1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-labelprint1-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-labelprint1-search' ,flex	: 5} ) ;
		me.callParent(arguments);
	}
});


