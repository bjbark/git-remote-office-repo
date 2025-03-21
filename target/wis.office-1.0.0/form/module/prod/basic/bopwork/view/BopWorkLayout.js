Ext.define('module.prod.basic.bopwork.view.BopWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bopwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-bopwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOP 등록',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-bopwork-tree',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-bopwork-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});