Ext.define('module.design.project.dsigwork.view.DsigWorkLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-dsigwork-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-dsigwork-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '세부 일정계획',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-dsigwork-lister-detail1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title		: '작업일지',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-dsigwork-lister-master2',
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
					},{	title	: '대일정계획',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						hidden	: true,
						items	: [
							{	xtype	: 'module-dsigwork-lister-detail2',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-dsigwork-finder',
				region	: 'west',
				hidden	: true

			}
		]
		me.callParent(arguments);
	}
});