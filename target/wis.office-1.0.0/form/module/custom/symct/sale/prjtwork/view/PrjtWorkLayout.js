Ext.define('module.custom.symct.sale.prjtwork.view.PrjtWorkLayout', { extend: 'Axt.form.Layout',

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
										height	: 300,
										region	: 'north',
										hidden	: false
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'south',
										flex	: 40,
										items	: [
											{	title	: '부품내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-prjtwork-lister-detail2',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											}
// 1. 부품내역 amend내역 button 제거
//											,{	title	: 'amend내역',
//													layout	: 'border',
//													border	: 0,
//													region	: 'center',
//													items	: [
//														{	xtype	: 'module-prjtwork-lister-detail1',
//															region	: 'center',
//															style	: Const.borderLine.top
//														}
//													]
//											}
// 2. 부품내역 생산대일정 button 제거
//											,{	title	: '생산 대일정',
//												layout	: 'border',
//												border	: 0,
//												region	: 'center',
//												items	: [
//													{	xtype	: 'module-prjtwork-lister-detail3',
//														region	: 'center',
//														style	: Const.borderLine.top
//													}
//												]
//											}
// 3. 부품내역 상담내역 button제거
//											,{	title	: '상담내역',
//												layout	: 'border',
//												border	: 0,
//												region	: 'center',
//												items	: [
//													{	xtype	: 'module-prjtwork-lister-detail4',
//														region	: 'center',
//														style	: Const.borderLine.top
//													}
//												]
//											}
// 4. 부품내역 첨부파일 제거
//											,{	title	: '첨부파일',
//												layout	: 'border',
//												border	: 0,
//												region	: 'center',
//												items	: [
//													{	xtype	: 'module-prjtwork-editorlister',
//														region	: 'center',
//														style	: Const.borderLine.top
//													}
//												]
//											}
										]
									}
								]
							}
						]
					}
				]
			},{	xtype : 'module-prjtwork-editor2',
				region	: 'south',
				hidden	: true
			}
		];
		me.callParent(arguments);
	}
});