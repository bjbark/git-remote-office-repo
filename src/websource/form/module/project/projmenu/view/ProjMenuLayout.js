Ext.define('module.project.projmenu.view.ProjMenuLayout', { extend: 'Axt.form.Layout',
	alias: 'widget.module-projmenu-layout',
	/**
	 *
	 */
    initComponent: function(config){
        var me = this; me.dockedItems.push( {xtype: 'module-projmenu-search'}); // 검색조건
        // 화면내용
        me.items = [
         	{	xtype  : 'tab-panel',
         		itemId : 'mainpanel',
         		items: [
         		 	{	title	: 'Module 목록'  ,
         		 		layout	: { type: 'hbox', align: 'stretch' },
         		 		border	: 0,
	                    items	: [
      		 			 	{xtype : 'module-projmenu-lister', flex : 1 , margin : '0 1 0 0' }
          		     	]
         		 	}
         		]
         	},{	xtype : 'module-projmenu-editor', region : 'south',  hidden : false
         	}
        ];  // end. items
        me.callParent(arguments);
    }
});

