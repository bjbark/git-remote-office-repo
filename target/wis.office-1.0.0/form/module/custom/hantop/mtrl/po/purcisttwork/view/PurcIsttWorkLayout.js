Ext.define('module.custom.hantop.mtrl.po.purcisttwork.view.PurcIsttWorkLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-purcisttwork-layout',

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
			dockedItems : [ {xtype: 'module-purcisttwork-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고등록',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork-lister-search',
											height	:  105,
											split	: false,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype : 'module-purcisttwork-lister',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						},{	title	: Language.get('istt_list','입고리스트'),
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-purcisttwork-lister-master',
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
														{	xtype	: 'module-purcisttwork-lister-detail',
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
						}
					]
				}
			]
		}
		return card;
	}
});