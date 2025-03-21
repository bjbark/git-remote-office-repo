/**
 * 휴대용 바코드 리더와 통신하는 플러그인
 */
Ext.define('Axt.plugin.reader.ReaderPlugin', {
	singleton : true,
	alternateClassName: 'ReaderPlugin',
	requires  : [
		'Axt.plugin.reader.ReaderPluginMobile'
	],
	
	initialize : function(config) {
		if(AppletDova.isDesktop){	/* desktop */
			
		} else {				/* mobile */
			ReaderPlugin = Ext.create('Axt.plugin.reader.ReaderPluginMobile');
			ReaderPlugin.initialize(config);
		}
	}

	/**
	 * @method connect
	 * 리더와 연결후 1차적으로 connect function으로 콜백되고<br/>
	 * 데이터가 수신될때마다 지속적으로 callback function이 콜백된다.
	 * 
	 * ## 예제
	 * 
	 *     // 1. 페어링된 device목록을 오버레이로 띄우서 그중 하나를 선택하여 연결
	 *     ReaderPlugin.connect({
	 *         connect : function (success, errorMsg) { // 연결성공 또는 연결실패시 콜백 (option)
	 *             Ext.Msg.alert('', '연결 성공!');
     *         },
	 *         callback : function (success, text) { // 연결성공후 장비로부터 데이터를 수신했을때 콜백
	 *             Ext.Msg.alert('리더에서 읽어온 값', text);
	 *         }
	 *     });
	 *     
	 *     // 2. 페어링된 장치중 해당 파라미터에 설정된 device이름과 같은 device에 연결
	 *     // 오버레이는 띄우지 않는다.
	 *     // readerType 파라미터가 없을경우 default값은 'UIDS_G7'이다.
	 *     ReaderPlugin.connect({
	 *         params : {
	 *             readerType : 'UIDS_G7', // (주)유아이디에스의 블루투스 바코드리더 (option)
	 *             deviceName : 'UIDSa79657' // 연결할 장치 이름 (option)
	 *         },
	 *         callback : function (success, text) { // 연결성공후 장비로부터 데이터를 수신했을때 콜백
	 *             Ext.Msg.alert('리더에서 읽어온 값', text);
	 *         }
	 *     });
	 *     
	 * @param config 설정정보
	 * @param {Object} config.params 파라미터
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method disconnect
	 * 리더와 연결 종료
	 * 
	 * ## 예제
	 *     // 1. 파라미터 없이 연결종료
	 *     ReaderPlugin.disconnect();
	 *     
	 *     // 2. 콜백받기
	 *     // readerType을 입력안할경우 default값은 'UIDS_G7'이다.
	 *     ReaderPlugin.disconnect({
	 *         params : {
	 *             readerType : 'UIDS_G7' // (주)유아이디에스의 블루투스 바코드리더
	 *         },
	 *         callback : function (success, errorMsg) {
	 *             // errorMsg는 disconnect 실패시에만 전달된다.
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Object} config.params 파라미터
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method isConnectReader
	 * 리더와 연결 되어있는지 확인
	 * 
	 * ## 예제
	 *     // 리더와 연결 되어있는경우 연결 해제
     *     if(ReaderPlugin.isConnectReader()) {
     *         ReaderPlugin.disconnect({
     *             callback:function () {
     *                 Ext.Msg.alert('', '연결 해제');
     *             }
     *         });
     *     }
     *     
	 * @return {Boolean} isConnectReader 리더와 연결 되었는가?
	 */

});