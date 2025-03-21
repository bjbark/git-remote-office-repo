Ext.define('module.custom.wontc.prod.order.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workbook-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workbook-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산작업일지',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-workbook-lister',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			}
		]
		me.callParent(arguments);
	}
});