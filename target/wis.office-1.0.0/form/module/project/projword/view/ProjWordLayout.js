Ext.define('module.project.projword.view.ProjWordLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-projword-layout',

	/**
	 *
	 */
    initComponent: function(config){
    	var me = this;
        me.dockedItems.push({xtype: 'module-projword-search' }); // 검색조건
        me.items = [
         	{
         		xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		items  : [
     		 		{ title: '단어 리스트' ,xtype : 'module-projword-lister' }
     		 	]
         	},{
         		xtype: 'module-projword-editor' ,region : 'south'
         	}
        ];
        me.callParent(arguments);
    }
});
