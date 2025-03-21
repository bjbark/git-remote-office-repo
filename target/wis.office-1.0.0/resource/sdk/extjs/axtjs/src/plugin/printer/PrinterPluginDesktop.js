/**
 * @private
 * 프린터 플러그인 (데스크탑용)<br/>
 * PrinterPlugin에서 자동 생성하므로 개발자가 직접 생성하지 않는다.
 */
Ext.define('Axt.plugin.printer.PrinterPluginDesktop', {
	requires  : [
	],
	
	initialize : function () {
		var me = this;
	},
	
	/**
	 * @private
	 * 좌표설정해서 text, image, barcode를 프린트
	 */
	printCoordinate : function (config) {
	    var me = this;
	    var callback = config.callback;
	    
	    if(config.params.setting.copy === undefined) {
	    	config.params.setting.copy = 1;
	    }
	    
	    AppletDova.execute({
            plugin : 'PrinterPlugin',
            method : 'printCoordinate',
            params :config.params,
            success : function(res){
                if(typeof callback ==='function'){
                	callback(true);
                }
            },
            failure : function(msg){
            	Ext.Msg.alert('', msg);
            	if(typeof callback ==='function'){
            		callback(false, msg);
            	}
            }
        });
	    
	},
	
	/**
	 * @private 
	 * local하드디스크의 PDF파일을 읽어서 Print
	 */
	printPDFFile : function (config) {
	    var me = this;
	    var callback = config.callback;
	    
	    if(config.params.printerName === undefined) {
			config.params.printerName = '';
		}
	    
	    if(config.params.copy === undefined) {
	    	config.params.copy = 1;
	    }
	    
	    AppletDova.execute({
            plugin : 'PrinterPlugin',
            method : 'printPDFFile',
            params :config.params,
            success : function(success){
				if(typeof callback ==='function'){
					var msg = '';
					if(success) {
						msg = '성공 했습니다.';
					} else {
						msg = '취소 했습니다.';
					}
					callback(true, msg);
				}
			},
            failure : function(msg){
            	Ext.Msg.alert('', msg);
            	if(typeof callback ==='function'){
            		callback(false);
            	}
            }
        });
	},
	
	/**
	 * @private
	 * URL로부터 PDF를 읽어서 Print
	 */
	printPDFUrl : function (config) {
		var me = this;
		var callback = config.callback;
		
//		console.debug('config', config);
		// urlParam json을 문자열형태로 변환
		config.params.urlParam = CommonUtils.jsonEncode(config.params.urlParam );
		
		if(config.params.printerName === undefined) {
			config.params.printerName = '';
		}
		
	    if(config.params.copy === undefined) {
	    	config.params.copy = 1;
	    }
		
		AppletDova.execute({
			plugin : 'PrinterPlugin',
			method : 'printPDFUrl',
			params :config.params,
			success : function(success){
				if(typeof callback ==='function'){
					var msg = '';
					if(success) {
						msg = '성공 했습니다.';
					} else {
						msg = '취소 했습니다.';
					}
					callback(true, msg);
				}
			},
			failure : function(msg){
				if(typeof callback ==='function'){
					callback(false, msg);
				}
			}
		});
	},
	
	/**
	 * @private
	 * 프린터 목록 가져오기
	 */
	getPrinterList : function (config) {
		var me = this;
		var callback = config.callback;

		AppletDova.execute({
			plugin : 'PrinterPlugin',
			method : 'getPrinterList',
			params :config.params,
			success : function(printerList){
				if(typeof callback ==='function'){
					callback(true, printerList, '성공');
				}
			},
			failure : function(msg){
				if(typeof callback ==='function'){
					callback(false, [], msg);
				}
			}
		});
	},
	
	/**
	 * @private
	 * 라벨 프린터 프린트
	 */
	printLabel : function (config) {
		var me = this;
//		console.log(config);
//	    var printerName = config.params.printerName;
//      라벨 프린터 종류에 따라서 파라미터를 만든다.
//	    if(printerName === 'TTP-243') {
//	    	data = me.printLabel_TTP243(config.params);
//	    }
		console.log('최종 출력 데이터 param', config.params);
	    
		SerialPlugin.openWriteClose({
			params : {
				portName : config.params.portName,
				baudRate : config.params.baudRate,
				data     : config.params.data,
				dataGap  : config.params.dataGap
			},
			callback:function(success, msg){
				if(Ext.isFunction(config.callback)) {
					config.callback(success, msg);
				}
			}
		});
	    
	}
	
//	, CRLF : '\r\n', // 개행 상수
//	/**
//	* TTP243 라벨프린터의 명령어
//    */
//	printLabel_TTP243 : function(params){
//		var me = this;
//		
//		var returnValue = [];
//		
//		// 용지 조정
//		returnValue.push('FORMFEED' + me.CRLF);
//		
//		// 출력 시작
//		for(var i=0; i<params.data.length; i++) {
//			var data_        = params.data[i];
//			
//			var commandStr = '' + 
//				'SIZE ' +    params.paperWidth + ' mm, ' + params.paperHeight + ' mm'+me.CRLF + // 라벨용지크기
//	            'GAP '  +    params.paperGap +    'mm,0'+me.CRLF +                                        // 라벨과 라벨사이의 gap
//	            'SPEED ' +   params.speed +       me.CRLF+                                                                       // 출력속도 (초당 3.5인치 출력)
//	            'DENSITY ' + params.density +     me.CRLF+                                                                       // 화면밀도 (진한 정도)
//	            'DIRECTION '+params.direction+''+        me.CRLF+ // 0:정방향, 1:역방향                           // 출력방향 (0:출력되는 정방향, 1:출력방향과 반대)
//	            'REFERENCE '+ me.mmToDot(params.topX) +','+ me.mmToDot(params.topY)+''+me.CRLF+                 // 출력시작좌표 초기화 x,y
//	            'CLS' + me.CRLF;
//	           
//			     // 바코드
//				 for(j=0; j<data_.barcodeData.length; j++) {
//					 var barcodeData = data_.barcodeData[j];
//					 commandStr += me.createBarcodeData(
//							 barcodeData.data, barcodeData.type, 
//							 barcodeData.x, barcodeData.y, barcodeData.h,
//							 barcodeData.rotation, barcodeData.narrow, barcodeData.wide
//					 );
//				 }
//				 
//				 // text data
//				 for(j=0; j<data_.textData.length; j++) {
//					 var textData = data_.textData[j];
//					 commandStr += me.createTextData(textData.data, textData.x, textData.y, textData.fs, textData.rotation);
//				 }
//				
//			    // count만큼 바코드 출력
//	            commandStr += 'PRINT ' + data_.count + me.CRLF;
//	            
//	            // 종료
//	            commandStr += 'EOP' + me.CRLF;
//	            
//	            returnValue.push(commandStr);
//		}
//		
//		// 종이를 좀더 앞쪽으로 빼주기위한 feed
//		returnValue.push('FEED 20*8' + me.CRLF);
//		
//		return returnValue;
//	},
//	
//	/**
//	 * @private
//	 * 라벨 프린터로 보낼 텍스트 데이터 생성 공통
//	 */
//	createTextData : function (text, x, y, fontSize, rotation) {
//		var me = this;
//		if(fontSize ===0 || x === 0 || y === 0 || Ext.isEmpty(fontSize) || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(text)) {
//			return '';
//		}
//		
//		return 'TEXT '+ 
//		me.mmToDot(x) + ', ' + // 텍스트 x좌표
//		me.mmToDot(y) + ','  + // 텍스트 y좌표
//		'"K",' + 			   // 폰트
//		rotation + ',' + 	   // rotation (고정!)
//		fontSize + ',' +	   // 글자크기 width  (1~10)
//		fontSize + ',' + 	   // 글자크기 height (1~10) 
//		'"'+ text +'"' +       // 출력할 문자열 (""로 감싸야 한다!!)
//		me.CRLF; 
//	},
//	
//	/**
//	 * @private
//	 * 라벨 프린터로 보낼 바코드 데이터 생성 공통
//	 */
//	createBarcodeData : function (barcode, barcodeType, x, y, h, rotation, narrow, wide) {
//		var me = this;
//		if(x === 0 || y === 0 || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(barcode)) {
//			return '';
//		}
//		
//		if(Ext.isEmpty(barcodeType)) {
//			barcodeType = '128';
//		}
//		
//		if(Ext.isEmpty(narrow)) {
//			narrow = 2;
//		}
//		if(Ext.isEmpty(wide)) {
//			wide = 2;
//		}
//		
//		return 'BARCODE ' +       // x,y, code type, 바코드 높이, 
//    	me.mmToDot(x) +', '+      // 바코드x int형
//    	me.mmToDot(y) +', '+      // 바코드y int형
//    	'"' + barcodeType +'",'+  // 바코드타입 string형
//    	me.mmToDot(h) +',' +      // 바코드의 높이 int형
//    	'1,' + rotation + ','+narrow+','+wide+','+  // humanreadable(0 or1) (바코드 문자표시), rotation, narrow, wide
//    	'"'+ barcode +'"' +  // 바코드 (""로 감싸야 한다!!) 
//    	me.CRLF;
//	},
//	
//	/**
//	 * 설정 mm정보를 바코드 프린터가 인식할 수 있는 dot형식으로 변환
//	 */
//	mmToDot : function (value, dpi){
//		if(dpi === undefined) {
//			dpi = 200;
//		}
//		
//		if(dpi===200) {
//			return value * 8;
//		} else if(dpi===300){
//			return value * 12;
//		} else {
//			return value * 8;
//		}
//			
//	}
	
});