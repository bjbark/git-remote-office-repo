Ext.define('module.custom.iypkg.prod.workbookv2.view.WorkBookV2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workbookv2-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-workbookv2-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">대기중인 작업</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype	:  'module-workbookv2-lister',
							flex	: 1,
							region	: 'center',
							style	: Const.borderLine.bottom
						}
					]
				}
			]
		}
	];
	me.callParent(arguments);
	}
});