Ext.define('module.custom.iypkg.prod.worklist3.view.WorkList3Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-worklist3-layout',

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
		me.dockedItems.push({xtype: 'module-worklist3-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '공정및외주처 매입집계',
						xtype : 'module-worklist3-lister'
					},{	title : '상품가공처 매입집계',
						xtype : 'module-worklist3-lister2'
					}

				]
			}
		];
		me.callParent(arguments);
	}
});