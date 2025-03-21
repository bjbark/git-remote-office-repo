Ext.define('module.project.codeinfo.view.CodeInfoLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-codeinfo-layout',

	/**
	 *
	 */
	initComponent: function(config){
		var me = this,
			buttons 	= {
				items	: [
					{xtype: 'tbfill'},
				]
			}
		;
		me.dockedItems.push({xtype: 'module-codeinfo-search' }); // 검색조건
		me.items = [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel' ,
				tabBar : buttons ,
				items  : [
					{ title: Language.get( 'code_list', '코드 목록' ) ,xtype : 'module-codeinfo-lister' }
				]
			},{	xtype: 'module-codeinfo-editor' ,region : 'south'
			}
		];
		me.callParent(arguments);
	}
});
