Ext.define('module.custom.iypkg.sale.order.estimast2.view.EstiMast2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estimast2-layout',
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
			dockedItems : [ { xtype: 'module-estimast2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	region	: 'north',
									layout	: 'border',
									border	: 0,
									flex : 60,
									items	: [
									{	xtype	: 'module-estimast2-lister-master',
										flex	: _global.hq_id.toUpperCase()!='N1000LIEBE'? 1000 : 50,
										split	: true,
										region	: 'west',
										style	: Const.borderLine.right
									},{	xtype	: 'module-estimast2-worker-lister5',
										flex	: 25,
										split	: true,
										hidden	: _global.hq_id.toUpperCase()!='N1000LIEBE'? true : false,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 40,
									items	: [
										{	title	: '견적내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast2-lister-detail',
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
												{	xtype	: 'module-estimast2-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
									},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estimast2-lister2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										}
									]
								}
							]
					 	},{	title	: '자재소요내역',
							layout	: 'border' ,
							hidden	: _global.hq_id.toUpperCase()=='N1000LIEBE'? true : false,
							border	: 0,
							items	: [
								{	xtype:'module-estimast2-worker-editor2', region:'north'
								},{	xtype:'module-estimast2-worker-lister2', region:'center' , style : Const.borderLine.top
								}
							]
						}
					 	,{	title	: '가공비내역',
							layout	: 'border' ,
							hidden	: _global.hq_id.toUpperCase()=='N1000LIEBE'? true : false,
							border	: 0,
							items	: [
								{	xtype:'module-estimast2-worker-editor3', region:'north'
								},{	xtype:'module-estimast2-worker-lister3', region:'center' , style : Const.borderLine.top
								}
							]
						},{	title	: '개발내역',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype:'module-estimast2-worker-editor4', region:'north'
								},{	xtype:'module-estimast2-worker-lister4', region:'center' , style : Const.borderLine.top
								},{	xtype:'module-estimast2-worker-editor5', region:'south'
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
				{	xtype:'module-estimast2-worker-editor', region:'north'
				},{	xtype:'module-estimast2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

