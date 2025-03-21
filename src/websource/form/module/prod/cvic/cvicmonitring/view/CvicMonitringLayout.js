Ext.define('module.prod.cvic.cvicmonitring.view.CvicMonitringLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-cvicmonitring-layout',

	initComponent: function(config){
	var me = this;
	me.dockedItems.push({xtype: 'module-cvicmonitring-search'}),
	me.items = [
		{	layout : 'border',
			flex	: 1,
			region : 'center',
			items	: [
				{	region	: 'center',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype : 'module-cvicmonitring-chart1', /*  상단  */
							flex	: 5,
							split	: true,
							region	: 'west',
							style	: Const.borderLine.right //Const.borderLine.left +
						},{	xtype : 'module-cvicmonitring-runnstop', /*  상단  */
							flex	: 1,
							split	: true,
							region	: 'center',
						}
					]
				},
			],
		},{ height	: 350,
			region : 'south',
			layout : 'border',
			items	: [
				{	region	: 'center',
					layout	: 'border',
					border	: 0,
					items	: [
						{	xtype : 'module-cvicmonitring-chart2',
							flex	: 5,
							split	: true,
							region	: 'west',
							style	: Const.borderLine.right //Const.borderLine.left +
						},{	xtype : 'module-cvicmonitring-runndata',
							flex	: 1,
							split	: true,
							region	: 'center',
						}
					]
				},
			]
		}
	];
	me.callParent(arguments);
	}
});