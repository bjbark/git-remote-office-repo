Ext.define('module.prod.cvic.cvicchecktypeitem.view.CvicCheckTypeItemLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-cvicchecktypeitem-layout',
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
			dockedItems : [ { xtype: 'module-cvicchecktypeitem-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '점검유형 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-cvicchecktypeitem-lister-master',
									flex	:  2 ,
									split	: true,
									region	: 'north',
									style	: Const.borderLine.bottom
								/*  하단  */
								},{	xtype	: 'tab-panel',
									itemId	: 'itempanel',
									split	: true,
									region	: 'center',
									flex	: 1 ,
									items	: [
										{	title	: '점검항목',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-cvicchecktypeitem-lister-detail',
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
				{	xtype:'module-cvicchecktypeitem-worker-editor', region:'north'
				},{	xtype:'module-cvicchecktypeitem-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

