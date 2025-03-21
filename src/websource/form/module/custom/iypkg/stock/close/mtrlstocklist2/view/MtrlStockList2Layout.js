Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.view.MtrlStockList2Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-mtrlstocklist2-layout',

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
		me.dockedItems.push({xtype: 'module-mtrlstocklist2-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '부자재재고',
						xtype : 'module-mtrlstocklist2-lister'
					},{	title : '부자재수불부',
						xtype : 'module-mtrlstocklist2-lister2'
					}

				]
			}
		];
		me.callParent(arguments);
	}
});