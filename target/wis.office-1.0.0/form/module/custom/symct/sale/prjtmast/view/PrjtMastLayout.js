Ext.define('module.custom.symct.sale.prjtmast.view.PrjtMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '프로젝트 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prjtmast-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									}
								]
							}
						]
					}
				]
			},{	xtype : 'module-prjtmast-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});