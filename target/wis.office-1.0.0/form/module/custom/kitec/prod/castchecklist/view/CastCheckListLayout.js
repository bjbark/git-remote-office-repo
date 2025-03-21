Ext.define('module.custom.kitec.prod.castchecklist.view.CastCheckListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-castchecklist-layout',

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
			dockedItems : [ {xtype: 'module-castchecklist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '주조 CheckList',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-castchecklist-master',
											flex	: 1,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'module-castchecklist-detail',
											flex	: 1,
											region	: 'center',
											split	: true,
											style	: Const.borderLine.top
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