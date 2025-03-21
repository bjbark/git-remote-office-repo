Ext.define('module.mtrl.isttcalc.npayinit.view.NpayInitLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-npayinit-layout',

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
		me.dockedItems.push({xtype: 'module-npayinit-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매입채무이월',
						xtype : 'module-npayinit-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});