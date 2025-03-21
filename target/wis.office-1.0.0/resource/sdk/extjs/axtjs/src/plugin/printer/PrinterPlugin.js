/**
 * 프린터 플러그인
 */
Ext.define('Axt.plugin.printer.PrinterPlugin', {
	singleton : true,
	alternateClassName: 'PrinterPlugin',
	requires  : [
	    'Axt.plugin.printer.util.PrinterUtils',
		'Axt.plugin.printer.PrinterPluginDesktop'
	],
	
    /**
     * @ignore
     * 초기화
     */
	initialize : function (config) {
		var me = this;
		if(AppletDova.isDesktop){	/* desktop */
			me.plugin = Ext.create('Axt.plugin.printer.PrinterPluginDesktop');
			me.plugin.initialize(config);
		}
	},
	
	/**
	 * 좌표설정해서 text, image, barcode를 출력 (데스크탑용)
	 * 
	 *     var params = {
	 *         "setting": {
	 *         	   "copy"        : 2,              // (option) 인쇄 매수
	 *             "printerName" : "HP Color LaserJet 3600",
	 *             "orientation" : PrinterUtils.Orientation.PORTRAIT, // 세로 출력, 택배송장의 경우 PrinterUtils.Orientation.LANDSCAPE
	 *             "paper": PrinterUtils.Paper.A4,
	 *             "dpi": PrinterUtils.Dpi.NORMAL // 택배송장의 경우 PrinterUtils.DPI.SEWOO_LK_B30
	 *         },
	 *         "barcodeData": [
	 *              {
	 *                 "type"   : PrinterUtils.Barcode.CODE128,
	 *                 "x"      : 100, // mm  
	 *                 "y"      : 100, // mm  
	 *                 "width"  : 30,  // mm
	 *                 "height" : 20,  // mm
	 *                 "data"   : '21300000003087'   // 바코드 데이터
	 *              }
	 *         ],
	 *         "textData": [
	 *             {
	 *                 "font": {
	 *                     "face": "굴림",
	 *                     "color": [0,0,0],
	 *                     "size": 8,
	 *                     "style": 0
	 *                 },
	 *                 "x": 30,
	 *                 "y": 30,
	 *                 "lineHeight": 5,
	 *                 "text": "111-11-11119",
	 *                 "align": PrinterUtils.TextAlign.LEFT
	 *             }
	 *         ]
	 *     };
	 *     
	 *     PrinterPlugin.printCoordinate({
	 *         params : params,
	 *         callback:function(success){
	 *             Logger.debug(success);
	 *         }
	 *     });
	 * 
	 * @param config 설정정보
	 * @param {Object} config.setting  프린터 설정값
	 * @param {Array} config.barcodeData  바코드 데이터
	 * @param {Array} config.textData 문자 데이터
	 * @param {Array} config.imageData 이미지 데이터 
	 */
	printCoordinate : function (config) {
		var me = this;
		me.plugin.printCoordinate(config);
	},
	
	/**
	 * PDF 파일 출력 (데스크탑용)
	 * 
	 * ## 예제
	 *     PrinterPlugin.printPDFFile({
	 *         params:{
	 *             copy : 2,              // (option) 인쇄 매수
     *             file : 'd:/aaa.pdf',
	 *             printerName:'SINDOH D400 Series PCL SP',
	 *             openDialog:false
	 *         },
	 *         callback:function(success, msg){
	 *         }
	 *     });
	 */
	printPDFFile : function (config) {
		var me = this;
		me.plugin.printPDFFile(config);
	},
	
	/**
	 * URL호출하여 PDF 출력 (데스크탑용)
     * 
     * ## 예제
     *     PrinterPlugin.printPDFUrl({
     *         params:{
     *         	   copy : 2,              // (option) 인쇄 매수
     *             url : _global.api_host_info + '/system/sale/deliveryclose/get/printing.do',
     *             requestMethod : 'POST',
     *             urlParam : {
     *                 param:{"inv_no":"21300000003087","jasperParam":{"download":true,"format":"pdf"}},
     *                 token:'1a970249445e40fe0645cf63c72a0e54b9cdff122510704b52571c3fe6f22e347'
     *             },
     *             printerName:'SINDOH D400 Series PCL SP',
     *             openDialog:false
     *         },
     *         callback:function(success, msg){
     *         }
     *     });
	*/
	printPDFUrl : function (config) {
		var me = this;
		me.plugin.printPDFUrl(config);
	},
	
	/**
	 * 프린터 목록 가져오기
	 * 
	 * ## 예제
	 * 
	 *     PrinterPlugin.getPrinterList({
	 *         callback:function(success, printerList, msg){
	 *         }
	 *     });
	 *     
	 *     // 아래와 같은 결과를 받는다
	 *     // [
	 *     //     { "isDefault":true, "name":"기본프린터"},
	 *     //     { "isDefault":false, "name":"2번프린터"}
	 *     // ]
	 */
	getPrinterList : function (config) {
		var me = this;
		me.plugin.getPrinterList(config);
	},
	
	/**
	 * 라벨프린터 프린트
	 * 
	 * ## 예제
	 * 
	 *     // TSC TTP-243 라벨프린터의 예제
	 *     PrinterPlugin.printLabel({
	 *         params : {
	 *             printerName : 'TTP-243', // 
	 *             portName : 'COM10',
	 *             baudRate : 9600,
	 *             direction: 1,     // 출력방향 1: 정방향, 2:역방향
	 *             paperGap : 3,     // 라벨과 라벨사이의 사이 길이 (mm)
	 *             speed : 3,        // 출력속도 1~5
	 *             density : 8,      // 출력밀도 (진하게 인쇄되는 정도 (1~15)
	 *             topX : 0,         // 출력시작 x좌표 (mm)
	 *             topY : 0,         // 출력시작 y좌표 (mm)
	 *             paperWidth  : 40, // 라벨의 넓이 (mm)
	 *             paperHeight : 40, // 라벨의 높이 (mm)
	 *             data : [
	 *                 {
	 *                     count : 5, // 5장 출력
	 *                     textData : [
	 *                         {
	 *                             data : 'test text',
	 *                             x  : 15,  // text출력될 x좌표 (mm)
	 *                             y  : 1,   // text출력될 y좌표 (mm)
	 *                             fs : 1,   // text 크기 1~3
	 *                             rotation : 0 // (회전각도 0, 90, 180, 270)
	 *                         }
	 *                     ],
	 *                     barcodeData : [
	 *                         {
	 *                             data : '12345', // 바코드 데이터
	 *                             type : '128',   // 바코드타입 code128
	 *                             x : 5,          // 바코드출력될 x좌표 (mm)
	 *                             y : 8,          // 바코드출력될 y좌표 (mm)
	 *                             h : 5,          // 바코드의 높이 (mm)
	 *                             narrow : 2,  
	 *                             wide : 2,
	 *                             rotation : 0    // (회전각도 0, 90, 180, 270)
	 *                         }
	 *                     ]
	 *                 }
	 *             ] // end data
	 *         },
	 *         callback:function(success){
	 *         }
	 *     });
	 *     
	 */
	printLabel : function (config) {
		var me = this;
		me.plugin.printLabel(config);
	}
	
});