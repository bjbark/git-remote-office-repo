Ext.define('module.qc.insp.inspentry51.view.InspEntry51Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inspentry51-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-inspentry51-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			height	: 350,
			items	: [
				{title	: '출고 검사',
					layout	: 'border' ,
					border	: 0,
					items	: [
						{	xtype	: 'module-inspentry51-lister1',
							flex	: 3 ,
							split	: true,
							region	: 'north',
							style	: Const.borderLine.bottom
						},{
							xtype	: 'tab-panel',
							itemId	: 'itempanel',
							split	: true,
							region	: 'center',
							flex	: 1 ,
							items	: [
								{	title	: '출고검사항목',
									layout	: 'border',
									border	: 0,
									region	: 'center',
									items	: [
										{	xtype	: 'module-inspentry51-detail',
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						}
					]
			 	},{	title		: '검사리스트',
					layout		: 'border',
					border		: 0,
					items		: [
						{	xtype	: 'module-inspentry51-lister2',
							flex	: 2,
							split	: true,
							region	: 'center',
							style	: Const.borderLine.bottom // Const.borderLine.bottom
						}
					]
				}
			]
		}
	];
	me.callParent(arguments);
	}
});