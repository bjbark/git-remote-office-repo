Ext.define('module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Layout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-isttwork1-layout',

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
		me.dockedItems.push({xtype: 'module-isttwork1-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '입고등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-isttwork1-worker-editor',
								height	: 74,
								region	: 'north',
							},{	xtype : 'module-isttwork1-worker-lister',
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title : '입고리스트',
						xtype : 'module-isttwork1-lister'
					},{	title : '입고대기',
						xtype : 'module-isttwork1-lister2',
						hidden : true
					},/*  첫번째 텝  */
				]
			},
		];
		me.callParent(arguments);
	}
});