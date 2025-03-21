/**
 * @private
 * 카드 단말기 연결 플러그인 (데스크탑용)
 */
Ext.define('Axt.plugin.terminal.TerminalPluginDesktop', {
	requires  : [
	],
	
	initialize : function () {
		var me = this;
	},
	
	/**
	 * @private
	 * 단말기 연결을 위한 애플릿의 소켓/시리얼 플러그인 선택
	 */
	getAppletPluginType : function (params) {
		if(params.host && params.port) {
			return 'TerminalSocketPlugin';
		} else {
			return 'TerminalSerialPlugin';
		}
	},
	
	/**
	 * @private
	 * 메시지 끝에 설정되어있는 공백숫자대로 공백을 삽입
	 */
	setMessageGap : function (params) {
		var me = this;
		var lineGap = params.gap;
		if(Ext.isString(params.msg)){
			params.msg = [params.msg];
		}
		
		if(params.msg && lineGap>0) {
			for(var i=0; i<params.msg.length; i++) {
				var line = '';
				for(var j=0; j<lineGap; j++) {
					line += '\n';
				}
				params.msg[i] += line;
			}
		}
		
		return params;
	},
	
	/**
	 * @private
	 * 돈통열기
 	 * @param {Object} config
	 */
	openCashBox : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var params = config.params||{};
		params.command = TerminalUtils.COMMAND.OPEN_CASHBOX; //open
		params.timeout = 2;
		params.msg = [];
		
        AppletDova.execute({
            plugin : me.getAppletPluginType(params),
            method : 'command',
            params : params,
            success : function(res){
                if(callbackFunc){
                    callbackFunc(true);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
                if(callbackFunc){
                    callbackFunc(false);
                }
            }
        });
    },
    
    /**
     * @private
     * 컷팅 
 	 * @param {Object} config
     */
	cutting : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var params = config.params||{};
		params.command = TerminalUtils.COMMAND.CUTTING; //open
        params.timeout = 2;
        params.msg = [];
        
        AppletDova.execute({
            plugin : me.getAppletPluginType(params),
            method : 'command',
            params : params,
            success : function(res){
                if(callbackFunc){
                    callbackFunc(true);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
                if(callbackFunc){
                    callbackFunc(false);
                }
            }
        });
	},
	
	/**
	 * @private
	 * 메시지 출력
 	 * @param {Object} config
	 */
	print: function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var params = config.params||{};
		params.command = TerminalUtils.COMMAND.CUTTING; //open
        params.timeout = 2;
        me.setMessageGap(params);
        
        AppletDova.execute({
            plugin : me.getAppletPluginType(params),
            method : 'command',
            params : params,
            success : function(res){
                if(callbackFunc){
                    callbackFunc(true);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
                if(callbackFunc){
                    callbackFunc(false);
                }
            }
        });
		
	},
	
	/**
	 * @private
	 * van사 연결(카드결제, 현금영수증 결제등)
 	 * @param {Object} config
	 */
	connectVan : function (config) {
		var me = this;
		var van = TerminalUtils.getTelegram(config.params.telegram);
		var callbackFunc = config.callback;
		var params = {};
		params.command = van.createRequest(config.params); // 요청 전문 만들기
		params.timeout = 2;
		
		if(config.params.host && config.params.port) {
			params.host = config.params.host;
			params.port = config.params.port;
		} else {
			params.comPort = config.params.comPort;
			params.baudRate = config.params.baudRate;
		}
		
        AppletDova.execute({
            plugin : me.getAppletPluginType(params),
            method : 'connectVan',
            params : params,
            success : function(res){
                var obj = van.parseResponse(res); //응답전문 유효성 체크한 후
                if(callbackFunc){
	                callbackFunc(true, obj); //콜백
                }
            },
            failure : function(msg){
            	//카드단말기 연결에 문제가 있습니다.
            	//시리얼포트 연결에 문제가 있습니다.
            	Ext.Msg.alert('', msg);
                if(callbackFunc){
	                callbackFunc(false, {message:msg}); //콜백
                }
            }
        });
	}
	
});