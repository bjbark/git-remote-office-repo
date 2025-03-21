/**
 * Logger클래스<br/>
 * console.log를 사용하지말고 Logger클래스를 사용 하도록 한다.<br/>
 * console.log를 build시에도 남겨놓으면 console에 불필요한 write가 발생하게 된다.<br/>
 * 사용방법은 normal type과 callback type의 크게 2가지가 있으며<br/>
 * 사용방법이나 log level에 대해서는 아래를 참고한다.<br/>
 *  
 * ## Log 레벨
 *     // 로그가 보여지는 범위는 debug가 가장 많고 error가 가장 적다.
 *     // 개발시에는 debug로, app build시에는 error로 한다.
 *     
 *     debug     => info, error, warn, deprecate, debug
 *     info      => info, error, warn, deprecate
 *     deprecate => error, warn, deprecate
 *     warn      => warn, error
 *     error     => error
 *   
 * ## 예제1 (normal type의 Logger)
 *     // 장점 : 코드양이 적다.
 *     // 단점 : console에 log line이 나오지 않는다.
 *     
 *     Logger.debug('테스트 debug');
 *     Logger.debug('테스트 debug', { xtype:'button', label:'test' });
 *   
 *     Logger.info('테스트 info');
 *     Logger.deprecate('테스트 deprecate');
 *     Logger.warn('테스트 warn');
 *     
 *     Logger.error('테스트 error');       // alert 안띄워짐
 *     Logger.error('테스트 error', true); // alert 띄워짐
 *     
 * ## 예제2 (callback type의 Logger)
 *     // 장점 : console에 log line이 나온다.
 *     // 단점 : 코드양이 normal type보다는 많다.
 *     
 *     Logger.debug(function(){
 *         console.log('debug');
 *     });
 *     Logger.info(function(){
 *         console.log('info');
 *     });
 *     Logger.deprecate(function(){
 *         console.log('deprecate');
 *     });
 *     Logger.warn(function(){
 *         console.log('warn');
 *     });
 *     Logger.error(function(){          // alert 안띄워짐
 *         console.log('error');
 *     });
 *     Logger.error(function(){          // alert 띄워짐
 *         console.log('error');
 *     }, true);
 *     
 */
Ext.define('Axt.util.Logger', {
	alternateClassName: 'Logger',
	singleton: true,
	defaultPriority: 'info',

    priorities: {
    	
        /**
         * @ignore
         */
        debug:    0,
        
        /**
         * @ignore
         */
        info:       1,
        
        /**
         * @ignore
         */
        deprecate:  2,
        
        /**
         * @ignore
         */
        warn:       3,
        
        /**
         * @ignore
         */
        error:      4
        
    },
    
    /**
     * @property {String} level 로그레벨
     */
    level : 'error',
    
	/**
	 * 로그 레벨 설정<br/>
	 * @param {String} logLevel 로그레벨 
     *
	 */
    setLevel : function (logLevel) {
    	this.level = logLevel;
    },
    
	/**
	 * 설정된 로그레벨 리턴<br/>
	 * @return {String} logLevel 로그레벨
	 */
    getLevel : function () {
    	return this.level;
    },

    /**
     * 디버깅용
     */
	debug: function() {
		this.commonLog('debug', arguments);
	},

	/**
	 * 일반 정보 로그
	 */
	info: function() {
		this.commonLog('info', arguments);
	},

	/**
	 * 위험 로그
	 */
	warn: function() {
		this.commonLog('warn', arguments);
	},

	/**
	 * 에러 로그
	 */
	error: function() {
		var me = this;
		var isAlert = arguments[arguments.length-1] === true;
		var errorMsg = arguments[0];
		var message = '';
		var displayName = this.commonLog('error', arguments);
		if(displayName !== 'Anonymous') {
			message = '[' + displayName + ']<br/>'+errorMsg;
		} else {
			message = errorMsg;
		}
		if(isAlert){
			Ext.Msg.show({
				title: Locale.get('exception.TITLE'),
				message: message,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	
	/**
	 * 사용하지 않게될 메서드를 나타낼때 사용
	 */
	deprecate : function () {
		this.commonLog('deprecate', arguments);
	},
	
	/**
	 * @private
	 * 공통 로그
	 */
	commonLog : function (priority, args) {
		var me = this;
		var priorities = me.level;
		var priorityValue = priorities[priority];
		if (priorities[me.getLevel()] > priorityValue) {
            return this;
        }
		
		var time = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
		var labelMethodName = priority;
		if(priority === 'debug') {
			priority = 'log';
		} else if(priority === 'deprecate') {
			priority = 'warn';
		}
		
		var displayName = me.getDisplayName(args.callee.caller);
		var label = '['+labelMethodName.toUpperCase()+'][' + time + ']['+ displayName +']';
		
		if( me.isCallbackType(args) ){
			me.commonLogCallbackType(label, priority, args);
		} else {
			me.commonLogNormalType(label, priority, args);
		}
		
		return displayName;
	},
	
	isCallbackType : function (args) {
		var me = this;
		for(var i=0, size=args.length; i<size; i++) {
			if(Ext.isFunction (args[i])) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * @private
	 * Logger클래스를 사용한 지점의 controller명 가져오기
	 */
	getDisplayName : function (caller) {
		var me = this;
		var callDisplayName = Ext.getDisplayName(caller);
		if(
		   CommonUtils.startsWith(callDisplayName, 'App.') ||  
	       CommonUtils.startsWith(callDisplayName, 'Axt.') || 
	       CommonUtils.startsWith(callDisplayName, 'Ext.') ||
	       CommonUtils.startsWith(callDisplayName, 'Anonymous')
	    ){
			return callDisplayName;
		} else {
			
			return me.getDisplayName(caller.caller);
		}
	},
	
	/**
	 * @private
	 */
	commonLogCallbackType : function (label, priority, args) {
		var me = this;
		if(Ext.isFunction(args[1])) {
			console[priority](label);
			args[1]();
			return false;
		} else if(Ext.isFunction(args[0]) ) {
			console[priority](label);
			args[0]();
			return false;
		}
	},
	
	/**
	 * @private
	 */
	commonLogNormalType : function (label, priority, args) {
		var me = this;
		/* 일반타입의 log */
		var message = '';
		if(args.length > 1 && (Ext.isString(args[0]) || Ext.isNumber(args[0]) || Ext.isBoolean(args[0]) )  ) {  
			/* 파라미터가 2개이상이고 첫번째 파라미터가 문자열일때
			 * 첫번째파라미터는 label로 지정하고 나머지 뒤의 파라미터들은 배열로 출력
			 **/
			
			label += ('\n' + args[0] + ' - ');
			if(args.length===2) {
				message = args[1];
			} else {
				message = [];
				for(var i=1; i<args.length; i++) {
					message.push(args[i]);
				}
			}
		} else if(args.length === 1) {                  
			/* 파라미터가 한개일때 */
			
			message = '\n' + args[0];
		}
		
		console[priority](label, message);
	},
	
	/**
	 * 현재 Log level이 debug인가?
	 * 
	 * @return {Boolean} result
	 */
	isDebug : function () {
		var me = this;
		return me.commonLevelCheck('debug');
	},
	
	/**
	 * 현재 Log level이 info인가?
	 * 
	 * @return {Boolean} result
	 */
	isInfo : function () {
		var me = this;
		return me.commonLevelCheck('info');
	},
	
	/**
	 * 현재 Log level이 deprecate인가?
	 * 
	 * @return {Boolean} result
	 */
	isDeprecate : function () {
		var me = this;
		return me.commonLevelCheck('deprecate');
	},
	
	/**
	 * 현재 Log level이 warn인가?
	 * 
	 * @return {Boolean} result
	 */
	isWarn : function (warn) {
		var me = this;
		return me.commonLevelCheck('warn');
	},
	
	/**
	 * 현재 Log level이 error인가?
	 * 
	 * @return {Boolean} result
	 */
	isError : function () {
		var me = this;
		return me.commonLevelCheck('error');
	},
	
	/**
	 * @private log level 공통 체크
	 */
	commonLevelCheck : function (priority) {
		var me = this;
		var priorities = me.level;
		var priorityValue = priorities[priority];
		if (priorities[me.getLevel()] >= priorityValue) {
            return true;
        } else {
        	return false;
        }
	}
	
});