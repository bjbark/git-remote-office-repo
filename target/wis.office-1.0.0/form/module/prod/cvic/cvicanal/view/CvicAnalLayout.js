Ext.define('module.prod.cvic.cvicanal.view.CvicAnalLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cvicanal-layout',

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
			dockedItems : [ {xtype: 'module-cvicanal-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title		: '설비별',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-cvicanal-lister1',
									width	: 300,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-cvicanal-chart1',
									flex	: 1,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-cvicanal-chart2',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: '일자별',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-cvicanal-lister1',
									width	: 300,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-cvicanal-chart21',
									flex	: 1,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.top
								},{	xtype	: 'module-cvicanal-chart22',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
								}
							]
						},{	title		: '비가동 원인별',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-cvicanal-lister2',
									width	: 180,
									split	: true,
									region	: 'west',
									style	: Const.borderLine.left + Const.borderLine.bottom
								},{	xtype	: 'module-cvicanal-chart31',
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.left + Const.borderLine.top
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