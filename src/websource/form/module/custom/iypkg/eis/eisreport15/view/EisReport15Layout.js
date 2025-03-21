Ext.define('module.custom.iypkg.eis.eisreport15.view.EisReport15Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport15-layout',

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
			dockedItems : [ {xtype: 'module-eisreport15-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title		: '생산 통계 분석',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport15-lister',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region		: 'center',
									items		: [
										{	xtype	: 'module-eisreport15-detail',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport15-chart',
											flex	: 1,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
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