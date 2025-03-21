Ext.define('module.custom.iypkg.mtrl.purc.purccstmlist1.view.PurcCstmList1Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-purccstmlist1-layout',
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
			dockedItems : [ { xtype: 'module-purccstmlist1-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '원단 매입원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purccstmlist1-lister', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '외주 매입원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purccstmlist1-lister2', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '상품 매입원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purccstmlist1-lister3', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '부자재 매입원장',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-purccstmlist1-lister4', region:'center' , style : Const.borderLine.top
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

