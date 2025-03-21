Ext.define('module.mtrl.po.poplan.view.PoPlanLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-poplan-layout',


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
			dockedItems	: [ {xtype: 'module-poplan-search'} ],
			items	: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
//					region	: 'north',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '주문리스트',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-poplan-lister-master1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '자재 소요랑',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype  : 'module-poplan-lister-master2',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										}
									]
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