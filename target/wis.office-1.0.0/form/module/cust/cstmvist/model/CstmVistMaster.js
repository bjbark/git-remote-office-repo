Ext.define( 'module.cust.cstmvist.model.CstmVistMaster', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'			, type: 'string'	//거래처ID
		},{	name: 'invc_numb'			, type: 'string'	//거래처코드
		},{	name: 'cstm_code'			, type: 'string'	//거래처코드
		},{	name: 'cstm_dvcd'			, type: 'string'	//거래처구분코드
		},{	name: 'rtil_stru_dvcd'		, type: 'string'	//유통구조구분코드
		},{	name: 'cstm_name'			, type: 'string'	//거래처명
		},{	name: 'cstm_stnm_1fst'		, type: 'string'	//거래처약칭1
		},{	name: 'cstm_stnm_2snd'		, type: 'string'	//거래처약칭2
		},{	name: 'engl_name'			, type: 'string'	//영문명
		},{	name: 'engl_stnm'			, type: 'string'	//영문약칭
		},{	name: 'engl_stnm_1fst'		, type: 'string'	//영문약칭1
		},{	name: 'engl_stnm_2snd'		, type: 'string'	//영문약칭2
		},{	name: 'mngt_bzpl_idcd'		, type: 'string'	//관리사업장ID
		},{	name: 'mngt_bzpl_name'		, type: 'string'	//관리사업장명
		},{	name: 'home_page_addr'		, type: 'string'	//홈페이지주소
		},{	name: 'cstm_dsgn_trnt'		, type: 'string'	//고객지정운송
		},{	name: 'corp_dvcd'			, type: 'string'	//법인구분코드
		},{	name: 'buss_name'			, type: 'string'	//사업명
		},{	name: 'buss_numb'			, type: 'string'	//사업자등록번호
		},{	name: 'buss_type'			, type: 'string'	//업태
		},{	name: 'buss_kind'			, type: 'string'	//업종
		},{	name: 'corp_numb'			, type: 'string'	//법인번호
		},{	name: 'boss_name'			, type: 'string'	//대표자명
		},{	name: 'tele_numb'			, type: 'string'	//전화번호
		},{	name: 'tele_numb_2snd'		, type: 'string'	//전화번호2
		},{	name: 'faxi_numb'			, type: 'string'	//팩스번호
		},{	name: 'hdph_numb'			, type: 'string'	//휴대폰번호
		},{	name: 'spec_buss_numb'		, type: 'string'	//종사업자등록번호
		},{	name: 'mail_addr'			, type: 'string'	//이메일주소
		},{	name: 'ccrd_puch_yorn'		, type: 'string'	//신용카드매입여부
		},{	name: 'etbl_rpub_yorn'		, type: 'string'	//전자세금계산서역발행여부
		},{	name: 'sale_cstm_yorn'		, type: 'string'	//매출거래처여부
		},{	name: 'expt_cstm_yorn'		, type: 'string'	//수출거래처여부
		},{	name: 'puch_cstm_yorn'		, type: 'string'	//매입거래처여부
		},{	name: 'incm_cstm_yorn'		, type: 'string'	//수입거래처여부
		},{	name: 'otod_cstm_yorn'		, type: 'string'	//외주거래처여부
		},{	name: 'etcc_cstm_yorn'		, type: 'string'	//기타거래처여부
		},{	name: 'rpst_cstm_idcd'		, type: 'string'	//대표거래처ID
		},{	name: 'blto_idcd_1fst'		, type: 'string'	//청구처ID1
		},{	name: 'blto_idcd_2snd'		, type: 'string'	//청구처ID2
		},{	name: 'scrt_sett_dvcd'		, type: 'string'	//담보설정구분코드
		},{	name: 'scrt_sett_amnt'		, type: 'float'		//담보설정금액
		},{	name: 'scrt_offr_aman'		, type: 'string'	//담보제공자
		},{	name: 'scrt_mltl'			, type: 'string'	//담보물건
		},{	name: 'crdt_bacd'			, type: 'string'	//신용분류코드
		},{	name: 'crdt_lmit_amnt'		, type: 'float'		//여신한도금액
		},{	name: 'cnio_dvcd'			, type: 'string'	//국내외구분코드
		},{	name: 'sale_drtr_idcd'		, type: 'string'	//영업담당자ID
		},{	name: 'sale_drtr_name'		, type: 'string'	//영업담당자명
		},{	name: 'sale_dept_idcd'		, type: 'string'	//영업부서ID
		},{	name: 'sale_dept_name'		, type: 'string'	//영업부서명
		},{	name: 'insp_kind_dvcd'		, type: 'string'	//검사종류구분코드
		},{	name: 'user_memo'			, type: 'string'	//사용자메모
		},{	name: 'sysm_memo'			, type: 'string'	//시스템메모
		},{	name: 'prnt_idcd'			, type: 'string'	//부모ID
		},{	name: 'line_levl'			, type: 'float' , defaultValue: '0'		//ROW레벨
		},{	name: 'line_ordr'			, type: 'string'	//ROW순서
		},{	name: 'line_stat'			, type: 'string', defaultValue: '0'		//ROW상태
		},{	name: 'line_clos'			, type: 'string'	//ROW마감
		},{	name: 'find_name'			, type: 'string'	//찾기명
		},{	name: 'updt_user_name'		, type: 'string'	//수정사용자명
		},{	name: 'updt_ipad'			, type: 'string'	//수정IP
		},{	name: 'updt_dttm'			, type: 'string'	//수정일시
		},{	name: 'updt_idcd'			, type: 'string'	//수정ID
		},{	name: 'updt_urif'			, type: 'string'	//수정UI
		},{	name: 'crte_user_name'		, type: 'string'	//생성사용자명
		},{	name: 'crte_ipad'			, type: 'string'	//생성IP
		},{	name: 'crte_dttm'			, type: 'string'	//생성일시
		},{	name: 'crte_idcd'			, type: 'string'	//생성ID
		},{	name: 'crte_urif'			, type: 'string'	//생성UI
		}
	]
});
