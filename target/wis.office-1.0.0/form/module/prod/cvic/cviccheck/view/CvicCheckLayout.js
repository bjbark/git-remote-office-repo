Ext.define('module.prod.cvic.cviccheck.view.CvicCheckLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cviccheck-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-cviccheck-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '설비코드 목록',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-cviccheck-lister-master', /*  상단  */
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
													{	xtype	: 'module-cviccheck-lister-detail',
														region	: 'center',
														style	: Const.borderLine.top
													}
												]
											},{	title	: '첨부파일',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-cviccheck-editorlister',
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
			},{	xtype : 'module-cviccheck-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});