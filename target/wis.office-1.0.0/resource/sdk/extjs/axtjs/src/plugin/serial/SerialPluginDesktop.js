/**
 * @private
 * 시리얼 플러그인 (데스크탑용)<br/>
 * PrinterPlugin에서 자동 생성하므로 개발자가 직접 생성하지 않는다.
 */
Ext.define('Axt.plugin.serial.SerialPluginDesktop', {
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
            plugin : 'SerialPlugin',
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
	 * Desktop의 시리얼포트에 연결해서 데이터 전송
	 */
	openWriteClose : function (config) {
		var me = this;
		var callback = config.callback;
		
		if(config.params.dataGap === undefined) {
			config.params.dataGap = 0;
		}
		
		if(config.params.charSet === undefined) {
			config.params.charSet = 'EUC-KR';
		}
		
		if(config.params.command === undefined) {
			config.params.command = [];
		}
		
		AppletDova.execute({
            plugin : 'SerialPlugin',
            method : 'openWriteClose',
            params : config.params,
            success : function(success){
            	if(typeof callback === 'function'){
            		callback(success);
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
	
	open : function (config) {
		var me = this;
		var callback = config.callback;
		
		console.log('open config', config);
		
		if(config.params.listenerBuffer === undefined) {
			config.params.listenerBuffer = 0;
		}
		
		if(config.params.listenerName === undefined) {
			config.params.listenerName = '';
		}
		
		if(config.params.listenerName !== '') {
			if(config.listener) {
				AppletDova.listenerNames[config.params.listenerName] = config.listener;
			}
		}

		AppletDova.execute({
            plugin : 'SerialPlugin',
            method : 'open',
            params : config.params,
            success : function(success){
            	if(typeof callback === 'function'){
            		callback(success);
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
	
	write : function (config) {
		var me = this;
		var callback = config.callback;
		
		if(config.params.dataGap === undefined) {
			config.params.dataGap = 0;
		}
		
		if(config.params.charSet === undefined) {
			config.params.charSet = 'EUC-KR';
		}
		
		if(config.params.command === undefined) {
			config.params.command = [];
		}
		
		AppletDova.execute({
            plugin : 'SerialPlugin',
            method : 'write',
            params : config.params,
            success : function(success){
            	if(typeof callback === 'function'){
            		callback(success);
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
	
	close : function (config) {
		var me = this;
		var callback = config.callback;
		
		AppletDova.execute({
            plugin : 'SerialPlugin',
            method : 'close',
            params : config.params,
            success : function(success){
            	if(typeof callback === 'function'){
            		callback(success);
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