Ext.define('module.sale.order.slorlist6.view.SlorList6Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-slorlist6-layout',
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
			dockedItems : [ { xtype: 'module-slorlist6-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수주건별생산현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-slorlist6-lister-master',
									split	: true,
									region	: 'center',
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

