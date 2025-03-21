Ext.define( 'module.cust.cstmmast.model.CstmMast', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드		*/
		},{	name: 'rtil_stru_dvcd'      , type: 'string'	/* 유통구조구분코드	*/
		},{	name: 'cstm_name'           , type: 'string'	/* 고객명			*/
		},{	name: 'cstm_stnm_1fst'      , type: 'string'	/* 거래처약칭1		*/
		},{	name: 'cstm_stnm_2snd'      , type: 'string'	/* 거래처약칭2		*/
		},{	name: 'engl_name'           , type: 'string'	/* 영문명			*/
		},{	name: 'engl_stnm'           , type: 'string'	/* 영문약칭		*/
		},{	name: 'engl_stnm_1fst'      , type: 'string'	/* 영문약칭1		*/
		},{	name: 'engl_stnm_2snd'      , type: 'string'	/* 영문약칭2		*/
		},{	name: 'mail_addr'           , type: 'string'	/* 이메일주소		*/
		},{	name: 'cstm_dsgn_trnt'      , type: 'string'	/* 고객지정운송	*/
		},{	name: 'corp_dvcd'           , type: 'string'	/* 법인구분코드	*/
		},{	name: 'tele_numb_2snd'      , type: 'string'	/* 전화번호2		*/
		},{	name: 'faxi_numb'           , type: 'string'	/* 팩스번호		*/
		},{	name: 'hdph_numb'           , type: 'string'	/* 전화번호		*/
		},{	name: 'home_page_addr'      , type: 'string'	/* 홈페이지주소	*/
		},{	name: 'buss_numb'           , type: 'string'	/* 사업자등록번호	*/
		},{	name: 'buss_name'           , type: 'string'	/* 사업자명		*/
		},{	name: 'corp_numb'           , type: 'string'	/* 법인번호		*/
		},{	name: 'boss_name'           , type: 'string'	/* 대표자명		*/
		},{	name: 'tele_numb'           , type: 'string'	/* 전화번호		*/
		},{	name: 'spec_buss_nmbr'      , type: 'string'	/* 종사업자등록번호	*/
		},{	name: 'buss_type'           , type: 'string'	/* 업태			*/
		},{	name: 'buss_kind'           , type: 'string'	/* 업종			*/
		},{	name: 'etcc_cstm_yorn'      , type: 'string'	/* 기타거래처여부	*/
		},{	name: 'ccrd_puch_yorn'      , type: 'string'	/* 신용카드매입여부	*/
		},{	name: 'etbl_rpub_yorn'      , type: 'string'	/* 전자세금계산서역발행여부	*/
		},{	name: 'sale_cstm_yorn'      , type: 'string'	/* 매출거래처여부	*/
		},{	name: 'expt_cstm_yorn'      , type: 'string'	/* 수출거래처여부	*/
		},{	name: 'puch_cstm_yorn'      , type: 'string'	/* 매입거래처여부	*/
		},{	name: 'incm_cstm_yorn'      , type: 'string'	/* 수입거래처여부	*/
		},{	name: 'otod_cstm_yorn'      , type: 'string'	/* 외주여부	*/
		},{	name: 'rpst_cstm_idcd'      , type: 'string'	/* 대표거래처ID	*/
		},{	name: 'blto_idcd_1fst_name' , type: 'string'	/* 청구처ID1		*/
		},{	name: 'blto_idcd_1fst'      , type: 'string'	/* 청구처ID1		*/
		},{	name: 'blto_idcd_2snd'      , type: 'string'	/* 청구처ID2		*/
		},{	name: 'scrt_sett_dvcd'      , type: 'string'	/* 담보설정여부	*/
		},{	name: 'scrt_offr_aman'      , type: 'string'	/* 담보제공자	*/
		},{	name: 'scrt_mltl'           , type: 'string'	/* 담보물건	*/
		},{	name: 'crdt_lmit_amnt'      , type: 'float'		/* 여신한도	*/
		},{	name: 'scrt_sett_amnt'      , type: 'float'		/* 담보설정금액	*/ , defaultValue : 0
		},{	name: 'crdt_bacd'           , type: 'string'	/* 신용등급		*/
		},{	name: 'crdt_name'           , type: 'string'	/* 신용등급		*/
		},{	name: 'cnio_dvcd'           , type: 'string'	/* 국내외구분코드	*/
		},{	name: 'pric_dvcd'           , type: 'string'	/* 단가구분코드	*/
		},{	name: 'sale_drtr_idcd'      , type: 'string'	/* 영업담당자ID	*/
		},{	name: 'sale_dept_idcd'      , type: 'string'	/* 영업부서ID		*/
		},{	name: 'sale_drtr_name'      , type: 'string'	/* 영업담당자ID	*/
		},{	name: 'sale_dept_name'      , type: 'string'	/* 영업부서ID		*/
		},{	name: 'insp_kind_dvcd'      , type: 'string'	/* 검사종류구분코드	*/
		},{	name: 'json_data'           , type: 'string'	/* JSONDATA		*/
		},{	name: 'favo_numb'           , type: 'string'	/* 즐겨찾기번호	*/
		},{	name: 'change'              , type: 'string'	/* 변경	*/
		},{	name: 'post_code'           , type: 'string'	/* 우편번호	*/
		},{	name: 'addr_1fst'           , type: 'string'	/* 주소1	*/
		},{	name: 'addr_2snd'           , type: 'string'	/* 주소2	*/
		},{	name: 'addr_engl_1fst'      , type: 'string'	/* 영문주소	*/
		},{	name: 'addr_engl_2snd'      , type: 'string'	/* 영문상세주소	*/
		},{	name: 'addr_seqn'           , type: 'float'		/* 주소순번	*/
		},{	name: 'user_memo'           , type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'           , type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'           , type: 'string'	/* 부모ID		*/
		},{	name: 'line_levl'           , type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'           , type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string'	/* 수정사용자명	*/
		},{	name: 'updt_ipad'           , type: 'string'	/* 수정IP		*/
		},{	name: 'updt_dttm'           , type: 'string'	/* 수정일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string'	/* 수정ID		*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string'	/* 수정UI		*/
		},{	name: 'crte_user_name'      , type: 'string'	/* 생성사용자명	*/
		},{	name: 'crte_ipad'           , type: 'string'	/* 생성IP		*/
		},{	name: 'crte_dttm'           , type: 'string'	/* 생성일시		*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string'	/* 생성ID		*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		},{	name: 'crte_urif'           , type: 'string'	/* 생성UI		*/
		},{	name: 'mngt_bzpl_idcd'      , type: 'string'	/* mngt_bzpl_idcd*/
		},{	name: 'mngt_bzpl_name'      , type: 'string'	/* mngt_bzpl_idcd*/
		},{	name: 'cstm_dvcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'lcls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'mcls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'scls_idcd'           , type: 'string'	/* cstm_dvcd	*/
		},{	name: 'clss_desc'			, type: 'string'	//분류정보
		},{	name: 'lcal_idcd'			, type: 'string'	//운송지역id
		},{	name: 'lcal_name'			, type: 'string'	//운송지역명
		},{	name: 'lcls_name'			, type: 'string'	//대분류id
		},{	name: 'mcls_name'			, type: 'string'	//중분류id
		},{	name: 'scls_name'			, type: 'string'	//소분류id
		},{	name: 'file_name'			, type: 'string'	//사업자등록증 이름
		},{	name: 'acpt_typl_char'		, type: 'string'	//주문인식
		},{	name: 'modify'				, type: 'string'	//주문인식
		},{	name: 'hdco_idcd'			, type: 'string'	//택배사
		},{	name: 'smpl_ostt_yorn'		, type: 'string'	//샘플출고
		},{	name: 'vatx_dvcd'			, type: 'string'	//부과세
		},{	name: 'spec_buss_numb'		, type: 'string'	//종사업장번호
		},{	name: 'base_addr_engl'		, type: 'string'	//영문주소
		},{	name: 'mes_system_type'		, type: 'string',defaultValue:_global.options.mes_system_type	//
		},{	name: 'hqof_idcd'			, type: 'string'	//
		}
	]
});
