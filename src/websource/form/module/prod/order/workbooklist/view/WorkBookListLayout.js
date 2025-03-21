Ext.define('module.prod.order.workbooklist.view.WorkBookListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-workbooklist-layout',
	layout:'card',
	activeItem: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-workbooklist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '품목별 공정 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-workbooklist-lister-master',
									split	: true,
									region	: 'north',
									flex	: 60
								},{	xtype	: 'module-workbooklist-lister-detail',
									split	: true,
									region	: 'center',
									flex	: 40
								}
							]
						}
					]
				}
			]
		};
		return card;
	},
});

