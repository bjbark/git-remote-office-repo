Ext.define('module.custom.iypkg.eis.eisreport.view.EisReportLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-eisreport-layout',
	layout		:'card',

	initComponent: function(config){
	var me = this;
		me.dockedItems.push({xtype: 'module-eisreport-search'}),
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'fit',
			border		: 0 ,
			items : [
				{	layout	: 'border',
					region	: 'center',
					border	: 0,
					items : [
						{	flex	: 1,
							layout	: 'border',
							region	: 'north',
							items	: [
								{	xtype	: 'module-eisreport-editor',
									region	: 'west',
									flex	: 1,
								},{	xtype	: 'module-eisreport-editor2',
									flex	: 1,
									region	: 'center',
								},{	xtype	: 'module-eisreport-editor3',
									flex	: 1,
									region	: 'east',
								}
							]
						},{	region	: 'center',
							flex	: 1,
							split	: true,
							layout	: 'border',
							items	: [
								{	xtype	: 'module-eisreport-editor4',
									region	: 'west',
									flex	: 1,
								},{	xtype	: 'module-eisreport-editor5',
									flex	: 1,
									region	: 'center',
								},{	xtype	: 'module-eisreport-editor6',
									flex	: 1,
									region	: 'east',
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