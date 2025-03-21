Ext.define('module.custom.komec.prod.workbook.view.WorkBookLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-workbook-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-komec-workbook-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{	title	: '<span class= "btnTemp"style="font-size:15px; color:#15498b;">'+Language.get('ready_work', '대기중인 작업')+'</span>',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype : 'module-komec-workbook-detail',
							flex	: 1,
							region	: 'center',
						}
					]
				},
			]
		}
	];
	me.callParent(arguments);
	}
});