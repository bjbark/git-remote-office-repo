Ext.define('module.prod.project.prjtworklist.view.PrjtWorkListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjtworklist-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjtworklist-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '생산작업일지',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-prjtworklist-lister-detail1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: '자재투입내역',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-prjtworklist-lister-detail2',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-prjtworklist-finder',
				region	: 'north',
				hidden	: false
			}
		]
		me.callParent(arguments);
	}
});