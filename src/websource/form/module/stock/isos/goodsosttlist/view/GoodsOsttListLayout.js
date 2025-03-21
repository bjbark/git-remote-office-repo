Ext.define('module.stock.isos.goodsosttlist.view.GoodsOsttListLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-goodsosttlist-layout',

//	layout		:'card',
//	activeItem	: 0,

	initComponent: function(config){
		var me		= this,
			buttons	= {
				items	: [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-goodsosttlist-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '출고리스트',
						xtype : 'module-goodsosttlist-lister-master1'
					},{	title : '출고리스트(품목별)',
						xtype : 'module-goodsosttlist-lister-master2',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					},{	title : '출고리스트(거래처별)',
						xtype : 'module-goodsosttlist-lister-master3',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					},{	title : '출고리스트(츨고현황)',
						xtype : 'module-goodsosttlist-lister-master4',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					}
				]
			}
		];
		me.callParent(arguments);
	}
//	createListCard : function () {
//		var card = {
//			layout		: 'border',
//			border		: 0 ,
//			dockedItems : [ {xtype: 'module-goodsosttlist-search'} ],
//			items : [
//				{	xtype	: 'tab-panel',
//					itemId	: 'mainpanel',
//					items	: [
//						{	title	: '출고리스트',
//							layout	: 'border',
//							border	: 0,
//							items	: [
//								{	region	: 'center',
//									layout	: 'border',
//									border	: 0,
//									items	: [
//										{	xtype	: 'module-goodsosttlist-lister-master1',
//											flex	: 2,
//											split	: true,
//											region	: 'center',
//										}
//									]
//								},
//							]
//						},{	title	: '출고리스트(품목별)',
//							layout	: 'border',
//							border	: 0,
//							items	: [
//								{	region	: 'center',
//									layout	: 'border',
//									border	: 0,
//									items	: [
//										{	xtype	: 'module-goodsosttlist-lister-master2',
//											flex	: 2,
//											split	: true,
//											region	: 'center',
//										}
//									],
//								},
//							],
//							hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false : true)
//						},{	title	: '출고리스트(거래처별)',
//							layout	: 'border',
//							border	: 0,
//							items	: [
//								{	region	: 'center',
//									layout	: 'border',
//									border	: 0,
//									items	: [
//										{	xtype	: 'module-goodsosttlist-lister-master3',
//											flex	: 2,
//											split	: true,
//											region	: 'center',
//										}
//									]
//								},
//							],
//							hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false : true)
//						}
//					]
//				}
//			]
//		}
//		return card;
//	}
});