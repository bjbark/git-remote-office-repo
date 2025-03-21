Ext.define('module.cust.cstmmast.view.CstmMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-cstmmast-layout',

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
		me.dockedItems.push({xtype: 'module-cstmmast-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '거래처 리스트',
						xtype : 'module-cstmmast-lister'
					}
				]
			},
			{	xtype  : 'module-cstmmast-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});