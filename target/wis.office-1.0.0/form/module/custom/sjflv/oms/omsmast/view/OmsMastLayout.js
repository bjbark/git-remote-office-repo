Ext.define('module.custom.sjflv.oms.omsmast.view.OmsMastLayout', { extend: 'Axt.form.Layout',

	 alias: 'widget.module-sjflv-omsmast-layout',

	initComponent: function(config){
		var me = this; me.dockedItems.push({xtype: 'module-sjflv-omsmast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title	: 'Sample 주문',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-sjflv-omsmast-lister',
								flex	:  2 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.bottom
							}
						]
					},{	title: Language.get('insptype_prod_list','Sample 목록'),
						xtype : 'module-sjflv-omsmast-smpl'
					},
				]
			},{	xtype  : 'module-sjflv-omsmast-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
