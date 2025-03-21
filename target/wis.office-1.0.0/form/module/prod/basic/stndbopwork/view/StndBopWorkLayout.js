Ext.define('module.prod.basic.stndbopwork.view.StndBopWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-stndbopwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-stndbopwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOP 등록',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-stndbopwork-tree',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-stndbopwork-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});