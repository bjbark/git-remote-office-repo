Ext.define('module.membership.inout.inotlist.view.InotListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inotlist-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-inotlist-search'}),
	me.items = [
		{xtype	: 'tab-panel',
		itemId	: 'mainpanel',
			items	: [
				{	title	: '레슨 현황',
					layout	: 'border',
					border	: 0,
					items	: [
						{	region	: 'center',
							layout	: 'border',
							border	: 0,
							items	: [
								{	xtype	: 'module-inotlist-lister', /*  상단  */
									itemId	: 'master',
									flex	: 60,
									split	: false,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-inotlist-editor',
									region	: 'north',
									hidden	: false
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