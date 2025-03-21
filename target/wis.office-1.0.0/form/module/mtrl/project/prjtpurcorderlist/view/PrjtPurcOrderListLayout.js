Ext.define('module.mtrl.project.prjtpurcorderlist.view.PrjtPurcOrderListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-prjtpurcorderlist-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-prjtpurcorderlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-prjtpurcorderlist-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{
									xtype	: 'module-prjtpurcorderlist-detail',
									flex	: 1 ,
									region	: 'center',
									style	: Const.borderLine.top
								}
							]
						}
					]
				}
			]
		}
		return card;
	}
});