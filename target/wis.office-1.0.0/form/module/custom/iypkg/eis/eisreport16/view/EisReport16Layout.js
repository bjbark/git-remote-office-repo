Ext.define('module.custom.iypkg.eis.eisreport16.view.EisReport16Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport16-layout',

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
			dockedItems : [ {xtype: 'module-eisreport16-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '원가 분석',
							layout		: 'border',
							border		: 0,
							items		: [
								{	flex	: 50,
									layout		: 'border',
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom,
									items	: [
										{	xtype	: 'module-eisreport16-worker-search',
											height	: 55,
											region	: 'north',
											style	: Const.borderLine.left + Const.borderLine.bottom
										},{	xtype	: 'module-eisreport16-lister1',
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.bottom
										}
									]
								},{	flex	: 50,
									layout		: 'border',
									border		: 0,
									region		: 'center',
									items		: [
										{	xtype	: 'module-eisreport16-worker-search2',
											height	: 45,
											region	: 'north',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	layout	: 'border',
											region	: 'center',
											flex	: 5,
											style	: Const.borderLine.left,
											items	: [
												{	xtype	: 'module-eisreport16-detail1',
													flex	: 1.1,
													region	: 'north',
													style	: Const.borderLine.left + Const.borderLine.top + Const.borderLine.bottom
												},{	xtype	: 'tab-panel',
													flex	: 2,
													items	: [
														{	xtype	: 'module-eisreport16-detail2',
															title	: '공정별 현황',
															region	: 'center',
															style	: Const.borderLine.left + Const.borderLine.top
														}
													]
												}
											]
										},{	xtype	: 'module-eisreport16-chart',
											flex	: 3,
											region	: 'south',
											style	: Const.borderLine.left
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