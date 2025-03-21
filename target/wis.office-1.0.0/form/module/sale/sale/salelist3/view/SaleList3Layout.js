Ext.define('module.sale.sale.salelist3.view.SaleList3Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-salelist3-layout',

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
		me.dockedItems.push({xtype: 'module-salelist3-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '판매내역',
						xtype : 'module-salelist3-lister'
					}
				]
			},
//			{	xtype  : 'module-salelist3-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});