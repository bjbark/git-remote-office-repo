/**
 * @class Axt.plugin.AppletDova
 * 데스크탑용 애플릿 통신 클래스
 */
Ext.define('Axt.plugin.AppletDova', {
	alternateClassName: 'AppletDova',
	requires  : [
	],
	singleton : true,
    failureFuncGlobal  : null,      /* 자바단에서 exception났을때 이 함수 호출 */
                                    /* 못가져올때와 같은 애플릿단의 오류일때 콜백 */
    logDebug     : true,            /* 애플릿 콘솔에서 디버그 볼 것인가? */
    appletVersion: '20140804_2',    /* 메인 애플릿의 버전 (jar를 재컴파일해서 묶으면 이곳의 버전을 올려줘야 함) */
    archiveBase  : '../../../sky.javascripts/src/websource/sencha/2.3.1.complete/src/axtjs/plugin', /* 애플릿관련 파일이 있는 url */
    javaArguments: '-XX:MaxPermSize=64m -Xms64m -Xmx64m',   /* heap용량 */
    appletId     : 'skyApplet',

    mainApplet   : 'skyApplet.jar',      /* main Applet의 이름 */
    expLib       : ['pdfbox-app.jar','barcode4j.jar', 'jssc.jar'], /* main Applet에 import되어서 사용되는 외부 라이브러리 */

    separateJvm  : true,            /* 애플릿을 여러개 띄울경우의 옵션 (수정 X) */
    applet       : null,            /* 애플릿의 html element */
    nameSpace   : 'AppletDova',     /* 애플릿에서 자바스크립트를 호출할때 사용하는 name space */

    isDesktop : (Ext.os && Ext.os.is.Desktop) || (Ext.is && Ext.is.Desktop), // 데스크탑 인가?
    isExtJs   : (Ext.is), // Ext JS인가?

    listenerNames : {},
    callbackGlobalFailure : function(message){ /* 애플릿에서 exception났을때 이곳을 호출 */
	    Ext.Msg.alert('글로벌 예외', message);
	},

	callbackGlobalSuccess : function(message){
	},

	/**
	 * 애플릿 초기화<br/>
	 * BaseConfig에서 호출
	 */
	initialize : function (config) {
	    var me = this;

	    if (me.applet !== null) {
	    	if(config && Ext.isFunction(config.callback)) {
	    		config.callback(true);
	    	}
	    	return false;
	    }

	    Ext.apply(me, config);

	    if(me.isExtJs) { // ext js
	    	me.archiveBase = './resource/sdk/extjs/axtjs/src/plugin';
	    	me.setMask('', true);
	    } else { // sencha touch

	    }

        setTimeout(function(){
        	// 애플릿 태그 삽입
        	me.setAppletTag();

        	// 애플릿 로딩되었나 체크
        	me.execute({
        		plugin : 'CommonPlugin',
        		method : 'appletLoadCheck',
        		params : null,
        		success : function(res){
        			if(me.isExtJs) {
        				me.setMask('', false);
        			} else {
        				Ext.Viewport.setMasked(false);
        			}
        			if(config && Ext.isFunction(config.callback)) {
        				config.callback(true);
        			}
        		},
        		failure : function(msg){
        		}
        	});
        }, 500);

	},

	/**
	 * @private
     * 애플릿 테그 삽입
     */
    setAppletTag : function () {
        var me = this;
        var appletTag = '<applet code="com.sky.applet.framework.BaseApplet.class"'
//                        + ' archive="' + me.archiveBase + '/'+ me.mainApplet +',' + me.archiveBase + '/pdfbox-app-1.8.2.jar" ';
        + ' archive="' + me.archiveBase + '/'+ me.mainApplet;

        	for(var i=0, size=me.expLib.length; i<size; i++) {
        		appletTag += (',' + me.archiveBase + '/'+ me.expLib[i]);
        	}

        	appletTag   += '"';

            appletTag   += (' id="' + me.appletId + '" name="SKY Communication System" width="0" height="0">'
                        + '<param name="logDebug" value="'+ me.logDebug +'"/>'
                        + '<param name="nameSpace" value="'+ me.nameSpace +'"/>'
                        + '<param name="cache_archive" value="skyApplet.jar'+ (me.expLib.length>0?(','+me.expLib.join(',')):'') +'"/>'
                        + '<param name="cache_version" value="'+me.appletVersion+'"/>'
                        + '<param name="java_arguments" value="'+me.javaArguments+'"/>'
                        + '<param name="separate_jvm"   value="'+me.separateJvm+'"/>'
                        + '<param name="successCallback"   value="callbackSuccess"/>'
                        + '<param name="failureCallback"   value="callbackFailure"/>'
                        + '<param name="globalSuccessCallback"   value="callbackGlobalSuccess"/>'
                        + '<param name="globalFailureCallback"   value="callbackGlobalFailure"/>'
                        + '</applet>');
		var appletDiv = document.createElement('div');
		appletDiv.setAttribute('id', 'appletDiv');
		appletDiv.innerHTML = appletTag;
		document.body.appendChild(appletDiv);
        me.applet = document.getElementById(me.appletId);
    },

    /**
     * 애플릿 실행
     *
     *     AppletDova.execute({
     *         plugin : 'CommonPlugin', // 어떤 플러그인을 호출하느냐에 따라 다르다.
     *         method : 'command',
     *         params : { a:"1", b:"2", c:"3" },
     *         success : function(res){
     *             if(callbackFunc){
     *                 callbackFunc(true);
     *             }
     *         },
     *         failure : function(msg){
     *             Ext.Msg.alert('', msg);
     *             if(callbackFunc){
     *                 callbackFunc(false);
     *             }
     *         }
     *     });
     *
     * @param {Object} config 설정
     * @param {String} config.plugin 애플릿 플러그인명
     * @param {String} config.method 애플릿 플러그인의 메서드
     * @param {Object} config.params 파라미터 object
     * @param {Function} config.success 성공 콜백
     * @param {Function} config.failure 실패 콜백
     */
    execute : function(options) {
        var me = this;
        try {

            if( ! options.params ) {
                options.params = {};
            }

            /* 다중요청처리시 안전하게 다시 콜백받기 위해 callbackId생성 */
            var date = new Date();
            var callbackId = Ext.Date.format(date, 'YmdHis') + date.getMilliseconds() + (Math.floor(Math.random() * 1000) + 1);

            // 콜백등록
            me.setCallbackFunction(
                options.success,
                options.failure,
                callbackId
            );

            var params = [];
            params.push(options.plugin);
            params.push(options.method);
            params.push(callbackId);
            params.push(Ext.encode(options.params));

            // 이부분이 애플릿 실행
            me.applet['execute'].apply(me.applet, params );
        } catch(e) {
            console.error(e.toString());

            var msg = '1. 최초1회 플러그인 설치가 필요합니다. 상단의 "플러그인 설치" 버튼을 클릭해 주십시오.<br/><br/>' +
            '2. 플러그인 설치 또는 업데이트 후에는 브라우저를 모두 종료후 재시작 해주십시오.<br/><br/>' +
            '3. 확인을 클릭하면 플러그인 업데이트 사이트로 이동 합니다..' +
            '';

            if(me.isExtJs) {
				me.setMask('', false);

				Ext.Msg.show({
				    title: '플러그인 설치',
				    msg: msg,
				    width: 350,
				    buttons: Ext.Msg.OK,
				    fn: function(){
				    	if(Ext.isChrome){
				    		window.location.href = 'http://www.java.com/ko/download/chrome.jsp?locale=ko';
				    	} else {
				    		window.location.href = 'http://www.java.com/ko/download/manual.jsp';
				    	}
				    },
				    icon: Ext.window.MessageBox.INFO
				});

			} else {
				Ext.Viewport.setMasked(false);
				Ext.fly('appLoadingIndicator').destroy();

				Ext.Msg.show({
				    title: '플러그인 설치',
				    message: msg,
				    width: 350,
				    buttons:  Ext.MessageBox.OK,
				    fn: function(){
				    	var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
				    	if(isChrome){
				    		window.location.href = 'http://www.java.com/ko/download/chrome.jsp?locale=ko';
				    	} else {
				    		window.location.href = 'http://www.java.com/ko/download/manual.jsp';
				    	}
				    	//http://java.com/ko/download/installed.jsp
				    }
				});
			}

        }
    },

    /**
     * @private
     * 콜백등록
     */
    setCallbackFunction : function(successFunc, failureFunc, callbackId) {
    	var me = this;
        me['callbackSuccess'+callbackId] = function(res){
            successFunc(res);
            /* 콜백받으면 아래의 속성 제거 */
            setTimeout(function(){
                delete me['callbackSuccess'+callbackId];
                delete me['callbackFailure'+callbackId];
            }, 100);
        };
        me['callbackFailure'+callbackId] = function(res){
            failureFunc(res);
            /* 콜백받으면 아래의 속성 제거 */
            setTimeout(function(){
                delete me['callbackSuccess'+callbackId];
                delete me['callbackFailure'+callbackId];
            }, 100);
        };
    },

    /**
     * Ext에서 실행되는 method (sencha에서는 사용하면 안됨)<br/>
     * Ext, Sencha 프레임웍 공용으로 사용하기 위해 이렇게 해둠
     */
    setMask : function (message, isShow) {
        var me = this;

        if(Ext.isEmpty(message)) {
        	message = '플러그인 로딩중입니다.<br/> 잠시만 기다려 주십시오.';
        }
        if( ! me.mask ) {
            me.mask = new Ext.LoadMask(Ext.getBody(), {msg: message });
        }

        if(isShow) {
        	me.mask.show();
        } else {
    	    me.mask.hide();
        }
    }

});