Ext.define('module.qc.insp.inspentry52.view.InspEntry52Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inspentry52-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-inspentry52-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('unit_list','출고의뢰현황'), xtype : 'module-inspentry52-lister' }
			]
		},{	xtype	: 'tab-panel',
			height	: 350,

			region : 'south',
			items	: [
				{	title: Language.get('unit_list','출고검사'),
					xtype : 'module-inspentry52-lister1',
					layout:'fit',
					hidden : false
				},
//				{	title : '자재사용내역',
//					xtype: 'module-inspentry52-lister1',
//					listeners: {
//						activate: function(tab){
//
//						}
//					},
//				}
			]
		}
	];
	me.callParent(arguments);
	}
});