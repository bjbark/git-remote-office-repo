Ext.define('module.custom.aone.sale.order.sorderlist1.view.SorderList1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-sorderlist1-layout',


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
			dockedItems : [ {xtype: 'module-sorderlist1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId  : 'mainpanel',
					flex	:1,
					layout	: 'border',
					border	:0,
					activeTab : 0,
					items	: [
						{	title	: '날짜별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{   xtype  : 'module-sorderlist1-lister-master1',
//											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										},
									]
								},{ xtype  : 'module-sorderlist1-lister-editor',
									region : 'south',
								}
							]
						},{	title	: '거래처별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype  : 'module-sorderlist1-lister-master2',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '품명별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	xtype	: 'module-sorderlist1-lister-master3',
									flex	: 5.5,
									region	: 'west',
									split	: true,
									style	: Const.borderLine.right+ Const.borderLine.bottom
								},{ /*  하단  */
									xtype	: 'module-sorderlist1-lister-detail',
									flex	: 10,
									region	: 'center',
									split	: true,
									style	: Const.borderLine.left+ Const.borderLine.bottom
								}
							]
						},{	title	: '엔지니어별',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype  : 'module-sorderlist1-lister-master4',
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