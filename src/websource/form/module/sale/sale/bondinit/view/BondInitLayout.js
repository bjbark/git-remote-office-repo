Ext.define('module.sale.sale.bondinit.view.BondInitLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-bondinit-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me		= this,
			buttons	= {
				items	: [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-bondinit-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매출채권이월',
						xtype : 'module-bondinit-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});