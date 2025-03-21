Ext.Loader.setConfig({
	enabled: true,
	garbageCollect: true,
    paths:{
    	'Axt': _global.sdk_host + '/extjs/axtjs/src',
    	'system' : 'form/system',
    	'lookup' : 'form/lookup',
    	'module' : 'form/module'
    }
});
delete _global.sdk_host;

Ext.require([
    'Axt.util.EucKrUtil',
    'Axt.Resource',
    'Ext.util.Cookies',
 	'Axt.plugin.PluginInit',
 	'Axt.util.Batch',
 	'Axt.util.Logger',
    'Axt.Message',
    'Ext.util.Cookies',
    'Ext.state.CookieProvider',
    'Ext.tip.QuickTipManager',
   	'Axt.util.CommonUtils',
   	'Axt.util.pg.Inipay50Utils',
    'com.common.option.Option'
], function() {

	/* 프로그램 시작 */
	Ext.application({
	    name: 'com',
	    appFolder: 'com',
	    controllers: ['MainPswd', 'MainHead', 'MainForm', 'MainMenu' ] ,

		    /**
		     * application launch
		     */
	    launch: function() {
	    	com.app.viewLogin();
	    },

		    /**
		     * Login화면 보이기<br/>
		     * 아래와 같은 방법으로 사용한다.
		     *
		     *     com.app.viewLogin();
		     */
		    viewLogin : function (){
		    	var me = this;
		    	me.createViewPort([
    	        {
    	        	xtype  :'mainpswd'
    	        	//region :'center'
    	        }
	        ]);
		    },

		    /**
		     * Main화면 보이기
		     * 아래와 같은 방법으로 사용한다.
		     *
		     *     com.app.viewMain();
		     */
		    viewMain : function (){
		    	var me = this;
		    	me.createViewPort([
	            { xtype : 'mainhead' , region : 'north', hidden : Boolean( _access.onscreen == 'true' ) },
				{ xtype : 'mainmenu' , region : 'west' , hidden : Boolean( _access.onscreen == 'true' ) },
				{ xtype : 'mainform' , region : 'center' }
				//{ xtype : 'FileDownloader', id: 'FileDownloader' }
	        ]);
		    },

	    /**
	     * @private
	     * viewPort저장하는 변수
	     */
	    viewPort : null,

	    /**
	     * @private
	     * ViewPort생성<br/>
	     * ViewPort를 최초 한번만 생성한다.
	     *
	     * @param {Array} viewArray
	     * xtype view객체 배열
	     */
	    createViewPort : function (viewArray) {
	        var me = this;
	        if( ! me.viewPort) {
	        	me.viewPort = Ext.create('Ext.container.Viewport', {
	        		layout: { type: 'border', padding : '0 1 0 1' },
	        		items : viewArray
	        	});
	        } else {
	        	me.viewPort.removeAll(true);
	        	me.viewPort.add(viewArray);
	        }
		    }
	});
});
