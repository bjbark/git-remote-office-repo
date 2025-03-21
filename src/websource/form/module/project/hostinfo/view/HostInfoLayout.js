Ext.define('module.project.hostinfo.view.HostInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-hostinfo-layout',

	/**
	 *
	 */
    initComponent: function(config){
        var  me = this
        	,buttons = {
         		items: [
         		]
			}
        ;
        me.dockedItems.push({xtype: 'module-hostinfo-search' }); // 검색조건
        me.items = [
         	{	xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		items  : [
         		 	{	title: 'Server List' ,
         		 		xtype : 'module-hostinfo-lister'
         		 	}
         		]
         	},{
         		xtype: 'module-hostinfo-editor' ,region : 'south'
         	}
        ];
        me.callParent(arguments);
    }
});
