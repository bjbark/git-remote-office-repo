Ext.define('module.membership.inout.inotentry.view.InotEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inotentry-layout',

	initComponent: function(config){
	var me = this; me.dockedItems.push({xtype: 'module-inotentry-search'}),
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
								{	xtype	: 'module-inotentry-lister', /*  상단  */
									itemId	: 'master',
									flex	: 60,
									split	: false,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-inotentry-editor',
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