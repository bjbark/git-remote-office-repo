/**
 * Resource.js에서 사용되는 프린트 출력관련 support class
 * 
 * @author kdarkdev
 * @since 
 * @version 1.0
 * 
 */
Ext.define('Axt.ResourcePrint', {  
	alternateClassName: [ 'ResourcePrint' ],
    singleton : true,
    requires : [ 
        'Axt.popup.store.Invoice',
        'Axt.popup.model.Invoice',
     	'Axt.popup.model.InvoiceSale',
     	'Axt.popup.model.InvoiceTax',
     	'Axt.popup.model.InvoiceDeliveryCJ'
    ],
    
	/**
	 * 프린터 출력을 호출 한다.<br/>
	 * 호출방법은 Resource.js의 loadPrint메서드의 주석을 참고.
	 */
	loadPrint : function( param ) {
		var me = this;
		
		// 플러그인 초기화
		PluginInit.initialize({
			callback:function () {
				
				// localstorage에서 설정정보 읽기 + validation check
				me.loadLocalConfig(param);
				
				/*
				 * 프린트시 미리보기의 조건!
			      1. preview가 true
			      2. invoiceType이 거래명세서(Sale)가 아니거나 만약 거래명세서(Sale)일경우 용지가 A4순면지 이어야 한다.*/
				var isPreviewMode = (param.widget || param.preview) && 
				(param.paperType === Const.PaperType.A4_NORMAL);
				
				// 여기서 print요청
				if (isPreviewMode) { // 미리보기  
					me.loadPrintPreview(param);
				} else {             // 미리보기 없이 applet으로 direct print.
					me.loadPrintDirect(param);
				}
			}
		});
		
	},
	
	/**
	 * @private 
	 * 설정정보를 체크하여 paper_type, printer_name을 얻어온다
	 */
	loadLocalConfig : function (param) {
		var me = this;
		var invoiceType  = param.invoiceType;    // 거래명세서인가 세금계산서인가 문서 양식

		if(Ext.isEmpty(invoiceType)) {
			Ext.Msg.alert('', 'invoiceType을 설정해 주십시오.<br/>Contant.invoiceType을 참고 하십시오.');
			if(Ext.isFunction(param.callback)) {
				param.callback(false);
			}
			return;
		}
		
		// 거래명세서, 택배, 세금계산서등의 좌표설정정보의 모델
		// 만약 저장되어있다면 저장된 정보를 가져오고
		// 저장되지 않았다면 default정보를 생성하여 가져온다.
		var invoiceStore = me.getInvoiceStore(); // 거래명세서 store가져오기
		var invoiceSaleRecord = invoiceStore.findRecord('invoice_type', invoiceType);
		if(invoiceSaleRecord) { // 전달된 invoiceType으로 localstorage의 설정정보를 읽어온다.
             
			// 용지설정이 비어있는경우만 localstorage에서 가져온다.
			// 설정정보보다 loadPrint호출시 외부에서 전달된 paperType파라미터가 우선한다.
			if(Ext.isEmpty(param.paperType)) {
				param.paperType   = invoiceSaleRecord.get('paper_type');
			}
			
			if(Ext.isEmpty(param.printerName)) {
				param.printerName = invoiceSaleRecord.get('printer_name');
			}
		} else {
			// 설정된 좌표 정보가 없으면 용지는 default로 A4순면지
			if(Ext.isEmpty(param.paperType)) {
				param.paperType = Const.PaperType.A4_NORMAL; // 용지가 A4순면지로 되어있다는것은 무조건 PDF로의 출력을 의미한다.
			}
		}
		
		// A4순면지일경우는 jasper report로 PDF를 생성받아서 출력하고
		// 그외의 용지는 좌표 출력을 하기때문에 json으로 데이터만 받아야 한다
		// isJasperReport파라미터를 설정한후 서버측(자바)에서 체크해서 pdf또는 json으로 데이터를 내려보내야 한다.
		if(param.paperType===Const.PaperType.A4_NORMAL) {
			param.params.isReport = true;  // jasper report로 PDF 생성
		} else {
			param.params.isReport = false; // json으로 데이터 받아서 좌표 출력
		}
	},
	
	/**
	 * @private
	 * 프린트출력(미리보기 mode)
	 */
	loadPrintPreview : function (param) {
		var me = this;
		var params = {}, 
			widget = param.widget;
		
		if(param.preview && !widget) {
			widget = 'popup-report';
		}
		
		if (Ext.isEmpty(widget)){ console.debug('loadPrint error' , 'Ext.isEmpty(widget)' ); return; }
		if (Ext.getCmp(widget)) { console.debug('loadPrint erroe' , 'Ext.getCmp (widget)' ); return; }
	
		params.title = param.title;
		params.popup = param || {}  ; 
		params.owner = param.caller || {}; 
		params.previewParams = param.previewParams || {}; 
		
		Ext.widget(widget, params);
	},
	
	/**
	 * @private
	 * 프린트출력(applet으로 direct출력)(다중출력도 이쪽으로 들어온다)</br>
	 * 크게 2가지의 경우가 있다<br/>
	 * 1. applet으로 서버에서 받은 json데이터로 지정된 좌표에 text또는 바코드를 출력하는 기능<br/>
	 * 2. applet으로 서버에서 받은 pdf를 미리보기없이 출력하는 기능
	 */
	loadPrintDirect : function (param) {
		var me = this;
		var paperType = param.paperType;
		if(paperType === Const.PaperType.A4_NORMAL) { // A4순면지의경우만 PDF출력(jasper)
			me.printPDF(param);
		} else {                                      // A4순면지가 아닌경우 applet으로 좌표 출력
			me.printCoordinate(param);
		}
	},
	
	/**
	 * @private
	 * jasper report(applet)을 통한 PDF출력
	 */
	printPDF : function (param) {
		var url         = param.requrl.search;
		var urlParam    = {
				param : {
					jasperParam : { "download":true,"format":"pdf" }
				},
				token : _global.token_id
		};
		var printerName = param.printerName;
		var callback    = param.callback;
		var copy        = param.copy;
		
		// 기본으로 설정되어있는 url에 전달될 파라미터와 개발자가 설정한 파라미터를 결합 
		Ext.merge(urlParam.param, param.params);
		
		if(param.enableLoadMask) {
    		Ext.MessageBox.show({
	  	    	 title: '잠시만 기다려 주십시오.',
	  	    	 width: 300,
	  	    	 progress: true,
	  	    	 closable: false,
	  	    	 wait : true,
	  	    	 waitConfig  : {
	  	    		 interval: 500, //bar will move fast!
	  	             duration: 50000,
	  	             increment : 1,
	  	             text : '출력중입니다... (1/1)'
	  	    	 }
	      	});
		}
		
		// applet호출
		PrinterPlugin.printPDFUrl({
			params:{
				copy : copy, // 인쇄매수
				url : url,
				urlParam : urlParam,
				printerName : printerName,
				requestMethod : 'POST',
				openDialog : false
			},
			callback : function (success, message) { // message에는 실패시 성공시 모두 메시지가 온다.
				if(param.enableLoadMask) {
					Ext.MessageBox.hide();
				}
				if(Ext.isFunction(callback)){
					callback(success, message);
				}
			}
	    });
	},
	
	/**
	 * @private 
	 * 양식지에 text또는 바코드를 좌표 설정하여 Print 한다.<br/>
	 * 데이터 흐름은 아래와 같다<br/>
	 * 1. javascipt에서 서버로 json요청
	 * 2. 서버에서 쿼리한 데이터를 json으로 응답
	 * 3. javascript에서 응답받은 json데이터와 localstorage에 저장해놨던 좌표설정값을 조합하여<br/>
	 *    일정한 형식에 맞는 출력 json을 생성하여 applet으로 보낸다.
	 * 4. applet에서 출력json을 parsing하여 Print한다. (끝)
	 */
	printCoordinate : function (param) {
		var me = this;
		
		var printCoordinateBatch = Axt.util.Batch.getInstance();
		
		// 1. url호출하여 거래명세표 데이터를 json 으로 load
		printCoordinateBatch.add(function(){  
			me.loadInvoicePrintJSON(param, printCoordinateBatch);
		});
		
		// 2. 서버로부터받은 json데이터와 localstorage의 좌표설정 데이터를 조합하여 애플릿으로 프린트 정보를 보낸다.
		// success:성공여부, serverData서버에서 넘어온 데이터, msg : success가 true면 성공메시지 반대면 실패 메시지
		printCoordinateBatch.add(function(success, serverData, message){
			
			if(success) {
				if(param.invoiceType === Const.InvoiceType.Delivery.CJ) { // CJ택배 송장의 경우 (다른 택배사는 추가 개발 해야 한다.
					me.printDataDeliveryCJ(param, serverData, printCoordinateBatch);
				} else {                                               // 거래명세서, 세금 계산서의 경우
					me.printDataSaleTax(param, serverData, printCoordinateBatch);
				}
			} else {
				printCoordinateBatch.next(false, message);
			}
			
		}); 
		
		// 3. 배치 실행
		printCoordinateBatch.run({                          
			callback:function(success, message) { // message는 success가 false일경우만 전달되어진다
				if(param.callback){
					param.callback(success, message); // resource.loadPrint를 한 호출원점에 콜백시켜준다 (controller)
				}
			}
		});
	},
	
	/**
	 * @private 
	 * 1. url호출하여 거래명세표 데이터를 json 으로 load
	 */
	loadInvoicePrintJSON : function(param, printCoordinateBatch){
		var url         = param.requrl.search;
		var urlParam    = {
				param : {
					jasperParam : { "download":true,"format":"pdf" }
				},
				token : _global.token_id
		};
		
		// 기본으로 설정되어있는 url에 전달될 파라미터와 개발자가 설정한 파라미터를 결합 
		Ext.merge(urlParam.param, param.params);
		
		Ext.Ajax.request({
	 		params   : {
	 			param : Ext.encode(urlParam.param),
	 			token : urlParam.token
	 		},
	 		method   : 'POST' , 
            url      : url,
            callback : function(options, success, response) {
            	var res = Ext.decode(response.responseText)
            	if(success && res.success) {
            		var serverData = res.records[0];
            		
            		if(Ext.isEmpty(serverData)) {
            			printCoordinateBatch.next(false, '', '조회된 데이터가 없습니다.');
            		} else {
            			printCoordinateBatch.next(true, serverData, '서버와의 통신을 성공했습니다.');
            		}
            	} else {
            		printCoordinateBatch.next(false, '', '서버와의 통신중 오류가 발생했습니다.');
            	}
            }
		});
	},
	
	/**
	 * @private
	 * 2-1. print할 좌표 정보 생성 (거래명세서 or 세금계산서)
	 */
	printDataSaleTax : function (param, serverData, printCoordinateBatch) {
		var me = this;
		
		var copy    	   = param.copy;
		var printerName    = param.printerName;
		var paperType      = param.paperType;
		var enableLoadMask = param.enableLoadMask;
		var invoiceType    = param.invoiceType;
		
		var invoiceModel   = me.getInvoiceModel(invoiceType);
		var localConfig    = invoiceModel.data.coordinates;  // localstorage에 저장된 좌표 설정 정보
		var itemList       = serverData.product;
		var listCount      = localConfig.list_count; // 한페이지에 출력가능한 item 목록 갯수
		var totalPage      = Math.ceil(itemList.length / localConfig.list_count); // 총페이지수
		
		var totalListLength = itemList.length;
		var startListIndex  = 0;
		var endListIndex    = 0;
		var currentPage     = 1;
		
		// 이 printBatch는 출력할 페이지가 여러개인경우 처리하기 위해서 만듬
		var printBatch = Axt.util.Batch.getInstance();
		
		// page 갯수만큼 출력
		for(var idx=1; idx<=totalPage; idx++) {
			printBatch.add(function(){
				var textDataArray    = [];
				var barcodeDataArray = [];
				var circleDataArray  = [];
				var imageDataArray   = [];
				
				startListIndex = (currentPage-1) * listCount;
				endListIndex =   (currentPage*listCount) - 1;
				if(totalListLength<=endListIndex) {
					endListIndex = totalListLength-1; 
				}
				
				// 상단의 공급자 좌표 데이터 생성
				me.createCoordinateData(textDataArray, barcodeDataArray, circleDataArray, imageDataArray, serverData, localConfig, totalPage, 
						currentPage, startListIndex, endListIndex, localConfig.top_x, localConfig.top_y);
				
				// A5*2용지이면서 설정된 하단의 공급받는자 y좌표값이 0보다 클경우
				// 하단의 공급받는자 좌표 데이터 생성
				if(localConfig.bottom_recv_y > 0 && paperType===Const.PaperType.A5_DOUBLE) { 
					
					// top_y를 설정할때 상단의 공급받는자외의 간격을 별리기위해 
					// localConfig.top_y+localConfig.bottom_recv_y를 해준다.
					me.createCoordinateData(textDataArray, barcodeDataArray, circleDataArray, imageDataArray, serverData, localConfig, totalPage, 
							currentPage, startListIndex, endListIndex, localConfig.top_x, localConfig.top_y+localConfig.bottom_recv_y);
				}
				
				// 페이지 증가
				currentPage++;
				
				// applet 호출전 파라미터 설정
				var params = {
						setting : {
							copy        : copy,        // 인쇄매수
							printerName : printerName, // 출력할 프린터 지정
							orientation : PrinterUtils.Orientation.PORTRAIT ,   // 세로 출력
							paper       : {
								width  : invoiceModel.data.paper_width,
								height : invoiceModel.data.paper_height
							},
							dpi         : invoiceModel.data.printer_dpi
						},
						barcodeData : barcodeDataArray,
						textData    : textDataArray,
						circleData  : circleDataArray,
						imageData   : imageDataArray
				};
				
				// 프린트 애플릿 플러그인 호출
				PrinterPlugin.printCoordinate({
					params : params,
					callback : function (success, msg) {
						if(success) { // 애플릿 프린트가 성공했을때는 다음번 batch를 진행하고
							printBatch.next(true);
						} else {      // 프린트 실패했을경우 다음번 batch를 진행하지말고 종료한다.
							printCoordinateBatch.next(false);
						}
					}
				});
				
			});
		} // end for
		
		printBatch.run({
			enableLoadMask : enableLoadMask,
			maskMsg : '출력중입니다... ($count/$total)',
			callback : function (success) {
				printCoordinateBatch.next(true);
			}
		});
			
	},
	
	/**
	 * @private
	 * 서버로부터받은 json데이터와 localstorage의 좌표설정 데이터를 조합하여 애플릿으로 프린트 정보를 보낸다.<br/>
     * Sale, Tax의 좌표출력
	 */
	createCoordinateData : function(textData, barcodeData, circleDataArray, imageDataArray, 
			serverData, localConfig, totalPage,currentPage, startListIndex, endListIndex, topX, topY){
		var me = this;
		
		var config = localConfig;
		var paper = config.paperType;
		
// 공급자 !!!
		me.setText(textData, serverData.send_biz_no, config.send_biz_x, config.send_biz_no_y, topX, topY, config.send_biz_no_fs);  			// 등록번호
		me.setText(textData, serverData.send_biz_nm, config.send_biz_x, config.send_biz_nm_y, topX, topY, config.send_biz_nm_fs);             // 상호
		me.setText(textData, serverData.send_biz_owner, config.send_biz_owner_x, config.send_biz_nm_y, topX, topY, config.send_biz_owner_fs); // 성명

		// 직인이미지 출력 (공급자의 성명 옆에 1cm*1cm크기로 그려진다.)
		if(config.stamp_yn) { // 설정되어있는 경우만 출력
			me.setImage(imageDataArray, serverData.stamp_url, config.send_biz_owner_x+10, config.send_biz_nm_y-7, topX, topY, 12, 12);
		}
		
		var invDt = serverData.inv_dt+'';
		if(invDt.length === 8) {   // 일자
			var tempDt = invDt.substring(0, 4) +'-'+invDt.substring(4, 6) + '-' + invDt.substring(6, 8);
			me.setText(textData, tempDt, config.inv_dt_x, config.inv_dt_y, topX, topY, config.inv_dt_fs);
		} else if(invDt.length === 10){
			me.setText(textData, invDt, config.inv_dt_x, config.inv_dt_y, topX, topY, config.inv_dt_fs);
		} else { /* 알파넷 임시 구버전 고객코드 표시 20140214(00000) 형식. 삭제 예정  20140222-한동진 작업 */
			var tempDt = invDt.substring(0, 4) +'-'+invDt.substring(4, 6) + '-' + invDt.substring(6);
			me.setText(textData, tempDt, config.inv_dt_x, config.inv_dt_y, topX, topY, config.inv_dt_fs);
		}
		
		// 공급자 전화번호 and fax
		me.setText(textData, 'T:'+(serverData.send_biz_tel_no||''), config.send_biz_tel_no_x, config.send_biz_tel_no_y, topX, topY, config.send_biz_tel_no_fs); 
		me.setText(textData, 'F:'+(serverData.send_biz_fax_no||''), config.send_biz_fax_no_x, config.send_biz_fax_no_y, topX, topY, config.send_biz_fax_no_fs); 
		
		me.setText(textData, serverData.send_biz_addr_1, config.send_biz_x, config.send_biz_addr_y, topX, topY, config.send_biz_addr_fs );    // 주소1
		me.setText(textData, serverData.send_biz_addr_2, config.send_biz_x, config.send_biz_addr_y+config.send_biz_addr_lh, topX, topY, config.send_biz_addr_fs );    // 주소1
				
		me.setText(textData, serverData.send_biz_cond, config.send_biz_x, config.send_biz_cond_y, topX, topY, config.send_biz_cond_fs); // 업태
		me.setText(textData, serverData.send_biz_types, config.send_biz_types_x, config.send_biz_cond_y, topX, topY, config.send_biz_types_fs); // 종목
		
// 공급받는자 !!!
		me.setText(textData, serverData.recv_biz_no, config.recv_biz_x, config.send_biz_no_y, topX, topY, config.send_biz_no_fs); // 등록번호
		me.setText(textData, serverData.recv_biz_nm, config.recv_biz_x, config.send_biz_nm_y, topX, topY, config.send_biz_nm_fs); // 상호
		me.setText(textData, serverData.recv_biz_owner, config.recv_biz_owner_x, config.send_biz_nm_y, topX, topY, config.send_biz_owner_fs); // 성명
		
		// 공급받는자 전화번호 and fax
		me.setText(textData, 'T:'+(serverData.recv_biz_tel_no||''), config.recv_biz_tel_no_x, config.send_biz_tel_no_y, topX, topY, config.send_biz_tel_no_fs); 
		me.setText(textData, 'F:'+(serverData.recv_biz_fax_no||''), config.recv_biz_fax_no_x, config.send_biz_fax_no_y, topX, topY, config.send_biz_fax_no_fs); 
		
		me.setText(textData, serverData.recv_biz_addr_1, config.recv_biz_x, config.send_biz_addr_y, topX, topY, config.send_biz_addr_fs);                          // 주소1
		me.setText(textData, serverData.recv_biz_addr_2, config.recv_biz_x, config.send_biz_addr_y+config.send_biz_addr_lh, topX, topY, config.send_biz_addr_fs ); // 주소2
		me.setText(textData, serverData.recv_biz_cond, config.recv_biz_x, config.send_biz_cond_y, topX, topY, config.send_biz_cond_fs); // 업태
		me.setText(textData, serverData.recv_biz_types, config.recv_biz_types_x, config.send_biz_cond_y, topX, topY, config.send_biz_types_fs); // 종목
		
		var sply_amt = serverData.sply_amt+'';
		var money_y = config.money_y;
		var money_fs = config.money_fs;
		var text;
		var money_subtotal_x = config.money_subtotal_x;
		var money_tax_x = config.money_tax_x;
		var box_width = config.money_box_width; // 공급가/세액부분의 1칸의 넓이
		
		// 공급가액
		for(var i=sply_amt.length-1; -1<i; i--) { // 공급가 숫자를 한자리씩 잘라서 배열에 반대로 담아놓는다 (1000 => 0001)
			text = sply_amt.charAt(i);
			me.setText(textData, text, money_subtotal_x, money_y, topX, topY, money_fs);
			money_subtotal_x = money_subtotal_x - box_width;
		}
		
		// 세액
		var tax = (serverData.tax+'');
		money_tax_x = config.money_tax_x;
		for(var i=tax.length-1; -1<i; i--) { // 공급가 숫자를 한자리씩 잘라서 배열에 반대로 담아놓는다 (1000 => 0001)
			text = tax.charAt(i);
			me.setText(textData, text, money_tax_x, money_y, topX, topY, money_fs);
			money_tax_x = money_tax_x - box_width;
		}
		
		// 년 월 일
		var invDt = serverData.inv_dt+'';
		if(invDt.length === 8) {   // 일자
			me.setText(textData, invDt.substring(0, 4), config.money_year_x, money_y, topX, topY, money_fs);
			me.setText(textData, invDt.substring(4, 6), config.money_month_x, money_y, topX, topY, money_fs);
			me.setText(textData, invDt.substring(6, 8), config.money_day_x, money_y, topX, topY, money_fs);
		}
		
		// 공란수
		var moneyEmpty = 10 - sply_amt.length;
		me.setText(textData, moneyEmpty, config.money_empty_x, money_y, topX, topY, money_fs);
		
		// 품목 list
		var itemList = serverData.product;
		var listY  = config.list_y;
		var listFs = config.list_fs;
		var listLh = config.list_lh;
		for(var i=startListIndex; i<=endListIndex; i++) {
			var item = itemList[i];
			
			if(invDt.length === 8) {
				me.setText(textData, invDt.substring(4,6), config.list_month_x, listY, topX, topY, listFs); // 월
				me.setText(textData, invDt.substring(6,8), config.list_day_x, listY, topX, topY, listFs);   // 일
			}
			
			// 거래명세서의 경우는 코드로 보여줄지 바코드로 보여줄지 구분해서 처리
			// 세금계산서는 무조건 코드로 출력
			if(config.list_codebarcode !== undefined) { // 거래명세서
				
				if(config.list_codebarcode === 0) { // 코드
					me.setText(textData, item.itm_cd,                       config.list_item_cd_x,  listY, topX, topY, listFs);   // 코드
				} else { // 바코드
					me.setText(textData, item.barcode,                       config.list_item_cd_x,  listY, topX, topY, listFs);   // 바코드
				}
				
			} else { // 세금계산서
				me.setText(textData, item.itm_cd,                       config.list_item_cd_x,  listY, topX, topY, listFs);   // 코드
			}
			
			// 훔목명이 들어갈 길이 MM로 구하기
			var limitMM = 0;

			if(config.list_unit_nm_x > 0){ // 단위가 출력되는 경우
				limitMM = config.list_unit_nm_x - config.list_item_nm_x - 5;
			} else if (config.list_unit_nm_x === 0 && config.list_qty_x > 0){ // 단위가 없고 수량이 있는경우
				limitMM = config.list_qty_x - config.list_item_nm_x - 5;
			} // 추후 단위,수량 둘다 출력안하는 경우 추가 요망
			
			if(limitMM === 0){ // 품명을 자르지 않아도 될떄
				me.setText(textData, item.itm_nm,  config.list_item_nm_x,  listY, topX, topY, listFs);   // 품목
			} else { // 품명을 잘라야할떄 me.validMM 호출 -> valiMM('품명','길이','글자크기')
				me.setText(textData, me.validMM(item.itm_nm, limitMM, listFs),  config.list_item_nm_x,  listY, topX, topY, listFs);   // 품목
			}
			
			me.setText(textData, item.unt_nm,                       config.list_unit_nm_x,  listY, topX, topY, listFs);   // 단위
			me.setText(textData, CommonUtils.addComma(item.qty),     config.list_qty_x,      listY, topX, topY, listFs, PrinterUtils.TextAlign.RIGHT); // 수량
			me.setText(textData, CommonUtils.addComma(item.price),   config.list_price_x,    listY, topX, topY, listFs, PrinterUtils.TextAlign.RIGHT); // 단가
			me.setText(textData, CommonUtils.addComma(item.sply_amt),config.list_subtotal_x, listY, topX, topY, listFs, PrinterUtils.TextAlign.RIGHT); // 공급가액
			me.setText(textData, CommonUtils.addComma(item.amount),  config.list_amount_x,   listY, topX, topY, listFs, PrinterUtils.TextAlign.RIGHT); // 합계
			me.setText(textData, CommonUtils.addComma(item.tax),     config.list_tax_x,      listY, topX, topY, listFs, PrinterUtils.TextAlign.RIGHT); // 세액
			
			// 소비자가는 거래명세서에만 있다!
			if(config.list_sobi_price_x !== undefined ) {
				me.setText(textData, CommonUtils.addComma(item.cst_pri), config.list_sobi_price_x,  listY, topX, topY, listFs,PrinterUtils.TextAlign.RIGHT);   // 소비자가
			}
			
			
			// 개행
			listY += listLh;
		}
		if(currentPage===totalPage) {
			me.setText(textData, '-이하 여백-', 97, (listY+3), topX, topY, listFs+2);          
		} else {
			me.setText(textData, '-다음 페이지에 계속-', 88, (listY+3), topX, topY, listFs+2);  
		}
		
		// 합계금액
		me.setText(textData, CommonUtils.addComma(serverData.amount), config.total_amount_x, config.total_amount_y, topX, topY, config.total_amount_fs, PrinterUtils.TextAlign.RIGHT);
		
		// 광고문구 (서버에서 데이터가 오지않고 localstorage의 설정데이터로 text보여준다.)
		me.setText(textData, config.advertisement_content, config.advertisement_x, config.advertisement_y, topX, topY, config.advertisement_fs);
		
		// 바코드
		if(config.barcode_yn) {
			me.setBarcode(barcodeData, serverData.inv_no, config.barcode_x, config.barcode_y, topX, topY, config.barcode_width, config.barcode_height, undefined, undefined, 5);
		}
		
		// 페이지수
		var pageString = 'Page '+currentPage+' of ' + totalPage;
		me.setText(textData, pageString, config.page_count_x, config.page_count_y, topX, topY, config.page_count_fs);
		
		// 영수/청구 (마크표시 세금계산서의 경우만!!)
		// 세금계산서가 아닌 거래명세서의경우 config.pay_gb_hidden_yn가 undefined다
		// 그래서 비교는 config.pay_gb_hidden_yn === true로 해야 한다.
		if(config.pay_gb_hidden_yn === true) { 
			// 영수/청구마크 미표시에 체크되어있으면 그외의 설정이 어떻게 되어있더라도 출력하지 않는다. (최우선) 
		} else if (config.pay_gb_hidden_yn === false) {
			var textview_yn = config.pay_gb_textview_yn;
			var pay_gb = serverData.pay_gb; // 1:영수, 2:청구
			
			var gbText;
			var gbY;
			if(pay_gb==1) {
				gbText = '영수';
				gbY = config.pay_gb1_y;
			} else {
				gbText = '청구';
				gbY = config.pay_gb2_y;
			}
			
			if(textview_yn === true) { // 영수/청구 글씨만 표시일경우 동그라미 마크가 없이 영수/청구 텍스트를 write한다
				me.setText(textData, gbText,  config.pay_gb_x, gbY, topX, topY, config.pay_gb_fs);
			} else {
				var circleWidth  = 8; // 영수/청구의 동그라미 마크
				var circleHeight = 5;
				me.setCircle(circleDataArray, config.pay_gb_x, gbY, topX, topY, circleWidth, circleHeight);
			}
		} // end else
		
		
		
		// 이 설정은 거래명세서에만 있다
		if(config.amount1_x !== undefined) {
			
//			me.setText(textData, CommonUtils.addComma(serverData.amount), config.total_amount_x, config.total_amount_y, topX, topY, config.total_amount_fs, PrinterUtils.TextAlign.RIGHT);
			// 거래처CODE
			me.setText(textData, serverData.cust_id, config.cust_id_x, config.cust_id_y, topX, topY, config.cust_id_fs);
			
			// 전표NO.
			me.setText(textData, serverData.work_no, config.work_no_x, config.work_no_y, topX, topY, config.work_no_fs);
			
			// 합계금액 ( 하단의 합계금액과 같은 CommonUtils.addComma(serverData.amount)를 공유
			me.setText(textData, CommonUtils.addComma(serverData.amount), config.amount1_x, config.amount1_y, topX, topY, config.amount1_fs);
			
			// 전일미수
			me.setText(textData, CommonUtils.addComma(serverData.pre_balance), config.pre_balance_x, config.pre_balance_y, topX, topY, config.pre_balance_fs, PrinterUtils.TextAlign.RIGHT);
			
			// 미수누계 (현미수)
			me.setText(textData, CommonUtils.addComma(serverData.npay_amt), config.balance_x, config.balance_y, topX, topY, config.balance_fs, PrinterUtils.TextAlign.RIGHT);
			
		}
	},
	
	/**
	 * @private
	 * 2-2. print할 좌표 정보 생성 (CJ택배 송장)
	 */
	printDataDeliveryCJ : function (param, serverData, printCoordinateBatch) {
		var me = this;
		var printerName    = param.printerName;
		var paperType      = param.paperType;
		var enableLoadMask = param.enableLoadMask;
		var invoiceType    = param.invoiceType;
		var copy           = param.copy; // 인쇄매수s
		
		var invoiceModel   = me.getInvoiceModel(invoiceType);
		var coordinates    = invoiceModel.data.coordinates;  // localstorage에 저장된 좌표 설정 정보
		
		var textDataArray = [];
		var barcodeDataArray = [];
		
		// 좌표 생성
		me.createCoordinateDeliveryCJ(textDataArray, barcodeDataArray, serverData, coordinates);
		
		// applet 호출전 파라미터 설정
		var params = {
				setting : {
					copy        : copy,        // 인쇄매수
					printerName : printerName, // 출력할 프린터 지정
					orientation : PrinterUtils.Orientation.LANDSCAPE ,
					paper       : {
						width  : invoiceModel.data.paper_width,
						height : invoiceModel.data.paper_height
					},
					dpi         : invoiceModel.data.printer_dpi
				},
				barcodeData : barcodeDataArray,
				textData : textDataArray
		};
		
		// 프린트 애플릿 플러그인 호출 (출력!!)
		PrinterPlugin.printCoordinate({
			params : params,
			callback : function (success, msg) {
				printCoordinateBatch.next(success);
			}
		});
		
	},
	
	/**
	 * @private
	 * cj택배송장 좌표 설정
	 */
	createCoordinateDeliveryCJ : function (textData, barcodeData, serverData, coordinates) {
		var me = this;
		var config = coordinates;
		var topX = coordinates.top_x; 
		var topY = coordinates.top_y;
		var paper = config.paperType;
		var itemList = serverData.product;
		
		var fontStyle = PrinterUtils.FontStyle.BOLD;
		
// 좌측 출력 시작
		// 운송장 번호
		me.setText(textData, serverData.hdli_no, config.l_taekbae_no_x, config.l_taekbae_no_y, topX, topY, config.l_taekbae_no_fs, undefined, fontStyle);
		// TML코드
		var taekbae_tml = serverData.taekbae_tml;
		var taekbae_tml_Arr = taekbae_tml.split('-');
		if(taekbae_tml_Arr.length === 2) {
			var firstStr = taekbae_tml.charAt(0);
			var middleStr= taekbae_tml_Arr[0].substring(1, taekbae_tml_Arr[0].length);
			var lastStr  = '-'+taekbae_tml.split('-')[1];
			me.setText(textData, firstStr,  config.l_taekbae_tml_x,  config.l_taekbae_tml_y, topX, topY,  config.l_taekbae_tml_fs, undefined, undefined, true);
			me.setText(textData, middleStr, config.l_taekbae_tml2_x, config.l_taekbae_tml2_y, topX, topY, config.l_taekbae_tml2_fs);
			me.setText(textData, lastStr,   config.l_taekbae_tml3_x, config.l_taekbae_tml3_y, topX, topY, config.l_taekbae_tml3_fs);
//		me.setText(textData, serverData.taekbae_tml, config.l_taekbae_tml_x, config.l_taekbae_tml_y, topX, topY, config.l_taekbae_tml_fs);
		}
		
		// 받는분 주소 (주소1 + 주소2)
		me.setText(textData, serverData.rcv_biz_addr_1, config.l_rcv_biz_addr_x, config.l_rcv_biz_addr_y, topX, topY, config.l_rcv_biz_addr_fs, undefined, fontStyle);
		me.setText(textData, serverData.rcv_biz_addr_2, config.l_rcv_biz_addr_x, config.l_rcv_biz_addr_y+config.l_rcv_biz_addr_lh, topX, topY, config.l_rcv_biz_addr_fs, undefined, fontStyle);
		// 받는분 이름
		me.setText(textData, serverData.rcv_biz_nm, config.l_rcv_biz_nm_x, config.l_rcv_biz_nm_y, topX, topY, config.l_rcv_biz_nm_fs, undefined, fontStyle);
		// 받는분 전화
		// 받는사람 정보 mask 02-1234-5555 => 02-1234-****
		var rcv_tel_no = me.replaceMask(serverData.rcv_tel_no, '*');
		me.setText(textData, rcv_tel_no, config.l_rcv_tel_no_x, config.l_rcv_tel_no_y, topX, topY, config.l_rcv_tel_no_fs, undefined, fontStyle);
		// 받는분 핸드폰
		// 받는사람 정보 mask 010-1234-5555 => 010-1234-****
		var rcv_tel_hp = me.replaceMask(serverData.rcv_tel_hp, '*');
		me.setText(textData, rcv_tel_hp, config.l_rcv_tel_hp_x, config.l_rcv_tel_hp_y, topX, topY, config.l_rcv_tel_hp_fs, undefined, fontStyle);
		
		// 보내는분 주소 (주소1 + 주소2)
		me.setText(textData, serverData.snd_biz_addr_1, config.l_snd_biz_addr_x, config.l_snd_biz_addr_y, topX, topY, config.l_snd_biz_addr_fs, undefined, fontStyle);
		me.setText(textData, serverData.snd_biz_addr_2, config.l_snd_biz_addr_x, config.l_snd_biz_addr_y+config.l_snd_biz_addr_lh, topX, topY, config.l_snd_biz_addr_fs, undefined, fontStyle);
		
		// 보내는분 이름
		me.setText(textData, serverData.snd_biz_nm, config.l_snd_biz_nm_x, config.l_snd_biz_nm_y, topX, topY, config.l_snd_biz_nm_fs, undefined, fontStyle);
		// 보내는분 전화
		me.setText(textData, serverData.snd_biz_tel_no, config.l_snd_tel_no_x, config.l_snd_tel_no_y, topX, topY, config.l_snd_tel_no_fs, undefined, fontStyle);
		
		// 품명
		// 훔목명이 들어갈 길이 MM로 구하기
		var limitMM = 0;

		if(config.l_qty_x > 0){ // 단위가 출력되는 경우
			limitMM = config.l_qty_x - config.l_item_nm_x - 5;
		} else if (config.l_qty_x === 0 && config.l_inv_no_x > 0){ // 단위가 없고 수량이 있는경우
			limitMM = config.l_inv_no_x - config.l_item_nm_x - 5;
		} // 추후 단위,수량 둘다 출력안하는 경우 추가 요망
		
//		me.setText(textData, serverData.itm_nm, config.l_item_nm_x, config.l_item_nm_y, topX, topY, config.l_item_nm_fs);
		var itemNmY = config.l_item_nm_y;
		var qtyY = config.l_qty_y;
		var itemLength = itemList.length - 1;
		
		for(var index in itemList) {
			var itemNm = itemList[index].itm_nm;
			var qty = itemList[index].qty;
//			me.setText(textData, qty, config.l_item_nm_x, itemNmY, topX, topY, config.l_item_nm_fs);
			
			if(limitMM === 0){ // 품명을 자르지 않아도 될떄
				me.setText(textData, itemNm, config.l_item_nm_x, itemNmY, topX, topY, config.l_item_nm_fs, undefined, fontStyle);
			} else { // 품명을 잘라야할떄 me.validMM 호출 -> valiMM('품명','길이','글자크기')
				me.setText(textData, me.validMM(itemNm, limitMM, config.l_item_nm_fs), config.l_item_nm_x, itemNmY, topX, topY, config.l_item_nm_fs, undefined, fontStyle);
			}
			
			itemNmY = itemNmY+3;
			
			if(index === '7'){
				var cnt = itemLength - index;
				me.setText(textData, qty + ' 개 외 ' + cnt + ' 건', config.l_qty_x, qtyY, topX, topY, config.l_item_nm_fs, undefined, fontStyle);
				break;
			} else {
				me.setText(textData, qty + ' 개', config.l_qty_x, qtyY, topX, topY, config.l_item_nm_fs, undefined, fontStyle);
			} 
			qtyY = qtyY+3;
		}
		
		// 운임
		me.setText(textData, serverData.fare_type, config.l_fare_type_x, config.l_fare_type_y, topX, topY, config.l_fare_type_fs, undefined, fontStyle);
		
		// 박스수량 (박스구분 + 수량)
		me.setText(textData, '('+(serverData.unit||'')+') ' + (serverData.box_count||'')+'개', config.l_box_count_x, 
				config.l_box_count_y, topX, topY, config.l_box_count_fs, undefined, fontStyle);
		
		// 매출번호
		me.setText(textData, serverData.inv_no, config.l_inv_no_x, config.l_inv_no_y, topX, topY, config.l_inv_no_fs, undefined, fontStyle);
		
		// TML바코드
		// serverData.taekbae_tml에는 2T15-1 과같은 형식으로 값이들어오는데
		// -1은 제거하고 2T15와같은 형식으로만 바코드를 출력해야 한다.
		me.setBarcode(barcodeData, serverData.taekbae_tml.replace(/(.*)(-.*)/g,function(all, match1, match2){ return match1 }), config.l_taekbae_tml_barcode_x, 
				config.l_taekbae_tml_barcode_y, topX, topY, config.l_taekbae_tml_barcode_width,
				config.l_taekbae_no_barcode_height, PrinterUtils.Barcode.CODE128A, 'none');

		// 운송장번호 바코드
		me.setBarcode(barcodeData, serverData.hdli_no.replace(/-/g,''), config.l_taekbae_no_barcode_x, 
				config.l_taekbae_no_barcode_y, topX, topY, config.l_taekbae_no_barcode_width, 
				config.l_taekbae_no_barcode_height, PrinterUtils.Barcode.CODE128ALL);

// 좌측 출력 끝
		
		
		
// 우측 상단 받는분, 품명, 운임 출력 시작
		// 운송장 번호
		me.setText(textData, serverData.hdli_no, config.ru_taekbae_no_x, config.ru_taekbae_no_y, topX, topY, config.ru_taekbae_no_fs, undefined, fontStyle);
		// 받는분 주소 (주소1 + 주소2)
		me.setText(textData, serverData.rcv_biz_addr_1, config.ru_rcv_biz_addr_x, config.ru_rcv_biz_addr_y, topX, topY, config.ru_rcv_biz_addr_fs, undefined, fontStyle);
		me.setText(textData, serverData.rcv_biz_addr_2, config.ru_rcv_biz_addr_x, config.ru_rcv_biz_addr_y+config.ru_rcv_biz_addr_lh, topX, topY, config.ru_rcv_biz_addr_fs, undefined, fontStyle);
		// 받는분 이름
		me.setText(textData, serverData.rcv_biz_nm, config.ru_rcv_biz_nm_x, config.ru_rcv_biz_nm_y, topX, topY, config.ru_rcv_biz_nm_fs, undefined, fontStyle);
		// 받는분 전화
		me.setText(textData, serverData.rcv_tel_no, config.ru_rcv_tel_no_x, config.ru_rcv_tel_no_y, topX, topY, config.ru_rcv_tel_no_fs, undefined, fontStyle);
		// 받는분 핸드폰
		me.setText(textData, serverData.rcv_tel_hp, config.ru_rcv_tel_hp_x, config.ru_rcv_tel_hp_y, topX, topY, config.ru_rcv_tel_hp_fs, undefined, fontStyle);
		// 품명
		me.setText(textData, serverData.itm_nm, config.ru_item_nm_x, config.ru_item_nm_y, topX, topY, config.ru_item_nm_fs, undefined, fontStyle);
		// 운임
		me.setText(textData, serverData.fare_type, config.ru_fare_type_x, config.ru_fare_type_y, topX, topY, config.ru_fare_type_fs, undefined, fontStyle);
// 우측 상단 받는분, 품명, 운임 출력 끝
		
// 우측 하단 받는분 보내는분 정산구분 운임 박스수량 시작
		// 받는분 주소 (주소1 + 주소2)
		me.setText(textData, serverData.rcv_biz_addr_1, config.rd_rcv_biz_addr_x, config.rd_rcv_biz_addr_y, topX, topY, config.rd_rcv_biz_addr_fs, undefined, fontStyle);
		me.setText(textData, serverData.rcv_biz_addr_2, config.rd_rcv_biz_addr_x, config.rd_rcv_biz_addr_y+config.rd_rcv_biz_addr_lh, topX, topY, config.rd_rcv_biz_addr_fs, undefined, fontStyle);
		// 받는분 이름
		me.setText(textData, serverData.rcv_biz_nm, config.rd_rcv_biz_nm_x, config.rd_rcv_biz_nm_y, topX, topY, config.rd_rcv_biz_nm_fs, undefined, fontStyle);
		// 받는분 전화
		me.setText(textData, serverData.rcv_tel_no, config.rd_rcv_tel_no_x, config.rd_rcv_tel_no_y, topX, topY, config.rd_rcv_tel_no_fs, undefined, fontStyle);
		// 받는분 핸드폰
		me.setText(textData, serverData.rcv_tel_hp, config.rd_rcv_tel_hp_x, config.rd_rcv_tel_hp_y, topX, topY, config.rd_rcv_tel_hp_fs, undefined, fontStyle);
		
		// 보내는분 주소 (주소1 + 주소2)
		me.setText(textData, serverData.snd_biz_addr_1, config.rd_snd_biz_addr_x, config.rd_snd_biz_addr_y, topX, topY, config.rd_snd_biz_addr_fs, undefined, fontStyle);
		me.setText(textData, serverData.snd_biz_addr_2, config.rd_snd_biz_addr_x, config.rd_snd_biz_addr_y+config.rd_snd_biz_addr_lh, topX, topY, config.rd_snd_biz_addr_fs, undefined, fontStyle);
		// 보내는분 이름
		me.setText(textData, serverData.snd_biz_nm, config.rd_snd_biz_nm_x, config.rd_snd_biz_nm_y, topX, topY, config.rd_snd_biz_nm_fs, undefined, fontStyle);
		// 보내는분 전화
		me.setText(textData, serverData.snd_biz_tel_no, config.rd_snd_tel_no_x, config.rd_snd_tel_no_y, topX, topY, config.rd_snd_tel_no_fs, undefined, fontStyle);
		
		// 품목 정보
		me.setText(textData, serverData.itm_nm, config.rd_item_nm_x, config.rd_item_nm_y, topX, topY, config.rd_item_nm_fs, undefined, fontStyle);
		// 매출날짜
		me.setText(textData, serverData.inv_dt, config.rd_inv_dt_x, config.rd_inv_dt_y, topX, topY, config.rd_inv_dt_fs, undefined, fontStyle);
		// 배송지주소약칭
		me.setText(textData, serverData.taekbae_znm, config.rd_taekbae_znm_x, config.rd_taekbae_znm_y, topX, topY, config.rd_taekbae_znm_fs, undefined, fontStyle);
		// 배송대리점명
		me.setText(textData, serverData.taekbae_did, config.rd_taekbae_did_x, config.rd_taekbae_did_y, topX, topY, config.rd_taekbae_did_fs, undefined, fontStyle);
		// 배송사원
		me.setText(textData, '배달사원:'+(serverData.taekbae_pnm||''), config.rd_taekbae_pnm_x, config.rd_taekbae_pnm_y, topX, topY, config.rd_taekbae_pnm_fs, undefined, fontStyle);
		
		// 운임
		me.setText(textData, serverData.fare_type, config.rd_fare_type_x, config.rd_fare_type_y, topX, topY, config.rd_fare_type_fs, undefined, fontStyle);
		
		// 박스수량 (박스구분 + 수량)
		me.setText(textData, '('+(serverData.unit||'')+') ' + (serverData.box_count||'')+'개', config.rd_box_count_x, 
				config.rd_box_count_y, topX, topY, config.rd_box_count_fs, undefined, fontStyle);
		
		// 운송장번호 바코드 (우측 하단)
		me.setBarcode(barcodeData, serverData.hdli_no.replace(/-/g,''), config.rd_taekbae_no_barcode_x, 
				config.rd_taekbae_no_barcode_y, topX, topY, config.rd_taekbae_no_barcode_width, 
				config.rd_taekbae_no_barcode_height, PrinterUtils.Barcode.CODE128ALL);
// 우측 하단 받는분 보내는분 정산구분 운임 박스수량 끝
		
	},
	
	MASK_REG_EXP : {
        MASK_MOBILE_PHONE_PATTERN : /(\d{2,3})(-?)(\d{3,4})(-?)(\d{4})/,
        MASK_DEFAULT_STRING       : "*"
    },
	replaceMask : function (value, mask) {
		var me = this;
		var regExp = me.MASK_REG_EXP;
		if(!mask) {
			mask = regExp.MASK_DEFAULT_STRING;
		}
		var result = '';
		if(regExp.MASK_MOBILE_PHONE_PATTERN.test(value)){ // 핸드폰번호 일치
			value.replace(regExp.MASK_MOBILE_PHONE_PATTERN, function(match, g1, g2, g3, g4, g5){
				result = g1 + g2 + g3 + g4 + g5.replace(/./g, mask);
			});
		} else {
			result = value;
		}

		return result;
	},
	
	/**
	 * @private
	 * 이미지 그리기
	 */
	setImage : function (imageDataArray, imageUrl, x, y, topX, topY, width, height) {
		if(Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(width)|| Ext.isEmpty(height)|| Ext.isEmpty(imageUrl)) {
			return;
		}
		
		x = x + topX; 
		y = y + topY;
		
		imageDataArray.push({
			type : PrinterUtils.ImageType.URL,
			image : imageUrl,
			x:x,
			y:y,
			width:width,
			height:height
		});
	},
	
	/**
	 * @private 
	 * 원 그리기
	 */
	setCircle : function (circleDataArray, x, y, topX, topY, width, height) {
		if( x === 0 || y === 0 || width ===0 || height === 0 || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(width)|| Ext.isEmpty(height)) {
			return;
		}
		
		x = x + topX; 
		y = y + topY;
		
		circleDataArray.push({
    		x : x,
    		y : y,
        	width : width,
        	height: height,
        	stroke : {
        		width : 1
        	}
        });
	},
	
	/**
	 * @private
	 * applet을 이용하여 print할때 전달되는 text data를 만들어서 array에 담는다.
	 */
	setText : function (textDataArray, text, x, y, topX, topY, fontSize, textAlign, fontStyle, isUnderLine) {
		if(fontSize ===0 || x === 0 || y === 0 || Ext.isEmpty(fontSize) || Ext.isEmpty(x) || Ext.isEmpty(y)) {
			return;
		}
		
		x = x + topX; 
		y = y + topY;
		
		if(textAlign === undefined) { // default left
			textAlign = PrinterUtils.TextAlign.LEFT;
		}
		
		var textResult = '';
		textResult = text||'';
		
		if(CommonUtils.startsWith(textResult+'', 'undefined')){
			textResult = textResult.replace(/undefined/g, '');
		}
		
		if(isUnderLine === undefined) {
			isUnderLine = false;
		}
		
		if(fontStyle === undefined) {
			fontStyle = PrinterUtils.FontStyle.PLAIN;
		}
		textDataArray.push({
        	font : {
                face   : '굴림',
                color  : PrinterUtils.FontColor.BLACK,
                size   : fontSize,
                style   : fontStyle //|| PrinterUtils.FontStyle.BOLD // PrinterUtils.FontStyle.ITALIC
            },
    		x : x,
    		y : y,
        	lineHeight : 5, //* mm 
        	text : textResult,
        	align : textAlign,
        	isUnderLine : isUnderLine
        });
	},
	
	/**
	 * @private
	 * applet을 이용하여 print할때 전달되는 barcode data를 만들어서 array에 담는다. 
	 */
	setBarcode : function (barcodeDataArray, data, x, y, topX, topY, width, height, type, msgPosition, msgFontSize) {
		if( x === 0 || y === 0 || width ===0 || height === 0 || Ext.isEmpty(x) || Ext.isEmpty(y) || Ext.isEmpty(width)|| Ext.isEmpty(height) || Ext.isEmpty(data)) {
			return;
		}
		
		if(type === undefined) {
			type = PrinterUtils.Barcode.CODE128ALL;
		}
		
		x = x + topX; 
		y = y + topY;
		
		barcodeDataArray.push({
           type : type,
           x      : x,     // mm  
           y      : y,     // mm  
           width  : width, // 
           height : height,// 
           data   : data+'', // 바코드 데이터
           barHeight : 14,   // 바코드 bar의 높이
           fontSize  : msgFontSize||3,     // 바코드 font size
           moduleWidth : 0.4,
           msgPosition: msgPosition||'bottom'
        });
	},
	
	/**
	 * 명세서 설정 store가져오기
	 */
	getInvoiceStore : function () {
		var me = this;
		
		if(me.invoiceStore) {
			me.invoiceStore.load();
		} else {
			me.invoiceStore = Ext.create('Axt.popup.store.Invoice');
			me.invoiceStore.load();
		}
		return me.invoiceStore;
	},
	
	/**
	 * 거래명세서,세금계산서,택배송장의 model 가져오기<br/>
	 * 만약 아직 설정저장이 되어있지 않다면 생성해서 가져온다.
	 */
	getInvoiceModel : function (invoiceType, version) {
		var me = this;
		var invoiceStore = me.getInvoiceStore();
		var invoiceModel = invoiceStore.findRecord('invoice_type', invoiceType);
		
		if(Ext.isEmpty(invoiceModel)) { // 아직 설정저장이 되어있지 않은경우
			// 1. main model 생성
			return me.createInvoiceModel(invoiceType);
		} else { // 이미 설정 저장이 되어있는 경우
			if(version===undefined) {
				return invoiceModel;
			}
			
			// 이미 localstorage에 저장되어있는 버전과 현재 설정화면의 버전을
			// 비교하여 업그레이드할 대상이면 if문 안에서 조정해준다.
			var oldVersionTemp = invoiceModel.get('version');
			if(Ext.isEmpty(oldVersionTemp)){
				oldVersionTemp = '0';
			}
			var oldVersion = Number(oldVersionTemp);
			var currentVersion = Number(version);
			
			if( currentVersion > oldVersion){ // 버전 업그레이드 (버전업되었다면 이곳에서 처리)
				console.debug('model의 버전이 업그레이드 되었습니다. ('+oldVersion + ' => '+ currentVersion+')');
				var newCoordinatesModel = me.createInvoiceCoordinateModel(invoiceType);
				var mergeCoordinates = Ext.applyIf(invoiceModel.get('coordinates'), newCoordinatesModel.data);
				invoiceModel.set('coordinates', mergeCoordinates);
			}
			
			return invoiceModel;
		}
	}, 
	
	/**
	 * 택배송장코드에 해당하는 택배송장 설정이 저장 되어있는가 확인
	 * 좌표설정 저장이 반드시 필요하므로 택배송장 출력을하는 해당 메서드 상단에서 <br/>
	 * 이 메서드를 호출해서 체크하고 넘어가야 한다.
	 * 
	 * ## 예제
	 *     var deliveryCode = .....;
	 *     if( ! ResourcePrint.isDeliveryConfigSave(deliveryCode)) {
     *         return false;
     *     }
	 *      
	 * @param {String} deliveryCode Const.InvoiceType.Delivery 안에 있는 코드
	 * @return {Boolean} result
	 */
	isDeliveryConfigSave : function (deliveryCode) {
		var me = this;
		
		// 숫자로 들어오는것을 문자열로 변환
		deliveryCode = deliveryCode + '';
		
		var invoiceStore = me.getInvoiceStore();
		var invoiceModel = invoiceStore.findRecord('invoice_type', deliveryCode);
		
		if(Ext.isEmpty(invoiceModel)) {
			Ext.Msg.alert(Const.CONFIRM, "택배송장 장비설정을 해주십시오.");
			return false;
		}
		return true;
	},
	
	/**
	 * 현재 개발되어 사용가능한 택배송장 코드인지 판단<br/>
	 * Const에 상수로 정의되어있음!
	 */
	isDeliveryCode : function (deliveryCode) {
		var me = this;
		deliveryCode = deliveryCode + '';
		var deliveryCodeObj = Const.InvoiceType.Delivery;
		for(var code in deliveryCodeObj) {
			if(deliveryCodeObj[code] === deliveryCode) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * @private
	 * 명세서의 모델 만들기
	 */
	createInvoiceModel : function (invoiceType) {
		var me = this;
		
		// 1. main model 생성
		var invoiceModel = Ext.create('Axt.popup.model.Invoice');
		invoiceModel.set('invoice_type', invoiceType);
		
		// 요청이 택배송장인경우 용지 설정과 dpi를 default로 설정 한다.
		if( invoiceType === Const.InvoiceType.Delivery.CJ ) {
			invoiceModel.set('printer_dpi',  PrinterUtils.Dpi.SEWOO_LK_B30);
			invoiceModel.set('paper_width',  PrinterUtils.Paper.DELIVERY_100_200.WIDTH);
			invoiceModel.set('paper_height', PrinterUtils.Paper.DELIVERY_100_200.HEIGHT);
			invoiceModel.set('paper_type',   Const.PaperType.DELIVERY_100_200);
		} else if(invoiceType === Const.InvoiceType.SALE) { // 거래명세서
			invoiceModel.set('printer_dpi',  PrinterUtils.Dpi.NORMAL);
			invoiceModel.set('paper_width',  PrinterUtils.Paper.A4.WIDTH );
			invoiceModel.set('paper_height', PrinterUtils.Paper.A4.HEIGHT);
			invoiceModel.set('paper_type',   Const.PaperType.A4_NORMAL);
		} else if (invoiceType === Const.InvoiceType.TAX) { // 세금계산서
			invoiceModel.set('printer_dpi',  PrinterUtils.Dpi.NORMAL);
			invoiceModel.set('paper_width',  PrinterUtils.Paper.A4.WIDTH );
			invoiceModel.set('paper_height', PrinterUtils.Paper.A4.HEIGHT);
			invoiceModel.set('paper_type',   Const.PaperType.A4_NORMAL);
		}
		
		// 2. main모델안에 set될 좌표 모델(detail) 생성후 main모델의 coordinates속성에 set
		var coordinatesModel = me.createInvoiceCoordinateModel(invoiceType);
		invoiceModel.set('coordinates', coordinatesModel.data); // model에서 json방식으로 꺼내어 set
		return invoiceModel;
	},
	
	/**
	 * @private
	 * 명세서의 좌표모델 만들기
	 */
	createInvoiceCoordinateModel : function (invoiceType, coordinates) {
		var invoiceModel;
		
		if(Ext.isEmpty(coordinates)){
			coordinates = {};
		}
		
		if(invoiceType === Const.InvoiceType.SALE) {
			invoiceModel = Ext.create('Axt.popup.model.InvoiceSale', coordinates);
		} else if (invoiceType === Const.InvoiceType.TAX) {
			invoiceModel = Ext.create('Axt.popup.model.InvoiceTax', coordinates);
		} else if (invoiceType === Const.InvoiceType.Delivery.CJ) {
			invoiceModel = Ext.create('Axt.popup.model.InvoiceDeliveryCJ', coordinates);
		}  
		
		return invoiceModel;
	},
	
	/**
	 * @private 
	 * 거래명세서의 품명이 길경우 잘라내기
	 */
	validMM : function (text, limitMM, listFs) {
		var textMetrics = new Ext.util.TextMetrics();
		var textPixel   = textMetrics.getWidth(text) * (listFs/8);
		var textMM      = textPixel / 3.78;

		if(textMM > limitMM) {
			text = text.substring(0, text.length-1);
			text = this.validMM(text, limitMM, listFs);
		} 
		return text;
	}
	
});
