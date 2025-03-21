Ext.define('module.custom.dhtec.prod.bomwork.view.BomWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bomwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-bomwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOM 등록',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								flex : 1,
								items	: [
									{	xtype	: 'module-bomwork-lister1',
										region	: 'west',
										width	: 500,
										split	: true,
										style	: Const.borderLine.right
									},{	xtype	: 'module-bomwork-lister2',
										region	: 'center',
										flex	: 1,
										style	: Const.borderLine.left
									}
								]
							}
						]
					}/*,{	title	: '투입 자재현황',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	region	: 'center',
								layout	: 'border',
								border	: 0,
								flex : 1,
								items	: [
									{	xtype	: 'module-bomwork-tree2',
										region	: 'center',
										split	: true,
										width	: 705,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-bomwork-finder2',
										region	: 'center',
										split	: true,
										flex	: 1,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							}
						]
					}*/
				]
			},{	xtype	: 'module-bomwork-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});