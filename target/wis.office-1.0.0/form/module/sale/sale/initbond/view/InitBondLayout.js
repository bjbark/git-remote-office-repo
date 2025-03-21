Ext.define('module.sale.sale.initbond.view.InitBondLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-initbond-layout',

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
		me.dockedItems.push({xtype: 'module-initbond-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매출채권내역',
						xtype : 'module-initbond-lister'
					}
				]
			},
//			{	xtype  : 'module-initbond-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});