Ext.define('module.design.project.dsigfile.view.DsigFileLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dsigfile-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dsigfile-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'BOM 리스트',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-dsigfile-tree',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-dsigfile-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});