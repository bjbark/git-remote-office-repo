Ext.define('module.project.daemoninfo.view.DaemonInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-daemoninfo-layout',

	/**
	 *
	 */
    initComponent: function(config){
        var  me = this
        ;
        me.dockedItems.push({xtype: 'module-daemoninfo-search' }); // 검색조건
        me.items =
        [
         	{
         		xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		items  :
         		[
         		 	{
         		 		title: '프로세스 현황' ,
         		 		xtype : 'module-daemoninfo-lister'
         		 	}
         		]
         	},{
         		xtype: 'module-daemoninfo-editor' ,region : 'south'
         	}
        ];
        me.callParent(arguments);
    }
});
