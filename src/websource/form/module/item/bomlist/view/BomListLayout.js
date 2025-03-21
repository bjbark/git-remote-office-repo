Ext.define('module.item.bomlist.view.BomListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bomlist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push( {xtype: 'module-bomlist-search'});
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOM List',
						layout	: 'border',
						border	: 0,
						split	: true,
						items	: [
							{	xtype	: 'module-bomlist-master',
								width	: 550 ,
								margin	: '0 1 0 0' ,
								region	: 'west',
								style	: Const.borderLine.right,
								split	: true
							},{	xtype	: 'module-bomlist-lister',
								flex	: 100 ,
								margin	: '0 1 0 0' ,
								region	: 'center',
								style	: Const.borderLine.left
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}

});

