Ext.define('module.custom.iypkg.prod.prodordr.view.ProdOrdrLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodordr-layout',

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-prodordr-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				layout : 'border',
				flex	: 1,
				region : 'center',
				items	: [
					{	region	: 'center',
						title	: '생산지시 내역',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-prodordr-master',
								flex	: 60,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	flex	: 40,
								split	: true,
								region	: 'center',
								layout	: 'border',
								items	: [
									{	xtype	: 'module-prodordr-worker-editor1',
										height	: 75,
										region	: 'north',
										border	: 0,
									},{	xtype	: 'module-prodordr-wkctdetail1',
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
												style	: 'text-align:center; color: #263c63; font-size:2em; margin-top:70',
												cls		: 'textTemp',
											},{	xtype : 'module-prodordr-detail',
												region	: 'center',
												flex	: 1,
											}
										]
									},
								]
							}
						]
					},{	region	: 'center',
						title	: '생산지시 등록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-prodordr-master2',
								flex	: 60,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	flex	: 40,
								split	: true,
								region	: 'center',
								layout	: 'border',
								items	: [
									{	xtype	: 'module-prodordr-worker-editor2',
										height	: 75,
										region	: 'north',
										border	: 0,
									},{	xtype	: 'module-prodordr-wkctdetail2',
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
											},{	xtype : 'module-prodordr-detail',
												region	: 'center',
												flex	: 1,
											}
										]
									},
								]
							},{ height	: 100,
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
												text	: '합 계',
												style	: 'text-align:center; font-size:2em; margin-top:30',
												cls		: 'textTemp',
											},
											{	xtype : 'module-prodordr-detail3',
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
			},
		];
		me.callParent(arguments);
	}
});

