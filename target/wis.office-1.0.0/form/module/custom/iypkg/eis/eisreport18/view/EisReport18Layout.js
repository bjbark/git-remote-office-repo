Ext.define('module.custom.iypkg.eis.eisreport18.view.EisReport18Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-eisreport18-layout',

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
		me.dockedItems.push({xtype: 'module-eisreport18-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '매출집계 대비 매입내역',
						xtype : 'module-eisreport18-lister'
					}
				]
			},
		];
		me.callParent(arguments);
	}
});