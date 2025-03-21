Ext.define('module.prod.mold.moldcheck.view.MoldCheckLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-moldcheck-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-moldcheck-search'}),
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
									{	xtype	: 'module-moldcheck-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '수리 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-moldcheck-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '점검 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-moldcheck-lister-detail2',
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
			},{	xtype : 'module-moldcheck-editor1',
				region	: 'south',
				hidden	: false
			},{	xtype : 'module-moldcheck-editor2',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});