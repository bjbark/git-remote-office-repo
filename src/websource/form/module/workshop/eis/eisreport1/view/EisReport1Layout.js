Ext.define('module.workshop.eis.eisreport1.view.EisReport1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport1-layout',

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
			dockedItems : [ {xtype: 'module-eisreport1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '납기준수율',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-eisreport1-lister', /*  상단  */
											flex	: 1,
											split	: true,
											region	: 'center',
											style	: Const.borderLine.bottom //Const.borderLine.left +
										}
									]
								},
							]
						},{	title		: 'KPI 전송',
							layout		: 'border',
							border		: 0,
							items		: [
								{	xtype	: 'module-eisreport1-lister2',
									split	: true,
									region	: 'center',
									style	: Const.borderLine.bottom
								}
							]
						}
					]
				}
			]
		}
		return card;
	},
});