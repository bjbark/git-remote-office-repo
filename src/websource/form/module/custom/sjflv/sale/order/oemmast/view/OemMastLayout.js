Ext.define('module.custom.sjflv.sale.order.oemmast.view.OemMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sjflv-oemmast-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-sjflv-oemmast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: 'OEM 수주 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-sjflv-oemmast-lister-master',
									flex	: 2,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									itemId	: 'detailtab',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: 'OEM 원료출고 내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-oemmast-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: 'OEM 제품입고 내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-oemmast-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: 'OEM 생산비 내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-oemmast-lister-detail3',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return card;
	},

	/**
	 *
	 */
	createWordCard : function () {
		var card = {
				layout	: 'border',
				border	: 0,
				title	: 'OEM 원료출고 등록',
				items	: [
				    {	xtype:'module-sjflv-oemmast-lister-master2',
		    	    	region:'west',
		    	    	width	: 580,
		    	    	style	: Const.borderLine.left + Const.borderLine.right  ,
						split	: true
					},{	xtype:'module-sjflv-oemmast-lister-master3',
						region:'center',
						flex	: 1,
						style	: Const.borderLine.left + Const.borderLine.right  ,
						split	: true
					}
				]
		}
	return card;
	}
});

