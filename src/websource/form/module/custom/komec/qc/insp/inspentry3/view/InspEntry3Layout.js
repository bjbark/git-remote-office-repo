Ext.define('module.custom.komec.qc.insp.inspentry3.view.InspEntry3Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-inspentry3-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-komec-inspentry3-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('istt_list','입고 리스트'), xtype : 'module-komec-inspentry3-lister' }
			]
		},{	xtype	: 'tab-panel',
			height	: 350,
			region : 'south',
			items	: [
				{	title: Language.get('unit_list','입고검사'),
					xtype : 'module-komec-inspentry3-lister1',
					layout:'fit',
					hidden : false
				}
			]
		}
	];
	me.callParent(arguments);
	}
});