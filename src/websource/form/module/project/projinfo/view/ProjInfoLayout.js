Ext.define('module.project.projinfo.view.ProjInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-projinfo-layout',
	
	/**
	 * 
	 */
    initComponent: function(config){
    	var me = this,
        	buttons = 
        	{
        		items: 
        		[ 
     		 		{xtype: 'tbfill'},
     		 		{xtype: 'button' , text : Const.SELECT.text ,iconCls: Const.SELECT.icon ,action : Const.SELECT.action } 
     		 	]
        	}
        ;
        me.dockedItems.push({xtype: 'module-projinfo-search' }); // 검색조건
        me.items = 
        [
         	{ 
         		xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		tabBar : buttons ,
         		items  : 
         		[
     		 		{ xtype : 'module-projinfo-lister'  , title: '프로젝트 리스트' }
     		 	]
         	},{
         		xtype: 'module-projinfo-editor' ,region : 'south'  , title: '프로젝트 정보'
         	}
        ];
        me.callParent(arguments);
    }
});
