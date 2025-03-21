Ext.define('module.qc.insp.inspentry5.view.InspEntry5Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-inspentry5-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-inspentry5-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('unit_list','출고의뢰현황'), xtype : 'module-inspentry5-lister' }
			]
		},{	xtype	: 'tab-panel',
			height	: 350,

			region : 'south',
			items	: [
				{	title: Language.get('unit_list','출고의뢰내역'),
					xtype : 'module-inspentry5-lister1',
					layout:'fit',
					hidden : false
				},
//				{	title : '자재사용내역',
//					xtype: 'module-inspentry5-lister1',
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