Ext.define('module.prod.wmold.wmoldcheck.view.WmoldCheckLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wmoldcheck-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-wmoldcheck-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: Language.get('acpt_numb', '목형코드')+' 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-wmoldcheck-lister-master', /*  상단  */
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
													{	xtype	: 'module-wmoldcheck-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '점검 내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-wmoldcheck-lister-detail2',
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
			},{	xtype : 'module-wmoldcheck-editor1',
				region	: 'south',
				hidden	: false
			},{	xtype : 'module-wmoldcheck-editor2',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});