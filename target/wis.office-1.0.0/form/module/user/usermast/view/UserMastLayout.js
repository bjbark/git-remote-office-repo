Ext.define('module.user.usermast.view.UserMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-usermast-layout',

	initComponent : function(config){
		var me = this; me.dockedItems.push({xtype: 'module-usermast-search'}),
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title: Language.get('user_list','사용자 목록'), xtype : 'module-usermast-lister'
					},{	title		: '권한등록',
						layout		: 'border',
						border		: 0,
						dockedItems	: [ {xtype: 'module-usermast-lister-item'} ],
						items		: [
							{	xtype	: 'module-usermast-lister-item1',
								flex	: 2,
								region	: 'west',
								style	: Const.borderLine.right + Const.borderLine.bottom
							},{	xtype	: 'panel',
								region	: 'west',
								width	: 100,
								border	: 0,
								layout	: {
									type	: 'vbox',
									align	: 'center',
									pack	: 'center'
								},
								items	: [
									{	xtype	: 'button',
										action	: 'enrollment',
										text	: '<span class="btnTemp"><</span>',
										cls		: 'button-style',
										margin	: '50 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80,
									},{	xtype	: 'button',
										action	: 'remove',
										text	: '<span class="btnTemp">></span>',
										cls		: 'button-style',
										margin	: '20 0 0 0',
										width	: 100,
										height	: 50,
										width	: 80
									}
								]
							},{	xtype	: 'module-usermast-lister-item2',
								flex	: 2,
								region	: 'center',
								style	: Const.borderLine.left + Const.borderLine.top
							}
						]
					}
				]
			},{	xtype : 'module-usermast-editor', region : 'south',  hidden : false }
		];
		me.callParent(arguments);
	}
});
