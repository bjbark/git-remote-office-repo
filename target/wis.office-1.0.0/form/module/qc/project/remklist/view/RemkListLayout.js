Ext.define('module.qc.project.remklist.view.RemkListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-remklist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-remklist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '금형별 시험 생산 내역',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-remklist-lister-master1', /*  상단  */
										itemId	: 'master1',
										flex	: 50,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	title	: '시험 생산 내역',
										xtype	: 'module-remklist-lister-master2', /*  상단  */
										itemId	: 'master2',
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							},{	xtype	: 'tab-panel',
								itemId	: 'detail',
								split	: true,
								region	: 'center',
								layout: 'border',
								flex	: 40,
								items	: [
									{	title	: '시험 생산 검사 내역',
										layout	: 'border',
										border	: 0,
										region	: 'center',
										items	: [
											{	xtype	: 'module-remklist-lister-detail',
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
			},{	xtype : 'module-remklist-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});