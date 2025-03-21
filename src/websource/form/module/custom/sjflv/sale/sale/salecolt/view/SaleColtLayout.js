Ext.define('module.custom.sjflv.sale.sale.salecolt.view.SaleColtLayout',{ extend: 'Axt.form.Layout',

	alias : 'widget.module-sjflv-salecolt-layout',

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
			dockedItems : [ {xtype: 'module-sjflv-salecolt-search'} ],
			items : [
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '수금 List',
							layout	: 'border',
							border	: 0,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-sjflv-salecolt-lister-master1',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											items	: [
												{	title	: '수금 Detail',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-sjflv-salecolt-lister-detail1',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
								},
							]
						},{	title	: '미수금 현황',
							layout	: 'border',
							border	: 0,
							hidden	: true,
							items	: [
								{	region	: 'center',
									layout	: 'border',
									border	: 0,
									items	: [
										{	xtype	: 'module-sjflv-salecolt-lister-master2',
											flex	: 2,
											split	: true,
											region	: 'north',
											style	: Const.borderLine.bottom
										},{	xtype	: 'tab-panel',
											itemId	: 'itempanel',
											split	: true,
											region	: 'center',
											flex	: 1 ,//
											items	: [
												{	title	: '미수금 내역',
													layout	: 'border',
													border	: 0,
													region	: 'center',
													items	: [
														{	xtype	: 'module-sjflv-salecolt-lister-detail2',
															region	: 'center',
															style	: Const.borderLine.top
														}
													]
												}
											]
										}
									]
								}
							]
						},{	title	: '수금 등록',
							layout	: 'border',
							itemId	: 'tab',
							border	: 0,
							items	: [
								{	xtype	: 'module-sjflv-salecolt-worker-editor',
									region	: 'north',
								},{	xtype	: 'module-sjflv-salecolt-worker-lister',
									split	: false,
									flex	: 1,
									region	: 'center',
									style	: Const.borderLine.top
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