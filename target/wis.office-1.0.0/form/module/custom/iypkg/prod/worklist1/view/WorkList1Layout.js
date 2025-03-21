Ext.define('module.custom.iypkg.prod.worklist1.view.WorkList1Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-worklist1-layout',

	/**
	* 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me			= this,
			buttons		= {
				items	: [
					{	xtype  : 'tbfill'
					},{	xtype  : 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-worklist1-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '공정별 생산 현황',
						xtype : 'module-worklist1-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});