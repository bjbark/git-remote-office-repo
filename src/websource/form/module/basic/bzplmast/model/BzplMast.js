Ext.define('module.basic.bzplmast.model.BzplMast',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'bzpl_idcd'           , type: 'string' 	/* 사업장ID			*/
		},{	name: 'bzpl_code'           , type: 'string' 	/* 사업장코드			*/
		},{	name: 'bzpl_name'           , type: 'string' 	/* 사업장명			*/
		},{	name: 'bzct_dvcd'           , type: 'string' 	/* 사업부문구분코드	*/
		},{	name: 'puch_wrhs_idcd'      , type: 'string' 	/* 구매창고ID		*/
		},{	name: 'puch_wrhs_name'      , type: 'string' 	/* 구매창고이름		*/
		},{	name: 'post_code'           , type: 'string' 	/* 우편번호			*/
		},{	name: 'addr_1fst'           , type: 'string' 	/* 사업장주소			*/
		},{	name: 'addr_2snd'           , type: 'string' 	/* 사업장상세주소		*/
		},{	name: 'tele_numb'           , type: 'string' 	/* 전화번호			*/
		},{	name: 'faxi_numb'           , type: 'string' 	/* 팩스번호			*/
		},{	name: 'prod_bzpl_yorn'      , type: 'string' 	/* 생산사업장여부		*/
		},{	name: 'rpst_bzpl_yorn'      , type: 'string' 	/* 대표사업장여부		*/
		},{	name: 'buss_name'           , type: 'string' 	/* 사업명			*/
		},{	name: 'buss_numb'           , type: 'string' 	/* 사업자등록번호		*/
		},{	name: 'buss_type'           , type: 'string' 	/* 업태				*/
		},{	name: 'buss_kind'           , type: 'string' 	/* 업종				*/
		},{	name: 'corp_numb'           , type: 'string' 	/* 법인번호			*/
		},{	name: 'boss_name'           , type: 'string' 	/* 대표자명			*/
		},{	name: 'addr_engl_1fst'      , type: 'string' 	/* 영문주소			*/
		},{	name: 'addr_engl_2snd'      , type: 'string' 	/* 영문상세주소2		*/
		},{	name: 'user_memo'           , type: 'string' 	/* 사용자메모			*/
		},{	name: 'sysm_memo'           , type: 'string' 	/* 시스템메모			*/
		},{	name: 'prnt_idcd'           , type: 'string' 	/* 부모ID			*/
		},{	name: 'line_levl'           , type: 'float' 	/* ROW레벨			*/ , defaultValue : 0
		},{	name: 'line_ordr'           , type: 'float' 	/* ROW순서			*/ , defaultValue : 0
		},{	name: 'line_stat'           , type: 'string' 	/* ROW상태			*/ , defaultValue: '0'
		},{	name: 'line_clos'           , type: 'string' 	/* ROW마감			*/
		},{	name: 'find_name'           , type: 'string' 	/* 찾기명			*/
		},{	name: 'updt_user_name'      , type: 'string' 	/* 수정사용자명		*/
		},{	name: 'updt_ipad'           , type: 'string' 	/* 수정IP			*/
		},{	name: 'updt_dttm'           , type: 'string' 	/* 수정일시			*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'           , type: 'string' 	/* 수정ID			*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'           , type: 'string' 	/* 수정UI			*/
		},{	name: 'crte_user_name'      , type: 'string' 	/* 생성사용자명		*/
		},{	name: 'crte_ipad'           , type: 'string' 	/* 생성IP			*/
		},{	name: 'crte_dttm'           , type: 'string' 	/* 생성일시			*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'           , type: 'string' 	/* 생성ID			*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'           , type: 'string' 	/* 생성UI			*/
		}
	]
});

