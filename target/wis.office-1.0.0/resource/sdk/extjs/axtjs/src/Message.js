/**
 * 표준 메세지 처리용
 */
Ext.define('Axt.Message', {
    extend: 'Ext.window.MessageBox',

    /**
     *
     */
	INTERNET_ERROR : '인터넷 연결 오류',
    HTTP_ERROR_000 : '인터넷이 연결되지 않았거나 서버와 연결을 할수 없는 상태 입니다.',
    HTTP_ERROR_404 : '요청하신 서비스를 찾을수 없습니다.',
    http : function(response) {
		switch(response.status){
			case 200:break; // 200 인경우 정상이므로 메세지를 띄우지 않는다.
			case 000:this.show({ title: this.INTERNET_ERROR +'[000]', msg: this.HTTP_ERROR_000, icon: this.ERROR, buttons: this.OK}); break;
			case 404:this.show({ title: this.INTERNET_ERROR +'[404]', msg: this.HTTP_ERROR_404, icon: this.ERROR, buttons: this.OK}); break;
			default :this.show({ title: this.INTERNET_ERROR  , msg: response.status + ' : ' + response.statusText , icon: this.ERROR, buttons: this.OK});
		}
		return response.status;
    },
    INTERNAL_ERROR : '에러',
    error : function (msg, fn, scope) {
    	this.show({ title: this.INTERNAL_ERROR, msg: msg, icon: this.ERROR, buttons: this.OK});
    }




}, function() {
    /**
     * @class Axt.MessageBox
     * @extends Ext.window.MessageBox
     * @singleton
     * Singleton instance of {@link Axt.window.MessageBox}.
     */
    Ext.MessageBox = Ext.Msg = new this();
});