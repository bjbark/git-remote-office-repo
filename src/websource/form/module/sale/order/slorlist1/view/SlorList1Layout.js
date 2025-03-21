Ext.define('module.sale.order.slorlist1.view.SlorList1Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-slorlist1-layout',


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
			dockedItems : [ {xtype: 'module-slorlist1-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId  : 'mainpanel',
//					region	: 'north',
					flex	:1,
					layout	: 'border',
					border	:0,
					items	: [
						{	title	: '수주건별잔량현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype  : 'module-slorlist1-lister-master0',
											flex   : 1,
											region : 'center',
											style  : Const.borderLine.left + Const.borderLine.top
										}
									]
								}
							]
						},{	title	: '집계분석현황',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
												{	xtype	: 'tab-panel',
													itemId  : 'subpanel',
//													region	: 'north',
													flex	:1,
													layout	: 'border',
													border	:0,
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
																		{	xtype  : 'module-slorlist1-lister-master1',
																			flex   : 1,
																			region : 'center',
																			style  : Const.borderLine.left + Const.borderLine.top
																		}
																	]
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
																		{	xtype  : 'module-slorlist1-lister-master2',
																			flex   : 1,
																			region : 'center',
																			style  : Const.borderLine.left + Const.borderLine.top
																		}
																	]
																}
															]
														},{	title	: '품목별',
															layout	: 'border',
															border	: 0,
															region	: 'center',
															items	: [
																{	region	: 'center',
																	layout	: 'border',
																	border	: 0,
																	items	: [
																		{	xtype	: 'module-slorlist1-lister-master3',
																			flex	: 1,
																			region	: 'center',
																			style	: Const.borderLine.left + Const.borderLine.top
																		}
																	]
																}
															]
														}
													]
												},{	xtype	: 'tab-panel',
													region	: 'south',
													flex	:1,
													border	:0,
													split	: true,
													items	:[
														{	title	: '상세내역',
															xtype	: 'module-slorlist1-lister-detail',
															region	: 'south',
															border	:0,
															split	: true
														}
													]
												}
										]
								}
							]
						}
					]
				}
//				{	xtype	: 'tab-panel',
//					region	: 'center',
//					layout	: 'border',
//					hieght	: 300,
//					border	:0,
//					items	: [
//						{	title	: '상세내역'	, xtype : 'module-slorlist1-lister-detail'}
//					]
//				}
			]
		}
		return card;
	}
});