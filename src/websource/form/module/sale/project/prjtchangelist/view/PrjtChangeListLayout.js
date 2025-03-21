Ext.define('module.sale.project.prjtchangelist.view.PrjtChangeListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtchangelist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtchangelist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '설계변경 리스트',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prjtchangelist-lister', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: true,
										region	: 'center',
									}
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});