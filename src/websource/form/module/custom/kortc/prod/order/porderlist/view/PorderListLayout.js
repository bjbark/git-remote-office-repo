Ext.define('module.custom.kortc.prod.order.porderlist.view.PorderListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-porderlist-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-porderlist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산지시 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-porderlist-lister-master',
									itemId	: 'master1',
									flex	:  50,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.top
								},{	xtype	: 'module-porderlist-lister-detail',
									itemId	: 'master2',
									flex	: 50,
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
					 	}
					]
				}
			]
		};
		return card;
	}
});

