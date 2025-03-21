/**
 * 시리얼통신
 * 
 * ## open(listener포함), write, close메서드를 같이 활용한 예제
 * 
 *     // 애플릿으로부터 listener가 호출될때마다 데이터를 모아두기위한 버퍼
 *     var buffer = [];
 *     
 *     // step1. 포트 오픈
 *     SerialPlugin.open({
 *         params : {
 *             portName : 'COM9',
 *             baudRate : 9600,
 *             listenerName : 'writeExample' // listener를 활용해서 이벤트를 받으려면 listener네임을 unique하게 정해야 한다.
 *         },
 *         callback:function(success){
 *             console.log('open', success);
 *		    			    	 
 *             // step2. 포트에 데이터를 write
 *             SerialPlugin.write({
 *                 params : {
 *                     portName : 'COM9',
 *                     data : ['안녕하세요abcd1234']
 *                 },
 *                 callback:function(success){
 *                     console.log('write', success);
 *                 }
 *             });
 *		    			    	 
 *         },
 *         listener : function(data){ // step3. 리스너가 대기하고있다가 데이터를 받는다
 *             // 현재 들어온 data와 buffer와의 배열 병합
 *             buffer = buffer.concat(data);
 *             
 *             if(buffer.length === 18) { // 프로토콜 종료
 *                 console.log('listener data', buffer);
 *                 //console.log('listener data 변환', EucKrUtil.convert(buffer));
 *		    			    		 
 *                 buffer = [];
 *		    			    		 
 *                 // step4. 모든 일이 끝나면 포트 닫기
 *                 SerialPlugin.close({
 *                     params : {
 *                         portName : 'COM9'
 *                     },
 *                     callback:function(success){
 *                         console.log('COM port닫기', success);
 *                     }
 *                 }); // end close
 *             }// end if
 *             
 *         } // end listener
 *     });
 */
Ext.define('Axt.plugin.serial.SerialPlugin', {
	singleton : true,
	alternateClassName: 'SerialPlugin',
	requires  : [
		'Axt.plugin.serial.SerialPluginDesktop'
	],
	
    /**
     * @ignore
     * 초기화
     */
	initialize : function (config) {
		var me = this;
		if(AppletDova.isDesktop){	/* desktop */
			me.plugin = Ext.create('Axt.plugin.serial.SerialPluginDesktop');
			me.plugin.initialize(config);
		}
	},
	
	/**
	 * 시리얼포트 이름 가져오기 (Desktop용)
	 * 
	 *     SerialPlugin.getPortNames({
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
	 * 시리얼포트에 연결후 데이터 전송하고 포트닫기 (Desktop용)
	 * 
	 * ## 예제
	 *     SerialPlugin.openWriteClose({
     *         params : {
     *             portName : 'COM9',
     *             baudRate : 9600,
     *             data : ['안녕하세요\n\n\n\n\n\n\n\n', '테스트입니다.\n\n\n\n\n\n\n\n'],
     *             command : [0x1B, 0x69], // cutting
	 *             dataGap : 1000, // (option) data는 array인데 하나의 index데이터를 전송후 지연시간을 준다. (default 0 )
     *         },
     *         callback:function(success){
     *             console.log(success);
     *         }
     *     });
	 * 
	 */
	openWriteClose : function (config) {
		var me = this;
		me.plugin.openWriteClose(config);
	},
	
	/**
	 * 시리얼포트 열기
	 * 
	 * ## 예제
	 *     SerialPlugin.open({
	 *         params : {
	 *             portName : 'COM9',
	 *             baudRate : 9600,
	 *             listenerName : 'writeExample' // listener를 활용해서 이벤트를 받으려면 listener네임을 unique하게 정해야 한다.
	 *         },
	 *         callback:function(success){
	 *             console.log('open', success);
	 *         },
	 *         listener : function(data){ // 대기하고있다가 데이터를 받는다 (옵션)
	 *             console.log(data);
	 *         } // end listener
	 *     });
	 */
	open : function (config) {
		var me = this;
		me.plugin.open(config);
	},
	
	/**
	 * 데이터 보내기
	 * 
	 * ## 예제
	 *     SerialPlugin.write({
	 *         params : {
	 *             portName : 'COM9',
	 *             data : ['안녕하세요abcd1234']
	 *         },
	 *         callback:function(success){
	 *             console.log('write', success);
	 *         }
	 *     });
	 */
	write : function (config) {
		var me = this;
		me.plugin.write(config);
	},
	
	/**
	 * 시리얼 포트 닫기
	 * 
	 * ## 예제
	 *     SerialPlugin.close({
	 *         params : {
	 *             portName : 'COM9'
	 *         },
	 *         callback:function(success){
	 *             console.log('COM port닫기', success);
	 *         }
	 *     }); // end close
	 */
	close : function (config) {
		var me = this;
		me.plugin.close(config);
	}
});