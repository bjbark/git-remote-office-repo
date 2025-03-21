Ext.define('module.prod.plan.plananallist.view.PlanAnalListLayout', { extend: 'Axt.form.Layout',
	alias		: 'widget.module-plananallist-layout',

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
				layout		: 'border',
				border		: 0 ,
				dockedItems	: [ {xtype: 'module-plananallist-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '생산계획 대비 실적 현황',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-plananallist-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
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
				{	xtype:'module-plananallist-worker-editor', region:'north'  },
				//{ xtype:'module-plananallist-worker-search', region:'north'  },
				{	xtype:'module-plananallist-worker-lister', region:'center' , style : Const.borderLine.top}
			]
		};
		return card;
	}
});
