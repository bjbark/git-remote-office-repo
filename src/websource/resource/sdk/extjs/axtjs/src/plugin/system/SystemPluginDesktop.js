/**
 * @private
 * 시스템 플러그인 (데스크탑용)<br/>
 * SystemPlugin에서 자동 생성하므로 개발자가 직접 생성하지 않는다.
 */
Ext.define('Axt.plugin.system.SystemPluginDesktop', {
	requires  : [
	],
	
	initialize : function () {
		var me = this;
	},
	
	/**
	 * @private
	 * Desktop의 시리얼포트이름 읽어오기
	 */
	getPortNames : function (config) {
		var me = this;
		var callback = config.callback;
		AppletDova.execute({
            plugin : 'CommonPlugin',
            method : 'getPortNames',
            params : null,
            success : function(res){
            	if(typeof callback === 'function'){
            		callback(true, res);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
            	if(typeof callback === 'function'){
            		callback(false, msg);
                }
            }
        });
	},
	
	/**
	 * @private
	 * Desktop의 macaddress가져오기
	 */
	getMacAddress : function (config) {
		var me = this;
		var callback = config.callback;
		AppletDova.execute({
            plugin : 'CommonPlugin',
            method : 'getMacAddress',
            params : config.params,
            success : function(res){
            	if(typeof callback === 'function'){
            		callback(true, res);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
            	if(typeof callback === 'function'){
            		callback(false, msg);
                }
            }
        });
	},
	
	/**
	 * url호출하여 원하는 로컬하드디스크 위치에 파일 다운로드
	 */
	download : function (config) {
		var me = this;
		var callback = config.callback;
		
		config.params.urlParam = CommonUtils.jsonEncode(config.params.urlParam );
		AppletDova.execute({
            plugin : 'CommonPlugin',
            method : 'download',
            params : config.params,
            success : function(res){
            	if(typeof callback === 'function'){
            		callback(true, res);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
            	if(typeof callback === 'function'){
            		callback(false, msg);
                }
            }
        });
	}
	
});