Ext.define('module.eis.project.costreport.view.CostReportLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-costreport-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-costreport-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '작업내용',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-costreport-lister-master1',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title		: '자재구매내역',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-costreport-lister-master2',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title		: '공정별일자별 공수집계',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-costreport-lister-master3',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},{	xtype	: 'module-costreport-finder',
				region	: 'west',
				hidden	: false

			}
		]
		me.callParent(arguments);
	}
});