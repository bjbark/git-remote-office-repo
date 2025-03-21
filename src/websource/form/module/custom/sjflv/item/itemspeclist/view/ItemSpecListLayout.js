Ext.define('module.custom.sjflv.item.itemspeclist.view.ItemSpecListLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-itemspeclist-layout',

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
		me.dockedItems.push({xtype: 'module-itemspeclist-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				split  : true ,
				items	: [
					{	title  : '품목코드 목록',
						layout : 'border', //, align: 'stretch'}
						region : 'west',
						border : 0,
						flex   : 1,
						items  : [
							{	xtype  : 'module-itemspeclist-lister',
								style  : Const.borderLine.right ,
								region	: 'center',
							}
						]
					}
				]
			},{	xtype : 'module-itemspeclist-editor',
				region	: 'east',
//				flex	: 1,
				width	: 680,
			}
		];
		me.callParent(arguments);
	}
});
























