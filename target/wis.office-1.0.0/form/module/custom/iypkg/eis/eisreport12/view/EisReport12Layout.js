Ext.define('module.custom.iypkg.eis.eisreport12.view.EisReport12Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport12-layout',

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
			dockedItems : [ {xtype: 'module-eisreport12-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '월 외주처 및 공정 별 매입 통계',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport12-lister1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport12-detail1',
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport12-chart1',
											flex	: 2,
											split	: true,
											region	: 'south',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								},
							]
						},{	title	: '월 매입처 상품 매입 통계',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport12-lister2',
									width	: 675,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	layout		: 'border',
									border		: 0,
									flex		: 3,
									region	: 'center',
									items		: [
										{	xtype	: 'module-eisreport12-detail2',
											flex	: 2,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										},{	xtype	: 'module-eisreport12-chart2',
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