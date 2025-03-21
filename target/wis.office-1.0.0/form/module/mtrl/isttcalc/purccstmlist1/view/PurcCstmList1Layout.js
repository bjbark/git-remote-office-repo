Ext.define('module.mtrl.isttcalc.purccstmlist1.view.PurcCstmList1Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-purccstmlist1-layout',

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
		me.dockedItems.push({xtype: 'module-purccstmlist1-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매입처원장',
						xtype : 'module-purccstmlist1-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});