Ext.define('module.item.itemunit.view.ItemUnitLayout', { extend  : 'Axt.form.Layout',
	alias	: 'widget.module-itemunit-layout',
	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-itemunit-search'}),
		me.items = [
			{	xtype		: 'tab-panel',
				itemId		: 'mainpanel',
				tabBar		: {
					items	: [
						{	xtype	: 'tbfill'
						},{	xtype	: 'button',
							itemId	: 'mainquery',
							text	: Const.SELECT.text,
							iconCls	: Const.SELECT.icon,
							action	: Const.SELECT.action,
							cls		: 'button-style'
						}
					]
				},
			items: [
				{	title: '계량 단위 목록', xtype : 'module-itemunit-lister' }
			]
			},{
				title	: '계량 단위 정보',
				xtype	: 'module-itemunit-editor',
				region	: 'south',
				hidden	: !_global.contract.isowner()
			}  /* 본사인 경우만 동작을 하도록 한다 */
		];
		me.callParent(arguments);
	}
});

