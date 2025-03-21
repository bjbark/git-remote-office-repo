/**
 * center 영역 tab panel view. 1.메인메뉴 선택시 현재 view에 추가 된다.
 *
 */
Ext.define('com.view.main.MainForm', { extend: 'Ext.tab.Panel',
	alias: 'widget.mainform',
	requires: [
	 	'Axt.tab.plugin.TabCloseMenu'
	],
	plain: true,
	cls	 : 'white-back',
	tabBar: {
		height: 25 ,
		defaults: { height: 23 }
	},
	initComponent: function() {
		var me = this;
		var context = me.createTabContext();
		me.context = context;
		me.plugins = [me.context];
		/* contextmenu 생성 */
		me.context.createMenu();

		me.callParent(arguments);
	},

	/**
	 * tab close menu 생성
	 */
	createTabContext: function () {
		var me = this;
		var tabCloseMenu = Ext.create('Axt.tab.plugin.TabCloseMenu', {
			closeAllTabsText	: 'All Page Close',
			closeOthersTabsText	: 'Other Page Close',
			closeTabText		: 'Page Close',
			extraItemsHead		: ['-']
		});

		return tabCloseMenu;
	},

	/**
	 * tabl close menu에 추가
	 */
	addTabContext: function(itemId, title, iconCls) {
		var me = this;
		var menu = this.context.menu;

		menu.insert(0, {
			itemId: itemId,
			text: title,
			iconCls: iconCls,
			handler: function(item) {
				var tabs = item.ownerCt;
				var tab = tabs.getComponent(item.itemId);
				if (tab) {
					me.setActiveTab(tab);
				}
			}
		});
	}

});
