Ext.define('module.prod.plan.prodplanv2.view.ProdPlanV2Layout', { extend: 'Axt.form.Layout',
	alias		: 'widget.module-prodplanv2-layout',

	layout		: 'card',
	activeItem	: 0,

	/**
	* 초기화 콤포넌트
	*/
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard(), me.createWordCard() ];
		me.callParent(arguments);
	},

	/**
	*
	*/
	createListCard : function () {
		var buttons = {
				items : [
					{	xtype	: 'tbfill'
					},{	xtype	: 'button',
						text	: '메모',
						iconCls	: 'icon-close',
						hidden	: true ,
						action	: 'action_close',
						cls		: 'button-style'
					},{	xtype	: 'tbspacer',
						width	: 10
					},{	xtype	: 'button',
						text	: '고객통화',
						iconCls	: 'icon-close_cancel',
						hidden	: true ,
						action	: 'action_close_cancel',
						cls		: 'button-style'
					},{	xtype	: 'tbspacer'    , width : 10
					},{	xtype	: 'button',
						text	: '마감',
						iconCls	: 'icon-close_cancel',
						hidden	: true ,
						action	: 'action_close_cancel',
						cls		: 'button-style'
					},{	xtype	: 'tbspacer'    , width : 10
					},{	xtype	: 'button',
						text	: '확정',
						iconCls	: 'icon-close_cancel',
						hidden	: true ,
						action	: 'action_close_cancel',
						cls		: 'button-style'
					},{	xtype	: 'tbspacer'    , width : 10
					},{	xtype	: 'tbspacer'
					}
				]
			},
			card = {
				layout      : 'border',
				border      : 0 ,
				dockedItems : [ {xtype: 'module-prodplanv2-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '수주 리스트',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-prodplanv2-lister1',
												flex   : 2,
												split  : true,
												region : 'center',
												style  : Const.borderLine.bottom
//											},{ /*  하단  */
//												xtype		: 'tab-panel',
//												itemId		: 'itempanel',
//												split		: true,
//												region		: 'center',
//												tabPosition	: 'bottom',
//												flex		: 1 ,
//												items		: [
//													{	title  : '상품현황',
//														layout : 'border',
//														border : 0,
//														region : 'center',
//														items  : [
//															{	xtype  : 'module-prodplanv2-lister-detail',	region : 'center',	style  : Const.borderLine.top	}
//														]
//													},{	title  : '결제현황',
//														layout : 'border',
//														border : 0,
//														region : 'center',
//														items  : [
//															{	xtype  : 'module-prodplanv2-lister-payment',	region : 'center',	style  : Const.borderLine.top	}
//														]
//													}
//												]
											}
										]
									},
								]
							},{	title  : '생산계획 현황',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-prodplanv2-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
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

  	/**
  	 *
  	 */
  	createWordCard : function () {
     	var	card = {
			layout : 'border',
			border : 0 ,
			//bodyStyle: { background: 'transparent' },
			items : [
			    {   xtype:'module-prodplanv2-worker-editor', region:'north'  },
			 	//{ xtype:'module-prodplanv2-worker-search', region:'north'  },
			 	{   xtype:'module-prodplanv2-worker-lister', region:'center' , style : Const.borderLine.top}
			]
     	};
     	return card;
    }

});
