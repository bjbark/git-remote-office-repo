Ext.define('module.design.project.dsigplan2.view.DsigPlan2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dsigplan2-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dsigplan2-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '세부 일정계획',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-dsigplan2-lister-detail1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: '대일정계획',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						hidden	: _global.hq_id.toUpperCase()=='N1000WONTC'? true  : false,
						items	: [
							{	xtype	: 'module-dsigplan2-lister-detail3',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-dsigplan2-finder',
				region	: 'west',
				hidden	: true

			}
		]
		me.callParent(arguments);
	}
});