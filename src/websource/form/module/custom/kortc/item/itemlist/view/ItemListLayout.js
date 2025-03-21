Ext.define('module.custom.kortc.item.itemlist.view.ItemListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemlist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-itemlist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title: Language.get('item_list','품목리스트'),
					xtype : 'module-itemlist-lister'
				},{	title: Language.get('item_isos_list','수불내역'),
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-itemlist-work-search',
									split	: false,
									itemId	: 'search1',
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype : 'module-itemlist-isos',
									flex	: 1,
									split	: false,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						}
					]
				},{	title: Language.get('item_rett_list','반품내역'),
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-itemlist-work-search',
									split	: false,
									itemId	: 'search2',
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype : 'module-itemlist-rett',
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
		},{ xtype : 'module-itemlist-editor', region : 'south',  hidden : false
		}
	];
	me.callParent(arguments);
	}
});