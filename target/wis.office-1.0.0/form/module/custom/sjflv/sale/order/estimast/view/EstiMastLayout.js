Ext.define('module.custom.sjflv.sale.order.estimast.view.EstiMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sjflv-estimast-layout',
	layout:'card',
	activeItem: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() , me.createWordCard2()];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-sjflv-estimast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-sjflv-estimast-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									itemId	: 'master',
									style	: Const.borderLine.bottom
								},{	xtype	: 'module-sjflv-estimast-editor',
									height	: 240,
									region	: 'south',
									hidden	: false,
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
												{	xtype	: 'module-sjflv-estimast-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '첨부파일',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-sjflv-estimast-lister2',
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

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
				dockedItems : [ { xtype: 'module-sjflv-estimast-worker-editor2' } ],
				layout	: 'border',
				border	: 0 ,
				items	: [
				{	xtype	:'module-sjflv-estimast-worker-lister3',
					region	:'west' ,
					style	: Const.borderLine.right,
					flex	: 1.4,
					split	: true
				}
			]
		};
	return card;
	},

	createWordCard2 : function () {
		var	card = {
			dockedItems : [ { xtype: 'module-sjflv-estimast-worker-editor' } ],
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype	:'module-sjflv-estimast-worker-lister4',
					region	:'west' ,
					style	: Const.borderLine.right,
					flex	: 3.5,
					split	: true
				},{	xtype	:'module-sjflv-estimast-worker-lister',
					region	:'center' ,
					style	: Const.borderLine.right,
					flex	: 3.3,
					split	: true
				},{	xtype	:'module-sjflv-estimast-worker-lister2',
					region	:'east' ,
					style	: Const.borderLine.left,
					flex	: 6.4
				}
			]
		};
	return card;
	}
});

