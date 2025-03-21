Ext.define('module.prod.cvic.cviclist2.view.CvicList2Layout', { extend: 'Axt.form.Layout',

	alias		: 'widget.module-cviclist2-layout',
	layout		: 'card',
	activeItem	: 0,

	/**
	 * 초기화 콤포넌트
	 */
	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard() ];
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createListCard : function () {
		var card = {
			layout	: 'border',
			border	: 0 ,
			dockedItems : [ { xtype: 'module-cviclist2-search' } ],
			items	:[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산 설비 현황',
							layout	: 'border' ,
							border	: 0,
							items	: [
								{	xtype	: 'module-cviclist2-lister',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 1,
									items	: [
										{	title	: '가동현황',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-cviclist2-lister-detail1',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '비가동현황',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-cviclist2-lister-detail2',
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
				}
			]
		};
		return card;
	},
});