Ext.define('module.prod.project.prjtprodplan2.view.PrjtProdPlan2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtprodplan2-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtprodplan2-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '세부 일정계획',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								flex : 1,
								items	: [
									{	xtype	: 'module-prjtprodplan2-lister-detail1',
										region	: 'center',
										split	: true,
										width	: 970,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-prjtprodplan2-lister-detail3',
										region	: 'center',
										split	: true,
										flex	: 1,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							}
						]
					}
				]
			}
		]
		me.callParent(arguments);
	}
});