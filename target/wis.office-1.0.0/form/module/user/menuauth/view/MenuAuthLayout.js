Ext.define('module.user.menuauth.view.MenuAuthLayout', {extend: 'Axt.form.Layout',
	alias : 'widget.module-menuauth-layout',
	initComponent: function(config){
		var me = this;
		me.dockedItems.push({xtype: 'module-menuauth-search'}),

		me.items = [
			{	xtype    : 'tab-panel',
				itemId   : 'mainpanel',
				items    : [
					{	title	: Language.get('menu_user_list','메뉴별 사용자 현황'),
						layout	: 'border', //, align: 'stretch'
						border	: 0,
						flex	: 1,
						region	: 'center',
						items	: [
							{	xtype : 'module-menuauth-lister-master' , region : 'west'   ,  style  : Const.borderLine.right , width : 350 , split : true
							},{	xtype : 'module-menuauth-lister-detail' , region : 'center' ,  style  : Const.borderLine.left  , flex : 1
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});
