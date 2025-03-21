/**
 * @private
 * 카드 단말기 연결 플러그인 (모바일용)
 */
Ext.define('Axt.plugin.terminal.TerminalPluginMobile', {
	requires  : [
	],
	
	initialize : function () {
	    var me = this;
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
        var timeout = 2;
        var msg = [];
        var args = [
        	params.host,
        	params.port,
        	msg,
        	TerminalUtils.COMMAND.OPEN_CASHBOX,
        	timeout
        ];
        
        cordova.exec(function (message){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
        	Ext.Msg.alert('', msg);
			if(callbackFunc){
				callbackFunc(false);
			}
		},'SocketPlugin', 'command', args);
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
        var timeout = 2;
        var msg = [];
        var args = [
        	params.host,
        	params.port,
        	msg,
        	TerminalUtils.COMMAND.CUTTING,
        	timeout
        ];
        
        cordova.exec(function (message){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
        	Ext.Msg.alert('', msg);
			if(callbackFunc){
				callbackFunc(false);
			}
		},'SocketPlugin', 'command', args);
	},
	
	/**
	 * @private
	 * 메시지 출력
 	 * @param {Object} config
	 */
	print : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var params = config.params||{};
		var timeout = 2;
		me.setMessageGap(params);
		
        var args = [
        	params.host,
        	params.port,
        	params.msg,
        	TerminalUtils.COMMAND.CUTTING,
        	timeout
        ];
        
        cordova.exec(function (message){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
        	Ext.Msg.alert('', msg);
			if(callbackFunc){
				callbackFunc(false);
			}
		},'SocketPlugin', 'command', args);
	},
	
	/**
	 * @private
	 * van사 연결(카드결제, 현금영수증 결제등)
 	 * @param {Object} config
	 */
	connectVan : function (config) {
		var me = this;
		var params = config.params;
		var van = TerminalUtils.getTelegram(params.telegram);
		var callbackFunc = config.callback;
		var timeout = 2;    	
    	var msg = [];
    	var command = van.createRequest(params); // 요청 전문 만들기,;
    	
    	var args = [
        	params.host,
        	params.port,
        	msg,
        	command,
        	timeout
        ];
    	
    	cordova.exec(
			function (message){	   // 성공시
				var obj = van.parseResponse(message); //응답전문 유효성 체크한 후
				callbackFunc(true, obj); //콜백
			},
			function (msg){ 	// 실패시
            	Ext.Msg.alert('', msg);
            	if(callbackFunc){
            		callbackFunc(false, {message:msg}); //콜백
            	}
			}, 
			'SocketPlugin',		   // 플러그인 이름
			'connectVan',			   // 실행 메서드 이름
			args //인자
		);

	}
	
});