Ext.define('module.project.bonsainfo.view.BonsaInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-bonsainfo-layout',

	/**
	 *
	 */
    initComponent: function(config){
        var  me = this
        ;
        me.dockedItems.push({xtype: 'module-bonsainfo-search' }); // 검색조건
        me.items = [
         	{	xtype  : 'tab-panel',
         		itemId : 'mainpanel' ,
         		items  : [
         		 	/* 첫번째 탭 */
         		 	{	title: '연동정보 리스트' ,
         		 		xtype : 'module-bonsainfo-lister'
         		 	}
         		]
         	},{	xtype: 'module-bonsainfo-editor' ,region : 'south'
         	}
        ];
        me.callParent(arguments);
    }
});
