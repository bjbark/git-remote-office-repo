Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork4', { extend: 'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'			, type: 'string'		//발행 invoice 번호
		},{	name: 'line_seqn'			, type: 'float'			//발행 invoice 순번
		},{	name: 'publ_date'			, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr		//발행일자
		},{	name: 'txbl_volm'			, type: 'string'		//세금계산서권
		},{	name: 'txbl_honm'			, type: 'string'		//세금계산서호
		},{	name: 'cstm_idcd'			, type: 'string'		//세금계산서 거래처(매입처?) ID
		},{	name: 'cstm_name'			, type: 'string'		//세금계산서 거래처(매입처?) 명
		},{	name: 'sply_amnt'			, type: 'float'			//공급가액
		},{	name: 'vatx_amnt'			, type: 'float'			//부가세액
		},{	name: 'ttsm_amnt'			, type: 'float'			//합계금액
		},{	name: 'boss_name'			, type: 'string'		//대표자명
		},{	name: 'buss_numb'			, type: 'string'		//사업자등록번호
		},{	name: 'buss_type'			, type: 'string'		//업태
		},{	name: 'buss_kind'			, type: 'string'		//업종
		},{	name: 'txbl_path_dvcd'		, type: 'string'		//세금계산서 경로구분코드
		},{	name: 'txbl_path_name'		, type: 'string'		//세금계산서 경로구분코드명
		},{	name: 'offr_path_dvcd'		, type: 'string'		//발주구분코드
		},{	name: 'cnt'					, type: 'float'			//건수
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