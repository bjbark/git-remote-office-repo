Ext.define('module.sale.order.slorlist7.view.SlorList7Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-slorlist7-layout',


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
			dockedItems	: [ {xtype: 'module-slorlist7-search'} ],
			items	: [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
//					region	: 'north',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '수주대비 납기현황', //대아 감리로 KPI데이터 임시로 생성 감리후 삭제예정
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype  : 'module-slorlist7-lister-master1',
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