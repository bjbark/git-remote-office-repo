Ext.define('module.eis.project.arlist.view.ARListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-arlist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-arlist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '거래처별',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-arlist-lister-detail11',
								region	: 'west',
								style	: Const.borderLine.top,
								border	: 2
							},{	xtype	: 'module-arlist-lister-detail12',
								region	: 'center',
								style	: Const.borderLine.top,
								border	: 2
							}
						]
					},{	title	: '영업담당별',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-arlist-lister-detail21',
								region	: 'west',
								style	: Const.borderLine.top,
								border	: 2
							},{	xtype	: 'module-arlist-lister-detail22',
								region	: 'center',
								style	: Const.borderLine.top,
								border	: 2
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});