Ext.define('module.custom.kortc.prod.order.porderlist2.view.PorderList2Layout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-kortc-porderlist2-layout',
	layout:'card',
	activeItem: 0,

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
		var card = {
			layout : 'border',
			border: 0 ,
			dockedItems : [ { xtype: 'module-kortc-porderlist2-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '생산일보',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
							{	region	: 'north',
								layout	: 'border',
								border	: 0,
								flex : 60,
								items	: [
									{	xtype	: 'module-kortc-porderlist2-lister-master', /*  상단  */
										itemId	: 'master',
										flex	: 50,
										split	: true,
										region	: 'center',
										style	: Const.borderLine.left
									}
								]
							},{	xtype	: 'tab-panel',
									itemId	: 'detail',
									split	: true,
									region	: 'center',
									flex	: 40,
									items	: [
										{	title	: '작업자',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-kortc-porderlist2-lister-detail',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '불량현황',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-kortc-porderlist2-lister-detail2',
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '유실공수',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-kortc-porderlist2-lister-detail3',
													flex	: 1,
													split	: false,
													region	: 'center',
													style	: Const.borderLine.top
												}
											]
										},{	title	: '자재투입',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-kortc-porderlist2-lister-detail4',
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

	/**
	 *
	 */
	createWordCard : function () {
		var	card = {
			layout	: 'border',
			border	: 0 ,
			items	: [
				{	xtype:'module-kortc-porderlist2-worker-editor', region:'north'
				},{	xtype:'module-kortc-porderlist2-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

