Ext.define('module.custom.hantop.item.itemmodel.view.ItemModelLayout', { extend: 'Axt.form.Layout',

	alias : 'widget.module-itemmodel-layout',

	layout		:'card',
	activeItem	: 0,

	initComponent: function(config){
		var me = this;
		me.items = [ me.createListCard()];
		me.callParent(arguments);
	},

	createListCard : function () {
		var card = {
			layout		: 'border',
			border		: 0 ,
			dockedItems : [ {xtype: 'module-itemmodel-search'} ],
			items : [
				// 상단
				{	xtype	: 'tab-panel',
					layout	: 'border',
					region	: 'north',
					split	: true,
					flex	: 1,
					itemId  : 'mainpanel',
					border	: 0,
					items	: [
						{	title	: '브랜드 및 창호그룹',
							layout	: 'border',
							border	: 0,
							region	: 'center',
							items	: [
								{	region : 'center',
									layout : 'border',
									border : 0,
									items  : [
										{	xtype	: 'module-itemmodel-master',
											flex	: 1,
											region	: 'west',
											style	: Const.borderLine.right+ Const.borderLine.bottom
										},{	xtype	: 'module-itemmodel-detail1',
											flex	: 1,
											region	: 'center',
											style	: Const.borderLine.right+ Const.borderLine.bottom
										}
									]
								}
							]
						}
					]
				// 하단
				},{	xtype	: 'tab-panel',
					itemId  : 'servepanel',
					region	: 'center',
					flex	: 1.5,
					border	:0,
					items	:[
						{	title	: '브랜드별 모델목록',
							xtype	: 'module-itemmodel-detail2',
							region	: 'south',
							border	:0,
						}
					]
				},{	xtype	: 'module-itemmodel-editor',
					region	: 'south',
					hidden	: false,
					style	: Const.borderLine.top,
				}
			]
		}
		return card;
	}
});