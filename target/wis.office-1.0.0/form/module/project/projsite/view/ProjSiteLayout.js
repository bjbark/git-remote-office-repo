Ext.define('module.project.projsite.view.ProjSiteLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-projsite-layout',

	/**
	 *
	 */
	initComponent: function(config){
		var me = this,
			buttons = {
				items: [
					{	xtype: 'tbfill'
					},{	xtype: 'button' , text : Const.SELECT.text ,iconCls: Const.SELECT.icon ,action : Const.SELECT.action , cls: 'button-style'
					}
				]
			};
		me.dockedItems.push({xtype: 'module-projsite-search' }); // 검색조건
		me.items = [
			{	xtype	: 'tab-panel',
				itemId	: 'mainpanel',
				items	: [
					{	title : '고객 본사 리스트',
						xtype : 'module-projsite-lister'
					}
				]
			},{	title	: '고객 본사 정보' ,
				xtype	: 'module-projsite-editor' ,
				region	: 'south'
			}
		];
		me.callParent(arguments);
	}
});
