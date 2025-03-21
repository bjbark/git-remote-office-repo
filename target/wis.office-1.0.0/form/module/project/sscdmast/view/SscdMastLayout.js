Ext.define('module.project.sscdmast.view.SscdMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sscdmast-layout',

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
       me.dockedItems.push({xtype: 'module-sscdmast-search' }); // 검색조건
       me.items = [
        	{	xtype  : 'tab-panel',
        		itemId : 'mainpanel' ,
        		tabBar : buttons ,
        		items  : [
    		 		{ title: Language.get( 'code_list', '시스템 코드 목록' ) ,xtype : 'module-sscdmast-lister' }
    		 	]
        	},{	xtype: 'module-sscdmast-editor' ,region : 'south'
        	}
       ];
       me.callParent(arguments);
   }
});
