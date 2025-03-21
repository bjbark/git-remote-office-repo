Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-estientry-layout',
	layout:'card',
	activeItem: 0,


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
			dockedItems : [ { xtype: 'module-estientry-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '견적 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-estientry-lister-master',
									flex	: 1,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									itemId	: 'detailtab',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: '견적품목',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요내역',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry-tree',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재소요내역집계',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-estientry-detail2-search',
													split	: true,
													region	: 'north',
													style	: Const.borderLine.bottom
												},{	xtype	: 'module-estientry-lister-detail2',
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
				{	xtype:'module-estientry-worker-editor',
					region	: 'north',
					height	: 183,
				},{	xtype:'module-estientry-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

