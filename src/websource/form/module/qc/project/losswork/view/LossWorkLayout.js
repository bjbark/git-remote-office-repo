Ext.define('module.qc.project.losswork.view.LossWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-losswork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-losswork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '손실공수',
						layout	: 'border',
						border	: 0,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-losswork-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 60,
										split	: false,
										region	: 'north',
									},{	xtype	: 'module-losswork-editor',
										region	: 'north',
										hidden	: false
									},{	xtype	: 'tab-panel',
										itemId	: 'detail',
										split	: true,
										region	: 'south',
										flex	: 40,
										items	: [
											{	title	: '손실공수내역',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-losswork-lister-detail',
														region	: 'center',
													}
												]
											},{	title	: '이미지',
												layout	: 'border',
												border	: 0,
												region	: 'center',
												items	: [
													{	xtype	: 'module-losswork-lister-image',
														region	: 'center',
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
			},{	xtype : 'module-losswork-editor2',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});