/**
 * 파일 다운로드<br>
 * iframe를 통해 파일 다운로드를 요청. 에러 발생시는 onload이벤트를 통해 팝업 알림<br>
 * 출처: http://quispiam.com/download-a-file-via-an-event-for-extjs4/<br>
 * 수정: onload() 이벤트시 body 조건을 변경<br>
 *
 */
Ext.define('Axt.util.FileDownload', {
	extend: 'Ext.Component',
	alias: 'widget.FileDownloader',
	autoEl: {
		tag: 'iframe',
		cls: 'x-hidden',
		src: Ext.SSL_SECURE_URL
	},

	enabledLoadMask: false,

	load: function(config) {

		this.enabledLoadMask = config.enabledLoadMask || false;

		if (this.enabledLoadMask) {
			this.loadMask = new Ext.LoadMask(Ext.getBody(), {
				id: 'fileDownloadMask',
				msg: '<span class="text-warn">파일 다운로드중</span>입니다... 잠시만 기다려 주십시오.',
				msgCls: 'content-load-mask'
			});
		}

		var parmas = config.params || {};
		//this.startTimer(token);

		var e = this.getEl();
		e.dom.src = config.url + (parmas ? '?' + Ext.urlEncode(parmas) : '');
		e.dom.onload = function(v) {

			// ui block stop, iframe scope 이므로 Ext.getCmp()로 찾아서 비활성화
			var loadMask = Ext.getCmp('fileDownloadMask');
			if (loadMask) {
				loadMask.hide();
			}

			var dom = e.dom;
			var message;
			if (dom.contentDocument) {
				message = dom.contentDocument.body.innerHTML;
			} else if (dom.contentWindow) {
				message = dom.contentWindow.document.body.innerHTML;
			}

			if (!Ext.isEmpty(message)) {
				Ext.Msg.show({
					title: "에러",
					msg: message,
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		};
	},

	/** cookie 명 */
	cookieName: 'fileDownloadToken',

	/** timer */
	fileDownloadCheckTimer: null,

	/**
	 * 쿠키 확인 timer 시작
	 */
	startTimer: function(token) {

		var me = this,
			fileDownloadCheckTimer
		;

		// ui block
		if (this.enabledLoadMask) {
			this.loadMask.show();
		}

		// cookie clear
		Ext.util.Cookies.set(this.cookieName, null);

		// set interval function
		fileDownloadCheckTimer = window.setInterval(function() {
			var cookieValue = Ext.util.Cookies.get(me.cookieName);
			if (cookieValue == token) {
				me.stopTimer();
			}
		}, 1000);
	},

	/**
	 * 쿠키 확인 timer 종료
	 */
	stopTimer: function() {

		// clear interval function
		window.clearInterval(fileDownloadCheckTimer);

		// cookie clear
		Ext.util.Cookies.set(this.cookieName, null);

		// ui block stop
		if (this.enabledLoadMask) {
			this.loadMask.hide();
		}
	}
});
