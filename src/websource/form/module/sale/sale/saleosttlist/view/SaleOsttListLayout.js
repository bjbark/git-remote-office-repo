Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListLayout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-salelist-layout',
	layout		: 'card',
	activeItem  : 0,

	/**
	* 초기화 콤포넌트
	*/
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	/**
	*
	*/
	createListCard : function () {
		var buttons = {
			items: [
				{	xtype	: 'tbfill'	},
				{	xtype	: 'tbspacer',
					width	: 10
				},{	xtype	: 'tbspacer',
					width	: 10
				},{	xtype	: 'tbspacer' }
			]
		},
			card = {
				layout		: 'border',
				border		: 0 ,
				dockedItems : [ {xtype: 'module-salelist-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '출고전표별',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
										/*  상단  */
											{	xtype	: 'module-salelist-lister-part1-master',
												flex	: 2,
												split	: true,
												region	: 'north',
												style	: Const.borderLine.bottom
											},
										/*  하단  */
											{	xtype	: 'module-salelist-lister-part1-detail',
												flex	: 1,
												region	: 'center',
												style 	: Const.borderLine.top
											}
										]
									}
								]
							},{	title	: Language.get('tab_itm_list' ,'출고내역'),
								xtype	: 'module-salelist-lister-part3'
							},{	title	: Language.get('total_item' ,'품목별 집계'),
								xtype	: 'module-salelist-lister-part4'
							},{	title	: Language.get('total_cust' ,'거래처별 집계'),
								layout : 'border',
								border	: 0,
								items	: [
									{
										region : 'center',
										layout : 'border',
										border : 0,
										items  : [
										/*  상단  */
											{	xtype	: 'module-salelist-lister-part5',
												flex	: 2,
												split	: true,
												region	: 'north',
												style	: Const.borderLine.bottom
											},
										/*  하단  */
											{	xtype	: 'module-salelist-lister-part5-detail',
												flex	: 1,
												region	: 'center',
												style 	: Const.borderLine.top
											}
										]
									}
								]
							}
						]
					}
				]
			};
		return card;
	}
});
