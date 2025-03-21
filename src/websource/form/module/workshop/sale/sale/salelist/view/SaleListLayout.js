Ext.define('module.workshop.sale.sale.salelist.view.SaleListLayout', { extend: 'Axt.form.Layout',
	alias	: 'widget.module-salelist-layout',

	layout		: 'card',
	activeItem	: 0,

	/**
	* 초기화 콤포넌트
	*/
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var buttons = {
			},
			card = {
				layout      : 'border',
				border      : 0 ,
				dockedItems : [ {xtype: 'module-salelist-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '거래처,품목별',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist-lister1',
												flex   : 2,
												split  : true,
												region : 'center',
												style  : Const.borderLine.bottom
											}
										]
									},
								]
							},{	title  : '품목별,월별',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}, // {	xtype : 'module-isttlist1-editor', region : 'south',  hidden : false }
								]
							},{	title  : '거래처 매출순위',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist-lister3',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '품목 매출순위',
								layout : 'border',
								hidden : true,
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist-lister4',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '담당자별 매출순위',
								layout : 'border',
								hidden : true,
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist-lister5',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							}
						]
					}
				]
			}
		return card;
	},
});
