Ext.define('module.sale.project.prjtlist.view.PrjtListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtlist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtlist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '수주 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-prjtlist-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: false,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-prjtlist-editor',
										height	: 405,
										region	: 'north',
										hidden	: true
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'south',
										flex	: 40,
										items	: [
											{	title	: 'amend내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '설계 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '생산 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '상담내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-lister-detail4',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '첨부파일',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-editorlister',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '이미지',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtlist-img',
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
			},{	xtype : 'module-prjtlist-editor2',
				region	: 'south',
				hidden	: true
			}
		];
		me.callParent(arguments);
	}
});