Ext.define('module.sale.project.prjtwork.view.PrjtWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtwork-search'}),
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
									{	xtype	: 'module-prjtwork-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: false,
										region	: 'north',
										style	: Const.borderLine.bottom
									},{	xtype	: 'module-prjtwork-editor',
										height	: 405,
										region	: 'north',
										hidden	: false
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
													{	xtype	: 'module-prjtwork-lister-detail1',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '설계 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false,
												items	: [
													{	xtype	: 'module-prjtwork-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '생산 대일정',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												hidden	: _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false,
												items	: [
													{	xtype	: 'module-prjtwork-lister-detail3',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '상담내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtwork-lister-detail4',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '첨부파일',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtwork-editorlister',
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
			},{	xtype : 'module-prjtwork-editor2',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});