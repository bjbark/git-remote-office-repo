Ext.define('module.custom.iypkg.stock.isos.saleostt.view.SaleOsttLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-saleostt-layout',

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
		me.dockedItems.push({xtype: 'module-saleostt-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					{	title : '출고등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-saleostt-worker-editor',
								height	: 80,
								region	: 'north',
							},{	xtype : 'module-saleostt-worker-lister',
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
					,{	title : Language.get('ostt_list','출고리스트'),
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype	: 'module-saleostt-lister',
								flex	: 1,
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},
		];
		me.callParent(arguments);
	}
});