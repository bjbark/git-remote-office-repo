Ext.define('module.custom.iypkg.item.ppermast.view.PperMastLayout', { extend  : 'Axt.form.Layout',

	alias   : 'widget.module-ppermast-layout',

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
		me.dockedItems.push({xtype: 'module-ppermast-search'}); /* 검색조건  */
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel',
				region  : 'center',
				flex    : 1,
				items  : [
					/*  첫번째 텝  */
					{	title : '원지코드 목록',
						layout : 'border', //, align: 'stretch'}
						border : 0,
						items  : [
							{	xtype  : 'module-ppermast-lister' ,
								region : 'west'   ,
								itemId : 'authmaster',
								style  : Const.borderLine.right ,
								flex   : 50,
								split  : true ,
							},
							{	flex		: 50,
								layout		: 'border',
								border		: 0,
								region		: 'center',
								items		: [
									{	layout	: 'border',
										region	: 'center',
										flex	: 5,
										style	: Const.borderLine.left,
										items	: [
											{	xtype	: 'module-ppermast-pric-lister2',
												flex	: 100,
												region	: 'north',
												style	: Const.borderLine.left + Const.borderLine.top + Const.borderLine.bottom
											},{	xtype	: 'module-ppermast-cstm-lister2',
												flex	: 100,
												region	: 'north',
												style	: Const.borderLine.left + Const.borderLine.top + Const.borderLine.bottom
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{	xtype  : 'module-ppermast-editor', region : 'south'
			}
		];
		me.callParent(arguments);
	}
});