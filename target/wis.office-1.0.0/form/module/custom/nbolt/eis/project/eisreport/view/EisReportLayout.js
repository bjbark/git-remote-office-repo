Ext.define('module.custom.nbolt.eis.project.eisreport.view.EisReportLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-eisreport-layout',

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
			dockedItems : [ {xtype: 'module-eisreport-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산LOT별공정진행현황'	, xtype : 'module-eisreport-lister'
						}
					]
				}
			]
		}
		return card;
	}
});