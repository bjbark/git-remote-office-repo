/**
 * 전역변수 설정을 위한 sigleton object
 *
 */
Ext.define('Axt.Constant', {
	alternateClassName: 'Const',
	singleton: true,
	EDITOR : {
		DEFAULT : 'default',
		INVOICE : 'invoice',
		PAYMENT : 'payment',
		PROCESS : {
			INSERT : 'insert',
			UPDATE : 'update',
			DELETE : 'delete'
		}
	},
    PERMIT : {
		INSERT :   2, // 등록
		MODIFY :   4, // 수정
		DELETE :   8, // 삭제
		REPORT :  16, // 출력
		EXPORT :  32, // 엑셀
	},


	INSERT : { text : '<span style="text-decoration;"><font bold color="white" size= "2">추 가</font></span>', icon : 'icon-insert' , action :'insertAction', auth :   1 , mask : '<span class="text-warn">등록 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	SELECT : { text : '<span style="text-decoration;"><font bold color="white" size= "2">조 회</font></span>', icon : 'icon-select' , action :'selectAction', auth :   2 , mask : '<span class="text-warn">조회 하는 중 입니다</span>... 잠시만 기다려 주십시오.', rows   : 100 },/* 조회시 디폴트로 적용될 STORE PAGE_SIZE */
	MODIFY : { text : '<span style="text-decoration;"><font bold color="white" size= "2">수 정</font></span>', icon : 'icon-modify' , action :'modifyAction', auth :   4 , mask : '<span class="text-warn">수정 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	UPDATE : { text : '<span style="text-decoration;"><font bold color="white" size= "2">저 장</font></span>', icon : 'icon-update' , action :'updateAction', auth :   4 , mask : '<span class="text-warn">저장 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	CANCEL : { text : '<span style="text-decoration;"><font bold color="white" size= "2">취 소</font></span>', icon : 'icon-cancel' , action :'cancelAction', auth :   8 , mask : '<span class="text-warn">취소 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	DELETE : { text : '<span style="text-decoration;"><font bold color="red"   size= "2">삭 제</font></span>', icon : 'icon-delete',  action :'deleteAction', auth :  16 , mask : '<span class="text-warn">삭제 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	REPORT : { text : '<span style="text-decoration;"><font bold color="white" size= "2">출 력</font></span>', icon : 'icon-report' , action :'reportAction', auth :  32 , mask : '<span class="text-warn">출력 하는 중 입니다</span>... 잠시만 기다려 주십시오.' },
	EXPORT : { text : '<span style="text-decoration;"><font bold color="white" size= "2">엑 셀</font></span>', icon : 'icon-export' , action :'exportAction', auth :  64 , mask : '<span class="text-warn">출력 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	CLOSER : { text : '<span style="text-decoration;"><font bold color="white" size= "2">닫 기</font></span>', icon : 'icon-closer' , action :'closerAction', auth : 128},
	CONFIG : { text : '<span style="text-decoration;"><font bold color="white" size= "2">설 정</font></span>', icon : 'icon-config' , action :'configAction' },
	MARKET : { icon : 'icon-update' , action :'marketAction' },
	ROWINSERT : { text : '<span style="text-decoration;"><font bold color="black" size= "2">행추가</font></span>', icon : 'icon-insert' , action :'insertAction', auth :   1 , mask : '<span class="text-warn">등록 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	ROWDELETE : { text : '<span style="text-decoration;"><font bold color="red"   size= "2">행삭제</font></span>', icon : 'icon-delete',  action :'deleteAction', auth :  16 , mask : '<span class="text-warn">삭제 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},

	//LOGOUT : { text : '로그아웃', icon : 'icon-logout' , action :'passwdAction' },
	//PASSWD : { text : '암호', icon : 'icon-passwd' , action :'passwdAction' },


	FAX   : { text : '<span style="text-decoration;"><font bold color="white" size= "2">팩 스</font></span>',   icon : 'icon-fax' , action :'faxAction',   auth :  64 , mask : '<span class="text-warn">출력 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	EMAIL : { text : '<span style="text-decoration;"><font bold color="white" size= "2">이메일</font></span>', icon : 'icon-email' , action :'emailAction', auth :  64 , mask : '<span class="text-warn">출력 하는 중 입니다</span>... 잠시만 기다려 주십시오.'},
	FINISH : { text : '<span style="text-decoration;"><font bold color="white" size= "2">확 인</font></span>', icon : 'icon-finish' , action :'finishAction' },
	UPLOAD : { text : '<span style="text-decoration;"><font bold color="white" size= "2">파 일</font></span>', icon : 'icon-upload' , action :'uploadAction' ,
		SAMPLE : {
			ITEM : 'Item_Upload_Templete_V150401.xlsx'
		}
	},



/*
	ICON CLS 정의
	등록		: INSERT	, icon : 'icon-insert'	,	../img/icon/insert.png
	조회		: SELECT	, icon : 'icon-select'	,	../img/icon/select.png
	수정		: MODIFY	, icon : 'icon-modify'	,	../img/icon/modify.png
	저장		: UPDATE	, icon : 'icon-update'	,	../img/icon/update.png
	취소		: CANCEL	, icon : 'icon-cancel'	,	../img/icon/cancel.png
	삭제		: DELETE	, icon : 'icon-delete'	,	../img/icon/delete.png
	출력		: REPORT	, icon : 'icon-report'	,	../img/icon/report.png
	엑셀		: EXPORT	, icon : 'icon-export'	,	../img/icon/export.png
	닫기		: CLOSER	, icon : 'icon-closer'	,	../img/icon/cancel.png
	확인		: FINISH	, icon : 'icon-finish'	,	../img/icon/finish.png
	파일		: UPLOAD	, icon : 'icon-upload'
	SMS		:			, icon : 'icon-sms'		,	../img/icon/sms.png
	EMAIL	:			, icon : 'icon-email'	,	../img/icon/email.png
	FAX		:			, icon : 'icon-fax'		,	../img/icon/fax.png
	설정		:			, icon : 'icon-setting'	,	../img/icon/setting.png
	암호		:			, icon : 'icon-pwd'		,	../img/icon/pwd.png

	0		: 0			, icon : '.icon-number-button_0'	,	../img/icon/number/button_0.png
	1		: 1			, icon : '.icon-number-button_1'	,	../img/icon/number/button_1.png
	2		: 2			, icon : '.icon-number-button_2'	,	../img/icon/number/button_2.png
	3		: 3			, icon : '.icon-number-button_3'	,	../img/icon/number/button_3.png
	4		: 4			, icon : '.icon-number-button_4'	,	../img/icon/number/button_4.png
	5		: 5			, icon : '.icon-number-button_5'	,	../img/icon/number/button_5.png
	6		: 6			, icon : '.icon-number-button_6'	,	../img/icon/number/button_6.png
	7		: 7			, icon : '.icon-number-button_7'	,	../img/icon/number/button_7.png
	8		: 8			, icon : '.icon-number-button_8'	,	../img/icon/number/button_8.png
	9		: 9			, icon : '.icon-number-button_9'	,	../img/icon/number/button_9.png
	enter	: enter		, icon : '.icon-number-button_enter',	../img/icon/number/button_enter.png
	clear	: clear		, icon : '.icon-number-button_clear',	../img/icon/number/button_clear.png
	조회		: search	, icon : '.icon-number-search'		,	../img/icon/number/search.png
	신규작업	: newinsert	, icon : '.icon-number-newinsert'	,	../img/icon/number/newinsert.png
	송장재발행: reissue	, icon : '.icon-number-reissue'		,	../img/icon/number/reissue.png
	옵션		: option	, icon : '.icon-number-option'		,	../img/icon/number/option.png

	top		: top		, icon : '.icon-number-top'			,	../img/icon/number/top.png
	bottom	: bottom	, icon : '.icon-number-bottom'		,	../img/icon/number/bottom.png
	left	: left		, icon : '.icon-number-left'		,	../img/icon/number/left.png
	right	: right		, icon : '.icon-number-right'		,	../img/icon/number/right.png

	검수보류	: testhold	, icon : '.icon-number-testhold'	,	../img/icon/number/testhold.png
	보류복원	: restore	, icon : '.icon-number-restore'		,	../img/icon/number/restore.png
	전체검수	: alltest	, icon : '.icon-number-alltest'		,	../img/icon/number/alltest.png
	한줄검수	: linetest	, icon : '.icon-number-linetest'	,	../img/icon/number/linetest.png
	한줄취소	: linecancel, icon : '.icon-number-linecancel'	,	../img/icon/number/linecancel.png
	전체취소	: allcancel	, icon : '.icon-number-allcancel'	,	../img/icon/number/allcancel.png
	메모추가	: itemmemo	, icon : '.icon-number-itemmemo'	,	../img/icon/number/itemmemo.png
	검수완료	: testcomp	, icon : '.icon-number-testcomp'	,	../img/icon/number/testcomp.png

 */


//	FIELDS : {  /*  참조 http://www.computerhope.com/htmcolor.htm */
//		defaultReadOnly : 'background-color: #F2F2F2; background-image: none;' ,
//		primaryReadOnly : 'background-color: #D5EFFD; background-image: none;'
//
//
//
//
//		//background : 'background-color: red; background-image: none;'
//	},

	COLOR : {
		FONT : {
			sply_amt : 'red',
			tax      : 'green',
			amount   : 'blue',
			payment  : 'blud',
     		npay_amt  : 'red'
		}
	},

	NOTICE: '알림',
	ERROR: '에러',
	CONFIRM: '확인',
	ALERT_SELECTED  : '선택 된 데이터가 없습니다.',
	NOVALUE_DELETE: '삭제할 데이터를 선택하여 주시기 바랍니다.'	,

	invalid : {
		emptyValue :  '필수 입력 필드 입니다.' ,
		inputValue :  '입력 항목에 오류가 있습니다.'

	},
	infoNull : {
		queryAll :  '전체조회'
		//queryAll :  '생략하면 전체를 조회합니다.'
	},

	borderLine : {
		left   : 'border-left: solid #99bce8 1px;',
		right  : 'border-right: solid #99bce8 1px;',
		top    : 'border-top: solid #99bce8 1px;',
		bottom : 'border-bottom: solid #99bce8 1px;'
	},


	FORM_AUTH_INSERT :   2, // 신규
	FORM_AUTH_MODIFY :   4, // 신규
	FORM_AUTH_DELETE :   8,	// 삭제
	FORM_AUTH_REPORT :  16, // 출력
	FORM_AUTH_EXPORT :  32, // 엑셀


//	ROW_STATUS_CREATE: 'C',
//	ROW_STATUS_UPDATE: 'U',
//	ROW_STATUS_DELETE: 'D',

	REQUIRED: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',


	DATE_FORMAT_YMD : 'Ymd',
	DATE_FORMAT_YM  : 'Ym',
	DATE_FORMAT_YMD_BAR : 'Y-m-d',

	DATE_FORMAT: 'YmdHis',
	DATE_FORMAT_BAR: 'Y-m-d H:i:s',

	TIME_FORMAT: 'H:i:s',
	TM_FORMAT: 'H:i',



   // 	submitFormat

//		format: 'Y-m-d',
//		submitFormat: 'Ymd'


//	DATE_FORMAT_SIMPLE: 'Ymd',
//	DATE_FORMAT_SIMPLE_BAR: 'Y-m-d',

	COMBO_CODE_ID_ALL: 'ALL',

	YN_YES: '1',
	YN_NO: '0',

	READ_ONLY_CLS: 'read-only',

	/**
	 * 송장, 청구서 type <br/>
	 * 택배사가 추가된다면 eclipse로 Const.InvoiceType.Delivery를 검색하여 나오는 항목들을 검토해야 한다.<br/>
	 * 택배송장의경우는 Const.InvoiceType에 코드 추가도 해야 한다.
	 */
	InvoiceType : {
        SALE : 'Sale',        /* 거래명세표 */
        MOVE : 'Move',        /* 이동 명세표 */
        RECV : 'Recv',        /* 입고 명세서 */
        ESTI : 'Esti',        /* 견적서 */
    	TAX  : 'Tax',         /* 세금계산서 */
        PICKING : 'Picking',  /* 피킹리스트 */
        TOTALREQ: 'TotalReq',  /* 종합청구서 */

    	Delivery : { // 택배송장
    		SELF   : '5101000',   // 자체배송
    		CJ     : '5101010',   // CJ GLS택배
    	}
	},

	/**
	 * 거래 명세서, 택배송장 설정등의 용지코드 <br/>
	 *
	 * ## 용지코드 설명
	 *     A52 -> A5 * 2 크기 (결국 A4크기이다)
	 *     1   -> 양식지
	 *     1   -> 주소포함
	 * ## 택배용지의 경우는 양식이 다름!!
	 *     Delivery_100_200 => 택배용지이며 100 x 200 사이즈
	 */
	PaperType : {
		A4_NORMAL        : 'A4100',   // 일반 순면지 A4 (일반)
		A5_DOUBLE        : 'A5210',   // 일반 양식지 A5*2
		A4_CORP          : 'A4110',   // 일반 양식지
		DELIVERY_100_200 : 'Delivery_100_200' // 택배송장 용지 (가로100 세로 200)
	},

	/**
	 * 바코드 프린터 종류
	 */
	BarcodePrinterType : {
		ZEBRA_ZM400 : 'ZM400',
		TSC_TTP243 : 'TTP-243'
	}

});