Ext.define('module.user.wkrnmast.view.WkrnMastLayout', { extend: 'Axt.form.Layout',

	alias: 'widget.module-wkrnmast-layout',

	/**
	 * 콤포넌트 초기화 이벤트
	 */
	initComponent: function(config){
		var me = this
		;
		me.dockedItems.push({xtype: 'module-wkrnmast-search' }); // 검색조건
		me.items =  [
			{	xtype  : 'tab-panel',
				itemId : 'mainpanel' ,
				items  : [
					{ title: '직급 현황' ,xtype : 'module-wkrnmast-lister' }
				]
			},{	title: '직급 정보', xtype: 'module-wkrnmast-editor' ,region : 'south'
			}
		];
		me.callParent(arguments);
	}
});

