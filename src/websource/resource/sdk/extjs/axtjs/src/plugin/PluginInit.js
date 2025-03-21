/**
 * 애플릿 플러그인 초기화 클래스<br/>
 * Extjs, SenchaTouch mobile framework에서 공용으로 사용한다.
 * 
 */
Ext.define('Axt.plugin.PluginInit', {
//	extend : 'Ext.Component',
	singleton:true,
	alternateClassName: 'PluginInit',
	requires  : [
	    'Axt.plugin.AppletDova',
	    'Axt.plugin.system.SystemPlugin',
	    'Axt.plugin.reader.ReaderPlugin',
	    'Axt.plugin.bluetooth.BluetoothPlugin',
	    'Axt.plugin.terminal.TerminalPlugin',
	    'Axt.plugin.terminal.util.TerminalUtils',
	    'Axt.plugin.printer.PrinterPlugin',
	    'Axt.plugin.system.SystemPlugin',
	    'Axt.plugin.serial.SerialPlugin',
	],
	
	/**
	 * 플러그인들 초기화
	 */
	initialize : function (config) {
		var me = this;
		
		if(AppletDova.isDesktop && !AppletDova.isInitialize) { // 데스크탑이면서 애플릿이 아직 초기화되지 않은경우
    		/* 애플릿 활성화 */
    		AppletDova.initialize({
    			callback : function (result){
    				PrinterPlugin.initialize();  // 프린터 플러그인(택배송장) 초기화
    				TerminalPlugin.initialize(); // 단말기 플러그인 초기화
    				SystemPlugin.initialize();   // 시스템 플러그인 초기화
    				SerialPlugin.initialize();   // 시리얼통신 플러그인 초기화
    				
    				// 초기화 코드는 한번만 실행
    				AppletDova.isInitialize = true;
    				
    				if(config && Ext.isFunction(config.callback)) {
                		config.callback(result);
                	}
    			}
    		});
    		
		} else if( ! AppletDova.isDesktop) { // 모바일 플러그인 초기화
			PrinterPlugin.initialize();   // 프린트 플러그인 초기화
			TerminalPlugin.initialize();  // 단말기 플러그인 초기화
			SystemPlugin.initialize();    // 시스템 플러그인 초기화
			BluetoothPlugin.initialize(); // 블루투스 플러그인 초기화
			ReaderPlugin.initialize();    // 리더 플러그인 초기화
			if(config && Ext.isFunction(config.callback)) {
        		config.callback(true);
        	}
    	} else { // 플러그인을 이미 초기화한경우 (콜백만 해준다.)
    		if(config && Ext.isFunction(config.callback)) {
        		config.callback(true);
        	}
    	}
	}
});