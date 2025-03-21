Ext.define('module.project.storeinfo.view.StoreInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-storeinfo-layout',

	layout     : 'card',
	activeItem : 0,

	/**
	 *
	 */
    initComponent: function(config){
    	var me = this;
    	me.items = [ me.createListCard()];
    	me.callParent(arguments);
    },

	createListCard : function () {
		var me = this ,buttons =
		{
			items: [
     		 	{	xtype: 'tbfill'
		 		},{ xtype: 'button',  text : Const.SELECT.text, iconCls: Const.SELECT.icon , action : Const.SELECT.action, cls: 'button-style'
     		 	}
     		]
		};
		card =
		{
			layout      : 'border',
			border      : 0 ,
			dockedItems : [ {   xtype : 'module-storeinfo-search'} ],
			items		: [
			 	{
			 		xtype  : 'tab-panel',
			 		itemId : 'mainpanel' ,
			 		items  : [
			 		 	{	title: '매장 정보 현황' ,
			 		 		xtype : 'module-storeinfo-lister'
			 		  	}
			 		]
			 	},{
			 		xtype: 'module-storeinfo-editor' ,region : 'south'
			 	}
			]
		};
		return card;
	},

});


