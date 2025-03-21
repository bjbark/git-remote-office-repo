Ext.define('module.custom.sjflv.mtrl.isttcalc.npaysumlist.view.NpaySumListLayout', { extend  : 'Axt.form.Layout',

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
					{	title : '미지급 집계표',
						layout	: 'border' ,
						border	: 0,
						items	: [
							{	xtype	: 'module-npaysumlist-lister',
								flex	: 1.3,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.left + Const.borderLine.bottom
							},{	xtype	: 'module-npaysumlist-lister2',
								flex	: 2,
								region	: 'center',
								style	: Const.borderLine.left + Const.borderLine.top
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});