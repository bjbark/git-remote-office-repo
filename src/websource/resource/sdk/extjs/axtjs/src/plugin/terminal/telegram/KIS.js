
var STX				    = 0x02;
var ETX				    = 0x03;
var EOT				    = 0x04;
var ENQ				    = 0x05;
var ACK				    = 0x06;
var LF					= 0x0a;
var NAK				    = 0x15;
var ESC				    = 0x1B;
var DLE				    = 0x10;
var FS				    = 0x1C;
var CR					= 0x0D;
var UPCHK				= 0xfd;
var UPLOAD				= 0xfe;
var SPACE				= 0X20;
var PINBLOCK_DEFAULT    = [SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE,SPACE];

var request = null;

/**
 * @private
 * KIS정보통신과의 카드단말기 통신전문 클래스<br/>
 * createRequest(요청전문 생성), parseResponse(단말기 승인후 json객체로 변환해서 리턴)<br/>
 * 위 2개 메서드는 필수적으로 필요한 메서드이다.<br/>
 * 만약 다른 van사의 통신전문 클래스를 개발해야 한다면 createRequest, parseResponse는<br/>
 * 반드시 구현해야하고 나머지 private 메서드들은 상황에 맞게 알아서 개발하면 된다.
 */
Ext.define('Axt.plugin.terminal.telegram.KIS', {
	extend:'Axt.plugin.terminal.telegram.BaseTelegram',
	requires:[
	],
	
	/**
	 * 거래개시 요청 전문 생성<br/>
	 * config에 넘어오는 설정정보는 현금영수증 승인 취소 등의 VAN사 연동 정보와 같으므로<br/>
	 * TerminalPlugin.js의 connectVan메서드 호출시 전달되는 파라미터인 params를 참고한다.
	 * 
     * @param {Object} config 설정
	 */
	createRequest : function(config){
		var me = this;
        var request = me.createCommonRequest(config);
	    return request;
	},
	
	/**
	 * 단말기 승인후 받은 메시지를 유효성 체크해서 json객체 리턴
	 * 
	 * @param {Object} response '2,50,51,52,53~... 3' 과같이 10진수 숫자가 comma로 구분되어서 넘어온다.<br/>
	 * van사별로 ETX뒤에 LRC가 올수도있고 안올수도 있는등의 다른부분은 개발할때 대처해야 한다. 
	 */
	parseResponse : function (response) {
		var me = this;
	    var responseObject = me.parseCommonResponse(response);
	    return responseObject;
	},
	
	
	
	
	
	
	/////////////////////////////// 이하 private method //////////////////////////////////////
	/**
	 * @private 체크섬
	 */
	checksum : function(arr){
		var sum = (arr[1]);
		for(var i=2;i<arr.length;i++){
			sum ^= (arr[i]);
		}
		
		return (sum | 0x20);
	},

	/**
	 * @private 요청전문 만들때 사용하며 2byte이상의 데이터를 request배열에 담을때 사용함
	 * @param {} requestArray
	 * @param {} data
	 */
	setData : function(requestArray, data) {
	    if(Ext.isArray(data)) {
	        request = requestArray.concat(data); /* concat은 둘이상의 배열을 결합 */
	    } else if (data === 0 || data) {
	        var unicodeArray = CommonUtils.stringToUnicodeArray(data);
	        request = requestArray.concat(unicodeArray); /* concat은 둘이상의 배열을 결합 */
	    }
	},

	/**
	 * @private 통신 요청전문 생성
	 */
	createCommonRequest : function (option) {
		var me = this;
	    request = [];
	    request.push(STX);                                  /* STX */
	    
	    me.setData(request, [0xcf, 0x20]);                     /* 거래요청전문표시( 고정 수정하면 안됨 이전버전인 0xBF와 구분됨) */     
	    me.setData(request, option.serviceCode);               /* 거래종코드 */
	    request.push(FS);                                   /* FS */
	    
	    me.setData(request, '');                               /* 단말기번호(직불카드인 경우 "040000" + 단말기번호 + "00") */
	    request.push(FS);                                   /* FS */
	    
	    me.setData(request, TerminalUtils.getWccType('kis', option.card)); /* wcc(swipe :A, keyin : @) */
	    me.setData(request, option.card);             			/* 신용카드 번호 */
	    request.push(FS);                                  /* FS */
	    
	    me.setData(request, option.month);         			/* 할부개월 (현금영수증일떄는 (01법인, 02개인)) */
	    request.push(FS);                                   /* FS */
	   
	    me.setData(request, option.amount);            		/* 결제 요청 금액 */
	    request.push(FS);                                   /* FS */
	   
	    me.setData(request, '');                               /* 세금 */
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 봉사료 */
	    request.push(FS);                                   /* FS */

	    me.setData(request, option.approvalDate);             /* 취소시에만 ! (원거래일자 'YYYYMMDD') */
	    request.push(FS);                                   /* FS */

	    me.setData(request, option.approvalNo);               /* 취소시에만! (원거래 승인번호 신용은 8자리, 직불은 12자리)*/
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 거래 일련번호 (단말기 번호가 상이한 경우만 set) */
	    request.push(FS);                                   /* FS */

	    me.setData(request, '1');                              /* 포인트사용 거래구분코드 (1:대금지불, 2:사은품지급), 포인트적립지불수단(1:현금, 2:신용) */
	    request.push(FS);                                   /* FS */

	    me.setData(request, PINBLOCK_DEFAULT);                 /* Pin Block (index2자리+pin block 16자리), 포인트 사용시에는 비밀번호 4자리 text */       
	    request.push(FS);                                   /* FS */

	    me.setData(request, TerminalUtils.getWccType('kis', option.wccPointCard));             /* 포인트카드에대한 wcc */
	    me.setData(request, option.pointCard);    				/* 포인트카드 정보 track2 */
	    request.push(FS);                                   /* FS */

	    me.setData(request, option.approvalDatePointCard);     /* 포인트 취소시 원승인 번호 */
	    request.push(FS);                                   /* FS */
	   
	    me.setData(request, '');                               /* 사업자번호 (단말기번호가 상이한 경우만 셋)*/
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 대표자명 (단말기번호가 상이한 경우만 셋) */
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 가맹점명 (단말기번호가 상이한 경우만 셋) */
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 가맹점주소 (단말기번호가 상이한 경우만 셋)*/
	    request.push(FS);                                   /* FS */

	    me.setData(request, '');                               /* 가맹점전화번호 (단말기번호가 상이한 경우만 셋) */
	    request.push(FS);                                   /* FS */

	    me.setData(request, 'N');                              /* 매출전표출력여부 */
	    request.push(ETX);                                  /* ETX */

	    request.push(me.checksum(request));                    /* LRC삽입 */
	   
	    return request;
	},

	/**
	 *  @private 통신 응답전문 분석
	 */
	parseCommonResponse : function (response) {
		var me = this;
	    /* '2,3,4,5' 와같이 문자열로 오므로 ,로 split한다. */
	    var responseArray = response.split(',');
	    var LRC = responseArray[responseArray.length-1]; /* 가장끝에 ETX뒤에 LRC코드가 붙어서 온다 */
	    
	    responseArray = responseArray.slice(0, responseArray.length-1); /* LRC부분 제거 */
	        
	    var calcLRC = me.checksum(responseArray);         //LRC를 제외한 코드들로 LRC를 만들기 (밑에서 비교하기 위해)     
	    
	    if(calcLRC !== Number(LRC)) {                             //응답받은 LRC와 응답전문을 파싱해서 만든 LRC가 같아야 통과
	        return {message : '응답받은 LRC와 응답전문을 파싱해서 만든 LRC가 달라서 오류이므로 개발자 확인 바랍니다.'};
	    }
	    var msgArr = me.getParse(responseArray);
	    var returnObject = {
	           serviceCode             : msgArr[2],                        /* 거래종류코드 */
	           terminalNo              : msgArr[4],                        /* 단말기 번호 */
	           wcc                      : msgArr[6],                        /* wcc (swipe:A, keyin:@) */
	           approvalCard            : msgArr[8].replace(/=.*/,''),      /* track-2(카드번호+'='+유효기간) */
	           approvalPaymonth        : msgArr[10],                       /* 할부개월 (현금영수증일떄는 (01법인, 02개인)) */
	           approvalAmount          : Number(msgArr[12]),               /* 합계금액 */
	           approvalSurtax          : Number(msgArr[14]),               /* 부가세 */
	           approvalServiceCharge  : Number(msgArr[16]),               /* 봉사료 */
	           approvalNo              : msgArr[18],                       /* 승인번호 */
	           approvalDy              : msgArr[20],                       /* 거래일자 Yymmddhhmmss 12자리 */
	           approvalDateOrg        : msgArr[22],                       /* 원거래일자/세금 yyyymmdd  */
	           approvalNoOrg          : msgArr[24],                       /* 원거래승인번호/봉사료 (신용8자리, 직불 12자리, 거절시 공란) */
	           purchaseCode            : msgArr[26],                       /* 매입사코드 */
	           purchaseName            : msgArr[28],                       /* 매입카드사명 */
	           issuebinCode            : msgArr[30],                       /* 발급사코드 */
	           issuebinName            : msgArr[32],                       /* 발급카드사명 */
	           approvalShop            : msgArr[34],                       /* 가맹점번호 */
	           dealNo                  : msgArr[36],                       /* 거래일련번호 */
	           pointCardInfo          : msgArr[38].replace(/=.*/,''),     /* 포인트 카드정보 */
	           pointApprovalNo        : msgArr[40],                       /* 포인트 승인번호 */
	           pointIssuebinCode      : msgArr[42],                       /* 포인트 발급사코드 */
	           pointIssuebinName      : msgArr[44],                       /* 포인트 발급사명 */
	           pointShopNo            : msgArr[46],                       /* 포인트 가맹점번호 */
	           pointDcAfterAmount    : Number(msgArr[48]),               /* 할인 후 금액 */
	           pointOccur              : Number(msgArr[50]),               /* 발생 포인트 */
	           pointUsePossible       : Number(msgArr[52]),               /* 가용 포인트 */
	           pointAccumulate         : msgArr[54]===undefined?0:Number(msgArr[54]) /* 누적포인트  (130430일 현재 누적포인트는 정보가 아예 안오는것으로 확인)*/
	    };
	    
	    /* 12자리의 거래일자가 단말기로부터 넘어오는데 우리측 db에 저장할때는 아래와같이 변형해서 저장한다. */
	    var approvalDy = returnObject.approval_dy;
	    if( ! Ext.isEmpty(approvalDy)) {
	        var approval_date     = approvalDy.substring(0,2)+'-'+approvalDy.substring(2,4)+'-'+approvalDy.substring(4,6);
	        var approval_time     = approvalDy.substring(6,8)+':'+approvalDy.substring(8,10)+':'+approvalDy.substring(10,12);
	        returnObject.approvalDate = approval_date;
	        returnObject.approvalTime = approval_time;
	    }
	    
	    returnObject.success = true;
	    
	    return returnObject;
	},

	/**
	 * @private 응답전문 분석
	 *
	 * @param {} responseArr - [2,68,49,28 ~ ,28,3] 이와같은 응답배열이 애플릿에서 넘어온다
	 * 이 메서드는 for문을 돌면서 stx와 fs사이 또는 fs와 fs사이의 데이터내용 한묶음을 모아서 euckr디코딩 한다.
	 * 예를들어 responseArr파라미터에 [2,49,48,48,52,3]이란 값이 온다면 getParse()를 실행후 리턴되는 배열은 ['','1004', ''] 이렇게
	 * 되고 getParse를 호출한 곳에서는 통신전문 매뉴얼을보고 몇번째에 어떤 데이터가 있는지 확인하여 꺼내 쓰게 된다.
	 * @return {}
	 */
	getParse : function(responseArr) {
	    var stx = STX;
	    var etx = ETX;
	    var fs  = FS;
	    var eot = EOT;

	    var resultArr = []; /* 응답전문배열을 사용자가 알아볼수있는 문자로 디코딩하여 return할 최종 결과 배열 */
	    var temp = [];      /* FS와 FS사이 또는 STX와FS사이의 데이터들을 임시로 모아 놨다가(이데이터들이 한묶음이기 때문) EucKrUtil 클래스를 이용해서 디코딩 한다. */
	    for (var i = 0, length = responseArr.length; i < length; i = i + 1) {
	        var value = Number(responseArr[i]);
	        
	        if (value === stx || value === etx || value === fs) {
	            /* STX, ETX, FS는 실제 꺼내쓸 데이터는 아니지만 통신전문상의
	             * 내용 번호(no)와 맞추기위해 빈 데이터를 넣는다.
	             * 만약 이곳에 빈 문자열이라도 안넣게 되면 통신전문상의 내용번호와 맞지 않으므로
	             * 개발시 헷갈릴수 있다. */
	            resultArr.push('');
	        } else if( (value === 175 && i===1) || (value === 48 && i===2) ){
	        } else {
	            /* STX, ETX, FS가 아닌 실제 꺼내써야하는 응답 내용들을 EucKrUtil을 통해
	             * 디코딩 하기 전에 임시로 temp배열에 넣어둔다.
	             * STX와 FS사이 또는 FS 와 FS사이의 byte데이터들이 한묶음 이므로 모았다가
	             * 한번에 EucKrUtil.convert()메서드로 디코딩 해야 한다. */
	            temp.push(value);
	        }

	        if (value === fs) {
	            /* for문 반복하면서 현재값이 fs라면 fs바로전의 데이터들을(temp배열에 모아뒀던것)
	             * 디코딩해서 return할 결과배열(resultArr)에 push한다. */
	            var resultData = EucKrUtil.convert(temp);
	            resultArr.push(resultData);
	            temp = []; /* 다음번 디코딩을 위해 temp를 초기화 */
	        }
	    }

	    return resultArr;
	}
	
});