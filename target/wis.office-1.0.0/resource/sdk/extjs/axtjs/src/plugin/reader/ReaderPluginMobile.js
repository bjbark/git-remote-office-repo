/**
 * @private
 * 리더 플러그인 (모바일용)<br/>
 * ReaderPlugin에서 자동 생성하므로 개발자가 직접 생성하지 않는다.
 */
Ext.define('Axt.plugin.reader.ReaderPluginMobile', {
	requires  : [
	],
	
	initialize : function () {
		var me = this;
	},

	connect : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var params = config.params || {};
		var readerType = params.readerType;
		if(Ext.isEmpty(readerType)) {
			readerType = 'UIDS_G7';
		}
		
		if(readerType === 'UIDS_G7') {
			me.connect_UIDS_G7(config);
		} else {
			// ..... 앞으로 다른 리더장비가 생긴다면 이쪽으로 구현...
		}
	},
	
	disconnect : function (config) {
		var me = this;
		var config = config || {};
		var params = config.params || {};
		var readerType = params.readerType;
		if(Ext.isEmpty(readerType)) {
			readerType = 'UIDS_G7';
		}
		
		if(readerType === 'UIDS_G7') {
			me.disconnect_UIDS_G7(config);
		} else {
			// ..... 앞으로 다른 리더장비가 생긴다면 이쪽으로 구현...
		}
	},
	
	
	
	
	////////////////////// UIDS_G7 블루투스 리더 구현 시작 /////////////////////////////
	
	/**
	 * @private
	 * @ignore
	 * UIDS_G7리더의 자바 BluetoothSocket을 저장하고있는 arraylist의 index를 갖고있는 변수
	 */
	readerSocketId : null,
	
	/**
	 * 리더와 연결 되어있는지 확인
	 */
	isConnectReader : function () {
		return !Ext.isEmpty(this.readerSocketId);
	},
	

	/**
	 * @private
	 */
	connect_UIDS_G7 : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var connectFunc = config.connect;
		var params = config.params || {};
		var deviceName = params.deviceName; // 연결할 장치이름
		
		// 이하의 코드는 블루투스 연결부터 socket으로부터 read하는 callback을 등록하는것까지의 과정인데
		// callback의 연속이므로 batch클래스를 이용하여 순차적인 처리를 구현했다.
		var batch = Axt.util.Batch.getInstance();
		
		// 1. 장치의 블루투스가 꺼져있다면 블루투스를 먼저 켠다.
		batch.add(function() {
			
			// 블루투스가 켜있나 확인
			BluetoothPlugin.isEnabled({
				callback : function(enabled) {
					if( me.isConnectReader() ) {
						Ext.Msg.alert('', '이미 연결되어 있습니다.');
						if(connectFunc) {
							connectFunc(false, '이미 연결되어 있습니다.');
						}
						return;
					}
					
					if(!enabled) { // 블루투스가 켜져있지 않다면 먼저 켜야한다.
						BluetoothPlugin.enable({
							callback : function(success) {
								if(success) {
									batch.next();
								} else {
									if(connectFunc) {
										connectFunc(false, '블루투스가 켜지지 않았습니다.');
									}
								}
							}
						});
					} else { // 블루투스가 켜있다면 바로 다음단계로 진행
						batch.next();
					}
				}
			});
		});
		
		// 2. 페어링된 장치를 가져온후 바코드기기를 선택하면 연결을 진행한다.
		batch.add(function(seq) {
			BluetoothPlugin.getBondedDevices({
				params : {
					deviceName : deviceName
				},
				callback : function(success, deviceJson) {
					if(success) {
						batch.next(deviceJson);
					} else {
						if(connectFunc) {
							connectFunc(false, '장치가 검색되지 않았습니다.');
						}
					}
				} // end callback
			});
		});
		
		// 3. 선택된 장치의 mac address의 uuid를 구해서 가져온다
		batch.add(function(deviceJson, seq) {
			Ext.Viewport.setMasked({xtype : 'loadmask',message : '연결중 입니다...', indicator : true});
		    var address = deviceJson.address;
		    
		    BluetoothPlugin.fetchUUIDs({
		    	params:{
		    		address : address
		    	},
				callback : function(success, uuidJsonArray) {
					var uuid = uuidJsonArray[0];
					batch.next(address, uuid);
				}
			});
		});
		
		// 4. mac address, uuid정보로 client장치와 바코드 장치를 연결한다.
		batch.add(function(address, uuid, seq) {
			BluetoothPlugin.connect({
		    	params:{
		    		address : address,
		    		uuid : uuid,
		    		secure : true
		    	},
		    	callback : function(success, socketId) {
		    		Ext.Viewport.setMasked(false);
		    		
		    		if(success) {
		    			me.readerSocketId = socketId;
		    			
		    			if(connectFunc) {
							connectFunc(true, socketId);
						}
		    			
		    			batch.next(socketId);
		    		} else {
		    			var errorMsg = socketId;
		    			Ext.Msg.alert('', errorMsg);
		    			if(connectFunc) {
		    				connectFunc(false, socketId);
		    			}
		    		}
		    	}
		    });
		});
		
		// 5. 읽기 start
		batch.add(function(socketId, seq) {
			var resultByteArray = [];
			var isStx = false;
			
			BluetoothPlugin.read({
				params : {
					socketId : socketId,
					bufferSize : 32
				},
				callback : function(success, byteArray) {
					// debug용
				    // console.log(CommonUtils.jsonEncode(byteArray));
					for(var i=0; i<byteArray.length; i++) {
						var data = byteArray[i];
						if( ! isStx) { // 데이터 읽기 시작전 시작코드 확인
							isStx = true;
						} else {       
						    // 데이터 읽기 종료
							if(data===13) {  
								if( resultByteArray.length === 4 && resultByteArray[0]===51
								) {
									// 리턴값이 3로 시작하고  byte길이가 4자리인경우
									// 바코드 리더기에서 뭔가 보내는 값이긴 한것같지만
									// 개발하는 현재 단말기의 프로토콜이 공개 되어있지 않으므로 어떤값인지 알수가 없어서
									// 값을 무시하고 콜백하지 않는다.
									
								} else if(resultByteArray.length > 0){ // 여기서 호출한지점으로 읽은 바코드값이나 카드번호 값을 리턴한다.
									var firstByte = resultByteArray[0];
									var lastByte = resultByteArray[resultByteArray.length-1];
									var isCardReaderType = firstByte===59 && lastByte===63;
									if(isCardReaderType) {  // 카드 리더로 읽었을경우
										 // 카드리더의 경우 앞의;와 끝의? 문자를 제거하고 보낸다.
										resultByteArray.shift();
										resultByteArray.pop();
									}
									
									// read한 값 콜백!
									if(callbackFunc){
										callbackFunc(true, EucKrUtil.convert(resultByteArray));
									}
								}
								resultByteArray=[];
							} else if(data !== 0) { // 데이터 읽기
								resultByteArray.push(data);
							}
						}
					}// end for
						
				}// end callback
			}); // end read
		});
		
		// 실행
		batch.run({
			callback : function () {                   // 모든 batch작업 끝난후 마지막 콜백
			    Ext.Msg.alert('', '리더 연결이 완료 되었습니다.');
			} 
		});
		
	},

	/**
	 * @private
	 */
	disconnect_UIDS_G7 : function (config) {
		var me = this;
		if(Ext.isEmpty(me.readerSocketId)) {
			Ext.Msg.alert('연결되어있지 않습니다.');
			return;
		}
		
		if(!config) {
			config = {};
		}
		var callbackFunc = config.callback;
		
		BluetoothPlugin.disconnect({
			params : {
				socketId : me.readerSocketId
			},
			callback : function (success, message) {
				if(success) {
					me.readerSocketId = null;
				} else {
					Ext.Msg.alert('', message);
				}
				
				if(callbackFunc) {
					callbackFunc(success, message);
				}
			}
		});
	}
	
	////////////////////// UIDS_G7 블루투스 리더 구현 끝 /////////////////////////////	
	
});