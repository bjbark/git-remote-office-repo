Ext.define('module.custom.iypkg.mtrl.purc.npaysumlist.view.NpaySumListLayout', { extend  : 'Axt.form.Layout',

	alias	: 'widget.module-npaysumlist-layout',

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
		me.dockedItems.push({xtype: 'module-npaysumlist-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '미지급집계표',
						xtype : 'module-npaysumlist-lister'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});