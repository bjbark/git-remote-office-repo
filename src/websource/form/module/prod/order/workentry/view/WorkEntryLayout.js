Ext.define('module.prod.order.workentry.view.WorkEntryLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-workentry-layout',

	initComponent: function(config){
	var me = this;

	me.dockedItems.push({xtype: 'module-workentry-search'}),
	me.items = [
		{	xtype	: 'tab-panel',
			itemId	: 'mainpanel',
			flex	: 1,
			items	: [
				{title: Language.get('','생산관리'		), xtype : 'module-workentry-lister-sjung'		, hidden: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false},
				{title: Language.get('','생산실적 조회'	), xtype : 'module-workentry-lister-sjung-history', hidden: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false},
				{title: Language.get('','생산일보'		), xtype : 'module-workentry-lister-sjung-daily', hidden: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false},
				{title: Language.get('unit_list','생산실적관리'), xtype : 'module-workentry-lister'		, hidden: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? false : true},
			]
		},{	xtype	: 'tab-panel',
			height	: 350,
			region  : 'south',
			hidden  : _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? false : true,
			items	: [
				{	title: Language.get('unit_list','생산내역'),
					xtype : 'module-workentry-editor',
					layout:'fit',
					hidden : false
				},{	title : '자재사용내역',
					xtype: 'module-workentry-lister1',
					listeners: {
						activate: function(tab){

						}
					},
				},{	title : '공정검사',
					xtype: 'module-workentry-lister2',
					listeners: {
						activate: function(tab){

						}
					},
				},{	title : '유실공수',
					xtype: 'module-workentry-lister3',
					listeners: {
						activate: function(tab){

						}
					},
				},{	title : '설비가동',
					xtype: 'module-workentry-lister4',
					listeners: {
						activate: function(tab){

						}
					},
				}
			]
		}
	];
	me.callParent(arguments);
	}
});