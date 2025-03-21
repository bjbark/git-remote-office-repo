Ext.define('module.custom.iypkg.sale.sale.salelist.view.SaleListLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-salelist-layout',
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
			dockedItems : [ { xtype: 'module-salelist-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '일자별 매출현황',
							layout	: 'border' ,
							border	: 0,
							itemId	: 'esti_1',
							items	: [
								{	xtype:'module-salelist-worker-lister', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '거래처별 매출현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-salelist-worker-lister2', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '담당자별 매출현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-salelist-worker-lister3', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '품목별 매출현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-salelist-worker-lister4', region:'center' , style : Const.borderLine.top
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

