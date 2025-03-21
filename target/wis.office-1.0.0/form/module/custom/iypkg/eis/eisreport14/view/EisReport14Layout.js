Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport14-layout',

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
			dockedItems : [ {xtype: 'module-eisreport14-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월 담당자 및 거래처',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport14-worker-search',
									height	: 45,
									region	: 'north',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-eisreport14-lister1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region		: 'center',
									items		: [
										{	xtype	: 'module-eisreport14-detail1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport14-chart1',
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
								{	xtype	: 'module-eisreport14-worker-search2',
									height	: 45,
									region	: 'north',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-eisreport14-lister2',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region		: 'center',
									items		: [
										{	xtype	: 'module-eisreport14-detail2',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport14-chart2',
											flex	: 1,
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