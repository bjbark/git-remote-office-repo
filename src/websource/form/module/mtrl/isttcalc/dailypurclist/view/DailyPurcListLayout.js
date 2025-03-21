Ext.define('module.mtrl.isttcalc.dailypurclist.view.DailyPurcListLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-dailypurclist-layout',

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
		me.dockedItems.push({xtype: 'module-dailypurclist-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매입일보',
						xtype : 'module-dailypurclist-lister'
					},{	title : '매입일보(품목별)',
						xtype : 'module-dailypurclist-lister2',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					},{	title : '매입일보(거래처별)',
						xtype : 'module-dailypurclist-lister3',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					}
				]
			}
		];
		me.callParent(arguments);
	}
});