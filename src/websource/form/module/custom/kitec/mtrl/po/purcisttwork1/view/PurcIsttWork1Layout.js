Ext.define('module.custom.kitec.mtrl.po.purcisttwork1.view.PurcIsttWork1Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-purcisttwork1-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-purcisttwork1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고리스트',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork1-lister-master',
											flex	: 2,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											hidden	: true,
											items	: [
												{	title	: '입고현황',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													hidden	: true,
													items	: [
														{	xtype	: 'module-purcisttwork1-lister-detail',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
								},
							]
						},{	title	: '입고등록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork1-lister-search',
											height	: 110,
											split	: false,
											hidden	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype : 'module-purcisttwork1-lister',
											flex	: 1,
											split	: false,
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
		return card;
	}
});