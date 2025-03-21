Ext.define('module.project.bonsamenu.view.BonsaMenuLayout', {extend: 'Axt.form.Layout',
	alias: 'widget.module-bonsamenu-layout',
	initComponent: function(config) {
	var me = this;
		me.dockedItems.push({xtype: 'module-bonsamenu-search'}), // 검색조건
		me.items = [
            {	xtype   : 'tab-panel',
				itemId  : 'mainpanel',
				region  : 'center',
				flex    : 1,
				items: [
			        {	title: '본사 리스트',
						layout : 'border',
						border : 0,
						items  : [
				            {	xtype  : 'module-bonsamenu-lister-master' ,
								region : 'west'   ,
								itemId : 'authmaster',
								style  : Const.borderLine.right ,
								width  : 421,
								split  : true ,
				            },{ xtype  : 'module-bonsamenu-lister-detail' ,
								region : 'center' ,
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
