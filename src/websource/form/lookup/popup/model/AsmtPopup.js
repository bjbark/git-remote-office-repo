Ext.define('lookup.popup.model.AsmtPopup',{ extend:'Axt.data.Model',
	fields: [
		{	name: 'asmt_idcd'		, type: 'string'	/* 부자재ID		*/
		},{	name: 'asmt_code'		, type: 'string'	/* 부자재코드		*/
		},{	name: 'asmt_name'		, type: 'string'	/* 부자재명			*/
		},{	name: 'asmt_spec'		, type: 'string'	/* 부자재규격		*/
		},{	name: 'asmt_dvcd'		, type: 'string'	/* 부자재구분코드		*/
		},{	name: 'unit_idcd'		, type: 'string'	/* 단위ID			*/
		},{	name: 'stnd_pric'		, type: 'float'		/* 표준단가			*/ , defaultValue : 0
		},{	name: 'sale_cstm_idcd'	, type: 'string'	/* 매출거래처ID		*/
		},{	name: 'prod_idcd'		, type: 'string'	/* 제품ID			*/
		},{	name: 'prod_leng'		, type: 'float'		/* 제품길이			*/, defaultValue : 0
		},{	name: 'prod_widh'		, type: 'float'		/* 제품폭			*/, defaultValue : 0
		},{	name: 'prod_hght'		, type: 'float'		/* 제품높이			*/, defaultValue : 0
		},{	name: 'used_cstm_idcd'	, type: 'string'	/* 사용거래처ID		*/
		},{	name: 'mngt_numb'		, type: 'string'	/* 관리번호			*/
		},{	name: 'asmt_regi_dvcd'	, type: 'string'	/* 부자재등록구분코드	*/
		},{	name: 'asmt_usge'		, type: 'string'	/* 부자재용도		*/
		},{	name: 'uper_seqn'		, type: 'float'		/* 상위순번			*/
		},{	name: 'disp_seqn'		, type: 'float'		/* 거래구분			*/
		},{	name: 'unit_name'		, type: 'string'	/* 단위명			*/
		},{	name: 'user_memo'		, type: 'string'	/* 사용자메모		*/
		},{	name: 'sysm_memo'		, type: 'string'	/* 시스템메모		*/
		},{	name: 'prnt_idcd'		, type: 'string'	/* 부모ID			*/
		},{	name: 'line_levl'		, type: 'float'		/* ROW레벨		*/ , defaultValue : 0
		},{	name: 'line_ordr'		, type: 'float'		/* ROW순서		*/ , defaultValue : 0
		},{	name: 'line_stat'		, type: 'string'	/* ROW상태		*/ , defaultValue: '0'
		},{	name: 'line_clos'		, type: 'string'	/* ROW마감		*/
		},{	name: 'find_name'		, type: 'string'	/* 찾기명			*/
		},{	name: 'updt_user_name'	, type: 'string'	/* 수정사용자명		*/
		},{	name: 'updt_ipad'		, type: 'string'	/* 수정IP			*/
		},{	name: 'updt_dttm'		, type: 'string'	/* 수정일시			*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'updt_idcd'		, type: 'string'	/* 수정ID			*/ , defaultValue: _global.login_pk
		},{	name: 'updt_urif'		, type: 'string'	/* 수정UI			*/
		},{	name: 'crte_user_name'	, type: 'string'	/* 생성사용자명		*/
		},{	name: 'crte_ipad'		, type: 'string'	/* 생성IP			*/
		},{	name: 'crte_dttm'		, type: 'string'	/* 생성일시			*/ , convert : Ext.util.Format.strToDateTime
		},{	name: 'crte_idcd'		, type: 'string'	/* 생성ID			*/ , defaultValue: _global.login_pk
		},{	name: 'crte_urif'		, type: 'string'	/* 생성UI			*/
		},
	]
});





