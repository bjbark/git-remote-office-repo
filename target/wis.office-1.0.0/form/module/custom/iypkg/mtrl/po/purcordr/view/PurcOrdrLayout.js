Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-purcordr-layout',

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
		me.dockedItems.push({xtype: 'module-purcordr-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '발주등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-purcordr-worker-editor',
								height	: 74,
								region	: 'north',
							},{	xtype : 'module-purcordr-worker-lister',
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title : '발주리스트',
						xtype : 'module-purcordr-lister'
					},
					{	title : '미발주리스트',
						xtype : 'module-purcordr-lister2',
						hidden : true
					},
				]
			},
//			{	xtype  : 'module-purcordr-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});