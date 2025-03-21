Ext.define('module.basic.basemast.view.BaseMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-basemast-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-basemast-search' } ) ;
		me.items =  [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				layout	: 'fit',
				border	: false,
				items	: [
					{	title	: Language.get('base_list','기초코드 목록'),
						layout	: 'border' ,
						border	: 0,
						xtype	: 'module-basemast-lister'
					}
				]
			},{
				xtype	: 'module-basemast-editor' ,
				region	: 'south'
			}
		];
		me.callParent(arguments);
	}
});


