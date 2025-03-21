Ext.define('module.sale.project.prjttestordr.view.PrjtTestOrdrLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-prjttestordr-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-prjttestordr-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: '시험 생산 의뢰 내역',
						xtype	: 'module-prjttestordr-lister-master', /*  상단  */
						itemId	: 'master',
					}
				]
			},{	xtype : 'module-prjttestordr-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});