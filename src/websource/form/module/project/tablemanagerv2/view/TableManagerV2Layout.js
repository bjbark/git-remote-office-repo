Ext.define('module.project.tablemanagerv2.view.TableManagerV2Layout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-tablemanagerv2-layout',

initComponent: function(config) {
	var me = this,
		buttons = {
			items: [
			]
		};
		me.dockedItems.push({xtype: 'module-tablemanagerv2-search'}), // 검색조건
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				region	: 'center',
				flex	: 1,
				tabBar	: buttons,
				items	: [
					{	title: '테이블 내역서',
						layout : 'border',
						border : 0,
						items  : [
							{	xtype  : 'module-tablemanagerv2-lister-master' ,
								region : 'west'   ,
								itemId : 'authmaster',
								style  : Const.borderLine.right ,
								width  : 620,
								split  : true ,
							},{ xtype  : 'module-tablemanagerv2-lister' ,
								region : 'center' ,
								style  : Const.borderLine.left,
								flex : 1
							},
						]
					},{	title	: 'Domain',
						layout	: 'border',
						border	: 0,
						items	: [
							{	xtype  : 'module-tablemanagerv2-lister-domain-use' ,
								region : 'east',
								itemId : 'domainuse',
								style  : Const.borderLine.left ,
								width	: 300
							},{	xtype  : 'module-tablemanagerv2-lister-domain' ,
								region : 'center',
								itemId : 'domain',
								style  : Const.borderLine.right ,
							}
						]
					},
				]
			},{	title	: 'DB Fiels Info',
				xtype	: 'module-tablemanagerv2-editor',
				region	: 'south',
				hidden	: false
			}
		];
		me.callParent(arguments);
	}
});