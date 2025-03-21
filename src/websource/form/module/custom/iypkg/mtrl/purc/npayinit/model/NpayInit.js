Ext.define('module.custom.iypkg.mtrl.purc.npayinit.model.NpayInit', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'           , type: 'string'	/* 거래처ID		*/
		},{	name: 'cstm_code'           , type: 'string'	/* 거래처코드		*/
		},{	name: 'cstm_name'           , type: 'string'	/* 거래처명			*/
		},{	name: 'bond_dvcd'           , type: 'string'	/* 채권구분코드		*/
		},{	name: 'trns_yymm'           , type: 'string'	/* 이월년월			*/
		},{	name: 'trns_bill_amnt'      , type: 'float'		/* 거래명세서금액		*/ , defaultValue : 0
		},{	name: 'rqbl_amnt'           , type: 'float'		/* 청구서금액		*/ , defaultValue : 0
		},{	name: 'txbl_amnt'           , type: 'float'		/* 세금계산서금액		*/ , defaultValue : 0
		},{	name: 'remk_text'           , type: 'string'	/* 비고			*/
		},{	name: 'pper_cstm_yorn'      , type: 'string'	/* 원지거래처여부		*/
		},{	name: 'fabc_cstm_yorn'      , type: 'string'	/* 원단거래처여부		*/
		},{	name: 'mani_cstm_yorn'      , type: 'string'	/* 마니라거래처여부	*/
		},{	name: 'asmt_cstm_yorn'      , type: 'string'	/* 부자재거래처여부	*/
		},{	name: 'otod_cstm_yorn'      , type: 'string'	/* 외주거래처여부		*/
		},{	name: 'gods_cstm_yorn'      , type: 'string'	/* 상품거래처여부		*/
		},{	name: 'yorn'                , type: 'string'	/* 거래구분			*/
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
		},{	name: 'lcls_name'			, type: 'string'	//대분류id
		},{	name: 'mcls_name'			, type: 'string'	//중분류id
		},{	name: 'scls_name'			, type: 'string'	//소분류id
		},{	name: 'file_name'			, type: 'string'	//사업자등록증 이름
		},{	name: 'modify'				, type: 'string'	//변경사항 check
		},{	name: 'insert'				, type: 'string'	//insert 여부 check
		}
	]
});
