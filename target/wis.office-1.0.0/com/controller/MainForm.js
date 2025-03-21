/**
 */
Ext.define('com.controller.MainForm', { extend: 'Ext.app.Controller',
	views: [
	 	'main.MainForm'
	],
	
	refs: [
        {ref: 'mainForm', selector: 'mainform' },
	],
	  
	/**
	 * 
	 */
	init: function() {
		this.control({ 
			'mainform': { 
				tabchange : this.onTabchange,
				beforeremove : this.onTabBeforeRemove
			} 
		});
	},
	
	/**
	 * 브라우저 url 변경
	 * @param {} tabPanel
	 * @param {} newCard
	 * @param {} oldCard
	 * @param {} eOpts
	 */
	onTabchange: function(tabPanel, newCard, oldCard, eOpts){
		// 새로운 탭의 id값으로 hash code 설정
		var progId = newCard.getItemId();
		var tabcontrol = this.getMainForm(), tab = tabcontrol.getComponent(progId), tabcount = tabcontrol.items.getCount();
		
		// 새로바뀌기 이전의 tab이 속해있는 controller가 keyMap이 있는경우 false로 바꾼다 
		if(oldCard) {
			var controller = this.application.getController(oldCard.controlName);
		    if(controller.getKeyMap()) {
		    	controller.setKeyMap(false);
		    }
		}
		
		// 새로 바뀌는 탭의 controller가 keyMap이 있는경우 true로 바꾼다. 
		if(newCard) {
			var controller = this.application.getController(newCard.controlName);
			if(controller.getKeyMap()) {
				controller.setKeyMap(true);
			}
		}
		
		window.location.hash = '#!'+ newCard.getItemId(); 
	},

	/**
	 * tab이 제거된후 이벤트
	 */
	onTabBeforeRemove : function (tabs, tab) {
		var me = this;
		if(tabs.items.length === 1) {
			window.location.hash = '';
		}
		me.getMainForm().context.menu.remove(tab, true);
		// tab제거후 store에 남아있는 데이터 초기화
		var controller = me.application.getController(tab.controlName);
		var stores = controller.stores;
		for (index in stores) {
			var store = controller.getStore(stores[index]);
			if (store instanceof Ext.data.TreeStore ) {
				store.getRootNode().removeAll();
			} else { 
				store.removeAll(); 
			}
		}
		
		// 컨트롤러에 keyMap이 등록되어있으면 제거
		if(controller.getKeyMap()) {
			controller.getKeyMap().destroy();
		}
		
	}

});