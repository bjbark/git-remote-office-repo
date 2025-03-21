/**
 * 카드 단말기 플러그인 (데스크탑, 모바일 공용)
 * 
 */
Ext.define('Axt.plugin.terminal.TerminalPlugin', {
	singleton : true,
	alternateClassName: 'TerminalPlugin',
	requires  : [
		'Axt.plugin.terminal.TerminalPluginDesktop',
		'Axt.plugin.terminal.TerminalPluginMobile'
	],
	
    /**
     * 초기화
     */
	initialize : function (config) {
		var me = this;

		if(AppletDova.isDesktop){	/* desktop */
			me.terminal = Ext.create('Axt.plugin.terminal.TerminalPluginDesktop');
			me.terminal.initialize(config);
		} else {				/* mobile */
			me.terminal = Ext.create('Axt.plugin.terminal.TerminalPluginMobile');
			me.terminal.initialize(config);
		}
	},
	
	/**
	 * 단말기 돈통열기
     * 
	 *     // tcp/ip 소켓 통신 (데스크탑, 모바일 공용)
	 *     TerminalPlugin.openCashBox({
	 *	       params : { 
	 *		       host:'203.229.190.20', 
	 *			   port:5000
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
	 *     // 시리얼 통신 (데스크탑 전용)
	 *     TerminalPlugin.openCashBox({
	 *	       params : { 
	 *		       comPort:'COM3', 
	 *			   baudRate:9600
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
 	 * @param {Object} config 설정
	 */
	openCashBox : function (config) {
		var me = this;
		me.terminal.openCashBox(config);
    },
    
    /**
     * 단말기 컷팅 
     * 
	 *     // tcp/ip 소켓 통신 (데스크탑, 모바일 공용)
	 *     TerminalPlugin.cutting({
	 *	       params : { 
	 *		       host:'203.229.190.20', 
	 *			   port:5000
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
	 *     // 시리얼 통신 (데스크탑 전용)
	 *     TerminalPlugin.cutting({
	 *	       params : { 
	 *		       comPort:'COM3', 
	 *			   baudRate:9600
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
 	 * @param {Object} config 설정
     */
	cutting : function (config) {
		var me = this;
		me.terminal.cutting(config);
	},
	
	/**
	 * 단말기 메시지 출력
	 * 
	 *     // tcp/ip 소켓 통신 (데스크탑, 모바일 공용)
	 *     TerminalPlugin.print({
	 *	       params : { 
	 *		       host:'203.229.190.20', 
	 *			   port:5000, 
	 *			   msg:['안녕하세요 테스트입니다.'],
	 *			   gap:5	                       // 숫자만큼 메시지 끝에 개행추가 
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
	 *     // 시리얼 통신 (데스크탑 전용)
	 *     TerminalPlugin.print({
	 *	       params : { 
	 *		       comPort:'COM3', 
	 *			   baudRate:9600, 
	 *			   msg:['안녕하세요 테스트입니다.'],
	 *			   gap:10	                       // 숫자만큼 메시지 끝에 개행추가
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });
	 *     
 	 * @param {Object} config 설정
	 */
	print: function (config) {
		var me = this;
		me.terminal.print(config);
	},
	
	/**
	 * 단말기를 통한 van사 연결 (카드결제, 현금영수증결제 하기)<br/>
	 * 실제 개발시에는 아래의 api사용예제와 example 프로젝트의 결제 부분을 참고하여<br/>
	 * 로컬스토리지에서 host, port를 가져와서 처리하는 방식으로 개발 해야 한다.
	 * 
	 * ## 현금영수증 결제
	 *     // 현금영수증 승인
	 *     TerminalPlugin.connectVan({
	 *	       params : { 
	 *             host:'203.229.190.20', 
	 *             port:5000, 
	 *             amount:'1004',    // 금액
	 *             month:'02',       // 현금영수증 타입 (01 지출증빙, 02 개인)
	 *             serviceCode:'CC', // TerminalUtils.getServiceCode('kis'); 로 서비스코드를 리턴받아 사용한다. 
	 *             telegram : 'kis'  // 통신전문 선택 (kis, nice)
	 *         },
	 *	       callback : function(success, resultObject) {
	 *             if(success){
	 *                 Logger.debug('단말기 연결 : '+success+'</br>결과:'+CommonUtils.jsonEncode(resultObject));
     *             } else {
     *                 Logger.debug('단말기 연결 : '+success+'</br>실패메시지:'+resultObject.message);
     *             }
     *         }
	 *     });
	 *     
	 *     // 현금영수증 승인 취소
	 *     TerminalPlugin.connectVan({
	 *	       params : { 
	 *             host:'203.229.190.20', 
	 *             port:5000, 
	 *             amount:'1004',   		// 금액
	 *             approvalDate:'130827',   // 원거래일자
	 *             approvalNo: '12345678',  // 원거래 승인번호
	 *             card: '01012345678',     // 카드번호 or 휴대폰번호
	 *             serviceCode:'CR', 		// TerminalUtils.getServiceCode('kis'); 로 서비스코드를 리턴받아 사용한다. 
	 *             telegram : 'kis' 		// 통신전문 선택 (kis, nice)
	 *         },
	 *	       callback : function(success, resultObject) {
	 *             if(success){
	 *                 Logger.debug('단말기 연결 : '+success+'</br>결과:'+CommonUtils.jsonEncode(resultObject));
     *             } else {
     *                 Logger.debug('단말기 연결 : '+success+'</br>실패메시지:'+resultObject.message);
     *             }
     *         }
	 *     });
	 * 
	 * 
	 * ## 카드결제
	 *     // 카드 승인
	 *     TerminalPlugin.connectVan({
	 *	       params : { 
	 *             host:'203.229.190.20', 
	 *             port:5000, 
	 *             amount:'1004',    // 금액
	 *             month:'06',       // 할부개월
	 *             serviceCode:'D1', // TerminalUtils.getServiceCode('kis'); 로 서비스코드를 리턴받아 사용한다. 
	 *             telegram : 'kis'  // 통신전문 선택 (kis, nice)
	 *         },
	 *	       callback : function(success, resultObject) {
	 *             if(success){
	 *                 Logger.debug('단말기 연결 : '+success+'</br>결과:'+CommonUtils.jsonEncode(resultObject));
     *             } else {
     *                 Logger.debug('단말기 연결 : '+success+'</br>실패메시지:'+resultObject.message);
     *             }
     *         }
	 *     });
	 *     
	 *     // 카드 승인 취소
	 *     TerminalPlugin.connectVan({
	 *	       params : { 
	 *             host:'203.229.190.20', 
	 *             port:5000, 
	 *             amount:'1004',   		// 금액
	 *             approvalDate:'130827',   // 원거래일자
	 *             approvalNo: '12345678',  // 원거래 승인번호
	 *             card: '4444555566667777',// 카드번호
	 *             serviceCode:'D2', 		// TerminalUtils.getServiceCode('kis'); 로 서비스코드를 리턴받아 사용한다. 
	 *             telegram : 'kis' 		// 통신전문 선택 (kis, nice)
	 *         },
	 *	       callback : function(success, resultObject) {
	 *             if(success){
	 *                 Logger.debug('단말기 연결 : '+success+'</br>결과:'+CommonUtils.jsonEncode(resultObject));
     *             } else {
     *                 Logger.debug('단말기 연결 : '+success+'</br>실패메시지:'+resultObject.message);
     *             }
     *         }
	 *     });
	 * 
 	 * @param {Object} config 설정
	 */
	connectVan : function (config) {
		var me = this;
		me.terminal.connectVan(config);
	}
	
});