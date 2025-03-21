
Ext.define('Axt.util.pg.Inipay50Utils', {
	alternateClassName: ['Inipay50Utils'],
	singleton: true,
	
	/**
	 * 결제
	 * 
	 * ## 실행예제
	 * 
	 *     var config = {
	 *			
	 *         // 설정1. 결제 플러그인 팝업 띄우기전 서버로 가서 결제 금액정보를 암호화 한다.
	 *         secureStartConfig : {
	 *             url  : _global.api_host_info + '/' + _global.app_site+ '/basic/storeinfo/set/pg/secureStart.do', // 암호화 수행할 서버측 url
	 *             price    : "5000",     // 상품가격
	 *             goodname : "A4복사지", // 품명
	 *             gopaymethod : "Card"   // 결제 종류  Card : 카드결제, 카드결제(에스크로), DirectBank : 실시간계좌이체, 실시간계좌이체(에스크로)
	 *         },
	 *		
	 *         // 설정2. 결제 플러그인 팝업에서 결제 내용을 입력한후 서버로 가서 최종 결제 통신을 한다.
	 *         secureResultConfig : {
	 *             url : _global.api_host_info + '/' + _global.app_site+ '/basic/storeinfo/set/pg/secureResult.do', // 암호화 수행할 서버측 url
	 *			
	 *             // 구매자 정보
	 *             buyername:'시스템',               // 구매자 이름
	 *             buyeremail:'kdark0701@gmail.com', // 구매자 이메일
	 *             buyertel:'010-4368-2050',         // 구매자 전화번호
	 *			
	 *             // 배송지 정보 (선택)
	 *             recvname:'', // 받는이 이름
	 *             recvtel:'',  // 받는이 전화번호
	 *             recvaddr:'', // 받는이 주소
	 *             recvpostnum:'', // 받는이우편번호
	 *             recvmsg:'',     // 배송 메시지
	 *			
	 *            maskConfig : {
	 *                 title: '잠시만 기다려 주십시오.',
	 *                 waitConfig : {
	 *                 text : '결제중....',
	 *                 }
	 *             },
	 *	     	
	 *             success : function (res) {
	 *                console.log('결제성공', res);
	 *             },
	 *             failure : function (res) {
	 *                 console.log('결제실패', res);
	 *             }
	 *         }
	 *     };
	 *	
	 *     Inipay50Utils.payment(config);
	 */
	payment : function (config) {
		var me = this;
		var secureStartConfig = {};
		
		// 암호화 시작 config
		secureStartConfig.success = function (res) {
			if(Ext.isFunction( config.secureStartConfig.success )) {
				config.secureStartConfig.success(res);
			}
			
			// 암호화완료후 결제 config
			var secureResultConfig = {};
			secureResultConfig.success = function (res) {
				if(Ext.isFunction( config.secureResultConfig.success )) {
					config.secureResultConfig.success(res);
				}
			};
			
			Ext.applyIf(secureResultConfig, config.secureResultConfig);
			secureResultConfig.pgEncrypt = res.pgEncrypt;
			secureResultConfig.price = config.secureStartConfig.price;
			me.secureResult(secureResultConfig);
		}
		Ext.applyIf(secureStartConfig, config.secureStartConfig);
		
		me.secureStart(secureStartConfig);
	},
	
	/**
	 * 결제 취소
	 * 
	 * ## 실행 예제
	 *     var config = {
	 *         url : _global.api_host_info + '/' + _global.app_site+ '/basic/storeinfo/set/pg/cancel.do',
	 *         tid : 'INIjspISP_INIpayTest20140901164500352355',
	 *         cancelreason : '1', // [선택] 취소사유코드 (1:거래취소 / 2:오류 / 3:기타사항)
	 *         cancelmsg : '테스트입니다.' ,     // [선택] 취소사유 (문자열 100byte)	
	 *         maskConfig : {
	 *             title: '잠시만 기다려 주십시오.',
	 *             waitConfig : {
	 *                 text : '취소중....',
	 *             }
	 *         },
	 *         success : function (res) {
	 *             console.log('결제취소 성공', res);
	 *         },
	 *         failure : function (res) {
	 *             console.log('결제취소 실패', res);
	 *         }
	 *     };
	 *	
	 *     Inipay50Utils.cancel(config);
	 */
	cancel : function (config) {
		var param = {
			tid : config.tid,
			cancelreason : config.cancelreason, // [선택] 취소사유코드 (1:거래취소 / 2:오류 / 3:기타사항)
			cancelmsg : config.cancelmsg ,      // [선택] 취소사유 (문자열 100byte)	
		};
		
		if(config.maskConfig) {
			var maskConfig = {
	 	    	title: '잠시만 기다려 주십시오.',
	 	    	width: 300,
	 	    	wait : true,
	            waitConfig : {
	            	interval: 500,
	                duration : 10000,
	                increment : 25,
	                text : '취소중...',
	                scope : this,
	            },
	 	    	closable: false,
	     	};
			Ext.apply(maskConfig, config.maskConfig);
			Ext.MessageBox.show(maskConfig);
		}
		
		Ext.apply(param, config.extraParams);
		
		Ext.Ajax.request({
			url : config.url,
			timeout : 60000,
			params : {
				param : JSON.stringify(param),
				token : _global.token_id
			},
			success : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(res.success) {
					if(Ext.isFunction(config.success)) {
						config.success(res);
					}
				} else {
					if(Ext.isFunction(config.failure)) {
						config.failure(res);
					}
				}
			},
			failure : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(Ext.isFunction(config.failure)) {
					config.failure(res);
				}
			}
		});
	},
	
	/**
	 * 에스크로 배송등록 (판매자용)
	 */
	escrowDelivery : function (config) {
		var param = {
			tid : config.tid,
			oid : config.oid, // [선택] 취소사유코드 (1:거래취소 / 2:오류 / 3:기타사항)
			dlv_invoice  : config.dlv_invoice,   // 
			dlv_name     : config.dlv_name,      // [필수] 배송등록자
			dlv_excode   : config.dlv_excode,    // [필수] 택배사코드
			dlv_charge   : config.dlv_charge,    // [필수] 배송비 지급형태 (SH : 판매자부담, BH : 구매자부담)
			dlv_sendname : config.dlv_sendname,  // [필수] 송신자 이름
			dlv_sendpost : config.dlv_sendpost,  // [필수] 송신자 우편번호, - 구분자 없이 입력
			dlv_sendaddr_1: config.dlv_sendaddr_1, // [필수] 송신자 주소1
			dlv_sendaddr_2: config.dlv_sendaddr_2, // 송신자 주소2
			dlv_sendtel  : config.dlv_sendtel,   // [필수] 송신자 전화번호
			dlv_recvname : config.dlv_recvname,  // [필수] 수신자 이름
			dlv_recvpost : config.dlv_recvpost,  // [필수] 수신자 우편번호, - 구분자 없이 입력
			dlv_recvaddr : config.dlv_recvaddr,  // [필수] 수신자 주소1
			dlv_recvtel  : config.dlv_recvtel,   // [필수] 수신자 전화번호
			dlv_goodscode: config.dlv_goodscode, // 품목코드
			dlv_goods    : config.dlv_goods,     // [필수] 품명
			dlv_goodcnt  : config.dlv_goodcnt,   // [필수] 상품수량
			price        : config.price,         // [필수] 상품가격
			dlv_reserved1: config.dlv_reserved1, // 상품상품옵션1
			dlv_reserved2: config.dlv_reserved2, // 상품상품옵션2
			dlv_reserved3: config.dlv_reserved3  // 상품상품옵션3
		};
			
		if(config.maskConfig) {
			var maskConfig = {
	 	    	title: '잠시만 기다려 주십시오.',
	 	    	width: 300,
	 	    	wait : true,
	            waitConfig : {
	            	interval: 500,
	                duration : 10000,
	                increment : 25,
	                text : '배송등록중...',
	                scope : this,
	            },
	 	    	closable: false,
	     	};
			Ext.apply(maskConfig, config.maskConfig);
			Ext.MessageBox.show(maskConfig);
		}
		
		Ext.Ajax.request({
			url : config.url,
			timeout : 60000,
			params : {
				param : JSON.stringify(param),
				token : _global.token_id
			},
			success : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(res.success) {
					if(Ext.isFunction(config.success)) {
						config.success(res);
					}
				} else {
					if(Ext.isFunction(config.failure)) {
						config.failure(res);
					}
				}
			},
			failure : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(Ext.isFunction(config.failure)) {
					config.failure(res);
				}
			}
		});
	},
	
	/**
	 * 에스크로 거절확인 (판매자용)
	 */
	escrowDenyConfirm : function (config) {
		var me = this;
		var param = {
			tid : config.tid,
			dcnf_name : config.dcnf_name
		};
		
		if(config.maskConfig) {
			var maskConfig = {
	 	    	title: '잠시만 기다려 주십시오.',
	 	    	width: 300,
	 	    	wait : true,
	            waitConfig : {
	            	interval: 500,
	                duration : 10000,
	                increment : 25,
	                text : '거절확인중...',
	                scope : this,
	            },
	 	    	closable: false,
	     	};
			Ext.apply(maskConfig, config.maskConfig);
			Ext.MessageBox.show(maskConfig);
		}
			
		Ext.Ajax.request({
			url : config.url,
			timeout : 60000,
			params : {
				param : JSON.stringify(param),
				token : _global.token_id
			},
			success : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(res.success) {
					if(Ext.isFunction(config.success)) {
						config.success(res);
					}
				} else {
					if(Ext.isFunction(config.failure)) {
						config.failure(res);
					}
				}
			},
			failure : function(response, opts) {
				Ext.MessageBox.hide();
				var res = Ext.decode(response.responseText);
				if(Ext.isFunction(config.failure)) {
					config.failure(res);
				}
			}
		});
	},
	
	
	/**
	 * 에스크로 구매확인 (구매자용)
	 * plugin팝업이 뜨면 구매확인 또는 거절을 선택해서 인증한다.
	 */
	escrowConfirm : function (config) {
		// 에스크로 구매확인은 IE전용
		if ( ! Ext.isIE ) {
			Ext.Msg.alert('', "에스크로 구매확인은 IE만 지원 합니다..");
			return false;
		}
		
		// 이니시스의 js는 우리쪽의 http방식에 따라 
		if(window.location.protocol === 'http:') {
			inicisScriptUrl = 'http://plugin.inicis.com/pay60_escrow.js';
		} else {
			inicisScriptUrl = 'https://plugin.inicis.com/pay60_escrow.js';
		}
		Ext.Loader.loadScript({
		    url: inicisScriptUrl,                    // URL of script
		    scope: this,                   // scope of callbacks
		    onLoad: function() {           // callback fn when script is loaded
		    	
		    	var pgDiv = document.getElementById('pgDiv');
		    	if(Ext.isEmpty(pgDiv)) { // pgDiv라는 div가 없을경우만 생성 한다.
		    		pgDiv = document.createElement('div');
		    		pgDiv.setAttribute('id', 'pgDiv');
		    		document.body.appendChild(pgDiv);
		    	}
		    	
		    	SetEnvironment();
		    	pgDiv.innerHTML = (PLUGIN_CLASSID);

		    	var inipayForm = '';
		    	inipayForm+='<form id="inipayForm">';
//		    	inipayForm+='<input type=hidden name=mid value="iniescrow0">';
		    	inipayForm+='<input type=hidden name=tid value="'+ config.tid +'">';
		    	inipayForm+='<input type=hidden name=paymethod value="">';
		    	inipayForm+='<input type=hidden name=encrypted value="">';
		    	inipayForm+='<input type=hidden name=sessionkey value="">';
		    	inipayForm+='<input type=hidden name=version value="5000">';
		    	inipayForm+='<input type=hidden name=clickcontrol value="">';
		    	inipayForm+='<input type=hidden name=acceptmethod value=" ">';
		    	inipayForm+='</form>';
		    	pgDiv.innerHTML = pgDiv.innerHTML + inipayForm;
		    	
		    	var inipayForm = document.getElementById('inipayForm');
		    	inipayForm.clickcontrol.value = 'enable';
		    	
				if (document.INIpay == null || document.INIpay.object == null) {
					Ext.Msg.alert('', "플러그인을 설치 후 다시 시도 하십시오.");
					return false;
				} 

				if (MakePayMessage(inipayForm)) {
					if(config.maskConfig) {
						var maskConfig = {
				 	    	title: '잠시만 기다려 주십시오.',
				 	    	width: 300,
				 	    	wait : true,
				            waitConfig : {
				            	interval: 500,
				                duration : 10000,
				                increment : 25,
				                text : '구매확인중...',
				                scope : this,
				            },
				 	    	closable: false,
				     	};
						Ext.apply(maskConfig, config.maskConfig);
						Ext.MessageBox.show(maskConfig);
					}
					
					var param = {
						tid :         inipayForm.tid.value,
						encrypted :   inipayForm.encrypted.value,
						sessionkey :  inipayForm.sessionkey.value
					};
						
					Ext.Ajax.request({
						url : config.url,
						timeout : 60000,
						params : {
							param : JSON.stringify(param),
							token : _global.token_id
						},
						success : function(response, opts) {
							Ext.MessageBox.hide();
							var res = Ext.decode(response.responseText);
							if(res.success) {
								if(Ext.isFunction(config.success)) {
									config.success(res);
								}
							} else {
								if(Ext.isFunction(config.failure)) {
									config.failure(res);
								}
							}
						},
						failure : function(response, opts) {
							Ext.MessageBox.hide();
							var res = Ext.decode(response.responseText);
							if(Ext.isFunction(config.failure)) {
								config.failure(res);
							}
						}
					}); // end ajax
				} else {
					if(Ext.isFunction(config.failure)) {
						config.failure(res);
					}
				}
		    }, // end onload
		    onError: function() {          // callback fn if load fails 
		    	if(Ext.isFunction(config.failure)) {
					config.failure({});
				}
		    } 
		});
		
	},
	
	
	
	
	
	
	
	
	// 이하 private 메서드...
	secureStart : function (config) {
		var me = this;
		var inicisScriptUrl = '';
		
		// 이니시스의 js는 우리쪽의 http방식에 따라 
		if(window.location.protocol === 'http:') {
			inicisScriptUrl = 'http://plugin.inicis.com/pay61_secuni_cross.js';
		} else {
			inicisScriptUrl = 'https://plugin.inicis.com/pay61_secunissl_cross.js';
		}
		Ext.Loader.loadScript({
		    url: inicisScriptUrl,                    // URL of script
		    scope: this,                   // scope of callbacks
		    onLoad: function() {           // callback fn when script is loaded
		    	
//		    	var pgDiv = document.createElement('div');
//		    	pgDiv.setAttribute('id', 'pgDiv');
//		    	document.body.appendChild(pgDiv);
		    	
		    	var pgDiv = document.getElementById('pgDiv');
		    	if(Ext.isEmpty(pgDiv)) { // pgDiv라는 div가 없을경우만 생성 한다.
		    		pgDiv = document.createElement('div');
		    		pgDiv.setAttribute('id', 'pgDiv');
		    		document.body.appendChild(pgDiv);
		    	}
		    	
				SetEnvironment();
				
				if( ini_IsUseFlash == true ) {
					pgDiv.innerHTML = (INIFLASH_CLASSID);
				} else {
					if( ini_IsMSIE() == false ){
						if( ini_CheckPluginVer() == false ) {
							return false;
						}
					}
					pgDiv.innerHTML = (PLUGIN_CLASSID);
				}
				
				//gopaymethod는 결제수단이다 종류는 아래와같다
				//Card : 카드결제, 카드결제(에스크로)
				//DirectBank : 실시간계좌이체, 실시간계좌이체(에스크로)
				//HPP : 휴대폰결제
				//VBank : 가상계좌이체, 가상계좌이체(에스크로)
				var param = {
					price    : config.price,          // 상품가격
					goodname : config.goodname,       // 품명
					gopaymethod : config.gopaymethod  // 결제수단
				};
				
				Ext.apply(param, config.extraParams);
				
				Ext.Ajax.request({
					url : config.url,
					timeout : 60000,
					params : {
						param : JSON.stringify(param),
						token : _global.token_id
					},
					success : function(response, opts) {
						var res = Ext.decode(response.responseText);
						if(res.success) {
							if(Ext.isFunction(config.success)) {
								config.success(res);
							}
						} else {
							if(Ext.isFunction(config.failure)) {
								config.failure(res);
							}
						}
					},
					failure : function(response, opts) {
						var res = Ext.decode(response.responseText);
						if(Ext.isFunction(config.failure)) {
							config.failure(res);
						}
					}
				});
		
		    }, // end onload
		    onError: function() {          // callback fn if load fails 
		    	if(Ext.isFunction(config.failure)) {
					config.failure({});
				}
//		    	alert('fail');
		    } 
		});
	}, 

	secureResult : function (config) {
		var me = this;
		if(config.pgEncrypt === undefined) {
			Ext.Msg.alert('', 'inipay50암호화 실패.');
			return false;
		}
        // ...
//		    	alert('ok');
    	
    	var pgDiv = document.getElementById("pgDiv");
    	var inipayForm = '';
    	inipayForm+='<form id="inipayForm">';
    	inipayForm+='<input type=hidden name=acceptmethod value="'+ config.pgEncrypt.acceptmethod + '">';
    	inipayForm+='<input type=hidden name=currency value="WON">';
    	
    	// <%--
    	// 플러그인에 의해서 값이 채워지거나, 플러그인이 참조하는 필드들
    	// 삭제/수정 불가
    	// uid 필드에 절대로 임의의 값을 넣지 않도록 하시기 바랍니다.
    	// --%>
    	inipayForm+='<input type=hidden name="ini_encfield" value="'+ config.pgEncrypt.encfield+ '">';
    	inipayForm+='<input type=hidden name="ini_certid" value="'+ config.pgEncrypt.certid+ '">';
    	inipayForm+='<input type=hidden name=quotainterest value="">';
    	inipayForm+='<input type=hidden name=paymethod value="">';
    	inipayForm+='<input type=hidden name=cardcode value="">';
    	inipayForm+='<input type=hidden name=cardquota value="">';
    	inipayForm+='<input type=hidden name=rbankcode value="">';
    	inipayForm+='<input type=hidden name=reqsign value="DONE">';
    	inipayForm+='<input type=hidden name=encrypted value="">';
    	inipayForm+='<input type=hidden name=sessionkey value="">';
    	inipayForm+='<input type=hidden name=uid value="">';
    	inipayForm+='<input type=hidden name=sid value="">';
    	inipayForm+='<input type=hidden name=version value="5000">';
    	inipayForm+='<input type=hidden name=clickcontrol value="">';
    	
    	// <%-- 결제수단 (스크립트에서삽입)--%>
    	inipayForm+='<input type="hidden" name="gopaymethod" id="gopaymethod" value="'+ config.pgEncrypt.gopaymethod+ '" />';
    	
    	// <%-- 품목 정보 --%>
    	inipayForm+='<input type="hidden" name="goodname"   size="20" value="'+ config.pgEncrypt.goodname+ '"/>';
    	
    	// <%-- 구매자정보 --%>
    	inipayForm+='<input type="hidden" name="buyername"  size="20" value="'+ CommonUtils.strDefault(config.buyername,'')+ '"/>';
    	inipayForm+='<input type="hidden" name="buyeremail" size="20" value="'+ CommonUtils.strDefault(config.buyeremail,'')+ '"/>';
    	inipayForm+='<input type="hidden" name="buyertel"   size="20" value="'+ CommonUtils.strDefault(config.buyertel,'')+ '"/>';
    	
    	// <%-- 배송지정보 --%>
    	inipayForm+='<input type="hidden" name="recvname" id="recvname" value="'+ CommonUtils.strDefault(config.recvname,'')+ '" />';
    	inipayForm+='<input type="hidden" name="recvtel" id="recvtel" value="'+   CommonUtils.strDefault(config.recvtel,'')+ '" />';
    	inipayForm+='<input type="hidden" name="recvaddr" id="recvaddr" value="'+ CommonUtils.strDefault(config.recvaddr,'')+ '" />';
    	inipayForm+='<input type="hidden" name="recvpostnum" id="recvpostnum" value="'+ CommonUtils.strDefault(config.recvpostnum,'')+ '" />';
    	inipayForm+='<input type="hidden" name="recvmsg" id="recvmsg" value="'+ CommonUtils.strDefault(config.recvmsg,'')+ '" />';
    	
    	inipayForm+='</form>';
    	pgDiv.innerHTML = pgDiv.innerHTML + inipayForm;
    	
    	var inipayForm = document.getElementById('inipayForm');
    	inipayForm.clickcontrol.value = 'enable';
    	
    	// MakePayMessage()를 호출함으로써 플러그인이 화면에 나타나며, Hidden Field
    	// 에 값들이 채워지게 됩니다. 일반적인 경우, 플러그인은 결제처리를 직접하는 것이
    	// 아니라, 중요한 정보를 암호화 하여 Hidden Field의 값들을 채우고 종료하며,
    	// 다음 페이지인 INIsecureresult.php로 데이터가 포스트 되어 결제 처리됨을 유의하시기 바랍니다.
		if(inipayForm.goodname.value == "") { // 필수항목 체크 (품명, 상품가격, 구매자명, 구매자 이메일주소, 구매자 전화번호)
			Ext.Msg.alert('', "상품명이 빠졌습니다. 필수항목입니다.");
			return false;
		} else if(inipayForm.buyername.value == "") {
			Ext.Msg.alert('', "구매자명이 빠졌습니다. 필수항목입니다.");
			return false;
		} else if(inipayForm.buyeremail.value == "") {
			Ext.Msg.alert('', "구매자 이메일주소가 빠졌습니다. 필수항목입니다.");
			return false;
		} else if(inipayForm.buyertel.value == "") {
			Ext.Msg.alert('', "구매자 전화번호가 빠졌습니다. 필수항목입니다.");
			return false;
		} else if(( navigator.userAgent.indexOf("MSIE") >= 0 || navigator.appName == 'Microsoft Internet Explorer' ) &&  (document.INIpay == null || document.INIpay.object == null) ) { // 플러그인 설치유무 체크
			Ext.Msg.alert('', "\n이니페이 플러그인 128이 설치되지 않았습니다. \n\n안전한 결제를 위하여 이니페이 플러그인 128의 설치가 필요합니다. \n\n다시 설치하시려면 Ctrl + F5키를 누르시거나 메뉴의 [보기/새로고침]을 선택하여 주십시오.");
			return false;
		} else {
			/******
			 * 플러그인이 참조하는 각종 결제옵션을 이곳에서 수행할 수 있습니다.
			 * (자바스크립트를 이용한 동적 옵션처리)
			 */
			if (MakePayMessage(inipayForm)) {
				var param = {
					acceptmethod : inipayForm.acceptmethod.value,
					currency : inipayForm.currency.value,
					ini_encfield : inipayForm.ini_encfield.value,
					ini_certid : inipayForm.ini_certid.value,
					quotainterest : inipayForm.quotainterest.value,
					paymethod : inipayForm.paymethod.value,
					cardcode : inipayForm.cardcode.value,
					cardquota: inipayForm.cardquota.value,
					rbankcode: inipayForm.rbankcode.value,
					reqsign: inipayForm.reqsign.value,
					encrypted : inipayForm.encrypted.value,
					sessionkey : inipayForm.sessionkey.value,
					uid : inipayForm.uid.value,
					sid : inipayForm.sid.value,
					version : inipayForm.version.value,
					goodname : inipayForm.goodname.value,
					
					buyername : inipayForm.buyername.value,
					buyeremail : inipayForm.buyeremail.value,
					buyertel : inipayForm.buyertel.value,
					recvname : inipayForm.recvname.value,
					recvtel : inipayForm.recvtel.value,
					recvaddr : inipayForm.recvaddr.value,
					recvpostnum : inipayForm.recvpostnum.value,
					recvmsg : inipayForm.recvmsg.value,
					
					price : config.price
				};
				
				if(config.maskConfig) {
					var maskConfig = {
			 	    	title: '잠시만 기다려 주십시오.',
			 	    	width: 300,
			 	    	wait : true,
			            waitConfig : {
			            	interval: 500,
			                duration : 10000,
			                increment : 25,
			                text : '결제중...',
			                scope : this,
			            },
			 	    	closable: false,
			     	};
					Ext.apply(maskConfig, config.maskConfig);
					Ext.MessageBox.show(maskConfig);
				}
				
				Ext.Ajax.request({
					url : config.url,
					timeout : 60000,
					params : {
						param : JSON.stringify(param),
						token : _global.token_id
					},
					success : function(response, opts) {
						Ext.MessageBox.hide();
						var res = Ext.decode(response.responseText);
						if(res.success) {
							if(Ext.isFunction(config.success)) {
								config.success(res);
							}
						} else {
							if(Ext.isFunction(config.failure)) {
								config.failure(res);
							}
						}
					},
					failure : function(response, opts) {
						Ext.MessageBox.hide();
						var res = Ext.decode(response.responseText);
						if(Ext.isFunction(config.failure)) {
							config.failure(res);
						}
					}
				});
				
//		    	disable_click();
				// openwin = window.open("childwin.html","childwin","width=299,height=149");		
//				return true;
			} else {
				if(Ext.isFunction(config.failure)) {
					config.failure({});
				}
//		     	if(IsPluginModule()) {
//		     	    alert("결제를 취소하셨습니다.");
//		     	}
//				return false;
			}
		}
		return false;
	} 
    
});


