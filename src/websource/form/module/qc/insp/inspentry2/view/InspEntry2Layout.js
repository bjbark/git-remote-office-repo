Ext.define('module.qc.insp.inspentry2.view.InspEntry2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inspentry2-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-inspentry2-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('unit_list','생산지시 리스트'), xtype : 'module-inspentry2-lister' }
			]
		},{	xtype	: 'tab-panel',
			height	: 350,
			region : 'south',
			items	: [
				{	title: Language.get('unit_list','공정검사'),
					xtype : 'module-inspentry2-lister1',
					layout:'fit',
					hidden : false
				}
			]
		}
	];
	me.callParent(arguments);
	}
});