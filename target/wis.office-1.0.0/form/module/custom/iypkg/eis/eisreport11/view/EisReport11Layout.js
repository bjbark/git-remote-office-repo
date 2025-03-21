Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport11-layout',

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
			dockedItems : [ {xtype: 'module-eisreport11-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월 거래처별 원단 매입 통계',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport11-lister1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout	: 'border',
									border	: 0,
									region	: 'center',
									items	: [
										{	xtype	: 'module-eisreport11-detail1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport11-chart1',
											flex	: 1,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]},
							]
						},{	title	: '월 거래처 매입 통계'			,layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport11-lister2',
									flex	: 4,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-eisreport11-chart2',
									flex	: 1.5,
									region	: 'south',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title	: '월 거래처 매입 및 지급 통계',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport11-lister3',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport11-detail3',
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport11-chart3',
											flex	: 2,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]},

							]
						}
					]
				}
			]
		}
	return card;
	}
});