Ext.define('module.basic.mngtsbscmast.view.MngtSbscMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-mngtsbscmast-layout',

	initComponent: function(config){
		var me = this;
		me.dockedItems.push( {xtype: 'module-mngtsbscmast-search' } ) ;
		me.items =  [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				layout	: 'fit',
				border	: false,
				items	: [
					{	title	: Language.get('base_list','관리항목 목록'),
						layout	: 'border' ,
						border	: 0,
						xtype	: 'module-mngtsbscmast-lister'
					}
				]
			},{
				xtype	: 'module-mngtsbscmast-editor' ,
				region	: 'south'
			}
		];
		me.callParent(arguments);
	}
});


