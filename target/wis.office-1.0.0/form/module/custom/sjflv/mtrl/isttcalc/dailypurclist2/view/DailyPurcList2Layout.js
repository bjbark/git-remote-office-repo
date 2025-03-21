Ext.define('module.custom.sjflv.mtrl.isttcalc.dailypurclist2.view.DailyPurcList2Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-dailypurclist2-layout',

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
		me.dockedItems.push({xtype: 'module-dailypurclist2-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매입일보',
						xtype : 'module-dailypurclist2-lister'
					},{	title : '매입일보(품목별)',
						xtype : 'module-dailypurclist2-lister2',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					},{	title : '매입일보(거래처별)',
						xtype : 'module-dailypurclist2-lister3',
						hidden: (_global.options.mes_system_type.toUpperCase() == "SJFLV" ? false :true)
					},{	title : '입고리스트(입고현황)',
						xtype : 'module-dailypurclist2-lister4',
//						hidden: true
					}
				]
			}
		];
		me.callParent(arguments);
	}
});