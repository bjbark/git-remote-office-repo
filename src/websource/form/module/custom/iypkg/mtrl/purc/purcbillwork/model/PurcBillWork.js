Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//입고invoice번호
		},{	name: 'line_seqn'			, type: 'float'			//입고순번
		},{	name: 'cstm_idcd'			, type: 'string'		//입고처ID
		},{	name: 'cstm_name'			, type: 'string'		//입고처명
		},{	name: 'invc_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//입고일자
		},{	name: 'item_idcd'			, type: 'string'		//품목ID
		},{	name: 'item_name'			, type: 'string'		//품목명 (발주구분코드별)
		},{	name: 'item_spec'			, type: 'string'		//품목규격 (발주구분코드별)
		},{	name: 'vatx_incl_yorn'		, type: 'string'		//입고시 부가세포함여부 (=자료구분)
		},{	name: 'offr_path_dvcd'		, type: 'string'		//발주구분코드
		},{	name: 'istt_pric'			, type: 'float'			//입고단가
		},{	name: 'istt_amnt'			, type: 'float'			//입고공급가
		},{	name: 'istt_vatx'			, type: 'float'			//입고부가세
		},{	name: 'qntt'				, type: 'float'			//기타 수량
		},{	name: 'pric'				, type: 'float'			//기타 단가

		},{	name: 'sum_sply_amnt'		, type: 'float'			//합계공급가
		},{	name: 'sum_vatx_amnt'		, type: 'float'			//합계부가세
		},{	name: 'sum_ttsm_amnt'		, type: 'float'			//합계합계금액

		},{	name: 'sply_amnt'			, type: 'float'			//기타 공급가
		},{	name: 'vatx_amnt'			, type: 'float'			//기타 부가세
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'istt_qntt'			, type: 'float'			//입고량
		},{	name: 'txbl_qntt'			, type: 'float'			//발행수량
		},{	name: 'unissued'			, type: 'float'			//미발행수량
		},{	name: 'qntt'				, type: 'float'			//발행할수량
		},{	name: 'bxty_idcd'			, type: 'string'		//상자형식ID
		},{	name: 'bxty_name'			, type: 'string'		//상자형식이름
		},{	name: 'acpt_numb'			, type: 'string'		//수주번호
		},{	name: 'acpt_date'			, type: 'string'		//수주일자
		},{	name: 'acpt_qntt'			, type: 'float'			//수주량
		},{	name: 'offr_numb'			, type: 'string'		//발주번호
		},{	name: 'offr_seqn'			, type: 'float'			//발주순번

		},{	name: 'fabc_leng'			, type: 'float'			//원단 장
		},{	name: 'fabc_widh'			, type: 'float'			//원단 폭
		},{	name: 'fabc_fxqt'			, type: 'float'			//원단 절수
		},{	name: 'fabc_ppln'			, type: 'float'			//원단 골
		},{	name: 'fabc_mxm2_qntt'		, type: 'float'			//원단 제곱미터수량
		},{	name: 'fabc_mxm2_pric'		, type: 'float'			//원단 제곱미터단가

		},{	name: 'purc_invc_numb'		, type: 'string'		//매입대장 invoice 번호
		},{	name: 'new_invc_numb'		, type: 'string'		//발행 invoice 번호
		},{	name: 'new_line_seqn'		, type: 'float'			//발행 invoice 순번
		},{	name: 'rqod_rcvd_dvcd'		, type: 'string'		//청구영수구분코드
		},{	name: 'puch_sale_dvcd'		, type: 'string'		//매입매출구분코드
		},{	name: 'stot_dvcd'			, type: 'string'		//청구영수구분코드
		},{	name: 'publ_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//발행일자
		},{	name: 'txbl_volm'			, type: 'float'			//세금계산서권
		},{	name: 'txbl_honm'			, type: 'float'			//세금계산서호
		},{	name: 'txbl_seqn'			, type: 'float'			//세금계산서일련번호
		},{	name: 'remk_text'			, type: 'string'		//비고
		},{	name: 'drtr_idcd'			, type: 'string'		//세금계산서 담당자
		},{	name: 'txbl_cstm_idcd'		, type: 'string'		//세금계산서 발행거래처ID
		},{	name: 'txbl_cstm_name'		, type: 'string'		//세금계산서 발행거래처명
		},{	name: 'txbl_path_dvcd'		, type: 'string'		//세금계산서 경로구분코드


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