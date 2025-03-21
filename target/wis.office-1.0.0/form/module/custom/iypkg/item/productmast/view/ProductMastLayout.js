Ext.define('module.custom.iypkg.item.productmast.view.ProductMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-productmast-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me      = this,
			buttons = {
				items : [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-productmast-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				region	: 'center',
				flex	: 1,
				items	: [
					/*  첫번째 텝  */
					{	title : '제품코드 목록',
						layout : 'border', //, align: 'stretch'}
						border : 0,
						items  : [
							{	xtype			: 'module-productmast-lister' ,
								region			: 'west'   ,
								split			: true ,
								itemId			: 'authmaster',
								style			: Const.borderLine.right ,
								width			: 500
							},{	xtype			: 'tab-panel',
								flex			: 1,
								region			: 'center',
								itemId			: 'subTab',
								items			: [
									{	title : '단가',
										xtype	: 'module-productmast-pric-lister',
										flex	: 1,
									}
								]
							}
						]
					}
				]
			},
			{	xtype  : 'module-productmast-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});