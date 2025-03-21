Ext.define('module.custom.hantop.item.itemset.view.ItemSetLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemset-layout',

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

			dockedItems : [ {xtype: 'module-itemset-search'} ],
			items : [
				// 상단
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title  : Language.get('','자재코드 목록'),
						layout : 'border', //, align: 'stretch'}
						border : 0,
						items  : [
							{	xtype  : 'module-itemset-lister' ,
								region : 'west'   ,
//								itemId : 'authmaster',
								style  : Const.borderLine.right ,
								width  : 640,
								split  : true ,
							},{	xtype	: 'tab-panel',
								itemId	: 'detail',
								items	: [
									{	title  : Language.get('','색상별 단가'),
										layout : 'border', //, align: 'stretch'}
										border : 0,
										items  : [
											{	xtype  : 'module-itemset-detail1' ,
												region : 'center'   ,
//												itemId : 'authmaster',
												style  : Const.borderLine.right ,
												split  : true ,
											}
										]
									},{	title  : Language.get('','권속부자재'),
										layout : 'border', //, align: 'stretch'}
										border : 0,
										hidden : true,
										items  : [
											{	xtype  : 'module-itemset-detail2' ,
												region : 'center'   ,
//												itemId : 'authmaster',
												style  : Const.borderLine.right ,
												split  : true ,
											}
										]
									},{	title  : Language.get('','자재너비변수'),
										layout : 'border', //, align: 'stretch'}
										border : 0,
										hidden : true,
										items  : [
											{	xtype  : 'module-itemset-detail3' ,
												region : 'center'   ,
//												itemId : 'authmaster',
												style  : Const.borderLine.right ,
												split  : true ,
											}
										]
									},{	title  : Language.get('','표준바'),
										layout : 'border', //, align: 'stretch'}
										border : 0,
										hidden : true,
										items  : [
											{	xtype  : 'module-itemset-detail4' ,
												region : 'center'   ,
//												itemId : 'authmaster',
												style  : Const.borderLine.right ,
												split  : true ,
											}
										]
									},{	title  : Language.get('','컨테이너'),
										layout : 'border', //, align: 'stretch'}
										border : 0,
										items  : [
											{	xtype  : 'module-itemset-detail5' ,
												region : 'center'   ,
//												itemId : 'authmaster',
												style  : Const.borderLine.right ,
												split  : true ,
											}
										]
									}
								]
							}
						]
					}
				]
			},{	xtype : 'module-itemset-editor', region : 'south',  hidden : false,itemId	: 'editor',
			}
		]
	}
	return card;
}
});