Ext.define('module.custom.hantop.item.itemmast.view.ItemMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-itemmast-layout',

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

			dockedItems : [ {xtype: 'module-itemmast-search'} ],
			items : [
				// 상단
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title  : Language.get('','자재코드 목록'),
						layout : 'border', //, align: 'stretch'}
						border : 0,
						items  : [
							{	xtype  : 'module-itemmast-lister' ,
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
											{	xtype  : 'module-itemmast-detail1' ,
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
											{	xtype  : 'module-itemmast-detail2' ,
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
											{	xtype  : 'module-itemmast-detail3' ,
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
											{	xtype  : 'module-itemmast-detail4' ,
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
											{	xtype  : 'module-itemmast-detail5' ,
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
			},{	xtype : 'module-itemmast-editor', region : 'south',  hidden : false,itemId	: 'editor',
			}
		]
	}
	return card;
}
});