Ext.define('module.custom.iypkg.prod.worklist2.view.WorkList2Layout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-worklist2-layout',

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
		me.dockedItems.push({xtype: 'module-worklist2-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '완제품 생산 현황',
						xtype : 'module-worklist2-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});