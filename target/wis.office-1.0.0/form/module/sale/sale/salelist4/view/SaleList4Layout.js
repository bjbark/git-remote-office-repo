Ext.define('module.sale.sale.salelist4.view.SaleList4Layout', { extend: 'Axt.form.Layout',
	alias	: 'widget.module-salelist4-layout',

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
				dockedItems : [ {xtype: 'module-salelist4-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '납품처,품목별',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist4-lister1',
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
											{	xtype  : 'module-salelist4-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}, // {	xtype : 'module-isttlist1-editor', region : 'south',  hidden : false }
								]
							},{	title  : '납품처 매출순위',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist4-lister3',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '품목 매출순위',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist4-lister4',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '담당자별 매출순위',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-salelist4-lister5',	region : 'center',	 style  : Const.borderLine.bottom	}
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
