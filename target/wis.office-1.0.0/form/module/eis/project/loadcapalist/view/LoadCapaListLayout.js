Ext.define('module.eis.project.loadcapalist.view.LoadCapaListLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-loadcapalist-layout',


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
			dockedItems : [ {xtype: 'module-loadcapalist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: 'Load/ Capa 현황',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-loadcapalist-chart1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-loadcapalist-chart2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-loadcapalist-chart3',
									flex	: 1,
									split	: true,
									region	: 'east',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title	: '설비별'	, xtype : 'module-loadcapalist-lister-detail1'
						},{	title	: '공정별'	, xtype : 'module-loadcapalist-lister-detail2'
						}
					]
				}
			]
		}
	return card;
	}
});