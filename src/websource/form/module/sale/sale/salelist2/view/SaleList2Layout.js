Ext.define('module.sale.sale.salelist2.view.SaleList2Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-salelist2-layout',

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
		me.dockedItems.push({xtype: 'module-salelist2-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '미수금현황',
						xtype : 'module-salelist2-lister'
					}
				]
			},
//			{	xtype  : 'module-salelist2-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});