/**
 * 프린터 플러그인 유틸 (데스크탑 전용)<br/>
 * 프린터 사용시 필요한 DPI, 폰트등의 상수와 메서드가 정의 되어있다. 
 */
Ext.define('Axt.plugin.printer.util.PrinterUtils', {
	singleton : true,
	alternateClassName: 'PrinterUtils',
	requires  : [
	],

	/**
	 * @property DPI 프린터 DPI
	 * @property DPI.SEWOO_LK_B30 프린터
	 */
	Dpi : {
		NORMAL : 600,
		SEWOO_LK_B30 : 203 /* 세우테크 LK-B30모델의 DPI */
	},
	
	/**
	 * @property FONT_STYLE 폰트 스타일
	 * @property FONT_STYLE.PLAIN 일반 글씨체
	 * @property FONT_STYLE.BOLD 굵은 글씨체
	 * @property FONT_STYLE.ITALIC 이텔릭체
	 */
	FontStyle : {
		PLAIN : 0,                /* 일반 글씨체 */
		BOLD : 1,                 /* 굵게 */
		ITALIC : 2                /* 이텔릭 */
	},
    
	/**
	 * @property FONT_COLOR 폰트 컬러
	 * 이외의 컬러는 [255, 0, 0] 과같이 RGB 배열로 사용하면 된다.
	 * 
	 * @property FONT_COLOR.BLACK 검정색
	 * @property FONT_COLOR.RED 빨간색
	 * @property FONT_COLOR.GREEN 녹색
	 * @property FONT_COLOR.BLUE 파란색
	 */
	FontColor : {
		BLACK : [0,0,0],
		RED   : [255,0,0],
		GREEN : [0,255,0],
		BLUE  : [0,0,255]
	},
	
	/**
	 * @property Text출력시 좌/우 정렬
	 */
	TextAlign : {
		LEFT : 0,
		RIGHT : 2
	},
    
	/**
	 * @property IMAGE_TYPE 이미지 타입
	 * @property IMAGE_TYPE.URL 인터넷 상의 이미지파일 출력 타입
	 * @property IMAGE_TYPE.LOCAL 로컬에 있는 이미지파일 출력 타입
	 */
	ImageType : {
		URL : 0,                  /* 이미지 로드시 url에서 로드 */
		LOCAL : 1                 /* 이미지 로드시 local에서 로드 */
	},
    
	/**
	 * @property ORIENTATION 인쇄 방향 
	 * @property ORIENTATION.PORTRAIT 세로 
	 * @property ORIENTATION.LANDSCAPE 가로 
	 * @property ORIENTATION.REVERSE_PORTRAIT 뒤집어서 세로 
	 * @property ORIENTATION.REVERSE_LANDSCAPE 뒤집어서 가로
	 */
	Orientation : {
		PORTRAIT  : 0,           /* 세로 */
		LANDSCAPE : 1,           /* 가로 */
		REVERSE_PORTRAIT : 2,    /* 뒤집어서 세로 */
		REVERSE_LANDSCAPE : 3    /* 뒤집어서 가로 */
	},
	
	/**
	 * 바코드 타입
	 */
	Barcode : {
		/* codabar, code39, postnet, intl2of5, ean-128, royal-mail-cbc, ean-13, itf-14, datamatrix, code128, pdf417, upc-a, upc-e, usps4cb, ean-8 */
		CODABAR         : 'codabar',
		CODE39          : 'code39',
		POSTNET         : 'postnet',
		INTL2OF5        : 'intl2of5',
		EAN_128         : 'ean-128',
		ROYAL_MAIL_CBC  : 'royal-mail-cbc',
		EAN_13          : 'ean-13',
		ITF_14          : 'itf-14',
		DATAMATRIX      : 'datamatrix',
		CODE128ALL      : 'code128ALL', // 자동선택
		CODE128A        : 'code128A',
		CODE128B        : 'code128B',
		CODE128C        : 'code128C',
		PDF417          : 'pdf417',
		UPC_A           : 'upc-a',
		UPC_E           : 'upc-e',
		USPS4CB         : 'usps4cb',
		EAN_8           : 'ean-8'
	},
	
	Paper : {
		A4 : {
			WIDTH  : 210, // 가로
			HEIGHT : 297  // 세로
		},
		DELIVERY_100_200 : { // 택배송장 용지중  100 * 200 사이즈
			WIDTH  : 100, // 가로
			HEIGHT : 200  // 세로
		}
	},
	
	/**
	 * 택배송장용 테스트 데이터 리턴<br/>
	 * 프린터 드라이버가 제대로 설치되었는지 출력확인을 위한 테스트 데이터를 가져온다.<br/>
	 * 개발자는 이 메서드로 출력되는 json데이터를 참고해서
	 * 택배송장 개발시 알맞는 데이터를 만들어 내야 한다.
	 * setting부분은 거의 고정적으로 사용되지만 그이외의 data부분은 별도로 개발해야 한다.
	 *
	 * @param {String} printerType
	 * 1. 'SEWOO_LKB30'<br/>
	 *     프린터 이름 : 세우테크 LK-B30프린터
	 *     DPI : 203<br/>
	 *     용지 : 100mm * 200mm<br/>
	 *     출력내용 : 바코드 ean-13형식 x:290, y:230 좌표에 인쇄, 용지 네 모서리에 텍스트 출력
	 * 
	 * ## 테스트 데이터 프린터 출력 방법
	 * 
	 *     PrinterPlugin.printDelivery({
	 *         params : PrinterUtils.getTestDeliveryData('SEWOO_LKB30')
	 *     });
	 *     
	 */
	getTestDeliveryData : function (printerType) {
		var me = this;
		return me.testDeliveryData[printerType.toUpperCase()];
	}
});




/**
 * @private 택배송장용 테스트 데이터.<br/>
 */
PrinterUtils.testDeliveryData = {
	SEWOO_LKB30 : {
	   setting : {
	       dpi : PrinterUtils.Dpi.SEWOO_LK_B30,                 // lk-b30프린터의 DPI
	       orientation : PrinterUtils.Orientation.LANDSCAPE,  // 가로 인쇄
	       paper : {
	    	   width : PrinterUtils.Paper.A4.WIDTH,
	    	   height : PrinterUtils.Paper.A4.HEIGHT
	       }
	   },
	   barcodeData : [
	       {
	           type : PrinterUtils.Barcode.CODE128ALL,
               x      : 100, // x좌표 mm 
               y      : 80,  // y좌표 mm  
        	   width  : 30,  // 가로크기 mm
        	   height : 20,  // 세로크기 mm
	           data   : '21300000003356', // 바코드 데이터
	           barHeight : 14,   // 바코드 bar의 높이
	           fontSize  : 3,     // 바코드 font size
	           moduleWidth : 0.4,
	           msgPosition: 'bottom'
	       }
	   ], /* end barcode data */
	   textData : [
	       {   
               x : 5,  /* x좌표 mm */ 
               y : 5,  /* y좌표 mm */ 
	           font : {
	               face   : '굴림',
	               color  : PrinterUtils.FontColor.BLACK,
	               size   : 10,
	               style   : PrinterUtils.FontStyle.BOLD | PrinterUtils.FontStyle.ITALIC
	           },
	           lineHeight : 5, /* mm */
	           text : '안녕하세요 좌, 상\n출력이 됩니까?'
	       },
	       {   
               x : 5,   /* mm */ 
               y : 95,  /* mm */ 
	           font : {
	               face   : '궁서',
	               color  : [171, 242, 0],
	               size   : 15,
	               style   : PrinterUtils.FontStyle.PLAIN
	           },
	           lineHeight : 5, /* mm */ 
	           text : '안녕하세요 좌, 하 '
	       },   
	       {   
               x : 160,  /* mm */ 
               y : 5,    /* mm */ 
	           font : {
	               face   : '굴림',
	               color  : [217, 65, 197],
	               size   : 12,
	               style   : PrinterUtils.FontStyle.BOLD | PrinterUtils.FontStyle.ITALIC
	           },
	           lineHeight : 5, /* mm */
	           text : '안녕하세요 우, 상'
	       },
	       {   
               x : 160, /* mm */ 
               y : 95,  /* mm */ 
	           font : {
	               face   : '궁서',
	               color  : [171, 242, 0],
	               size   : 13,
	               style   : PrinterUtils.FontStyle.PLAIN
	           },
	           lineHeight : 5, /* mm */ 
	           text : '안녕하세요 우, 하'
	       }    
	   ] /* end textData */
	   
//	   ,imageData  : [
//	         {
////			             type : PrinterUtils.ImageType.LOCAL,
////			             image : 'd:/code39.jpg',
//	             type : PrinterUtils.ImageType.URL,
//	             image : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJjCf4PTWLlXlkhg1zlWd0wFwRJpqtQATIC8g_yFjnKxrcvNDi',
//	             coordinates : {
//	                 x : 40,
//	                 y : 40
//	             },
//	             size : {
//	                 width  : 20, /* mm */ 
//	                 height : 20  /* mm */
//	             }
//	         }
//	     ] /* end image data */
	}
};