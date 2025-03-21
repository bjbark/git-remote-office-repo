Ext.define('module.custom.iypkg.sale.sale.salesumlist.view.SaleSumListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-salesumlist-layout',
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

	/**
	 *
	 */
	createListCard : function () {
		var me = this,
		card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-salesumlist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '매출집계 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-salesumlist-lister', region:'center' , style : Const.borderLine.top
								}
							]
						}
					]
				}
			]
		};
		return card;
	},

//	/**
//	 *
//	 */
//	createWordCard : function () {
//		var	card = {
//			layout	: 'border',
//			border	: 0 ,
//			items	: [
//				{	xtype:'module-estimast2-worker-editor', region:'north'
//				},{	xtype:'module-estimast2-worker-lister', region:'center' , style : Const.borderLine.top
//				}
//			]
//		};
//	return card;
//	}
});

