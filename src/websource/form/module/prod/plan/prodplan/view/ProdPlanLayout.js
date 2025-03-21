Ext.define('module.prod.plan.prodplan.view.ProdPlanLayout', { extend: 'Axt.form.Layout',
	alias		: 'widget.module-prodplan-layout',

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

	createListCard : function () {
		var buttons = {
			},
			card = {
				layout      : 'border',
				border      : 0 ,
				dockedItems : [ {xtype: 'module-prodplan-search'} ],
				items : [
					{	xtype	: 'tab-panel',
						itemId	: 'mainpanel',
						tabBar	: buttons ,
						items	: [
							{	title  : '생산계획 대기현황',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-prodplan-lister1',
												flex   : 2,
												split  : true,
												region : 'center',
												style  : Const.borderLine.bottom
											}
										]
									},
								]
							},{	title  : '생산계획 지시현황',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-prodplan-lister2',	region : 'center',	 style  : Const.borderLine.bottom	}
										]
									},{	xtype : 'module-prodplan-editor', region : 'south',  hidden : false }
								]
							},{	title  : '생산지시 종료현황',
								layout : 'border',
								border : 0,
								items  : [
									{	region : 'center',
										layout : 'border',
										border : 0,
										items  : [
											/*  상단  */
											{	xtype  : 'module-prodplan-lister3',	region : 'center',	 style  : Const.borderLine.bottom	}
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
			items : [
			    {   xtype:'module-prodplan-worker-editor', region:'north'  },
			 	{   xtype:'module-prodplan-worker-lister', region:'center' , style : Const.borderLine.top}
			]
		};
		return card;
	}
});
