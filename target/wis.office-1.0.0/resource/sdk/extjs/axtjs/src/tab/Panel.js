Ext.define('Axt.tab.Panel', { extend: 'Ext.tab.Panel',


	alias : 'widget.tab-panel',
	region: 'center',
	border : 0 ,
	style : 'padding-top:2px;',
	cls	 : 'white-back',
	plain: true,
	/**
	 *
	 */
	initComponent: function() {
		var me = this;  // tabBar에 적용할 기본값
		var container = {
				height: 25 ,
				defaults: { height: 23 }
		};
		me.tabBar = Ext.Object.merge(container, me.tabBar);
		me.callParent(arguments);
	}
});
