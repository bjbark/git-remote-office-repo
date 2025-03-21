Ext.define('module.prod.jig.jigcheck.view.JigCheckLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-jigcheck-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-jigcheck-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '지그코드 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-jigcheck-lister-master', /*  상단  */
										flex	: 60,
										split	: true,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'tab-panel',
										split	: true,
										region	: 'center',
										flex	: 40,
										items	: [
											{	title	: '점검 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-jigcheck-lister-detail',
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
			},{	xtype : 'module-jigcheck-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});