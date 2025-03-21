Ext.define('module.qc.insp.inspentry4.view.InspEntry4Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inspentry4-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-inspentry4-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('unit_list','검사대기현황'), xtype : 'module-inspentry4-lister' }
			]
		}
	];
	me.callParent(arguments);
	}
});