Ext.define('module.custom.inkopack.prod.prodplan.view.ProdPlanLayout', { extend: 'Axt.form.Layout',
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
							{	title  : '수주 리스트',
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
							},{	title  : '생산계획 현황',
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
