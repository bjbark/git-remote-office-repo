Ext.define('module.custom.iypkg.mtrl.po.purcordrlist1.view.PurcOrdrList1Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-purcordrlist1-layout',

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
		me.dockedItems.push({xtype: 'module-purcordrlist1-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매입집계',
						xtype : 'module-purcordrlist1-lister'
					}
				]
			},
//			{	xtype  : 'module-purcordrlist1-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});