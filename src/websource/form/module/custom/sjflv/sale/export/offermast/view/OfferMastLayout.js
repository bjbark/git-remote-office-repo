Ext.define('module.custom.sjflv.sale.export.offermast.view.OfferMastLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-offermast-layout',
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
			dockedItems : [ { xtype: 'module-offermast-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: Language.get('Offer List', 'Offer List'),
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-offermast-lister-master',
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
										{	title	: Language.get('Offer Details', 'Offer Details'),
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-offermast-lister-detail',
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
				{	xtype:'module-offermast-worker-editor', region:'north'
				},{	xtype:'module-offermast-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

