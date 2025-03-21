/**
 * center 영역 컨트롤러
 *
 */
Ext.define('com.controller.MainHead', { extend: 'Ext.app.Controller',

	views: [
	 	'main.MainHead'
	],
	init : function () {
		this.control({
		    /* 툴바의 버튼 클릭시 좌측 메뉴가 열리는 이벤트 */
			'[name=menubar] [action=onToolbarButtonClick]': { click  : 'onToolbarButtonClick' }
		});
	},

	/**
	 *
	 */
	doLogout:function(){
		sessionStorage.removeItem('accepted');
		sessionStorage.removeItem('template');// = '';
		sessionStorage.removeItem('dashboard');
		window.location.hash = '';
		window.location.reload();
	},

	/**
	 * header의 메뉴 클릭
	 */
	onToolbarButtonClick : function (button, e, eOpts) {
		var me = this;
		var menuRecord = button.data;

		/* 중복클릭 방지 */
		if(me.toolbarClickLock) {
			return;
		}
		me.toolbarClickLock = true;

		var mainmenu = Ext.ComponentQuery.query('#mainmenu')[0];

		/* 메뉴가 folder가 아니라면 expand하지 않는다. */
		if( ! menuRecord.getData().leaf) {
			/* settimeout은 double click을 빠르게 했을경우 메뉴가 중복생성되는것을 방지하기 위해 */
			setTimeout(function(){
				mainmenu.collapseAll(function(){
					mainmenu.expandNode(menuRecord, true);
					me.toolbarClickLock = false;
					//mainmenu.expandPath('/'+menuRecord.getData().parentId + '/' + menuRecord.getData().id);
				});
			}, 300);
		} else {
			me.toolbarClickLock = false;
		}
		// 현재 선택된 메뉴의 path 알아내기
		// mainmenu.selModel.getSelection()[0].getPath()
	},
	expandNode : function () {
	}

});