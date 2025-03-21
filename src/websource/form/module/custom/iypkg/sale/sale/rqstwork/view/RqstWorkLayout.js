Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-rqstwork-layout',

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
		me.dockedItems.push({xtype: 'module-rqstwork-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				items  : [
					/*  첫번째 텝  */
					{	title : '청구리스트',
						xtype : 'module-rqstwork-lister'
					},/*  첫번째 텝  */
					{	title : '미청구리스트',
						xtype : 'module-rqstwork-lister2'
					},/*  첫번째 텝  */
					{	title : '청구등록',
						layout	: 'border',
						itemId	: 'tab',
						border	: 0,
						items	: [
							{	xtype	: 'module-rqstwork-worker-editor',
								height	: 43,
								region	: 'north',
							},{	xtype : 'module-rqstwork-worker-lister',
								split	: false,
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			},
//			{	xtype  : 'module-rqstwork-editor', region : 'south'
//			}
		];
		me.callParent(arguments);
	}
});