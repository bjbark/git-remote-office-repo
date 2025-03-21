Ext.define('module.custom.iypkg.prod.prodplan.view.ProdPlanLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-prodplan-layout',

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prodplan-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산계획 내역',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-prodplan-master',
								flex	: 46,
								region	: 'west',
								split	: true,
							},{	xtype	: 'module-prodplan-master2',
								flex	: 45,
								region	: 'center',
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
												border	: 0,
												style	: 'text-align:center; font-size:2em; margin-top:70',
												cls		: 'textTemp',
											},{	xtype : 'module-prodplan-detail',
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
												border	: 0,
												style	: 'text-align:center; font-size:2em; margin-top:30',
												cls		: 'textTemp',
											},{	xtype : 'module-prodplan-detail2',
												region	: 'center',
												flex	: 1,
											}
										]
									},
								]
							}
						]
					},{	title	: '생산계획 등록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-prodplan-master3',
								flex	: 46,
								region	: 'west',
								split	: true,
							},{	xtype	: 'module-prodplan-master4',
								flex	: 45,
								region	: 'center',
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
												border	: 0,
												style	: 'text-align:center; font-size:2em; margin-top:70',
												cls		: 'textTemp',
											},{	xtype : 'module-prodplan-detail3',
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
												border	: 0,
												style	: 'text-align:center; font-size:2em; margin-top:30',
												cls		: 'textTemp',
											},{	xtype : 'module-prodplan-detail4',
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

