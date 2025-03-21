Ext.define('module.project.moduleinfo.view.ModuleInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-moduleinfo-layout',

	/**
	 *
	 */
    initComponent: function(config){
        var me = this; me.dockedItems.push( {xtype: 'module-moduleinfo-search'}); // 검색조건
        // 화면내용
        me.items = [
         	{	xtype  : 'tab-panel',
         		itemId : 'mainpanel',
         		items: [
         		 	{	title	: 'Module 목록'  ,
         		 		layout	: { type: 'hbox', align: 'stretch' },
         		 		border	: 0,
	                    items	: [
      		 			 	{xtype : 'module-moduleinfo-lister', flex : 1 , margin : '0 1 0 0' }
          		     	]
         		 	}
         		]
         	},{	xtype : 'module-moduleinfo-editor', region : 'south',  hidden : false
         	}
        ];  // end. items
        me.callParent(arguments);
    }
});

