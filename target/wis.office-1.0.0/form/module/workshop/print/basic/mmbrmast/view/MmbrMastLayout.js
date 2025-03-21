Ext.define('module.workshop.print.basic.mmbrmast.view.MmbrMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-mmbrmast-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-mmbrmast-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','회원 List'),
					xtype : 'module-mmbrmast-lister'
				},{	title: Language.get('item_isos_list','배송지'),
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype : 'module-mmbrmast-lister2',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						}
					]
				},{	title: Language.get('item_rett_list','거래실적'),
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype : 'module-mmbrmast-lister3',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						}
					]
				}
			]
		},{ xtype : 'module-mmbrmast-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});