/**
 * @private
 * 블루투스 플러그인 (모바일용)<br/>
 * BluetoothPlugin에서 자동 생성하므로 개발자가 직접 생성하지 않는다.<br/>
 * 2013년 11월 06일 현재 안드로이드 전용이다.
 */
Ext.define('Axt.plugin.bluetooth.BluetoothPluginMobile', {
	requires  : [
	],
	
	initialize : function () {
		var me = this;
	},

	isSupported : function (config) {
		var me = this;
		var callbackFunc = config.callback;
        
        cordova.exec(function (supported){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'isSupported', []);
        
    },
	
	enable : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		
		cordova.exec(function (supported){
			if(callbackFunc){
				callbackFunc(supported);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'enable', []);
		
	},

    disable : function (config) {
    	var me = this;
    	var callbackFunc = config.callback;
    	
    	cordova.exec(function (supported){
    		if(callbackFunc){
    			callbackFunc(supported);
    		}
    	} , function (msg){
    		if(callbackFunc){
    			callbackFunc(false, msg);
    		}
    	},'BluetoothPlugin', 'disable', []);
    	
    },

	isEnabled : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		
		cordova.exec(function (supported){
			if(callbackFunc){
				callbackFunc(supported);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'isEnabled', []);
		
	},

	getAddress : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		
		cordova.exec(function (address){
			if(callbackFunc){
				callbackFunc(true, address);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'getAddress', []);
		
	},

	getName : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		
		cordova.exec(function (name){
			if(callbackFunc){
				callbackFunc(true, name);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'getName', []);
		
	},

	requestDiscoverable : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var duration = config.params.duration;

		cordova.exec(function (duration){
			if(callbackFunc){
				callbackFunc(true, duration);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'requestDiscoverable', [duration]);
		
	},

	startDiscovery : function (config) {
		var me = this;
		var callbackFunc = config.callback;

		cordova.exec(function (deviceJsonArray){
			if(callbackFunc){
				callbackFunc(true, deviceJsonArray);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'startDiscovery', []);
		
	},

	getBondedDevices : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var overlayConfig = config.overlayConfig || {};
		var title = overlayConfig.title || '디바이스 선택'; 
		var cls = overlayConfig.cls || ''; 
		
		var params = config.params || {};
		var deviceName = params.deviceName;

		cordova.exec(function (deviceJsonArray){

			if(Ext.isEmpty(deviceName)) { // deviceName이 설정 파라미터에 없다면 overlay를 띄워서 연결할 장치를 고르도록 한다. 
				Overlay.show({
					cls : cls,
					title : title,
					cont_cont : [ 
			            {    
			            	xtype : 'list', 
			            	itemTpl: '{name}<br/>{address}',
			            	data: deviceJsonArray,
			            	listeners : {
			            		itemtap : function (thisObj, index, target, record, e, eOpts) {
			            			Overlay.close();
			            			if(callbackFunc){
			            				callbackFunc(true, record.data);
			            			}
			            		}
			            	}
			            }
			        ]
				}); // end overlay
			} else { // deviceName이 설정 파라미터에 있다면 폰갭으로 얻어온 페어링된 장치를 스크립트로 바로 검색하여 콜백한다. (오버레이 없이!)
				
				var deviceJson = null;
				for(var i=0; i<deviceJsonArray.length; i++) {
					if(deviceJsonArray[i].name === deviceName) {
						deviceJson = deviceJsonArray[i]; 
					}
				}
				
				if(deviceJson) {
					if(callbackFunc){
        				callbackFunc(true, deviceJson);
        			}
				} else {
					if(callbackFunc){
						callbackFunc(false, null);
					}
				}
			} 
			
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'getBondedDevices', []);
		
	},

	fetchUUIDs : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var address = config.params.address;

		cordova.exec(function (uuidJsonArray){
			if(callbackFunc){
				callbackFunc(true, uuidJsonArray);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'fetchUUIDs', [address]);
		
	},
	
	connect : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var address = config.params.address;
		var uuid = config.params.uuid;
		var secure = config.params.secure;
		
		cordova.exec(function (socketId){
			if(callbackFunc){
				callbackFunc(true, socketId);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'connect', [address, uuid, secure]);
		
	},
	
	disconnect : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var socketId = config.params.socketId;

		cordova.exec(function (){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'disconnect', [socketId]);
		
	},
	
	listen : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var name = config.params.name;
		var uuid = config.params.uuid;
		var secure = config.params.secure;

		cordova.exec(function (socketId){
			if(callbackFunc){
				callbackFunc(true, socketId);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'listen', [name, uuid, secure]);
		
	},
	
	cancelListening : function (config) {
		var me = this;
		var callbackFunc = config.callback;

		cordova.exec(function (){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'cancelListening', []);
		
	},
	
	read : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var socketId = config.params.socketId;
		var bufferSize = config.params.bufferSize;

		cordova.exec(function (byteArray){
			if(callbackFunc){
				callbackFunc(true, byteArray);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'read', [socketId, bufferSize]);
		
	},
	
	write : function (config) {
		var me = this;
		var callbackFunc = config.callback;
		var socketId     = config.params.socketId;
		var data         = config.params.data;

		cordova.exec(function (){
			if(callbackFunc){
				callbackFunc(true);
			}
		} , function (msg){
			if(callbackFunc){
				callbackFunc(false, msg);
			}
		},'BluetoothPlugin', 'write', [socketId, data]);
		
	}
		
});