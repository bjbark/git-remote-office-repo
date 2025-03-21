Ext.define('module.project.hostddns.view.HostDdnsLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-hostddns-layout',

	/**
	 *
	 */
    initComponent: function(config){
        var  me = this
        ;
        me.dockedItems.push({xtype: 'module-hostddns-search' }); // 검색조건
        me.items =
        [
         	{
         		xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		items  : [
         		 	/* 첫번째 탭 */
         		 	{	title: 'Data Base Information' ,
         		 		xtype : 'module-hostddns-lister'
         		 	}
         		]
         	},{	xtype: 'module-hostddns-editor' ,region : 'south'
         	}
        ];
        me.callParent(arguments);
    }
});
