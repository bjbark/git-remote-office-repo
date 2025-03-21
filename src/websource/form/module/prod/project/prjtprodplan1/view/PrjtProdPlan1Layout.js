Ext.define('module.prod.project.prjtprodplan1.view.PrjtProdPlan1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtprodplan1-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtprodplan1-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '작업 대일정',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-prjtprodplan1-lister-detail1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
//					,{	title	: 'BOM',
//						layout	: 'border',
//						border	: 0,
//						region	: 'center',
//						items	: [
//							{	xtype	: 'module-prjtprodplan1-lister-detail4',
//								region	: 'center',
//								style	: Const.borderLine.top
//							}
//						]
//					}
				]
			},{	xtype	: 'module-prjtprodplan1-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});