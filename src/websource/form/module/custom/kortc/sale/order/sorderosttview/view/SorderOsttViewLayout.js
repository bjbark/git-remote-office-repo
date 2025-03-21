Ext.define('module.custom.kortc.sale.order.sorderosttview.view.SorderOsttViewLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sorderosttview-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-sorderosttview-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '거래처별 점유율',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sorderosttview-lister-master1',
									width	: 500,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-sorderosttview-lister-master1_1',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
						},{	title	: '월별 변동 추이',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sorderosttview-lister-master2',
									width	: 270,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-sorderosttview-lister-master2_1',
									flex	: 1,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
						},{	title	: '영업담당별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sorderosttview-lister-master3',
									width	: 300,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-sorderosttview-lister-master3_1',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
						},{	title	: '엔지니어별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							hidden	: true,
							items	: [
								{	xtype	: 'module-sorderosttview-lister-master4',
									flex	: 3.5,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-sorderosttview-lister-master4_1',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
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

