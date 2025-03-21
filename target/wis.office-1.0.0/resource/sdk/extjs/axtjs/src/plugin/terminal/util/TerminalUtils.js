/**
 * 단말기 결제, 프린트시 필수적으로 필요한 상수, 메서드
 */
Ext.define('Axt.plugin.terminal.util.TerminalUtils', {
	alternateClassName: 'TerminalUtils',
	singleton: true,
	requires : [
	    'Axt.plugin.terminal.telegram.KIS'
	],
	
	/**
	 * @private 통신전문 객체
	 */
	TELEGRAM : {
		KIS : null,
		NICE : null
	},
	
	/**
	 * 서비스코드<br/>
	 * 바로 사용하지 않고 이 클래스의 getServiceCode()를 활용한다.
	 */
    SERVICE_CODE : {
    	KIS : {
    		CREDIT_APPROVAL         : 'D1',     /* 신용카드 승인 */
            CREDIT_CANCEL           : 'D2',     /* 신용카드 취소 */
            TAX_POINT_APPROVAL      : 'CC',     /* 현금영수증 승인 */
            TAX_POINT_CANCEL        : 'CR',     /* 현금영수증 취소 */
            OKCASHBAG_CHECK         : 'MQ',     /* OK캐시백 조회 (멤버쉽 잔액조회) */
            OKCASHBAG_USE_APPROVAL  : 'MC',     /* OK캐시백 사용 (사용승인) */
            OKCASHBAG_USE_CANCEL    : 'MD'      /* OK캐시백 조회 (멤버쉽 잔액조회) */
    	},
    	NICE : {
    		CREDIT_APPROVAL  			: 'D1',  /* 신용카드 승인 */
    		CREDIT_CANCEL    			: 'D2',  /* 신용카드 취소 */
    		TAX_POINT_APPROVAL			: 'D3',  /* 현금영수증 승인 */
    		TAX_POINT_CANCEL  			: 'D4',  /* 현금영수증 취소 */
    		STATUS_CHECK				: 'D5',  /* 연결상태체크 */
    		OKCASHBAG_SAVING			: 'B1',  /* 보너스적립 */
    		OKCASHBAG_SAVING_CANCEL		: 'B2',  /* 적립취소 */
    		OKCASHBAG_USE				: 'B3',  /* 보너스사용(OCB결제) */
    		OKCASHBAG_USE_CANCEL		: 'B4',  /* 사용취소  (OCB결제취소) */
    		OKCASHBAG_DISCOUNT			: 'B5',  /* 보너스할인 */
    		OKCASHBAG_DISCOUNT_CANCEL 	: 'B6',  /* 할인취소 */
    		OKCASHBAG_CHECK				: 'B7',  /* 보너스조회 */
    		SKT_DISCOUNT_APPROVAL		: 'C1',  /* SKT할인승인 */
    		SKT_DISCOUNT_CANCEL			: 'C2',  /* SKT할인취소 */
    		KTF_DISCOUNT_APPROVAL		: 'C3',  /* ktf할인승인 */
    		KTF_DISCOUNT_CANCEL			: 'C4',  /* ktf할인취소 */
    		LGT_DISCOUNT_APPROVAL		: 'C5',  /* lgt할인승인 */
    		LGT_DISCOUNT_CANCEL			: 'C6',  /* lgt할인취소 */
    		SIGN_DATA_REQ				: 'SC',  /* PC-> CAT SIGN DATA REQUEST */
    		MSR							: 'MS'	 /* MSR (카드단말기로 카드리딩하는 요청 밴사를 통한 결제가 아니고 카드 정보만을 받기) */
    	}
    },
    
    /**
     * wcc type<br/>
     * 바로 사용하기 보다는 이 클래스의 getWccType()를 활용 한다.
     */
    WCC_TYPE : {
        SWIPE : 'A',    /* 카드 swipe */
        KEYIN : '@'     /* key in */
    },
    
	/**
	 * 단말기 명령어 
	 */
	COMMAND : {
        CUTTING : [0x1B, 0x69],                       // 용지 컷팅 명령어
        OPEN_CASHBOX : [0x1b, 0x70, 0x30, 0x28, 0x3c] // 금전함 열기 명령어
    },
    
    /**
     * @private
     * 입력정보에 마스크 씌울때 필요한 정규식
     */
    MASK_REG_EXP : {
        MASK_CREDITCARD_PATTERN   : /(\d{4})(-?)(\d{4})(-?)(\d{4})(-?)(\d{4})/,
        MASK_MOBILE_PHONE_PATTERN : /(\d{3})(-?)(\d{3,4})(-?)(\d{4})/,
        MASK_SSNO_PATTERN         : /(\d{6})(-?)(\d{7})/,
        MASK_DEFAULT_STRING       : "*"
    },
    
    /**
     * 서비스코드 리턴
     * 
     * @param {String} vanName van사명 (kis, nice)
     */
    getServiceCode : function (vanName) {
    	var me = this;
    	if(!vanName) {
    		vanName = '';
    	}
    	
    	var serviceCode = me.SERVICE_CODE[vanName.toUpperCase()];
    	if(!serviceCode) {
    		Ext.Msg.alert('', '조회된 서비스코드가 없습니다.');
    		return;
    	}
    	
    	return serviceCode;
    },
    
    /**
     * 통신전문 객체 리턴
     * 
     * @param {String} vanName van사명 (kis, nice)
     */
    getTelegram : function (vanName) {
    	var me = this;
    	if(!vanName) {
    		vanName = '';
    	}
    	var telegram = me.TELEGRAM[vanName.toUpperCase()];
		if(vanName === 'kis') {
			if(!telegram) {
				Logger.debug('kis 통신전문 최초생성');
				telegram = Ext.create('Axt.plugin.terminal.telegram.KIS');
				me.TELEGRAM[vanName.toUpperCase()] = telegram;
			} 
			Logger.debug('kis 통신전문 반환');
			return telegram;
		} else if (vanName === 'nice') {
			
		} else {
			Ext.Msg.alert('', '조회된 통신전문 객체가 없습니다.');
		}
    },
    
    /**
     * @private 결제시 입력된 카드번호or휴대폰번호로 Swipe인지 Keyin인지 (wcc type)를 리턴
     * @param {} value
     * @return {}
     */
    getWccType : function(vanName, value){
        var me = this;
        var swipe = me.WCC_TYPE.SWIPE;
        var keyin = me.WCC_TYPE.KEYIN;
        if(Ext.isEmpty(value)) {
        	value = '';
        }
        
        if(CommonUtils.isCreditCard(value)){	/* 신용카드 */
            return swipe;
        } else if(CommonUtils.isSsno(value)){  /* 주민번호 */
            return keyin;
        } else if(CommonUtils.isMobile(value)){ /* 휴대전화 */
            return keyin;
        } else if(Ext.isEmpty(value)){			/* 비어있을때 */
            return swipe;
        } else {
            return swipe;
        }
    },
    
	/**
	 * 폰트 크기조정<br/>
	 * 프린터의 특성때문에 아래의 폰트 사이즈중 안먹히는 옵션이 있을 수 있다.
	 * 
	 *     // 아래와같이 '폰트크기01' 문자열 좌우로 fontSize, fontClear를 사용하여 글자 크기를 키운다.
	 *     // fontClear를 사용한 이후의 문자열은 다시 일반 크기의 문자열이 된다.
	 *     var text = TerminalUtils.fontSize('01') + '폰트크기01' + TerminalUtils.fontClear() + '다시 일반 글자 크기';
	 *     TerminalPlugin.print({
	 *	       params : { 
	 *		       host:'203.229.190.20', 
	 *			   port:5000, 
	 *			   msg:[text],
	 *			   gap:5	                       // 숫자만큼 메시지 끝에 개행추가 
	 *         },
	 *	       callback : function(success) {
	 *
	 *	       }
	 *     });     
	 * 
	 * @param {String} size
	 * '00' 일반크기<br/>
	 * '01' 상하2배<br/>
	 * '10' 좌우2배<br/>
	 * '11' 상하좌우 2배<br/>
	 * ~<br/>
	 * ~<br/>
	 * '77' 상하좌우 8배
	 */
	fontSize:function(size){
		var command = [0x1D, 0x21, eval('0x'+size)]; /* 앞의 2byte는 고정이고 3번째 바이트가 폰트 크기를 결정 */
		var temp = '';
        for(var i=0; i<command.length; i++) {
        	temp += String.fromCharCode(command[i]);
        }
        return temp;
	},

	/**
	 * 폰트 크기 조정된것 초기화<br/>
	 * fontSize가 사용된후에 fontClear를 해줘야 다음 글자부터는 다시 일반 크기로 돌아온다.
	 * 
	 * @return {String} fontClear 폰트클리어 특수문자
	 */
	fontClear:function(){
		var command = [0x1D, 0x21, 0x00]; /* 원래 매뉴얼상에는 [0x1D, 0x21, 0x00]으로 해야하지만 위의 설명과같은 문제 때문에 이렇게 바꿈 */
		var temp = '';
        for(var i=0; i<command.length; i++) {
        	temp += String.fromCharCode(command[i]);
        }
        return temp;
	},
	
    /**
     * 우측 공백처리
     * 
     *     TerminalUtils.rightPad('안녕하세요', 20); => '안녕하세요          '
     * 
     * @param {String} value 문자열 
     * @param {Number} limitSpace  문자열+공백포함 byte길이
     */
    rightPad:function (value, limitSpace) {
        var result = value==null?'':value+'';
        var valueLength = CommonUtils.getByteLength(result);
        if(limitSpace>valueLength) {
            for(var i=0; i<(limitSpace-valueLength); i++) {
                result = result + ' ';
            }
            return result;
        } else {
            var byteTotal = 0;
            var temp = '';
            for(var i=0; i<result.length; i++) {
                var byteLength = CommonUtils.getByteLength(result.charAt(i));
                    byteTotal+=byteLength;
                if(byteTotal>limitSpace) {
                    break;
                } else {
                    temp += result.charAt(i);
                }
            }
            return temp;
        }
    },
    
    /**
     * 좌측 공백처리
     * 
     *     TerminalUtils.leftPad('안녕하세요', 20); => '          안녕하세요'
     *     
     * @param {String} value 문자열 
     * @param {Number} limitSpace  문자열+공백포함 byte길이
     */
    leftPad:function (value, limitSpace) {
        var result = value==null?'':value+'';
        var valueLength = CommonUtils.getByteLength(result);
        if(limitSpace>valueLength) {
            for(var i=0; i<(limitSpace-valueLength); i++) {
                result = ' ' + result;
            }
            return result;
        } else {
            var byteTotal = 0;
            var temp = '';
            for(var i=0; i<result.length; i++) {
                var byteLength = CommonUtils.getByteLength(result.charAt(i));
                    byteTotal+=byteLength;
                if(byteTotal>limitSpace) {
                    break;
                } else {
                    temp += result.charAt(i);
                }
            }
            return temp;
        }
    },
    
	/**
	 *  프린트시에 신용카드, 주민번호, 핸드폰에 1111****2222와같은 마스크 씌우기</br>
	 *  자동적으로 자동적으로 입력된 타입을 정규식으로 판단하여 아래와같이 마스크를 씌워준다.
	 * 
     *     TerminalUtils.replaceMask('010-4368-2050', 'x');        => 010-xxxx-2050 
     *     TerminalUtils.replaceMask('4444-5555-6666-7777', '*');  => 4444-5555-****-7777 
     *     TerminalUtils.replaceMask('840701-1234567');            => 840701-*******
     *      
	 * @param {String} value 전화번호 or 신용카드번호 or 주민번호
	 * @param {String} mask  마스크씌울 문자 ( default => * )
	 * @return {String} result 결과 문자열
	 */
	replaceMask : function (value, mask) {
		var me = this;
		var regExp = me.MASK_REG_EXP;
		if(!mask) {
			mask = regExp.MASK_DEFAULT_STRING;
		}
		var result = '';
		if(regExp.MASK_CREDITCARD_PATTERN.test(value)) { // 신용카드 일치
			value.replace(regExp.MASK_CREDITCARD_PATTERN, function(match, g1, g2, g3, g4, g5, g6, g7){
				result = g1 + g2 + g3 + g4 + g5.replace(/./g, mask) + g6 +g7;
			});
		} else if(regExp.MASK_SSNO_PATTERN.test(value)) { // 주민번호 일치
			value.replace(regExp.MASK_SSNO_PATTERN, function(match, g1, g2, g3){
				result = g1 + g2 + g3.replace(/./g, mask);
			});
		} else if(regExp.MASK_MOBILE_PHONE_PATTERN.test(value)){ // 핸드폰번호 일치
			value.replace(regExp.MASK_MOBILE_PHONE_PATTERN, function(match, g1, g2, g3, g4, g5){
				result = g1 + g2 + g3.replace(/./g, mask) + g4 + g5;
			});
		} else {
			result = value;
		}

		return result;
	}
});