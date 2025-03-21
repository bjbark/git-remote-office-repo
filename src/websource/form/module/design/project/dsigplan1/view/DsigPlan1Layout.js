Ext.define('module.design.project.dsigplan1.view.DsigPlan1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dsigplan1-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dsigplan1-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '설계 대일정',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-dsigplan1-lister-detail1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-dsigplan1-finder',
				region	: 'west',
				hidden	: true
			}
		]
		me.callParent(arguments);
	}
});