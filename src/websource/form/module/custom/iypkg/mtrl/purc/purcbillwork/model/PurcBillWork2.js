Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork2', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//발행 invoice 번호
		},{	name: 'line_seqn'			, type: 'float'			//발행 invoice 순번
		},{	name: 'puch_sale_dvcd'		, type: 'string'		//매입매출구분코드
		},{	name: 'publ_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//발행일자
		},{	name: 'txbl_volm'			, type: 'float'			//세금계산서권
		},{	name: 'txbl_honm'			, type: 'float'			//세금계산서호
		},{	name: 'txbl_seqn'			, type: 'float'			//세금계산서일련번호
		},{	name: 'drtr_idcd'			, type: 'string'		//세금계산서 담당자
		},{	name: 'cstm_idcd'			, type: 'string'		//세금계산서 거래처(매입처?) 코드
		},{	name: 'cstm_name'			, type: 'string'		//세금계산서 거래처(매입처?) 명
		},{	name: 'txbl_cstm_idcd'		, type: 'string'		//세금계산서 발행거래처
		},{	name: 'txbl_path_dvcd'		, type: 'string'		//세금계산서 경로구분코드
		},{	name: 'offr_path_dvcd'		, type: 'string'		//발주구분코드
		},{	name: 'rqod_rcvd_dvcd'		, type: 'string'		//청구영수구분코드
		},{	name: 'stot_dvcd'			, type: 'string'		//결제구분코드

		},{	name: 'paym_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//지급일자
		},{	name: 'paym_yorn'			, type: 'string'		//지급여부
		},{	name: 'purc_numb'			, type: 'string'		//purc_mast 번호
		},{	name: 'purc_seqn'			, type: 'float'			//purc_mast 순번

		},{	name: 'sum_sply_amnt'		, type: 'float'			//합계공급가
		},{	name: 'sum_vatx_amnt'		, type: 'float'			//합계부가세
		},{	name: 'sum_ttsm_amnt'		, type: 'float'			//합계합계금액

		},{	name: 'orig_invc_numb'		, type: 'string'		//원INVOICE번호
		},{	name: 'orig_invc_seqn'		, type: 'float'			//원INVOICE순번
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//invoice 일자 (입고일자)
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_name'			, type: 'string'		//품목명
		},{	name: 'item_spec'			, type: 'string'		//품목규격
		},{	name: 'qntt'				, type: 'float'			//수량
		},{	name: 'pric'				, type: 'float'			//단가
		},{	name: 'sply_amnt'			, type: 'float'			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'calc_vatx'			, type: 'float'			//산출부가세
		},{	name: 'remk_text'			, type: 'string'		//비고

		},{	name: 'user_memo'			, type: 'string'	/* 사용자메모	*/
		},{	name: 'sysm_memo'			, type: 'string'	/* 시스템메모	*/
		},{	name: 'prnt_idcd'			, type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'			, type: 'float'		/* ROW레벨	*/ , defaultValue : 0
		},{	name: 'line_ordr'			, type: 'float'		/* ROW순서	*/ , defaultValue : 0
		},{	name: 'line_stat'			, type: 'string'	/* ROW상태	*/ , defaultValue: '0'
		},{	name: 'line_clos'			, type: 'string'	/* ROW마감	*/
		},{	name: 'find_name'			, type: 'string'	/* 찾기명		*/
		},{	name: 'updt_user_name'		, type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'			, type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'			, type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'			, type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'			, type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'		, type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'			, type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'			, type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'			, type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'			, type: 'string'	/* 생성UI		*/
		}
	],
});