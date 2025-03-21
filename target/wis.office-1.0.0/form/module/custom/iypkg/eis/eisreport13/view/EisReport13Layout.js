Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport13Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport13-layout',

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
			dockedItems : [ {xtype: 'module-eisreport13-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월 담당자 및 거래처',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport13-lister1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport13-detail1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport13-chart1',
											flex	: 1,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]},

							]
						},{	title	: '담당자 목표대비 실적',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport13-lister2',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport13-detail2',
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport13-chart2',
											flex	: 2,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								},
							]
						},{	title	: '월 거래처 매출 및 수금 통계',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport13-lister3',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport13-detail3',
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport13-chart3',
											flex	: 2,
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