Ext.define('module.item.bomlistv2.view.BomListV2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bomlistv2-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push( {xtype: 'module-bomlistv2-search'});
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOM List',
						layout	: 'border',
						border	: 0,
						split	: true,
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								items	: [
									{	xtype	: 'module-bomlistv2-master',
										width	: 550 ,
										margin	: '0 1 0 0' ,
										region	: 'west',
										style	: Const.borderLine.right,
										split	: true
									},{	region	: 'center',
										layout	: 'border',
										border	: 0,
										flex	: 100,
										items	: [
											{	xtype	: 'module-bomlistv2-lister',
												flex	: 60 ,
												margin	: '0 1 0 0' ,
												region	: 'north',
												style	: Const.borderLine.left
											},{	xtype	: 'module-bomlistv2-img',
												flex	: 40 ,
												margin	: '0 1 0 0' ,
												region	: 'center',
												style	: Const.borderLine.left
											}
										]
									}
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});

