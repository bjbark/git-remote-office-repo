/**
 * 시리얼통신, 맥어드레스 가져오기등을 사용할 수 있는 시스템 플러그인
 */
Ext.define('Axt.plugin.system.SystemPlugin', {
	singleton : true,
	alternateClassName: 'SystemPlugin',
	requires  : [
		'Axt.plugin.system.SystemPluginDesktop'
	],
	
    /**
     * 초기화
     */
	initialize : function (config) {
		var me = this;
		if(AppletDova.isDesktop){	/* desktop */
			me.plugin = Ext.create('Axt.plugin.system.SystemPluginDesktop');
			me.plugin.initialize(config);
		}
	},
	
	/**
	 * 시리얼포트 이름 가져오기 (Desktop용)
	 * 
	 *     SystemPlugin.getPortNames({
	 *         callback:function(success, portArray){
	 *             Logger.debug(portArray);
	 *         }
	 *     });
	 *  
	 * @param config 설정
	 * @param {Function} config.callback 콜백
	 */
	getPortNames : function (config) {
		var me = this;
		me.plugin.getPortNames(config);
	},
	
	/**
	 * 맥어드레스 가져오기 (Desktop용)
	 * 
	 *     // pc의 모든 mac address 가져오기
	 *     SystemPlugin.getMacAddress({
	 *         params : { allMacAddress : true },
	 *         callback:function(success, macAddressArray){
	 *             Logger.debug(macAddressArray);
	 *         }
	 *     });
	 *     
	 *     // 현재 네트워크 연결된 LAN의 mac address가져오기
	 *     SystemPlugin.getMacAddress({
	 *         params : { allMacAddress : false },
	 *         callback:function(success, macAddressArray){
	 *             Logger.debug(macAddressArray);
	 *         }
	 *     });
	 * 
	 * @param config 설정
	 * @param {Object} config.params 파라미터
	 * @param {Boolean} config.params.allMacAddress 
	 * true  : pc의 모든 mac address 가져오기<br/>
	 * false : 현재 네트워크연결된 lan의 mac address만 가져오기
	 * 
	 * @param {Function} config.callback 콜백  
	 */
	getMacAddress : function (config) {
		var me = this;
		me.plugin.getMacAddress(config);
	},
	
	/**
	 * url호출하여 원하는 로컬하드디스크 위치에 파일 다운로드
	 */
	download : function(config) {
		var me = this;
		me.plugin.download(config);
	}
	
});