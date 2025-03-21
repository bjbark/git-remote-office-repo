Ext.define('module.custom.aone.sale.order.sordersumlist2.view.SorderSumList2Layout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-sordersumlsit2-layout',

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
			dockedItems : [ {xtype: 'module-sordersumlist2-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '입출고현황',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype : 'module-sordersumlist2-lister',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '담당별 수리실적',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
									    {	xtype : 'module-sordersumlist2-lister2',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								},
							]
						},{	title	: '업체별 입출고',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
									    {	xtype : 'module-sordersumlist2-lister3',
											flex	: 1,
											split	: false,
											region	: 'center',
											style	: Const.borderLine.top
										}
									]
								},
							]
						},{	title	: '년간 입출고',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
									    {	xtype : 'module-sordersumlist2-lister4',
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