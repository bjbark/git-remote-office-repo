Ext.define('module.cust.cstmvist.view.CstmVistLayout', { extend  : 'Axt.form.Layout',

	alias : 'widget.module-cstmvist-layout',

	initComponent: function(config){
		var me		= this,
			buttons	= {
				items	: [
					{	xtype	: 'tbfill'
					},{	xtype	: 'button',text   : Const.SELECT.text,iconCls: Const.SELECT.icon,action : Const.SELECT.action ,cls: 'button-style'
					}
				]
			}
		;
		me.dockedItems.push({xtype: 'module-cstmvist-search'}); /* 검색조건  */
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				activeTab : _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? 0 : 1,
				items	: [
					{	title	: '거래처별 방문일지',
						layout	: 'border' ,
						border	: 0,
						hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? false : true,
						items	: [
							{	xtype	: 'module-cstmvist-lister-master' ,
								width	: 260 ,
								split	: true,
								region	: 'west',
								style	: Const.borderLine.right
							},{	xtype	: 'module-cstmvist-lister-detail' ,
								flex	: 3 ,
								split	: true,
								region	: 'center',
								style	: Const.borderLine.left
							}
						]
					},{	title	: '거래처별 방문일지',
						layout	: 'border' ,
						border	: 0,
						hidden	: _global.options.mes_system_type.toUpperCase() != 'SJFLV' ? true : false,
						items	: [
							{	xtype	: 'module-cstmvist-lister-list' ,
								flex	:  3 ,
								split	: true,
								region	: 'north',
								style	: Const.borderLine.bottom
							},{	xtype	: 'tab-panel',
								itemId	: 'detail',
								split	: true,
								region	: 'center',
								flex	: 1,
								items	: [
									{	title	: '첨부파일',
										layout	: 'border',
										border	: 0,
										region	: 'center',
										items	: [
											{	xtype	: 'module-cstmvist-lister2',
												region	: 'center',
												style	: Const.borderLine.top
											}
										]
									}
								]
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});