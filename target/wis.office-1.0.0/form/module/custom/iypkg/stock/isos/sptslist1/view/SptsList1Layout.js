Ext.define('module.custom.iypkg.stock.isos.sptslist1.view.SptsList1Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-sptslist1-layout',
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
			dockedItems : [ { xtype: 'module-sptslist1-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '출하계획',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'panel',
									region	: 'center',
									layout	: 'border',
									border	: 0,
//									style	: Const.borderLine.top,
									items : [
										{	region	: 'north',
											flex	: 33,
											split	: true,
											layout	: 'border',
											items	: [
												{	xtype	: 'module-sptslist1-lister-date1',	//날짜가 출력될 공간
													region	: 'west',
													width	: 150,
													border	: 0,
													split	: true,
												},{	xtype	: 'module-sptslist1-lister',
													region	: 'center',
												}
											]
										},{	region	: 'center',
											flex	: 33,
											split	: true,
											layout	: 'border',
											items	: [
												{	xtype	: 'module-sptslist1-lister-date2',	//날짜가 출력될 공간
													region	: 'west',
													width	: 150,
													border	: 0,
													split	: true,
												},{	xtype	: 'module-sptslist1-lister2',
													region	: 'center',
												}
											]
										},{	region	: 'south',
											flex	: 33,
											split	: true,
											layout	: 'border',
											items	: [
												{	xtype	: 'module-sptslist1-lister-date3',	//날짜가 출력될 공간
													region	: 'west',
													border	: 0,
													width	: 150,
													split	: true,
												},{	xtype	: 'module-sptslist1-lister3',
													region	: 'center',
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
				{	xtype:'module-saleorder3-worker-editor', region:'north'
				},{	xtype:'module-saleorder3-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

