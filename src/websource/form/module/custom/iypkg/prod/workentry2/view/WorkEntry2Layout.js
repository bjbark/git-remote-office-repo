Ext.define('module.custom.iypkg.prod.workentry2.view.WorkEntry2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workentry2-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workentry2-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				layout : 'border',
				flex	: 1,
				region : 'center',
				items	: [
					{	region	: 'center',
						title	: '외주입고현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-workentry2-master1',
								flex	: 40,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	flex	: 60,
								split	: true,
								region	: 'center',
								layout	: 'border',
								items	: [
									{	xtype	: 'module-workentry2-worker-search',
										height	: 105,
										region	: 'north',
										border	: 0,
									},{	xtype	: 'module-workentry2-detail1',
										flex	: 82,
										region	: 'center',
										border	: 0,
									}
								]
							},{ height	: 230,
								region : 'south',
								layout : 'border',
								items	: [
									{	region	: 'center',
										layout	: 'border',
										items	: [
											{	xtype	: 'label',
												region	: 'west',
												split	: true,
												width	: 120,
												text	: '원  단',
												style	: 'text-align:center; font-size:2em; margin-top:100',
												cls		: 'textTemp',
											},
											{	xtype : 'module-workentry2-detail-fabc',
												region	: 'center',
											}
										]
									},
								]
							}
						]
					},{	region	: 'center',
						title	: '외주입고등록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-workentry2-master2',
								flex	: 40,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	flex	: 60,
								split	: true,
								region	: 'center',
								layout	: 'border',
								items	: [
									{	xtype	: 'module-workentry2-worker-search2',
										height	: 105,
										region	: 'north',
										border	: 0,
									},{	xtype	: 'module-workentry2-detail2',
										flex	: 82,
										region	: 'center',
										border	: 0,
									}
								]
							},{ height	: 230,
								region : 'south',
								layout : 'border',
								items	: [
									{	region	: 'center',
										layout	: 'border',
										items	: [
											{	xtype	: 'label',
												region	: 'west',
												split	: true,
												width	: 120,
												text	: '원  단',
												style	: 'text-align:center; font-size:2em; margin-top:100',
												cls		: 'textTemp',
											},
											{	xtype : 'module-workentry2-detail-fabc',
												region	: 'center',
											}
										]
									},
								]
							}
						]
					},
				],
			},
		];
		me.callParent(arguments);
	}
});