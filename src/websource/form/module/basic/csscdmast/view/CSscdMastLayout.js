Ext.define('module.basic.csscdmast.view.CSscdMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-csscdmast-layout',

	/**
	 *
	 */
	initComponent: function(config){
		var me = this,
			buttons 	= {
				items	: [
					{xtype: 'tbfill'},
				]
			}
		;
		me.dockedItems.push({xtype: 'module-csscdmast-search' }); // 검색조건
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel' ,
				tabBar : buttons ,
				items  : [
					{ title: Language.get( 'code_list', '시스템 코드 목록' ) ,xtype : 'module-csscdmast-lister' }
				]
			},{	xtype: 'module-csscdmast-editor' ,region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
