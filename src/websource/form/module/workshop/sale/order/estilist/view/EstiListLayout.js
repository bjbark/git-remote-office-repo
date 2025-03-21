Ext.define('module.workshop.sale.order.estilist.view.EstiListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workshop-estilist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workshop-estilist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('esti_list','견적 목록'), xtype : 'module-workshop-estilist-lister'
					},{	title: Language.get('esti_list2','견적상세'),
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype : 'module-workshop-estilist-lister2',
										flex	: 1,
										split	: false,
										region	: 'center',
										style	: Const.borderLine.top
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
