Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-workentry-layout',

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-workentry-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				layout : 'border',
				flex	: 1,
				region : 'center',
				items	: [
					{	region	: 'center',
						title	: '생산실적 현황',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-workentry-master1',
								width	: 940,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	xtype	: 'module-workentry-master2',
								flex	: 1,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.left
							},{ height	: 180,
								region : 'south',
								layout : 'border',
								items	: [
									{	region	: 'center',
										layout	: 'border',
										border	: 0,
										items	: [
											{	xtype	: 'label',
												region	: 'west',
												split	: true,
												width	: 100,
												text	: '원  단',
												style	: 'text-align:center; font-size:2em; margin-top:70',
												cls		: 'textTemp',
											},{	xtype : 'module-workentry-detail1',
												region	: 'center',
												flex	: 1,
											}
										]
									},
								]
							}
						]
					},{	region	: 'center',
						title	: '생산실적 등록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-workentry-master3',
								flex	: 45,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	flex	: 55,
								split	: true,
								region	: 'center',
								layout	: 'border',
								items	: [
									{	xtype	: 'module-workentry-worker-editor2',
										height	: 75,
										region	: 'north',
										border	: 0,
									},{	xtype	: 'module-workentry-master4',
										flex	: 82,
										region	: 'center',
										border	: 0,
									}
								]
							},{ height	: 180,
								region : 'south',
								layout : 'border',
								items	: [
									{	region	: 'center',
										layout	: 'border',
										border	: 0,
										items	: [
											{	xtype	: 'label',
												region	: 'west',
												split	: true,
												width	: 100,
												text	: '원  단',
												style	: 'text-align:center; font-size:2em; margin-top:70',
												cls		: 'textTemp',
											},{	xtype : 'module-workentry-detail2',
												region	: 'center',
												flex	: 1,
											}
										]
									},
								]
							}
						]
					},
				],
			}
		];
		me.callParent(arguments);
	}
});

