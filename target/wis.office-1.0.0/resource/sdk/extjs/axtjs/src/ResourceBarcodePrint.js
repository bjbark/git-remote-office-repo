/**
 * Resource.js에서 사용되는 바코드 출력관련 support class
 * 
 * @author kdarkdev
 * @since 
 * @version 1.0
 * 
 */
Ext.define('Axt.ResourceBarcodePrint', {  
	alternateClassName: [ 'ResourceBarcodePrint' ],
    singleton : true,
    requires : [
    ],
    
	/**
	 * 프린터 출력을 호출 한다.<br/>
	 * 호출방법은 Resource.js의 loadPrint메서드의 주석을 참고.
	 */
    loadBarcodePrint : function( config ) {
		var me = this;
		var params = config.params;
		
	// step1. 유효성 체크
		var configModel = me.loadBarcodePrintValid(config);
		if(configModel === false){
			return false;
		}
		
	// step2. 프린트 플러그인의 라벨프린트 메서드에 전달될 출력데이터 가공
	// 호출지점인 컨트롤러에서의 데이터와, localstorage에 저장된 설정을 조합한다.
		var data = me.createLabelData(params, configModel);

		Ext.MessageBox.show({
 	    	 title: '잠시만 기다려 주십시오.',
 	    	 width: 300,
 	    	 progress: true,
 	    	 closable: false,
 	    	 wait : true,
 	    	 waitConfig  : {
 	    		 interval: 500, //bar will move fast!
 	             duration: 50000,
 	             increment : 15,
 	             text : '출력중 입니다.'
 	    	 }
     	});
		
	// step3. 플러그인 초기화 및 애플릿으로 프린터 정보 write
		PluginInit.initialize({
			callback:function () {
				
				// 라벨프린트 호출
				PrinterPlugin.printLabel({
				    params : {
				        portName : configModel.get('port_name'),
				        baudRate : configModel.get('baud_rate'),
				        data : data  // 출력 데이터 배열
				    },
				    callback:function(success, msg){
			    		Ext.MessageBox.hide();
				    	if(!success) {
				    		Ext.Msg.alert('', msg);
				    	}
				    	if(Ext.isFunction(config.callback)) {
    						config.callback(success);
    					}
				    }
				}); // end PrinterPlugin.printLabel
    			
			} // end PluginInit.initialize callback
		}); // end applet initialize
		
	},
	
	getStore : function () {
		var me = this;
		if(!me.store) {
    		var store = Ext.create('Axt.popup.store.BarcodePrinter');
    		store.load();
    		me.store = store;
    	} else {
    		me.store.load();
    	}
		return me.store;
	},
	
	/**
	 * @private
	 */
    loadBarcodePrintValid : function (config) {
    	var me = this;
    	var params = config.params;
    	
    	var store = me.getStore();
    	
    	// 바코드 프린터 정보중 현재 사용중인 설정(model)을 가져온다.
		var configModel = me.store.findRecord('use_yn', true);
		if( ! configModel) {
			Ext.Msg.alert('', '바코드 프린터를 설정해 주십시오.');
			if(Ext.isFunction(config.callback)) {
				config.callback(false);
			}
			return false;
		}
		if( ! params || Ext.isArray(params) && params.length === 0) {
			Ext.Msg.alert('', 'params에 데이터가 없습니다.');
			if(Ext.isFunction(config.callback)) {
				config.callback(false);
			}
			
			return false;
		}
		
		return configModel;
    },
    
    /**
	 * @private
	 * 
	 * 바코드 출력할 데이터를 생성한다.
	 */
    createLabelData : function (params, configModel) {
    	var me = this;
    	var rawDataArr = [];
    	
    	// step1 controller로부터 넘어온 데이터 파라미터와 
    	//       localstorage의 model의 설정값을 가지고 1차적으로 rawDataArr에 담는다.
    	//       이렇게 안하면 이 loop밑의 step2에서 각 프린터별로 중복된 코드들이 만들어 질수 있다.
    	//       그러므로 이렇게 1차로 기초 데이터를 만든다.
		for(var i=0; i<params.length; i++) {
			var param = params[i];
			
			// 아래의 step2에서 활용하기위한 출력 기초 데이터 생성.
			var rawData = {
				count : param.count,
			    textData : [],
			    barcodeData : []
			};
			
			// 각 항목들은 2개씩 출력하는 옵션이 있다.
			for(var j=0; j<2; j++) {
				var nameTail = j===0?'':'2'; // 각 설정명끝에 붙는 이름 (''또는 '2')
				
				rawData.textData.push({ // 품명
		    	    data : configModel.get('item_nm_title' + nameTail) + param.itm_nm, 
		    	    x : configModel.get('item_nm_x' + nameTail), y:configModel.get('item_nm_y' + nameTail),
		    	    fs:configModel.get('item_nm_fs' + nameTail), rotation:configModel.get('item_nm_rotation' + nameTail)
		        },
		        { // 규격 
		        	data : configModel.get('item_sp_title' + nameTail) + param.itm_sp, 
		        	x : configModel.get('item_sp_x' + nameTail), y:configModel.get('item_sp_y' + nameTail), 
		        	fs:configModel.get('item_sp_fs' + nameTail), rotation:configModel.get('item_sp_rotation' + nameTail)
		        },
		        { // 소비자가 
		        	data : configModel.get('sobi_price_title' + nameTail) + CommonUtils.addComma((param.cst_pri+'').replace(/,/g,'')), 
		        	x : configModel.get('sobi_price_x' + nameTail), y:configModel.get('sobi_price_y' + nameTail), 
		        	fs:configModel.get('sobi_price_fs' + nameTail), rotation:configModel.get('sobi_price_rotation' + nameTail)
		        },
		        { // 판매가 
		        	data : configModel.get('sale_price_title' + nameTail) + CommonUtils.addComma((param.stad_sale_pri+'').replace(/,/g,'')), 
		        	x : configModel.get('sale_price_x' + nameTail), y:configModel.get('sale_price_y' + nameTail), 
		        	fs:configModel.get('sale_price_fs' + nameTail), rotation:configModel.get('sale_price_rotation' + nameTail)
		        },
		        { // 품목코드
		        	data : configModel.get('item_cd_title' + nameTail) + param.itm_cd, 
		        	x : configModel.get('item_cd_x' + nameTail), y:configModel.get('item_cd_y' + nameTail), 
		        	fs:configModel.get('item_cd_fs' + nameTail), rotation:configModel.get('item_cd_rotation' + nameTail)
		        },
				{ // 태그코드
					data : configModel.get('tagcode_title' + nameTail) + param.tagcode, 
					x : configModel.get('tagcode_x' + nameTail), y:configModel.get('tagcode_y' + nameTail), 
					fs:configModel.get('tagcode_fs' + nameTail), rotation:configModel.get('tagcode_rotation' + nameTail)
				});
				
				rawData.barcodeData.push({
                    data : param.barcode, // 바코드 데이터
                    type : configModel.get('barcode_type' + nameTail),       // 바코드타입 code128
                    x    : configModel.get('barcode_x' + nameTail),          // 바코드출력될 x좌표 (mm)
                    y    : configModel.get('barcode_y' + nameTail),          // 바코드출력될 y좌표 (mm)
                    h    : configModel.get('barcode_h' + nameTail),          // 바코드의 높이 (mm)
                    narrow : configModel.get('barcode_narrow' + nameTail),  
                    wide : configModel.get('barcode_wide' + nameTail),
                    rotation : configModel.get('barcode_rotation' + nameTail),// (회전각도 0, 90, 180, 270)
                    textVisible : configModel.get('barcode_text_visible' + nameTail) // 바코드의 텍스트 보이는 여부 (true, false)
                });
			} // end for
			
			rawDataArr.push(rawData);
		}
		
		// step2. 
		// 최종적으로 리턴될 바코드 출력 데이터
		// 위의 기초 데이터를 활용하여 아래에서 마지막으로 각 프린터별 언어를 활용하여
		// 출력할 데이터를 생성해 낸다.
		var printerName = configModel.get('printer_name');
		if(printerName === Const.BarcodePrinterType.TSC_TTP243) { // tsc사의 ttp243 (작은것)
			return me.createLabelData_TTP243(rawDataArr, configModel);
		} else if (printerName === Const.BarcodePrinterType.ZEBRA_ZM400) { // zebra사의 zm400프린터 (큰것)
			return me.createLabelData_ZM400(rawDataArr,  configModel);
		} else {
		}
    },
    
    
    //////////////////////////// 모든 바코드 프린터에서 공용으로 사용되는 메서드 시작 ////////////////////////
	/**
	 * 설정 mm정보를 바코드 프린터가 인식할 수 있는 dot형식으로 변환
	 */
	mmToDot : function (value, dpi){
		if(dpi === undefined) {
			dpi = 200;
		}
		
		if(dpi===200) {
			return value * 8;
		} else if(dpi===300){
			return value * 12;
		} else {
			return value * 8;
		}
			
	},
	////////////////////////////모든 바코드 프린터에서 공용으로 사용되는 메서드 끝 ////////////////////////
    
    
    
    ///////////////////////////////////////////////// ZEBRA ZM400 바코드 프린터용 data생성 구현 시작 //////////////////////////////////////////////////////
    createLabelData_ZM400 : function (rawDataArr, configModel) {
    	var me = this;
    	var returnValue   = [];

		for(var i=0; i<rawDataArr.length; i++) {
			var rawData = rawDataArr[i];
			var commandStr = '';
			commandStr += '^XA';   												// 바코드 출력 시작
			commandStr += '^SEE:UHANGUL.DAT';                                   // 한글문자 설정 (고정)
			commandStr += '^CW1,E:KFONT3.FNT';                                  // CW1:한글폰트 설정 (고정)
			commandStr += '^LH' + configModel.get('top_x') + ',' + configModel.get('top_y'); // 기준점 설정
			commandStr += '^MD' + configModel.get('barcode_density');           // 인쇄밀도 
			commandStr += '^PQ' + rawData.count									// ** 출력장수 ** 
			commandStr += '^PR' + configModel.get('barcode_speed');             // 인쇄속도
			commandStr += ('^PO' + (configModel.get('direction')===1?'N':'I')); // 인쇄방향 (^PON : 정방향, ^POI:역방향 180도 회전)
			commandStr += '^PW' + me.mmToDot( configModel.get('paper_width') ); // print label 용지의 width값
			
			// 바코드
			for(j=0; j<rawData.barcodeData.length; j++) {
			    var barcodeData = rawData.barcodeData[j];
			    commandStr += me.createBarcodeData_ZM400(barcodeData);
			}
			 
			// ^XA^SEE:UHANGUL.DAT^FS^PON^FS^CW1,E:KFONT3.FNT^FSFO120,8^CI26^A1N,24,24^FD[공통]모나미 153^FSFO160,112^CI26^A1N,24,24^FD0^FS^XZ
			// ^XA^SEE:UHANGUL.DAT^FS^PON^FS^CW1,E:KFONT3.FNT^FS^FO50,50^CI26^A1N,40,10^FD한글테스트 OK!!!^FS^FO200,100^CI26^A1N,40,40^FD한글테스트 OK!!!^FS^XZ
			// text data setting
			for(j=0; j<rawData.textData.length; j++) {
				var textData = rawData.textData[j];
				commandStr += me.createTextData_ZM400(textData);
			}
			commandStr += '^XZ'; // 바코드 출력 종료
			returnValue.push(commandStr);
			
			var paperHeight = configModel.get('paper_height'); // 라벨용지 세로길이
			var printSpeed  = configModel.get('barcode_speed'); // 초당 출력 inch (3일경우 1초에 3인치 출력 (7.54cm)
			
			/**
			 * 1 - 25.4
			 * 2 - 50.8
			 * 3 - 75.4mm
			 * 4 - 101.6
			 * 5 - 127
			 */
			// 용지에 출력하는데 걸리는 시간(초)에 250ms의 여유를 더 준다.
			// 이렇게 delay를 줘야 zm400바코드 프린터가 데이터를 유실하지 않는다.
			dataGap = Math.floor((paperHeight / (25.4  * (printSpeed) )) * 1150);
			
			// #sleep#=500 과같은 문자열을 데이터로 보낸다면 500ms의 delay를 주게 된다.
			returnValue.push('#sleep#=' + ( rawData.count * dataGap )); 
		}
		
    	return returnValue;
    },
    
    /**
     * @private
     * (ZM400 프린터용) 라벨 프린터로 보낼 test데이터 생성
     */
    createTextData_ZM400 : function (textData) {
		var me = this;
		var text=textData.data, x=textData.x, y=textData.y, fontSize=textData.fs, rotation=textData.rotation;
		
		if(fontSize ===0 || x === 0 || y === 0 || Ext.isEmpty(fontSize) || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(text)) {
			return '';
		}
		
		var returnValue = '';
		// ^FO50,50^CI26^A1N,40,10^FD한글테스트 OK!!!
		returnValue += '^FO';
		returnValue += me.mmToDot(x) + ',';            // x좌표 (mm를 dot으로 변환)
		returnValue += me.mmToDot(y);                  // y좌표 (mm를 dot으로 변환)
		returnValue += '^CI26^A1';                     // text 관련된 설정
		if(rotation === 0) {
			returnValue += 'N';
		} else if (rotation === 90) {
			returnValue += 'R';
		} else if (rotation === 180) {
			returnValue += 'I';
		} else if (rotation === 270) {
			returnValue += 'B';
		}
		returnValue += ',';
		returnValue += me.mmToDot(fontSize * 2.9) + ','; // 글자 높이 (ttp243과의 호환성을 위해 이런 코딩을 했다)
		returnValue += me.mmToDot(fontSize * 2.8);       // 글자 넓이 (ttp243과의 호환성을 위해 이런 코딩을 했다)
		returnValue += ('^FD' + text + '^FS');              // 인쇄할 데이터 정의 시작
		return returnValue;
	},
	
	/**
	 * @private
	 * (ZM400 프린터용) 라벨 프린터로 보낼 바코드 데이터 생성
	 */
	createBarcodeData_ZM400 : function (barcodeData) {
		var me = this;
		var barcode=barcodeData.data, barcodeType=barcodeData.type, 
		    x=barcodeData.x, y=barcodeData.y, h=barcodeData.h, 
		    rotation=barcodeData.rotation, narrow=barcodeData.narrow, 
		    wide=barcodeData.wide, textVisible=barcodeData.textVisible;
		
		if(x === 0 || y === 0 || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(barcode)) {
			return '';
		}
		
		if(Ext.isEmpty(barcodeType)) {
			barcodeType = '128';
		}
		
		if(Ext.isEmpty(narrow)) {
			narrow = 2;
		}
		if(Ext.isEmpty(wide)) {
			wide = 2;
		}
		
		var returnValue = '';
		returnValue += '^FO';
		returnValue += me.mmToDot(x) + ',';            // x좌표 (mm를 dot으로 변환)
		returnValue += me.mmToDot(y);                  // y좌표 (mm를 dot으로 변환)
		returnValue += '^BY';                          // 바코드 속성 설정 시작
		returnValue += narrow + ',';                   // - 기준 module 좁은바의 넓이
		returnValue += wide + ',';                     // - 넓은바와 좁은바의 비율
		returnValue += me.mmToDot(h);                  // - 바코드의 높이 int형
		
		if(barcodeType === '128') {
			// local storage에 저장된 공통 barcodeType을 ZM400 프린터가 알아 들을수있는 
			// 코드로 변환 (ttp243 프린터와 호환되게 하기위함)
			returnValue += '^BC';
			if(rotation === 0) {
				returnValue += 'N,';
			} else if (rotation === 90) {
				returnValue += 'R,';
			} else if (rotation === 180) {
				returnValue += 'I,';
			} else if (rotation === 270) {
				returnValue += 'B,';
			}
			returnValue += (me.mmToDot(h) + ','); // 높이
			if(textVisible) {
				returnValue += ('Y' + ',');           // 바코드 아래에 코드표시
			} else {
				returnValue += ('N' + ',');           // 바코드 아래에 코드표시
			}
			returnValue += ('N' + ',');           // 바코드 위에 코드표시
			returnValue += ('N' + ',');           // UCC check digit 표시
			returnValue += ('A');                 //  
			returnValue += ('^FD' + barcode + '^FS');
		}
		
		return returnValue;
	},
    ///////////////////////////////////////////////// ZEBRA ZM400 바코드 프린터용 data생성 구현 끝 //////////////////////////////////////////////////////
    
    
    
    
    
    
    
    
    ///////////////////////////////////////////////// TTP243 바코드 프린터용 data생성 구현 시작 //////////////////////////////////////////////////////
    CRLF : '\r\n', // TTP243프린터의 개행 상수
	/**
	* TTP243 라벨프린터의 명령어
    */
    createLabelData_TTP243 : function (rawDataArr, configModel){
		var me = this;
		var returnValue = [];
		
		// 용지 조정
		returnValue.push('FORMFEED' + me.CRLF);
		
		for(var i=0; i<rawDataArr.length; i++) {
			var rawData = rawDataArr[i];
			// 출력 시작
			var commandStr = '' + 
			'SIZE ' +      configModel.get('paper_width') + ' mm, ' + configModel.get('paper_height') + ' mm'+me.CRLF +  // 라벨용지크기
	        'GAP '  +      configModel.get('paper_gap') +    'mm,0' + me.CRLF +                                          // 라벨과 라벨사이의 gap
	        'SPEED ' +     configModel.get('barcode_speed')         + me.CRLF+                                           // 출력속도 (초당 3.5인치 출력)
	        'DENSITY ' +   configModel.get('barcode_density')       + me.CRLF+                                           // 화면밀도 (진한 정도)
	        'DIRECTION '+  configModel.get('direction') + ''        + me.CRLF +                                          // 출력방향 (0:출력되는 정방향, 1:출력방향과 반대)
	        'REFERENCE '+  me.mmToDot(configModel.get('top_x')) +','+ me.mmToDot(configModel.get('top_y'))+''+me.CRLF+   // 출력시작좌표 초기화 x,y
	        'CLS'                                                   + me.CRLF;
	       
		     // 바코드
			 for(j=0; j<rawData.barcodeData.length; j++) {
				 var barcodeData = rawData.barcodeData[j];
				 commandStr += me.createBarcodeData(barcodeData);
			 }
			 
			 // text data
			 for(j=0; j<rawData.textData.length; j++) {
				 var textData = rawData.textData[j];
				 commandStr += me.createTextData(textData);
			 }
			
		    // count만큼 바코드 출력
	        commandStr += 'PRINT ' + rawData.count + me.CRLF;
	        
	        // 종료
	        commandStr += 'EOP' + me.CRLF;
	        
	        returnValue.push(commandStr);
		}
		
		// 종이를 좀더 앞쪽으로 빼주기위한 feed
		returnValue.push('FEED 25*8' + me.CRLF);
		
		return returnValue;
	},
	
	/**
	 * @private
	 * 라벨 프린터로 보낼 텍스트 데이터 생성 공통
	 */
	createTextData : function (textData) {
		var me = this;
		var text=textData.data, x=textData.x, y=textData.y, fontSize=textData.fs, rotation=textData.rotation;
		
		if(fontSize ===0 || x === 0 || y === 0 || Ext.isEmpty(fontSize) || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(text)) {
			return '';
		}
		
		return 'TEXT '+ 
				me.mmToDot(x) + ', ' + // 텍스트 x좌표
				me.mmToDot(y) + ','  + // 텍스트 y좌표
				'"K",' + 			   // 폰트
				rotation + ',' + 	   // rotation (고정!)
				fontSize + ',' +	   // 글자크기 width  (1~10)
				fontSize + ',' + 	   // 글자크기 height (1~10) 
				'"'+ text +'"' +       // 출력할 문자열 (""로 감싸야 한다!!)
				me.CRLF; 
	},
	
	/**
	 * @private
	 * 라벨 프린터로 보낼 바코드 데이터 생성 공통
	 */
	createBarcodeData : function (barcodeData) {
		var me = this;
		var barcode=barcodeData.data, barcodeType=barcodeData.type, 
		    x=barcodeData.x, y=barcodeData.y, h=barcodeData.h, 
		    rotation=barcodeData.rotation, narrow=barcodeData.narrow, 
		    wide=barcodeData.wide, textVisible=barcodeData.textVisible;
		
		if(x === 0 || y === 0 || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(barcode)) {
			return '';
		}
		
		if(Ext.isEmpty(barcodeType)) {
			barcodeType = '128';
		}
		
		if(Ext.isEmpty(narrow)) {
			narrow = 2;
		}
		if(Ext.isEmpty(wide)) {
			wide = 2;
		}
		if(textVisible) { // 바코드 문자 표현
			textVisible = '1';
		} else {
			textVisible = '0';
		}
		
		return 'BARCODE ' +       // x,y, code type, 바코드 높이, 
		    	me.mmToDot(x) +', '+      // 바코드x int형
		    	me.mmToDot(y) +', '+      // 바코드y int형
		    	'"' + barcodeType +'",'+  // 바코드타입 string형
		    	me.mmToDot(h) +',' +      // 바코드의 높이 int형
		    	textVisible + ',' + rotation + ','+narrow+','+wide+','+  // humanreadable(0 or1) (바코드 문자표시), rotation, narrow, wide
		    	'"'+ barcode +'"' +  // 바코드 (""로 감싸야 한다!!) 
		    	me.CRLF;
	},
	
    ///////////////////////////////////////////////// TTP243 바코드 프린터용 data생성 구현 끝 //////////////////////////////////////////////////////
	
});


/** 출력데이터 샘플
 * 0: "FORMFEED
↵"
1: "SIZE 20 mm, 10 mm
↵GAP 2mm,0
↵SPEED 3
↵DENSITY 8
↵DIRECTION 1
↵REFERENCE 0,0
↵CLS
↵BARCODE 24, 104, "128",528,1,180,2,2,"0000000200461"
↵TEXT 120, 8,"K",0,1,1,"[*]색종이/1000색종이/전품목"
↵TEXT 264, 352,"K",180,3,3,"1,000"
↵TEXT 160, 48,"K",270,2,2,"700"
↵PRINT 1
↵EOP
↵"
2: "SIZE 20 mm, 10 mm
↵GAP 2mm,0
↵SPEED 3
↵DENSITY 8
↵DIRECTION 1
↵REFERENCE 0,0
↵CLS
↵BARCODE 24, 104, "128",528,1,180,2,2,"000859601304"
↵TEXT 120, 8,"K",0,1,1,"염료스프레이4"
↵TEXT 88, 176,"K",90,2,2,"170g/304(대표)/304"
↵TEXT 264, 352,"K",180,3,3,"14,000"
↵TEXT 160, 48,"K",270,2,2,"11,200"
↵PRINT 2
↵EOP
↵"
3: "SIZE 20 mm, 10 mm
↵GAP 2mm,0
↵SPEED 3
↵DENSITY 8
↵DIRECTION 1
↵REFERENCE 0,0
↵CLS
↵BARCODE 24, 104, "128",528,1,180,2,2,"000859601304"
↵TEXT 120, 8,"K",0,1,1,"염료스프레이5"
↵TEXT 88, 176,"K",90,2,2,"156g/831(대표)/831"
↵TEXT 264, 352,"K",180,3,3,"16,000"
↵TEXT 160, 48,"K",270,2,2,"12,800"
↵PRINT 3
↵EOP
↵"
4: "SIZE 20 mm, 10 mm
↵GAP 2mm,0
↵SPEED 3
↵DENSITY 8
↵DIRECTION 1
↵REFERENCE 0,0
↵CLS
↵BARCODE 24, 104, "128",528,1,180,2,2,"0009392410210"
↵TEXT 120, 8,"K",0,1,1,"DS지"
↵TEXT 88, 176,"K",90,2,2,"전지/78.8*109.1/134g/B/35번/전품목/대표코드"
↵TEXT 264, 352,"K",180,3,3,"0"
↵TEXT 160, 48,"K",270,2,2,"1,400"
↵PRINT 4
↵EOP
↵"
5: "FEED 20*8
↵"
 */