Ext.define('module.user.userauth.view.UserAuthLayout', {extend: 'Axt.form.Layout',
	alias: 'widget.module-userauth-layout',
	initComponent: function(config) {
		var me = this;
		me.dockedItems.push({xtype: 'module-userauth-search'}), // 검색조건

		// 화면내용
		me.items = [
			{	xtype   : 'tab-panel',
				itemId  : 'mainpanel',
				region  : 'center',
				flex    : 1,
				items   : [
					{	title  : Language.get('user_list','사용자 리스트'),
						layout : 'border', //, align: 'stretch'}
						border : 0,
						items  : [
							{	xtype  : 'module-userauth-lister-master' ,
								region : 'west'   ,
								itemId : 'authmaster',
								style  : Const.borderLine.right ,
								width  : 300,
								split  : true ,
							},{	xtype  : 'module-userauth-lister-detail' ,
								region : 'center' ,
						//		itemId : 'authdetail',
								style  : Const.borderLine.left  ,
								flex : 1
							}
						]
					}
				]
			}
		];
		me.callParent(arguments);
	}
});
