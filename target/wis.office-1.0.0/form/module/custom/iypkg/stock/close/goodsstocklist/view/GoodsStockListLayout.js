Ext.define('module.custom.iypkg.stock.close.goodsstocklist.view.GoodsStockListLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-goodsstocklist-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me			= this,
			buttons		= {
				items	: [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-goodsstocklist-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '거래처 품목재고',
						xtype : 'module-goodsstocklist-lister'
					},{	title : '거래처 품목수불',
						xtype : 'module-goodsstocklist-lister2'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});