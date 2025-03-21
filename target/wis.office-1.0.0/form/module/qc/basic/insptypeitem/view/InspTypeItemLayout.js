Ext.define('module.qc.basic.insptypeitem.view.InspTypeItemLayout', { extend: 'Axt.form.Layout' ,

	alias: 'widget.module-insptypeitem-layout',
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
			dockedItems : [ { xtype: 'module-insptypeitem-search' } ],
			items :[
				{	xtype	: 'tab-panel',
					itemId	: 'mainpanel',
					items	: [
						{	title	: '검사유형 리스트',
							layout	: 'border' ,
							border	: 0,
							items	: [
								/*  상단  */
								{	xtype	: 'module-insptypeitem-lister-master',
									flex	:  1 ,
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
										{	title	: '검사유형별 검사항목',
											layout	: 'border',
											border	: 0,
											region	: 'center',
											items	: [
												{	xtype	: 'module-insptypeitem-lister-detail',
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
				{	xtype:'module-insptypeitem-worker-editor', region:'north'
				},{	xtype:'module-insptypeitem-worker-lister', region:'center' , style : Const.borderLine.top
				}
			]
		};
	return card;
	}
});

