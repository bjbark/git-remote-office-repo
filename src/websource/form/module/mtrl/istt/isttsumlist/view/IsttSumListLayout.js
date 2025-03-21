Ext.define('module.mtrl.istt.isttsumlist.view.IsttSumListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-isttsumlist-layout',

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
			dockedItems : [ {xtype: 'module-isttsumlist-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '거래처별',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype : 'module-isttsumlist-lister',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '품목별',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
									    {	xtype : 'module-isttsumlist-lister-master',
											flex	: 1,
											split	: false,
											region	: 'center',
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