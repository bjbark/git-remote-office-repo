/**
 * 블루투스 통신 플러그인<br/>
 * 이 플러그인은 폰갭을 사용하여 안드로이드 모바일기기와 통신하게 되는데<br/>
 * 아래의 opensource library를 사용하여 구현했다.<br/>
 * 자바단의 플러그인은 별도의 수정없이 원본 그대로 사용했으며<br/>
 * script에서 폰갭 호출을 하는부분만 sencha용으로 개발했다.<br/>
 * 이 플러그인은 순수 블루투스 통신에 관한 메서드만 있고<br/>
 * 기능을 활용한 예제는 ReaderPluginMobile.js(바코드 블루투스 리더 플러그인)에서 볼 수 있다.<br/><br/><br/><br/>
 * 
 * 
 * 
 * 
 * Copyright December, 2012 Hüseyin Kozan - http://huseyinkozan.com.tr
 *    
 * Copyright 2012 Wolfgang Koller - http://www.gofg.at/
 *    
 * Modified and improved December, 2012 Hüseyin Kozan http://huseyinkozan.com.tr
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
Ext.define('Axt.plugin.bluetooth.BluetoothPlugin', {
	singleton : true,
	alternateClassName: 'BluetoothPlugin',
	requires  : [
        'Axt.plugin.AppletDova',
		'Axt.plugin.bluetooth.BluetoothPluginMobile'
	],
	
	initialize : function(config) {
		if(AppletDova.isDesktop){	/* desktop */
			
		} else {				/* mobile */
			BluetoothPlugin = Ext.create('Axt.plugin.bluetooth.BluetoothPluginMobile');
			BluetoothPlugin.initialize(config);
		}
	}

	/**
	 * @method isSupported
	 * 장비가 블루투스를 지원하는지 확인
	 * 
	 * ## 예제
	 *     BluetoothPlugin.isSupported({
	 *         callback : function (success, errorMsg) {
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method enable
	 * 블루투스 켜기
	 * 
	 * ## 예제
	 *     BluetoothPlugin.enable({
	 *         callback : function (success, errorMsg) {
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method disable
	 * 블루투스 끄기
	 * 
	 * ## 예제
	 *     BluetoothPlugin.disable({
	 *         callback : function (success, errorMsg) {
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method isEnabled
	 * 블루투스가 켜있는지 확인
	 * 
	 * ## 예제
	 *     BluetoothPlugin.isEnabled({
	 *         callback : function (success, errorMsg) {
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */

	/**
	 * @method getAddress
	 * 현재 장비의 bluetooth 주소값 가져오기
	 * 
	 * ## 예제
	 *     BluetoothPlugin.getAddress({
	 *         callback : function (success, address) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', address);
	 *             } else {
	 *                 var errorMsg = address;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method getName
	 * 현재 장비의 이름 가져오기
	 * 
	 * ## 예제
	 *     BluetoothPlugin.getName({
	 *         callback : function (success, name) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', name);
	 *             } else {
	 *                 var errorMsg = name;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method requestDiscoverable
	 * 설정된 시간동안 다른장치에게 내장치를 검색하게 한다.
	 * 
	 * ## 예제
	 *     BluetoothPlugin.requestDiscoverable({
	 *         params : {
	 *             duration : 20 //20초
	 *         },
	 *         callback : function (success, duration) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', duration);
	 *             } else {
	 *                 var errorMsg = duration;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method startDiscovery
	 * 사용가능한 장치를 검색한다.
	 * 
	 * ## 예제
	 *     BluetoothPlugin.startDiscovery({
	 *         callback : function (success, deviceJsonArray) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', CommonUtils.jsonEncode(deviceJsonArray));
	 *             } else {
	 *                 var errorMsg = deviceJsonArray;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method getBondedDevices
	 * 페어링된 장비를 가져온다
	 * 
	 * ## 예제
	 *     BluetoothPlugin.getBondedDevices({
	 *         callback : function (success, deviceJsonArray) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', CommonUtils.jsonEncode(deviceJsonArray));
	 *             } else {
	 *                 var errorMsg = deviceJsonArray;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method fetchUUIDs
	 * 장치의 address주소를 보내서 uuid를 얻어온다.
	 * 
	 * ## 예제
	 *     BluetoothPlugin.fetchUUIDs({
	 *         params : {
	 *             address : '00:11:22:AA:BB:CC' // 장비의 블루투스 어드레스
	 *         },
	 *         callback : function (success, uuidJsonArray) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', CommonUtils.jsonEncode(uuidJsonArray));
	 *             } else {
	 *                 var errorMsg = uuidJsonArray;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method connect
	 * 블루투스 통신 연결
	 * 
	 * ## 예제
	 *     BluetoothPlugin.connect({
	 *         params : {
	 *             address : '00:11:22:AA:BB:CC', // 장비의 블루투스 어드레스
	 *             uuid : 'fa87c0d0-afac-11de-8a39-0800200c9a66',
	 *             secure : true // 보안설정
	 *         },
	 *         callback : function (success, socketId) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', socketId);
	 *             } else {
	 *                 var errorMsg = socketId;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method disconnect
	 * 블루투스 통신 해제
	 * 
	 * ## 예제
	 *     BluetoothPlugin.disconnect({
	 *         params : {
	 *             socketId : 0 // connect하면 소켓id가 나오는데 그 값을 유지하고있어야 연결해제도 가능하다.
	 *         },
	 *         callback : function (success, errorMsg) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', '연결해제 성공');
	 *             } else {
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method listen
	 * 블루투스 서버소켓을 열어두고 클라이언트의 접속을 기다린다.
	 * 
	 * ## 예제
	 *     BluetoothPlugin.listen({
	 *         callback : function (success, socketId) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', socketId);
	 *             } else {
	 *                 var errorMsg = socketId;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method cancelListening
	 * listen을 취소한다.
	 * 
	 * ## 예제
	 *     BluetoothPlugin.cancelListening({
	 *         callback : function (success, errorMsg) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', '취소 성공');
	 *             } else {
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method read
	 * 블루투스 소켓에서 데이터 읽기<br/>
	 * 
	 * ## 예제
	 *     BluetoothPlugin.read({
	 *         params : {
	 *             socketId : 0,
	 *             bufferSize : 128 // byte
	 *         },
	 *         callback : function (success, byteArray) {
	 *             if(success) {
	 *                 Ext.Msg.alert('', CommonUtils.jsonEncode(byteArray));
	 *             } else {
	 *                 var errorMsg = byteArray;
	 *                 Ext.Msg.alert('', errorMsg);
	 *             }
	 *         }
	 *     });
	 * 한번 read메서드 호출해놓으면 데이터를 읽어들일때마다 callback이 지속적으로 호출된다. 
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
	/**
	 * @method write
	 * 블루투스 소켓에 데이터 쓰기
	 * 
	 * ## 예제
	 *     BluetoothPlugin.write({
	 *         params : {
	 *             socketId : 0,
	 *             data : [48, 49, 50]
	 *         },
     *         callback : function () {
     *         }
     *     });
	 * 
	 * @param config 설정정보
	 * @param {Function} config.callback 콜백함수
	 */
	
});