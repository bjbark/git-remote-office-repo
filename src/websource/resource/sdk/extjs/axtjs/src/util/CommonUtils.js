/**
 * 공통 함수 정의
 *
 */
Ext.define('Axt.util.CommonUtils', {

	alternateClassName: ['Utils', 'CommonUtils'],

	singleton: true,

	/**
	 * 레코드 또는 레코드 배열을 받아서, 첫번째 레코드값을 리턴한다.
	 */
	firstRecord : function ( records ) {
		if (records instanceof Array ) {
			if (records[0] ){
				return records[0];
			}
		} else {
			return records;
		}
	},


	/**
	 * form의 filfield를 체크 해 값의 존재 여부를 확인
	 *
	 * @param {Ext.form.Basic}
	 *            form
	 * @return {Boolean} form의 filfield 값 존재 여부
	 */
	hasUpload: function(form) {

		var upload = false;

		var owner = form.owner;
		if (!owner.isXType('form')) { return upload; }

		if (!form.hasUpload()) { return upload; }

		var filefields = owner.query('filefield');
		for ( var index in filefields) {
			var value = filefields[index].getValue();
			if (!Ext.isEmpty(value)) {
				upload = true;
				break;
			}
		}

		return upload;
	},

	/**
	 * columns, colspan 설정에 따라 field container 를 설정/추가 한다.
	 *
	 * @param {}
	 *            items subclass items
	 * @return {} field container가 추가 된 items
	 * @private
	 */
	/**
	 * @private 신용카드 정규식
     */
    REGEX_CREDIT_CARD : [
        /^(3[47]\d{13})$/,                                          /* 아메리칸 엑스프레스 */
        /^(5[1-5]\d{14})$/,                                         /* 마스터 카드 */
        /^(4\d{12}(\d{3})?)$/,                                      /* 비자 카드 */
        /^(62[4-6]\d{13})|(628[2-8]\d{12})$/,           			/* 중국은련카드 */
        /^(30[0-5]\d{11})|(3095\d{10})|(36\d{12})|(3[8-9]\d{12})$/, /* 다이너스 클럽 */
        /^(60110\d{11})|(6011[2-4]\d{11})|(60117[4-9]\d{10})|(60118[6-9]\d{10})|(60119[0-9]\d{10})|(64[4-9]\d{13})|(65\d{14})$/,                /* 디스커버 카드 */
        /^((3528|3529|35[3-8][0-9])\d{12})$/,                       /* JCB카드 */
        /^(9\d{15})$/                                               /* 국내전용 */
    ],

    /**
     * @private 주민번호 정규식
     */
    REGEX_SSNO : /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))(-?)[1-4][0-9]{6}$/,

    /**
     * @private 핸드폰번호 정규식
     */
    REGEX_MOBILE : /(\d{3})(-?)(\d{3,4})(-?)(\d{4})/,

	/**
     * 문자열을 유니코드 배열로 리턴
     *
     *     CommonUtils.stringToUnicodeArray('공통유틸'); // [44277, 53685, 50976, 54008]
     *
     * @param {} value 문자열
     * @return {Array} unicodeArray 유니코드 배열
     */
    stringToUnicodeArray : function (value_) {
        var value = value_ + '';
        var temp = [];
        for(var i=0; i<value.length; i++) {
            temp.push(value.charAt(i).charCodeAt(0)); /* 문자를 유니코드로 변환 */
        }
        return temp;
    },

	/**
	 * JSON객체 -> JSON문자열 변환<br/>
	 * 기존의 Ext.encode로 사용시에 한글이 유니코드화되어 표시되었는데 이점을 해결했다.
	 *
	 *     CommonUtils.jsonEncode({ xtype:"button", text:"버튼" }); // '{ xtype:"button", text:"버튼" }'
	 *
	 * @param {String} jsonObject json객체
	 * @return {String} jsonString
	 */
	jsonEncode : function (jsonObject) {
		/* json에 한글이 unicode로 표시되는것을 다시 순수 한글로 replace해준다. */
		return Ext.encode(jsonObject).replace(/\\u([a-z0-9]{4})/g, function($0,$1){return unescape('%u'+$1);});
	},

	/**
	 * JSON문자열 -> JSON객체 변환
	 *
	 *     CommonUtils.jsonDecode('{ xtype:"button", text:"버튼" }'); // { xtype:"button", text:"버튼" }
	 *
	 * @param {String} jsonString json형식의 문자열
	 * @return {String} jsonObject
	 */
	jsonDecode : function (jsonString) {
		return Ext.decode(jsonString);
	},

	/**
	 * 신용카드인가 검사<br/>
	 *
	 *     카드 번호의 구성(위키) - http://ko.wikipedia.org/wiki/%EC%B9%B4%EB%93%9C_%EB%B2%88%ED%98%B8%EC%9D%98_%EA%B5%AC%EC%84%B1
	 *     신용카드번호 규칙 - http://blog.naver.com/PostView.nhn?blogId=shuiky&logNo=10045324570
	 *     신용카드에 숨겨진 숫자의 비밀 - http://finance.hyundaicardcapital.com/241
	 *     마스터, 비자, 마에스트로, cirrus - http://blog.naver.com/PostThumbnailView.nhn?blogId=betwin22&logNo=120115863389&categoryNo=&parentCategoryNo=9
	 *
	 *     - 아메리칸 엑스프레스	34, 37	(15자리)
	 *     - 비자카드	4	(16자리)
	 *     - 마스타카드	51~55	(16자리)
	 *     - 중국은련카드	622126-622925, 624-626, 6282-6288	(16자리)
	 *     - 다이너스 클럽	300-305, 3095, 36, 38-39	(14자리)
	 *     - 디스커버 카드	60110, 60112-60114, 601174-601179, 601186-601199, 644-649, 65	(16자리)
	 *     - JCB카드	3528-3589 (16자리)
	 *
	 *     CommonUtils.isCreditCard('4444555566667777'); // true
	 *
	 * @param {String} cardNo 카드번호 문자열
	 * @return {Boolean} result
	 */
	isCreditCard : function (cardNo) {
		var me = this;
		var result = false;
		for(var i=0, size=me.REGEX_CREDIT_CARD.length; i<size; i++) {
			var regex = me.REGEX_CREDIT_CARD[i];
			if (regex.test(cardNo)) {
				result = true;
				break;
			} else if(cardNo.length === 16){
				/* 중국 은련카드의 경우 622126-622925범위를 표현하기 힘들어서 이부분만 별도 처리 */
				var cardNoFrontSix = Number(cardNo.substring(0, 6));
				if(cardNoFrontSix >= 622126 && cardNoFrontSix <= 622925 ) {
					result = true;
					break;
				}
			}
		}
		return result;
	},

	/**
	 * 주민번호 체크
	 *
	 *     CommonUtils.isSsno('8407011000113'); // true
	 *
	 * @param {String} ssno 주민번호 문자열
	 * @return {Boolean} result
	 */
	isSsno : function (value) {
		var me = this;
		var ssnoPattern        = me.REGEX_SSNO;
		if(ssnoPattern.test(value)){
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 핸드폰번호 체크
	 *
	 *     CommonUtils.isMobile('01012345678'); // true
	 *
	 * @param {String} value 핸드폰번호 문자열
	 * @return {Boolean} result
	 */
	isMobile : function (value) {
		var me = this;
		var mobilePhonePattern = me.REGEX_MOBILE;
		if(mobilePhonePattern.test(value)){
			return true;
		} else {
			return false;
		}
	},

	/**
	 * 숫자에 천단위로 콤마 추가 (숫자, 콤마, . 허용)
	 *
	 *     CommonUtils.addComma('1000500.005'); // '1,000,500.005'
	 *
	 * @param {Number} value 숫자 또는 숫자 문자열
	 * @return {String} value
	 */
	addComma : function( n ) {
		if(n===undefined || n===null) {
			return '';
		}
        n = n+'';
        if ( n >= 0 ){ /* 0보다 크거나 같을때 */
        	n = n.replace(/[^\d.]/gi,'');
        	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
        	n += '';                          // 숫자를 문자열로 변환
        	while ( reg.test(n) )
        		n = n.replace( reg, '$1' + ',' + '$2' );

        	if (n == 'null' ) n = '';

        	return n;

        } else {       /* 0보다 작을때 */
        	n = n.replace(/[^\d.]/gi,'');
          	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
          	n += '';                          // 숫자를 문자열로 변환
          	while ( reg.test(n) )
          		n = n.replace( reg, '$1' + ',' + '$2' );
          	if (n == 'null' ) n = '';

          	return '-' + n;
        }
    },

    /**
     * 콤마 제거
     *
     *     CommonUtils.removeComma('1,000,500.005'); // '1000500.005'
     *
     * @param {String} value 문자열
     * @return {String} value
     */
    removeComma : function( value ) {
    	value += '';
        return Number(value.replace( /,/gi, ''));
    },

    /**
     * 숫자만 남기고 나머지는 제거
     *
     *     CommonUtils.numericOnly('abcd가나다12345hi'); // '12345'
     *
     * @param {String} value
     * @return {String} value
     */
    numericOnly : function (value) {
    	value += '';
    	return value.replace(/[^\d]/gi,'');
    },

    /**
     * 입력된 값의 byte길이 리턴 (한글 2byte)
     *
     *     CommonUtils.getByteLength('hi안녕하세요'); // 12
     *
     * @param {String} value 문자열
     * @return {Number} byteLength
     */
    getByteLength : function( input ) {
        var byteLength = 0;
        for ( var inx = 0; inx < input.length; inx++ ) {
            var oneChar = escape( input.charAt( inx ) );
            if ( oneChar.length == 1 ) {
                 byteLength ++;
            } else if ( oneChar.indexOf("%u") != -1 )  {
                 byteLength += 2;
            } else if ( oneChar.indexOf("%") != -1 ) {
                 byteLength += oneChar.length / 3;
            }
        }
        return byteLength;
    },

    /**
	* value에 null, undefined와 같은 값이 전달되어 온다면 공백으로 바꿔서 리턴.
	*
	*     CommonUtils.nullToEmpty(null); // ''
	*     CommonUtils.nullToEmpty('Hi'); // 'Hi'
	*
	* @param {String} value 문자열
	* @return {String} value
	*/
    nullToEmpty : function (value) {
        if ( !value ) {
            return '';
        }
    	return value;
    },

    /**
     * value가 compareValue로 시작하면 true리턴
     *
     *     CommonUtils.startsWith('안녕하세요 모바일 프레임워크.', '안녕'); // true
     *
     * @param {String} value 문자열
     * @param {String} compareValue 비교할 시작 문자열
     * @return {Boolean} result
     */
    startsWith : function (value, compareValue) {
    	return value.indexOf(compareValue) === 0;
    },

    /**
     * value가 compareValue로 끝나면 true리턴
     *
     *     CommonUtils.endsWith('안녕하세요 모바일 프레임워크.', '프레임워크.'); // true
     *
     * @param {String} value 문자열
     * @param {String} compareValue 비교할 끝 문자열
     * @return {Boolean} result
     */
    endsWith : function (value, compareValue) {
    	return value.indexOf(compareValue) === value.length-compareValue.length;
    },

    /**
     * 부가세 계산
     *
     * ## 기본 예제
     *     // 가격 1000원, 세율 10%, 부가세 포함 (기본 소수점 첫번째자리 반올림)
     *     CommonUtils.calcSurtax(1000, 10, true);
     *
     *     // 가격 1000원, 세율 10%, 부가세 별도 (기본 소수점 첫번째자리 반올림)
     *     CommonUtils.calcSurtax(1000, 10, false);
     *
     * ## 반올림 옵션 예제
     *     // 가격 1000원, 세율 10%, 부가세 포함, 정수 첫째자리에서 반올림
	 *     CommonUtils.calcSurtax(1000, 10, true, -1);
	 *
	 *     // 가격 1000원, 세율 10%, 부가세 포함, 소수점 첫번째자리까지 보여준다.
	 *     CommonUtils.calcSurtax(1000, 10, true, 1);
	 *
     * @param {Number} amount 가격
     * @param {Number} texrate 세율
     * @param {Boolean} isInclude
     *  true  : 부가세 포함<br/>
     *  false : 부가세 별도
     * @param {Number} roundNumber
     *  반올림 자릿수(default : 0) <br/>
     *  정수   : 0, -1, -2, -3...<br/>
     *  소수점 : 1, 2, 3 ...
     *
     * @return {Object} result 결과객체
     * @return {Number} return.sply_amt 공급가
     * @return {Number} return.surtax 부가세
     * @return {Number} return.amount 금액
     */
    calcSurtax : function (amount, texrate, isInclude, roundNumber) {
    	var me = this;
        var sply_amt, tax;

        if(texrate === 0) {    /* 세율이 0일때 */
        	sply_amt = amount;
            tax =     0;
            amount =  amount;
        } else if(isInclude) { /* 부가세 포함 */

        	sply_amt = me.round( amount / (texrate/100+1), roundNumber);

        	/*
        	tax = amount - sply_amt; 이렇게 하지않고 아래와같이 반올림 처리하는이유는 다음과 같다
        	자바스크립트에서 1000 - 909.1을 하면 90.89999999999998이 나오고
        	1000.6 - 910을하면 90.60000000000002 이렇게 나오게 된다
        	이때 90.89999999999998는 90.9,  90.60000000000002는 90.6이 원래 나와야할 값인데
        	컴퓨터가 연산을 위해 소수점 이하의 자릿수를 이진수로 변환하는 과정에서 소수점이하가 무한히
        	반복되는 문제가 있으므로 tax값도 지정된 roundNumber만큼 표시(round)해줘야
        	원하는 tax값을 얻을 수 있다.
        	*/
        	tax = me.round(amount - sply_amt, roundNumber);

        	amount = amount;
        } else {               /* 부가세 별도 */
        	sply_amt = amount;

        	tax = me.round(amount * texrate / 100, roundNumber);

        	/*
        	 * amount값을 sply_amt + tax로 하지않고 round처리해서 소수점이하를 지정된 자리만 표시하는 이유는
        	 * 바로 상단 주석의 tax값 관련 내용과 같다.
        	 */
        	amount = me.round(sply_amt + tax, roundNumber);
        }

    	var result = {
    	    sply_amt : sply_amt,  /* 공급가 */
    	    tax :   tax,       /* 부가세 */
    	    amount :   amount     /* 금액 */
    	};

    	return result;
    },

    /**
     * 반올림<br/>
     * 자바스크립트의 Math.round는 정수반올림을 하지 못하므로<br/>
     * 정수 반올림과 자릿수 지정 반올림 기능을 통합
     *
     * ## 예제
     *     // roundNumber가 지정되어있지 않으면 default 0
     *     CommonUtils.round(1000.5); => 1001
     *
     *     // 소수점 두번째자리 반올림
     *     CommonUtils.round(1000.05534, 2); => 1000.06
     *
     *     // 정수 세번째자리 반올림
     *     CommonUtils.round(1600,-3); => 2000
     *
     * @param {Number} value 반올림할 숫자
     * @param {Number} roundNumber
     *  반올림 자릿수(default : 0) <br/>
     *  정수   : 0, -1, -2, -3...<br/>
     *  소수점 : 1, 2, 3 ...
     *
     * @return {Number} result 반올림한 숫자
     *
     */
    round : function (value, roundNumber) {
    	var returnValue;
    	if(!roundNumber) {
    		roundNumber = 0;
    	}

    	/* 자릿수 계산 */
    	var pow = Math.pow(10, Math.abs(roundNumber));

    	if(roundNumber < 0)  { /* 정수부분 반올림 */
    		returnValue = Math.round(value / pow ) * pow;
    	} else {               /* 소수점부분 반올림 */
    		returnValue = Math.round(value * pow ) / pow;
    	}

    	return Number(returnValue);
    },

    /**
     * 자바스크립트의 get방식으로 전달된 파라미터 가져오기<br/>
     *
     * ## 예제
     *     // http://localhost:8380/index.html?id=abcd&password=1234
     *
     *     console.log('id=', CommonUtils.getParameter('id'));
     *     console.log('password=', CommonUtils.getParameter('password'));
     *     console.log('name=', CommonUtils.getParameter('name'));
     *
     *     // 결과=> id= abcd, password= 1234, name= undefined
     */
    getParameter : function (param) {
		var returnValue;
		var url = location.href;
		var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
		for (var i = 0; i < parameters.length; i++) {
			var varName = parameters[i].split('=')[0];
			if (varName.toUpperCase() == param.toUpperCase()) {
				returnValue = parameters[i].split('=')[1];
				return decodeURIComponent(returnValue);
			}
		}
    },

    /**
     * 데이터 등록/수정/삭제 시 Model 하부의 associations의 존재여부를 확인하여<br/>
     * 존재시 그 하부 associations 까지 전부 체크하여<br/>
     * Model의 _set 필드를 변경.
     */
    checkModelModify : function (record) {
    	var me = this;

    	for(var i = 0; i < record.associations.length; i++){
    		var storeNameArray = [];
    		var association = record.associations.get(i);
    		me.checkAssociation(record, association, storeNameArray);

    		if(storeNameArray.length===0) {
    			return;
    		}

    		for(var j=0; j<storeNameArray.length; j++) {
    			var storeName = storeNameArray[j];
    			var store = record[storeName]();
    			me.checkModelModifyData(store, storeNameArray[j+1], record);
    		}
    	}
    },

    /**
     * @private
     * Model하부의 association을 끝까지 확인하여 순서대로 배열로 리턴<br/>
     * (checkModelModify에서 사용)
     */
    checkAssociation : function (record, association, storeNameArray) {
    	var me = this;
    	storeNameArray.push(association.name);
    	var childStore = eval('record.' + association.name + '()');
    	var childRecord = childStore.first();
    	for(var i = 0; i < childRecord.associations.length; i++){
    		var childAssociation = childRecord.associations.get(i);
    		me.checkAssociation(childRecord, childAssociation, storeNameArray);
    	}
    },

    /**
     * @private
     * Model하부의 association 데이터가 변경되었다면 Model의 _set필드를 변경해주고상위 model을 dirty상태로 만든다.
     * (checkModelModify에서 사용)
     */
    checkModelModifyData : function (store, storeName, model) {

    	var datas = [], operations = {}, toInsert = store.getNewRecords(), toUpdate = store.getUpdatedRecords(), toDelete = store.getRemovedRecords();
        if (toDelete.length > 0) { Ext.each(toDelete, function( record ) { record.set('_set','delete'); datas.push(record); }); }
        if (toInsert.length > 0) { Ext.each(toInsert, function( record ) { record.set('_set','insert'); datas.push(record); }); }
        if (toUpdate.length > 0) { Ext.each(toUpdate, function( record ) { record.set('_set','update'); datas.push(record); }); }

        if(datas.length>0) {
        	model.setDirty();
        }

        // 하부에 하부가 있는경우만 실행 해야 한다
        if(storeName !== undefined) {
        	store.data.each( function( item ) {
        		var grid2Store = item[storeName]();

        		datas = [], operations = {}, toInsert = grid2Store.getNewRecords(), toUpdate = grid2Store.getUpdatedRecords(), toDelete = grid2Store.getRemovedRecords();
        		if (toDelete.length > 0) { Ext.each(toDelete, function( record ) { record.set('_set','delete'); datas.push(record); }); }
        		if (toInsert.length > 0) { Ext.each(toInsert, function( record ) { record.set('_set','insert'); datas.push(record); }); }
        		if (toUpdate.length > 0) { Ext.each(toUpdate, function( record ) { record.set('_set','update'); datas.push(record); }); }

        		if(datas.length>0) {
        			item.setDirty();
        			model.setDirty();
        		}
        	});
        }
    },

    /**
     * 버튼을 눌렀을때 Ext.picker.Date가 떠서<br/>
     * 날짜를 선택할 수 있게 한다.
     *
     * @param {Ext.Button} button 버튼
     * @param {Ext.form.field.Base} textfield 또는 textarea와같은 field객체
     * @param {String} dateFormat Y-m-d
     */
    showDatePicker : function (button, field, dateFormat) {
    	var me = this;
    	button.data = button.data||{};

    	// 버튼 중복 클릭을 방지하기위해 disabled
    	button.setDisabled(true);

    	// Ext.getBody에 이벤트 걸고 해제하기위해 event 미리 선언
    	var bodyClickEvent = function(){
			var btn = this; // < ==여기서의 me는 버튼
			btn.setDisabled(false);
			btn.data.datePicker.hide();
			btn.data.datePicker.destroy();
		};

		 // 다른 2개의 버튼을 눌렀을때 이 메서드를 활용했다고 가정하면
		// 번갈아서 달력을 띄울때 달력이 띄워지는 좌표가 틀어지므로 setTimeout을 줬다
    	setTimeout(function(){
	    	button.data.datePicker = Ext.create('Ext.picker.Date', {
					style:'z-index:999',
		            renderTo: document.body,
			        listeners : {
			        	click : {
			        		element : 'el',
			        		fn : function(e){
			        			e.stopEvent();
			        		}
			        	},
			        	select : function (picker, date) {
			        		if(Ext.isEmpty(dateFormat)) {
			        			dateFormat = 'Y-m-d';
			        		}
			        		Ext.getBody().un('click', bodyClickEvent, button);
			        		field.setValue(Ext.Date.format(date, dateFormat));
			        		button.setDisabled(false);
			        		button.data.datePicker.hide();
			        		button.data.datePicker.destroy();
			        	}
			        }
			    });
	    	button.data.datePicker.alignTo(field, 'tl');

	    	if( ! Ext.isEmpty(field.getValue())){
	    		try {
	    			var fieldValue = field.getValue()+'';
	    			if(fieldValue.length === 10) {
	    				var year = Number(field.getValue().substring(0,4));
	    				var month= Number(field.getValue().substring(5,7))-1;
	    				var date = Number(field.getValue().substring(8,10));
	    				button.data.datePicker.setValue(new Date(year, month, date));
	    			} else if (fieldValue.length === 8) {
	    				var year = Number(field.getValue().substring(0,4));
	    				var month= Number(field.getValue().substring(4,6))-1;
	    				var date = Number(field.getValue().substring(6,8));
	    				button.data.datePicker.setValue(new Date(year, month, date));
	    			}
	    		} catch (e){
	    		}
	    	}

    		Ext.getBody().on('click', bodyClickEvent, button, {single:true});
    	}, 50);
    },

    /**
     * 최대 지정된 자릿수만큼 까지의 난수 생성
     *
     * @param {Number} positionalNumber 자릿수
     * @return {Number} randomInt 1~10의 positionalNumber승 자릿수만큼의 랜덤한 수
     */
    randomInt : function (positionalNumber) {
        // 0 ~ 10의 n승-1까지 범위
//        var randomValue = Math.random() * (Math.pow(10, positionalNumber));
        // 1 ~ 10의n승 까지 범위
        var randomValue = Math.random() * (Math.pow(10, positionalNumber)) + 1;
        return Math.floor(randomValue);
    },

    /**
     * 파일다운로드 요청을 하는 Axt.grid.Panel, Axt.popup.Report에서 사용한다<br/>
     * 서버로 파일 다운로드 요청을 보내기 직전 이 메서드를 실행하고<br/>
     * 리턴되는 downloadToken을 파일다운로드요청의 param에 같이 보낸다.
     *
     * @return {String} 파일 다운로드 토큰
     */
    checkDownload : function (enableLoadMask, waitMsg, callback) {
    	var me = this;
    	if (enableLoadMask) {
		    Ext.MessageBox.show({
	  	    	 title: '잠시만 기다려 주십시오.',
	  	    	 width: 300,
	  	    	 progress: true,
	  	    	 closable: false,
	  	    	 wait : true,
	  	    	 waitConfig  : {
	  	    		 interval: 500, //bar will move fast!
	  	             duration: 50000,
	  	             increment: 15,
	  	             text: waitMsg||'파일 다운로드중 입니다...',
	  	             scope: me
	  	    	 }
	      	});
		}

    	var downloadToken = _global.login_id + '_' + new Date().getTime() + '_' + CommonUtils.randomInt(10);

    	// checkDownload를 호출한뒤 form submit을 하므로 약간의 딜레이를 준다.
    	setTimeout(function(){
    		me.checkDownloadPrivate(enableLoadMask, downloadToken, callback);
    	}, 500);
    	return downloadToken;
    },


    /**
     * @private checkDownload내부에서 사용
     */
    checkDownloadPrivate : function (enableLoadMask, downloadToken, callback) {
    	var me = this;
    	Ext.Ajax.request({
    	    url: _global.api_host_info + '/'  + _global.api_path + '/service/download/check.do',
    	    timeout: 5000,
    	    params: {
    	        param : JSON.stringify({  downloadToken : downloadToken  }),
    	        token : _global.token_id
    	    },
    	    success: function(response, opts){ // 다운로드 완료
    	    	var res = Ext.decode(response.responseText);
    	    	if(res.records === true) {
    	    		console.debug('파일 다운로드성공');
    	    		if (enableLoadMask) {
    	    			Ext.MessageBox.hide();
    	    		}
    	    		if(Ext.isFunction(callback)) {
    	    			// callback
    	    			callback(res.records);
    	    		}
    	    	} else {
    	    		console.debug('아직 파일 다운로드중...');    	    		setTimeout(function(){
    	    			me.checkDownloadPrivate(enableLoadMask, downloadToken, callback); // 재시도
    	    		}, 1000); // <== 1초에 한번 파일 다운로드 다 되었는가 서버로 확인 보냄
    	    	}

    	    },
    	    failure : function (response, opts) { // 다운로드 체크 실패
    	    	Ext.MessageBox.hide();
    	    	console.debug('오류');
    	    	// callback
    	    	if(Ext.isFunction(callback)) {
    	    		callback(false);
    	    	}
    	    }
    	});

    },

    /**
     * value가 null, undefined라면 defaultValue로 리턴
     */
    strDefault : function (value, defaultValue) {

    	if(defaultValue === undefined) {
    		defaultValue = '';
    	}

    	if(Ext.isEmpty(value)) {
    		return defaultValue;
    	} else {
    		return value;
    	}
    },

    /**
     * 팝업 띄우기.<br/><br/>
     * 자바스크립트의 기본 native새창띄우기와<br/>
     * extjs의 window객체를 이용한 새창띄우기를 옵션을 통해 구분해서<br/>
     * 사용할수 있다.<br/>
     *
     * ## 예제
     *     // ext의 window
     *     CommonUtils.popup({
     *         type : "ext",   // (native:자바스크립트의 기본 새창, ext:extjs의 window객체 새창)
     *         method:'post',  // (get, post)
     *         url : 'http://localhost:8388',
     *         params : 'a=1&b=2', // 각 파라미터는 &를 구분자로 넣는다.
     *         resizable : true,   // (true:창크기 조절가능, false:창크기 조절 불가능)
     *         newTab : true, // (true:새탭으로 띄우기, false:팝업으로 띄우기)
     *         width:300,
     *         height:500
     *     });
     */
    extPopup : null,
    popup : function (config) {
    	var me = this;
    	var url = config.url;
    	var width  = config.width;
    	var height = config.height;
    	var method = config.method;
    	var resizable = config.resizable;
    	var params = CommonUtils.strDefault(config.params, '');

    	if(config.type === 'native') { // 순수 자바스크립트로 native새창 띄우기
    		var posX = (screen.width - width) / 2;
    	    var posY = (screen.height - height)/ 2;

    	    var isNewTab = config.newTab;
	    	window.open(url,"new", "width="+width+", height="+height+", left="+posX+", top="+posY+", toolbar=yes,location=yes,status=yes,menubar="+ (isNewTab?'yes':'no') +",scrollbars=yes,titlebar=yes,resizable="+(resizable?"yes":"no")+",fullscreen=no");

	    	var paramArray = params.split('&');
			var items = [];
			for(var i=0; i<paramArray.length; i++) {
				var key = paramArray[i].split('=')[0];
				var value = paramArray[i].split('=')[1];
				items.push({
					xtype : 'hiddenfield',
					name : key,
					value : value
				});
			}
			var hiddenForm = Ext.create('Ext.form.Panel', {
				url : url,
				timeout : 120000,
				height : 0,
				width : 0,
				hidden : true,
				items : items
			});
			hiddenForm.getForm().doAction('standardsubmit', {
				target : 'new',
				method : method,
				standardSubmit : true,
			});
    	} else { // ext의 window객체를 이용해 layer새창 띄우기
    		if(this.extPopup!=null) {
    			this.extPopup.close();
    		}
    		this.extPopup = Ext.create('Ext.window.Window', {
				closable : true,
				width  : width,
				height : height,
				autoShow : true,
				resizable : resizable,
				layout : 'fit',
				items : [ {
					xtype : 'component',
					name : 'iframe',
					autoEl : {
						tag : "iframe",
						name : 'iframeName',
						// cls: 'x-hidden',
						src : Ext.SSL_SECURE_URL
					}
				} ],
			});

			var paramArray = params.split('&');
			var items = [];
			for(var i=0; i<paramArray.length; i++) {
				var key = paramArray[i].split('=')[0];
				var value = paramArray[i].split('=')[1];
				items.push({
					xtype : 'hiddenfield',
					name : key,
					value : value
				});
			}
			var hiddenForm = Ext.create('Ext.form.Panel', {
				url : url,
				timeout : 120000,
				height : 0,
				width : 0,
				hidden : true,
				items : items
			});
			hiddenForm.getForm().doAction('standardsubmit', {
				target : 'iframeName',
				method : method,
				standardSubmit : true,
			});

    	}
    },

    /**
     * 다음 우편번호 API호출
     *
     * // http://blog.daum.net/daummaps/565
     * // http://postcode.map.daum.net/guide
	 * // https://spi.maps.daum.net/postcode/guidessl
     *
     * ## 예제
     *
     *     CommonUtils.daumPost({
	 *         width : 600,       // 가로길이
	 *         height: 600,       // 세로길이
	 *         resizable : true,  // 창 크기 변경
	 *         oncomplete : function(data) { // 응답콜백
     *             console.log('응답데이터', data);
     *         }
     *     });
     */
    daumPost : function (config) {
		var extPopup = Ext.create('Ext.window.Window', {
			closable : true,
			width  : config.width===undefined?550:config.width,
			height : config.height===undefined?550:config.height,
			autoShow : true,
			resizable : config.resizable===undefined?true:config.resizable,
			layout : 'fit',
			items : [ {
				xtype : 'component',
				id:'daumPost',
				autoEl : {
					tag : 'div'
				}
			}]
		});

		// daum api iframe이 삽입될
		var element = document.getElementById('daumPost');
		element.style.display = 'block';

		new daum.Postcode({
			width:'100%',
			height:'100%',
			oncomplete: function(data) {
				if(Ext.isFunction(config.oncomplete)) {
					config.oncomplete(data);
					extPopup.close();
				} else {
					extPopup.close();
				}
			}
		}).embed(element);

    }

});

