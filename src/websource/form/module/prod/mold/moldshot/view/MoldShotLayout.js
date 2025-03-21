Ext.define('module.prod.mold.moldshot.view.MoldShotLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-moldshot-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-moldshot-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('acpt_numb', '금형코드')+' 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-moldshot-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
//										itemId	: 'mainpanel',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '점검 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-moldshot-lister-detail',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			},{	xtype : 'module-moldshot-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});