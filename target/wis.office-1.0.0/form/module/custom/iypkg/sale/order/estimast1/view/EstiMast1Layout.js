Ext.define('module.custom.iypkg.sale.order.estimast1.view.EstiMast1Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estimast1-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() , me.createWordCard() ];
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
			dockedItems : [ { xtype: 'module-estimast1-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-estimast1-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: '견적내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast1-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: 'amend내역',
											layout	: 'border',
											border	: 0,
											hidden	: true,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast1-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
									},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast1-lister2',
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
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-estimast1-worker-editor', region:'north'
				},{	xtype:'module-estimast1-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

