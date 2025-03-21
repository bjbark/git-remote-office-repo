Ext.define('module.custom.iypkg.stock.isos.isttlist1.view.IsttList1Layout', { extend: 'Axt.form.Layout',
	alias		: 'widget.module-isttlist1-layout',

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
				dockedItems : [ {xtype: 'module-isttlist1-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '원단입고',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister1',
												flex   : 2,
												split  : true,
												region : 'center',
												style  : Const.borderLine.bottom
											}
										]
									},
								]
							},{	title  : '원단입고대기',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}, // {	xtype : 'module-isttlist1-editor', region : 'south',  hidden : false }
								]
							},{	title  : '부자재입고',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister3',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '부자재입고대기',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister4',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '상품입고',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister5',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									}
								]
							},{	title  : '상품입고대기',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-isttlist1-lister6',	region : 'center',	 style  : Const.borderLine.bottom	}
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
