/**
 * @private
 * 모든 통신전문 클래스들이 extend해야할 BaseTelegram interface. <br/>
 * 필수적으로 2개의 메서드를 구현해야한다.<br/>
 * 2개의 메서드 내부적으로 처리되는 로직은 이미 만들어져 있는<br/>
 * <span style="color:red">KIS.js 통신전문 클래스의 private메서드 들을 참고한다.</span><br/>
 * 각 van사마다 통신전문이 다르기 때문에 내부로직은 공통될수 없다<br/>
 * 그래서 외부 클래스와의 연동을 위해 필수적으로 2개의 메서드를 구현하고<br/>
 * 내부로직은 각 통신전문 클래스마다 다르게 구현하는것이다.<br/>
 * 만약 createRequest, parseResponse 2개의 메서드를 구현안한다면 에러가 발생한다.
 * 
 * ## 1. createRequest : 요청 전문 생성. 
 * 
 *     // config 파라미터는 TerminalPlugin.js의 connectVan메서드 호출시 
 *     // 전달되는 파라미터인 params를 참고한다.
 *     createRequest : function(config){
 *         var me = this;
 *         // ~~통신요청전문 생성후 리턴
 *         return request;
 *     }
 *      
 * ## 2. parseResponse : 단말기 승인후 받은 메시지를 유효성 체크해서 json객체 리턴
 * 
 *     // response 파라미터는 '2,50,51,52,53~... 3' 과같이 stx~etx( or LRC) 10진수 ascii숫자가 comma로 구분되어서 넘어온다.
 *     parseResponse : function (response) {
 *         var me = this;
 *         // ~~응답전문 파싱후 리턴
 *         return responseObject;
 *     }
 */
Ext.define('Axt.plugin.terminal.telegram.BaseTelegram', {
	requires:[
	],
	
	/**
	 * @ignore
	 */
	constructor : function (){
		
		if( ! this.createRequest ) {
			Logger.error('통신전문 클래스에 createRequest를 구현해 주십시오.', true);
		}

		if( ! this.parseResponse ) {
			Logger.error('통신전문 클래스에 parseResponse를 구현해 주십시오.', true);
		}
	}
	
});