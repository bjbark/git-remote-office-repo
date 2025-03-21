Ext.define('module.custom.komec.mtrl.po.purcwait.view.PurcWaitLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-komec-purcwait-layout',

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
			dockedItems : [ {xtype: 'module-komec-purcwait-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입고대기리스트'   , xtype : 'module-komec-purcwait-lister'
						}
					]
				}
			]
		}
		return card;
	}
});